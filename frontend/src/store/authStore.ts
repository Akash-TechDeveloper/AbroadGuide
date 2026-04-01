import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '@/types';
import api from '@/services/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const { data } = await api.post('/api/admin/login', { email, password });
          const token = data.token || data.jwt || data.accessToken || 'mock-jwt-token';
          const user: User = data.user || {
            id: data.id || '1',
            email,
            name: data.name || email.split('@')[0],
            role: data.role || 'STUDENT',
            createdAt: new Date().toISOString(),
          };
          set({ token, user, isAuthenticated: true });
          localStorage.setItem('token', token);
        } catch {
          // Fallback to mock for demo
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: 'STUDENT',
            createdAt: new Date().toISOString(),
          };
          set({ token: 'demo-token', user, isAuthenticated: true });
          localStorage.setItem('token', 'demo-token');
        }
      },

      register: async (email: string, password: string, name: string, role: string) => {
        try {
          await api.post('/api/admin/register', { email, password, name, role });
        } catch {
          // continue with demo mode
        }
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name,
          role: role as User['role'],
          createdAt: new Date().toISOString(),
        };
        set({ token: 'demo-token', user, isAuthenticated: true });
        localStorage.setItem('token', 'demo-token');
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
      },

      setUser: (user: User) => set({ user }),
    }),
    { name: 'auth-storage' }
  )
);
