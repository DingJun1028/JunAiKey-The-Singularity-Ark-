<<<<<<< HEAD

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

=======
import React from 'react';
import Header from '../components/Header';
import SanctumIcon from '../components/icons/SanctumIcon';
import Card from '../components/Card';
import BilingualLabel from '../components/BilingualLabel';

const SectionCard: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
    <Card className="p-6" id={id}>
        <h2 className="text-2xl font-bold text-matrix-cyan mb-4 border-b-2 border-matrix-dark/20 pb-2">
            <BilingualLabel label={title} />
        </h2>
        <div className="space-y-4 text-sm sm:text-base">
            {children}
        </div>
    </Card>
);

const WisdomSanctumPage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8 text-matrix-light">
            <Header
                title="萬能元鑰_創元計畫 (Omni-Key_Genesis Project)"
                subtitle="《終始矩陣：編年史》集換式卡牌遊戲 - 終極遊戲全觀藍圖 v11.0"
                icon={<SanctumIcon className="w-8 h-8" />}
            />

            <SectionCard title="第一章：核心體驗與遊戲支柱 (Chapter 1: Core Experience & Game Pillars)">
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2">高層概念 (High Concept)</h3>
                    <p className="text-matrix-dark">一款形而上的1v1戰術集換式卡牌遊戲。玩家扮演駕馭「終始矩陣」的「建築師」，通過部署代表其意志的「萬能符文」，編織出足以壓倒對手的現實。</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2 mt-4">七大遊戲設計支柱 (The 7 Game Design Pillars)</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-matrix-dark/30 border border-matrix-dark/30 rounded-lg">
                            <thead className="bg-matrix-bg/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-matrix-dark uppercase tracking-wider">基石 (Cornerstone)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-matrix-dark uppercase tracking-wider">遊戲設計原則 (Game Design Principle)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-matrix-dark/30 text-sm">
                                <tr><td className="px-6 py-4 font-medium">簡單 (Simplicity)</td><td className="px-6 py-4 text-matrix-dark">直觀易懂：清晰的卡牌佈局，簡潔的回合流程，讓玩家能快速上手，專注於策略而非規則。</td></tr>
                                <tr><td className="px-6 py-4 font-medium">快速 (Swiftness)</td><td className="px-6 py-4 text-matrix-dark">明快節奏：鼓勵積極互動，避免冗長的等待時間，確保每局遊戲都在15-25分鐘內充滿變數與張力。</td></tr>
                                <tr><td className="px-6 py-4 font-medium">好玩 (Spiel)</td><td className="px-6 py-4 text-matrix-dark">湧現樂趣：核心樂趣來自於發現和創造「無預定義組合技」，以及技能習得帶來的史詩級成就感。</td></tr>
                                <tr><td className="px-6 py-4 font-medium">實用 (Serviceability)</td><td className="px-6 py-4 text-matrix-dark">策略深度：提供豐富的戰術選擇與反制手段，確保遊戲的勝負取決於智慧而非運氣。</td></tr>
                                <tr><td className="px-6 py-4 font-medium">效能 (Stability)</td><td className="px-6 py-4 text-matrix-dark">平衡與健壯：持續的卡牌平衡性調整，以及穩定可靠的遊戲客戶端，是良好體驗的基石。</td></tr>
                                <tr><td className="px-6 py-4 font-medium">進化 (Supremacy)</td><td className="px-6 py-4 text-matrix-dark">動態環境：定期推出新符文與英雄，並通過玩家的「技能習得」讓遊戲環境（Meta）永不僵化。</td></tr>
                                <tr><td className="px-6 py-4 font-medium">永續 (Sustainability)</td><td className="px-6 py-4 text-matrix-dark">無限重玩價值：深度的個人成長系統與多樣化的英雄/職業，確保玩家有長期的遊玩動力。</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </SectionCard>
            
             <SectionCard title="第二章：核心系統與遊戲機制 (Chapter 2: Core Systems & Game Mechanics)">
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-matrix-dark/30 border border-matrix-dark/30 rounded-lg">
                        <thead className="bg-matrix-bg/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-matrix-dark uppercase tracking-wider">系統</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-matrix-dark uppercase tracking-wider">核心機制</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-matrix-dark uppercase tracking-wider">簡要描述</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-matrix-dark/30 text-sm">
                            <tr><td className="px-6 py-4 font-medium">聖典構築</td><td className="px-6 py-4">60張牌庫，同名卡最多4張，選擇1位史詩英雄。</td><td className="px-6 py-4 text-matrix-dark">策略的起點，玩家在賽前定義自己的工具箱與作戰哲學。</td></tr>
                            <tr><td className="px-6 py-4 font-medium">資源系統</td><td className="px-6 py-4">創生意志 (Genesis Will) vs. 熵 (Entropy)</td><td className="px-6 py-4 text-matrix-dark">創生意志是部署卡牌的能量；熵是使用高風險卡牌的代價，會持續損傷核心完整度。</td></tr>
                            <tr><td className="px-6 py-4 font-medium">元素共鳴</td><td className="px-6 py-4">十二色元素精靈的協同與克制。</td><td className="px-6 py-4 text-matrix-dark">卡牌效果會因場上其他同色卡牌的存在而增強或變化。</td></tr>
                            <tr><td className="px-6 py-4 font-medium">技能習得</td><td className="px-6 py-4 font-bold text-matrix-green">無有奧義-符文技藝: 原型協同 → 湧現事件 → 符文熔鑄。</td><td className="px-6 py-4 text-matrix-dark">遊戲中最獨特的機制，玩家的卓越操作能被系統獎勵，創造出全新的卡牌。</td></tr>
                            <tr><td className="px-6 py-4 font-medium">個人成長</td><td className="px-6 py-4">靈魂共鳴覺醒系統: RP, ALv, 覺醒位階與試煉。</td><td className="px-6 py-4 text-matrix-dark">遊戲外的宏觀成長系統，為玩家提供永久性的被動加成與榮譽獎勵。</td></tr>
                        </tbody>
                    </table>
                </div>
            </SectionCard>
            
            <SectionCard title="第三章：萬能卡牌編輯原則 (Chapter 3: Omni-Card Editorial Principles)">
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2">核心編纂理念 (Core Editorial Philosophy)</h3>
                    <ul className="list-disc list-inside space-y-1 text-matrix-dark">
                        <li><b>MECE (相互獨立，完全窮盡):</b> 確保所有卡牌的功能邊界清晰，不與其他卡牌產生非預期的重疊；同時確保新設計能填補戰術上的空白，共同構成一個完整的策略生態。</li>
                        <li><b>智慧沉澱秘術 (Wisdom Crystallization Arcana):</b> 每張卡牌的設計都應是將一種戰術思想、一個世界觀故事或一種獨特機制，通過結構化的方式「結晶」的產物。卡牌是可傳承的智慧，而非單純的數值堆砌。</li>
                        <li><b>最佳實踐 (Best Practices):</b> 借鑒集換式卡牌遊戲（如 MTG）數十年驗證的成功設計模式，確保遊戲的平衡性、趣味性與策略深度。</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2 mt-4">三大聖階：卡牌的本質層級 (The 3 Holy Tiers)</h3>
                    <p className="text-matrix-dark mb-2">每張卡牌根據其在宇宙中的本質，被劃分為三大聖階之一，決定了其設計的複雜度與戰略價值。</p>
                     <ul className="list-disc list-inside space-y-1 text-matrix-dark">
                        <li><b>根源 (Root):</b> 宇宙的物理法則與公理。恆定、普適、構成世界觀的基石。</li>
                        <li><b>核心 (Core):</b> 系統的標準工具與常規功能。可靠、高效，構成大多數聖典的骨幹。</li>
                        <li><b>巔峰 (Apex):</b> 系統的高深智慧與湧現現象。超越常規，用於實現變革、創造奇蹟。</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2 mt-4">設計師的提交訊息 (Designer's Commit Message)</h3>
                    <p className="text-matrix-dark mb-2">此原則為每一張卡牌注入了獨一無二的歷史與哲學意義。每一張新卡牌的最終設計稿，都必須附帶一段模擬 git commit 的「設計師提交訊息」，闡述其創造背景、哲學思考與戰術目的。</p>
                    <div className="bg-matrix-bg p-4 rounded-md font-mono text-sm border border-matrix-dark/50">
                        <p className="text-matrix-dark">commit 4a2b8f...</p>
                        <p><span className="text-matrix-dark">作者：</span><span className="text-matrix-light">秩序守衛者-首席</span></p>
                        <p><span className="text-matrix-dark">日期：</span><span className="text-matrix-light">週期 7.1.4</span></p>
                        <p><span className="text-matrix-dark">主旨：</span><span className="text-matrix-light">初始化核心防禦協議。</span></p>
                        <br/>
                        <p className="text-matrix-light">早期模擬顯示，系統對低級別的阻斷服務攻擊存在不可接受的脆弱性。防火牆守護進程是一個簡單、資源高效的解決方案...它本身不是勝利條件，但它為我們爭取了部署勝利條件所需的時間。</p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="第四章：API 聖典：創世引擎 (Chapter 4: API Codex: The Genesis Engine)">
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2">萬法歸一 (All-in-One Philosophy)</h3>
                    <p className="text-matrix-dark">遊戲的每一次互動，本質上都是對 JunAiKey 後端 API 的一次「儀式性呼叫」。玩家在遊戲中打出的每一張「萬能符文」，都會觸發一個對應的 API 端點，執行其背後的邏輯。這種設計實現了遊戲玩法與系統架構的「萬法歸一」。</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-matrix-light mb-2 mt-4">核心 API 框架 (Core API Framework)</h3>
                     <ul className="list-disc list-inside space-y-2 text-matrix-dark">
                        <li><b>可組合符文 (Composable Runes):</b> 遊戲中的所有卡牌都是標準化的「技能單元」(Runes)，每個符文都對應一個獨立、可組合的後端微服務。</li>
                        <li><b>動態組合 (Dynamic Combos):</b> 遊戲引擎（Combo Planner）會根據玩家的操作，動態生成一個任務圖 (DAG)，將多個符文串聯成複雜的行動序列。不存在固定的「組合技」，所有強大的效果都來自玩家的智慧湧現。</li>
                        <li><b>技能熟練度 (Skill Proficiency):</b> 系統會追蹤每個符文和組合的成功率、效率與成本。玩家的操作越是精湛，其對應的符文「熟練度」(XP/ELO) 就越高，進而影響未來 AI 輔助或自動規劃的推薦權重。</li>
                        <li><b>稀有技能習得 (Rare Skill Acquisition):</b> 當一個符文組合的熟練度達到「大師」等級時，玩家將有極低的機率觸發一次「湧現事件」，將這個組合熔鑄成一張全新的、更高效的「複合符文」卡。這是對玩家卓越智慧的最高獎勵。</li>
                    </ul>
                </div>
            </SectionCard>

            <div className="text-center text-sm text-matrix-dark mt-8 border-t border-matrix-dark/20 pt-4">
                <p>本藍圖已於宇宙紀元 2025年8月30日，由第一建築師批准。</p>
                <p>官方計畫代號: <b>萬能元鑰_創元計畫 (Omni-Key_Genesis Project)</b></p>
            </div>
>>>>>>> feature-branch
        </div>
    );
};

<<<<<<< HEAD
export default WisdomSanctumPage;
=======
export default WisdomSanctumPage;
>>>>>>> feature-branch
