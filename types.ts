export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
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
  updateNote: (id: string, data: { title: string; content: string; tags: string[] }) => void;
}

export interface MockFile {
    path: string;
    content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}