import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CustomizationStore, RealmId, NavItem } from '../types';
import { realms as defaultRealms, sidebarNavItems as defaultSidebarNavItems } from '../core/navigation';

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
      realmOrder: defaultRealms.map(r => r.id),
      sidebarOrders: defaultSidebarNavItems,
      isInitialized: false, // Will be set to true after rehydration
      setRealmOrder: (newOrder: RealmId[]) => set({ realmOrder: newOrder }),
      setSidebarOrder: (realmId: RealmId, newOrder: NavItem[]) => 
        set((state) => ({
          sidebarOrders: {
            ...state.sidebarOrders,
            [realmId]: newOrder,
          },
        })),
    }),
    {
      name: 'junaikey-layout-customization',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    }
  )
);

// Manually trigger rehydration on initial load
useCustomizationStore.getState();
