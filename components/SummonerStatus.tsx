import React from 'react';
import { useSummonerStore } from '../store/summonerStore';
import { milestones } from '../core/growthSystem';
import MedalIcon from './icons/MedalIcon';

const SummonerStatus: React.FC = () => {
    const { spirits } = useSummonerStore();

    const totalLevel = spirits.reduce((sum, spirit) => sum + spirit.level, 0);

    const currentMilestone = [...milestones].reverse().find(m => totalLevel >= m.level) || milestones[0];
    const nextMilestoneIndex = milestones.findIndex(m => m.level === currentMilestone.level) + 1;
    const nextMilestone = nextMilestoneIndex < milestones.length ? milestones[nextMilestoneIndex] : null;

    const progress = nextMilestone 
        ? ((totalLevel - currentMilestone.level) / (nextMilestone.level - currentMilestone.level)) * 100
        : 100;
        
    const levelsToNext = nextMilestone ? nextMilestone.level - totalLevel : 0;
    const borderColorClass = currentMilestone.color.replace('text-', 'border-');

    return (
        <div className={`mb-8 p-6 bg-matrix-bg/50 rounded-lg border ${borderColorClass} shadow-lg ${currentMilestone.shadow} transition-all duration-500 animate-fade-in`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <MedalIcon className={`w-12 h-12 ${currentMilestone.color}`} />
                    <div>
                        <h2 className="text-xl font-bold text-matrix-light">萬能元鑰召喚使</h2>
                        <p className={`text-lg font-semibold ${currentMilestone.color}`}>{currentMilestone.name}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-bold text-matrix-light">總等級: {totalLevel}</span>
                        {nextMilestone && (
                            <span className="text-xs text-matrix-dark">下一階段: {nextMilestone.name} (還需 {levelsToNext} 級)</span>
                        )}
                    </div>
                    <div className="w-full bg-matrix-dark/30 rounded-full h-2.5">
                        <div 
                            className={`bg-gradient-to-r from-matrix-green to-matrix-cyan h-2.5 rounded-full transition-all duration-500`} 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummonerStatus;