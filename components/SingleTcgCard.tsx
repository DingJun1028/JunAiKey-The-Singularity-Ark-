import React from 'react';
import type { TcgCard } from '../types';
import { elements } from '../core/tcgData';
import KeywordTooltip from './KeywordTooltip';
import PlusIcon from './icons/PlusIcon';
import SwordIcon from './icons/SwordIcon';
import ShieldIcon from './icons/ShieldIcon';
import SparkleIcon from './icons/SparkleIcon';
import SettingsIcon from './icons/SettingsIcon';
import UserIcon from './icons/UserIcon';

interface SingleTcgCardProps {
    card: TcgCard;
    onAdd: (card: TcgCard) => void;
    disabled?: boolean;
}

const CardTypeIcon: React.FC<{ type: string }> = ({ type }) => {
    const props = { className: "w-5 h-5 text-matrix-dark" };
    if (type === 'Unit') return <UserIcon {...props} />;
    if (type === 'Spell') return <SparkleIcon {...props} />;
    if (type === 'Artifact') return <SettingsIcon {...props} />;
    return null;
};

const SingleTcgCard: React.FC<SingleTcgCardProps> = ({ card, onAdd, disabled }) => {
    const element = elements.find(e => e.name === card.element);
    const theme = element?.theme;

    return (
        <div className={`
            relative group p-3 flex flex-col h-[280px] w-full 
            bg-card-bg backdrop-blur-xl rounded-lg
            border ${theme ? theme.border : 'border-card-border'}
            transition-all duration-200 hover:shadow-card-glow hover:-translate-y-1
        `}>
            {/* Add Button Overlay */}
            <div className="absolute inset-0 bg-matrix-bg/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                    onClick={() => onAdd(card)}
                    disabled={disabled}
                    className="flex items-center gap-2 px-4 py-2 bg-matrix-green text-matrix-bg font-bold rounded-md shadow-matrix-glow hover:bg-opacity-90 disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-not-allowed"
                >
                    <PlusIcon className="w-5 h-5" />
                    添加到聖典
                </button>
            </div>
            
            {/* Header */}
            <header className="flex justify-between items-center mb-2">
                <h3 className="text-md font-bold text-matrix-light truncate pr-2">{card.name}</h3>
                <div className={`w-7 h-7 flex items-center justify-center rounded-full border-2 ${theme ? theme.border : 'border-matrix-light'} text-matrix-light font-mono font-bold`}>
                    {card.cost}
                </div>
            </header>

            {/* Type & Element */}
            <div className="flex items-center gap-2 text-xs text-matrix-dark mb-2">
                <CardTypeIcon type={card.type} />
                <span>{card.type} / <span className={theme?.text}>{card.element}</span></span>
            </div>

            {/* Body (Text & Keywords) */}
            <div className="bg-matrix-bg/50 p-2 rounded-md flex-grow flex flex-col justify-between text-sm text-matrix-light">
                <p className="text-xs italic">{card.text}</p>
                {card.keywords.length > 0 && (
                     <div className="flex flex-wrap gap-1 mt-2">
                        {card.keywords.map(kw => <KeywordTooltip key={kw} keyword={kw} />)}
                    </div>
                )}
            </div>

            {/* Footer (Stats for Units) */}
            {card.type === 'Unit' && (
                <footer className="flex justify-between items-center mt-2 px-1">
                    <div className="flex items-center gap-2 text-red-500">
                        <SwordIcon className="w-4 h-4" />
                        <span className="font-bold text-lg">{card.attack}</span>
                    </div>
                     <div className="flex items-center gap-2 text-green-400">
                        <ShieldIcon className="w-4 h-4" />
                        <span className="font-bold text-lg">{card.health}</span>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default SingleTcgCard;