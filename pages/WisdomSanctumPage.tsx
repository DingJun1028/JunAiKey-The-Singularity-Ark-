import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import SanctumIcon from '../components/icons/SanctumIcon';
import { analyzeDeckOrText, createDeck } from '../services/geminiService';
import Card from '../components/Card';

// --- Helper Components ---
const Section: React.FC<{ id: string, children: React.ReactNode, className?: string }> = ({ id, children, className }) => (
    <section id={id} className={`py-12 md:py-20 scroll-mt-20 ${className || ''}`}>{children}</section>
);
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-4xl font-bold text-center border-b-2 border-matrix-dark/20 pb-4 mb-8 text-matrix-light">{children}</h2>
);
const Loader: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex justify-center items-center space-x-3">
        <div className="w-6 h-6 border-2 border-t-matrix-cyan border-r-matrix-cyan border-b-matrix-cyan/20 border-l-matrix-cyan/20 rounded-full animate-spin"></div>
        <span className="text-matrix-cyan/80">{text}</span>
    </div>
);
// --- End Helper Components ---

// --- Data for the page ---
const sampleDeck = `主要牌組：
4x 盛歡幻靈
4x 基爾山脈的奔牛
4x 魯莽的衝鋒
4x 閃電擊
4x 寺院迅矛僧
4x 玩火
2x 倫恩與第七樹
2x 灼熱鮮血
2x 碎顱猛擊

地牌：
18x 山脈`;

const allComponents = [
    '聖典 (數據庫)', '永久記憶', '符文嵌入 (API)', 
    '智慧沉澱 (分析)', '權能鍛造 (腳本)', '認知代理人'
];

const scenarios = {
    'lookup': {
        description: '使用者輸入卡牌名稱，系統需從「聖典」中讀取卡牌基本資料，並透過「符文」調用外部價格API，回傳即時市價。',
        components: ['聖典 (數據庫)', '符文嵌入 (API)']
    },
    'analyze': {
        description: '系統掃描使用者儲存在「聖典」中的牌組列表。接著，「智慧沉澱」引擎會分析卡牌間的協同作用、法力曲線，並與「永久記憶」中的優化策略比對，最後提出具體建議。',
        components: ['聖典 (數據庫)', '智慧沉澱 (分析)', '永久記憶']
    },
    'automate': {
        description: '系統觀察到使用者重複進行「搜尋龍族卡牌 -> 依攻擊力排序」的操作。於是，「權能鍛造」功能會自動將此流程打包成一個可一鍵執行的腳本，簡化未來操作。',
        components: ['權能鍛造 (腳本)', '聖典 (數據庫)']
    },
    'create': {
        description: '使用者下達一個複雜的自然語言指令。「認知代理人」會解析此目標，制定計畫：1. 查詢「聖典」中的龍族卡牌 2. 調用「符文」查詢價格以符合預算 3. 利用「智慧沉澱」的知識圖譜找出最佳協同卡牌 4. 最終生成一份完整的牌組列表。',
        components: ['認知代理人', '聖典 (數據庫)', '符文嵌入 (API)', '智慧沉澱 (分析)']
    }
};

const cycleData = [
    { id: 0, name: '1. 觀察', description: '觸發點：使用者操作、系統事件、外部數據流入。\n輸出：收集原始數據，作為後續處理的基礎。', angle: -90 },
    { id: 1, name: '2. 沉澱', description: '觸發點：已收集的原始數據。\n輸出：將數據結構化並存入知識庫、日誌等永久記憶體中。', angle: -30 },
    { id: 2, name: '3. 學習', description: '觸發點：已沉澱的結構化數據。\n輸出：透過演化引擎識別模式，生成洞見。', angle: 30 },
    { id: 3, name: '4. 決策', description: '觸發點：已生成的洞見、使用者指令或系統目標。\n輸出：透過決策代理確定意圖，規劃行動方案。', angle: 90 },
    { id: 4, name: '5. 行動', description: '觸發點：已規劃的行動方案。\n輸出：透過導航引擎、權能與符文執行具體操作。', angle: 150 },
    { id: 5, name: '6. 觸發', description: '觸發點：事件、時間排程或內部狀態變化。\n輸出：根據預設條件自動啟動新的觀察-行動循環。', angle: 210 },
];

const roadmapData = [
  { name: '第一階段：基礎現代化與數據主權', '實施時間 (月)': 12 },
  { name: '第二階段：智慧與個人化', '實施時間 (月)': 12 },
  { name: '第三階段：生態系擴展', '實施時間 (月)': 12 },
];
// --- End Data ---

