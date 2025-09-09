import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoriteStore } from '../types';

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteIds: ['/', '/notes', '/evolution', '/console'], // Sensible defaults
      isInitialized: false,
      actions: {
        toggleFavorite: (id: string) => {
          const { favoriteIds } = get();
          const newFavoriteIds = favoriteIds.includes(id)
            ? favoriteIds.filter((favId) => favId !== id)
            : [...favoriteIds, id];
          set({ favoriteIds: newFavoriteIds });
        },
      },
    }),
    {
      name: 'junaikey-favorites-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
       partialize: (state) => ({
        favoriteIds: state.favoriteIds,
      }),
    }
  )
);
