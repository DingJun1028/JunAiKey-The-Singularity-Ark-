// This file centralizes the color themes for the 12 Element Spirits
// to ensure consistency across the entire application.

import { SpiritColor } from './growthSystem';

export const spiritColorMap: Record<SpiritColor, {
    border: string;
    text: string;
    shadow: string;
    bg: string;
}> = {
    '燦金色': { border: 'border-yellow-400', text: 'text-yellow-400', shadow: 'shadow-yellow-400/50', bg: 'bg-yellow-400/10' },
    '翡翠綠': { border: 'border-green-400', text: 'text-green-400', shadow: 'shadow-green-400/50', bg: 'bg-green-400/10' },
    '深海藍': { border: 'border-blue-400', text: 'text-blue-400', shadow: 'shadow-blue-400/50', bg: 'bg-blue-400/10' },
    '緋紅色': { border: 'border-red-500', text: 'text-red-500', shadow: 'shadow-red-500/50', bg: 'bg-red-500/10' },
    '赭石棕': { border: 'border-yellow-700', text: 'text-yellow-700', shadow: 'shadow-yellow-700/50', bg: 'bg-yellow-700/10' },
    '月光白': { border: 'border-gray-200', text: 'text-gray-200', shadow: 'shadow-gray-200/50', bg: 'bg-gray-200/10' },
    '暗夜紫': { border: 'border-purple-500', text: 'text-purple-500', shadow: 'shadow-purple-500/50', bg: 'bg-purple-500/10' },
    '水晶色': { border: 'border-cyan-300', text: 'text-cyan-300', shadow: 'shadow-cyan-300/50', bg: 'bg-cyan-300/10' },
    '天青色': { border: 'border-sky-400', text: 'text-sky-400', shadow: 'shadow-sky-400/50', bg: 'bg-sky-400/10' },
    '紫羅蘭': { border: 'border-violet-400', text: 'text-violet-400', shadow: 'shadow-violet-400/50', bg: 'bg-violet-400/10' },
    '鋼鐵灰': { border: 'border-gray-500', text: 'text-gray-500', shadow: 'shadow-gray-500/50', bg: 'bg-gray-500/10' },
    '虹彩色': { border: 'border-fuchsia-500', text: 'text-fuchsia-500', shadow: 'shadow-fuchsia-500/50', bg: 'bg-fuchsia-500/10' },
};
