import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar, MobileNav } from './Topbar';
import { useAuthStore } from '../../store/authStore';

export const AppShell: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-2)' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: 'calc(100vw - 240px)' }}>
        <Topbar />
        <main style={{ flex: 1, padding: '24px', overflowX: 'hidden' }}>
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />

      {/* Global responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(-100%); }
          aside.open { transform: translateX(0); }
          .main-content { margin-left: 0 !important; max-width: 100vw !important; }
          #mobile-nav { display: block !important; }
          #mobile-menu-btn { display: flex !important; }
          .desktop-only { display: none !important; }
          main { padding: 16px !important; padding-bottom: 80px !important; }
        }
        @media (min-width: 769px) {
          #mobile-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};
