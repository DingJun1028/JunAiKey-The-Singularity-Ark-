
import type { TcgCard } from '../types';
import { avatars as staticAvatars, spirits as staticSpirits, type Avatar, type SpiritColor } from './growthSystem';
import { spiritColorMap } from './theme';

export interface ElementKeywords {
    universal: string[];
    elemental: string[];
    esoteric: string[];
}

export interface ElementData {
    name: string;
    hero: Avatar;
    theme: {
        color: SpiritColor;
        border: string;
        text: string;
        shadow: string;
        bg: string;
    };
    philosophy: string;
    tacticalStyles: string[];
    keywords: ElementKeywords;
}


// Maps spirit IDs to their English names and core philosophies
const elementMap: Record<string, { name: string, philosophy: string, tacticalStyles: string[], keywords: ElementKeywords }> = {
    aurex: { name: 'Metal', philosophy: 'Order, structure, and unyielding logic.', tacticalStyles: ['機工軍團 (Artifact Swarm): 透過神器協同效應取勝。', '神兵鍛造 (Voltron): 打造單一無敵的神器生物。'], keywords: { universal: ['Guard'], elemental: ['Stun'], esoteric: ['Ramp'] } },
    sylfa: { name: 'Wood', philosophy: 'Growth, connection, and the cycle of life.', tacticalStyles: ['世界樹之裔 (Go-Tall): 培育單一巨大生物。', '萬物相生 (Go-Wide): 召喚大量衍生物形成軍隊。'], keywords: { universal: ['Guard'], elemental: ['Heal'], esoteric: ['Ramp'] } },
    aquare: { name: 'Water', philosophy: 'Flow, adaptation, and deep knowledge.', tacticalStyles: ['靜潭壁壘 (Control): 防禦、治療與反制，拖入後期。', '深海寒流 (Tempo): 利用凍結與彈回效果擾亂節奏。'], keywords: { universal: ['Draw'], elemental: ['Bounce'], esoteric: ['Scry'] } },
    pyra: { name: 'Fire', philosophy: 'Action, transformation, and raw power.', tacticalStyles: ['烈焰強襲 (Aggro): 速攻生物與傷害法術壓制。', '焦土灼燒 (Burn): 持續性效果傷害消耗。'], keywords: { universal: ['Damage'], elemental: ['Haste'], esoteric: ['Damage'] } },
    terrax: { name: 'Earth', philosophy: 'Stability, resilience, and foundational strength.', tacticalStyles: ['不動山脈 (Fortress): 高生命值守護單位防禦。', '盤根巨木 (Ramp): 加速資源以召喚巨型生物。'], keywords: { universal: ['Guard'], elemental: ['Heal'], esoteric: ['Ramp'] } },
    luxis: { name: 'Light', philosophy: 'Purity, guidance, and illuminating truth.', tacticalStyles: ['聖盾壁壘 (Fortress): 利用「聖盾」與治療建立不敗防線。', '榮光遠征 (Go-Wide): 鋪開大量單位後集體強化。'], keywords: { universal: ['Heal'], elemental: ['Stun'], esoteric: ['Scry'] } },
    nyxos: { name: 'Dark', philosophy: 'Potential, cost, and the secrets of the unknown.', tacticalStyles: ['虛空獻祭 (Sacrifice): 犧牲單位觸發強大效果。', '蝕魂詛咒 (Discard/Control): 棄牌與資源破壞。'], keywords: { universal: ['Damage'], elemental: ['Draw'], esoteric: ['Bounce'] } },
    nullis: { name: 'Void', philosophy: 'Universal adaptation and system integration.', tacticalStyles: ['萬物歸虛 (Exile/Control): 透過放逐掏空對手資源。', '熵能爆發 (Self-Exile): 放逐自身卡牌以獲取力量。'], keywords: { universal: ['Draw'], elemental: ['Damage'], esoteric: ['Ramp'] } },
    tempest: { name: 'Wind', philosophy: 'Change, speed, and resource management.', tacticalStyles: ['疾風連擊 (Tempo/Evasion): 穿透防禦持續施壓。', '空靈詭計 (Control/Hand): 操控雙方手牌，製造資訊差。'], keywords: { universal: ['Haste'], elemental: ['Bounce'], esoteric: ['Scry'] } },
    anima: { name: 'Spirit', philosophy: 'Memory, core insight, and the essence of being.', tacticalStyles: ['五色共鳴 (Multi-Element): 組合多陣營力量。', '乙太塑形 (Rule Manipulation): 扭曲遊戲規則本身。'], keywords: { universal: ['Draw'], elemental: ['Heal'], esoteric: ['Scry'] } },
    machina: { name: 'Lightning', philosophy: 'Automation, system links, and sudden impact.', tacticalStyles: ['雷霆連鎖 (Spell Chain): 利用法術連鎖產生爆發。', '電磁脈衝 (Stun/Burst): 「暈眩」控制後給予致命一擊。'], keywords: { universal: ['Haste'], elemental: ['Damage'], esoteric: ['Stun'] } },
    astra: { name: 'Time', philosophy: 'Wisdom, causality, and the flow of events.', tacticalStyles: ['時序凍結 (Tempo/Delay): 透過延遲效果打亂對手。', '因果悖論 (Combo): 完成高難度的組合技取勝。'], keywords: { universal: ['Scry'], elemental: ['Stun'], esoteric: ['Bounce'] } },
};

