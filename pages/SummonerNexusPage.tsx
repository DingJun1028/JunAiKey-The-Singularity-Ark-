import React, { useState } from 'react';
import Header from '../components/Header';
import NexusIcon from '../components/icons/NexusIcon';
import LockIcon from '../components/icons/LockIcon';
import { professions, avatarQuadrants, omniProfession, Avatar, spirits as staticSpirits, avatars as staticAvatars } from '../core/growthSystem';
import { spiritColorMap } from '../core/theme';
import AvatarDetailModal from '../components/AvatarDetailModal';
import { useSummonerStore, expToNextLevel } from '../store/summonerStore';
import SummonerStatus from '../components/SummonerStatus';

const Section: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="bg-matrix-bg/30 p-6 rounded-lg border border-matrix-dark/30 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-matrix-cyan mb-1">{title}</h2>
        <p className="text-sm text-matrix-dark mb-4">{subtitle}</p>
        <div className="flex-grow">{children}</div>
    </div>
);

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
      if(window.confirm(`您確定要選擇「${professions.find(p=>p.id===professionId)?.name}」作為您的主修職業嗎？`)){
          actions.selectProfession(professionId);
      }
  }

  return (
    <div className="animate-fade-in">
      <Header 
        title="召喚使中樞 (Summoner's Nexus)"
        subtitle="觀測您的意志如何坍縮為現實。這裡是您三位一體成長的聖殿。"
        icon={<NexusIcon className="w-8 h-8"/>}
      />

      <SummonerStatus />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Dimension 1: Element Mastery */}
        <Section title="第一維度：元素精通" subtitle="與12宇宙法則的共鳴深度">
            <div className="grid grid-cols-2 gap-4">
                {spirits.map(spirit => {
                    const theme = spiritColorMap[spirit.color];
                    const nextLevelExp = expToNextLevel(spirit.level);
                    const progress = (spirit.exp / nextLevelExp) * 100;
                    return (
                        <div key={spirit.id} className={`p-3 border-l-4 ${theme.border} ${theme.bg} rounded-r-md flex flex-col justify-between`}>
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h4 className={`font-bold ${theme.text}`}>{spirit.name}</h4>
                                    <span className={`text-xs font-mono ${theme.text}`}>Lv {spirit.level}</span>
                                </div>
                                <p className="text-xs text-matrix-dark">{getAwakeningStage(spirit.level)}</p>
                            </div>
                            <div className="mt-2">
                                <div className="w-full bg-matrix-dark/30 rounded-full h-1.5">
                                    <div className={`${theme.bg.replace('/10', '/50')} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="text-xs text-matrix-dark text-right font-mono">{spirit.exp} / {nextLevelExp} EXP</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
        
        {/* Dimension 2: Avatar Synergy */}
        <Section title="第二維度：化身協同" subtitle="您內在覺醒的萬能化身">
            <div className="space-y-4">
                {avatarQuadrants.map(quadrant => {
                    const quadrantAvatars = staticAvatars.filter(a => a.quadrant === quadrant);
                    if (quadrantAvatars.length === 0) return null;
                    return (
                        <div key={quadrant}>
                            <h3 className="font-semibold text-matrix-light/80 mb-2 border-b border-matrix-dark/30 pb-1">{quadrant}</h3>
                            <div className="flex flex-wrap gap-2">
                                {quadrantAvatars.map(avatarData => {
                                    const liveAvatar = avatars.find(a => a.id === avatarData.id) || avatarData;
                                    const spirit = staticSpirits.find(s => s.id === liveAvatar.spiritId);
                                    const theme = spirit ? spiritColorMap[spirit.color] : spiritColorMap['鋼鐵灰'];
                                    return (
                                        <button 
                                            key={liveAvatar.id} 
                                            onClick={() => setSelectedAvatar(liveAvatar)}
                                            className={`flex items-center space-x-2 px-3 py-1 text-sm bg-matrix-bg/70 rounded-md border ${theme.border} ${theme.text} transition-all duration-200 hover:scale-105 hover:shadow-lg ${theme.shadow} focus:outline-none focus:ring-2 focus:ring-matrix-cyan`}
                                        >
                                            <span>{liveAvatar.name}</span>
                                            <span className="text-xs opacity-70">(Lv {liveAvatar.level})</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>

        {/* Dimension 3: Profession Evolution */}
        <Section title="第三維度：職業進化" subtitle="您在矩陣中選擇的道路">
            <div className="space-y-4">
                {professions.map(prof => (
                    <button 
                        key={prof.id}
                        onClick={() => handleSelectProfession(prof.id)}
                        className={`w-full text-left bg-matrix-bg p-4 rounded-lg border transition-all duration-200 hover:border-matrix-green/80 hover:scale-[1.02]
                            ${selectedProfessionId === prof.id ? 'border-matrix-cyan shadow-matrix-glow-cyan ring-2 ring-matrix-cyan' : 'border-matrix-dark/50'}`}
                    >
                        <h3 className="text-lg font-bold text-matrix-green">{prof.name}</h3>
                        <p className="text-sm text-matrix-dark">{prof.domain}</p>
                        <p className="text-xs pt-1 mt-2"><strong className="text-matrix-light">核心化身:</strong> {prof.coreAvatars.map(id => staticAvatars.find(a=>a.id===id)?.name).join('、')}</p>
                        <p className="text-xs"><strong className="text-matrix-light">職業加成:</strong> {prof.bonus}</p>
                    </button>
                ))}
                {/* Omni Profession (Locked) */}
                 <div className="bg-matrix-bg p-4 rounded-lg border border-dashed border-matrix-dark/50 space-y-1 opacity-60 flex items-center space-x-4">
                     <LockIcon className="w-8 h-8 text-matrix-dark flex-shrink-0" />
                     <div>
                        <h3 className="text-lg font-bold text-matrix-dark">{omniProfession.name}</h3>
                        <p className="text-sm text-matrix-dark mb-2">{omniProfession.domain}</p>
                        <p className="text-xs text-matrix-dark"><strong className="text-matrix-light/50">解鎖條件:</strong> 所有化身達到共鳴階段</p>
                    </div>
                </div>
            </div>
        </Section>
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