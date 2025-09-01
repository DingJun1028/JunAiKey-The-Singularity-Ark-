


import React from 'react';
import Card from './Card';
import type { ElementData } from '../core/tcgData';
import KeywordTooltip from './KeywordTooltip';

interface TcgCardProps {
    element: ElementData;
    onClick?: () => void;
}

const TcgCard: React.FC<TcgCardProps> = ({ element, onClick }) => {
    return (
        <Card
            className={`p-4 border-2 ${element.theme.border} ${element.theme.shadow} flex flex-col`}
            onClick={onClick}
        >
            <div className="text-center mb-3">
                <h2 className={`text-2xl font-bold ${element.theme.text}`}>{element.name}</h2>
                <p className="text-sm text-matrix-dark">{element.hero.name}</p>
            </div>
            <p className="text-xs text-center text-matrix-light italic flex-grow mb-4">"{element.philosophy}"</p>
            <div className="space-y-2 text-xs">
                <div>
                    <h4 className="font-semibold text-matrix-light border-b border-matrix-dark/30 mb-1">通用敕令</h4>
                    <div className="flex flex-wrap gap-1">
                        {element.keywords.universal.map(kw => <KeywordTooltip key={kw} keyword={kw} />)}
                    </div>
                </div>
                <div>
                    <h4 className={`font-semibold ${element.theme.text} border-b border-matrix-dark/30 mb-1`}>元素敕令</h4>
                     <div className="flex flex-wrap gap-1">
                        {element.keywords.elemental.map(kw => <KeywordTooltip key={kw} keyword={kw} />)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-matrix-cyan border-b border-matrix-dark/30 mb-1">奧義敕令</h4>
                     <div className="flex flex-wrap gap-1">
                        {element.keywords.esoteric.map(kw => <KeywordTooltip key={kw} keyword={kw} />)}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TcgCard;
