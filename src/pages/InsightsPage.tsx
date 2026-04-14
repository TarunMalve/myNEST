import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Lightbulb, Brain, Target, AlertTriangle } from 'lucide-react';
import { BILLS, BILL_TYPE_COLORS, BILL_TYPE_LABELS } from '../data/bills';
import { formatCurrency } from '../utils/i18n';

const MONTHLY_DATA = [
  { month: 'Oct', total: 21200, rent: 17000, electricity: 1900, water: 350, maintenance: 2500, gas: 450 },
  { month: 'Nov', total: 22800, rent: 17000, electricity: 2100, water: 350, maintenance: 2500, gas: 850 },
  { month: 'Dec', total: 23700, rent: 17000, electricity: 2600, water: 350, maintenance: 2500, gas: 1250 },
  { month: 'Jan', total: 22990, rent: 18000, electricity: 1650, water: 350, maintenance: 2500, gas: 490 },
  { month: 'Feb', total: 23540, rent: 18000, electricity: 2100, water: 350, maintenance: 2500, gas: 590 },
  { month: 'Mar', total: 23530, rent: 18000, electricity: 1840, water: 350, maintenance: 2500, gas: 840 },
];

const PIE_DATA = [
  { name: 'Rent', value: 18000, color: '#4f46e5' },
  { name: 'Electricity', value: 1840, color: '#f59e0b' },
  { name: 'Maintenance', value: 2500, color: '#8b5cf6' },
  { name: 'Gas', value: 840, color: '#22c55e' },
  { name: 'Water', value: 350, color: '#3b82f6' },
];

const AI_SUGGESTIONS = [
  { icon: <Lightbulb size={16} />, color: '#f59e0b', bg: '#fef3c7', title: 'High Electricity Usage', message: 'Your electricity bill is 12% higher in December. Consider using AC in fan mode or switching to LED lights to reduce consumption.' },
  { icon: <Target size={16} />, color: '#22c55e', bg: '#dcfce7', title: 'Good Payment Habit', message: 'You\'ve paid rent on time for 6 consecutive months! Maintain this to strengthen your CIBIL credit score.' },
  { icon: <AlertTriangle size={16} />, color: '#ef4444', bg: '#fee2e2', title: 'Bill Due in 3 Days', message: 'Your PNG Gas bill of ₹680 and Water charges of ₹350 are due on 25 March. Pay now to avoid late fees.' },
  { icon: <Brain size={16} />, color: '#4f46e5', bg: 'rgba(79,70,229,0.1)', title: 'Year-End Expense Estimate', message: 'Based on your spending pattern, your estimated annual housing expense is ₹2,82,360. This is 4.2% higher than last year.' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', boxShadow: 'var(--shadow)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 12, color: p.color }}>
            <span>{p.name}</span>
            <span style={{ fontWeight: 700 }}>{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const InsightsPage: React.FC = () => {
  const marchTotal = 23530;
  const febTotal = 23540;
  const change = ((marchTotal - febTotal) / febTotal * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* AI Assistant Banner */}
      <div style={{ padding: '20px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #0f0c29, #302b63)', color: 'white', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 26 }}>🤖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>AI Financial Assistant</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>
            Based on your 6-month spending pattern, your housing costs are <strong>stable with a slight upward trend</strong>. Your March total is ₹23,530 — virtually unchanged from February.
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0, textAlign: 'right' }}>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{formatCurrency(marchTotal)}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>March 2026 total</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {[
          { label: 'Avg Monthly Spend', value: formatCurrency(22960), color: '#4f46e5' },
          { label: 'Highest Month', value: 'December (₹23,700)', color: '#ef4444', sub: 'Winter DG + Heater usage' },
          { label: 'On-time Payments', value: '87%', color: '#22c55e', sub: '13 of 15 bills paid on time' },
          { label: 'YTD Total (2026)', value: formatCurrency(69060), color: '#f97316', sub: 'Jan–Mar 2026' },
        ].map(kpi => (
          <div key={kpi.label} className="card" style={{ padding: '16px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 6 }}>{kpi.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: kpi.color, lineHeight: 1.2 }}>{kpi.value}</div>
            {kpi.sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{kpi.sub}</div>}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Bar Chart — Monthly Expenses */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Monthly Expense Breakdown (Oct 2025 – Mar 2026)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={MONTHLY_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rent" name="Rent" fill="#4f46e5" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="electricity" name="Electricity" fill="#f59e0b" stackId="a" />
              <Bar dataKey="maintenance" name="Maintenance" fill="#8b5cf6" stackId="a" />
              <Bar dataKey="gas" name="Gas" fill="#22c55e" stackId="a" />
              <Bar dataKey="water" name="Water" fill="#3b82f6" stackId="a" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart — March breakdown */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>March 2026 — Category Split</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {PIE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val: number) => formatCurrency(val)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {PIE_DATA.map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 700 }}>{formatCurrency(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>Total Expense Trend</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: Math.abs(Number(change)) < 1 ? '#22c55e' : '#f59e0b' }}>
            {Number(change) >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {change}% vs last month
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="total" name="Total" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="rent" name="Rent" stroke="#f97316" strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestions */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>🤖 AI Smart Suggestions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {AI_SUGGESTIONS.map((s, i) => (
            <div key={i} className="card" style={{ padding: 16, borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{s.title}</div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
