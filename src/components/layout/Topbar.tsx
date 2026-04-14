import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, Globe2, Search, Menu, X, LayoutDashboard, CreditCard, FileText, AlertCircle, Building2, CalendarDays, Users, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface TopbarProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/expenses': 'Expenses & Payments',
  '/documents': 'Document Vault',
  '/complaints': 'Complaints & Requests',
  '/society': 'Society Management',
  '/bookings': 'Bookings & Schedule',
  '/community': 'Community',
  '/insights': 'Smart Insights',
};

const MOCK_NOTIFICATIONS = [
  { id: '1', text: 'Water supply interrupted tomorrow 8AM–4PM', time: '2h ago', type: 'alert' },
  { id: '2', text: 'Plumber visit confirmed for 29 Mar, 10AM', time: '4h ago', type: 'success' },
  { id: '3', text: 'Gas bill of ₹680 due in 3 days', time: '1d ago', type: 'warning' },
  { id: '4', text: 'Maintenance payment receipt uploaded', time: '2d ago', type: 'info' },
];

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, theme, language, toggleTheme, toggleLanguage } = useAuthStore();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] || 'StaySphere India';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      height: 58,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px',
      gap: 16,
    }}>
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="btn btn-ghost btn-sm"
        style={{ display: 'none', padding: '6px' }}
        id="mobile-menu-btn"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Page Title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
          {pageTitle}
        </h1>
        {user && (
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            {user.name} · {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        )}
      </div>

      {/* Search (hidden on small) */}
      <div style={{ position: 'relative', maxWidth: 220 }} className="desktop-only">
        <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          placeholder="Search..."
          style={{ paddingLeft: 30, height: 34, fontSize: 13, maxWidth: 220, background: 'var(--surface-2)' }}
        />
      </div>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="btn btn-ghost btn-sm"
        title="Toggle Language"
        style={{ gap: 4, fontSize: 12, fontWeight: 600, padding: '5px 10px' }}
      >
        <Globe2 size={15} />
        {language === 'en' ? 'हिं' : 'EN'}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-sm"
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        style={{ padding: '6px' }}
      >
        {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
      </button>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          className="btn btn-ghost btn-sm"
          style={{ padding: '6px', position: 'relative' }}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={17} />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent)', border: '1.5px solid var(--surface)',
          }} />
        </button>

        {showNotifications && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 49 }} onClick={() => setShowNotifications(false)} />
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 8,
              width: 320, background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 10,
              boxShadow: 'var(--shadow-lg)', zIndex: 50, overflow: 'hidden',
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
                <span className="badge badge-danger" style={{ fontSize: 10 }}>4 new</span>
              </div>
              {MOCK_NOTIFICATIONS.map(n => (
                <div key={n.id} style={{
                  padding: '12px 16px', borderBottom: '1px solid var(--border)',
                  cursor: 'pointer', transition: 'background 0.15s',
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--surface-2)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                    background: n.type === 'alert' ? '#ef4444' : n.type === 'success' ? '#22c55e' : n.type === 'warning' ? '#f59e0b' : '#3b82f6',
                  }} />
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: 12, width: '100%' }}>View All Notifications</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Avatar */}
      {user && (
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5, #f97316)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          flexShrink: 0,
        }}>
          {user.name[0]}
        </div>
      )}
    </header>
  );
};

// Mobile Bottom Navigation
const MOBILE_NAV = [
  { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Home' },
  { path: '/expenses', icon: <CreditCard size={20} />, label: 'Bills' },
  { path: '/complaints', icon: <AlertCircle size={20} />, label: 'Tickets' },
  { path: '/community', icon: <Users size={20} />, label: 'Community' },
  { path: '/insights', icon: <BarChart3 size={20} />, label: 'Insights' },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav style={{
      display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--surface)', borderTop: '1px solid var(--border)',
      zIndex: 50, padding: '6px 0 8px',
    }} id="mobile-nav">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {MOBILE_NAV.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 10px' }}>
              <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
