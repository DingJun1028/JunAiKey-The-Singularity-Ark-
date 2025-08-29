import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { spirits as initialSpirits, avatars as initialAvatars, professions, ElementSpirit, Avatar } from '../core/growthSystem';

export const expToNextLevel = (level: number): number => Math.floor(100 * Math.pow(level, 1.5));

interface SummonerState {
  spirits: ElementSpirit[];
  avatars: Avatar[];
  selectedProfessionId: string | null;
  actions: {
    addExp: (spiritId: string, amount: number) => void;
    selectProfession: (professionId: string) => void;
  };
}

export const useSummonerStore = create<SummonerState>()(
  persist(
    (set, get) => ({
      spirits: initialSpirits,
      avatars: initialAvatars,
      selectedProfessionId: null,
      actions: {
        addExp: (spiritId, baseAmount) => {
          const { spirits, avatars, selectedProfessionId } = get();
          const profession = professions.find(p => p.id === selectedProfessionId);
          
          let amount = baseAmount;
          // Apply profession bonus
          if (profession?.bonus.includes(spirits.find(s => s.id === spiritId)?.name.split(' ')[0] ?? '')) {
              const multiplierMatch = profession.bonus.match(/×(\d+(\.\d+)?)/);
              if (multiplierMatch) {
                  amount = Math.floor(baseAmount * parseFloat(multiplierMatch[1]));
              }
          }

          const newSpirits = [...spirits];
          const newAvatars = [...avatars];

          // --- Update Spirit ---
          const spiritIndex = newSpirits.findIndex(s => s.id === spiritId);
          if (spiritIndex === -1) return;

          const spirit = { ...newSpirits[spiritIndex] };
          spirit.exp += amount;

          let needed = expToNextLevel(spirit.level);
          while (spirit.exp >= needed) {
            spirit.level++;
            spirit.exp -= needed;
            needed = expToNextLevel(spirit.level);
          }
          newSpirits[spiritIndex] = spirit;

          // --- Update Avatar ---
          const avatarIndex = newAvatars.findIndex(a => a.spiritId === spiritId);
          if (avatarIndex !== -1) {
            const avatar = { ...newAvatars[avatarIndex] };
            avatar.exp += amount; // Avatars gain the same amount of EXP

            let avatarNeeded = expToNextLevel(avatar.level);
            while (avatar.exp >= avatarNeeded) {
              avatar.level++;
              avatar.exp -= avatarNeeded;
              avatarNeeded = expToNextLevel(avatar.level);
            }
            newAvatars[avatarIndex] = avatar;
          }

          set({ spirits: newSpirits, avatars: newAvatars });
        },
        selectProfession: (professionId) => set({ selectedProfessionId: professionId }),
      },
    }),
    {
      name: 'junaikey-summoner-storage',
      // Only persist the core data, not actions
      partialize: (state) => ({
        spirits: state.spirits,
        avatars: state.avatars,
        selectedProfessionId: state.selectedProfessionId,
      }),
    }
  )
);
