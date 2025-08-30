import { useMemo } from 'react';
import { useNoteStore } from '../store/noteStore';
import type { Note } from '../types';

export const useFilteredNotes = (activeTag: string | null, debouncedSearchQuery: string): Note[] => {
  const { notes } = useNoteStore();

  return useMemo(() => {
    // Start with all notes, sorted by most recent
    let filtered = [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // 1. Apply tag filter if an active tag is selected
    if (activeTag) {
        filtered = filtered.filter(note => (note.tags || []).includes(activeTag));
    }

    // 2. Apply search query filter if a query exists
    const lowerCaseQuery = debouncedSearchQuery.toLowerCase().trim();
    if (lowerCaseQuery) {
        filtered = filtered.filter(note => 
            note.title.toLowerCase().includes(lowerCaseQuery) ||
            note.content.toLowerCase().includes(lowerCaseQuery) ||
            (note.tags || []).some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        );
    }

    return filtered;
  }, [notes, activeTag, debouncedSearchQuery]);
};
