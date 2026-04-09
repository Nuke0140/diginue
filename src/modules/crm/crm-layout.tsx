'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useCrmStore } from './crm-store';
import { useAuthStore } from '@/store/auth-store';
import ContactsPage from './contacts-page';
import ContactDetailPage from './contact-detail-page';
import CompaniesPage from './companies-page';
import CompanyDetailPage from './company-detail-page';
import LeadsPage from './leads-page';
import LeadDetailPage from './lead-detail-page';
import DealsPage from './deals-page';
import DealDetailPage from './deal-detail-page';
import ActivitiesPage from './activities-page';
import TasksPage from './tasks-page';
import NotesPage from './notes-page';
import SegmentsPage from './segments-page';
import LifecyclePage from './lifecycle-page';
import ContactIntelligencePage from './contact-intelligence-page';
import {
  Search, Bell, Plus, Moon, Sun, Bot, X,
  Users, Building2, TrendingUp, Handshake, Activity,
  CheckSquare, FileText, Target, GitBranch, BrainCircuit,
  Menu, ChevronRight, Command, Sparkles, SlidersHorizontal,
  Download, Upload, MoreHorizontal, LogOut,
  Home, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import type { CrmPage } from './types';

const navItems: { id: CrmPage; label: string; icon: React.ElementType }[] = [
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'leads', label: 'Leads', icon: TrendingUp },
  { id: 'deals', label: 'Deals', icon: Handshake },
  { id: 'activities', label: 'Activities', icon: Activity },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'segments', label: 'Segments', icon: Target },
  { id: 'lifecycle', label: 'Lifecycle', icon: GitBranch },
  { id: 'contact-intelligence', label: 'AI Intelligence', icon: BrainCircuit },
];

function PageContent() {
  const { currentPage } = useCrmStore();

  const pageComponents: Record<string, React.ComponentType> = {
    'contacts': ContactsPage,
    'contact-detail': ContactDetailPage,
    'companies': CompaniesPage,
    'company-detail': CompanyDetailPage,
    'leads': LeadsPage,
    'lead-detail': LeadDetailPage,
    'deals': DealsPage,
    'deal-detail': DealDetailPage,
    'activities': ActivitiesPage,
    'tasks': TasksPage,
    'notes': NotesPage,
    'segments': SegmentsPage,
    'lifecycle': LifecyclePage,
    'contact-intelligence': ContactIntelligencePage,
  };

  const PageComponent = pageComponents[currentPage] || null;

  if (!PageComponent) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <PageComponent />
      </motion.div>
    </AnimatePresence>
  );
}

