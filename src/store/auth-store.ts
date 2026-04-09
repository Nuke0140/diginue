import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthView: boolean; // true = login, false = signup
  showAuth: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  toggleAuthView: () => void;
  setShowAuth: (show: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthView: true,
  showAuth: true,

  login: (email: string, _password: string) => {
    set({
      user: {
        id: '1',
        name: email.split('@')[0],
        email,
      },
      isAuthenticated: true,
      showAuth: false,
    });
  },

  signup: (name: string, email: string, _password: string) => {
    set({
      user: {
        id: '1',
        name,
        email,
      },
      isAuthenticated: true,
      showAuth: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      showAuth: true,
      isAuthView: true,
    });
  },

  toggleAuthView: () => set((state) => ({ isAuthView: !state.isAuthView })),
  setShowAuth: (show: boolean) => set({ showAuth: show }),
}));
