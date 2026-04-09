import type {
  SalesLead, SalesDeal, SalesForecast, TeamPerformance,
  FollowUp, Proposal, LeadSource, QualificationData, WinLossData
} from '../types';

export const mockSalesLeads: SalesLead[] = [
  { id: 'sl1', firstName: 'Vikram', lastName: 'Singh', email: 'vikram@newco.in', phone: '+91 99887 76655', company: 'NewCo Solutions', title: 'CTO', source: 'linkedin', campaign: 'LinkedIn Q1 Campaign', score: 92, intent: 'hot', status: 'new', assignedRep: 'Priya Sharma', assignedRepId: 'u1', expectedRevenue: 180000, nextAction: 'Schedule demo call', nextActionDate: '2026-04-12', slaDeadline: '2026-04-10T18:00:00', isHighValue: true, createdDate: '2026-04-08', lastActivity: '2 hours ago' },
  { id: 'sl2', firstName: 'Rachel', lastName: 'Green', email: 'rachel@freshstartup.com', phone: '+1 555 234 5678', company: 'FreshStartup', title: 'CEO', source: 'google_ads', campaign: 'Google Search - SaaS Keywords', score: 78, intent: 'warm', status: 'contacted', assignedRep: 'Rahul Verma', assignedRepId: 'u2', expectedRevenue: 95000, nextAction: 'Send proposal', nextActionDate: '2026-04-14', isHighValue: false, createdDate: '2026-04-05', lastActivity: '1 day ago' },
  { id: 'sl3', firstName: 'Chen', lastName: 'Wei', email: 'chen@shanghaitech.cn', phone: '+86 138 0013 8000', company: 'Shanghai Tech', title: 'VP Engineering', source: 'event', campaign: 'Tech Summit 2026', score: 65, intent: 'warm', status: 'qualified', assignedRep: 'Ananya Das', assignedRepId: 'u3', expectedRevenue: 320000, nextAction: 'Follow up on pricing', nextActionDate: '2026-04-11', slaDeadline: '2026-04-12T18:00:00', isHighValue: true, createdDate: '2026-03-28', lastActivity: '6 hours ago' },
  { id: 'sl4', firstName: 'Olivia', lastName: 'Brown', email: 'olivia@mediaco.com', phone: '+44 7911 123456', company: 'MediaCo UK', title: 'Marketing Head', source: 'meta_ads', campaign: 'Instagram Lead Gen', score: 45, intent: 'cold', status: 'new', assignedRep: 'Priya Sharma', assignedRepId: 'u1', expectedRevenue: 50000, isHighValue: false, createdDate: '2026-04-09', lastActivity: 'Just now' },
  { id: 'sl5', firstName: 'Ahmed', lastName: 'Hassan', email: 'ahmed@cairobiz.com', phone: '+20 100 123 4567', company: 'Cairo Business Hub', title: 'Managing Director', source: 'google_ads', campaign: 'Google Ads MENA', score: 85, intent: 'hot', status: 'new', assignedRep: 'Rahul Verma', assignedRepId: 'u2', expectedRevenue: 220000, nextAction: 'Initial discovery call', nextActionDate: '2026-04-10', isHighValue: true, createdDate: '2026-04-07', lastActivity: '3 hours ago' },
  { id: 'sl6', firstName: 'Sophie', lastName: 'Martin', email: 'sophie@paristech.fr', phone: '+33 6 12 34 56 78', company: 'Paris Tech Solutions', title: 'COO', source: 'cold_call', score: 30, intent: 'cold', status: 'contacted', assignedRep: 'Ananya Das', assignedRepId: 'u3', expectedRevenue: 75000, isHighValue: false, createdDate: '2026-04-01', lastActivity: '5 days ago' },
  { id: 'sl7', firstName: 'Kento', lastName: 'Tanaka', email: 'kento@tokyocorp.jp', phone: '+81 90 1234 5678', company: 'Tokyo Corp', title: 'CEO', source: 'event', campaign: 'APAC Business Summit', score: 88, intent: 'hot', status: 'qualified', assignedRep: 'Priya Sharma', assignedRepId: 'u1', expectedRevenue: 450000, nextAction: 'Prepare custom demo', nextActionDate: '2026-04-13', isHighValue: true, createdDate: '2026-03-25', lastActivity: '4 hours ago' },
  { id: 'sl8', firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos@mexico.biz', phone: '+52 55 1234 5678', company: 'Mexico Business', title: 'Operations Lead', source: 'website', score: 52, intent: 'warm', status: 'new', assignedRep: 'Rahul Verma', assignedRepId: 'u2', expectedRevenue: 110000, isHighValue: false, createdDate: '2026-04-06', lastActivity: '1 day ago' },
  { id: 'sl9', firstName: 'Aisha', lastName: 'Khalid', email: 'aisha@riyadh.sa', phone: '+966 50 123 4567', company: 'Riyadh Enterprises', title: 'CFO', source: 'whatsapp', score: 72, intent: 'warm', status: 'contacted', assignedRep: 'Priya Sharma', assignedRepId: 'u1', expectedRevenue: 280000, nextAction: 'Send pricing deck', nextActionDate: '2026-04-11', isHighValue: true, createdDate: '2026-04-02', lastActivity: '8 hours ago' },
  { id: 'sl10', firstName: 'Marcus', lastName: 'Johnson', email: 'marcus@usatech.com', phone: '+1 555 876 5432', company: 'USA Tech Solutions', title: 'CTO', source: 'referral', campaign: 'Partner Referral Program', score: 90, intent: 'hot', status: 'qualified', assignedRep: 'Ananya Das', assignedRepId: 'u3', expectedRevenue: 520000, nextAction: 'Executive demo', nextActionDate: '2026-04-10', isHighValue: true, createdDate: '2026-03-20', lastActivity: '30 min ago' },
  { id: 'sl11', firstName: 'Elena', lastName: 'Volkov', email: 'elena@moscowcorp.ru', phone: '+7 916 123 4567', company: 'Moscow Corp', title: 'IT Director', source: 'linkedin', score: 25, intent: 'stale', status: 'contacted', assignedRep: 'Rahul Verma', assignedRepId: 'u2', expectedRevenue: 60000, isDuplicate: false, isHighValue: false, createdDate: '2026-02-15', lastActivity: '2 weeks ago' },
  { id: 'sl12', firstName: 'Tom', lastName: 'Nguyen', email: 'tom@asiapacific.sg', phone: '+65 9123 4567', company: 'APAC Digital', title: 'Product Manager', source: 'website', score: 35, intent: 'stale', status: 'new', assignedRep: 'Priya Sharma', assignedRepId: 'u1', expectedRevenue: 40000, isHighValue: false, createdDate: '2026-03-10', lastActivity: '3 weeks ago' },
];

export const mockSalesDeals: SalesDeal[] = [
  { id: 'sd1', name: 'NewCo Enterprise Suite', company: 'NewCo Solutions', contactId: 'sl1', contactName: 'Vikram Singh', value: 180000, currency: 'USD', stage: 'proposal', probability: 65, expectedClose: '2026-05-15', owner: 'Priya Sharma', ownerId: 'u1', daysInStage: 8, createdDate: '2026-02-10', weightedValue: 117000, contractType: 'annual', renewalChance: 85, nextMeeting: '2026-04-12', competitors: ['Salesforce', 'HubSpot'], discountPercent: 10 },
  { id: 'sd2', name: 'FreshStartup SaaS Onboarding', company: 'FreshStartup', contactId: 'sl2', contactName: 'Rachel Green', value: 95000, currency: 'USD', stage: 'demo', probability: 45, expectedClose: '2026-06-01', owner: 'Rahul Verma', ownerId: 'u2', daysInStage: 5, createdDate: '2026-03-01', weightedValue: 42750, contractType: 'monthly', nextMeeting: '2026-04-14', competitors: ['Zoho'] },
  { id: 'sd3', name: 'Shanghai Tech Full Platform', company: 'Shanghai Tech', contactId: 'sl3', contactName: 'Chen Wei', value: 320000, currency: 'USD', stage: 'negotiation', probability: 80, expectedClose: '2026-04-25', owner: 'Ananya Das', ownerId: 'u3', daysInStage: 12, createdDate: '2026-01-20', weightedValue: 256000, contractType: 'annual', renewalChance: 90, nextMeeting: '2026-04-11', competitors: ['Microsoft Dynamics'], discountPercent: 15 },
  { id: 'sd4', name: 'Tokyo Corp AI Integration', company: 'Tokyo Corp', contactId: 'sl7', contactName: 'Kento Tanaka', value: 450000, currency: 'USD', stage: 'discovery', probability: 55, expectedClose: '2026-07-01', owner: 'Priya Sharma', ownerId: 'u1', daysInStage: 7, createdDate: '2026-03-15', weightedValue: 247500, contractType: 'annual', nextMeeting: '2026-04-15' },
  { id: 'sd5', name: 'USA Tech Solutions Deal', company: 'USA Tech Solutions', contactId: 'sl10', contactName: 'Marcus Johnson', value: 520000, currency: 'USD', stage: 'qualified', probability: 60, expectedClose: '2026-06-15', owner: 'Ananya Das', ownerId: 'u3', daysInStage: 4, createdDate: '2026-03-25', weightedValue: 312000, contractType: 'annual', renewalChance: 92, nextMeeting: '2026-04-10', discountPercent: 5 },
  { id: 'sd6', name: 'Riyadh Enterprises Contract', company: 'Riyadh Enterprises', contactId: 'sl9', contactName: 'Aisha Khalid', value: 280000, currency: 'USD', stage: 'new', probability: 20, expectedClose: '2026-08-01', owner: 'Priya Sharma', ownerId: 'u1', daysInStage: 3, createdDate: '2026-04-01', weightedValue: 56000, contractType: 'annual' },
  { id: 'sd7', name: 'Mexico Business Starter', company: 'Mexico Business', contactId: 'sl8', contactName: 'Carlos Rodriguez', value: 110000, currency: 'USD', stage: 'won', probability: 100, expectedClose: '2026-04-01', owner: 'Rahul Verma', ownerId: 'u2', daysInStage: 0, createdDate: '2026-02-15', weightedValue: 110000, contractType: 'annual', renewalChance: 78 },
  { id: 'sd8', name: 'Cairo Hub Consultation', company: 'Cairo Business Hub', contactId: 'sl5', contactName: 'Ahmed Hassan', value: 65000, currency: 'USD', stage: 'lost', probability: 0, expectedClose: '2026-04-05', owner: 'Rahul Verma', ownerId: 'u2', daysInStage: 0, createdDate: '2026-02-20', weightedValue: 0, competitors: ['SAP'] },
];

export const mockForecasts: SalesForecast[] = [
  { id: 'f1', repName: 'Priya Sharma', repId: 'u1', pipelineValue: 1030000, weightedForecast: 440500, bestCase: 680000, worstCase: 320000, committed: 400000, month: '2026-04' },
  { id: 'f2', repName: 'Rahul Verma', repId: 'u2', pipelineValue: 335000, weightedForecast: 208750, bestCase: 285000, worstCase: 150000, committed: 195000, month: '2026-04' },
  { id: 'f3', repName: 'Ananya Das', repId: 'u3', pipelineValue: 1092000, weightedForecast: 615000, bestCase: 850000, worstCase: 480000, committed: 580000, month: '2026-04' },
];

export const mockTeamPerformance: TeamPerformance[] = [
  { id: 'tp1', repName: 'Priya Sharma', repId: 'u1', dealsWon: 12, revenueClosed: 1240000, followUpSla: 94, avgResponseTime: '1.2h', closeRate: 38, aiProductivityScore: 88, rank: 2, targetProgress: 78, targetAmount: 1600000 },
  { id: 'tp2', repName: 'Rahul Verma', repId: 'u2', dealsWon: 8, revenueClosed: 820000, followUpSla: 87, avgResponseTime: '2.1h', closeRate: 32, aiProductivityScore: 75, rank: 3, targetProgress: 62, targetAmount: 1320000 },
  { id: 'tp3', repName: 'Ananya Das', repId: 'u3', dealsWon: 15, revenueClosed: 1580000, followUpSla: 96, avgResponseTime: '0.8h', closeRate: 45, aiProductivityScore: 94, rank: 1, targetProgress: 92, targetAmount: 1720000 },
];

export const mockFollowUps: FollowUp[] = [
  { id: 'fu1', leadName: 'Vikram Singh', leadId: 'sl1', company: 'NewCo Solutions', type: 'call', status: 'pending', priority: 'high', assignedTo: 'Priya Sharma', assignedToId: 'u1', scheduledDate: '2026-04-10', scheduledTime: '14:00', isOverdue: false, isRecurring: false, aiSuggestion: 'Best time to call: 2-4 PM IST. Lead is most responsive after lunch.', notes: 'Follow up on demo scheduling' },
  { id: 'fu2', leadName: 'Ahmed Hassan', leadId: 'sl5', company: 'Cairo Business Hub', type: 'whatsapp', status: 'pending', priority: 'urgent', assignedTo: 'Rahul Verma', assignedToId: 'u2', scheduledDate: '2026-04-09', scheduledTime: '10:00', isOverdue: true, isRecurring: false, aiSuggestion: 'Send a brief WhatsApp with pricing PDF attached. Cairo leads respond well to visual content.' },
  { id: 'fu3', leadName: 'Marcus Johnson', leadId: 'sl10', company: 'USA Tech Solutions', type: 'demo', status: 'pending', priority: 'high', assignedTo: 'Ananya Das', assignedToId: 'u3', scheduledDate: '2026-04-10', scheduledTime: '16:00', isOverdue: false, isRecurring: false, aiSuggestion: 'Prepare executive-level demo focused on ROI metrics and enterprise security.' },
  { id: 'fu4', leadName: 'Rachel Green', leadId: 'sl2', company: 'FreshStartup', type: 'email', status: 'pending', priority: 'medium', assignedTo: 'Rahul Verma', assignedToId: 'u2', scheduledDate: '2026-04-11', isOverdue: false, isRecurring: false, aiSuggestion: 'Send case study from similar startup customer. Subject line: "How FreshStartup-like company grew 3x with our platform"' },
  { id: 'fu5', leadName: 'Chen Wei', leadId: 'sl3', company: 'Shanghai Tech', type: 'meeting', status: 'pending', priority: 'high', assignedTo: 'Ananya Das', assignedToId: 'u3', scheduledDate: '2026-04-11', scheduledTime: '09:00', isOverdue: false, isRecurring: false, aiSuggestion: 'Focus meeting on pricing negotiation. Lead has budget approval and is comparing with Microsoft Dynamics.' },
  { id: 'fu6', leadName: 'Olivia Brown', leadId: 'sl4', company: 'MediaCo UK', type: 'whatsapp', status: 'pending', priority: 'low', assignedTo: 'Priya Sharma', assignedToId: 'u1', scheduledDate: '2026-04-12', isOverdue: false, isRecurring: true, recurringPattern: 'Weekly', aiSuggestion: 'New lead from Meta Ads. Send welcome message with product overview link.' },
  { id: 'fu7', leadName: 'Kento Tanaka', leadId: 'sl7', company: 'Tokyo Corp', type: 'proposal', status: 'pending', priority: 'high', assignedTo: 'Priya Sharma', assignedToId: 'u1', scheduledDate: '2026-04-13', isOverdue: false, isRecurring: false, aiSuggestion: 'Custom demo preparation needed. Focus on AI features and APAC compliance.' },
  { id: 'fu8', leadName: 'Sophie Martin', leadId: 'sl6', company: 'Paris Tech Solutions', type: 'call', status: 'missed', priority: 'medium', assignedTo: 'Ananya Das', assignedToId: 'u3', scheduledDate: '2026-04-07', isOverdue: true, isRecurring: false, aiSuggestion: 'Lead went cold. Try re-engagement with industry report or event invitation.' },
  { id: 'fu9', leadName: 'Elena Volkov', leadId: 'sl11', company: 'Moscow Corp', type: 'email', status: 'snoozed', priority: 'low', assignedTo: 'Rahul Verma', assignedToId: 'u2', scheduledDate: '2026-04-20', isOverdue: false, isRecurring: true, recurringPattern: 'Bi-weekly' },
  { id: 'fu10', leadName: 'Aisha Khalid', leadId: 'sl9', company: 'Riyadh Enterprises', type: 'email', status: 'pending', priority: 'medium', assignedTo: 'Priya Sharma', assignedToId: 'u1', scheduledDate: '2026-04-11', isOverdue: false, isRecurring: false, aiSuggestion: 'Send pricing deck with Arabic language option. Include regional case study.' },
];

export const mockProposals: Proposal[] = [
  { id: 'p1', title: 'Enterprise Suite - NewCo Solutions', dealName: 'NewCo Enterprise Suite', dealId: 'sd1', contactName: 'Vikram Singh', contactId: 'sl1', company: 'NewCo Solutions', status: 'sent', version: 3, totalValue: 180000, currency: 'USD', template: 'Enterprise', viewedByClient: true, lastViewedAt: '2026-04-09T15:30:00', pagesRead: 8, totalPages: 12, createdAt: '2026-03-20', updatedAt: '2026-04-08', sentAt: '2026-04-08T10:00:00' },
  { id: 'p2', title: 'SaaS Onboarding - FreshStartup', dealName: 'FreshStartup SaaS Onboarding', dealId: 'sd2', contactName: 'Rachel Green', contactId: 'sl2', company: 'FreshStartup', status: 'viewed', version: 1, totalValue: 95000, currency: 'USD', template: 'Startup', viewedByClient: true, lastViewedAt: '2026-04-09T11:00:00', pagesRead: 5, totalPages: 8, createdAt: '2026-04-05', updatedAt: '2026-04-05', sentAt: '2026-04-05T14:00:00' },
  { id: 'p3', title: 'Full Platform - Shanghai Tech', dealName: 'Shanghai Tech Full Platform', dealId: 'sd3', contactName: 'Chen Wei', contactId: 'sl3', company: 'Shanghai Tech', status: 'negotiation', version: 5, totalValue: 320000, currency: 'USD', template: 'Enterprise', viewedByClient: true, lastViewedAt: '2026-04-09T16:00:00', pagesRead: 15, totalPages: 18, approvalState: 'revision_requested', createdAt: '2026-02-10', updatedAt: '2026-04-09', sentAt: '2026-02-15T09:00:00' },
  { id: 'p4', title: 'AI Integration - Tokyo Corp', dealName: 'Tokyo Corp AI Integration', dealId: 'sd4', contactName: 'Kento Tanaka', contactId: 'sl7', company: 'Tokyo Corp', status: 'draft', version: 1, totalValue: 450000, currency: 'USD', template: 'Enterprise', viewedByClient: false, pagesRead: 0, totalPages: 0, createdAt: '2026-04-08', updatedAt: '2026-04-08' },
  { id: 'p5', title: 'Starter Kit - Mexico Business', dealName: 'Mexico Business Starter', dealId: 'sd7', contactName: 'Carlos Rodriguez', contactId: 'sl8', company: 'Mexico Business', status: 'accepted', version: 2, totalValue: 110000, currency: 'USD', template: 'Startup', viewedByClient: true, lastViewedAt: '2026-03-28T10:00:00', pagesRead: 8, totalPages: 8, approvalState: 'approved', paymentStatus: 'paid', createdAt: '2026-03-01', updatedAt: '2026-03-30', sentAt: '2026-03-10T11:00:00' },
  { id: 'p6', title: 'Consultation - Cairo Hub', dealName: 'Cairo Hub Consultation', dealId: 'sd8', contactName: 'Ahmed Hassan', contactId: 'sl5', company: 'Cairo Business Hub', status: 'rejected', version: 2, totalValue: 65000, currency: 'USD', template: 'Standard', viewedByClient: true, lastViewedAt: '2026-04-03T14:00:00', pagesRead: 6, totalPages: 10, approvalState: 'rejected', createdAt: '2026-03-05', updatedAt: '2026-04-04', sentAt: '2026-03-10T09:00:00' },
];

export const mockLeadSources: LeadSource[] = [
  { id: 'ls1', name: 'Instagram Ads', type: 'meta_ads', leadCount: 40, conversionRate: 12, revenue: 480000, trend: 15, webhookStatus: 'active', lastLeadAt: '2026-04-09T16:00:00' },
  { id: 'ls2', name: 'Google Ads', type: 'google_ads', leadCount: 22, conversionRate: 18, revenue: 660000, trend: 8, webhookStatus: 'active', lastLeadAt: '2026-04-09T14:30:00' },
  { id: 'ls3', name: 'Website Forms', type: 'website', leadCount: 18, conversionRate: 25, revenue: 540000, trend: -3, webhookStatus: 'active', lastLeadAt: '2026-04-09T12:00:00' },
  { id: 'ls4', name: 'WhatsApp', type: 'whatsapp', leadCount: 15, conversionRate: 35, revenue: 720000, trend: 22, webhookStatus: 'active', lastLeadAt: '2026-04-09T15:00:00' },
  { id: 'ls5', name: 'QR Codes', type: 'qr', leadCount: 8, conversionRate: 40, revenue: 240000, trend: 5, webhookStatus: 'active', lastLeadAt: '2026-04-08T18:00:00' },
  { id: 'ls6', name: 'LinkedIn', type: 'linkedin', leadCount: 12, conversionRate: 30, revenue: 580000, trend: 10, webhookStatus: 'active', lastLeadAt: '2026-04-09T10:00:00' },
  { id: 'ls7', name: 'CSV Import', type: 'csv_import', leadCount: 25, conversionRate: 8, revenue: 180000, trend: -5, webhookStatus: 'inactive' },
  { id: 'ls8', name: 'Manual Entry', type: 'manual', leadCount: 10, conversionRate: 45, revenue: 320000, trend: 2, webhookStatus: 'inactive' },
];

export const mockQualificationData: QualificationData[] = [
  { leadId: 'sl1', leadName: 'Vikram Singh', budget: { score: 8, maxScore: 10, notes: 'Budget approved by CFO for Q2' }, authority: { score: 9, maxScore: 10, notes: 'CTO and decision maker' }, need: { score: 9, maxScore: 10, notes: 'Urgent need to replace legacy CRM' }, timeline: { score: 7, maxScore: 10, notes: 'Wants to implement within 60 days' }, overallScore: 88, confidence: 92, painPoints: ['Legacy system limitations', 'Poor analytics', 'Manual data entry'], decisionMaker: true, urgency: 8, productFit: 90, aiPurchaseIntent: 92 },
  { leadId: 'sl7', leadName: 'Kento Tanaka', budget: { score: 9, maxScore: 10, notes: 'Board approved $500K budget' }, authority: { score: 10, maxScore: 10, notes: 'CEO making final decision' }, need: { score: 8, maxScore: 10, notes: 'AI integration for APAC operations' }, timeline: { score: 6, maxScore: 10, notes: 'Flexible timeline, prefers Q3' }, overallScore: 85, confidence: 88, painPoints: ['Regional compliance', 'Multi-language support', 'API integration'], decisionMaker: true, urgency: 6, productFit: 85, aiPurchaseIntent: 85 },
  { leadId: 'sl5', leadName: 'Ahmed Hassan', budget: { score: 7, maxScore: 10, notes: 'Budget not yet finalized' }, authority: { score: 8, maxScore: 10, notes: 'Managing Director involved' }, need: { score: 8, maxScore: 10, notes: 'Business expansion driving need' }, timeline: { score: 8, maxScore: 10, notes: 'Wants to start in May' }, overallScore: 82, confidence: 85, painPoints: ['Scaling operations', 'Inventory management', 'Team collaboration'], decisionMaker: true, urgency: 7, productFit: 80, aiPurchaseIntent: 80 },
  { leadId: 'sl10', leadName: 'Marcus Johnson', budget: { score: 10, maxScore: 10, notes: '$600K budget approved' }, authority: { score: 9, maxScore: 10, notes: 'CTO + CFO both involved' }, need: { score: 9, maxScore: 10, notes: 'Enterprise-wide digital transformation' }, timeline: { score: 7, maxScore: 10, notes: 'Phased rollout preferred' }, overallScore: 90, confidence: 95, painPoints: ['Data migration complexity', 'Security compliance', 'Team training'], decisionMaker: true, urgency: 7, productFit: 95, aiPurchaseIntent: 95 },
  { leadId: 'sl3', leadName: 'Chen Wei', budget: { score: 7, maxScore: 10, notes: 'Negotiating budget allocation' }, authority: { score: 7, maxScore: 10, notes: 'VP Engineering, CEO to approve' }, need: { score: 8, maxScore: 10, notes: 'Platform consolidation project' }, timeline: { score: 6, maxScore: 10, notes: 'Depends on Q2 budget cycle' }, overallScore: 70, confidence: 72, painPoints: ['Vendor consolidation', 'Cost reduction', 'Integration complexity'], decisionMaker: false, urgency: 5, productFit: 75, aiPurchaseIntent: 65 },
];

export const mockWinLossData: WinLossData = {
  totalDeals: 48,
  wonDeals: 22,
  lostDeals: 26,
  winRate: 46,
  avgSalesCycle: 34,
  avgDiscount: 12,
  totalWonRevenue: 3640000,
  totalLostRevenue: 2180000,
  competitorLosses: [
    { competitor: 'Salesforce', count: 8, revenue: 720000 },
    { competitor: 'HubSpot', count: 6, revenue: 480000 },
    { competitor: 'SAP', count: 4, revenue: 520000 },
    { competitor: 'Microsoft Dynamics', count: 3, revenue: 340000 },
    { competitor: 'Zoho', count: 3, revenue: 120000 },
    { competitor: 'Other', count: 2, revenue: 0 },
  ],
  lossReasons: [
    { reason: 'Price too high', count: 9, percentage: 35 },
    { reason: 'Chose competitor', count: 7, percentage: 27 },
    { reason: 'No budget', count: 5, percentage: 19 },
    { reason: 'Timeline changed', count: 3, percentage: 11 },
    { reason: 'Product fit', count: 2, percentage: 8 },
  ],
  stageDropoffs: [
    { stage: 'New', entered: 85, exited: 68, dropRate: 20 },
    { stage: 'Qualified', entered: 68, exited: 52, dropRate: 24 },
    { stage: 'Discovery', entered: 52, exited: 42, dropRate: 19 },
    { stage: 'Demo', entered: 42, exited: 35, dropRate: 17 },
    { stage: 'Proposal', entered: 35, exited: 28, dropRate: 20 },
    { stage: 'Negotiation', entered: 28, exited: 22, dropRate: 21 },
    { stage: 'Won', entered: 22, exited: 22, dropRate: 0 },
  ],
  monthlyWinLoss: [
    { month: 'Jan', won: 3, lost: 4 },
    { month: 'Feb', won: 4, lost: 3 },
    { month: 'Mar', won: 5, lost: 5 },
    { month: 'Apr', won: 6, lost: 2 },
    { month: 'May', won: 2, lost: 4 },
    { month: 'Jun', won: 2, lost: 3 },
  ],
};

export const revenueMetrics = {
  mrr: 420000,
  arr: 5040000,
  closedWon: 3640000,
  lostRevenue: 2180000,
  upsellRevenue: 680000,
  renewalRevenue: 1240000,
  netNew: 1720000,
  avgDealSize: 165500,
};
