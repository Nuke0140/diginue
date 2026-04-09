'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import WindowsDesktop from '@/components/dashboard/windows-desktop';
import LoginPage from '@/modules/auth/login-page';
import RegisterPage from '@/modules/auth/register-page';
import ForgotPasswordPage from '@/modules/auth/forgot-password-page';
import OtpPage from '@/modules/auth/otp-page';
import ProfilePage from '@/modules/auth/profile-page';
import RolesPage from '@/modules/auth/roles-page';
import TeamInvitePage from '@/modules/auth/team-invite-page';
import SessionsPage from '@/modules/auth/sessions-page';

const pageComponents: Record<string, React.ComponentType> = {
  login: LoginPage,
  register: RegisterPage,
  'forgot-password': ForgotPasswordPage,
  otp: OtpPage,
  profile: ProfilePage,
  roles: RolesPage,
  'team-invite': TeamInvitePage,
  sessions: SessionsPage,
};

// Pages that are part of the auth flow (before login)
const authEntryPages = new Set(['login', 'register', 'forgot-password', 'otp']);

// Pages that are management pages (after login, inside dashboard)
const managementPages = new Set(['profile', 'roles', 'team-invite', 'sessions']);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Home() {
  const { isAuthenticated, currentPage } = useAuthStore();

  // Determine what to show:
  // 1. Authenticated + on auth entry page (login/register/etc) → Dashboard
  // 2. Authenticated + on management page (profile/roles/etc) → That page
  // 3. Authenticated + currentPage not recognized → Dashboard
  // 4. Not authenticated → Show auth entry page or management page as fallback

  const isAuthEntry = authEntryPages.has(currentPage);
  const isManagement = managementPages.has(currentPage);

  // Show dashboard when: authenticated AND (on auth entry page OR page not recognized)
  const showDashboard = isAuthenticated && (isAuthEntry || !isManagement);

  // Show a specific management page when: authenticated AND on a known management page
  const showManagement = isAuthenticated && isManagement;

  // Show auth pages when: NOT authenticated
  const showAuth = !isAuthenticated;

  const CurrentPage = pageComponents[currentPage];

  let content: React.ReactNode;

  if (showDashboard) {
    content = <WindowsDesktop />;
  } else if (showManagement && CurrentPage) {
    content = <CurrentPage />;
  } else if (showAuth && CurrentPage) {
    content = <CurrentPage />;
  } else {
    // Fallback
    content = isAuthenticated ? <WindowsDesktop /> : <LoginPage />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={showDashboard ? 'dashboard' : currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
