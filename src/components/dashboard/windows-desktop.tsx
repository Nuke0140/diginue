'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import {
  LogOut,
  LayoutDashboard,
  Factory,
  Users,
  Megaphone,
  TrendingUp,
  DollarSign,
  Sprout,
  BarChart3,
  Bot,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Wifi,
  Battery,
  Volume2,
  Sun,
  Zap,
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  span: string; // tailwind col-span
  description: string;
}

const modules: Module[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-cyan-400',
    span: 'col-span-2',
    description: 'Overview & Analytics',
  },
  {
    id: 'erp',
    name: 'ERP',
    icon: Factory,
    gradient: 'from-orange-500 to-amber-400',
    span: 'col-span-1',
    description: 'Enterprise Resource',
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: Users,
    gradient: 'from-rose-500 to-pink-400',
    span: 'col-span-1',
    description: 'Customer Relations',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: Megaphone,
    gradient: 'from-violet-500 to-purple-400',
    span: 'col-span-2',
    description: 'Campaigns & Outreach',
  },
  {
    id: 'sales',
    name: 'Sales & Lead',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-green-400',
    span: 'col-span-1',
    description: 'Pipeline & Deals',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: DollarSign,
    gradient: 'from-yellow-500 to-orange-400',
    span: 'col-span-1',
    description: 'Accounts & Budget',
  },
  {
    id: 'growth',
    name: 'Refresh & Growth',
    icon: Sprout,
    gradient: 'from-teal-500 to-emerald-400',
    span: 'col-span-2',
    description: 'Strategy & Expansion',
  },
  {
    id: 'analytics',
    name: 'Analytics & BI',
    icon: BarChart3,
    gradient: 'from-sky-500 to-blue-400',
    span: 'col-span-1',
    description: 'Insights & Reports',
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: Bot,
    gradient: 'from-fuchsia-500 to-pink-400',
    span: 'col-span-1',
    description: 'Workflows & AI',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    gradient: 'from-gray-500 to-slate-400',
    span: 'col-span-2',
    description: 'Configuration & Preferences',
  },
];

function ModuleTile({ module, index }: { module: Module; index: number }) {
  const [hovered, setHovered] = useState(false);

  const isWide = module.span === 'col-span-2';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.08 * index,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${module.span} cursor-pointer group`}
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative h-36 md:h-44 rounded-2xl bg-gradient-to-br ${module.gradient} overflow-hidden shadow-lg`}
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          animate={{ backgroundPosition: hovered ? '12px 12px' : '0px 0px' }}
          transition={{ duration: 0.5 }}
        />

        {/* Light sweep on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{ translateX: hovered ? '200%' : '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Bottom accent glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"
          animate={{ opacity: hovered ? 0.3 : 0.15 }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.div
              animate={{
                rotate: hovered ? [0, -10, 10, 0] : 0,
                scale: hovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <module.icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
            </motion.div>
            {isWide && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4 text-white -rotate-90" />
              </motion.div>
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-base md:text-lg tracking-tight">
              {module.name}
            </h3>
            <p className="text-white/60 text-xs md:text-sm mt-0.5">
              {module.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WindowsDesktop() {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      {/* Windows 8 top bar */}
      <header className="h-8 bg-[#1a1a2e] border-b border-white/5 flex items-center justify-between px-4">
        {/* Left: quick access */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 cursor-pointer transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold tracking-wide">DIGINUE</span>
          </motion.div>
        </div>

        {/* Right: system tray */}
        <div className="flex items-center gap-3 text-white/40">
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5" />
          <Volume2 className="w-3 h-3" />
          <Sun className="w-3 h-3" />
          <span className="text-[10px] font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4"
        >
          <div>
            <h2 className="text-white/90 text-xl md:text-2xl font-bold tracking-tight">
              {greeting}, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{user?.name || 'User'}</span>
            </h2>
            <p className="text-white/30 text-sm mt-0.5">
              Welcome to your enterprise command center
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 w-64"
            >
              <Search className="w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search modules..."
                className="bg-transparent text-white/70 text-sm placeholder:text-white/25 focus:outline-none flex-1"
              />
            </motion.div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/[0.1] transition-all"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] text-white flex items-center justify-center font-bold">
                3
              </span>
            </motion.button>

            {/* User avatar */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20"
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </motion.button>

              {/* User dropdown */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-12 w-56 rounded-xl bg-[#252545] border border-white/10 shadow-xl p-2 z-50"
                >
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="text-white/90 text-sm font-semibold">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-white/40 text-xs">{user?.email || 'user@example.com'}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] text-sm transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Module tiles grid - Windows 8 style */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <ModuleTile key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
      </main>

      {/* Windows 8 bottom taskbar */}
      <footer className="h-10 bg-[#1a1a2e]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-center">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
