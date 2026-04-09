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

  navigateTo: (page: CrmPage) => void;
  selectContact: (id: string) => void;
  selectCompany: (id: string) => void;
  selectLead: (id: string) => void;
  selectDeal: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  goBack: () => void;
}

export const useCrmStore = create<CrmState>((set, get) => ({
  currentPage: 'contacts',
  selectedContactId: null,
  selectedCompanyId: null,
  selectedLeadId: null,
  selectedDealId: null,
  sidebarOpen: true,
  searchQuery: '',

  navigateTo: (page: CrmPage) => set({ currentPage: page }),
  selectContact: (id: string) => set({ selectedContactId: id, currentPage: 'contact-detail' as CrmPage }),
  selectCompany: (id: string) => set({ selectedCompanyId: id, currentPage: 'company-detail' as CrmPage }),
  selectLead: (id: string) => set({ selectedLeadId: id, currentPage: 'lead-detail' as CrmPage }),
  selectDeal: (id: string) => set({ selectedDealId: id, currentPage: 'deal-detail' as CrmPage }),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  goBack: () => {
    const { currentPage } = get();
    switch (currentPage) {
      case 'contact-detail': set({ currentPage: 'contacts', selectedContactId: null }); break;
      case 'company-detail': set({ currentPage: 'companies', selectedCompanyId: null }); break;
      case 'lead-detail': set({ currentPage: 'leads', selectedLeadId: null }); break;
      case 'deal-detail': set({ currentPage: 'deals', selectedDealId: null }); break;
      default: set({ currentPage: 'contacts' }); break;
    }
  },
}));
