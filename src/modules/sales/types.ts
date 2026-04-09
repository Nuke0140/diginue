// ============================================
// Sales Module Types
// ============================================

export interface SalesLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  title?: string;
  source: LeadSource;
  campaign?: string;
  score: number;
  intent: LeadIntent;
  status: LeadStatus;
  assignedRep: string;
  assignedRepId: string;
  expectedRevenue: number;
  nextAction?: string;
  nextActionDate?: string;
  slaDeadline?: string;
  isDuplicate?: boolean;
  isHighValue: boolean;
  createdDate: string;
  lastActivity?: string;
  notes?: string;
}

export interface SalesDeal {
  id: string;
  name: string;
  company: string;
  companyId?: string;
  contactId: string;
  contactName: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedClose: string;
  owner: string;
  ownerId: string;
  daysInStage: number;
  createdDate: string;
  weightedValue: number;
  contractType?: 'monthly' | 'annual' | 'one-time';
  renewalChance?: number;
  nextMeeting?: string;
  competitors?: string[];
  discountPercent?: number;
}

export interface SalesForecast {
  id: string;
  repName: string;
  repId: string;
  pipelineValue: number;
  weightedForecast: number;
  bestCase: number;
  worstCase: number;
  committed: number;
  month: string;
}

export interface TeamPerformance {
  id: string;
  repName: string;
  repId: string;
  avatar?: string;
  dealsWon: number;
  revenueClosed: number;
  followUpSla: number;
  avgResponseTime: string;
  closeRate: number;
  aiProductivityScore: number;
  rank: number;
  targetProgress: number;
  targetAmount: number;
}

export interface FollowUp {
  id: string;
  leadName: string;
  leadId: string;
  company?: string;
  type: FollowUpType;
  status: FollowUpStatus;
  priority: FollowUpPriority;
  assignedTo: string;
  assignedToId: string;
  scheduledDate: string;
  scheduledTime?: string;
  isOverdue: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  aiSuggestion?: string;
  notes?: string;
  createdDate: string;
}

export interface Proposal {
  id: string;
  title: string;
  dealName: string;
  dealId: string;
  contactName: string;
  contactId: string;
  company: string;
  status: ProposalStatus;
  version: number;
  totalValue: number;
  currency: string;
  template?: string;
  viewedByClient: boolean;
  lastViewedAt?: string;
  pagesRead: number;
  totalPages: number;
  approvalState?: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  paymentStatus?: 'pending' | 'partial' | 'paid';
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
}

export interface LeadSource {
  id: string;
  name: string;
  type: SourceType;
  leadCount: number;
  conversionRate: number;
  revenue: number;
  trend: number;
  webhookStatus: 'active' | 'error' | 'inactive';
  lastLeadAt?: string;
}

export interface QualificationData {
  leadId: string;
  leadName: string;
  budget: QualificationScore;
  authority: QualificationScore;
  need: QualificationScore;
  timeline: QualificationScore;
  overallScore: number;
  confidence: number;
  painPoints: string[];
  decisionMaker: boolean;
  urgency: number;
  productFit: number;
  aiPurchaseIntent: number;
}

export interface QualificationScore {
  score: number;
  maxScore: number;
  notes?: string;
}

export interface WinLossData {
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
  winRate: number;
  avgSalesCycle: number;
  avgDiscount: number;
  totalWonRevenue: number;
  totalLostRevenue: number;
  competitorLosses: { competitor: string; count: number; revenue: number }[];
  lossReasons: { reason: string; count: number; percentage: number }[];
  stageDropoffs: { stage: string; entered: number; exited: number; dropRate: number }[];
  monthlyWinLoss: { month: string; won: number; lost: number }[];
}

export interface RevenueMetric {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
}

// Enums
export type LeadSource = 'website' | 'meta_ads' | 'google_ads' | 'whatsapp' | 'qr' | 'csv_import' | 'manual' | 'referral' | 'linkedin' | 'event' | 'cold_call';
export type LeadIntent = 'hot' | 'warm' | 'cold' | 'stale';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'lost';
export type DealStage = 'new' | 'qualified' | 'discovery' | 'demo' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type FollowUpType = 'call' | 'whatsapp' | 'email' | 'meeting' | 'demo' | 'proposal' | 'custom';
export type FollowUpStatus = 'pending' | 'completed' | 'missed' | 'snoozed';
export type FollowUpPriority = 'urgent' | 'high' | 'medium' | 'low';
export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'negotiation' | 'accepted' | 'rejected' | 'expired';
export type SourceType = 'website' | 'meta_ads' | 'google_ads' | 'whatsapp' | 'qr' | 'csv_import' | 'manual';

export type SalesPage =
  | 'leads'
  | 'lead-detail'
  | 'lead-capture'
  | 'qualification'
  | 'deals-pipeline'
  | 'deal-detail'
  | 'sales-forecast'
  | 'revenue'
  | 'team-performance'
  | 'followups'
  | 'proposals'
  | 'win-loss';
