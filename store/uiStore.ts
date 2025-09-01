
import { create } from 'zustand';
import type { UiStore } from '../types';

export const useUiStore = create<UiStore>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));
