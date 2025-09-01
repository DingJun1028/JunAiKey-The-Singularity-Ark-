import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Deck, DeckStore } from '../types';
import { useSummonerStore } from './summonerStore';

const createId = () => new Date().getTime().toString();

export const useDeckStore = create<DeckStore>()(
  persist(
    (set, get) => ({
      decks: [
        {
            id: 'initial-deck-1',
            name: "秩序之光 (Light of Order)",
            heroId: 'mentor', // 啟蒙光導師
            cardIds: {
                'light-001': 4,
                'light-002': 4,
                'light-003': 2,
                'earth-001': 4,
                'earth-002': 4,
                'spell-001': 4,
                'spell-002': 2,
                'artifact-001': 2,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
      ],
      actions: {
        createDeck: (name, heroId) => {
          const newDeck: Deck = {
            id: createId(),
            name,
            heroId,
            cardIds: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({ decks: [...state.decks, newDeck] }));
          useSummonerStore.getState().actions.addExp('sylfa', 20); // Creation EXP
          return newDeck.id;
        },
        deleteDeck: (deckId) => {
          set((state) => ({
            decks: state.decks.filter(d => d.id !== deckId)
          }));
        },
        updateDeck: (deckId, updates) => {
          set((state) => ({
            decks: state.decks.map(deck => 
              deck.id === deckId 
                ? { 
                    ...deck, 
                    ...updates, 
                    cardIds: updates.cardIds ? { ...updates.cardIds } : deck.cardIds,
                    updatedAt: new Date().toISOString() 
                  } 
                : deck
            )
          }));
        }
      }
    }),
    {
      name: 'junaikey-decks-storage',
      // Custom merger to ensure actions are not overwritten on rehydration
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as object),
      }),
    }
  )
);