export type ComplaintCategory = 'plumbing' | 'electrical' | 'cleaning' | 'security' | 'parking' | 'elevator' | 'pest_control' | 'internet' | 'other';
export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ComplaintUpdate {
  id: string;
  message: string;
  updatedBy: string;
  updatedAt: string;
  status: ComplaintStatus;
}

export interface Complaint {
  id: string;
  ticketNo: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  flatId: string;
  userId: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  updates: ComplaintUpdate[];
}

export const COMPLAINTS: Complaint[] = [
  {
    id: 'c1',
    ticketNo: 'TKT-2026-001',
    title: 'Kitchen sink water leakage',
    description: 'The kitchen sink pipe is leaking since 2 days. Water accumulating under the sink cabinet causing damage.',
    category: 'plumbing',
    status: 'in_progress',
    priority: 'high',
    flatId: 'flat-a203',
    userId: 'u1',
    assignedTo: 'Ramesh Plumber',
    createdAt: '2026-03-25T10:30:00Z',
    updatedAt: '2026-03-26T14:20:00Z',
    updates: [
      { id: 'upd-1a', message: 'Complaint registered. Our team will visit within 24 hours.', updatedBy: 'System', updatedAt: '2026-03-25T10:30:00Z', status: 'pending' },
      { id: 'upd-1b', message: 'Assigned to Ramesh (Plumber). Scheduled visit for 27 March 10 AM.', updatedBy: 'Admin Rajesh', updatedAt: '2026-03-26T14:20:00Z', status: 'in_progress' },
    ],
  },
  {
    id: 'c2',
    ticketNo: 'TKT-2026-002',
    title: 'Bedroom AC not cooling properly',
    description: 'The split AC in master bedroom is running but not cooling. Temperature remains 30°C even after 2 hours.',
    category: 'electrical',
    status: 'pending',
    priority: 'medium',
    flatId: 'flat-a203',
    userId: 'u1',
    createdAt: '2026-03-27T09:00:00Z',
    updatedAt: '2026-03-27T09:00:00Z',
    updates: [
      { id: 'upd-2a', message: 'Complaint registered. Our team will review and assign technician.', updatedBy: 'System', updatedAt: '2026-03-27T09:00:00Z', status: 'pending' },
    ],
  },
  {
    id: 'c3',
    ticketNo: 'TKT-2026-003',
    title: 'Common area hallway not cleaned',
    description: 'The corridor on 2nd floor has not been cleaned for 3 days. Garbage accumulating near staircase.',
    category: 'cleaning',
    status: 'resolved',
    priority: 'low',
    flatId: 'flat-a203',
    userId: 'u1',
    assignedTo: 'Cleaning Staff',
    createdAt: '2026-03-20T08:00:00Z',
    updatedAt: '2026-03-21T16:00:00Z',
    resolvedAt: '2026-03-21T16:00:00Z',
    updates: [
      { id: 'upd-3a', message: 'Complaint registered.', updatedBy: 'System', updatedAt: '2026-03-20T08:00:00Z', status: 'pending' },
      { id: 'upd-3b', message: 'Cleaning team assigned. Will be done by end of day.', updatedBy: 'Admin Rajesh', updatedAt: '2026-03-21T10:00:00Z', status: 'in_progress' },
      { id: 'upd-3c', message: 'Area cleaned and sanitized. Issue resolved.', updatedBy: 'Admin Rajesh', updatedAt: '2026-03-21T16:00:00Z', status: 'resolved' },
    ],
  },
  {
    id: 'c4',
    ticketNo: 'TKT-2026-004',
    title: 'Main gate security camera not working',
    description: 'Security camera at main gate has been showing black screen for past week. Security concern.',
    category: 'security',
    status: 'in_progress',
    priority: 'urgent',
    flatId: 'flat-a301',
    userId: 'u2',
    assignedTo: 'Tech Team',
    createdAt: '2026-03-22T11:00:00Z',
    updatedAt: '2026-03-24T09:30:00Z',
    updates: [
      { id: 'upd-4a', message: 'Complaint registered. Priority escalated to Urgent.', updatedBy: 'System', updatedAt: '2026-03-22T11:00:00Z', status: 'pending' },
      { id: 'upd-4b', message: 'Tech team dispatched. Camera will be replaced by 28 March.', updatedBy: 'Admin Rajesh', updatedAt: '2026-03-24T09:30:00Z', status: 'in_progress' },
    ],
  },
  {
    id: 'c5',
    ticketNo: 'TKT-2026-005',
    title: 'Elevator B-2 making noise',
    description: 'Elevator in Block B, unit 2 making grinding noise. Slightly jerky movement felt. Safety concern.',
    category: 'elevator',
    status: 'closed',
    priority: 'high',
    flatId: 'flat-b405',
    userId: 'u2',
    createdAt: '2026-03-10T14:00:00Z',
    updatedAt: '2026-03-15T11:00:00Z',
    resolvedAt: '2026-03-15T11:00:00Z',
    updates: [
      { id: 'upd-5a', message: 'Complaint lodged.', updatedBy: 'System', updatedAt: '2026-03-10T14:00:00Z', status: 'pending' },
      { id: 'upd-5b', message: 'Elevator serviced by certified technician. Lubrication and cable check done.', updatedBy: 'Admin Rajesh', updatedAt: '2026-03-15T11:00:00Z', status: 'resolved' },
    ],
  },
];

export const CATEGORY_LABELS: Record<ComplaintCategory, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  cleaning: 'Cleaning',
  security: 'Security',
  parking: 'Parking',
  elevator: 'Elevator',
  pest_control: 'Pest Control',
  internet: 'Internet',
  other: 'Other',
};

export const PRIORITY_COLORS: Record<ComplaintPriority, string> = {
  low: 'badge-success',
  medium: 'badge-info',
  high: 'badge-warning',
  urgent: 'badge-danger',
};

export const STATUS_COLORS: Record<ComplaintStatus, string> = {
  pending: 'badge-warning',
  in_progress: 'badge-info',
  resolved: 'badge-success',
  closed: 'badge-neutral',
};
