import { create } from 'zustand';
import type { SalesPage } from './types';

interface SalesState {
  currentPage: SalesPage;
  selectedLeadId: string | null;
  selectedDealId: string | null;
  sidebarOpen: boolean;
  searchQuery: string;
  history: string[];
  forwardStack: string[];

  navigateTo: (page: SalesPage) => void;
  selectLead: (id: string) => void;
  selectDeal: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
}

export const useSalesStore = create<SalesState>((set, get) => ({
  currentPage: 'leads',
  selectedLeadId: null,
  selectedDealId: null,
  sidebarOpen: true,
  searchQuery: '',
  history: [],
  forwardStack: [],

  navigateTo: (page: SalesPage) => {
    const { currentPage } = get();
    if (currentPage === page) return;
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      currentPage: page,
    });
  },

  selectLead: (id: string) => {
    const { currentPage } = get();
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      selectedLeadId: id,
      currentPage: 'lead-detail' as SalesPage,
    });
  },

  selectDeal: (id: string) => {
    const { currentPage } = get();
    set({
      history: [...get().history, currentPage],
      forwardStack: [],
      selectedDealId: id,
      currentPage: 'deal-detail' as SalesPage,
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
      currentPage: prevPage as SalesPage,
      selectedLeadId: prevPage === 'leads' ? null : get().selectedLeadId,
      selectedDealId: prevPage === 'deals-pipeline' ? null : get().selectedDealId,
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
      currentPage: nextPage as SalesPage,
    });
  },

  canGoBack: () => get().history.length > 0,
  canGoForward: () => get().forwardStack.length > 0,
}));
