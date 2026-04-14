export type UserRole = 'tenant' | 'owner' | 'admin' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  flatId?: string;
  societyId?: string;
  joinedAt: string;
}

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@gmail.com',
    phone: '+91 98261 45320',
    role: 'tenant',
    flatId: 'flat-a203',
    societyId: 'soc-green-meadows',
    joinedAt: '2025-06-01',
  },
  {
    id: 'u2',
    name: 'Priya Verma',
    email: 'priya.verma@gmail.com',
    phone: '+91 99340 12098',
    role: 'owner',
    flatId: 'flat-b405',
    societyId: 'soc-green-meadows',
    joinedAt: '2024-01-15',
  },
  {
    id: 'u3',
    name: 'Rajesh Patel',
    email: 'rajesh.patel@gmail.com',
    phone: '+91 87654 32100',
    role: 'admin',
    societyId: 'soc-green-meadows',
    joinedAt: '2023-10-01',
  },
  {
    id: 'u4',
    name: 'Sunita Kumari',
    email: 'sunita.k@gmail.com',
    phone: '+91 77543 21900',
    role: 'tenant',
    flatId: 'flat-c101',
    societyId: 'soc-river-heights',
    joinedAt: '2025-09-10',
  },
];

export const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string }> = {
  tenant: { email: 'arjun.sharma@gmail.com', password: 'tenant123' },
  owner: { email: 'priya.verma@gmail.com', password: 'owner123' },
  admin: { email: 'rajesh.patel@gmail.com', password: 'admin123' },
  vendor: { email: 'vendor@example.com', password: 'vendor123' },
};