export default function CrmLayout() {
  const { theme, setTheme } = useTheme();
  const { user, logout, closeModule } = useAuthStore();
  const { currentPage, sidebarOpen, setSidebarOpen, goBack, goForward, canGoBack, canGoForward, navigateTo } = useCrmStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const isDark = theme === 'dark';

  const isDetailPage = currentPage.endsWith('-detail');
  const canBack = canGoBack();
  const canForward = canGoForward();

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn(
        'h-screen flex flex-col overflow-hidden transition-colors duration-300',
        isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-black'
      )}>
        {/* Top Bar */}
        <header className={cn(
          'h-14 border-b flex items-center justify-between px-4 gap-4 shrink-0 transition-colors',
          isDark ? 'bg-[#0a0a0a] border-white/[0.06]' : 'bg-white border-black/[0.06]'
        )}>
          <div className="flex items-center gap-1.5">
            {/* Home Button - Return to Dashboard */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeModule}
                  className={cn(
                    'shrink-0 h-8 w-8 rounded-lg',
                    isDark
                      ? 'hover:bg-white/[0.06] text-white/50 hover:text-white'
                      : 'hover:bg-black/[0.06] text-black/50 hover:text-black'
                  )}
                >
                  <Home className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Home Dashboard</p>
              </TooltipContent>
            </Tooltip>

            {/* Navigation Divider */}
            <div className={cn(
              'w-px h-5 mx-1',
              isDark ? 'bg-white/[0.08]' : 'bg-black/[0.08]'
            )} />

            {/* Back Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goBack}
                  disabled={!canBack}
                  className={cn(
                    'shrink-0 h-8 w-8 rounded-lg transition-opacity',
                    !canBack && 'opacity-30 cursor-not-allowed',
                    canBack && isDark && 'hover:bg-white/[0.06]',
                    canBack && !isDark && 'hover:bg-black/[0.06]'
                  )}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Go Back</p>
              </TooltipContent>
            </Tooltip>

            {/* Forward Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goForward}
                  disabled={!canForward}
                  className={cn(
                    'shrink-0 h-8 w-8 rounded-lg transition-opacity',
                    !canForward && 'opacity-30 cursor-not-allowed',
                    canForward && isDark && 'hover:bg-white/[0.06]',
                    canForward && !isDark && 'hover:bg-black/[0.06]'
                  )}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Go Forward</p>
              </TooltipContent>
            </Tooltip>

            {/* Navigation Divider */}
            <div className={cn(
              'w-px h-5 mx-1',
              isDark ? 'bg-white/[0.08]' : 'bg-black/[0.08]'
            )} />

            {/* Mobile sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden shrink-0 h-8 w-8 rounded-lg"
            >
              <Menu className="w-4 h-4" />
            </Button>

            {/* Logo & Breadcrumb */}
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="DigiNue" width={24} height={16} className="object-contain rounded-sm" />
              <span className={cn('text-sm font-semibold tracking-wide hidden sm:block', isDark ? 'text-white/60' : 'text-black/60')}>
                CRM
              </span>
              <ChevronRight className={cn('w-3 h-3 hidden sm:block', isDark ? 'text-white/20' : 'text-black/20')} />
              <span className="text-sm font-medium">{navItems.find(n => n.id === currentPage)?.label || 'CRM'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={cn(
              'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border w-64 transition-colors',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.06]'
            )}>
              <Search className={cn('w-4 h-4 shrink-0', isDark ? 'text-white/30' : 'text-black/30')} />
              <input
                type="text"
                placeholder="Search... (⌘K)"
                className={cn(
                  'bg-transparent text-sm focus:outline-none w-full',
                  isDark ? 'text-white/80 placeholder:text-white/25' : 'text-black/80 placeholder:text-black/25'
                )}
              />
              <kbd className={cn(
                'hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono',
                isDark ? 'bg-white/[0.06] text-white/30' : 'bg-black/[0.06] text-black/30'
              )}>
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </div>

            {/* Filters */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Filters</TooltipContent>
            </Tooltip>

            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-lg">
                  <Bell className="w-4 h-4" />
                  <span className={cn(
                    'absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center',
                    isDark ? 'bg-white text-black' : 'bg-black text-white'
                  )}>5</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>

            {/* AI Assistant */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{ boxShadow: ['0 0 0 0 rgba(139,92,246,0)', '0 0 0 4px rgba(139,92,246,0.1)', '0 0 0 0 rgba(139,92,246,0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>AI Assistant</TooltipContent>
            </Tooltip>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="h-8 w-8 rounded-lg"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* User Avatar */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={cn(
                  'h-8 w-8 rounded-lg font-bold text-xs',
                  isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
                )}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Button>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    'absolute right-0 top-11 w-56 rounded-xl border shadow-xl p-2 z-50',
                    isDark ? 'bg-[#1a1a1a] border-white/[0.08]' : 'bg-white border-black/[0.08]'
                  )}
                >
                  <div className={cn('px-3 py-2 border-b mb-1', isDark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
                    <p className="text-sm font-semibold">{user?.name || 'User'}</p>
                    <p className={cn('text-xs', isDark ? 'text-white/40' : 'text-black/40')}>{user?.email || ''}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      isDark ? 'text-white/60 hover:text-white hover:bg-white/[0.06]' : 'text-black/60 hover:text-black hover:bg-black/[0.06]'
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'border-r shrink-0 overflow-hidden hidden md:flex flex-col',
                  isDark ? 'border-white/[0.06] bg-[#0a0a0a]' : 'border-black/[0.06] bg-white'
                )}
              >
                <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 group',
                          isActive
                            ? isDark
                              ? 'bg-white/[0.08] text-white font-medium'
                              : 'bg-black/[0.06] text-black font-medium'
                            : isDark
                              ? 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                              : 'text-black/50 hover:text-black/80 hover:bg-black/[0.04]'
                        )}
                      >
                        <item.icon className={cn(
                          'w-4.5 h-4.5 transition-colors',
                          isActive
                            ? isDark ? 'text-white' : 'text-black'
                            : isDark ? 'text-white/30 group-hover:text-white/60' : 'text-black/30 group-hover:text-black/60'
                        )} />
                        <span className="truncate">{item.label}</span>
                        {item.id === 'contact-intelligence' && (
                          <Badge variant="secondary" className="ml-auto text-[9px] px-1.5 py-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-0">
                            AI
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Sidebar Footer */}
                <div className={cn(
                  'p-3 border-t space-y-3',
                  isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
                )}>
                  <div className={cn(
                    'rounded-xl p-3 border',
                    isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.06]'
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-medium">AI Insights</span>
                    </div>
                    <p className={cn('text-[11px] leading-relaxed', isDark ? 'text-white/40' : 'text-black/40')}>
                      3 new buying signals detected today
                    </p>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Page Content */}
          <main className="flex-1 overflow-hidden">
            <PageContent />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
