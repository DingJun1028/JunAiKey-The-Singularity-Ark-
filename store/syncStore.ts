import { create } from 'zustand';
import { useNoteStore } from './noteStore';
import { useProposalStore } from './proposalStore';
import { boostSpaceService } from '../services/boostSpaceService';
import type { SyncStore, Note, Proposal, CardType } from '../types';

type StoredCard = (Note | Proposal) & { type: CardType };

export const useSyncStore = create<SyncStore>((set, get) => ({
    syncStatus: 'idle',
    lastSync: null,
    syncMessage: '準備同步 (Ready to sync)',
    actions: {
        syncWithBoostSpace: async () => {
            set({ syncStatus: 'syncing', syncMessage: '正在開始同步... (Starting sync...)' });

            try {
                // 1. Get local and remote data
                set({ syncStatus: 'connecting', syncMessage: '正在連接到 Boost.space... (Connecting to Boost.space...)' });
                const localNotes = useNoteStore.getState().notes;
                const localProposals = useProposalStore.getState().proposals;
                const remoteCards = await boostSpaceService.getCards();
                
                // 2. Identify and push local-only changes
                const localOnlyNotes = localNotes.filter(n => !n.boostSpaceId);
                const localOnlyProposals = localProposals.filter(p => !p.boostSpaceId);
                const cardsToPush: StoredCard[] = [
                    ...localOnlyNotes.map(n => ({...n, type: 'note' as CardType})),
                    ...localOnlyProposals.map(p => ({...p, type: 'proposal' as CardType}))
                ];

                if (cardsToPush.length > 0) {
                    set({ syncStatus: 'pushing', syncMessage: `正在推送 ${cardsToPush.length} 個本地變更... (Pushing ${cardsToPush.length} local changes...)` });
                    const pushedCards = await boostSpaceService.createOrUpdateCards(cardsToPush);
                    
                    // Update local store with boostSpaceId from the server response
                    pushedCards.forEach(card => {
                        if (card.type === 'note') {
                            useNoteStore.getState().updateNote(card.id, { boostSpaceId: card.boostSpaceId });
                        } else if (card.type === 'proposal') {
                            useProposalStore.getState().updateProposal(card.id, { boostSpaceId: card.boostSpaceId });
                        }
                    });
                }

                // 3. Identify and pull remote-only changes
                set({ syncStatus: 'pulling', syncMessage: '正在拉取遠端數據... (Pulling remote data...)' });
                const localBoostSpaceIds = new Set([
                    ...useNoteStore.getState().notes.map(n => n.boostSpaceId),
                    ...useProposalStore.getState().proposals.map(p => p.boostSpaceId)
                ].filter(Boolean));
                
                const remoteOnlyCards = remoteCards.filter(c => c.boostSpaceId && !localBoostSpaceIds.has(c.boostSpaceId));
                
                if (remoteOnlyCards.length > 0) {
                    const notesToPull = remoteOnlyCards.filter(c => c.type === 'note') as Note[];
                    const proposalsToPull = remoteOnlyCards.filter(c => c.type === 'proposal') as Proposal[];

                    if (notesToPull.length > 0) useNoteStore.getState().upsertNotes(notesToPull);
                    if (proposalsToPull.length > 0) useProposalStore.getState().upsertProposals(proposalsToPull);
                }
                
                // 4. Finalize sync
                const successMessage = `同步成功！推動 ${cardsToPush.length}，拉取 ${remoteOnlyCards.length}。(Sync successful! Pushed ${cardsToPush.length}, Pulled ${remoteOnlyCards.length}.)`;
                set({ syncStatus: 'success', syncMessage: successMessage, lastSync: new Date().toISOString() });

            } catch (error) {
                console.error("Sync failed:", error);
                set({ syncStatus: 'error', syncMessage: '同步失敗，請檢查控制台。(Sync failed, check console.)' });
            } finally {
                // Reset status to idle after a few seconds unless a new sync has started.
                setTimeout(() => {
                    const currentStatus = get().syncStatus;
                    if (currentStatus === 'success' || currentStatus === 'error') {
                        set({ syncStatus: 'idle' });
                    }
                }, 3000);
            }
        }
    }
}));