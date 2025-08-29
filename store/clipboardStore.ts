import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// FIX: Corrected type imports to match exported members from ../types
import type { OmniClipboardStore, OmniClipboardItem } from '../types';

const MAX_HISTORY = 10;

export const useClipboardStore = create<OmniClipboardStore>()(
  persist(
    (set, get) => ({
      history: [],
      isMonitorEnabled: true, // User setting, default to on
      setIsMonitorEnabled: (enabled: boolean) => set({ isMonitorEnabled: enabled }),
      addClip: (text: string) => {
        if (!text || text.trim().length === 0) return;
        const trimmedText = text.trim();
        const { history } = get();
        // Avoid adding duplicates
        if (history.some(item => item.text === trimmedText)) return;

        const newClip: OmniClipboardItem = {
          id: new Date().getTime().toString(),
          text: trimmedText,
        };
        const newHistory = [newClip, ...history].slice(0, MAX_HISTORY);
        set({ history: newHistory });
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'junaikey-clipboard-settings',
      partialize: (state) => ({ isMonitorEnabled: state.isMonitorEnabled }), // Only persist the user's setting
    }
  )
);