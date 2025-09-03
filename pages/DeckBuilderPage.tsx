
import React, { useState, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PageHeader from '../components/PageHeader';
import DeckIcon from '../components/icons/DeckIcon';
import Card from '../components/Card';
import { useDeckStore } from '../store/deckStore';
import { allCards, elements, keywords as allKeywords } from '../core/tcgData';
import { avatars as staticAvatars } from '../core/growthSystem';
import type { Deck, TcgCard } from '../types';
import BilingualLabel from '../components/BilingualLabel';
import PlusIcon from '../components/icons/PlusIcon';
import TrashIcon from '../components/icons/TrashIcon';
import SearchIcon from '../components/icons/SearchIcon';
import { useDebounce } from '../hooks/useDebounce';
import { spiritColorMap } from '../core/theme';
import XIcon from '../components/icons/XIcon';
import SingleTcgCard from '../components/SingleTcgCard';

// --- Helper Components ---

const ManaCurveChart: React.FC<{ deckCards: TcgCard[] }> = React.memo(({ deckCards }) => {
    const manaCurve = useMemo(() => {
        const curve = Array(8).fill(0); // 0 to 7+ cost
        deckCards.forEach(card => {
            const cost = Math.min(card.cost, 7);
            curve[cost]++;
        });
        return curve.map((count, cost) => ({ name: cost === 7 ? '7+' : `${cost}`, count }));
    }, [deckCards]);

    return (
        <div style={{ width: '100%', height: 150 }}>
            <ResponsiveContainer>
                <BarChart data={manaCurve} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="var(--color-matrix-dark)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-matrix-dark)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                        cursor={{ fill: 'rgba(0, 255, 255, 0.1)' }}
                        contentStyle={{
                            backgroundColor: 'var(--color-matrix-bg)',
                            borderColor: 'var(--color-matrix-cyan)',
                            color: 'var(--color-matrix-light)',
                        }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                         {manaCurve.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="var(--color-matrix-cyan)" opacity={0.6 + (entry.count > 0 ? 0.4 : 0)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});


// --- Main Page Component ---

const DeckBuilderPage: React.FC = () => {
    const { decks, actions: deckActions } = useDeckStore();
    const [activeDeckId, setActiveDeckId] = useState<string | null>(decks[0]?.id || null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [elementFilter, setElementFilter] = useState<string>('All');
    
    const activeDeck = useMemo(() => decks.find(d => d.id === activeDeckId), [decks, activeDeckId]);
    const activeHero = useMemo(() => staticAvatars.find(h => h.id === activeDeck?.heroId), [activeDeck]);
    
    const { deckCards, totalCards, purityMet } = useMemo(() => {
        if (!activeDeck) return { deckCards: [], totalCards: 0, purityMet: false };
        const cards: TcgCard[] = [];
        let elementCount = 0;
        const heroElement = elements.find(e => e.hero.id === activeHero?.id)?.name;

        for (const [cardId, count] of Object.entries(activeDeck.cardIds)) {
            const cardInfo = allCards.find(c => c.id === cardId);
            if (cardInfo) {
                for (let i = 0; i < (count as number); i++) {
                    cards.push(cardInfo);
                }
                if (cardInfo.element === heroElement) {
                    elementCount += (count as number);
                }
            }
        }
        const total = cards.length;
        return { deckCards: cards, totalCards: total, purityMet: total > 0 && elementCount > total / 2 };
    }, [activeDeck, activeHero]);

    const cardPool = useMemo(() => {
        return allCards.filter(card => {
            const searchMatch = debouncedSearch ? card.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || card.text.toLowerCase().includes(debouncedSearch.toLowerCase()) : true;
            const elementMatch = elementFilter === 'All' || card.element === elementFilter;
            return searchMatch && elementMatch;
        });
    }, [debouncedSearch, elementFilter]);
    
    const handleCreateDeck = () => {
        const newDeckName = `新聖典 #${decks.length + 1}`;
        const defaultHeroId = staticAvatars[0].id;
        const newDeckId = deckActions.createDeck(newDeckName, defaultHeroId);
        setActiveDeckId(newDeckId);
    };

    const handleSelectDeck = (deckId: string) => {
        setActiveDeckId(deckId);
    };

    const handleAddCard = (card: TcgCard) => {
        if (!activeDeck || totalCards >= 60) return;
        const currentCount = activeDeck.cardIds[card.id] || 0;
        if (currentCount >= 4) return;
        const newCardIds = { ...activeDeck.cardIds, [card.id]: currentCount + 1 };
        deckActions.updateDeck(activeDeck.id, { cardIds: newCardIds });
    };

    const handleRemoveCard = (cardId: string) => {
        if (!activeDeck) return;
        const currentCount = activeDeck.cardIds[cardId];
        if (!currentCount) return;
        
        const newCardIds = { ...activeDeck.cardIds };
        if (currentCount > 1) {
            newCardIds[cardId] = currentCount - 1;
        } else {
            delete newCardIds[cardId];
        }
        deckActions.updateDeck(activeDeck.id, { cardIds: newCardIds });
    };
    
    const deckCardCounts = useMemo(() => {
        if (!activeDeck) return {};
        return activeDeck.cardIds;
    }, [activeDeck]);


    const cardTypesCount = useMemo(() => {
        return deckCards.reduce((acc: Record<string, number>, card: TcgCard) => {
            acc[card.type] = (acc[card.type] || 0) + 1;
            return acc;
        }, {});
    }, [deckCards]);


    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="聖典構築器 (Deck Builder)"
                subtitle="鑄造您的聖典，定義您的法則。(Forge your codex, define your laws.)"
                icon={<DeckIcon className="w-8 h-8" />}
            />
            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
                {/* Left Column: Deck Management */}
                <div className="lg:w-1/4 flex flex-col gap-6">
                    <Card className="p-4 flex-shrink-0">
                         <h2 className="text-xl font-semibold text-matrix-cyan mb-3"><BilingualLabel label="我的聖典 (My Decks)" /></h2>
                         <button onClick={handleCreateDeck} className="w-full flex items-center justify-center gap-2 bg-matrix-green/20 text-matrix-green p-2 rounded-md hover:bg-matrix-green/30">
                             <PlusIcon className="w-5 h-5"/>
                             <BilingualLabel label="創建新聖典"/>
                         </button>
                    </Card>
                    <Card className="p-2 flex-grow overflow-y-auto">
                        <ul className="space-y-2">
                           {decks.map(deck => (
                               <li key={deck.id}>
                                   <button onClick={() => handleSelectDeck(deck.id)} className={`w-full text-left p-3 rounded-md transition-colors ${activeDeckId === deck.id ? 'bg-matrix-cyan/20' : 'hover:bg-matrix-dark/30'}`}>
                                       <p className={`font-semibold ${activeDeckId === deck.id ? 'text-matrix-cyan' : 'text-matrix-light'}`}>{deck.name}</p>
                                       <p className="text-xs text-matrix-dark">{Object.values(deck.cardIds).reduce((a: number, b: number) => a + b, 0)} 張牌</p>
                                   </button>
                               </li>
                           ))}
                        </ul>
                    </Card>
                </div>

                {/* Center Column: Deck Details & Stats */}
                <div className="lg:w-1/2 flex flex-col gap-6">
                    {activeDeck ? (
                        <>
                        <Card className="p-4 flex-shrink-0">
                            <div className="flex justify-between items-center">
                                <input 
                                    type="text"
                                    value={activeDeck.name}
                                    onChange={(e) => deckActions.updateDeck(activeDeckId!, { name: e.target.value })}
                                    className="text-xl font-semibold text-matrix-cyan bg-transparent border-none focus:outline-none focus:ring-0"
                                />
                                <button onClick={() => deckActions.deleteDeck(activeDeckId!)} className="text-red-500 hover:text-red-400 p-1 rounded-md">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="text-sm text-matrix-dark">
                                <BilingualLabel label={`英雄: ${activeHero?.name || '無'}`} />
                            </div>
                             <div className="mt-2 text-sm">
                                <span className={`font-bold ${totalCards === 60 ? 'text-matrix-green' : 'text-matrix-light'}`}>
                                    {totalCards} / 60
                                </span>
                                {purityMet && <span className="ml-4 text-yellow-400 font-bold">共鳴純粹！</span>}
                            </div>
                        </Card>
                        <Card className="flex-grow p-4 overflow-y-auto">
                             <h3 className="text-lg font-semibold text-matrix-light mb-2"><BilingualLabel label="聖典列表 (Deck List)" /></h3>
                             <div className="space-y-1">
                                {Object.entries(activeDeck.cardIds).map(([cardId, count]) => {
                                    const card = allCards.find(c => c.id === cardId);
                                    if (!card) return null;
                                    const elementTheme = elements.find(e => e.name === card.element)?.theme;
                                    return (
                                        <div key={cardId} className="flex items-center justify-between p-2 bg-matrix-bg/50 rounded-md">
                                            <div className="flex items-center">
                                                 <div className={`w-2 h-5 rounded mr-2 ${elementTheme ? spiritColorMap[elementTheme.color].bg.replace('/10', '/80') : 'bg-matrix-dark'}`}></div>
                                                <span className="text-matrix-light">{card.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-mono text-matrix-dark bg-matrix-bg px-2 rounded">{count}x</span>
                                                <button onClick={() => handleRemoveCard(cardId)} className="text-red-500 hover:text-red-400">
                                                    <XIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                             </div>
                        </Card>
                        <Card className="p-4 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-matrix-light mb-2"><BilingualLabel label="聖典統計 (Deck Stats)" /></h3>
                            <div className="flex">
                                <div className="w-2/3">
                                    <h4 className="text-sm text-matrix-dark">法力曲線 (Mana Curve)</h4>
                                    <ManaCurveChart deckCards={deckCards} />
                                </div>
                                <div className="w-1/3 pl-4 border-l border-matrix-dark/30">
                                     <h4 className="text-sm text-matrix-dark">類型 (Types)</h4>
                                     <ul className="text-sm text-matrix-light mt-2 space-y-1">
                                         {Object.entries(cardTypesCount).map(([type, count]: [string, number]) => (
                                             <li key={type} className="flex justify-between"><span>{type}</span> <span>{count}</span></li>
                                         ))}
                                     </ul>
                                </div>
                            </div>
                        </Card>
                        </>
                    ) : (
                        <Card className="flex-1 flex items-center justify-center text-center text-matrix-dark">
                            <p><BilingualLabel label="請選擇或創建一個聖典開始構築。(Select or create a deck to start building.)" /></p>
                        </Card>
                    )}
                </div>

                {/* Right Column: Card Pool */}
                <div className="lg:w-1/4 flex flex-col gap-6">
                    <Card className="p-4 flex-shrink-0">
                        <h2 className="text-xl font-semibold text-matrix-cyan mb-3"><BilingualLabel label="符文池 (Rune Pool)" /></h2>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-matrix-dark" />
                            </span>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="搜尋符文..."
                                className="w-full p-2 pl-10 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                            />
                        </div>
                         <div className="flex flex-wrap gap-2 mt-2">
                             {['All', ...elements.map(e => e.name)].map(el => (
                                 <button key={el} onClick={() => setElementFilter(el)} className={`px-2 py-0.5 text-xs rounded-full ${elementFilter === el ? 'bg-matrix-cyan text-matrix-bg' : 'bg-matrix-dark/50 text-matrix-light'}`}>
                                     {el}
                                 </button>
                             ))}
                         </div>
                    </Card>
                    <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                       {cardPool.map(card => {
                            const countInDeck = deckCardCounts[card.id] || 0;
                            const isDeckFull = totalCards >= 60;
                            const isCardMaxed = countInDeck >= 4;
                            const isDisabled = !activeDeck || isDeckFull || isCardMaxed;

                            return (
                                <SingleTcgCard 
                                    key={card.id}
                                    card={card}
                                    onAdd={handleAddCard}
                                    disabled={isDisabled}
                                />
                            );
                       })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeckBuilderPage;
