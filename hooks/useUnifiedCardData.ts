import { useMemo } from 'react';
import { useNoteStore } from '../store/noteStore';
import { useProposalStore } from '../store/proposalStore';
import type { UnifiedCardData, CardType } from '../types';
import NotesIcon from '../components/icons/NotesIcon';
import CodexIcon from '../components/icons/CodexIcon';

export const useUnifiedCardData = (): UnifiedCardData[] => {
    const { notes } = useNoteStore();
    const { proposals } = useProposalStore();

    const unifiedData = useMemo(() => {
        const noteCards: UnifiedCardData[] = notes.map(note => ({
            id: note.id,
            type: 'note' as CardType,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            tags: note.tags,
            icon: NotesIcon,
            path: '/notes',
        }));

        const proposalCards: UnifiedCardData[] = proposals.map(proposal => ({
            id: proposal.id,
            type: 'proposal' as CardType,
            title: proposal.title,
            content: proposal.description,
            createdAt: proposal.createdAt,
            resonance: proposal.resonance,
            icon: CodexIcon,
            path: '/codex',
        }));

        return [...noteCards, ...proposalCards].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

    }, [notes, proposals]);

    return unifiedData;
};
