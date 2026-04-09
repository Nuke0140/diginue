import { create } from 'zustand';

export type AuthPage =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'otp'
  | 'profile'
  | 'roles'
  | 'team-invite'
  | 'sessions';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  designation?: string;
  bio?: string;
  timezone?: string;
  language?: string;
  company?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  showAuth: boolean;
  currentPage: AuthPage;
  pendingOtpNumber: string;

  login: (email: string, password: string) => void;
  signup: (data: { name: string; email: string; password: string }) => void;
  logout: () => void;
  navigateTo: (page: AuthPage) => void;
  setPendingOtpNumber: (number: string) => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  showAuth: true,
  currentPage: 'login',
  pendingOtpNumber: '',

  login: (email: string, _password: string) => {
    set({
      user: {
        id: '1',
        name: email.split('@')[0],
        email,
        phone: '+91 98765 43210',
        designation: 'Admin',
        company: 'DigiNue Corp',
        role: 'Super Admin',
        timezone: 'Asia/Kolkata',
        language: 'English',
      },
      isAuthenticated: true,
      showAuth: false,
    });
  },

  signup: (data: { name: string; email: string; password: string }) => {
    set({
      user: {
        id: '1',
        name: data.name,
        email: data.email,
        phone: '',
        designation: 'Admin',
        company: '',
        role: 'Super Admin',
        timezone: 'Asia/Kolkata',
        language: 'English',
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
      currentPage: 'login',
      pendingOtpNumber: '',
    });
  },

  navigateTo: (page: AuthPage) => set({ currentPage: page }),
  setPendingOtpNumber: (number: string) => set({ pendingOtpNumber: number }),
  updateProfile: (data: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}));
