'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore, type AuthPage } from '@/store/auth-store';
import WindowsDesktop from '@/components/dashboard/windows-desktop';
import LoginPage from '@/modules/auth/login-page';
import RegisterPage from '@/modules/auth/register-page';
import ForgotPasswordPage from '@/modules/auth/forgot-password-page';
import OtpPage from '@/modules/auth/otp-page';
import ProfilePage from '@/modules/auth/profile-page';
import RolesPage from '@/modules/auth/roles-page';
import TeamInvitePage from '@/modules/auth/team-invite-page';
import SessionsPage from '@/modules/auth/sessions-page';

const authPages: Record<string, React.ComponentType> = {
  login: LoginPage,
  register: RegisterPage,
  'forgot-password': ForgotPasswordPage,
  otp: OtpPage,
  profile: ProfilePage,
  roles: RolesPage,
  'team-invite': TeamInvitePage,
  sessions: SessionsPage,
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Home() {
  const { isAuthenticated, currentPage } = useAuthStore();

  const isAuthFlow = ['login', 'register', 'forgot-password', 'otp'].includes(
    currentPage
  );

  const showDashboard = isAuthenticated && !isAuthFlow;

  const CurrentPage = authPages[currentPage];

  return (
    <AnimatePresence mode="wait">
      {showDashboard ? (
        <motion.div
          key="dashboard"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <WindowsDesktop />
        </motion.div>
      ) : (
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {CurrentPage && <CurrentPage />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
