import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, Plus, Check, X, Bell, Users } from 'lucide-react';
import { BOOKINGS, Booking, BookingType, BOOKING_TYPE_LABELS, BOOKING_STATUS_COLORS, BookingStatus } from '../data/meetings';
import { formatDate } from '../utils/i18n';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: '', type: 'maintenance_visit' as BookingType,
    date: '2026-04-01', timeSlot: '10:00 AM - 12:00 PM',
    location: '', description: '',
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const getBookingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => b.date === dateStr);
  };

  const handleAddBooking = () => {
    const newBooking: Booking = {
      id: `bk${Date.now()}`,
      ...form,
      status: 'scheduled',
      userId: 'u1',
      duration: '1 hour',
      reminderSet: false,
    };
    setBookings(prev => [...prev, newBooking]);
    setShowModal(false);
    setForm({ title: '', type: 'maintenance_visit', date: '2026-04-01', timeSlot: '10:00 AM - 12:00 PM', location: '', description: '' });
  };

  const TYPE_COLORS: Record<BookingType, string> = {
    maintenance_visit: '#f59e0b',
    society_meeting: '#4f46e5',
    facility_booking: '#22c55e',
    vendor_visit: '#8b5cf6',
    inspection: '#ef4444',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>‹ Prev</button>
          <div style={{ padding: '6px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 14, fontWeight: 700 }}>
            {MONTHS[month]} {year}
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>Next ›</button>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={15} /> Add Booking
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        {/* Calendar */}
        <div className="card" style={{ padding: 20 }}>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>
            ))}
          </div>
          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayBookings = getBookingsForDay(day);
              const isToday = day === 28 && month === 2 && year === 2026;
              const isSelected = selectedDay === day;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  style={{
                    minHeight: 60, padding: '6px', borderRadius: 6, border: '1px solid',
                    borderColor: isSelected ? 'var(--primary)' : isToday ? 'var(--accent)' : 'var(--border)',
                    background: isSelected ? 'rgba(79,70,229,0.06)' : isToday ? 'rgba(249,115,22,0.04)' : 'var(--surface-2)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: isToday ? 800 : 500, color: isToday ? 'var(--accent)' : 'var(--text-primary)' }}>{day}</div>
                  {dayBookings.slice(0, 2).map(bk => (
                    <div key={bk.id} style={{
                      marginTop: 2, padding: '1px 4px', borderRadius: 3,
                      background: `${TYPE_COLORS[bk.type]}25`,
                      color: TYPE_COLORS[bk.type], fontSize: 9, fontWeight: 600,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{bk.title.slice(0, 14)}…</div>
                  ))}
                  {dayBookings.length > 2 && <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>+{dayBookings.length - 2}</div>}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                <span style={{ color: 'var(--text-muted)' }}>{BOOKING_TYPE_LABELS[type as BookingType]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>
            {selectedDay ? `March ${selectedDay} — Bookings` : 'All Upcoming Bookings'}
          </h3>
          {(selectedDay ? bookings.filter(b => b.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`) : bookings).map(booking => (
            <div key={booking.id} className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{booking.title}</div>
                  <div style={{ fontSize: 10, color: TYPE_COLORS[booking.type], fontWeight: 600, marginTop: 2 }}>
                    {BOOKING_TYPE_LABELS[booking.type]}
                  </div>
                </div>
                <span className={`badge ${BOOKING_STATUS_COLORS[booking.status]}`} style={{ fontSize: 10, flexShrink: 0 }}>{booking.status}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <CalendarDays size={12} />{formatDate(booking.date)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <Clock size={12} />{booking.timeSlot} ({booking.duration})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <MapPin size={12} />{booking.location}
                </div>
              </div>
              {booking.description && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>{booking.description}</p>
              )}
              {booking.attendees && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                  <Users size={12} /> {booking.attendees.join(', ').slice(0, 50)}
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <button className="btn btn-secondary btn-sm" style={{ fontSize: 11, flex: 1 }}>
                  <Bell size={11} /> Remind
                </button>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, color: '#ef4444' }}>
                  <X size={11} /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Booking Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setShowModal(false)}>
          <div style={{ background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Schedule New Booking</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)} style={{ padding: '6px' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Plumber Visit for Kitchen Repair" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Type *</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as BookingType }))}>
                    {Object.entries(BOOKING_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Time Slot</label>
                <select value={form.timeSlot} onChange={e => setForm(f => ({ ...f, timeSlot: e.target.value }))}>
                  {['9:00 AM - 11:00 AM', '10:00 AM - 12:00 PM', '11:00 AM - 1:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM', '6:30 PM - 8:00 PM'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Location</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Flat A-203 / Clubhouse / Society Grounds" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Notes</label>
                <textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Additional notes..." />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAddBooking}>Schedule</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
