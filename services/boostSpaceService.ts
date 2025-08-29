import type { Note, Proposal, CardType } from '../types';

type StoredCard = (Note | Proposal) & { type: CardType };
const STORAGE_KEY = 'junaikey-mock-boostspace';

// --- Mock Data for initial seed ---
const getInitialMockData = (): StoredCard[] => [
    {
        id: 'remote-note-1',
        boostSpaceId: 'bs-note-123',
        type: 'note',
        title: '來自 Boost.space 的遠端筆記',
        content: '這張筆記最初是在模擬的 Boost.space 服務中創建的。如果您的本地儲存中沒有此筆記，同步過程將會把它拉取下來。',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        tags: ['remote-data', 'boost-space', 'sync-test'],
    },
    {
        id: 'remote-proposal-1',
        boostSpaceId: 'bs-proposal-456',
        type: 'proposal',
        title: '遠端提案：實現跨維度通訊',
        description: '建議開發一個標準化協議，允許 JunAiKey 與其他平行宇宙的矩陣實例進行數據交換。',
        resonance: 128,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    }
];


// --- Mock Service Implementation ---

const getCards = (): StoredCard[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            // Seed with initial data if it doesn't exist
            const initialData = getInitialMockData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
            return initialData;
        }
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading from mock Boost.space:", error);
        return [];
    }
};

const createOrUpdateCards = (cardsToPush: StoredCard[]): StoredCard[] => {
    try {
        const remoteCards = getCards();
        const remoteCardsMap = new Map(remoteCards.map(c => [c.boostSpaceId, c]));
        
        const updatedCards = cardsToPush.map(card => {
            // This is a local-only card, needs a new boostSpaceId
            const newCard = { ...card, boostSpaceId: `bs-${card.type}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}` };
            remoteCardsMap.set(newCard.boostSpaceId, newCard);
            return newCard;
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(remoteCardsMap.values())));
        return updatedCards;

    } catch (error) {
        console.error("Error writing to mock Boost.space:", error);
        return []; // Return empty array on failure
    }
};


// Simulate network delay
const withDelay = <T extends (...args: any[]) => any>(fn: T): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
    return (...args: Parameters<T>): Promise<ReturnType<T>> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(fn(...args));
            }, 500 + Math.random() * 1000);
        });
    };
};

export const boostSpaceService = {
    getCards: withDelay(getCards),
    createOrUpdateCards: withDelay(createOrUpdateCards),
};