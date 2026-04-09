'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { GripVertical, Calendar, Clock, AlertTriangle, Mail, Phone, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Deal } from '../types';

interface DealCardProps {
  deal: Deal;
  onSelect?: (deal: Deal) => void;
  isDragging?: boolean;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

function getProbabilityColor(probability: number, isDark: boolean) {
  if (probability >= 70) return isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (probability >= 40) return isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200';
  return isDark ? 'bg-red-500/20 text-red-300 border-red-500/20' : 'bg-red-50 text-red-700 border-red-200';
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function DealCard({ deal, onSelect, isDragging }: DealCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showActions, setShowActions] = useState(false);

  const isStuck = deal.aging > 15;

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      onClick={() => onSelect?.(deal)}
      className={cn(
        'relative rounded-xl border p-3.5 cursor-pointer transition-all duration-200 group',
        isDragging && 'opacity-50 shadow-2xl scale-105',
        isDark
          ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20'
          : 'bg-white border-black/[0.06] hover:bg-black/[0.01] hover:border-black/[0.12] hover:shadow-lg hover:shadow-black/5'
      )}
    >
      {/* Drag Handle */}
      <div className={cn(
        'absolute left-0 top-0 bottom-0 rounded-l-xl flex items-start justify-center pt-4 w-5 opacity-0 group-hover:opacity-100 transition-opacity',
        isDark ? 'bg-white/[0.06]' : 'bg-black/[0.03]'
      )}>
        <GripVertical className={cn('w-3 h-3', isDark ? 'text-white/20' : 'text-black/20')} />
      </div>

      {/* Header: Deal name + Probability */}
      <div className="flex items-start justify-between gap-2 mb-2 pl-1">
        <h4 className={cn(
          'text-sm font-semibold leading-tight line-clamp-2',
          isDark ? 'text-white' : 'text-black'
        )}>
          {deal.name}
        </h4>
        <span className={cn(
          'shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md border',
          getProbabilityColor(deal.probability, isDark)
        )}>
          {deal.probability}%
        </span>
      </div>

      {/* Company & Contact */}
      <div className="pl-1 space-y-1 mb-3">
        <p className={cn('text-xs truncate', isDark ? 'text-white/50' : 'text-black/50')}>
          {deal.company}
        </p>
        <p className={cn('text-xs truncate', isDark ? 'text-white/40' : 'text-black/40')}>
          {deal.contactName}
        </p>
      </div>

      {/* Value */}
      <div className="pl-1 mb-3">
        <span className={cn('text-lg font-bold tracking-tight', isDark ? 'text-white' : 'text-black')}>
          {formatCurrency(deal.value)}
        </span>
        {deal.probability > 0 && deal.probability < 100 && (
          <span className={cn('text-[10px] ml-2', isDark ? 'text-white/30' : 'text-black/30')}>
            weighted {formatCurrency(deal.weightedValue)}
          </span>
        )}
      </div>

      {/* Footer: Date, Owner, Aging */}
      <div className={cn(
        'flex items-center justify-between pl-1 pt-2 border-t',
        isDark ? 'border-white/[0.04]' : 'border-black/[0.04]'
      )}>
        <div className="flex items-center gap-1.5">
          <Calendar className={cn('w-3 h-3', isDark ? 'text-white/20' : 'text-black/20')} />
          <span className={cn('text-[10px]', isDark ? 'text-white/30' : 'text-black/30')}>
            {new Date(deal.expectedClose).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Owner Avatar */}
        <div className={cn(
          'w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold',
          isDark ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/60'
        )}>
          {getInitials(deal.owner)}
        </div>
      </div>

      {/* Stuck Warning */}
      {isStuck && (
        <div className={cn(
          'flex items-center gap-1 mt-2 pl-1',
          isDark ? 'text-amber-400/70' : 'text-amber-600'
        )}>
          <AlertTriangle className="w-3 h-3" />
          <span className="text-[10px] font-medium">Stuck {deal.aging}d</span>
        </div>
      )}

      {/* Quick Actions */}
      {showActions && !isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'absolute -right-1 -top-1 flex flex-col gap-0.5 p-0.5 rounded-lg border shadow-lg z-10',
            isDark ? 'bg-[#1a1a1a] border-white/[0.08]' : 'bg-white border-black/[0.08]'
          )}
        >
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]'
            )}
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]'
            )}
          >
            <Mail className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]'
            )}
          >
            <Phone className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]'
            )}
          >
            <Clock className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
