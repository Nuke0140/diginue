'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Phone, MessageCircle, Mail, CalendarPlus, FileText,
  ArrowRightLeft, ChevronRight, Globe, Clock, User, Building2,
  Tag, Target, TrendingUp, AlertTriangle, Sparkles, Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useSalesStore } from './sales-store';
import { mockSalesLeads } from './data/mock-data';

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

function getIntentBadge(intent: string, isDark: boolean): { emoji: string; label: string; cls: string } {
  switch (intent) {
    case 'hot': return { emoji: '🔥', label: 'Hot', cls: isDark ? 'bg-red-500/15 text-red-300 border-red-500/20' : 'bg-red-50 text-red-700 border-red-200' };
    case 'warm': return { emoji: '🟡', label: 'Warm', cls: isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'cold': return { emoji: '⚪', label: 'Cold', cls: isDark ? 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20' : 'bg-zinc-50 text-zinc-600 border-zinc-200' };
    case 'stale': return { emoji: '⚠️', label: 'Stale', cls: isDark ? 'bg-orange-500/15 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200' };
    default: return { emoji: '⚪', label: 'Unknown', cls: isDark ? 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20' : 'bg-zinc-50 text-zinc-600 border-zinc-200' };
  }
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

// Mock timeline entries
const mockTimeline = [
  { id: 't1', type: 'form_submit', icon: '📝', title: 'Form Submitted', desc: 'Contact form on pricing page', time: '2 hours ago', group: 'Today' },
  { id: 't2', type: 'whatsapp', icon: '💬', title: 'WhatsApp Message', desc: 'Inquiry about enterprise features', time: '4 hours ago', group: 'Today' },
  { id: 't3', type: 'demo', icon: '📅', title: 'Demo Booked', desc: 'Product demo scheduled for next week', time: '6 hours ago', group: 'Today' },
  { id: 't4', type: 'ad_click', icon: '🎯', title: 'Ad Click', desc: 'Clicked LinkedIn sponsored post', time: 'Yesterday', group: 'Yesterday' },
  { id: 't5', type: 'landing_page', icon: '🌐', title: 'Landing Page Visit', desc: 'Visited enterprise landing page', time: 'Yesterday', group: 'Yesterday' },
  { id: 't6', type: 'proposal_viewed', icon: '📄', title: 'Proposal Viewed', desc: 'Viewed 8 of 12 pages', time: '2 days ago', group: 'This Week' },
  { id: 't7', type: 'email', icon: '📧', title: 'Email Opened', desc: 'Opened follow-up email', time: '3 days ago', group: 'This Week' },
  { id: 't8', type: 'ad_click', icon: '🎯', title: 'Ad Click', desc: 'Clicked Google Ads remarketing', time: '5 days ago', group: 'This Week' },
];

function ScoreGauge({ score, isDark }: { score: number; isDark: boolean }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-2xl font-bold', isDark ? 'text-white' : 'text-black')}>{score}</span>
        <span className={cn('text-[10px]', isDark ? 'text-white/40' : 'text-black/40')}>/ 100</span>
      </div>
    </div>
  );
}

function AiCircularGauge({ label, value, isDark }: { label: string; value: number; isDark: boolean }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 70 ? '#10b981' : value >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className={cn(
      'rounded-xl p-4 border text-center',
      isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
    )}>
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r={radius} fill="none" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} strokeWidth="5" />
          <motion.circle
            cx="35" cy="35" r={radius} fill="none"
            stroke={color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-black')}>{value}%</span>
        </div>
      </div>
      <p className={cn('text-[10px] font-medium', isDark ? 'text-white/50' : 'text-black/50')}>{label}</p>
    </div>
  );
}

export default function LeadDetailPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const selectedLeadId = useSalesStore((s) => s.selectedLeadId);

  const lead = useMemo(() => {
    return mockSalesLeads.find(l => l.id === selectedLeadId);
  }, [selectedLeadId]);

  if (!lead) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className={cn('text-sm', isDark ? 'text-white/40' : 'text-black/40')}>No lead selected</p>
      </div>
    );
  }

  const intentBadge = getIntentBadge(lead.intent, isDark);

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Panel */}
        <div className={cn(
          'w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r p-6',
          isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
        )}>
          <div className="space-y-6">
            {/* Avatar */}
            <div className="text-center">
              <div className={cn(
                'w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-3',
                lead.intent === 'hot' && (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'),
                lead.intent === 'warm' && (isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'),
                lead.intent === 'cold' && (isDark ? 'bg-zinc-500/20 text-zinc-400' : 'bg-zinc-100 text-zinc-600'),
                lead.intent === 'stale' && (isDark ? 'bg-zinc-500/10 text-zinc-500' : 'bg-zinc-100 text-zinc-500'),
              )}>
                {lead.firstName[0]}{lead.lastName[0]}
              </div>
              <h2 className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-black')}>
                {lead.firstName} {lead.lastName}
              </h2>
              <p className={cn('text-sm', isDark ? 'text-white/50' : 'text-black/50')}>
                {lead.title}
              </p>
              {lead.company && (
                <p className={cn('text-sm flex items-center justify-center gap-1 mt-0.5', isDark ? 'text-white/40' : 'text-black/40')}>
                  <Building2 className="w-3.5 h-3.5" /> {lead.company}
                </p>
              )}
            </div>

            {/* Score Gauge */}
            <div>
              <ScoreGauge score={lead.score} isDark={isDark} />
            </div>

            {/* Intent Badge */}
            <div className="flex justify-center">
              <Badge className={cn('text-xs px-3 py-1 border', intentBadge.cls)}>
                {intentBadge.emoji} {intentBadge.label} Intent
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {[
                { icon: Globe, label: 'Source', value: getSourceLabel(lead.source) },
                { icon: User, label: 'Assigned', value: lead.assignedRep },
                { icon: Mail, label: 'Email', value: lead.email },
                { icon: Phone, label: 'Phone', value: lead.phone },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className={cn('w-4 h-4 shrink-0', isDark ? 'text-white/30' : 'text-black/30')} />
                  <span className={cn('text-xs', isDark ? 'text-white/40' : 'text-black/40')}>{item.label}</span>
                  <span className={cn('text-xs ml-auto truncate max-w-[160px]', isDark ? 'text-white/70' : 'text-black/70')}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Campaign & Tags */}
            {lead.campaign && (
              <div className={cn('rounded-xl p-3 border', isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-black/[0.01] border-black/[0.06]')}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Tag className={cn('w-3 h-3', isDark ? 'text-white/30' : 'text-black/30')} />
                  <span className={cn('text-[10px]', isDark ? 'text-white/30' : 'text-black/30')}>Campaign</span>
                </div>
                <p className={cn('text-xs font-medium', isDark ? 'text-white/60' : 'text-black/60')}>{lead.campaign}</p>
              </div>
            )}

            {/* SLA Timer */}
            {lead.slaDeadline && (
              <div className={cn('rounded-xl p-3 border', isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200')}>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-medium text-red-400">SLA Deadline</span>
                </div>
                <p className="text-xs font-semibold text-red-400 mt-1">
                  {new Date(lead.slaDeadline).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 min-w-0 p-6">
          <Tabs defaultValue="timeline">
            <TabsList className={cn(
              'mb-6',
              isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
            )}>
              <TabsTrigger value="timeline" className="text-xs">Timeline</TabsTrigger>
              <TabsTrigger value="deals" className="text-xs">Deals</TabsTrigger>
              <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
              <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <div className="space-y-6">
                {['Today', 'Yesterday', 'This Week'].map((group) => {
                  const items = mockTimeline.filter(t => t.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group}>
                      <h3 className={cn('text-xs font-semibold uppercase tracking-wider mb-3', isDark ? 'text-white/30' : 'text-black/30')}>
                        {group}
                      </h3>
                      <div className="space-y-2">
                        {items.map((item, i) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                            className={cn(
                              'flex items-start gap-3 p-3 rounded-xl transition-colors',
                              isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.02]'
                            )}
                          >
                            <div className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm',
                              isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]'
                            )}>
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn('text-sm font-medium', isDark ? 'text-white' : 'text-black')}>{item.title}</p>
                              <p className={cn('text-xs', isDark ? 'text-white/40' : 'text-black/40')}>{item.desc}</p>
                            </div>
                            <span className={cn('text-[10px] shrink-0', isDark ? 'text-white/20' : 'text-black/20')}>{item.time}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="deals">
              <div className={cn(
                'flex flex-col items-center justify-center py-16 text-center',
                isDark ? 'text-white/30' : 'text-black/30'
              )}>
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-3',
                  isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
                )}>
                  <span className="text-xl">🤝</span>
                </div>
                <p className="text-sm font-medium mb-1">No deals yet</p>
                <p className="text-xs">Convert this lead to create a deal</p>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <div className={cn(
                'flex flex-col items-center justify-center py-16 text-center',
                isDark ? 'text-white/30' : 'text-black/30'
              )}>
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-3',
                  isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
                )}>
                  <span className="text-xl">✅</span>
                </div>
                <p className="text-sm font-medium mb-1">No tasks</p>
                <p className="text-xs">Create tasks for this lead</p>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className={cn(
                'flex flex-col items-center justify-center py-16 text-center',
                isDark ? 'text-white/30' : 'text-black/30'
              )}>
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-3',
                  isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
                )}>
                  <span className="text-xl">📝</span>
                </div>
                <p className="text-sm font-medium mb-1">No notes</p>
                <p className="text-xs">Add notes about this lead</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className={cn(
          'w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l p-6',
          isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
        )}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-black')}>AI Assistant</h3>
          </div>

          <div className="space-y-4">
            {/* Close Probability */}
            <AiCircularGauge label="Close Probability" value={lead.score} isDark={isDark} />

            {/* Best Follow-up Time */}
            <div className={cn(
              'rounded-xl p-4 border',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
            )}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className={cn('w-4 h-4', isDark ? 'text-white/40' : 'text-black/40')} />
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/60' : 'text-black/60')}>Best Follow-up</span>
              </div>
              <p className={cn('text-sm font-bold', isDark ? 'text-white' : 'text-black')}>2–4 PM IST</p>
              <p className={cn('text-[10px] mt-0.5', isDark ? 'text-white/30' : 'text-black/30')}>
                Most responsive after lunch
              </p>
            </div>

            {/* Next Best Action */}
            <div className={cn(
              'rounded-xl p-4 border',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
            )}>
              <div className="flex items-center gap-2 mb-2">
                <Target className={cn('w-4 h-4', isDark ? 'text-white/40' : 'text-black/40')} />
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/60' : 'text-black/60')}>Next Best Action</span>
              </div>
              <p className={cn('text-sm font-medium', isDark ? 'text-white/80' : 'text-black/80')}>
                Schedule executive demo focused on ROI
              </p>
            </div>

            {/* Expected Deal Value */}
            <div className={cn(
              'rounded-xl p-4 border',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
            )}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={cn('w-4 h-4', isDark ? 'text-white/40' : 'text-black/40')} />
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/60' : 'text-black/60')}>Expected Deal Value</span>
              </div>
              <p className={cn('text-lg font-bold', isDark ? 'text-white' : 'text-black')}>
                {formatCurrency(lead.expectedRevenue)}
              </p>
            </div>

            {/* Churn Risk */}
            <div className={cn(
              'rounded-xl p-4 border',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
            )}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={cn('w-4 h-4', isDark ? 'text-white/40' : 'text-black/40')} />
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/60' : 'text-black/60')}>Churn Risk</span>
                <span className={cn('ml-auto text-xs font-bold', lead.intent === 'stale' ? 'text-red-400' : 'text-emerald-400')}>
                  {lead.intent === 'stale' ? 'High' : lead.intent === 'cold' ? 'Medium' : 'Low'}
                </span>
              </div>
              <Progress
                value={lead.intent === 'stale' ? 75 : lead.intent === 'cold' ? 40 : 15}
                className={cn('h-1.5', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}
              />
            </div>

            {/* Response Likelihood */}
            <div className={cn(
              'rounded-xl p-4 border',
              isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-black/[0.06] shadow-sm'
            )}>
              <div className="flex items-center gap-2 mb-2">
                <Shield className={cn('w-4 h-4', isDark ? 'text-white/40' : 'text-black/40')} />
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/60' : 'text-black/60')}>Response Likelihood</span>
                <span className={cn('ml-auto text-xs font-bold', isDark ? 'text-emerald-400' : 'text-emerald-600')}>
                  {lead.score >= 70 ? '92%' : lead.score >= 40 ? '65%' : '30%'}
                </span>
              </div>
              <Progress
                value={lead.score >= 70 ? 92 : lead.score >= 40 ? 65 : 30}
                className={cn('h-1.5', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className={cn(
        'sticky bottom-0 border-t px-6 py-3 flex items-center gap-2 flex-wrap',
        isDark ? 'bg-[#0a0a0a]/90 border-white/[0.06] backdrop-blur-md' : 'bg-white/90 border-black/[0.06] backdrop-blur-md shadow-sm'
      )}>
        <Button size="sm" className="rounded-lg text-xs">
          <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
        </Button>
        <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', isDark ? 'border-white/[0.08] text-white/70' : 'border-black/[0.08] text-black/70')}>
          <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> WhatsApp
        </Button>
        <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', isDark ? 'border-white/[0.08] text-white/70' : 'border-black/[0.08] text-black/70')}>
          <Mail className="w-3.5 h-3.5 mr-1.5" /> Email
        </Button>
        <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', isDark ? 'border-white/[0.08] text-white/70' : 'border-black/[0.08] text-black/70')}>
          <ArrowRightLeft className="w-3.5 h-3.5 mr-1.5" /> Create Deal
        </Button>
        <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', isDark ? 'border-white/[0.08] text-white/70' : 'border-black/[0.08] text-black/70')}>
          <CalendarPlus className="w-3.5 h-3.5 mr-1.5" /> Schedule Demo
        </Button>
        <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', isDark ? 'border-white/[0.08] text-white/70' : 'border-black/[0.08] text-black/70')}>
          <FileText className="w-3.5 h-3.5 mr-1.5" /> Send Proposal
        </Button>
        <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', isDark ? 'border-white/[0.08] text-white/70' : 'border-black/[0.08] text-black/70')}>
          <ChevronRight className="w-3.5 h-3.5 mr-1.5" /> Move Stage
        </Button>
      </div>
    </div>
  );
}
