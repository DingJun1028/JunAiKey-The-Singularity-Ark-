
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NoteStore } from '../types';

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [
        {
          id: '1',
          title: 'Welcome to JunAiKey',
          content: 'This is your first note in the Omni-Note System. All data is persisted in local storage.',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Terminus Matrix Axiom',
          content: 'The Axiom of Unified Terminus & Origin ensures the balance and flow of value and energy in an endless cycle.',
          createdAt: new Date().toISOString(),
        }
      ],
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            { ...note, id: new Date().getTime().toString(), createdAt: new Date().toISOString() },
          ],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: 'junaikey-notes-storage',
    }
  )
);