
<<<<<<< HEAD

import React, { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
=======
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
>>>>>>> feature-branch
import NexusIcon from '../components/icons/NexusIcon';
import { professions, spirits as staticSpirits, avatars as staticAvatars, Avatar } from '../core/growthSystem';
import { spiritColorMap } from '../core/theme';
import AvatarDetailModal from '../components/AvatarDetailModal';
import { useSummonerStore, expToNextLevel } from '../store/summonerStore';
import SummonerStatus from '../components/SummonerStatus';
import BilingualLabel from '../components/BilingualLabel';

const getAwakeningStage = (level: number) => {
    if (level <= 5) return '沉睡 (Dormant)';
    if (level <= 15) return '覺醒 (Awakened)';
    if (level <= 30) return '共鳴 (Resonant)';
    if (level <= 50) return '融合 (Merged)';
    if (level <= 75) return '超越 (Transcendent)';
    if (level <= 99) return '傳說 (Legendary)';
    return '永恆 (Eternal)';
};

const SummonerNexusPage: React.FC = () => {
    const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
    const { spirits, avatars, selectedProfessionId, actions } = useSummonerStore();

    const handleSelectProfession = (professionId: string) => {
        actions.selectProfession(professionId);
    };

    const affectedSpiritIds = useMemo(() => {
        if (!selectedProfessionId) return new Set();
        const profession = professions.find(p => p.id === selectedProfessionId);
        if (!profession) return new Set();
        
        const ids = new Set<string>();
        staticSpirits.forEach(spirit => {
            if (profession.bonus.includes(spirit.name.split(' ')[0])) {
                ids.add(spirit.id);
            }
        });
        return ids;
    }, [selectedProfessionId]);

    const tableData = useMemo(() => {
        return staticSpirits.map(spiritData => {
            const liveSpirit = spirits.find(s => s.id === spiritData.id) || spiritData;
            const avatarData = staticAvatars.find(a => a.spiritId === spiritData.id);
            const liveAvatar = avatarData ? (avatars.find(a => a.id === avatarData.id) || avatarData) : null;
            const relevantProfessions = professions.filter(p =>
                p.bonus.includes(liveSpirit.name.split(' ')[0])
            );
            return {
                spirit: liveSpirit,
                avatar: liveAvatar,
                professions: relevantProfessions,
            };
        });
    }, [spirits, avatars]);

    return (
        <div className="animate-fade-in space-y-8">
<<<<<<< HEAD
            <PageHeader
=======
            <Header
>>>>>>> feature-branch
                title="召喚使中樞 (Summoner's Nexus)"
                subtitle="觀測您的意志如何坍縮為現實。這裡是您三位一體成長的聖殿。"
                icon={<NexusIcon className="w-8 h-8" />}
            />

            <SummonerStatus />

            {/* Profession Selection */}
            <div className="bg-matrix-bg/30 p-4 rounded-lg border border-matrix-dark/30">
                <h2 className="text-xl font-bold text-matrix-cyan mb-3">
                    <BilingualLabel label="職業進化 (Profession Evolution)" />
                </h2>
                <div className="flex flex-wrap gap-2">
                    {professions.map(prof => (
                        <button
                            key={prof.id}
                            onClick={() => handleSelectProfession(prof.id)}
                            className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200
                                ${selectedProfessionId === prof.id
                                    ? 'bg-matrix-cyan/20 text-matrix-cyan border-matrix-cyan shadow-matrix-glow-cyan'
                                    : 'bg-matrix-bg/50 border-matrix-dark/50 text-matrix-light hover:bg-matrix-dark/50 hover:border-matrix-light/50'
                                }
                            `}
                        >
                           <BilingualLabel label={prof.name} />
                        </button>
                    ))}
                    {selectedProfessionId && (
                        <button
                            onClick={() => handleSelectProfession(null)}
                            className="px-3 py-1.5 text-sm rounded-md border bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/40"
                        >
                            <BilingualLabel label="清除選擇 (Clear)" />
                        </button>
                    )}
                </div>
            </div>

            {/* Unified Growth Table */}
            <div className="overflow-x-auto bg-matrix-bg/30 rounded-lg border border-matrix-dark/30">
                <table className="w-full min-w-[1000px] text-left">
                    <thead className="bg-matrix-bg/50 text-xs text-matrix-dark uppercase tracking-wider">
                        <tr>
                            <th className="p-4"><BilingualLabel label="元素精靈 (Element Spirit)" /></th>
                            <th className="p-4"><BilingualLabel label="共鳴化身 (Resonant Avatar)" /></th>
                            <th className="p-4"><BilingualLabel label="影響職業 (Affected Profession)" /></th>
                            <th className="p-4"><BilingualLabel label="精通領域 (Mastery Domain)" /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-matrix-dark/20">
                        {tableData.map(({ spirit, avatar, professions }) => {
                            const theme = spiritColorMap[spirit.color];
                            const nextLevelExp = expToNextLevel(spirit.level);
                            const progress = (spirit.exp / nextLevelExp) * 100;
                            const isHighlighted = affectedSpiritIds.has(spirit.id);

                            return (
                                <tr key={spirit.id} className={`transition-all duration-300 ${isHighlighted ? 'bg-matrix-cyan/10' : 'hover:bg-matrix-dark/20'}`}>
                                    <td className={`p-4 border-l-4 ${theme.border} relative`}>
                                        {isHighlighted && <div className="absolute inset-0 ring-2 ring-matrix-cyan pointer-events-none"></div>}
                                        <div className="font-bold text-base mb-1" style={{ color: theme.text }}>
                                            <BilingualLabel label={spirit.name} />
                                        </div>
                                        <div className="text-xs text-matrix-dark mb-2">
                                            {getAwakeningStage(spirit.level)} - <BilingualLabel label={spirit.law} />
                                        </div>
                                        <div className="w-full bg-matrix-dark/30 rounded-full h-1.5">
                                            <div className={`${theme.bg.replace('/10', '/50')} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-mono text-matrix-dark mt-1">
                                            <span>LV {spirit.level}</span>
                                            <span>{spirit.exp}/{nextLevelExp}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-top">
                                        {avatar ? (
                                            <button
                                                onClick={() => setSelectedAvatar(avatar)}
                                                className={`font-medium transition-colors hover:text-white ${theme.text}`}
                                            >
                                                <BilingualLabel label={avatar.name} />
                                            </button>
                                        ) : (
                                            <span className="text-matrix-dark">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 align-top text-sm text-matrix-light">
                                        {professions.length > 0 ? professions.map(p => p.name.split(' ')[0]).join(', ') : <span className="text-matrix-dark">通用</span>}
                                    </td>
                                    <td className="p-4 align-top text-sm text-matrix-light max-w-xs">{spirit.domain}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <AvatarDetailModal
                isOpen={!!selectedAvatar}
                onClose={() => setSelectedAvatar(null)}
                avatar={selectedAvatar}
            />
        </div>
    );
};

export default SummonerNexusPage;
