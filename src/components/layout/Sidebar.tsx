import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CreditCard, FileText, AlertCircle,
  Building2, CalendarDays, Users, BarChart3, LogOut,
  Shield, Home, Zap, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from '../../utils/i18n';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  labelKey: string;
  roles?: string[];
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', icon: <LayoutDashboard size={18} />, labelKey: 'Dashboard' },
  { path: '/expenses', icon: <CreditCard size={18} />, labelKey: 'Expenses' },
  { path: '/documents', icon: <FileText size={18} />, labelKey: 'Documents' },
  { path: '/complaints', icon: <AlertCircle size={18} />, labelKey: 'Complaints', badge: 2 },
  { path: '/society', icon: <Building2 size={18} />, labelKey: 'Society' },
  { path: '/bookings', icon: <CalendarDays size={18} />, labelKey: 'Bookings' },
  { path: '/community', icon: <Users size={18} />, labelKey: 'Community' },
  { path: '/insights', icon: <BarChart3 size={18} />, labelKey: 'Insights' },
];

const ROLE_COLORS: Record<string, string> = {
  tenant: 'badge-info',
  owner: 'badge-success',
  admin: 'badge-danger',
  vendor: 'badge-warning',
};

const ROLE_ICONS: Record<string, React.ReactNode> = {
  tenant: <Home size={12} />,
  owner: <Zap size={12} />,
  admin: <Shield size={12} />,
  vendor: <Users size={12} />,
};

export const Sidebar: React.FC = () => {
  const { user, logout, language } = useAuthStore();
  const { t } = useTranslation(language);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 50,
      transition: 'transform 0.3s ease',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Building2 size={20} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.2 }}>StaySphere</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>INDIA</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5, #f97316)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0,
            }}>
              {user.name[0]}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <span className={`badge ${ROLE_COLORS[user.role]}`} style={{ fontSize: 10 }}>
                  {ROLE_ICONS[user.role]}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0 8px 8px', textTransform: 'uppercase' }}>
          Main Menu
        </div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 6,
              textDecoration: 'none',
              fontSize: 13.5,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(79,70,229,0.08)' : 'transparent',
              marginBottom: 2,
              transition: 'all 0.15s ease',
              position: 'relative',
            })}
          >
            {({ isActive }) => (
              <>
                <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.labelKey}</span>
                {item.badge && (
                  <span style={{
                    background: 'var(--accent)', color: 'white',
                    borderRadius: '999px', fontSize: 10, fontWeight: 700,
                    padding: '1px 6px', minWidth: 18, textAlign: 'center',
                  }}>{item.badge}</span>
                )}
                {isActive && (
                  <div style={{
                    position: 'absolute', right: 8,
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'var(--primary)',
                  }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Society Quick Info */}
      {user?.societyId && (
        <div style={{ padding: '12px 12px', margin: '0 10px 10px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(249,115,22,0.06))', border: '1px solid rgba(79,70,229,0.15)' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--primary)', letterSpacing: 0.5, marginBottom: 4 }}>MY SOCIETY</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Green Meadows</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Flat A-203 · Indore, MP</div>
        </div>
      )}

      {/* Logout */}
      <div style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '9px 10px', borderRadius: 6,
            border: 'none', background: 'transparent',
            color: 'var(--text-secondary)', fontSize: 13.5, cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#ef4444'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
        >
          <LogOut size={16} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};
