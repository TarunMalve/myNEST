import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff, ArrowRight, Home, Shield, Zap, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../data/users';

const ROLE_OPTIONS: { role: UserRole; label: string; desc: string; color: string; icon: React.ReactNode }[] = [
  { role: 'tenant', label: 'Tenant', desc: 'Manage rent, utilities & complaints', color: '#4f46e5', icon: <Home size={16} /> },
  { role: 'owner', label: 'Owner / Landlord', desc: 'Monitor your properties & tenants', color: '#22c55e', icon: <Zap size={16} /> },
  { role: 'admin', label: 'Society Admin', desc: 'Manage RWA, residents & notices', color: '#ef4444', icon: <Shield size={16} /> },
  { role: 'vendor', label: 'Service Provider', desc: 'Handle service requests & bookings', color: '#f97316', icon: <Users size={16} /> },
];

const DEMO_HINTS: Record<UserRole, { email: string; pass: string }> = {
  tenant: { email: 'arjun.sharma@gmail.com', pass: 'tenant123' },
  owner: { email: 'priya.verma@gmail.com', pass: 'owner123' },
  admin: { email: 'rajesh.patel@gmail.com', pass: 'admin123' },
  vendor: { email: 'vendor@example.com', pass: 'vendor123' },
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsRole } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('tenant');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // Simulate async
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAsRole(role);
    navigate('/dashboard');
  };

  const fillDemo = (role: UserRole) => {
    setSelectedRole(role);
    const hint = DEMO_HINTS[role];
    setEmail(hint.email);
    setPassword(hint.pass);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', background: 'var(--surface-2)',
    }}>
      {/* Left Panel — Brand */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 60px',
        background: 'linear-gradient(145deg, #0f0c29, #302b63, #24243e)',
        color: 'white', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(79,70,229,0.15)', top: -100, right: -100, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(249,115,22,0.08)', bottom: -50, left: -50, pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Building2 size={28} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24 }}>StaySphere</div>
              <div style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.12em', fontWeight: 500 }}>INDIA</div>
            </div>
          </div>

          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, fontFamily: 'Poppins, sans-serif' }}>
            One platform for<br />
            <span style={{ color: '#f97316' }}>all your housing</span><br />
            needs 🏠
          </h2>
          <p style={{ fontSize: 15, opacity: 0.7, lineHeight: 1.7, maxWidth: 360 }}>
            Manage rent, utilities, complaints, and community life — all from one unified dashboard built for India.
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '💳', text: 'Track all your bills — Rent, Electricity, Water, Gas' },
              { icon: '📄', text: 'Secure Document Vault for agreements & ID proofs' },
              { icon: '🛠', text: 'Raise & track maintenance complaints instantly' },
              { icon: '🏢', text: 'Built for Indian Housing Societies (RWA systems)' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, opacity: 0.85 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{f.icon}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', gap: 20, opacity: 0.5, fontSize: 12 }}>
            <span>🏙 Indore • Pune • Delhi</span>
            <span>• 500+ Societies</span>
            <span>• 50,000+ Residents</span>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div style={{
        width: 480, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '40px 48px',
        background: 'var(--surface)', overflowY: 'auto',
      }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Sign in to your StaySphere account</p>
        </div>

        {/* Quick Login by Role */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Quick Demo Login</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {ROLE_OPTIONS.map(opt => (
              <button
                key={opt.role}
                onClick={() => fillDemo(opt.role)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 12px', borderRadius: 8, border: '1.5px solid',
                  borderColor: selectedRole === opt.role ? opt.color : 'var(--border)',
                  background: selectedRole === opt.role ? `${opt.color}10` : 'var(--surface-2)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}
              >
                <span style={{ color: opt.color, flexShrink: 0 }}>{opt.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{opt.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.3 }}>{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleQuickLogin(selectedRole)}
            className="btn btn-accent"
            style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
          >
            <ArrowRight size={15} />
            Quick Login as {ROLE_OPTIONS.find(r => r.role === selectedRole)?.label}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>or sign in with email</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ paddingRight: 40 }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0,
              }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#dc2626' }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ borderRadius: 8, padding: '11px', fontSize: 14, marginTop: 4 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                Signing in...
              </span>
            ) : (
              <>Sign In <ArrowRight size={15} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up free</Link>
          </p>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};
