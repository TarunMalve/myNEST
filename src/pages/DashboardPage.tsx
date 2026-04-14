import React from 'react';
import {
  TrendingUp, TrendingDown, CreditCard, AlertCircle,
  FileText, Calendar, ArrowRight, Clock, CheckCircle2,
  Zap, Droplets, Flame, Home, Building2, Bell
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { BILLS } from '../data/bills';
import { COMPLAINTS } from '../data/complaints';
import { NOTICES } from '../data/notices';
import { BOOKINGS } from '../data/meetings';
import { getGreeting, formatCurrency, formatDate, getDaysUntilDue } from '../utils/i18n';
import { useNavigate } from 'react-router-dom';

const StatCard: React.FC<{
  label: string; value: string; subtext?: string;
  icon: React.ReactNode; color: string; trend?: 'up' | 'down' | 'neutral'; trendText?: string;
}> = ({ label, value, subtext, icon, color, trend, trendText }) => (
  <div className="card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</div>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        {icon}
      </div>
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{value}</div>
      {subtext && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{subtext}</div>}
    </div>
    {trendText && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
        {trend === 'up' ? <TrendingUp size={13} color="#22c55e" /> : trend === 'down' ? <TrendingDown size={13} color="#ef4444" /> : null}
        <span style={{ color: trend === 'up' ? '#22c55e' : trend === 'down' ? '#ef4444' : 'var(--text-muted)' }}>{trendText}</span>
      </div>
    )}
  </div>
);

