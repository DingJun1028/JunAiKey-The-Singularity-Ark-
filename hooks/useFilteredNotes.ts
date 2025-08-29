import { useMemo } from 'react';
import { useNoteStore } from '../store/noteStore';
import type { Note } from '../types';

export const useFilteredNotes = (activeTag: string | null, debouncedSearchQuery: string): Note[] => {
  const { notes } = useNoteStore();

  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        if (!activeTag) return true;
        return (note.tags || []).includes(activeTag);
      })
      .filter(note => {
        if (!debouncedSearchQuery.trim()) return true;
        const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
        return (
          note.title.toLowerCase().includes(lowerCaseQuery) ||
          note.content.toLowerCase().includes(lowerCaseQuery) ||
          (note.tags || []).some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        );
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notes, activeTag, debouncedSearchQuery]);

  return filteredNotes;
};
