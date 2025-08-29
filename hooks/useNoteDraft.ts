import { useState, useEffect } from 'react';

const DRAFT_KEY = 'junaikey-note-draft';

interface NoteDraft {
    title: string;
    content: string;
    tags: string;
}

export const useNoteDraft = (): [NoteDraft, React.Dispatch<React.SetStateAction<NoteDraft>>, () => void] => {
    const [draft, setDraft] = useState<NoteDraft>(() => {
        try {
            const savedDraft = localStorage.getItem(DRAFT_KEY);
            if (savedDraft) {
                return JSON.parse(savedDraft);
            }
        } catch (error) {
            console.error("Failed to parse note draft from localStorage", error);
            localStorage.removeItem(DRAFT_KEY);
        }
        return { title: '', content: '', tags: '' };
    });

    // Debounced save to localStorage
    useEffect(() => {
        const handler = setTimeout(() => {
            if (draft.title.trim() || draft.content.trim() || draft.tags.trim()) {
                localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
            } else {
                // If the draft is empty, remove it from storage to keep things clean.
                localStorage.removeItem(DRAFT_KEY);
            }
        }, 1000); // Autosave 1 second after user stops typing

        return () => {
            clearTimeout(handler);
        };
    }, [draft]);

    const clearDraft = () => {
        setDraft({ title: '', content: '', tags: '' });
        localStorage.removeItem(DRAFT_KEY);
    };

    return [draft, setDraft, clearDraft];
};