export const DashboardPage: React.FC = () => {
  const { user, language } = useAuthStore();
  const navigate = useNavigate();

  const greeting = getGreeting(language);
  const currentMonth = 'March';
  const currentYear = 2026;

  // Calculate stats
  const monthBills = BILLS.filter(b => b.month === currentMonth && b.year === currentYear && b.userId === 'u1');
  const totalPaid = monthBills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0);
  const totalPending = monthBills.filter(b => b.status === 'pending' || b.status === 'overdue').reduce((s, b) => s + b.amount, 0);
  const activeComplaints = COMPLAINTS.filter(c => c.status !== 'resolved' && c.status !== 'closed').length;
  const upcomingBookings = BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'scheduled').length;

  const pendingBills = BILLS.filter(b => (b.status === 'pending' || b.status === 'overdue') && b.userId === 'u1');
  const pinnedNotices = NOTICES.filter(n => n.isPinned).slice(0, 2);
  const nextBooking = BOOKINGS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{greeting}, {user?.name?.split(' ')[0]}!</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            Here's your housing overview for {currentMonth} {currentYear}. All under one roof. 🏠
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/expenses')}>
            <CreditCard size={14} /> Pay Bills
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/complaints')}>
            <AlertCircle size={14} /> Raise Ticket
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        <StatCard
          label="Monthly Expenses"
          value={formatCurrency(totalPaid + totalPending)}
          subtext={`${currentMonth} ${currentYear}`}
          icon={<CreditCard size={18} />}
          color="#4f46e5"
          trend="up"
          trendText="+8% vs last month"
        />
        <StatCard
          label="Pending Dues"
          value={formatCurrency(totalPending)}
          subtext={`${pendingBills.length} bills pending`}
          icon={<AlertCircle size={18} />}
          color="#f97316"
          trend="neutral"
          trendText="Due this month"
        />
        <StatCard
          label="Active Tickets"
          value={String(activeComplaints)}
          subtext="2 in progress, 2 pending"
          icon={<AlertCircle size={18} />}
          color="#8b5cf6"
        />
        <StatCard
          label="Upcoming Bookings"
          value={String(upcomingBookings)}
          subtext="Next: 29 March, 10AM"
          icon={<Calendar size={18} />}
          color="#22c55e"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Pending Bills */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Pending Dues</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/expenses')} style={{ fontSize: 12, gap: 4 }}>
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pendingBills.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 13 }}>
                <CheckCircle2 size={32} color="#22c55e" style={{ margin: '0 auto 8px' }} />
                <div>All bills paid! 🎉</div>
              </div>
            ) : pendingBills.map(bill => {
              const daysLeft = getDaysUntilDue(bill.dueDate);
              const isOverdue = daysLeft < 0;
              const ICONS: Record<string, React.ReactNode> = {
                electricity: <Zap size={14} />, water: <Droplets size={14} />,
                gas: <Flame size={14} />, rent: <Home size={14} />, maintenance: <Building2 size={14} />,
              };
              return (
                <div key={bill.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)',
                  background: isOverdue ? 'rgba(239,68,68,0.04)' : 'var(--surface-2)',
                }}>
                  <div style={{ color: isOverdue ? '#ef4444' : 'var(--text-muted)' }}>
                    {ICONS[bill.type] || <CreditCard size={14} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{bill.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Due: {formatDate(bill.dueDate)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: isOverdue ? '#ef4444' : 'var(--text-primary)' }}>
                      {formatCurrency(bill.amount)}
                    </div>
                    <div style={{ fontSize: 10, color: isOverdue ? '#ef4444' : '#f59e0b', fontWeight: 500 }}>
                      {isOverdue ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => navigate('/expenses')}>
                    Pay
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Complaints */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Active Complaints</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/complaints')} style={{ fontSize: 12, gap: 4 }}>
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {COMPLAINTS.filter(c => c.status !== 'closed').slice(0, 3).map(complaint => (
              <div key={complaint.id} style={{
                padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--surface-2)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{complaint.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{complaint.ticketNo}</div>
                  </div>
                  <span className={`badge ${complaint.status === 'in_progress' ? 'badge-info' : complaint.status === 'resolved' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10, flexShrink: 0 }}>
                    {complaint.status.replace('_', ' ')}
                  </span>
                </div>
                {complaint.assignedTo && (
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} /> Assigned to: {complaint.assignedTo}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Society Notices */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>📌 Pinned Notices</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/community')} style={{ fontSize: 12, gap: 4 }}>
              Community <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pinnedNotices.map(notice => (
              <div key={notice.id} style={{ padding: '12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Bell size={14} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{notice.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
                      {notice.content.substring(0, 90)}...
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>— {notice.postedBy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>📅 Upcoming Schedule</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/bookings')} style={{ fontSize: 12, gap: 4 }}>
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BOOKINGS.slice(0, 3).map(booking => (
              <div key={booking.id} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--surface-2)',
              }}>
                <div style={{
                  background: 'rgba(79,70,229,0.1)', color: 'var(--primary)',
                  borderRadius: 6, padding: '4px 8px', textAlign: 'center',
                  flexShrink: 0, minWidth: 44,
                }}>
                  <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1 }}>{booking.date.split('-')[2]}</div>
                  <div style={{ fontSize: 9, fontWeight: 600 }}>
                    {new Date(booking.date).toLocaleString('en-IN', { month: 'short' })}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{booking.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{booking.timeSlot} · {booking.location.split(',')[0]}</div>
                </div>
                <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: 10 }}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick expense breakdown */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>This Month's Expense Breakdown</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/insights')} style={{ fontSize: 12, gap: 4 }}>
            Full Insights <ArrowRight size={12} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {monthBills.map(bill => {
            const COLORS: Record<string, string> = {
              rent: '#4f46e5', electricity: '#f59e0b', water: '#3b82f6',
              maintenance: '#8b5cf6', gas: '#22c55e',
            };
            const color = COLORS[bill.type] || '#666';
            return (
              <div key={bill.id} style={{
                flex: '1 1 140px', padding: '12px 14px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--surface-2)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{bill.title.replace(' Bill', '').replace(' Charges', '')}</span>
                  <span className={`badge ${bill.status === 'paid' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 9 }}>
                    {bill.status}
                  </span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color, letterSpacing: '-0.02em' }}>
                  {formatCurrency(bill.amount)}
                </div>
                {/* Mini bar */}
                <div style={{ marginTop: 8, height: 3, borderRadius: 2, background: 'var(--border)' }}>
                  <div style={{ height: '100%', borderRadius: 2, background: color, width: `${Math.min(100, (bill.amount / 20000) * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
