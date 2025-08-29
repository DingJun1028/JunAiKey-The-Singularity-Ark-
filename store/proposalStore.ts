import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Proposal, ProposalStore } from '../types';

export const useProposalStore = create<ProposalStore>()(
  persist(
    (set) => ({
      proposals: [
        {
          id: 'genesis-proposal-1',
          title: '實裝「自主通典室」',
          description: '建立一個讓召喚使能夠提案並共鳴系統未來進化方向的空間。所有提案都將被記錄在案，高共鳴的提案將被優先考慮納入矩陣的進化藍圖中。',
          resonance: 42,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
         {
          id: 'genesis-proposal-2',
          title: '擴展化身互動',
          description: '希望化身（Avatars）能有更深度的互動，例如提供每日任務、對用戶的行為給予評論，或是在特定頁面提供獨特的協助。這能讓化身的存在感更強，而不僅僅是個數值。',
          resonance: 18,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
      addProposal: (proposal) =>
        set((state) => ({
          proposals: [
            { 
              ...proposal, 
              id: new Date().getTime().toString(), 
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              resonance: 1, // Start with 1 resonance from the proposer
            },
            ...state.proposals,
          ],
        })),
      addResonance: (id) =>
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id ? { ...p, resonance: p.resonance + 1, updatedAt: new Date().toISOString() } : p
          ),
        })),
      updateProposal: (id, data) =>
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
          ),
        })),
      upsertProposals: (incomingProposals) =>
        set((state) => {
            const proposalsMap = new Map(state.proposals.map(p => [p.id, p]));

            incomingProposals.forEach(incoming => {
                let existingProposal = Array.from(proposalsMap.values()).find(p => p.boostSpaceId === incoming.boostSpaceId);
                
                if (existingProposal) {
                    if (new Date(incoming.updatedAt) > new Date(existingProposal.updatedAt)) {
                        proposalsMap.set(existingProposal.id, { ...incoming, id: existingProposal.id });
                    }
                } else {
                    const newId = new Date().getTime().toString() + Math.random();
                    proposalsMap.set(newId, { ...incoming, id: newId });
                }
            });
            return { proposals: Array.from(proposalsMap.values()) };
        }),
    }),
    {
      name: 'junaikey-proposals-storage',
    }
  )
);
