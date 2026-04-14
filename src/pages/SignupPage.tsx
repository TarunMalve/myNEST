import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowRight, CheckCircle2, Home, Zap, Shield, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../data/users';

const ROLE_OPTIONS: { role: UserRole; label: string; desc: string; icon: React.ReactNode }[] = [
  { role: 'tenant', label: 'Tenant', desc: 'I rent a flat and need to manage bills & complaints', icon: <Home size={20} /> },
  { role: 'owner', label: 'Owner / Landlord', desc: 'I own properties and want to manage tenants', icon: <Zap size={20} /> },
  { role: 'admin', label: 'Society Admin / RWA', desc: 'I manage a housing society or apartment complex', icon: <Shield size={20} /> },
  { role: 'vendor', label: 'Service Provider', desc: 'I provide maintenance or other housing services', icon: <Users size={20} /> },
];

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsRole } = useAuthStore();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', society: '' });

  const handleNext = () => {
    if (step === 1 && !selectedRole) return;
    if (step < 3) setStep(s => s + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      loginAsRole(selectedRole);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 560, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Building2 size={24} color="var(--primary)" />
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>StaySphere India</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Create your account — Step {step} of 3</div>
          </div>

          {/* Progress */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: s <= step ? 'var(--primary)' : 'var(--border)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>

        <div style={{ padding: '28px 32px' }}>
          {/* Step 1 — Role Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>I am a...</h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Choose your role to personalise your experience</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ROLE_OPTIONS.map(opt => (
                  <button
                    key={opt.role}
                    onClick={() => setSelectedRole(opt.role)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px', borderRadius: 10, border: '2px solid',
                      borderColor: selectedRole === opt.role ? 'var(--primary)' : 'var(--border)',
                      background: selectedRole === opt.role ? 'rgba(79,70,229,0.06)' : 'var(--surface-2)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%',
                    }}
                  >
                    <div style={{ color: selectedRole === opt.role ? 'var(--primary)' : 'var(--text-muted)', flexShrink: 0 }}>{opt.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{opt.desc}</div>
                    </div>
                    {selectedRole === opt.role && <CheckCircle2 size={18} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Personal Info */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Your Details</h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Tell us about yourself</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Arjun Sharma" required />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Email Address *</label>
                  <input type="email" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" required />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Phone Number *</label>
                  <input value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" required />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Property Info */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Your Housing Details</h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Help us connect you to your society</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>State</label>
                  <select>
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Karnataka</option>
                    <option>Uttar Pradesh</option>
                    <option>Gujarat</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>City *</label>
                  <select value={formData.city} onChange={e => setFormData(f => ({ ...f, city: e.target.value }))}>
                    <option value="">Select City</option>
                    <option>Indore</option>
                    <option>Bhopal</option>
                    <option>Pune</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Society Name</label>
                  <input value={formData.society} onChange={e => setFormData(f => ({ ...f, society: e.target.value }))} placeholder="e.g. Green Meadows Residency" />
                </div>
              </div>

              {/* Create account CTA */}
              <div style={{ marginTop: 24, padding: '16px', background: 'rgba(79,70,229,0.06)', borderRadius: 10, border: '1px solid rgba(79,70,229,0.15)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  For this demo, your account will be created instantly and you'll be logged in as a <strong>{selectedRole}</strong>. No email verification required.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            {step > 1 && (
              <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button className="btn btn-primary" onClick={handleNext} style={{ flex: 1 }} disabled={step === 1 && !selectedRole}>
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 1 }}>
                Create Account & Enter <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div style={{ padding: '16px 32px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
