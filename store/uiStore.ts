<<<<<<< HEAD

import { create } from 'zustand';
import type { UiStore } from '../types';

export const useUiStore = create<UiStore>((set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));
=======
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UiStore } from '../types';

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      isMindStreamVisible: true, // Default to on
      toggleMindStream: () => set((state) => ({ isMindStreamVisible: !state.isMindStreamVisible })),
    }),
    {
      name: 'junaikey-ui-storage',
    }
  )
);
>>>>>>> feature-branch
