'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AuthLayout from '@/modules/auth/components/auth-layout';
import AuthSideBranding from '@/modules/auth/components/auth-side-branding';
import LoginForm from '@/modules/auth/components/login-form';
import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const { login, navigateTo } = useAuthStore();

  const handleLogin = () => {
    login('user@diginue.com', 'password');
  };

  const handleForgotPassword = () => {
    navigateTo('forgot-password');
  };

  const handleRegister = () => {
    navigateTo('register');
  };

  return (
    <AuthLayout
      leftPanel={<AuthSideBranding />}
      rightPanel={
        <div className="flex w-full flex-col items-center justify-center min-h-screen px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="w-full max-w-md"
          >
            <LoginForm
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              onRegister={handleRegister}
            />

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center space-y-4"
            >
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={handleRegister}
                  className="font-semibold text-gray-900 transition-colors hover:text-gray-700 hover:underline"
                >
                  Create one
                </button>
              </p>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  &copy; 2025 DigiNue. All rights reserved.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      }
    />
  );
}
