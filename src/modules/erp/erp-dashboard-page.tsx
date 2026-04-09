'use client';

import { useErpStore } from '@/modules/erp/erp-store';
import { useTheme } from 'next-themes';
import { LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ErpDashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-black')}>ERP Dashboard</h2>
        <p className={cn('text-sm mt-1', isDark ? 'text-white/50' : 'text-black/50')}>Overview of all operations, projects, and resources</p>
      </div>

      <div className={cn(
        'rounded-xl border p-12 flex flex-col items-center justify-center gap-4 min-h-[400px]',
        isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.01] border-black/[0.06]'
      )}>
        <LayoutDashboard className={cn('w-16 h-16', isDark ? 'text-white/10' : 'text-black/10')} />
        <div className="text-center">
          <p className={cn('text-lg font-semibold', isDark ? 'text-white/30' : 'text-black/30')}>ERP Dashboard</p>
          <p className={cn('text-sm mt-1', isDark ? 'text-white/15' : 'text-black/15')}>Full dashboard implementation coming soon</p>
        </div>
      </div>
    </div>
  );
}
