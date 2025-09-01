
import React from 'react';
import type { TcgCard } from '../types';
import { elements } from '../core/tcgData';
import KeywordTooltip from './KeywordTooltip';
import SwordIcon from './icons/SwordIcon';
import ShieldIcon from './icons/ShieldIcon';
import SparkleIcon from './icons/SparkleIcon';
import SettingsIcon from './icons/SettingsIcon';
import UserIcon from './icons/UserIcon';

interface TcgCardTemplateProps {
    card: TcgCard;
    variant: 'classic' | 'minimalist' | 'rune-tech';
}

const CardTypeIcon: React.FC<{ type: string, className?: string }> = ({ type, className = "w-5 h-5" }) => {
    if (type === 'Unit') return <UserIcon className={className} />;
    if (type === 'Spell') return <SparkleIcon className={className} />;
    if (type === 'Artifact') return <SettingsIcon className={className} />;
    return null;
};

const TcgCardTemplate: React.FC<TcgCardTemplateProps> = ({ card, variant }) => {
    const element = elements.find(e => e.name === card.element);
    
    // Base container classes
    const baseClasses = "relative p-4 flex flex-col h-[400px] w-[280px] rounded-lg transition-all duration-300 shadow-lg select-none";

    // --- Variant-specific style objects ---
    const styles = {
        classic: {
            container: "bg-parchment text-stone-800 border-8 border-ornate-gold font-serif-classic shadow-xl shadow-black/30",
            art: "bg-stone-800/20 border-2 border-ornate-gold/50",
            headerName: "text-stone-800 font-bold tracking-wide",
            headerCost: "bg-ornate-gold text-white border-2 border-yellow-200",
            typeLine: "bg-stone-800/10 border-y-2 border-ornate-gold/50",
            textBox: "bg-transparent",
            stats: "text-stone-800",
            keyword: "bg-stone-800/10 text-stone-800 border border-stone-800/30",
        },
        minimalist: {
            container: "bg-gray-900 text-gray-200 border border-gray-700/50 shadow-lg shadow-cyan-500/10 backdrop-blur-sm",
            art: "bg-gray-800",
            headerName: "text-white font-semibold",
            headerCost: `bg-transparent border-2 ${element?.theme.border || 'border-gray-500'} text-white`,
            typeLine: "border-b border-gray-700/50",
            textBox: "bg-transparent",
            stats: element?.theme.text || 'text-gray-300',
            keyword: "bg-gray-700/50 text-gray-300",
        },
        'rune-tech': {
            container: "bg-card-bg backdrop-blur-xl border border-card-border",
            art: "bg-matrix-bg/50",
            headerName: "text-matrix-light font-bold",
            headerCost: `bg-transparent border-2 ${element?.theme.border || 'border-matrix-light'} text-matrix-light`,
            typeLine: "border-b border-matrix-dark/50",
            textBox: "bg-matrix-bg/50 p-2 rounded-md",
            stats: "text-matrix-light",
            keyword: "bg-matrix-dark/80 text-matrix-light",
        }
    };

    const s = styles[variant];

    return (
        <div className={`${baseClasses} ${s.container}`}>
            {/* Header: Name and Cost */}
            <header className="flex justify-between items-center mb-2">
                <h3 className={`text-xl truncate pr-2 ${s.headerName}`}>{card.name}</h3>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full font-mono font-bold text-2xl flex-shrink-0 ${s.headerCost}`}>
                    {card.cost}
                </div>
            </header>

            {/* Art Placeholder */}
            <div className={`h-32 w-full rounded-md mb-2 flex items-center justify-center ${s.art}`}>
                <span className="text-sm opacity-30 italic">Card Art</span>
            </div>

            {/* Type Line */}
            <div className={`flex items-center justify-between px-2 py-1 text-sm mb-2 ${s.typeLine}`}>
                <span className="font-bold">{card.type}</span>
                <span className={`font-bold ${element?.theme.text}`}>{card.element}</span>
            </div>

            {/* Text Box */}
            <div className={`flex-grow flex flex-col justify-between text-sm ${s.textBox}`}>
                <div>
                    <p className="italic mb-2">{card.text}</p>
                    {variant === 'rune-tech' && <p className="text-xs text-matrix-dark italic mt-1">"A sentinel forged in cosmic light."</p>}
                </div>
                {card.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {card.keywords.map(kw => (
                            <span key={kw} className={`text-xs px-2 py-0.5 rounded-full ${s.keyword}`}>
                                {kw}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Footer (Stats for Units) */}
            {card.type === 'Unit' && (
                <footer className={`flex justify-between items-center mt-2 px-1 pt-2 ${variant !== 'minimalist' ? 'border-t' : ''} ${variant === 'classic' ? 'border-ornate-gold/50' : 'border-matrix-dark/30'}`}>
                    <div className={`flex items-center gap-2 font-bold text-xl ${s.stats}`}>
                        <SwordIcon className={`w-5 h-5 ${variant === 'classic' ? 'text-red-700' : 'text-red-500'}`} />
                        <span>{card.attack}</span>
                    </div>
                     <div className={`flex items-center gap-2 font-bold text-xl ${s.stats}`}>
                        <ShieldIcon className={`w-5 h-5 ${variant === 'classic' ? 'text-green-700' : 'text-green-400'}`} />
                        <span>{card.health}</span>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default TcgCardTemplate;
