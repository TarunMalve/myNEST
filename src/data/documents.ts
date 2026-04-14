export type DocumentCategory = 'agreement' | 'id_proof' | 'bill' | 'noc' | 'other';

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  fileType: 'pdf' | 'jpg' | 'png' | 'docx';
  size: string;
  uploadedAt: string;
  userId: string;
  expiryDate?: string;
  description?: string;
  tags: string[];
}

export const DOCUMENTS: Document[] = [
  {
    id: 'd1',
    name: 'Rent Agreement - A-203.pdf',
    category: 'agreement',
    fileType: 'pdf',
    size: '2.4 MB',
    uploadedAt: '2025-06-01T10:00:00Z',
    userId: 'u1',
    expiryDate: '2026-05-31',
    description: 'Annual rent agreement between Arjun Sharma and Priya Verma for flat A-203',
    tags: ['rent', 'agreement', '2025-26'],
  },
  {
    id: 'd2',
    name: 'Aadhaar Card - Arjun.pdf',
    category: 'id_proof',
    fileType: 'pdf',
    size: '820 KB',
    uploadedAt: '2025-06-01T10:05:00Z',
    userId: 'u1',
    description: 'Aadhaar Card as identity proof',
    tags: ['aadhaar', 'id', 'kyc'],
  },
  {
    id: 'd3',
    name: 'Electricity Bill - Feb 2026.pdf',
    category: 'bill',
    fileType: 'pdf',
    size: '310 KB',
    uploadedAt: '2026-02-17T09:30:00Z',
    userId: 'u1',
    description: 'MPEB electricity bill for February 2026',
    tags: ['electricity', 'mpeb', 'february'],
  },
  {
    id: 'd4',
    name: 'Society NOC Letter.pdf',
    category: 'noc',
    fileType: 'pdf',
    size: '540 KB',
    uploadedAt: '2025-06-02T11:00:00Z',
    userId: 'u1',
    description: 'No Objection Certificate from Green Meadows RWA',
    tags: ['noc', 'rwa', 'society'],
  },
  {
    id: 'd5',
    name: 'PAN Card - Arjun.jpg',
    category: 'id_proof',
    fileType: 'jpg',
    size: '450 KB',
    uploadedAt: '2025-06-01T10:10:00Z',
    userId: 'u1',
    description: 'PAN card for income tax and financial identity',
    tags: ['pan', 'id', 'income-tax'],
  },
  {
    id: 'd6',
    name: 'Maintenance Receipt - March.pdf',
    category: 'bill',
    fileType: 'pdf',
    size: '280 KB',
    uploadedAt: '2026-03-08T14:00:00Z',
    userId: 'u1',
    description: 'Society maintenance payment receipt for March 2026',
    tags: ['maintenance', 'receipt', 'march'],
  },
];

export const CATEGORY_ICONS: Record<DocumentCategory, string> = {
  agreement: '📄',
  id_proof: '🪪',
  bill: '🧾',
  noc: '✅',
  other: '📁',
};

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  agreement: 'Agreements',
  id_proof: 'ID Proofs',
  bill: 'Bills & Receipts',
  noc: 'NOC / Certificates',
  other: 'Others',
};
