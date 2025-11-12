import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Auth Store - Updated for Zustand 5.x with new persist API
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Login action - stores token and user data from backend
      login: (data) => {
        const { token, email, fullName, role } = data;
        
        // Store token in localStorage (without 'Bearer ' prefix)
        const cleanToken = token.replace('Bearer ', '');
        localStorage.setItem('authToken', cleanToken);
        
        const firstName = fullName?.split(' ')[0] || '';
        const lastName = fullName?.split(' ').slice(1).join(' ') || '';
        
        console.log('✅ Login successful:', { email, role });
        
        set({
          token: cleanToken,
          user: {
            email,
            firstName,
            lastName,
            fullName: fullName || `${firstName} ${lastName}`.trim(),
            role,
          },
          isAuthenticated: true,
          isLoading: false,
        });
      },

      // Logout action
      logout: () => {
        console.log('👋 Logging out...');
        localStorage.removeItem('authToken');
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      // Update user data
      setUser: (user) => {
        set({ user });
      },

      // Update token
      setToken: (token) => {
        if (token) {
          const cleanToken = token.replace('Bearer ', '');
          localStorage.setItem('authToken', cleanToken);
          set({ token: cleanToken });
        } else {
          localStorage.removeItem('authToken');
          set({ token: null });
        }
      },

      // Set loading state
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // Check if user has specific role
      hasRole: (role) => {
        const currentUser = get().user;
        return currentUser?.role === role;
      },

      // Check if authenticated
      checkAuth: () => {
        const token = get().token;
        const user = get().user;
        return !!(token && user);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// UI Store - For managing UI state
export const useUIStore = create(
  persist(
    (set, get) => ({
      // State
      sidebarOpen: true,
      theme: 'light',
      notifications: [],

      // Actions
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },
      
      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== 'undefined') {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      addNotification: (notification) => {
        set((state) => ({
          notifications: [...state.notifications, { id: Date.now(), ...notification }],
        }));
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);