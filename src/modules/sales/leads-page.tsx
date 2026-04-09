'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Search, Plus, Download, Upload, Users, UserCheck,
  Target, DollarSign, Phone, MessageCircle, ArrowRightLeft,
  ChevronDown, Filter, X, Copy, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { mockSalesLeads } from './data/mock-data';
import type { SalesLead, LeadIntent, LeadStatus } from './types';

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

function getInitials(first: string, last: string): string {
  return `${first[0]}${last[1]}`.toUpperCase();
}

function getIntentBadge(intent: LeadIntent, isDark: boolean): { emoji: string; label: string; cls: string } {
  switch (intent) {
    case 'hot': return { emoji: '🔥', label: 'Hot', cls: isDark ? 'bg-red-500/15 text-red-300 border-red-500/20' : 'bg-red-50 text-red-700 border-red-200' };
    case 'warm': return { emoji: '🟡', label: 'Warm', cls: isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'cold': return { emoji: '⚪', label: 'Cold', cls: isDark ? 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20' : 'bg-zinc-50 text-zinc-600 border-zinc-200' };
    case 'stale': return { emoji: '⚠️', label: 'Stale', cls: isDark ? 'bg-orange-500/15 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200' };
  }
}

function getScoreColor(score: number, isDark: boolean): string {
  if (score >= 70) return isDark ? 'text-emerald-400' : 'text-emerald-600';
  if (score >= 40) return isDark ? 'text-amber-400' : 'text-amber-600';
  return isDark ? 'text-red-400' : 'text-red-600';
}

function getScoreBarColor(score: number): string {
  if (score >= 70) return 'bg-emerald-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
}

function getSourceLabel(source: string): string {
  const map: Record<string, string> = {
    website: 'Website', meta_ads: 'Meta Ads', google_ads: 'Google Ads',
    whatsapp: 'WhatsApp', qr: 'QR Code', csv_import: 'CSV Import',
    manual: 'Manual', referral: 'Referral', linkedin: 'LinkedIn',
    event: 'Event', cold_call: 'Cold Call',
  };
  return map[source] || source;
}

const intentFilters: { value: LeadIntent | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '📋' },
  { value: 'hot', label: 'Hot', emoji: '🔥' },
  { value: 'warm', label: 'Warm', emoji: '🟡' },
  { value: 'cold', label: 'Cold', emoji: '⚪' },
  { value: 'stale', label: 'Stale', emoji: '⚠️' },
];

const ITEMS_PER_PAGE = 8;

export default function LeadsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const [intentFilter, setIntentFilter] = useState<LeadIntent | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [repFilter, setRepFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hoveredLead, setHoveredLead] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueSources = useMemo(() => [...new Set(mockSalesLeads.map(l => l.source))], []);
  const uniqueReps = useMemo(() => [...new Set(mockSalesLeads.map(l => l.assignedRep))], []);

  const filteredLeads = useMemo(() => {
    return mockSalesLeads.filter(l => {
      if (search && !`${l.firstName} ${l.lastName} ${l.company} ${l.email}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (intentFilter !== 'all' && l.intent !== intentFilter) return false;
      if (sourceFilter !== 'all' && l.source !== sourceFilter) return false;
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (repFilter !== 'all' && l.assignedRep !== repFilter) return false;
      return true;
    });
  }, [search, intentFilter, sourceFilter, statusFilter, repFilter]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats = useMemo(() => ({
    total: mockSalesLeads.length,
    hot: mockSalesLeads.filter(l => l.intent === 'hot').length,
    avgScore: Math.round(mockSalesLeads.reduce((s, l) => s + l.score, 0) / mockSalesLeads.length),
    totalRevenue: mockSalesLeads.reduce((s, l) => s + l.expectedRevenue, 0),
  }), []);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedLeads.map(l => l.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h1 className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-black')}>
              Leads
            </h1>
            <Badge variant="secondary" className="text-xs px-2.5 py-0.5 font-bold">
              {filteredLeads.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl border w-64',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.06]'
            )}>
              <Search className={cn('w-4 h-4 shrink-0', isDark ? 'text-white/30' : 'text-black/30')} />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className={cn('bg-transparent text-sm focus:outline-none w-full', isDark ? 'text-white/80 placeholder:text-white/25' : 'text-black/80 placeholder:text-black/25')}
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X className={cn('w-3.5 h-3.5', isDark ? 'text-white/30' : 'text-black/30')} />
                </button>
              )}
            </div>
            <Button className="rounded-xl h-9 px-4 text-sm font-medium">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Top Actions Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className={cn('rounded-lg text-xs h-8', isDark ? 'border-white/[0.08] text-white/60' : 'border-black/[0.08] text-black/60')}>
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Import CSV
          </Button>
          <Button variant="outline" size="sm" className={cn('rounded-lg text-xs h-8', isDark ? 'border-white/[0.08] text-white/60' : 'border-black/[0.08] text-black/60')}>
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export
          </Button>
          <Button variant="outline" size="sm" className={cn('rounded-lg text-xs h-8', isDark ? 'border-white/[0.08] text-white/60' : 'border-black/[0.08] text-black/60')}>
            <Users className="w-3.5 h-3.5 mr-1.5" /> Bulk Assign
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={cn('rounded-lg text-xs h-8', isDark ? 'border-white/[0.08] text-white/60' : 'border-black/[0.08] text-black/60')}>
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Saved Views <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>All Leads</DropdownMenuItem>
              <DropdownMenuItem>Hot Leads</DropdownMenuItem>
              <DropdownMenuItem>High Value</DropdownMenuItem>
              <DropdownMenuItem>Recently Active</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: stats.total.toString(), icon: Users, color: isDark ? 'text-sky-400' : 'text-sky-600' },
            { label: 'Hot Leads', value: stats.hot.toString(), icon: UserCheck, color: isDark ? 'text-red-400' : 'text-red-600' },
            { label: 'Avg Score', value: `${stats.avgScore}/100`, icon: Target, color: isDark ? 'text-amber-400' : 'text-amber-600' },
            { label: 'Expected Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: isDark ? 'text-emerald-400' : 'text-emerald-600' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'rounded-xl p-4 border',
                isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={cn('w-4 h-4', stat.color)} />
                <span className={cn('text-xs font-medium', isDark ? 'text-white/50' : 'text-black/50')}>{stat.label}</span>
              </div>
              <p className={cn('text-xl font-bold', isDark ? 'text-white' : 'text-black')}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Bar (Sticky) */}
        <div className={cn(
          'sticky top-0 z-10 rounded-xl p-3 border flex items-center gap-3 flex-wrap',
          isDark ? 'bg-[#0a0a0a]/90 border-white/[0.06] backdrop-blur-md' : 'bg-white/90 border-black/[0.06] backdrop-blur-md shadow-sm'
        )}>
          <div className="flex items-center gap-1.5 flex-wrap">
            {intentFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setIntentFilter(f.value); setCurrentPage(1); }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  intentFilter === f.value
                    ? isDark ? 'bg-white/[0.08] text-white' : 'bg-black/[0.06] text-black'
                    : isDark ? 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]' : 'text-black/40 hover:text-black/60 hover:bg-black/[0.04]'
                )}
              >
                {f.emoji} {f.label}
              </button>
            ))}
          </div>

          <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className={cn('w-[140px] h-8 text-xs rounded-lg', isDark ? 'border-white/[0.06] bg-white/[0.03]' : 'border-black/[0.06] bg-black/[0.02]')}>
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              {uniqueSources.map(s => (
                <SelectItem key={s} value={s}>{getSourceLabel(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className={cn('w-[130px] h-8 text-xs rounded-lg', isDark ? 'border-white/[0.06] bg-white/[0.03]' : 'border-black/[0.06] bg-black/[0.02]')}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {['new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost'].map(s => (
                <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={repFilter} onValueChange={(v) => { setRepFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className={cn('w-[160px] h-8 text-xs rounded-lg', isDark ? 'border-white/[0.06] bg-white/[0.03]' : 'border-black/[0.06] bg-black/[0.02]')}>
              <SelectValue placeholder="Assigned Rep" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reps</SelectItem>
              {uniqueReps.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Action Mode */}
        <AnimatePresence>
          {selectedIds.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={cn(
                'flex items-center gap-3 p-3 rounded-xl border',
                isDark ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-200'
              )}>
                <span className="text-xs font-medium text-amber-600">
                  {selectedIds.size} lead{selectedIds.size > 1 ? 's' : ''} selected
                </span>
                <Button size="sm" variant="outline" className="text-xs h-7 ml-auto">
                  <Users className="w-3 h-3 mr-1" /> Bulk Assign
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  <ArrowRightLeft className="w-3 h-3 mr-1" /> Convert to Deals
                </Button>
                <Button size="sm" variant="ghost" className="text-xs h-7 text-red-500" onClick={() => setSelectedIds(new Set())}>
                  Clear
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className={cn(
          'rounded-2xl border overflow-hidden',
          isDark ? 'border-white/[0.06]' : 'border-black/[0.06] shadow-sm'
        )}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={cn(
                  'border-b text-xs font-semibold uppercase tracking-wider',
                  isDark ? 'bg-white/[0.02] border-white/[0.06] text-white/40' : 'bg-black/[0.01] border-black/[0.06] text-black/40'
                )}>
                  <th className="p-3 w-10">
                    <Checkbox
                      checked={selectedIds.size === paginatedLeads.length && paginatedLeads.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left hidden md:table-cell">Source</th>
                  <th className="p-3 text-left hidden lg:table-cell">Campaign</th>
                  <th className="p-3 text-left hidden xl:table-cell">Phone</th>
                  <th className="p-3 text-left hidden xl:table-cell">Email</th>
                  <th className="p-3 text-left hidden md:table-cell">Score</th>
                  <th className="p-3 text-left">Intent</th>
                  <th className="p-3 text-left hidden lg:table-cell">Assigned</th>
                  <th className="p-3 text-left hidden xl:table-cell">Next Action</th>
                  <th className="p-3 text-right">Revenue</th>
                  <th className="p-3 text-center hidden lg:table-cell">SLA</th>
                  <th className="p-3 text-left hidden xl:table-cell">Created</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead, i) => {
                  const intentBadge = getIntentBadge(lead.intent, isDark);
                  return (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      onMouseEnter={() => setHoveredLead(lead.id)}
                      onMouseLeave={() => setHoveredLead(null)}
                      className={cn(
                        'border-b transition-colors relative group',
                        isDark ? 'border-white/[0.04] hover:bg-white/[0.03]' : 'border-black/[0.04] hover:bg-black/[0.01]',
                        selectedIds.has(lead.id) && (isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]')
                      )}
                    >
                      <td className="p-3">
                        <Checkbox checked={selectedIds.has(lead.id)} onCheckedChange={() => toggleSelect(lead.id)} />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0',
                            lead.intent === 'hot' && (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'),
                            lead.intent === 'warm' && (isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'),
                            lead.intent === 'cold' && (isDark ? 'bg-zinc-500/20 text-zinc-400' : 'bg-zinc-100 text-zinc-600'),
                            lead.intent === 'stale' && (isDark ? 'bg-zinc-500/10 text-zinc-500' : 'bg-zinc-100 text-zinc-500'),
                          )}>
                            {getInitials(lead.firstName, lead.lastName)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={cn('text-sm font-medium truncate', isDark ? 'text-white' : 'text-black')}>
                                {lead.firstName} {lead.lastName}
                              </span>
                              {lead.isHighValue && <span className="text-xs">🚀</span>}
                              {lead.isDuplicate && <Copy className="w-3 h-3 text-amber-400" />}
                            </div>
                            <p className={cn('text-[11px] truncate', isDark ? 'text-white/40' : 'text-black/40')}>
                              {lead.company}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Badge variant="outline" className={cn('text-[10px] px-2 py-0 h-5', isDark ? 'border-white/[0.08] text-white/50' : 'border-black/[0.08] text-black/50')}>
                          {getSourceLabel(lead.source)}
                        </Badge>
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <span className={cn('text-xs truncate block max-w-[140px]', isDark ? 'text-white/50' : 'text-black/50')}>
                          {lead.campaign || '—'}
                        </span>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <span className={cn('text-xs', isDark ? 'text-white/50' : 'text-black/50')}>{lead.phone}</span>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <span className={cn('text-xs', isDark ? 'text-white/50' : 'text-black/50')}>{lead.email}</span>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <div className="w-20">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className={cn('text-[10px] font-bold', getScoreColor(lead.score, isDark))}>{lead.score}</span>
                          </div>
                          <div className={cn('h-1.5 rounded-full overflow-hidden', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}>
                            <div className={cn('h-full rounded-full', getScoreBarColor(lead.score))} style={{ width: `${lead.score}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className={cn('text-[10px] px-2 py-0 h-5 border', intentBadge.cls)}>
                          {intentBadge.emoji} {intentBadge.label}
                        </Badge>
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <span className={cn('text-xs', isDark ? 'text-white/50' : 'text-black/50')}>{lead.assignedRep}</span>
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <span className={cn('text-xs truncate block max-w-[120px]', isDark ? 'text-white/40' : 'text-black/40')}>
                          {lead.nextAction || '—'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className={cn('text-xs font-semibold', isDark ? 'text-white' : 'text-black')}>
                          {formatCurrency(lead.expectedRevenue)}
                        </span>
                      </td>
                      <td className="p-3 text-center hidden lg:table-cell">
                        {lead.slaDeadline && (
                          <Badge className="text-[9px] px-1.5 py-0 h-4 bg-red-500/10 text-red-400 border-0 animate-pulse">
                            SLA
                          </Badge>
                        )}
                      </td>
                      <td className="p-3 hidden xl:table-cell">
                        <span className={cn('text-[11px]', isDark ? 'text-white/30' : 'text-black/30')}>
                          {new Date(lead.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className={cn('p-1.5 rounded-md transition-colors', isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]')}>
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button className={cn('p-1.5 rounded-md transition-colors', isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]')}>
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                          <button className={cn('p-1.5 rounded-md transition-colors', isDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/[0.06]')}>
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={cn(
            'flex items-center justify-between p-4 border-t',
            isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
          )}>
            <span className={cn('text-xs', isDark ? 'text-white/40' : 'text-black/40')}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredLeads.length)} of {filteredLeads.length}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    'w-8 h-8 rounded-lg text-xs font-medium transition-colors',
                    currentPage === i + 1
                      ? isDark ? 'bg-white/[0.08] text-white' : 'bg-black/[0.06] text-black'
                      : isDark ? 'text-white/40 hover:bg-white/[0.04]' : 'text-black/40 hover:bg-black/[0.04]'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