export const elements: ElementData[] = staticSpirits.map(spirit => {
    const elementInfo = elementMap[spirit.id];
    return {
        name: elementInfo.name,
        hero: staticAvatars.find(a => a.spiritId === spirit.id)!,
        theme: {
            color: spirit.color,
            ...spiritColorMap[spirit.color]
        },
        philosophy: elementInfo.philosophy,
        tacticalStyles: elementInfo.tacticalStyles,
        keywords: elementInfo.keywords
    };
});

export const allCards: TcgCard[] = [
    // Light
    { id: 'light-001', name: 'Initiate of Light', element: 'Light', type: 'Unit', cost: 1, attack: 1, health: 2, text: 'A new recruit to the cause of light.', keywords: [] },
    { id: 'light-002', name: 'Sun Cleric', element: 'Light', type: 'Unit', cost: 2, attack: 2, health: 3, text: 'Heal an ally for 2 health.', keywords: ['Heal'] },
    { id: 'light-003', name: 'Blinding Flash', element: 'Light', type: 'Spell', cost: 3, text: 'Stun an enemy unit for 1 turn.', keywords: ['Stun'] },
    // Earth
    { id: 'earth-001', name: 'Stone Golem', element: 'Earth', type: 'Unit', cost: 2, attack: 1, health: 4, text: 'A sturdy defender.', keywords: ['Guard'] },
    { id: 'earth-002', name: 'Earthen Wall', element: 'Earth', type: 'Spell', cost: 3, text: 'Give an ally +0/+3 health.', keywords: [] },
    { id: 'earth-003', name: 'Stone Sentinel', element: 'Earth', type: 'Unit', cost: 4, attack: 3, health: 5, text: 'Guard. When summoned, gain +0/+1 for each other Earth unit on the battlefield.', keywords: ['Guard'] },
    // Fire
    { id: 'fire-001', name: 'Goblin Pyromancer', element: 'Fire', type: 'Unit', cost: 1, attack: 2, health: 1, text: 'Hasty and aggressive.', keywords: ['Haste'] },
    { id: 'fire-002', name: 'Fireball', element: 'Fire', type: 'Spell', cost: 2, text: 'Deal 3 damage.', keywords: ['Damage'] },
    // Water
    { id: 'water-001', name: 'Tidal Mage', element: 'Water', type: 'Unit', cost: 3, attack: 2, health: 4, text: 'Returns a unit to its owner\'s hand.', keywords: ['Bounce'] },
    { id: 'water-002', name: 'Divination', element: 'Water', type: 'Spell', cost: 1, text: 'Look at the top two cards of your deck.', keywords: ['Scry'] },
    // Neutral Spells & Artifacts (assigned to Void element)
    { id: 'spell-001', name: 'Quick Study', element: 'Void', type: 'Spell', cost: 1, text: 'Draw a card.', keywords: ['Draw'] },
    { id: 'spell-002', name: 'Arcane Bolt', element: 'Void', type: 'Spell', cost: 2, text: 'Deal 2 damage to any target.', keywords: ['Damage'] },
    { id: 'artifact-001', name: 'Mana Crystal', element: 'Void', type: 'Artifact', cost: 2, text: 'Provides +1 maximum energy.', keywords: ['Ramp'] },
    { id: 'void-spell-003', name: 'Quantum Entanglement', element: 'Void', type: 'Spell', cost: 3, text: 'Swap the positions of two friendly units on the battlefield.', keywords: ['Bounce'] },
];

export const keywords: Record<string, { name: string; description: string }> = {
    Heal: { name: 'Heal', description: 'Restores a specified amount of health to a unit or hero.' },
    Stun: { name: 'Stun', description: 'A stunned unit cannot attack for one turn.' },
    Guard: { name: 'Guard', description: 'Enemy units must attack units with Guard first.' },
    Draw: { name: 'Draw', description: 'Draw a card from your deck.' },
    Damage: { name: 'Damage', description: 'Deals a specified amount of damage.' },
    Ramp: { name: 'Ramp', description: 'Increases your maximum energy for future turns.' },
    Haste: { name: 'Haste', description: 'This unit can attack on the turn it is summoned.' },
    Bounce: { name: 'Bounce', description: 'Return a unit from the battlefield to its owner\'s hand.' },
    Scry: { name: 'Scry', description: 'Look at the top card(s) of your deck and put them back in any order.' },
};
