
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AitableIcon from '../components/icons/AitableIcon';
import { useUnifiedCardData } from '../hooks/useUnifiedCardData';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import { useDebounce } from '../hooks/useDebounce';
import SearchIcon from '../components/icons/SearchIcon';
import { formatMarkdown } from '../utils/markdown';
import type { CardType, UnifiedCardData } from '../types';
import BilingualLabel from '../components/BilingualLabel';
import { useSyncStore } from '../store/syncStore';
import SyncIcon from '../components/icons/SyncIcon';


const AitablePage: React.FC = () => {
    const navigate = useNavigate();
    const allCards = useUnifiedCardData();
    
    const [filter, setFilter] = useState<CardType | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const [expandedCardIds, setExpandedCardIds] = useState<Set<string>>(new Set());

    const { syncStatus, syncMessage, actions } = useSyncStore();
    const isSyncing = ['syncing', 'connecting', 'pushing', 'pulling'].includes(syncStatus);

    const getStatusClasses = () => {
        switch (syncStatus) {
            case 'success': return 'text-matrix-green bg-matrix-green/10 border-matrix-green/50';
            case 'error': return 'text-red-500 bg-red-500/10 border-red-500/50';
            case 'syncing': case 'connecting': case 'pushing': case 'pulling':
                return 'text-matrix-cyan animate-pulse border-matrix-cyan/50';
            default: return 'text-matrix-light hover:bg-matrix-dark/50 border-matrix-dark/50';
        }
    };

    const getTooltip = () => {
        if (isSyncing) return syncMessage;
        if (syncStatus === 'success' || syncStatus === 'error') return `${syncMessage} - 前往同步中樞查看詳情。`;
        return "與 Boost.space 同步 (Sync with Boost.space)";
    }

    const filteredCards = useMemo(() => {
        let cards = [...allCards]; // allCards is already sorted by date

        // 1. Apply type filter
        if (filter !== 'all') {
            cards = cards.filter(card => card.type === filter);
        }

        // 2. Apply search query filter
        const lowerCaseQuery = debouncedSearchQuery.toLowerCase().trim();
        if (lowerCaseQuery) {
            cards = cards.filter(card => 
                card.title.toLowerCase().includes(lowerCaseQuery) ||
                card.content.toLowerCase().includes(lowerCaseQuery) ||
                (card.tags || []).some(tag => tag.toLowerCase().includes(lowerCaseQuery))
            );
        }
        
        return cards;
    }, [allCards, filter, debouncedSearchQuery]);
    
    const cardTypes: { id: CardType | 'all'; label: string }[] = [
        { id: 'all', label: '全部 (All)' },
        { id: 'note', label: '筆記 (Notes)' },
        { id: 'proposal', label: '提案 (Proposals)' },
    ];
    
    const handleCardClick = (card: UnifiedCardData) => {
        navigate(card.path, { state: { scrollTo: card.id } });
    }

    const toggleCardExpansion = (cardId: string) => {
        setExpandedCardIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(cardId)) {
                newSet.delete(cardId);
            } else {
                newSet.add(cardId);
            }
            return newSet;
        });
    };

    return (
        <div className="animate-fade-in">
            <PageHeader 
                title="萬能智卡 (Aitable)"
                subtitle="矩陣中所有數據的統一視圖，萬象歸一。(A unified view of all data within the Matrix.)"
                icon={<AitableIcon className="w-8 h-8"/>}
            />

            {/* Controls Card */}
            <Card className="p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center space-x-2 bg-matrix-bg/50 p-1 border border-matrix-cyan/20 rounded-lg flex-shrink-0">
                        {cardTypes.map(type => (
                            <button 
                                key={type.id}
                                onClick={() => setFilter(type.id)}
                                className={`px-4 py-1.5 rounded-md transition-colors text-sm ${filter === type.id ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}
                            >
                                <BilingualLabel label={type.label} />
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-grow w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="w-5 h-5 text-matrix-dark" />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`搜尋 ${allCards.length} 張卡牌... (Search ${allCards.length} cards...)`}
                            className="w-full h-full p-2 pl-10 bg-matrix-bg border border-matrix-dark/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                            aria-label="搜尋卡牌"
                        />
                    </div>
                     <button
                        onClick={actions.syncWithBoostSpace}
                        disabled={isSyncing}
                        title={getTooltip()}
                        className={`flex-shrink-0 p-3 rounded-lg border transition-colors disabled:cursor-wait ${getStatusClasses()}`}
                        aria-label="同步狀態與觸發"
                    >
                        <SyncIcon className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </Card>

            {/* Cards Grid */}
            {filteredCards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCards.map(card => {
                        const isExpanded = expandedCardIds.has(card.id);
                        return (
                            <Card key={`${card.type}-${card.id}`} className="flex flex-col h-full">
                                <div className="cursor-pointer" onClick={() => handleCardClick(card)}>
                                    <CardHeader icon={card.icon} title={card.title} type={card.type} />
                                </div>
                                <CardBody className="flex-grow">
                                    <div 
                                      className={`text-sm text-matrix-light prose-styles ${!isExpanded && 'line-clamp-4'}`} 
                                      dangerouslySetInnerHTML={{ __html: formatMarkdown(card.content) }} 
                                    />
                                </CardBody>
                                <CardFooter>
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-matrix-dark">
                                            {card.resonance !== undefined ? (
                                                <span className="font-bold text-matrix-green">共鳴: {card.resonance}</span>
                                            ) : (
                                                <span>{new Date(card.createdAt).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => toggleCardExpansion(card.id)}
                                            className="text-xs text-matrix-cyan hover:text-white font-semibold"
                                        >
                                            <BilingualLabel label={isExpanded ? '收合 (Collapse)' : '展開 (Expand)'} />
                                        </button>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-matrix-dark">找不到符合條件的卡牌。(No cards match the criteria.)</p>
                </div>
            )}
        </div>
    );
};

export default AitablePage;
