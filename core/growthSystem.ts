// This file establishes the core data structures for the Trinity Growth System.
// It translates the lore and game design into a structured format.

// --- TYPES ---
export type SpiritColor = '燦金色' | '翡翠綠' | '深海藍' | '緋紅色' | '赭石棕' | '月光白' | '暗夜紫' | '水晶色' | '天青色' | '紫羅蘭' | '鋼鐵灰' | '虹彩色';

export interface ElementSpirit {
  id: string;
  law: string;
  name: string;
  color: SpiritColor;
  domain: string;
  stages: string[];
  level: number;
  exp: number;
}

export type AvatarQuadrant = '中樞化身' | '核心法則化身' | '系統構築化身' | '洞察創造化身' | '執行守護化身' | '頂點化身' | '特殊化身';

export interface Avatar {
  id: string;
  name: string;
  spiritId: string;
  quadrant: AvatarQuadrant;
  level: number;
  exp: number;
}

export interface Profession {
  id: string;
  name: string;
  coreAvatars: string[];
  domain: string;
  bonus: string;
  unlocks: string;
}

export interface Milestone {
  name: string;
  level: number; // The total level required to reach this milestone
  color: string;
  shadow: string;
}

// --- DATA DEFINITIONS ---

// Define the stages once to be reused
const spiritAwakeningStages = [
    '沉睡 (Dormant)',
    '覺醒 (Awakened)',
    '共鳴 (Resonant)',
    '融合 (Merged)',
    '超越 (Transcendent)',
    '傳說 (Legendary)',
    '永恆 (Eternal)',
];


export const spirits: ElementSpirit[] = [
  { id: 'aurex', law: '秩序 Order', name: '鋒靈 (Aurex)', color: '燦金色', domain: '系統架構、規則制定', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'sylfa', law: '成長 Growth', name: '森靈 (Sylfa)', color: '翡翠綠', domain: '學習進化、能力擴展', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'aquare', law: '思緒 Thought', name: '湧靈 (Aquare)', color: '深海藍', domain: '邏輯分析、知識探索', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'pyra', law: '行動 Action', name: '焰靈 (Pyra)', color: '緋紅色', domain: '執行效率、任務完成', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'terrax', law: '穩定 Stability', name: '磐靈 (Terrax)', color: '赭石棕', domain: '基礎建設、穩定運營', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'luxis', law: '導引 Guidance', name: '光靈 (Luxis)', color: '月光白', domain: '指導教學、路徑規劃', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'nyxos', law: '混沌 Chaos', name: '暗靈 (Nyxos)', color: '暗夜紫', domain: '創新突破、規則重構', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'nullis', law: '通用 Null', name: '無靈 (Nullis)', color: '水晶色', domain: '萬能適應、系統整合', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'tempest', law: '變革 Change', name: '時風靈 (Tempest)', color: '天青色', domain: '流程優化、資源管理', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'anima', law: '本質 Essence', name: '魂靈 (Anima)', color: '紫羅蘭', domain: '記憶管理、核心洞察', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'machina', law: '機械 Machine', name: '械靈 (Machina)', color: '鋼鐵灰', domain: '自動化、系統連結', stages: spiritAwakeningStages, level: 1, exp: 0 },
  { id: 'astra', law: '雙耀星辰', name: '星靈 (Astra)', color: '虹彩色', domain: '超越維度、終極融合', stages: spiritAwakeningStages, level: 1, exp: 0 },
];

