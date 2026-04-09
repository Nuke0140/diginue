// ============================================
// CRM Module Types
// ============================================

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  company?: string;
  companyId?: string;
  title?: string;
  source: ContactSource;
  lifecycleStage: LifecycleStage;
  owner: string;
  ownerId: string;
  healthScore: number; // 0-100
  aiIntent: AiIntent;
  tags: string[];
  socialProfiles?: { platform: string; url: string }[];
  lastInteraction: string;
  createdAt: string;
  notes?: string;
  address?: { city: string; state: string; country: string };
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  employeeCount: string;
  arr: number;
  linkedContacts: number;
  activeDeals: number;
  healthScore: number;
  owner: string;
  ownerId: string;
  notes?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  source: ContactSource;
  score: number; // 0-100
  intent: LeadIntent;
  status: LeadStatus;
  expectedRevenue: number;
  assignedRep: string;
  assignedRepId: string;
  campaign?: string;
  nextAction?: string;
  nextActionDate?: string;
  createdAt: string;
  isDuplicate?: boolean;
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  companyId: string;
  contactId: string;
  contactName: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  expectedClose: string;
  owner: string;
  ownerId: string;
  createdAt: string;
  weightedValue: number;
  aging: number; // days in current stage
}

export interface Activity {
  id: string;
  type: ActivityType;
  subject: string;
  description?: string;
  contactName?: string;
  contactId?: string;
  companyName?: string;
  userName: string;
  userId: string;
  date: string;
  duration?: string;
  outcome?: string;
}

export interface CrmTask {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  assigneeId: string;
  contactName?: string;
  contactId?: string;
  dealName?: string;
  dealId?: string;
  dueDate: string;
  isOverdue: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  createdAt: string;
}

export interface CrmNote {
  id: string;
  title: string;
  content: string;
  contactName?: string;
  contactId?: string;
  author: string;
  authorId: string;
  isPrivate: boolean;
  isPinned: boolean;
  type: NoteType;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface Segment {
  id: string;
  name: string;
  type: SegmentType;
  description: string;
  rules: SegmentRule[];
  customerCount: number;
  growthTrend: number; // percentage
  lastSynced?: string;
  isSyncedToCampaign: boolean;
  createdAt: string;
}

export interface LifecycleStageData {
  stage: LifecycleStage;
  count: number;
  conversionRate: number;
  dropOffRate: number;
  avgDaysInStage: number;
  aiInsight?: string;
}

export interface AiInsight {
  id: string;
  type: 'buying_intent' | 'churn_prediction' | 'ltv_forecast' | 'upsell' | 'next_action' | 'response_probability' | 'health' | 'relationship';
  title: string;
  description: string;
  score?: number;
  confidence: number;
  contactName?: string;
  contactId?: string;
  actionText?: string;
  icon?: string;
}

// Enums
export type ContactSource = 'website' | 'referral' | 'linkedin' | 'cold_call' | 'event' | 'ad_campaign' | 'organic' | 'import';
export type LifecycleStage = 'lead' | 'mql' | 'sql' | 'opportunity' | 'customer' | 'retained' | 'advocate';
export type AiIntent = 'high' | 'medium' | 'low' | 'inactive';
export type LeadIntent = 'hot' | 'warm' | 'cold';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted' | 'lost';
export type DealStage = 'new' | 'qualified' | 'demo' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type ActivityType = 'call' | 'email' | 'whatsapp' | 'meeting' | 'demo' | 'proposal' | 'note' | 'file_share' | 'website_visit' | 'payment';
export type TaskType = 'call' | 'email' | 'follow_up' | 'meeting' | 'demo' | 'proposal' | 'custom';
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type NoteType = 'meeting' | 'general' | 'call_log' | 'proposal' | 'voice_transcript';
export type SegmentType = 'vip' | 'high_intent' | 'new_leads' | 'repeat_buyers' | 'churn_risk' | 'inactive' | 'custom';

export interface SegmentRule {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty' | 'in_last' | 'before' | 'after';
  value: string | number;
  logic: 'and' | 'or';
}

export type CrmPage =
  | 'contacts'
  | 'contact-detail'
  | 'companies'
  | 'company-detail'
  | 'leads'
  | 'lead-detail'
  | 'deals'
  | 'deal-detail'
  | 'activities'
  | 'tasks'
  | 'notes'
  | 'segments'
  | 'lifecycle'
  | 'contact-intelligence';