const WisdomSanctumPage: React.FC = () => {
    const [activeCycleId, setActiveCycleId] = useState(0);
    const [activeScenario, setActiveScenario] = useState('lookup');
    
    // Gemini Interaction State
    const [apiKeyExists, setApiKeyExists] = useState(false);
    const [userDeckInput, setUserDeckInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [geminiResult, setGeminiResult] = useState('');

    useEffect(() => {
        const key = localStorage.getItem('junaikey-gemini-api-key');
        setApiKeyExists(!!key);
        updateScenario(activeScenario); // Update initial text based on key status
    }, []);

    const updateScenario = (scenarioId: string) => {
        setActiveScenario(scenarioId);
        setGeminiResult('');
        setUserDeckInput('');
        if (scenarioId === 'analyze') {
            setGeminiResult(apiKeyExists ? 'AI 顧問已準備就緒。您可以分析上方的示範牌組，或是在下方輸入您自己的牌組列表進行分析。' : 'AI 顧問離線。請在「設定」中提供您的 Gemini API 金鑰以啟動此功能。');
        } else if (scenarioId === 'create') {
            setGeminiResult(apiKeyExists ? '準備好見證 AI 的創造力了嗎？點擊按鈕，打造一副獨一無二的牌組！' : 'AI 顧問離線。請在「設定」中提供您的 Gemini API 金鑰以啟動此功能。');
        }
    };

    const handleAnalyzeDeck = async () => {
        if (!apiKeyExists) return;
        setIsLoading(true);
        setGeminiResult('');
        const deckToAnalyze = userDeckInput.trim() ? userDeckInput : sampleDeck;
        const result = await analyzeDeckOrText(deckToAnalyze);
        setGeminiResult(result);
        setIsLoading(false);
    };

    const handleCreateDeck = async () => {
        if (!apiKeyExists) return;
        setIsLoading(true);
        setGeminiResult('');
        const result = await createDeck();
        setGeminiResult(result);
        setIsLoading(false);
    };
    
    return (
        <div className="animate-fade-in text-matrix-light">
            <Header
                title="自主通典 (Autonomous Codex)"
                subtitle="互動式架構藍圖 - 終極創元版"
                icon={<SanctumIcon className="w-8 h-8" />}
            />

            <Section id="vision" className="min-h-[80vh] flex flex-col justify-center">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                        Jun<span className="text-matrix-cyan">.</span>Ai<span className="text-matrix-cyan">.</span>Key: The OmniKey
                    </h1>
                    <p className="text-xl md:text-2xl text-matrix-dark mb-8 max-w-3xl mx-auto">
                        萬能元鑰 - 與使用者共同進化、能智能自我組織並主動響應個人目標的個人化 AI 作業系統。
                    </p>
                </div>
                <Card className="p-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-matrix-cyan">以終為始，始終如一</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">始 (Origin) - 當前挑戰</h3>
                            <p className="text-matrix-light/80">個人的數位環境是零散、被動且充滿雜訊的，數位資產與個人意圖之間存在鴻溝。</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">終 (Terminus) - 終極願景</h3>
                            <p className="text-matrix-light/80">創建一個與使用者共同進化、能智能地自我組織並主動響應個人目標的個人化 AI 作業系統，將複雜性轉化為增強自身的能力。</p>
                        </div>
                    </div>
                </Card>
            </Section>

            <Section id="philosophy">
                <SectionTitle>核心理念</SectionTitle>
                <Card className="p-8">
                    <h3 className="text-3xl font-bold text-center mb-4">無限進化循環的六式奧義</h3>
                    <p className="text-center text-matrix-dark mb-8">點擊循環中的步驟以查看詳細說明。這是系統運作與自我演化的核心。</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                            {cycleData.map(item => {
                                const angleRad = item.angle * (Math.PI / 180);
                                const radius = 120; // md: 150
                                const x = 150 + radius * Math.cos(angleRad) - 40;
                                const y = 150 + radius * Math.sin(angleRad) - 40;
                                return (
                                    <button key={item.id} onClick={() => setActiveCycleId(item.id)} className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-center cursor-pointer transition-all duration-300 text-sm font-semibold p-1 ${activeCycleId === item.id ? 'bg-matrix-cyan text-matrix-bg scale-110' : 'bg-matrix-bg-2 text-matrix-light hover:bg-matrix-cyan/20'}`} style={{ left: x, top: y }}>
                                        {item.name}
                                    </button>
                                );
                            })}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 bg-matrix-bg rounded-full flex items-center justify-center font-bold text-center text-matrix-cyan">無限進化循環</div>
                        </div>
                        <div className="md:w-1/2 bg-matrix-bg/50 p-6 rounded-lg min-h-[150px]">
                            <h4 className="text-xl font-bold mb-2 text-matrix-cyan">{cycleData[activeCycleId].name}</h4>
                            <p className="text-matrix-light/80 whitespace-pre-wrap">{cycleData[activeCycleId].description}</p>
                        </div>
                    </div>
                </Card>
            </Section>

            <Section id="case-study">
                <SectionTitle>深度探討：萬能卡牌宇宙</SectionTitle>
                <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-2 text-center">互動探索模擬器</h3>
                    <p className="text-center text-matrix-dark mb-6">了解不同任務如何調度系統組件，並與 Gemini AI 互動！</p>
                    <div className="max-w-md mx-auto mb-8">
                        <select onChange={(e) => updateScenario(e.target.value)} value={activeScenario} className="block w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md shadow-sm focus:ring-matrix-cyan focus:border-matrix-cyan">
                            <option value="lookup">查詢特定卡牌的市價</option>
                            <option value="analyze">分析我的牌組，並建議改進</option>
                            <option value="automate">自動化常規操作：尋找特定類型卡牌並排序</option>
                            <option value="create">幫我組一副「龍」主題的牌組</option>
                        </select>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-4">任務描述</h4>
                            <p className="text-matrix-light/80 min-h-[100px]">{scenarios[activeScenario].description}</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4">啟動的 JunAiKey 組件</h4>
                            <div className="flex flex-wrap gap-3 min-h-[100px] items-center">
                                {allComponents.map(comp => (
                                    <span key={comp} className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${scenarios[activeScenario].components.includes(comp) ? 'bg-matrix-cyan/20 text-matrix-cyan border-matrix-cyan/50' : 'bg-matrix-bg-2 text-matrix-dark border-matrix-dark/50'}`}>{comp}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {(activeScenario === 'analyze' || activeScenario === 'create') && (
                        <div className="mt-8 pt-8 border-t border-matrix-dark/30">
                            <h3 className="text-2xl font-bold mb-4 text-center text-matrix-cyan">✨ AI 牌組顧問</h3>
                            {activeScenario === 'analyze' && (
                                <>
                                    <textarea readOnly value={sampleDeck} rows={6} className="block w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md text-matrix-dark cursor-not-allowed mb-4"></textarea>
                                    <textarea value={userDeckInput} onChange={e => setUserDeckInput(e.target.value)} rows={6} className="block w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:ring-matrix-cyan focus:border-matrix-cyan" placeholder="或在此貼上您的牌組列表..."></textarea>
                                    <button onClick={handleAnalyzeDeck} disabled={isLoading || !apiKeyExists} className="mt-4 w-full bg-matrix-cyan text-matrix-bg font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-matrix-dark disabled:cursor-not-allowed">分析牌組</button>
                                </>
                            )}
                            {activeScenario === 'create' && (
                                <div className="text-center">
                                    <button onClick={handleCreateDeck} disabled={isLoading || !apiKeyExists} className="bg-matrix-cyan text-matrix-bg font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-matrix-dark disabled:cursor-not-allowed">產生「龍」主題牌組</button>
                                </div>
                            )}
                            <div className="mt-6 min-h-[5rem]">
                                {isLoading ? <Loader text="AI 顧問思考中..." /> : (
                                    <div className="bg-matrix-bg/50 p-4 rounded-lg border border-matrix-dark/50 whitespace-pre-wrap">{geminiResult}</div>
                                )}
                            </div>
                        </div>
                    )}
                </Card>
            </Section>

            <Section id="roadmap">
                <SectionTitle>實施藍圖</SectionTitle>
                <Card className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={roadmapData} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
                            <XAxis type="number" stroke="#5a6877" />
                            <YAxis type="category" dataKey="name" stroke="#a3b3c3" width={250} tick={{ fontSize: 12 }} />
                            <Tooltip cursor={{fill: 'rgba(0, 255, 255, 0.1)'}} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #5a6877' }} />
                            <Legend />
                            <Bar dataKey="實施時間 (月)" fill="#00FFFF" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Section>
        </div>
    );
};

export default WisdomSanctumPage;