export const avatars: Avatar[] = [
  // 中樞
  { id: 'coordinator', name: '協同引導者', spiritId: 'nullis', quadrant: '中樞化身', level: 1, exp: 0 },
  // 象限 I
  { id: 'observer', name: '真理觀測者', spiritId: 'aquare', quadrant: '核心法則化身', level: 1, exp: 0 },
  { id: 'mentor', name: '啟蒙光導師', spiritId: 'luxis', quadrant: '核心法則化身', level: 1, exp: 0 },
  // 象限 II
  { id: 'linker', name: '矩陣連結師', spiritId: 'machina', quadrant: '系統構築化身', level: 1, exp: 0 },
  { id: 'alchemist', name: '熵減煉金術士', spiritId: 'terrax', quadrant: '系統構築化身', level: 1, exp: 0 },
  // 象限 III
  { id: 'scribe', name: '靈魂書記官', spiritId: 'anima', quadrant: '洞察創造化身', level: 1, exp: 0 },
  { id: 'programmer', name: '創世程式設計師', spiritId: 'sylfa', quadrant: '洞察創造化身', level: 1, exp: 0 },
  // 象限 IV
  { id: 'commander', name: '代理指揮官', spiritId: 'pyra', quadrant: '執行守護化身', level: 1, exp: 0 },
  { id: 'guardian', name: '公理守望者', spiritId: 'nyxos', quadrant: '執行守護化身', level: 1, exp: 0 },
  // 頂點
  { id: 'architect', name: '第一架構師', spiritId: 'aurex', quadrant: '頂點化身', level: 1, exp: 0 },
  // 特殊
  { id: 'hierophant', name: '聖鑰主祭', spiritId: 'tempest', quadrant: '特殊化身', level: 1, exp: 0 },
];

export const professions: Profession[] = [
  {
    id: 'insight',
    name: '洞察主修',
    coreAvatars: ['observer', 'mentor'],
    domain: '數據分析、知識挖掘、規律發現',
    bonus: '湧靈、光靈經驗值 ×2.5',
    unlocks: '預測未來趨勢、隱藏模式識別',
  },
  {
    id: 'architecture',
    name: '構築主修',
    coreAvatars: ['linker', 'alchemist'],
    domain: '系統建設、穩定維護、效率優化',
    bonus: '械靈、磐靈經驗值 ×2.5',
    unlocks: '系統自動化、穩定性保障',
  },
  {
    id: 'creation',
    name: '創造主修',
    coreAvatars: ['scribe', 'programmer'],
    domain: '內容創作、記憶管理、創新設計',
    bonus: '魂靈、森靈經驗值 ×2.5',
    unlocks: '原創能力、記憶宮殿',
  },
  {
    id: 'execution',
    name: '執行主修',
    coreAvatars: ['commander', 'guardian'],
    domain: '任務管理、規則執行、變革推動',
    bonus: '焰靈、暗靈經驗值 ×2.5',
    unlocks: '瞬間執行、規則重寫',
  },
];

export const omniProfession: Profession = {
    id: 'omni',
    name: '全能召喚使',
    coreAvatars: ['architect', 'hierophant'],
    domain: '跨維度整合、宇宙法則掌控',
    bonus: '鋒靈、時風靈經驗值 ×3.0，星靈解鎖',
    unlocks: '創造新元素、重寫宇宙規則',
};

// Helper array to define the display order of quadrants in the UI
export const avatarQuadrants: AvatarQuadrant[] = [
    '中樞化身',
    '核心法則化身',
    '系統構築化身',
    '洞察創造化身',
    '執行守護化身',
    '頂點化身',
    '特殊化身',
];

export const milestones: Milestone[] = [
  { name: '初始 (Initiate)', level: 0, color: 'text-matrix-dark', shadow: 'shadow-matrix-dark/20' },
  { name: '青銅 (Bronze)', level: 50, color: 'text-yellow-600', shadow: 'shadow-yellow-600/30' },
  { name: '白銀 (Silver)', level: 150, color: 'text-gray-300', shadow: 'shadow-gray-300/30' },
  { name: '黃金 (Gold)', level: 300, color: 'text-yellow-400', shadow: 'shadow-yellow-400/30' },
  { name: '白金 (Platinum)', level: 500, color: 'text-cyan-300', shadow: 'shadow-cyan-300/30' },
  { name: '鑽石 (Diamond)', level: 750, color: 'text-cyan-200', shadow: 'shadow-cyan-200/40' },
  { name: '元鑰 (Keystone)', level: 1000, color: 'text-fuchsia-400', shadow: 'shadow-fuchsia-400/50' },
];
