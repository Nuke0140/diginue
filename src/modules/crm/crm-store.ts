import { create } from 'zustand';
import type { CrmPage } from '@/modules/crm/types';

interface CrmState {
  currentPage: CrmPage;
  selectedContactId: string | null;
  selectedCompanyId: string | null;
  selectedLeadId: string | null;
  selectedDealId: string | null;
  sidebarOpen: boolean;
  searchQuery: string;
  history: string[];
  forwardStack: string[];

  navigateTo: (page: CrmPage) => void;
  selectContact: (id: string) => void;
  selectCompany: (id: string) => void;
  selectLead: (id: string) => void;
  selectDeal: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
}

export const useCrmStore = create<CrmState>((set, get) => ({
  currentPage: 'contacts',
  selectedContactId: null,
  selectedCompanyId: null,
  selectedLeadId: null,
  selectedDealId: null,
  sidebarOpen: true,
  searchQuery: '',
  history: [],
  forwardStack: [],

  navigateTo: (page: CrmPage) => {
    const { currentPage, forwardStack } = get();
    if (currentPage === page) return;
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      currentPage: page,
    });
  },

  selectContact: (id: string) => {
    const { currentPage } = get();
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      selectedContactId: id,
      currentPage: 'contact-detail' as CrmPage,
    });
  },

  selectCompany: (id: string) => {
    const { currentPage } = get();
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      selectedCompanyId: id,
      currentPage: 'company-detail' as CrmPage,
    });
  },

  selectLead: (id: string) => {
    const { currentPage } = get();
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      selectedLeadId: id,
      currentPage: 'lead-detail' as CrmPage,
    });
  },

  selectDeal: (id: string) => {
    const { currentPage } = get();
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      selectedDealId: id,
      currentPage: 'deal-detail' as CrmPage,
    });
  },

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  goBack: () => {
    const { history, currentPage, forwardStack } = get();
    if (history.length === 0) return;
    const newHistory = [...history];
    const prevPage = newHistory.pop()!;
    set({
      history: newHistory,
      forwardStack: [...forwardStack, currentPage],
      currentPage: prevPage as CrmPage,
      selectedContactId: prevPage === 'contacts' ? null : get().selectedContactId,
      selectedCompanyId: prevPage === 'companies' ? null : get().selectedCompanyId,
      selectedLeadId: prevPage === 'leads' ? null : get().selectedLeadId,
      selectedDealId: prevPage === 'deals' ? null : get().selectedDealId,
    });
  },

  goForward: () => {
    const { forwardStack, currentPage, history } = get();
    if (forwardStack.length === 0) return;
    const newForward = [...forwardStack];
    const nextPage = newForward.pop()!;
    set({
      history: [...history, currentPage],
      forwardStack: newForward,
      currentPage: nextPage as CrmPage,
    });
  },

  canGoBack: () => get().history.length > 0,
  canGoForward: () => get().forwardStack.length > 0,
}));
