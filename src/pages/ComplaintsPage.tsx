import React, { useState } from 'react';
import { Plus, AlertCircle, Clock, CheckCircle2, XCircle, ChevronDown, ChevronUp, X, Search } from 'lucide-react';
import { COMPLAINTS, Complaint, ComplaintCategory, CATEGORY_LABELS, PRIORITY_COLORS, STATUS_COLORS, ComplaintStatus, ComplaintPriority } from '../data/complaints';
import { formatDate } from '../utils/i18n';

const CATEGORIES: ComplaintCategory[] = ['plumbing', 'electrical', 'cleaning', 'security', 'parking', 'elevator', 'pest_control', 'internet', 'other'];

const STATUS_COLUMNS: { status: ComplaintStatus; label: string; color: string; icon: React.ReactNode }[] = [
  { status: 'pending', label: 'Pending', color: '#f59e0b', icon: <Clock size={14} /> },
  { status: 'in_progress', label: 'In Progress', color: '#3b82f6', icon: <AlertCircle size={14} /> },
  { status: 'resolved', label: 'Resolved', color: '#22c55e', icon: <CheckCircle2 size={14} /> },
  { status: 'closed', label: 'Closed', color: 'var(--text-muted)', icon: <XCircle size={14} /> },
];

interface NewTicketForm {
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
}

export const ComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(COMPLAINTS);
  const [view, setView] = useState<'board' | 'list'>('board');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<NewTicketForm>({ title: '', description: '', category: 'plumbing', priority: 'medium' });
  const [submitting, setSubmitting] = useState(false);

  const filtered = complaints.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.ticketNo.toLowerCase().includes(search.toLowerCase())
  );

  const getColumnComplaints = (status: ComplaintStatus) => filtered.filter(c => c.status === status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    const newComplaint: Complaint = {
      id: `c${Date.now()}`,
      ticketNo: `TKT-2026-00${complaints.length + 1}`,
      title: form.title,
      description: form.description,
      category: form.category,
      status: 'pending',
      priority: form.priority,
      flatId: 'flat-a203',
      userId: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      updates: [{ id: `upd-${Date.now()}`, message: 'Complaint registered. Our team will review shortly.', updatedBy: 'System', updatedAt: new Date().toISOString(), status: 'pending' }],
    };
    setComplaints(prev => [newComplaint, ...prev]);
    setShowNewModal(false);
    setForm({ title: '', description: '', category: 'plumbing', priority: 'medium' });
    setSubmitting(false);
  };

  const ComplaintCard: React.FC<{ complaint: Complaint }> = ({ complaint }) => {
    const isExpanded = expandedId === complaint.id;
    return (
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '12px 14px', cursor: 'pointer',
        transition: 'box-shadow 0.15s',
        boxShadow: isExpanded ? 'var(--shadow)' : 'none',
      }}>
        <div onClick={() => setExpandedId(isExpanded ? null : complaint.id)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>{complaint.ticketNo}</div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{complaint.title}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
              <span className={`badge ${PRIORITY_COLORS[complaint.priority]}`} style={{ fontSize: 10 }}>{complaint.priority}</span>
              {isExpanded ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-neutral" style={{ fontSize: 10 }}>{CATEGORY_LABELS[complaint.category]}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatDate(complaint.createdAt)}</span>
          </div>
        </div>

        {isExpanded && (
          <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{complaint.description}</p>
            {complaint.assignedTo && (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={12} /> Assigned to: <strong style={{ color: 'var(--text-primary)' }}>{complaint.assignedTo}</strong>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>TIMELINE</div>
              {complaint.updates.map(update => (
                <div key={update.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                    background: update.status === 'resolved' ? '#22c55e' : update.status === 'in_progress' ? '#3b82f6' : '#f59e0b',
                  }} />
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>{update.message}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{update.updatedBy} · {formatDate(update.updatedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
            {complaint.resolvedAt && (
              <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 6, background: '#dcfce7', fontSize: 12, color: '#16a34a', fontWeight: 500 }}>
                ✅ Resolved on {formatDate(complaint.resolvedAt)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..." style={{ paddingLeft: 36 }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['board', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className={`btn btn-sm ${view === v ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: 12 }}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
          <Plus size={15} /> Raise Ticket
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {STATUS_COLUMNS.map(col => (
          <div key={col.status} className="card" style={{ padding: '14px 16px', borderTop: `3px solid ${col.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: col.color }}>{getColumnComplaints(col.status).length}</span>
              <span style={{ color: col.color }}>{col.icon}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{col.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      {view === 'board' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, alignItems: 'start' }}>
          {STATUS_COLUMNS.map(col => (
            <div key={col.status}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 10px', background: 'var(--surface)', borderRadius: 8, border: `1px solid ${col.color}30` }}>
                <span style={{ color: col.color }}>{col.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: col.color }}>{col.label}</span>
                <span style={{ marginLeft: 'auto', background: `${col.color}20`, color: col.color, borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                  {getColumnComplaints(col.status).length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {getColumnComplaints(col.status).length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, border: '1px dashed var(--border)', borderRadius: 8 }}>
                    No tickets
                  </div>
                ) : getColumnComplaints(col.status).map(c => <ComplaintCard key={c.id} complaint={c} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Ticket No', 'Title', 'Category', 'Priority', 'Status', 'Created', 'Assigned To'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} onClick={() => setExpandedId(c.id === expandedId ? null : c.id)} style={{ borderTop: '1px solid var(--border)', cursor: 'pointer', background: i % 2 === 0 ? 'transparent' : 'var(--surface-2)' }}>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>{c.ticketNo}</td>
                  <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 500, maxWidth: 200 }}>{c.title}</td>
                  <td style={{ padding: '11px 14px' }}><span className="badge badge-neutral" style={{ fontSize: 10 }}>{CATEGORY_LABELS[c.category]}</span></td>
                  <td style={{ padding: '11px 14px' }}><span className={`badge ${PRIORITY_COLORS[c.priority]}`} style={{ fontSize: 10 }}>{c.priority}</span></td>
                  <td style={{ padding: '11px 14px' }}><span className={`badge ${STATUS_COLORS[c.status]}`} style={{ fontSize: 10 }}>{c.status.replace('_', ' ')}</span></td>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatDate(c.createdAt)}</td>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text-secondary)' }}>{c.assignedTo || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setShowNewModal(false)}>
          <div style={{ background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Raise New Complaint</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowNewModal(false)} style={{ padding: '6px' }}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Issue Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Kitchen tap leaking badly" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as ComplaintCategory }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Priority *</label>
                  <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as ComplaintPriority }))}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Description *</label>
                <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the issue in detail — location, since when, what's affected..." />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowNewModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
