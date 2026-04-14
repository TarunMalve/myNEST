import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Shield, CreditCard, FileText, Users, BarChart3, Star, CheckCircle2, ChevronDown } from 'lucide-react';

const STATS = [
  { label: 'Housing Societies', value: '500+', suffix: '' },
  { label: 'Active Residents', value: '50,000', suffix: '+' },
  { label: 'Bills Tracked', value: '2.5', suffix: 'L+' },
  { label: 'Cities Covered', value: '50', suffix: '+' },
];

const FEATURES = [
  { icon: '💳', title: 'Smart Bill Management', desc: 'Track rent, electricity, water, gas, and maintenance in one unified dashboard. Never miss a due date.' },
  { icon: '📄', title: 'Document Vault', desc: 'Securely store rent agreements, ID proofs, NOC letters, and bills. Access anywhere, anytime.' },
  { icon: '🛠', title: 'Complaint Tracking', desc: 'Raise and track maintenance tickets — plumbing, electrical, cleaning. Real-time status updates.' },
  { icon: '🏢', title: 'Society Management', desc: 'Built for Indian RWA systems. Manage residents across State → City → Society → Building → Flat.' },
  { icon: '📅', title: 'Booking & Scheduling', desc: 'Schedule maintenance visits, society meetings, and facility bookings with a calendar interface.' },
  { icon: '🤖', title: 'AI Smart Insights', desc: 'Get AI-powered suggestions on spending patterns, bill reminders, and financial health analysis.' },
];

const TESTIMONIALS = [
  { name: 'Arjun Sharma', role: 'Tenant, Indore', quote: 'StaySphere has completely changed how I track my rent and utility bills. The dashboard is beautiful and everything is in one place!', rating: 5 },
  { name: 'Priya Verma', role: 'Property Owner, Pune', quote: 'Managing 3 properties across two cities was a nightmare. StaySphere gives me a single view of all my tenants and expenses.', rating: 5 },
  { name: 'Rajesh Patel', role: 'RWA Admin, Indore', quote: 'Our society communication has improved 10x. The notice board, complaint system, and meeting scheduler are exactly what we needed.', rating: 5 },
];

const Counter: React.FC<{ end: number; suffix: string; label: string }> = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{label}</div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-2)' }}>
      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '14px 48px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={20} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>StaySphere</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>INDIA</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {['Features', 'Pricing', 'About'].map(item => (
            <a key={item} href="#features" style={{ padding: '6px 14px', fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: 6, fontWeight: 500 }}>{item}</a>
          ))}
          <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
          <Link to="/signup" className="btn btn-primary btn-sm">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: '80px 48px 64px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: '999px', background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>Now live in Indore, Pune & Delhi</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)', marginBottom: 20 }}>
            India's #1<br />
            <span className="gradient-text">Tenant Services</span><br />
            Platform 🏠
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
            Manage rent, utilities, complaints, and community life — all from one unified dashboard built for Indian housing societies.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/signup')} style={{ borderRadius: 8 }}>
              Start for Free <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')} style={{ borderRadius: 8 }}>
              View Demo
            </button>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['No credit card required', '100% free for tenants', 'Works across all states'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
                <CheckCircle2 size={14} color="#22c55e" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ position: 'relative' }}>
          <div style={{
            borderRadius: 16, padding: 24,
            background: 'linear-gradient(145deg, #0f0c29, #302b63)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          }}>
            {/* Mock Dashboard Preview */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              {['Rent: ₹18,000', 'Electricity: ₹1,840', 'Water: ₹350'].map(item => (
                <div key={item} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{item.split(':')[0]}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{item.split(':')[1]}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Monthly Trend</span>
                <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>↑ 4.5% stable</span>
              </div>
              {[80, 92, 88, 76, 95, 100].map((h, i) => (
                <div key={i} style={{ display: 'inline-block', width: 28, height: `${h * 0.6}px`, background: `rgba(79,70,229,${0.4 + i * 0.12})`, borderRadius: 3, marginRight: 4, verticalAlign: 'bottom' }} />
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Kitchen sink leak — In Progress 🔧', 'Maintenance paid ✅', 'RWA Meeting: Apr 5 📅'].map(item => (
                <div key={item} style={{ padding: '7px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Band */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5, #302b63)', padding: '48px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          <Counter end={500} suffix="+" label="Housing Societies" />
          <Counter end={50000} suffix="+" label="Active Residents" />
          <Counter end={250000} suffix="+" label="Bills Tracked" />
          <Counter end={50} suffix="+" label="Cities" />
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ padding: '80px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
            Everything you need, nothing you don't
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginTop: 12 }}>
            Designed specifically for Indian housing realities — RWA systems, state-wise utilities, and local vendors
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card" style={{ padding: '24px', transition: 'transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* India Specific Section */}
      <div style={{ background: 'var(--surface)', padding: '64px 48px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
              🇮🇳 Built for India, by Indians
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '⚡', title: 'State Electricity Boards', desc: 'MPEB, MSEDCL, BSES — track bills board-wise' },
              { icon: '🏘', title: 'RWA System', desc: 'Resident Welfare Associations fully supported' },
              { icon: '💰', title: 'UPI Payments', desc: 'GPay, PhonePe, Paytm, BHIM UPI integration ready' },
              { icon: '📑', title: 'Agreement Management', desc: 'Upload and manage rent agreements as per Indian law' },
              { icon: '🗺', title: 'Multi-State Support', desc: 'MP, Maharashtra, Delhi, Karnataka and growing' },
              { icon: '🌐', title: 'Hindi Support', desc: 'Full Hindi UI toggle for regional language users' },
            ].map(item => (
              <div key={item.title} style={{ padding: '18px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '64px 48px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, fontFamily: 'Poppins, sans-serif', marginBottom: 40 }}>
          Loved by residents across India ❤️
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', marginBottom: 12 }}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="#f97316" color="#f97316" />)}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '64px 48px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Poppins, sans-serif', marginBottom: 16 }}>
          Ready to simplify your housing life?
        </h2>
        <p style={{ fontSize: 15, opacity: 0.85, marginBottom: 32 }}>
          Join 50,000+ residents managing their homes smarter with StaySphere India
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-lg" onClick={() => navigate('/signup')} style={{ background: 'white', color: '#4f46e5', borderRadius: 8, fontWeight: 700 }}>
            Create Free Account <ArrowRight size={18} />
          </button>
          <button className="btn btn-lg" onClick={() => navigate('/login')} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 8 }}>
            See Demo Dashboard
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '32px 48px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building2 size={16} color="var(--primary)" />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 14 }}>StaySphere India</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Made with ❤️ for Indian housing societies · © 2026 StaySphere India
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
            <a key={l} href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};
