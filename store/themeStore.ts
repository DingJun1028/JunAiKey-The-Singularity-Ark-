import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, ThemeStore } from '../types';

export const defaultTheme: Theme = {
    colors: {
        'matrix-bg': '#0D0208',
        'matrix-bg-2': '#1a1a1a',
        'matrix-green': '#00FF41',
        'matrix-cyan': '#00FFFF',
        'matrix-light': '#a3b3c3',
        'matrix-dark': '#5a6877',
        'card-bg': 'rgba(26, 26, 26, 0.6)',
        'card-border': 'rgba(0, 255, 255, 0.2)',
        'card-border-hover': 'rgba(0, 255, 255, 0.5)',
    },
    fonts: {
        sans: "'Inter', sans-serif",
        mono: "'Fira Code', monospace",
    },
};

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: defaultTheme,
            setTheme: (newTheme) => set({ theme: newTheme }),
            resetTheme: () => set({ theme: defaultTheme }),
        }),
        {
            name: 'junaikey-theme-storage',
        }
    )
);