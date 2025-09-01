import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InsightStore, ConnectionInsight } from '../types';
import { analyzeConnections } from '../services/geminiService';
import { useNoteStore } from './noteStore';
import { useProposalStore } from './proposalStore';
import { useSummonerStore } from './summonerStore';

export const useInsightStore = create<InsightStore>()(
  persist(
    (set) => ({
      insights: [],
      isLoading: false,
      error: null,
      lastAnalysis: null,
      actions: {
        fetchInsights: async () => {
          set({ isLoading: true, error: null });
          try {
            const notes = useNoteStore.getState().notes;
            const proposals = useProposalStore.getState().proposals;
            
            if (notes.length === 0 && proposals.length === 0) {
              set({ insights: [], isLoading: false, lastAnalysis: new Date().toISOString() });
              return;
            }

            const results = await analyzeConnections(notes, proposals);
            set({
              insights: results,
              isLoading: false,
              lastAnalysis: new Date().toISOString(),
            });

            // Grant EXP for using the insight feature
            if (results.length > 0) {
                useSummonerStore.getState().actions.addExp('aquare', 50); // Thought/Analysis
                useSummonerStore.getState().actions.addExp('astra', 25);  // Wisdom Crystallization
            }

          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during analysis.";
            set({ isLoading: false, error: errorMessage, insights: [] });
          }
        },
      },
    }),
    {
      name: 'junaikey-insights-storage',
      partialize: (state) => ({
        insights: state.insights,
        lastAnalysis: state.lastAnalysis,
      }),
      // Custom merger to ensure actions are not overwritten on rehydration
       merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as object),
      }),
    }
  )
);
