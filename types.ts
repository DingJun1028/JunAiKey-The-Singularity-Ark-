<<<<<<< HEAD

=======
>>>>>>> feature-branch
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  boostSpaceId?: string;
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
  updatedAt: string;
  boostSpaceId?: string;
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
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, data: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  upsertNotes: (notes: Note[]) => void;
}

export interface ProposalStore {
  proposals: Proposal[];
  addProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt' | 'resonance'>) => void;
  addResonance: (id: string) => void;
  updateProposal: (id: string, data: Partial<Omit<Proposal, 'id' | 'createdAt'>>) => void;
  upsertProposals: (proposals: Proposal[]) => void;
}


export interface MockFile {
    path: string;
    content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type RealmId = 'core' | 'knowledge' | 'genesis' | 'summoner' | 'partner';

export interface Realm {
    id: RealmId;
    name: string;
    primaryPath: string;
<<<<<<< HEAD
    icon: React.FC<{className?: string}>;
=======
>>>>>>> feature-branch
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

export interface CustomizationStore {
    realmOrder: RealmId[];
    sidebarOrders: Record<RealmId, NavItem[]>;
    setRealmOrder: (newOrder: RealmId[]) => void;
    setSidebarOrder: (realmId: RealmId, newOrder: NavItem[]) => void;
    isInitialized: boolean;
}


<<<<<<< HEAD
export interface UiStore {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
=======
// FIX: Add missing UiStore interface for use in store/uiStore.ts
export interface UiStore {
  isMindStreamVisible: boolean;
  toggleMindStream: () => void;
>>>>>>> feature-branch
}

// --- Omni-Card Aitable Types ---
export type CardType = 'note' | 'proposal';

export interface UnifiedCardData {
    id: string;
    type: CardType;
    title: string;
    content: string;
    createdAt: string;
    tags?: string[];
    resonance?: number;
    icon: React.FC<{className?: string}>;
    path: string;
}

// --- Sync Types ---
export type SyncStatus = 'idle' | 'syncing' | 'connecting' | 'pushing' | 'pulling' | 'success' | 'error';

export interface SyncStore {
    syncStatus: SyncStatus;
    lastSync: string | null;
    syncMessage: string;
    actions: {
        syncWithBoostSpace: () => Promise<void>;
    }
}

// --- Omni-Clipboard Types ---
export interface OmniClipboardItem {
  id: string;
  text: string;
}

export interface OmniClipboardStore {
  history: OmniClipboardItem[];
  isMonitorEnabled: boolean;
  isInitialized: boolean;
  setIsMonitorEnabled: (enabled: boolean) => void;
  addClip: (text: string) => void;
  clearHistory: () => void;
}

// --- Theme Customization Types ---
export interface Theme {
    colors: {
        'matrix-bg': string;
        'matrix-bg-2': string;
        'matrix-green': string;
        'matrix-cyan': string;
        'matrix-light': string;
        'matrix-dark': string;
        'card-bg': string;
        'card-border': string;
        'card-border-hover': string;
    };
    fonts: {
        sans: string;
        mono: string;
    };
}

export interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resetTheme: () => void;
<<<<<<< HEAD
}


// --- API Key Types ---
export type ApiKeyStatus = 'not-configured' | 'valid' | 'invalid' | 'verifying';

export interface ApiKeyStore {
  apiKey: string | null;
  status: ApiKeyStatus;
  actions: {
    loadApiKey: () => void;
    setApiKey: (key: string) => void;
    setStatus: (status: ApiKeyStatus) => void;
    validateApiKey: (key: string) => Promise<boolean>;
  };
}

// --- TCG Deck Builder Types ---
export type TcgCardType = 'Unit' | 'Spell' | 'Artifact' | 'Avatar';

export interface TcgCard {
    id: string;
    name: string;
    element: string; // The primary element name, e.g., "Fire"
    type: TcgCardType;
    cost: number;
    attack?: number;
    health?: number;
    text: string;
    keywords: string[];
}

export interface Deck {
    id: string;
    name: string;
    heroId: string; // Avatar ID
    cardIds: { [cardId: string]: number }; // Map of cardId to count
    createdAt: string;
    updatedAt: string;
}

export interface DeckStore {
    decks: Deck[];
    actions: {
        createDeck: (name: string, heroId: string) => string;
        deleteDeck: (deckId: string) => void;
        updateDeck: (deckId: string, updates: Partial<Pick<Deck, 'name' | 'heroId' | 'cardIds'>>) => void;
    };
}

// --- Matrix Insights Types ---
export interface ConnectionInsight {
  item1Id: string;
  item1Type: CardType;
  item2Id: string;
  item2Type: CardType;
  reason: string;
}

export interface InsightStore {
  insights: ConnectionInsight[];
  isLoading: boolean;
  error: string | null;
  lastAnalysis: string | null;
  actions: {
    fetchInsights: () => Promise<void>;
  };
}

// --- Genesis Engine SDK Types ---
export enum GameState {
  PlayerTurn = 'PlayerTurn',
  EnemyTurn = 'EnemyTurn',
}

export enum AIDifficulty {
  Normal = 'Normal',
}

export interface CardData {
  id: string;
  name: string;
}
=======
}
>>>>>>> feature-branch
