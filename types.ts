
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Wisdom {
  title: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
}

export interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;
}

export interface MockFile {
    path: string;
    content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
