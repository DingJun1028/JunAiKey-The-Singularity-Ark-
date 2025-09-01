


import React, { useState, useMemo } from 'react';
import CardStackIcon from '../components/icons/CardStackIcon';
import PageHeader from '../components/PageHeader';
import SearchIcon from '../components/icons/SearchIcon';
import TcgCard from '../components/TcgCard';
import TcgCardDetailModal from '../components/TcgCardDetailModal';
import { elements, keywords as allKeywords } from '../core/tcgData';
import type { ElementData } from '../core/tcgData';
import { useDebounce } from '../hooks/useDebounce';

const CardCodexPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

    const filteredElements = useMemo(() => {
        let filtered = elements;
        if (filter !== 'All') {
            filtered = filtered.filter(el => el.name === filter);
        }
        if (debouncedSearch) {
            const lowerSearch = debouncedSearch.toLowerCase();
            filtered = filtered.filter(el =>
                el.name.toLowerCase().includes(lowerSearch) ||
                el.hero.name.toLowerCase().includes(lowerSearch) ||
                el.philosophy.toLowerCase().includes(lowerSearch) ||
                Object.values(el.keywords).flat().some(kw => allKeywords[kw]?.name.toLowerCase().includes(lowerSearch))
            );
        }
        return filtered;
    }, [filter, debouncedSearch]);
    
    const handleCardClick = (element: ElementData) => {
        setSelectedElement(element);
    };

    const handleCloseModal = () => {
        setSelectedElement(null);
    };


    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="萬能聖典 (Omni Codex)"
                subtitle="探索《終始矩陣：編年史》的元素、英雄與法則。(Explore the elements, heroes, and laws of Terminus Matrix: Chronicles.)"
                icon={<CardStackIcon className="w-8 h-8" />}
            />

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-matrix-dark" />
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜尋元素、英雄或關鍵詞..."
                        className="w-full p-3 pl-10 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                    />
                </div>
                <div className="flex-shrink-0">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full md:w-auto p-3 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                    >
                        <option value="All">所有元素</option>
                        {elements.map(el => (
                            <option key={el.name} value={el.name}>{el.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredElements.map(element => (
                    <TcgCard 
                        key={element.name} 
                        element={element}
                        onClick={() => handleCardClick(element)}
                    />
                ))}
            </div>
            
            <TcgCardDetailModal
                isOpen={!!selectedElement}
                onClose={handleCloseModal}
                element={selectedElement}
            />

        </div>
    );
};

export default CardCodexPage;
