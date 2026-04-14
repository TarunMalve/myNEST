import React, { useState } from 'react';
import { Upload, Search, Download, Eye, Trash2, Plus, FileText, Image, X, Filter } from 'lucide-react';
import { DOCUMENTS, DocumentCategory, CATEGORY_LABELS, CATEGORY_ICONS, Document } from '../data/documents';
import { formatDate } from '../utils/i18n';

export const DocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>(DOCUMENTS);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [uploadForm, setUploadForm] = useState({ name: '', category: 'bill' as DocumentCategory, description: '' });

  const filtered = docs.filter(d =>
    (activeCategory === 'all' || d.category === activeCategory) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.tags.some(t => t.includes(search.toLowerCase())))
  );

  const categories: { value: DocumentCategory | 'all'; label: string }[] = [
    { value: 'all', label: '📁 All Documents' },
    ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k as DocumentCategory, label: `${CATEGORY_ICONS[k as DocumentCategory]} ${v}` })),
  ];

  const handleFakeUpload = () => {
    const newDoc: Document = {
      id: `d${Date.now()}`,
      name: uploadForm.name || 'New Document.pdf',
      category: uploadForm.category,
      fileType: 'pdf',
      size: '1.2 MB',
      uploadedAt: new Date().toISOString(),
      userId: 'u1',
      description: uploadForm.description,
      tags: [uploadForm.category],
    };
    setDocs(prev => [newDoc, ...prev]);
    setShowUploadModal(false);
    setUploadForm({ name: '', category: 'bill', description: '' });
  };

  const handleDelete = (id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ flex: 1, position: 'relative', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents, tags..."
            style={{ paddingLeft: 36 }}
          />
        </div>
        <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
          <Plus size={15} /> Upload Document
        </button>
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid',
              borderColor: activeCategory === cat.value ? 'var(--primary)' : 'var(--border)',
              background: activeCategory === cat.value ? 'var(--primary)' : 'var(--surface)',
              color: activeCategory === cat.value ? 'white' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Drag-and-Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); setShowUploadModal(true); }}
        style={{
          border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 10, padding: '24px', textAlign: 'center',
          background: dragOver ? 'rgba(79,70,229,0.04)' : 'var(--surface)',
          transition: 'all 0.2s', cursor: 'pointer',
        }}
        onClick={() => setShowUploadModal(true)}
      >
        <Upload size={24} style={{ color: dragOver ? 'var(--primary)' : 'var(--text-muted)', margin: '0 auto 10px' }} />
        <p style={{ fontSize: 14, fontWeight: 600, color: dragOver ? 'var(--primary)' : 'var(--text-primary)' }}>
          Drop files here or click to upload
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Supports PDF, JPG, PNG, DOCX · Max 10MB</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const count = docs.filter(d => d.category === key).length;
          return (
            <div key={key} className="card" style={{ padding: '12px 14px', cursor: 'pointer' }} onClick={() => setActiveCategory(key as DocumentCategory)}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{CATEGORY_ICONS[key as DocumentCategory]}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{count}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Document Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {filtered.map(doc => {
          const daysToExpiry = doc.expiryDate ? Math.ceil((new Date(doc.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
          const isExpiringSoon = daysToExpiry !== null && daysToExpiry <= 60;
          return (
            <div key={doc.id} className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                  background: doc.fileType === 'pdf' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {doc.fileType === 'pdf' ? '📄' : '🖼️'}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {CATEGORY_ICONS[doc.category]} {CATEGORY_LABELS[doc.category]} · {doc.size}
                  </div>
                </div>
              </div>

              {doc.description && (
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{doc.description}</p>
              )}

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {doc.tags.map(tag => (
                  <span key={tag} className="badge badge-neutral" style={{ fontSize: 10 }}>#{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  Uploaded {formatDate(doc.uploadedAt)}
                  {doc.expiryDate && (
                    <div style={{ marginTop: 2, color: isExpiringSoon ? '#f59e0b' : 'var(--text-muted)' }}>
                      {isExpiringSoon ? '⚠️' : ''} Expires {formatDate(doc.expiryDate)}
                      {isExpiringSoon && daysToExpiry !== null && ` (${daysToExpiry}d left)`}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} onClick={() => setPreviewDoc(doc)} title="Preview">
                    <Eye size={12} />
                  </button>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }} title="Download">
                    <Download size={12} />
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', color: '#ef4444' }} title="Delete" onClick={() => handleDelete(doc.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
          <FileText size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
          <p style={{ fontSize: 15, fontWeight: 600 }}>No documents found</p>
          <p style={{ fontSize: 13 }}>Upload your first document above</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setShowUploadModal(false)}>
          <div style={{ background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Upload Document</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowUploadModal(false)} style={{ padding: '6px' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: '24px', textAlign: 'center', background: 'var(--surface-2)' }}>
                <Upload size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 8px' }} />
                <p style={{ fontSize: 13, fontWeight: 500 }}>Click to choose file</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>PDF, JPG, PNG, DOCX</p>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Document Name *</label>
                <input value={uploadForm.name} onChange={e => setUploadForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Rent Agreement March 2026.pdf" />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Category *</label>
                <select value={uploadForm.category} onChange={e => setUploadForm(f => ({ ...f, category: e.target.value as DocumentCategory }))}>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Description</label>
                <textarea value={uploadForm.description} onChange={e => setUploadForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." rows={2} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowUploadModal(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleFakeUpload}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setPreviewDoc(null)}>
          <div style={{ background: 'var(--surface)', borderRadius: 14, width: '100%', maxWidth: 500, boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>{previewDoc.name}</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setPreviewDoc(null)} style={{ padding: '6px' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ width: 80, height: 100, margin: '0 auto 16px', background: 'rgba(239,68,68,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, border: '1px solid rgba(239,68,68,0.15)' }}>
                📄
              </div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{previewDoc.name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{previewDoc.size} · {previewDoc.fileType.toUpperCase()}</p>
              {previewDoc.description && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.5 }}>{previewDoc.description}</p>}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'center' }}>
                <button className="btn btn-primary btn-sm"><Download size={13} /> Download</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setPreviewDoc(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
