import React, { useState } from 'react';
import { Building2, Users, Home, Wifi, Waves, Dumbbell, Shield, Car, Zap, MapPin, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { STATES, getSocietyById, getAllFlats } from '../data/apartments';
import { useAuthStore } from '../store/authStore';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Swimming Pool': <Waves size={14} />,
  'Gymnasium': <Dumbbell size={14} />,
  'CCTV': <Shield size={14} />,
  'Parking': <Car size={14} />,
  'Power Backup': <Zap size={14} />,
  'Clubhouse': <Building2 size={14} />,
  'Internet': <Wifi size={14} />,
};

export const SocietyPage: React.FC = () => {
  const { user } = useAuthStore();
  const society = getSocietyById(user?.societyId || 'soc-green-meadows');
  const flats = getAllFlats().filter(f => f.societyId === (user?.societyId || 'soc-green-meadows'));
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(society?.buildings[0]?.id || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'residents' | 'buildings' | 'state-info'>('overview');

  if (!society) return <div>Society not found</div>;

  const selectedBuildingData = society.buildings.find(b => b.id === selectedBuilding);
  const occupiedCount = flats.filter(f => f.status === 'occupied').length;
  const vacantCount = flats.filter(f => f.status === 'vacant').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Society Header */}
      <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(79,70,229,0.05), rgba(249,115,22,0.04))', border: '1px solid rgba(79,70,229,0.2)' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>{society.name}</h2>
              <span className="badge badge-info" style={{ fontSize: 11 }}>{society.type}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, color: 'var(--text-muted)', fontSize: 13 }}>
              <MapPin size={13} />
              {society.address}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, color: 'var(--text-muted)', fontSize: 13 }}>
              <Phone size={13} />
              RWA Contact: {society.rwaContact}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '10px 20px', textAlign: 'center' }}>
            {[
              { label: 'Total Units', value: society.totalUnits },
              { label: 'Occupied', value: occupiedCount, color: '#22c55e' },
              { label: 'Vacant', value: vacantCount, color: '#f97316' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: (s as any).color || 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {(['overview', 'residents', 'buildings', 'state-info'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '9px 16px', borderRadius: '6px 6px 0 0', border: 'none', fontFamily: 'Inter, sans-serif',
            borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
            background: activeTab === tab ? 'rgba(79,70,229,0.06)' : 'transparent',
            color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
            fontSize: 13, fontWeight: activeTab === tab ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {tab === 'state-info' ? 'State Info' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>🏗️ Society Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Established', value: new Date(society.established).getFullYear() },
                { label: 'Monthly Maintenance', value: `₹${society.maintenanceCharge.toLocaleString('en-IN')}` },
                { label: 'Total Buildings', value: society.buildings.length },
                { label: 'Total Flats', value: flats.length },
                { label: 'Type', value: society.type },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>🎯 Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {society.amenities.map(amenity => (
                <div key={amenity} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--primary)' }}>{AMENITY_ICONS[amenity] || <Home size={14} />}</span>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flat Status Map */}
          <div className="card" style={{ padding: 20, gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>🗺️ Flat Occupancy Overview</h3>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              {[{ status: 'occupied', color: '#22c55e', label: 'Occupied' }, { status: 'vacant', color: '#f97316', label: 'Vacant' }, { status: 'maintenance', color: '#f59e0b', label: 'Maintenance' }].map(s => (
                <div key={s.status} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color }} />
                  {s.label}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              {society.buildings.map(building => (
                <div key={building.id} style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>{building.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 32px)', gap: 4 }}>
                    {building.flats.map(flat => (
                      <div key={flat.id} title={`${flat.number} · ${flat.type} · ${flat.status}`} style={{
                        width: 32, height: 32, borderRadius: 6, cursor: 'pointer',
                        background: flat.status === 'occupied' ? '#22c55e' : flat.status === 'vacant' ? '#f97316' : '#f59e0b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 8, color: 'white', fontWeight: 700,
                        opacity: flat.id === user?.flatId ? 1 : 0.6,
                        border: flat.id === user?.flatId ? '2px solid #4f46e5' : '1px solid transparent',
                      }}>
                        {flat.number.split('-')[1]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Residents Tab */}
      {activeTab === 'residents' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>All Residents</h3>
            <span className="badge badge-info">{flats.filter(f => f.tenantId).length} Active Tenants</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Flat No', 'Building', 'Type', 'Area', 'Rent (₹/mo)', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flats.map((flat, i) => (
                <tr key={flat.id} style={{ borderTop: '1px solid var(--border)', background: flat.id === user?.flatId ? 'rgba(79,70,229,0.04)' : i % 2 === 0 ? 'transparent' : 'var(--surface-2)' }}>
                  <td style={{ padding: '11px 14px', fontWeight: 600, fontSize: 13 }}>
                    {flat.number} {flat.id === user?.flatId && <span className="badge badge-info" style={{ fontSize: 9, marginLeft: 4 }}>You</span>}
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--text-secondary)' }}>
                    {society.buildings.find(b => b.id === flat.buildingId)?.name || '—'}
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: 12 }}><span className="badge badge-neutral">{flat.type}</span></td>
                  <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text-secondary)' }}>{flat.area} sq ft</td>
                  <td style={{ padding: '11px 14px', fontSize: 13, fontWeight: 700 }}>₹{flat.rent.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '11px 14px' }}>
                    <span className={`badge ${flat.status === 'occupied' ? 'badge-success' : flat.status === 'vacant' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: 10 }}>
                      {flat.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Buildings Tab */}
      {activeTab === 'buildings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {society.buildings.map(building => (
            <div key={building.id} className="card" style={{ overflow: 'hidden' }}>
              <div
                style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: selectedBuilding === building.id ? 'rgba(79,70,229,0.04)' : 'transparent' }}
                onClick={() => setSelectedBuilding(selectedBuilding === building.id ? null : building.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Building2 size={20} color="var(--primary)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{building.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{building.flats.length} Flats · {building.totalFloors} Floors</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="badge badge-success" style={{ fontSize: 10 }}>{building.flats.filter(f => f.status === 'occupied').length} Occupied</span>
                  {selectedBuilding === building.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              </div>
              {selectedBuilding === building.id && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                    {building.flats.map(flat => (
                      <div key={flat.id} style={{
                        padding: '10px 12px', borderRadius: 8, border: '1.5px solid',
                        borderColor: flat.id === user?.flatId ? 'var(--primary)' : 'var(--border)',
                        background: flat.id === user?.flatId ? 'rgba(79,70,229,0.06)' : 'var(--surface-2)',
                      }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{flat.number}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Floor {flat.floor} · {flat.type}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{flat.area} sq ft</div>
                        <span className={`badge ${flat.status === 'occupied' ? 'badge-success' : flat.status === 'vacant' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: 9, marginTop: 6, display: 'inline-flex' }}>
                          {flat.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* State Info Tab */}
      {activeTab === 'state-info' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {STATES.map(state => (
            <div key={state.id} className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{state.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Capital</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{state.capitalCity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Cities Covered</span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{state.cities.length}</span>
                </div>
                <div style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Electricity Board</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>{state.electricityBoard}</span>
                </div>
                <div style={{ padding: '6px 0' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Key Cities</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {state.cities.map(city => (
                      <span key={city.id} className="badge badge-info" style={{ fontSize: 10 }}>{city.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
