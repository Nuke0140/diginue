'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  ChevronRight,
  Zap,
} from 'lucide-react';

export default function AuthPage() {
  const { login, signup, isAuthView, toggleAuthView } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    if (isAuthView) {
      login(email, password);
    } else {
      signup(name, email, password);
    }
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a1a]">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-600/30 via-blue-600/20 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-600/25 via-cyan-600/15 to-transparent blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -60, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Main auth card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glass card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-2xl shadow-black/20 p-8 md:p-10">
          {/* Top accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

          {/* Logo area */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="relative mb-4">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-purple-500/25"
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Briefcase className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0a0a1a]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              DigiNue
            </h1>
            <p className="text-white/40 text-sm mt-1.5 tracking-wide">
              Enterprise Business Suite
            </p>
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isAuthView ? 'login' : 'signup'}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: isAuthView ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAuthView ? -30 : 30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Name field (signup only) */}
              <AnimatePresence>
                {!isAuthView && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-purple-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-400/20 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email field */}
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-blue-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
              </div>

              {/* Password field */}
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-emerald-400/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>

              {/* Extra row */}
              {isAuthView && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-white/40 cursor-pointer hover:text-white/60 transition-colors">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 accent-purple-500"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-purple-400/70 hover:text-purple-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-shadow disabled:opacity-70 overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      {isAuthView ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </span>
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/25 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-3">
            {['Google', 'GitHub', 'Microsoft'].map((provider) => (
              <motion.button
                key={provider}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/60 text-xs font-medium hover:bg-white/[0.1] hover:text-white/80 transition-all"
              >
                {provider}
              </motion.button>
            ))}
          </div>

          {/* Toggle auth view */}
          <div className="mt-6 text-center">
            <p className="text-white/35 text-sm">
              {isAuthView ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={toggleAuthView}
                className="ml-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors inline-flex items-center gap-0.5"
              >
                {isAuthView ? 'Sign Up' : 'Sign In'}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </p>
          </div>
        </div>

        {/* Bottom branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-1.5 mt-6 text-white/20 text-xs"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Powered by DigiNue Platform</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
