
import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SanctumIcon from '../components/icons/SanctumIcon';
import Card from '../components/Card';
import { codexChapters } from '../core/codexChapters';
import type { CodexChapter } from '../core/codexChapters';

const WisdomSanctumPage: React.FC = () => {
    const [selectedChapter, setSelectedChapter] = useState<CodexChapter>(codexChapters[0]);

    const SelectedChapterComponent = selectedChapter.component;

    return (
        <div className="animate-fade-in flex flex-col h-full">
            <PageHeader
                title="智慧聖殿 (Wisdom Sanctum)"
                subtitle="宇宙核心法則與史詩的陳列室。(A gallery of the universe's core laws and epics.)"
                icon={<SanctumIcon className="w-8 h-8" />}
            />
            
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
                {/* Chapter Selection */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <Card className="p-4">
                        <h2 className="text-xl font-semibold text-matrix-cyan mb-3">聖典篇章</h2>
                        <p className="text-xs text-matrix-dark">選擇一個篇章以檢視其內容。</p>
                    </Card>
                    <Card className="p-2 flex-grow overflow-y-auto">
                        <nav className="space-y-2">
                            {codexChapters.map((chapter) => {
                                const Icon = chapter.icon;
                                const isSelected = chapter.id === selectedChapter.id;
                                return (
                                    <button
                                        key={chapter.id}
                                        onClick={() => setSelectedChapter(chapter)}
                                        className={`w-full flex items-center gap-3 text-left p-3 rounded-lg transition-all duration-200
                                            ${isSelected 
                                                ? 'bg-matrix-cyan/20 text-matrix-cyan shadow-md' 
                                                : 'text-matrix-light hover:bg-matrix-dark/50'
                                            }
                                        `}
                                    >
                                        <Icon className="w-6 h-6 flex-shrink-0" />
                                        <div className="overflow-hidden">
                                            <p className="font-semibold truncate">{chapter.title}</p>
                                            <p className="text-xs text-matrix-dark truncate">{chapter.subtitle}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>
                    </Card>
                </div>

                {/* Chapter Content */}
                <div className="lg:col-span-3 min-h-0">
                    <div className="h-full overflow-y-auto pr-2">
                         <SelectedChapterComponent />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WisdomSanctumPage;
