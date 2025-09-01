
import React from 'react';
import PageHeader from '../components/PageHeader';
import TemplateIcon from '../components/icons/TemplateIcon';
import type { TcgCard } from '../types';
import TcgCardTemplate from '../components/TcgCardTemplate';

const mockUnitCard: TcgCard = {
    id: 'template-unit-01',
    name: 'Aether Guardian',
    element: 'Metal',
    type: 'Unit',
    cost: 5,
    attack: 4,
    health: 6,
    text: 'Guard. When this unit enters the battlefield, draw a card.',
    keywords: ['Guard', 'Draw'],
};

const CardTemplatePage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="卡牌視覺模板 (Card Visual Templates)"
                subtitle="探索宇宙法則的三種不同視覺形態。(Explore three distinct visual forms for the laws of the universe.)"
                icon={<TemplateIcon className="w-8 h-8" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                <div className="flex flex-col items-center w-full max-w-[280px]">
                    <h2 className="text-xl font-semibold text-center mb-4 text-matrix-light">經典版 (Classic Canon)</h2>
                    <TcgCardTemplate card={mockUnitCard} variant="classic" />
                </div>
                <div className="flex flex-col items-center w-full max-w-[280px]">
                     <h2 className="text-xl font-semibold text-center mb-4 text-matrix-light">極簡光學版 (Minimalist Optic)</h2>
                    <TcgCardTemplate card={mockUnitCard} variant="minimalist" />
                </div>
                 <div className="flex flex-col items-center w-full max-w-[280px]">
                     <h2 className="text-xl font-semibold text-center mb-4 text-matrix-light">未來科技符文版 (Futurist Rune-Tech)</h2>
                    <TcgCardTemplate card={mockUnitCard} variant="rune-tech" />
                </div>
            </div>
        </div>
    );
};

export default CardTemplatePage;
