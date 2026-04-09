'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import AuthPage from '@/components/auth/auth-page';
import WindowsDesktop from '@/components/dashboard/windows-desktop';

export default function Home() {
  const { showAuth, isAuthenticated } = useAuthStore();

  return (
    <AnimatePresence mode="wait">
      {showAuth || !isAuthenticated ? (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <AuthPage />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WindowsDesktop />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
