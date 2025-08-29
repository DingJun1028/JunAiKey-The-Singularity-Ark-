import React from 'react';
import { Avatar, spirits as staticSpirits } from '../core/growthSystem';
import { spiritColorMap } from '../core/theme';
import { useSummonerStore, expToNextLevel } from '../store/summonerStore';

interface AvatarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: Avatar | null;
}

const AvatarDetailModal: React.FC<AvatarDetailModalProps> = ({ isOpen, onClose, avatar: initialAvatar }) => {
  const { avatars } = useSummonerStore();
  
  // Get live avatar data from the store
  const avatar = isOpen && initialAvatar ? avatars.find(a => a.id === initialAvatar.id) || initialAvatar : null;

  if (!isOpen || !avatar) return null;

  const spirit = staticSpirits.find(s => s.id === avatar.spiritId);
  const theme = spirit ? spiritColorMap[spirit.color] : spiritColorMap['鋼鐵灰'];
  const nextLevelExp = expToNextLevel(avatar.level);
  const progress = (avatar.exp / nextLevelExp) * 100;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-detail-title"
    >
      <div 
        className={`bg-matrix-bg-2 border ${theme.border} rounded-lg shadow-lg w-full max-w-md p-6 m-4 animate-fade-in shadow-md ${theme.shadow}`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 id="avatar-detail-title" className={`text-2xl ${theme.text} font-bold`}>{avatar.name}</h2>
                <p className="text-sm text-matrix-dark">{avatar.quadrant}</p>
            </div>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-3xl font-bold">&times;</button>
        </div>
        
        {spirit && (
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-matrix-light border-b border-matrix-dark/30 pb-1">共鳴精靈</h3>
                <div className={`p-3 border-l-4 ${theme.border} ${theme.bg} rounded-r-md`}>
                    <h4 className="font-bold">{spirit.name}</h4>
                    <p className="text-xs text-matrix-dark">{spirit.law}</p>
                    <p className="text-sm text-matrix-light mt-1">{spirit.domain}</p>
                </div>
            </div>
        )}

        <div className="mt-4">
            <h3 className="text-lg font-semibold text-matrix-light border-b border-matrix-dark/30 pb-1">協同狀態</h3>
            <div className="mt-2 space-y-2">
                <div className="flex justify-between items-baseline font-mono">
                    <span className="font-bold text-matrix-light">等級: <span className={theme.text}>{avatar.level}</span></span>
                    <span className="text-xs text-matrix-dark">{avatar.exp} / {nextLevelExp} EXP</span>
                </div>
                <div className="w-full bg-matrix-dark/30 rounded-full h-2">
                    <div className={`${theme.bg.replace('/10', '/50')} h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
        
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-matrix-light border-b border-matrix-dark/30 pb-1">已解鎖能力</h3>
            <p className="text-sm text-matrix-dark italic mt-2">
                {avatar.name} 專注於 {spirit?.domain.toLowerCase()} 領域，為召喚使提供獨特的戰略優勢。隨著協同等級的提升，將解鎖更多潛在能力。
            </p>
        </div>

      </div>
    </div>
  );
};

export default AvatarDetailModal;
