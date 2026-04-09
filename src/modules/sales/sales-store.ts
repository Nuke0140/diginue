import { create } from 'zustand';
import type { SalesPage } from './types';

interface SalesState {
  currentPage: SalesPage;
  selectedLeadId: string | null;
  selectedDealId: string | null;
  sidebarOpen: boolean;
  searchQuery: string;

  navigateTo: (page: SalesPage) => void;
  selectLead: (id: string) => void;
  selectDeal: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  goBack: () => void;
}

export const useSalesStore = create<SalesState>((set, get) => ({
  currentPage: 'leads',
  selectedLeadId: null,
  selectedDealId: null,
  sidebarOpen: true,
  searchQuery: '',

  navigateTo: (page: SalesPage) => set({ currentPage: page }),
  selectLead: (id: string) => set({ selectedLeadId: id, currentPage: 'lead-detail' as SalesPage }),
  selectDeal: (id: string) => set({ selectedDealId: id, currentPage: 'deal-detail' as SalesPage }),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  goBack: () => {
    const { currentPage } = get();
    switch (currentPage) {
      case 'lead-detail': set({ currentPage: 'leads', selectedLeadId: null }); break;
      case 'deal-detail': set({ currentPage: 'deals-pipeline', selectedDealId: null }); break;
      default: set({ currentPage: 'leads' }); break;
    }
  },
}));
