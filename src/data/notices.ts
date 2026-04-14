export type NoticeType = 'announcement' | 'maintenance' | 'event' | 'alert' | 'general';

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: NoticeType;
  societyId: string;
  postedBy: string;
  postedAt: string;
  isPinned: boolean;
  expiryDate?: string;
  attachments?: string[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  flatNo: string;
  message: string;
  timestamp: string;
}

export const NOTICES: Notice[] = [
  {
    id: 'n1',
    title: '🚰 Water Supply Interruption on 30 March',
    content: 'Due to maintenance work by IMC (Indore Municipal Corporation) on the main pipeline, there will be no water supply from 8 AM to 4 PM on 30 March 2026. Please store sufficient water. We regret the inconvenience.',
    type: 'alert',
    societyId: 'soc-green-meadows',
    postedBy: 'Admin Rajesh Patel',
    postedAt: '2026-03-28T09:00:00Z',
    isPinned: true,
    expiryDate: '2026-03-31',
  },
  {
    id: 'n2',
    title: '🏋️ Gym Maintenance — Closed for 2 Days',
    content: 'The society gymnasium will be closed on 1 and 2 April 2026 for equipment servicing and deep cleaning. New treadmills and dumbbells will be added. Thank you for your patience.',
    type: 'maintenance',
    societyId: 'soc-green-meadows',
    postedBy: 'Admin Rajesh Patel',
    postedAt: '2026-03-27T11:00:00Z',
    isPinned: false,
    expiryDate: '2026-04-03',
  },
  {
    id: 'n3',
    title: '🎉 Holi Celebration — Society Grounds',
    content: 'Green Meadows RWA warmly invites all residents for the annual Holi celebration on 14 March 2026. Program starts at 9 AM. Organic colors, dhol, and lunch will be arranged. Please confirm participation by 12 March.',
    type: 'event',
    societyId: 'soc-green-meadows',
    postedBy: 'RWA Committee',
    postedAt: '2026-03-05T15:00:00Z',
    isPinned: false,
  },
  {
    id: 'n4',
    title: '📅 Monthly RWA Meeting — April 2026',
    content: 'Monthly General Body Meeting will be held on 5 April 2026 at 6:30 PM in the Clubhouse. Agenda: Review of FY2026 accounts, Security system upgrade, Lift maintenance schedule, Open house for resident suggestions. All members are requested to attend.',
    type: 'announcement',
    societyId: 'soc-green-meadows',
    postedBy: 'Secretary, Green Meadows RWA',
    postedAt: '2026-03-26T10:00:00Z',
    isPinned: true,
  },
  {
    id: 'n5',
    title: '⚡ Power Backup Update',
    content: 'The society DG set has been upgraded to 150 KVA. All blocks will now get full load backup during power cuts. Fuel charges will be shared proportionally. Details in the RWA office.',
    type: 'general',
    societyId: 'soc-green-meadows',
    postedBy: 'Admin Rajesh Patel',
    postedAt: '2026-03-18T08:00:00Z',
    isPinned: false,
  },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 'msg1', userId: 'u1', userName: 'Arjun Sharma', flatNo: 'A-203', message: 'Good morning everyone! When is the plumber coming today?', timestamp: '2026-03-28T07:30:00Z' },
  { id: 'msg2', userId: 'u2', userName: 'Priya Verma', flatNo: 'B-405', message: 'Hi Arjun, I saw the admin posted the plumber schedule – should be 10 AM.', timestamp: '2026-03-28T07:34:00Z' },
  { id: 'msg3', userId: 'u3', userName: 'Rajesh Patel', flatNo: 'Admin', message: 'Good morning all. Yes, Ramesh plumber will visit from 10 AM to 1 PM today. All pending plumbing requests will be attended.', timestamp: '2026-03-28T07:40:00Z' },
  { id: 'msg4', userId: 'u4', userName: 'Sunita Kumari', flatNo: 'A-102', message: 'Thank you Admin ji! My kitchen tap complaint is also pending since yesterday.', timestamp: '2026-03-28T07:45:00Z' },
  { id: 'msg5', userId: 'u1', userName: 'Arjun Sharma', flatNo: 'A-203', message: 'Also, parking lot lights have been off for 3 days. Can someone look into it?', timestamp: '2026-03-28T08:01:00Z' },
  { id: 'msg6', userId: 'u3', userName: 'Rajesh Patel', flatNo: 'Admin', message: 'Noted Arjun ji. Electrician will check today. Please raise a formal complaint ticket so it gets tracked.', timestamp: '2026-03-28T08:10:00Z' },
];

export const NOTICE_TYPE_COLORS: Record<NoticeType, string> = {
  announcement: 'badge-info',
  maintenance: 'badge-warning',
  event: 'badge-success',
  alert: 'badge-danger',
  general: 'badge-neutral',
};
