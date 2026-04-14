import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../data/users';
import { MOCK_USERS } from '../data/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'hi';
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const DEMO_PASSWORDS: Record<string, string> = {
  'arjun.sharma@gmail.com': 'tenant123',
  'priya.verma@gmail.com': 'owner123',
  'rajesh.patel@gmail.com': 'admin123',
  'sunita.k@gmail.com': 'tenant123',
};

const ROLE_DEFAULT_USERS: Record<UserRole, string> = {
  tenant: 'u1',
  owner: 'u2',
  admin: 'u3',
  vendor: 'u4',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      theme: 'light' as const,
      language: 'en' as const,

      login: (email: string, password: string) => {
        const expectedPassword = DEMO_PASSWORDS[email];
        if (!expectedPassword) return { success: false, error: 'Email not found' };
        if (expectedPassword !== password) return { success: false, error: 'Incorrect password' };
        const user = MOCK_USERS.find(u => u.email === email);
        if (!user) return { success: false, error: 'User not found' };
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      loginAsRole: (role: UserRole) => {
        const userId = ROLE_DEFAULT_USERS[role];
        const user = MOCK_USERS.find(u => u.id === userId);
        if (user) set({ user, isAuthenticated: true });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        set({ theme: newTheme });
      },

      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'hi' : 'en' })),
    }),
    {
      name: 'staysphere-auth',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);
