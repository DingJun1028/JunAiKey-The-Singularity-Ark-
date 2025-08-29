import { useState, useEffect } from 'react';

const DRAFT_KEY = 'junaikey-note-draft';

interface NoteDraft {
    title: string;
    content: string;
    tags: string;
}

export const useNoteDraft = (): [NoteDraft, React.Dispatch<React.SetStateAction<NoteDraft>>, () => void] => {
    const [draft, setDraft] = useState<NoteDraft>({ title: '', content: '', tags: '' });

    // Load draft from localStorage on initial render
    useEffect(() => {
        try {
            const savedDraft = localStorage.getItem(DRAFT_KEY);
            if (savedDraft) {
                const parsedDraft = JSON.parse(savedDraft);
                setDraft(parsedDraft);
            }
        } catch (error) {
            console.error("Failed to parse note draft from localStorage", error);
            localStorage.removeItem(DRAFT_KEY);
        }
    }, []);

    // Save draft to localStorage whenever it changes
    useEffect(() => {
        if (draft.title.trim() || draft.content.trim() || draft.tags.trim()) {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        } else {
            localStorage.removeItem(DRAFT_KEY);
        }
    }, [draft]);

    const clearDraft = () => {
        setDraft({ title: '', content: '', tags: '' });
        localStorage.removeItem(DRAFT_KEY);
    };

    return [draft, setDraft, clearDraft];
};
