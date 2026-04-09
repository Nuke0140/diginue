'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Building2, Calendar, Clock, AlertTriangle, DollarSign, User,
  BrainCircuit, ArrowRight, ArrowLeftRight, Edit3, Plus,
  Video, BarChart3, Target, TrendingUp, Zap, Shield,
  Trash2, Eye, FileText, MessageSquare, Phone, CheckCircle2,
  XCircle, Timer, Handshake,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useSalesStore } from './sales-store';
import { mockSalesDeals } from './data/mock-data';
import type { DealStage } from './types';

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

const STAGE_LABELS: Record<DealStage, string> = {
  new: 'New', qualified: 'Qualified', discovery: 'Discovery', demo: 'Demo',
  proposal: 'Proposal', negotiation: 'Negotiation', won: 'Won', lost: 'Lost',
};

const STAGES: DealStage[] = ['new', 'qualified', 'discovery', 'demo', 'proposal', 'negotiation', 'won', 'lost'];

function getStageColor(stage: DealStage, isDark: boolean): string {
  const map: Record<DealStage, string> = {
    new: isDark ? 'bg-white/[0.06] text-white/60' : 'bg-black/[0.06] text-black/60',
    qualified: isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-50 text-blue-700',
    discovery: isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-50 text-cyan-700',
    demo: isDark ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-50 text-purple-700',
    proposal: isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700',
    negotiation: isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700',
    won: isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700',
    lost: isDark ? 'bg-red-500/15 text-red-300' : 'bg-red-50 text-red-700',
  };
  return map[stage];
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

/* Mock activity data for any deal */
const MOCK_ACTIVITIES = [
  { id: 'a1', type: 'call', icon: '📞', subject: 'Discovery call with prospect', description: 'Discussed pain points and timeline. Prospect interested in enterprise tier.', outcome: 'Positive — scheduled follow-up demo', time: '2 hours ago', user: 'Priya Sharma' },
  { id: 'a2', type: 'email', icon: '✉️', subject: 'Sent pricing proposal', description: 'Attached customized pricing deck with volume discounts.', outcome: 'Opened by client', time: 'Yesterday', user: 'Priya Sharma' },
  { id: 'a3', type: 'meeting', icon: '📅', subject: 'Executive stakeholder meeting', description: 'Met with CTO and CFO. Discussed ROI projections and integration timeline.', outcome: 'Strong buy-in from both stakeholders', time: '3 days ago', user: 'Priya Sharma' },
  { id: 'a4', type: 'demo', icon: '🎯', subject: 'Product demo — full platform walkthrough', description: 'Demonstrated all key modules including analytics dashboard and automation features.', outcome: 'Very impressed, requested technical deep-dive', time: '5 days ago', user: 'Rahul Verma' },
  { id: 'a5', type: 'proposal', icon: '📄', subject: 'Proposal v3 shared with client', description: 'Updated proposal reflecting agreed scope changes and discount terms.', time: '1 week ago', user: 'Priya Sharma' },
  { id: 'a6', type: 'note', icon: '📝', subject: 'Internal strategy note', description: 'Competitive situation: Salesforce and HubSpot also in consideration. We lead on AI features.', time: '1 week ago', user: 'Ananya Das' },
  { id: 'a7', type: 'call', icon: '📞', subject: 'Follow-up call with decision maker', description: 'Confirmed budget approval from board. Looking to close by end of month.', outcome: 'Budget approved — proceed with final terms', time: '2 weeks ago', user: 'Priya Sharma' },
  { id: 'a8', type: 'whatsapp', icon: '💬', subject: 'WhatsApp follow-up', description: 'Sent case study link and answered quick question about API integration.', time: '2 weeks ago', user: 'Priya Sharma' },
];

/* Mock proposal versions */
const MOCK_PROPOSALS = [
  { version: 3, date: 'Apr 8, 2026', value: '$180K', status: 'sent', changes: 'Updated pricing, added SLA terms' },
  { version: 2, date: 'Mar 25, 2026', value: '$195K', status: 'viewed', changes: 'Reduced scope, adjusted discount' },
  { version: 1, date: 'Mar 10, 2026', value: '$220K', status: 'rejected', changes: 'Initial proposal' },
];

/* Mock pricing history */
const MOCK_PRICING_HISTORY = [
  { date: 'Apr 8, 2026', value: 180000, change: '-7.7%', reason: 'Volume discount applied' },
  { date: 'Mar 25, 2026', value: 195000, change: '-11.4%', reason: 'Scope reduction' },
  { date: 'Mar 10, 2026', value: 220000, change: '+0%', reason: 'Initial pricing' },
];

/* Mock stakeholders */
const MOCK_STAKEHOLDERS = [
  { name: 'Vikram Singh', role: 'CTO — Decision Maker', initials: 'VS' },
  { name: 'Priya Mehta', role: 'CFO — Budget Owner', initials: 'PM' },
  { name: 'Raj Kumar', role: 'VP Engineering — Influencer', initials: 'RK' },
  { name: 'Anita Sharma', role: 'IT Director — Evaluator', initials: 'AS' },
];

/* Mock negotiation notes */
const MOCK_NEGOTIATION_NOTES = [
  { id: 'n1', note: 'Client is pushing for 20% discount. We offered 10% with extended contract term. Waiting for counter.', date: '2 hours ago', author: 'Priya Sharma' },
  { id: 'n2', note: 'Competitive situation: Salesforce offering 15% off. Need to emphasize AI differentiation and faster ROI.', date: 'Yesterday', author: 'Ananya Das' },
  { id: 'n3', note: 'Legal team reviewing contract. Expected to complete by end of week. No red flags so far.', date: '3 days ago', author: 'Rahul Verma' },
];

export default function DealDetailPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { selectedDealId } = useSalesStore();

  const deal = useMemo(() => mockSalesDeals.find(d => d.id === selectedDealId), [selectedDealId]);

  if (!deal) {
    return (
      <div className={cn('flex items-center justify-center h-full', isDark ? 'text-white/30' : 'text-black/30')}>
        <div className="text-center">
          <Handshake className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Select a deal to view details</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = STAGES.indexOf(deal.stage);
  const aiWinProb = deal.probability > 0 ? Math.min(Math.round(deal.probability * 1.15), 98) : 0;
  const riskScore = deal.probability >= 70 ? 25 : deal.probability >= 40 ? 55 : 78;
  const riskLabel = riskScore <= 30 ? 'Low' : riskScore <= 60 ? 'Medium' : 'High';
  const riskColor = riskScore <= 30 ? 'text-emerald-400' : riskScore <= 60 ? 'text-amber-400' : 'text-red-400';

  return (
    <ScrollArea className="h-full">
      <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className={cn('text-2xl font-bold tracking-tight', isDark ? 'text-white' : 'text-black')}>
                  {deal.name}
                </h1>
                <span className={cn('inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize', getStageColor(deal.stage, isDark))}>
                  {STAGE_LABELS[deal.stage]}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className={cn('flex items-center gap-1.5', isDark ? 'text-white/40' : 'text-black/40')}>
                  <Building2 className="w-3.5 h-3.5" /> {deal.company}
                </span>
                <span className={cn('flex items-center gap-1.5', isDark ? 'text-white/40' : 'text-black/40')}>
                  <User className="w-3.5 h-3.5" /> {deal.contactName}
                </span>
              </div>
              {/* Pipeline progress dots */}
              <div className="flex items-center gap-1 mt-4">
                {STAGES.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-0.5 flex-1">
                    <div className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors',
                      i <= currentStageIndex
                        ? isDark ? 'bg-white/20' : 'bg-black/20'
                        : isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'
                    )} />
                    {i < STAGES.length - 1 && (
                      <ArrowRight className={cn('w-2.5 h-2.5 shrink-0',
                        i < currentStageIndex
                          ? isDark ? 'text-white/30' : 'text-black/30'
                          : isDark ? 'text-white/10' : 'text-black/10'
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {STAGES.map((stage, idx) => (
                  <span key={stage} className={cn('text-[8px] flex-1 text-center',
                    idx <= currentStageIndex
                      ? isDark ? 'text-white/40' : 'text-black/40'
                      : isDark ? 'text-white/15' : 'text-black/15'
                  )}>
                    {STAGE_LABELS[stage].charAt(0)}
                  </span>
                ))}
              </div>
            </div>

            {/* Value + Probability */}
            <div className="text-right shrink-0">
              <p className={cn('text-3xl font-bold tracking-tight', isDark ? 'text-white' : 'text-black')}>
                {formatCurrency(deal.value)}
              </p>
              <div className="flex items-center gap-2 mt-2 justify-end">
                <span className={cn('text-xs', isDark ? 'text-white/40' : 'text-black/40')}>Probability</span>
                <div className={cn('w-24 h-2 rounded-full overflow-hidden', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${deal.probability}%` }}
                    transition={{ duration: 0.6 }}
                    className={cn('h-full rounded-full',
                      deal.probability >= 70 ? 'bg-emerald-500' : deal.probability >= 40 ? 'bg-amber-500' : 'bg-red-500'
                    )}
                  />
                </div>
                <span className={cn('text-xs font-bold', deal.probability >= 70 ? 'text-emerald-500' : deal.probability >= 40 ? 'text-amber-500' : 'text-red-500')}>
                  {deal.probability}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Deal Details Card */}
            <div className={cn('rounded-2xl border p-4 space-y-3', isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06]')}>
              <h3 className={cn('text-xs font-semibold uppercase tracking-wider', isDark ? 'text-white/30' : 'text-black/30')}>Deal Details</h3>
              {[
                { label: 'Company', value: deal.company, icon: Building2 },
                { label: 'Contact', value: deal.contactName, icon: User },
                { label: 'Owner', value: deal.owner, icon: User },
                { label: 'Created', value: new Date(deal.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: Calendar },
                { label: 'Expected Close', value: new Date(deal.expectedClose).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: Target },
                { label: 'Contract Type', value: deal.contractType ? deal.contractType.charAt(0).toUpperCase() + deal.contractType.slice(1) : 'N/A', icon: FileText },
                { label: 'Renewal Chance', value: deal.renewalChance ? `${deal.renewalChance}%` : 'N/A', icon: Timer },
                { label: 'Days in Stage', value: `${deal.daysInStage}d`, icon: Clock, alert: deal.daysInStage > 15 },
              ].map(({ label, value, icon: Icon, alert }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]')}>
                    <Icon className={cn('w-3.5 h-3.5', alert ? 'text-amber-500' : (isDark ? 'text-white/30' : 'text-black/30'))} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={cn('text-[10px] uppercase tracking-wider block', isDark ? 'text-white/20' : 'text-black/20')}>{label}</span>
                    <span className={cn('text-xs font-medium truncate block', alert ? 'text-amber-500' : (isDark ? 'text-white/70' : 'text-black/70'))}>{value}</span>
                  </div>
                  {alert && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </div>
              ))}
            </div>

            {/* Stakeholders */}
            <div className={cn('rounded-2xl border p-4', isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06]')}>
              <h3 className={cn('text-xs font-semibold uppercase tracking-wider mb-3', isDark ? 'text-white/30' : 'text-black/30')}>Stakeholders</h3>
              <div className="space-y-2">
                {MOCK_STAKEHOLDERS.map((s) => (
                  <div key={s.name} className={cn('flex items-center gap-3 p-2 rounded-xl', isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]')}>
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                      isDark ? 'bg-white/[0.06] text-white' : 'bg-black/[0.06] text-black'
                    )}>
                      {s.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-xs font-medium truncate', isDark ? 'text-white/70' : 'text-black/70')}>{s.name}</p>
                      <p className={cn('text-[10px] truncate', isDark ? 'text-white/25' : 'text-black/25')}>{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={cn('rounded-2xl border p-4 space-y-2', isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06]')}>
              <h3 className={cn('text-xs font-semibold uppercase tracking-wider mb-3', isDark ? 'text-white/30' : 'text-black/30')}>Quick Actions</h3>
              {[
                { label: 'Edit Deal', icon: Edit3 },
                { label: 'Add Activity', icon: Plus },
                { label: 'Schedule Meeting', icon: Video },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-colors',
                  isDark ? 'text-white/50 hover:text-white hover:bg-white/[0.06]' : 'text-black/50 hover:text-black hover:bg-black/[0.06]'
                )}>
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Center Panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className={cn('rounded-2xl border overflow-hidden', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-black/[0.06]')}>
              <Tabs defaultValue="activity">
                <div className={cn('px-4 border-b', isDark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
                  <TabsList className={cn('rounded-xl p-0.5 h-9 mt-3 bg-transparent', isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]')}>
                    <TabsTrigger value="activity" className="rounded-lg text-xs gap-1.5">Activity Timeline</TabsTrigger>
                    <TabsTrigger value="proposals" className="rounded-lg text-xs gap-1.5">Proposal Versions</TabsTrigger>
                    <TabsTrigger value="pricing" className="rounded-lg text-xs gap-1.5">Pricing History</TabsTrigger>
                    <TabsTrigger value="notes" className="rounded-lg text-xs gap-1.5">Negotiation Notes</TabsTrigger>
                  </TabsList>
                </div>

                {/* Activity Timeline */}
                <TabsContent value="activity" className="m-0">
                  <div className="divide-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>
                    {MOCK_ACTIVITIES.map((activity, i) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn('p-4 transition-colors', isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-black/[0.01]')}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0', isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]')}>
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-black')}>{activity.subject}</p>
                            {activity.description && (
                              <p className={cn('text-xs mt-0.5 line-clamp-2', isDark ? 'text-white/40' : 'text-black/40')}>{activity.description}</p>
                            )}
                            {activity.outcome && (
                              <p className={cn('text-xs mt-1', isDark ? 'text-emerald-400/70' : 'text-emerald-600/70')}>{activity.outcome}</p>
                            )}
                            <div className={cn('flex items-center gap-2 mt-1.5 text-[10px]', isDark ? 'text-white/20' : 'text-black/20')}>
                              <span>{activity.user}</span>
                              <span>·</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Proposal Versions */}
                <TabsContent value="proposals" className="m-0 p-4 space-y-3">
                  {MOCK_PROPOSALS.map((p) => (
                    <div key={p.version} className={cn('flex items-center gap-4 p-3 rounded-xl border', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.01] border-black/[0.06]')}>
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0', isDark ? 'bg-white/[0.06] text-white' : 'bg-black/[0.06] text-black')}>
                        v{p.version}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-black')}>Version {p.version}</p>
                        <p className={cn('text-xs', isDark ? 'text-white/40' : 'text-black/40')}>{p.date} · {p.value}</p>
                        <p className={cn('text-[10px] mt-0.5', isDark ? 'text-white/25' : 'text-black/25')}>{p.changes}</p>
                      </div>
                      <span className={cn('inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium capitalize',
                        p.status === 'sent' ? 'bg-blue-500/15 text-blue-400' :
                        p.status === 'viewed' ? 'bg-purple-500/15 text-purple-400' :
                        p.status === 'rejected' ? 'bg-red-500/15 text-red-400' :
                        isDark ? 'bg-white/[0.06] text-white/40' : 'bg-black/[0.06] text-black/40'
                      )}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </TabsContent>

                {/* Pricing History */}
                <TabsContent value="pricing" className="m-0 p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={cn('border-b', isDark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
                          {['Date', 'Value', 'Change', 'Reason'].map(col => (
                            <th key={col} className={cn('px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider', isDark ? 'text-white/30' : 'text-black/30')}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_PRICING_HISTORY.map((row, i) => (
                          <motion.tr
                            key={row.date}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn('border-b', isDark ? 'border-white/[0.04]' : 'border-black/[0.04]')}
                          >
                            <td className={cn('px-4 py-3 text-xs', isDark ? 'text-white/40' : 'text-black/40')}>{row.date}</td>
                            <td className={cn('px-4 py-3 text-xs font-semibold', isDark ? 'text-white/80' : 'text-black/80')}>{formatCurrency(row.value)}</td>
                            <td className={cn('px-4 py-3 text-xs font-medium', row.change.startsWith('-') ? 'text-red-500' : 'text-white/40')}>
                              {row.change}
                            </td>
                            <td className={cn('px-4 py-3 text-xs', isDark ? 'text-white/50' : 'text-black/50')}>{row.reason}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                {/* Negotiation Notes */}
                <TabsContent value="notes" className="m-0 p-4 space-y-3">
                  {MOCK_NEGOTIATION_NOTES.map((note) => (
                    <div key={note.id} className={cn('rounded-xl border p-4', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.01] border-black/[0.06]')}>
                      <p className={cn('text-sm', isDark ? 'text-white/70' : 'text-black/70')}>{note.note}</p>
                      <div className={cn('flex items-center gap-2 mt-2 text-[10px]', isDark ? 'text-white/25' : 'text-black/25')}>
                        <span>{note.author}</span>
                        <span>·</span>
                        <span>{note.date}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>

          {/* Right Panel — AI Widgets */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            <div className={cn('rounded-2xl border p-4 space-y-4', isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06]')}>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <h3 className={cn('text-xs font-semibold uppercase tracking-wider', isDark ? 'text-white/30' : 'text-black/30')}>AI Intelligence</h3>
              </div>

              {/* Win Probability Circular Gauge */}
              <div className={cn('rounded-xl p-4 border flex flex-col items-center', isDark ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-black/[0.01] border-black/[0.04]')}>
                <span className={cn('text-[10px] uppercase tracking-wider block mb-3', isDark ? 'text-white/25' : 'text-black/25')}>Win Probability</span>
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} strokeWidth="6" />
                    <motion.circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke={aiWinProb >= 70 ? '#22c55e' : aiWinProb >= 40 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - aiWinProb / 100) }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-black')}>{aiWinProb}%</span>
                  </div>
                </div>
                <span className={cn('text-[10px] mt-2', isDark ? 'text-emerald-400' : 'text-emerald-600')}>AI adjusted estimate</span>
              </div>

              {/* Risk Score */}
              <div className={cn('rounded-xl p-3 border', isDark ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-black/[0.01] border-black/[0.04]')}>
                <div className="flex items-center justify-between mb-2">
                  <span className={cn('text-[10px] uppercase tracking-wider', isDark ? 'text-white/25' : 'text-black/25')}>Risk Score</span>
                  <Shield className={cn('w-3.5 h-3.5', riskColor)} />
                </div>
                <div className="flex items-end gap-2">
                  <span className={cn('text-2xl font-bold', riskColor)}>{riskScore}</span>
                  <span className={cn('text-xs mb-1', isDark ? 'text-white/30' : 'text-black/30')}>/100</span>
                </div>
                <div className={cn('h-1.5 rounded-full overflow-hidden mt-2', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${riskScore}%` }}
                    transition={{ duration: 0.6 }}
                    className={cn('h-full rounded-full',
                      riskScore <= 30 ? 'bg-emerald-500' : riskScore <= 60 ? 'bg-amber-500' : 'bg-red-500'
                    )}
                  />
                </div>
                <span className={cn('text-[10px] mt-1 block', isDark ? 'text-white/40' : 'text-black/40')}>{riskLabel} Risk</span>
              </div>

              {/* Competitor Risk */}
              {deal.competitors && deal.competitors.length > 0 && (
                <div className={cn('rounded-xl p-3 border', isDark ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-black/[0.01] border-black/[0.04]')}>
                  <span className={cn('text-[10px] uppercase tracking-wider block mb-2', isDark ? 'text-white/25' : 'text-black/25')}>Competitor Risk</span>
                  <div className="space-y-2">
                    {deal.competitors.map((comp) => {
                      const riskLevel = comp === 'Salesforce' ? 'High' : comp === 'HubSpot' ? 'Medium' : 'Low';
                      const riskBg = riskLevel === 'High' ? 'bg-red-500/15 text-red-400' : riskLevel === 'Medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400';
                      return (
                        <div key={comp} className="flex items-center justify-between">
                          <span className={cn('text-xs', isDark ? 'text-white/60' : 'text-black/60')}>{comp}</span>
                          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-md font-medium', riskBg)}>{riskLevel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Discount Risk */}
              {deal.discountPercent !== undefined && (
                <div className={cn('rounded-xl p-3 border', isDark ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-black/[0.01] border-black/[0.04]')}>
                  <span className={cn('text-[10px] uppercase tracking-wider block mb-2', isDark ? 'text-white/25' : 'text-black/25')}>Discount Risk</span>
                  <div className="flex items-center gap-2">
                    <div className={cn('h-2 rounded-full overflow-hidden flex-1', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(deal.discountPercent * 5, 100)}%` }}
                        transition={{ duration: 0.6 }}
                        className={cn('h-full rounded-full',
                          deal.discountPercent >= 15 ? 'bg-red-500' : deal.discountPercent >= 10 ? 'bg-amber-500' : 'bg-emerald-500'
                        )}
                      />
                    </div>
                    <span className={cn('text-xs font-bold', deal.discountPercent >= 15 ? 'text-red-500' : deal.discountPercent >= 10 ? 'text-amber-500' : 'text-emerald-500')}>
                      {deal.discountPercent}%
                    </span>
                  </div>
                  <p className={cn('text-[10px] mt-1', isDark ? 'text-white/30' : 'text-black/30')}>
                    {deal.discountPercent >= 15 ? 'High discount — review margins' : deal.discountPercent >= 10 ? 'Moderate discount' : 'Within healthy range'}
                  </p>
                </div>
              )}

              {/* Ideal Close Date */}
              <div className={cn('rounded-xl p-3 border', isDark ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-black/[0.01] border-black/[0.04]')}>
                <span className={cn('text-[10px] uppercase tracking-wider block mb-2', isDark ? 'text-white/25' : 'text-black/25')}>Ideal Close Date</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-black')}>
                    {new Date(deal.expectedClose).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <p className={cn('text-[10px] mt-1', isDark ? 'text-white/30' : 'text-black/30')}>Based on deal velocity and buyer signals</p>
              </div>

              {/* Next Best Action */}
              <div className={cn('rounded-xl border p-3', isDark ? 'bg-purple-500/[0.06] border-purple-500/20' : 'bg-purple-50 border-purple-200')}>
                <span className={cn('text-[10px] uppercase tracking-wider block mb-2', isDark ? 'text-purple-300/60' : 'text-purple-600/60')}>Next Best Action</span>
                <p className={cn('text-xs mb-3', isDark ? 'text-white/70' : 'text-black/70')}>
                  {deal.stage === 'proposal' && 'Schedule pricing discussion with CFO. Emphasize ROI metrics and case studies from similar companies.'}
                  {deal.stage === 'negotiation' && 'Create urgency with Q2 budget deadline. Prepare final terms document for legal review.'}
                  {deal.stage === 'demo' && 'Follow up with technical deep-dive. Prepare customized integration demo based on their tech stack.'}
                  {deal.stage === 'discovery' && 'Conduct needs assessment meeting. Map pain points to product features with ROI calculator.'}
                  {deal.stage === 'qualified' && 'Schedule product demo. Send industry-specific case study to build credibility.'}
                  {(deal.stage === 'new') && 'Research company pain points and decision makers before initial outreach.'}
                  {deal.stage === 'won' && 'Initiate onboarding process. Send welcome package and schedule success plan meeting.'}
                  {deal.stage === 'lost' && 'Send feedback survey. Schedule win/loss debrief and add to nurture campaign.'}
                </p>
                <Button size="sm" className={cn('w-full h-8 rounded-lg text-[11px] font-semibold',
                  isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
                )}>
                  <Zap className="w-3 h-3 mr-1.5" />
                  Take Action
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={cn('sticky bottom-0 -mx-4 md:-mx-6 px-4 md:px-6 py-4 border-t',
            isDark ? 'bg-[#0a0a0a]/90 border-white/[0.06]' : 'bg-white/90 border-black/[0.06]'
          )}
        >
          <div className="flex flex-wrap items-center gap-2 max-w-[1600px] mx-auto">
            <Select>
              <SelectTrigger className={cn('h-9 w-44 text-xs rounded-xl', isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.06]')}>
                <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue placeholder="Move Stage" />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map(stage => (
                  <SelectItem key={stage} value={stage}>{STAGE_LABELS[stage]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-9 px-4 rounded-xl text-xs">
              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
            <Button variant="outline" className={cn('h-9 px-4 rounded-xl text-xs', isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-500/[0.06] hover:border-red-500/20' : 'text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200')}>
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Delete
            </Button>
          </div>
        </motion.div>
      </div>
    </ScrollArea>
  );
}
