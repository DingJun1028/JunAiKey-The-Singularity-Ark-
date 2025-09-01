
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import ThemeIcon from '../components/icons/ThemeIcon';
import Card from '../components/Card';
import { useThemeStore, defaultTheme } from '../store/themeStore';
import type { Theme } from '../types';
import { useSummonerStore } from '../store/summonerStore';
import BilingualLabel from '../components/BilingualLabel';

const fontOptions = [
    { name: 'Inter', value: "'Inter', sans-serif" },
    { name: 'Roboto', value: "'Roboto', sans-serif" },
    { name: 'Lato', value: "'Lato', sans-serif" },
    { name: 'Fira Code', value: "'Fira Code', monospace" },
    { name: 'Source Code Pro', value: "'Source Code Pro', monospace" },
    { name: 'Roboto Mono', value: "'Roboto Mono', monospace" },
];

const toTitle = (str: string) => str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const ThemeCustomizationPage: React.FC = () => {
    const { theme, setTheme, resetTheme } = useThemeStore();
    const { actions: summonerActions } = useSummonerStore();
    const [draftTheme, setDraftTheme] = useState<Theme>(theme);

    useEffect(() => {
        setDraftTheme(theme);
    }, [theme]);

    const handleColorChange = (key: string, value: string) => {
        setDraftTheme(prev => ({
            ...prev,
            colors: { ...prev.colors, [key]: value }
        }));
    };

    const handleFontChange = (type: 'sans' | 'mono', value: string) => {
        setDraftTheme(prev => ({
            ...prev,
            fonts: { ...prev.fonts, [type]: value }
        }));
    };

    const applyChanges = () => {
        setTheme(draftTheme);
        summonerActions.addExp('sylfa', 20); // Growth/Customization
        summonerActions.addExp('terrax', 15); // Stability/UI
    };

    const resetChanges = () => {
        resetTheme();
        summonerActions.addExp('nyxos', 10); // Chaos/Reset
    };
    
    const hasChanges = JSON.stringify(draftTheme) !== JSON.stringify(theme);
    const canReset = JSON.stringify(theme) !== JSON.stringify(defaultTheme);

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="主題自訂 (Theme Customization)"
                subtitle="客製化您的矩陣外觀，定義您的數位維度。(Customize the look and feel of your Matrix.)"
                icon={<ThemeIcon className="w-8 h-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-matrix-cyan mb-4"><BilingualLabel label="控制面板 (Control Panel)" /></h2>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-matrix-light mb-3"><BilingualLabel label="顏色 (Colors)" /></h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(draftTheme.colors).map(([key, value]) => {
                                const isRgba = value.startsWith('rgba');
                                return (
                                    <div key={key}>
                                        <label htmlFor={`color-${key}`} className="block text-sm text-matrix-dark mb-1">{toTitle(key)}</label>
                                        <div className="flex items-center gap-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus-within:ring-2 focus-within:ring-matrix-cyan pr-2">
                                            <input
                                                type="color"
                                                aria-label={`${toTitle(key)} color picker`}
                                                value={isRgba ? '#000000' : value}
                                                onChange={(e) => handleColorChange(key, e.target.value)}
                                                disabled={isRgba}
                                                className="w-8 h-8 flex-shrink-0 p-0 bg-transparent border-none cursor-pointer appearance-none disabled:opacity-30 disabled:cursor-not-allowed"
                                                style={{backgroundColor: isRgba ? value : 'transparent'}}
                                            />
                                            <input
                                                id={`color-${key}`}
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleColorChange(key, e.target.value)}
                                                className="w-full bg-transparent text-matrix-light font-mono text-sm focus:outline-none"
                                                placeholder={isRgba ? "rgba(r,g,b,a)" : "#ffffff"}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-matrix-light mb-3"><BilingualLabel label="字體 (Fonts)" /></h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-matrix-dark mb-1"><BilingualLabel label="介面字體 (UI Font)" /></label>
                                <select value={draftTheme.fonts.sans} onChange={(e) => handleFontChange('sans', e.target.value)} className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md">
                                    {fontOptions.filter(f => f.value.includes('sans-serif')).map(font => <option key={font.value} value={font.value}>{font.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-matrix-dark mb-1"><BilingualLabel label="等寬字體 (Code Font)" /></label>
                                <select value={draftTheme.fonts.mono} onChange={(e) => handleFontChange('mono', e.target.value)} className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md">
                                    {fontOptions.filter(f => f.value.includes('monospace')).map(font => <option key={font.value} value={font.value}>{font.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 mt-8">
                        <button onClick={resetChanges} disabled={!canReset} className="px-6 py-2 rounded-md text-matrix-light bg-matrix-dark/50 hover:bg-matrix-dark/80 disabled:opacity-50 disabled:cursor-not-allowed">
                            <BilingualLabel label="重置為預設 (Reset)" />
                        </button>
                        <button onClick={applyChanges} disabled={!hasChanges} className="px-6 py-2 rounded-md text-matrix-bg bg-matrix-green hover:bg-opacity-90 shadow-matrix-glow disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-not-allowed">
                            <BilingualLabel label="套用主題 (Apply)" />
                        </button>
                    </div>
                </Card>

                {/* Preview */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-matrix-cyan"><BilingualLabel label="即時預覽 (Live Preview)" /></h2>
                    <div style={{
                        ...Object.fromEntries(Object.entries(draftTheme.colors).map(([k, v]) => [`--color-${k}`, v])),
                        ...Object.fromEntries(Object.entries(draftTheme.fonts).map(([k, v]) => [`--font-${k}`, v])),
                    } as React.CSSProperties}>
                        <Card className="p-6 bg-matrix-bg">
                            <h3 style={{ color: 'var(--color-matrix-light)', fontFamily: 'var(--font-sans)' }} className="text-lg font-bold">預覽卡片標題</h3>
                            <p style={{ color: 'var(--color-matrix-dark)', fontFamily: 'var(--font-sans)' }}>這是一段示範文字。</p>
                             <div className="mt-4 flex gap-4">
                                <button style={{ backgroundColor: 'var(--color-matrix-cyan)', color: 'var(--color-matrix-bg)', fontFamily: 'var(--font-sans)' }} className="px-4 py-2 rounded font-bold">
                                    主要按鈕
                                </button>
                                <button style={{ backgroundColor: 'var(--color-matrix-green)', color: 'var(--color-matrix-bg)', fontFamily: 'var(--font-sans)' }} className="px-4 py-2 rounded font-bold">
                                    次要按鈕
                                </button>
                            </div>
                            <pre className="mt-4 p-2 rounded" style={{ backgroundColor: 'var(--color-matrix-bg-2)'}}>
                                <code style={{fontFamily: 'var(--font-mono)', color: 'var(--color-matrix-light)'}}>
                                    {`const theme = "dynamic";`}
                                </code>
                            </pre>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeCustomizationPage;
