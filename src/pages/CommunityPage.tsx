import React, { useState } from 'react';
import { Send, Pin, Bell, Users, MessageCircle } from 'lucide-react';
import { NOTICES, CHAT_MESSAGES, ChatMessage, NOTICE_TYPE_COLORS, NoticeType } from '../data/notices';
import { formatDate } from '../utils/i18n';
import { useAuthStore } from '../store/authStore';

const NOTICE_TYPE_LABELS: Record<NoticeType, string> = {
  announcement: 'Announcement',
  maintenance: 'Maintenance',
  event: 'Event',
  alert: '⚡ Alert',
  general: 'General',
};

export const CommunityPage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'notices' | 'chat'>('notices');
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;
    const msg: ChatMessage = {
      id: `msg${Date.now()}`,
      userId: user.id,
      userName: user.name,
      flatNo: 'A-203',
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  const pinnedNotices = NOTICES.filter(n => n.isPinned);
  const allNotices = NOTICES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)' }}>
        {(['notices', 'chat'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '9px 20px', border: 'none', fontFamily: 'Inter, sans-serif',
            borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
            background: activeTab === tab ? 'rgba(79,70,229,0.06)' : 'transparent',
            color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
            fontSize: 13, fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.15s',
          }}>
            {tab === 'notices' ? <><Bell size={14} /> Notice Board</> : <><MessageCircle size={14} /> Community Chat</>}
          </button>
        ))}
      </div>

      {/* Notices Tab */}
      {activeTab === 'notices' && (
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          {/* Main Notices */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Pinned */}
            {pinnedNotices.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  <Pin size={12} /> Pinned Notices
                </div>
                {pinnedNotices.map(notice => (
                  <div key={notice.id} className="card" style={{ padding: 20, marginBottom: 10, borderLeft: '4px solid var(--primary)', background: 'rgba(79,70,229,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{notice.title}</h3>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <span className="badge badge-info" style={{ fontSize: 10 }}>📌 Pinned</span>
                        <span className={`badge ${NOTICE_TYPE_COLORS[notice.type]}`} style={{ fontSize: 10 }}>{NOTICE_TYPE_LABELS[notice.type]}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{notice.content}</p>
                    <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>👤 {notice.postedBy}</span>
                      <span>📅 {formatDate(notice.postedAt)}</span>
                      {notice.expiryDate && <span>⏱ Expires {formatDate(notice.expiryDate)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* All Notices */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>All Notices</div>
              {allNotices.map(notice => (
                <div key={notice.id} className="card" style={{ padding: 18, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{notice.title}</h3>
                    <span className={`badge ${NOTICE_TYPE_COLORS[notice.type]}`} style={{ fontSize: 10, flexShrink: 0 }}>{NOTICE_TYPE_LABELS[notice.type]}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {notice.content.length > 200 ? notice.content.slice(0, 200) + '...' : notice.content}
                  </p>
                  <div style={{ marginTop: 10, display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                    <span>👤 {notice.postedBy}</span>
                    <span>📅 {formatDate(notice.postedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — Quick Stats */}
          <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card" style={{ padding: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>📊 Notice Stats</h4>
              {[
                { label: 'Total Notices', value: NOTICES.length },
                { label: 'Pinned', value: pinnedNotices.length },
                { label: 'Active Alerts', value: NOTICES.filter(n => n.type === 'alert').length },
                { label: 'Events', value: NOTICES.filter(n => n.type === 'event').length },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                  <span style={{ fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>🏢 Society</h4>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Green Meadows Residency</strong><br />
                Scheme 54, Indore<br />
                RWA: Rajesh Patel<br />
                <a href="tel:+919826100001" style={{ color: 'var(--primary)', textDecoration: 'none' }}>+91 98261 00001</a>
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🛠 Emergency Contacts</h4>
              {[
                { role: 'Security', number: '9826100002' },
                { role: 'Plumber (24/7)', number: '9000111222' },
                { role: 'Electrician', number: '8899776655' },
                { role: 'Society Office', number: '9826100001' },
              ].map(c => (
                <div key={c.role} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{c.role}</span>
                  <a href={`tel:+91${c.number}`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{c.number}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Chat header */}
            <div style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Users size={16} color="var(--primary)" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Green Meadows Community Chat</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>120 members · 23 online</div>
              </div>
              <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: 10 }}>● Online</span>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, padding: '20px 16px', background: 'var(--surface-2)',
              border: '1px solid var(--border)', borderTop: 'none',
              maxHeight: 480, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              {messages.map(msg => {
                const isMe = msg.userId === user?.id;
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', gap: 10 }}>
                    {!isMe && (
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {msg.userName[0]}
                      </div>
                    )}
                    <div style={{ maxWidth: '70%' }}>
                      {!isMe && (
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 3 }}>
                          {msg.userName} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· Flat {msg.flatNo}</span>
                        </div>
                      )}
                      <div style={{
                        padding: '10px 14px', borderRadius: isMe ? '12px 0 12px 12px' : '0 12px 12px 12px',
                        background: isMe ? 'var(--primary)' : 'var(--surface)',
                        color: isMe ? 'white' : 'var(--text-primary)',
                        fontSize: 13, lineHeight: 1.5,
                        border: isMe ? 'none' : '1px solid var(--border)',
                      }}>
                        {msg.message}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3, textAlign: isMe ? 'right' : 'left' }}>
                        {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div style={{ padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', display: 'flex', gap: 10 }}>
              <input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message... (Press Enter to send)"
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary" onClick={sendMessage} disabled={!newMessage.trim()} style={{ padding: '8px 14px' }}>
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* Members sidebar */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div className="card" style={{ padding: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Online Members</h4>
              {[
                { name: 'Arjun Sharma', flat: 'A-203', status: 'online' },
                { name: 'Priya Verma', flat: 'B-405', status: 'online' },
                { name: 'Rajesh Patel', flat: 'Admin', status: 'online' },
                { name: 'Sunita Kumari', flat: 'A-102', status: 'online' },
                { name: 'Vikas Gupta', flat: 'B-101', status: 'away' },
                { name: 'Meena Iyer', flat: 'A-401', status: 'offline' },
              ].map(member => (
                <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700 }}>
                      {member.name[0]}
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0, width: 8, height: 8,
                      borderRadius: '50%', border: '1.5px solid var(--surface)',
                      background: member.status === 'online' ? '#22c55e' : member.status === 'away' ? '#f59e0b' : 'var(--text-muted)',
                    }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{member.name.split(' ')[0]}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Flat {member.flat}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
