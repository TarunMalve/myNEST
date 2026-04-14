import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Clock, XCircle, Download, Eye, X, Smartphone, Building, IndianRupee } from 'lucide-react';
import { BILLS, BillType, BILL_TYPE_LABELS, BILL_TYPE_COLORS } from '../data/bills';
import { formatCurrency, formatDate } from '../utils/i18n';

const TAB_FILTERS: { label: string; value: BillType | 'all' }[] = [
  { label: 'All Bills', value: 'all' },
  { label: 'Rent', value: 'rent' },
  { label: 'Electricity', value: 'electricity' },
  { label: 'Water', value: 'water' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Gas', value: 'gas' },
];

interface PayModalProps {
  bill: typeof BILLS[0];
  onClose: () => void;
  onPay: () => void;
}

const PaymentModal: React.FC<PayModalProps> = ({ bill, onClose, onPay }) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1800));
    setSuccess(true);
    setTimeout(() => { onPay(); onClose(); }, 1500);
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle2 size={36} color="#16a34a" />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#16a34a' }}>Payment Successful!</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>{formatCurrency(bill.amount)} paid via {method.toUpperCase()}</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Receipt will be available in Documents</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Pay {bill.title}</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Due: {formatDate(bill.dueDate)}</p>
        </div>
        <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: '6px' }}><X size={16} /></button>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {/* Amount */}
        <div style={{ textAlign: 'center', padding: '16px', background: 'var(--surface-2)', borderRadius: 10, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Total Amount</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>{formatCurrency(bill.amount)}</div>
        </div>

        {/* Payment Method Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { key: 'upi', label: '📱 UPI', icon: <Smartphone size={14} /> },
            { key: 'card', label: '💳 Card', icon: <CreditCard size={14} /> },
            { key: 'netbanking', label: '🏦 Net Banking', icon: <Building size={14} /> },
          ].map(m => (
            <button
              key={m.key}
              onClick={() => setMethod(m.key as any)}
              style={{
                flex: 1, padding: '9px 8px', borderRadius: 8, border: '1.5px solid',
                borderColor: method === m.key ? 'var(--primary)' : 'var(--border)',
                background: method === m.key ? 'rgba(79,70,229,0.08)' : 'var(--surface-2)',
                color: method === m.key ? 'var(--primary)' : 'var(--text-secondary)',
                fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >{m.label}</button>
          ))}
        </div>

        {/* UPI Form */}
        {method === 'upi' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>UPI ID</label>
              <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi / 9876543210@paytm" />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                <button key={app} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }}>{app}</button>
              ))}
            </div>
          </div>
        )}

        {/* Card Form */}
        {method === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input placeholder="Card Number: 1234 5678 9012 3456" />
            <div style={{ display: 'flex', gap: 10 }}>
              <input placeholder="MM/YY" />
              <input placeholder="CVV" type="password" />
            </div>
            <input placeholder="Cardholder Name" />
          </div>
        )}

        {/* Net Banking */}
        {method === 'netbanking' && (
          <div>
            <select>
              <option>Select Your Bank</option>
              <option>State Bank of India (SBI)</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Punjab National Bank</option>
            </select>
          </div>
        )}

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 20, padding: '12px', fontSize: 14 }}
          onClick={handlePay}
          disabled={paying}
        >
          {paying ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
              Processing...
            </span>
          ) : (
            <>Pay {formatCurrency(bill.amount)}</>
          )}
        </button>

        <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
          🔒 Secured by 256-bit SSL encryption · Demo mode — no real charges
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export const ExpensesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BillType | 'all'>('all');
  const [selectedBill, setSelectedBill] = useState<typeof BILLS[0] | null>(null);
  const [paidBills, setPaidBills] = useState<Set<string>>(new Set(BILLS.filter(b => b.status === 'paid').map(b => b.id)));

  const filtered = BILLS.filter(b => activeTab === 'all' || b.type === activeTab);
  const totalPaid = BILLS.filter(b => paidBills.has(b.id)).reduce((s, b) => s + b.amount, 0);
  const totalPending = BILLS.filter(b => !paidBills.has(b.id)).reduce((s, b) => s + b.amount, 0);

  const markPaid = (id: string) => {
    setPaidBills(prev => new Set([...prev, id]));
  };

  const getStatus = (bill: typeof BILLS[0]) => paidBills.has(bill.id) ? 'paid' : bill.status;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {[
          { label: 'Total Paid', value: formatCurrency(totalPaid), color: '#22c55e', bg: '#dcfce7' },
          { label: 'Pending Dues', value: formatCurrency(totalPending), color: '#f97316', bg: '#ffedd5' },
          { label: 'Bills This Year', value: String(BILLS.length), color: '#4f46e5', bg: 'rgba(79,70,229,0.1)' },
          { label: 'On-time Rate', value: '87%', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {TAB_FILTERS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid',
              borderColor: activeTab === tab.value ? 'var(--primary)' : 'var(--border)',
              background: activeTab === tab.value ? 'var(--primary)' : 'var(--surface)',
              color: activeTab === tab.value ? 'white' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bills Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Payment History</h3>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} bills found</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Bill', 'Type', 'Month', 'Due Date', 'Amount', 'Method', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bill, idx) => {
                const status = getStatus(bill);
                const isPaid = status === 'paid';
                return (
                  <tr key={bill.id} style={{ borderTop: '1px solid var(--border)', background: idx % 2 === 0 ? 'transparent' : 'var(--surface-2)' }}>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, minWidth: 160 }}>{bill.title}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: BILL_TYPE_COLORS[bill.type] }} />
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{BILL_TYPE_LABELS[bill.type]}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>{bill.month} {bill.year}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{formatDate(bill.dueDate)}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(bill.amount)}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>{bill.method || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${isPaid ? 'badge-success' : status === 'overdue' ? 'badge-danger' : 'badge-warning'}`}>
                        {isPaid ? '✓ Paid' : status === 'overdue' ? 'Overdue' : 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {!isPaid && (
                          <button className="btn btn-primary btn-sm" style={{ fontSize: 11 }} onClick={() => setSelectedBill(bill)}>
                            Pay Now
                          </button>
                        )}
                        {isPaid && bill.receiptId && (
                          <button className="btn btn-secondary btn-sm" style={{ fontSize: 11, gap: 4 }}>
                            <Download size={11} /> Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedBill && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }} onClick={() => setSelectedBill(null)}>
          <div style={{ background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <PaymentModal bill={selectedBill} onClose={() => setSelectedBill(null)} onPay={() => markPaid(selectedBill.id)} />
          </div>
        </div>
      )}
    </div>
  );
};
