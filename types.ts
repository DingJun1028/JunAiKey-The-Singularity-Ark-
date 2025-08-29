
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

export interface Proposal {
  id: string;
  title: string;
  description: string;
  resonance: number;
  createdAt: string;
}

export interface SimulationResult {
  concept: string;
  benefits: string[];
  challenges: string[];
  conclusion: string;
}

export interface GenerationResult {
    code: string;
    explanation: string;
    usage: string;
    previewHtml: string;
    cot_analysis: string;
}


export interface NoteStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, data: { title: string; content: string; tags: string[] }) => void;
}

export interface ProposalStore {
  proposals: Proposal[];
  addProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'resonance'>) => void;
  addResonance: (id: string) => void;
}


export interface MockFile {
    path: string;
    content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type RealmId = 'core' | 'knowledge' | 'genesis' | 'summoner';

export interface Realm {
    id: RealmId;
    name: string;
    primaryPath: string;
}

export interface NavItem {
    path: string;
    label: string;
    icon: React.FC<{className?: string}>;
}

export interface NavigationStore {
    activeRealmId: RealmId;
    setActiveRealmId: (realmId: RealmId) => void;
}

// FIX: Add missing UiStore interface for use in store/uiStore.ts
export interface UiStore {
  isMindStreamVisible: boolean;
  toggleMindStream: () => void;
}
