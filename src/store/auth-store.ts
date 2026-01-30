import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DummyUser } from '@/types/dummy-user';

interface AuthState {
  user: DummyUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: DummyUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
