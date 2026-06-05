'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: any, token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, token, refreshToken) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('refresh_token', refreshToken);
        }
        set({ user, token, refreshToken, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('refresh_token');
        }
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
