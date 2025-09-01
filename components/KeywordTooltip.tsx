


import React, { useState } from 'react';
import { keywords as allKeywords } from '../core/tcgData';

interface KeywordTooltipProps {
    keyword: string;
    large?: boolean;
}

const KeywordTooltip: React.FC<KeywordTooltipProps> = ({ keyword, large = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const keywordData = allKeywords[keyword];

    if (!keywordData) {
        return <span className="p-1 bg-red-500/50 text-white text-xs rounded-md">{keyword}</span>;
    }

    const textClass = large ? 'text-sm px-3 py-1' : 'text-xs px-2 py-0.5';

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <span className={`bg-matrix-dark/80 text-matrix-light rounded-full cursor-pointer ${textClass}`}>
                {keywordData.name}
            </span>
            {isVisible && (
                <div 
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-matrix-bg-2 border border-matrix-cyan/50 rounded-lg shadow-lg z-10 animate-fade-in-fast"
                >
                    <h4 className="font-bold text-matrix-cyan">{keywordData.name}</h4>
                    <p className="text-sm text-matrix-light">{keywordData.description}</p>
                </div>
            )}
        </div>
    );
};

export default KeywordTooltip;
