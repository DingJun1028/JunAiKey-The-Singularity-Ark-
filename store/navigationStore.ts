import { create } from 'zustand';
import type { NavigationStore } from '../types';

export const useNavigationStore = create<NavigationStore>((set) => ({
    activeRealmId: 'core', // Default realm
    setActiveRealmId: (realmId) => set({ activeRealmId: realmId }),
}));
