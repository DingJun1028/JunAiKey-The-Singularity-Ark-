<<<<<<< HEAD

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateComponent } from '../services/geminiService';
import PageHeader from '../components/PageHeader';
=======
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateComponent } from '../services/geminiService';
import Header from '../components/Header';
>>>>>>> feature-branch
import EvolveIcon from '../components/icons/EvolveIcon';
import Loader from '../components/Loader';
import CodeEditor from '../components/CodeEditor';
import { useSummonerStore } from '../store/summonerStore';
<<<<<<< HEAD
import type { GenerationResult } from '../types';
import { formatMarkdown } from '../utils/markdown';
import Card from '../components/Card';
import TrashIcon from '../components/icons/TrashIcon';
import BilingualLabel from '../components/BilingualLabel';
import ClipboardCopyIcon from '../components/icons/ClipboardCopyIcon';
import CheckIcon from '../components/icons/CheckIcon';

const DRAFT_KEY = 'junaikey-genesis-draft';
const RESULT_KEY = 'junaikey-genesis-result';

type ActiveTab = 'explanation' | 'cot';

const AgentEvolutionPage: React.FC = () => {
  const [goal, setGoal] = useState('');
  
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(() => {
    try {
      const savedResult = localStorage.getItem(RESULT_KEY);
      return savedResult ? JSON.parse(savedResult) : null;
    } catch (error) {
      console.error("Failed to load genesis result from localStorage", error);
      localStorage.removeItem(RESULT_KEY);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('explanation');
=======
import CodeExecutionModal from '../components/CodeExecutionModal';
import type { GenerationResult } from '../types';
import { formatMarkdown } from '../utils/markdown';
import Card from '../components/Card';

const DRAFT_KEY = 'junaikey-genesis-draft';

const AgentEvolutionPage: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
>>>>>>> feature-branch
  const { actions: summonerActions } = useSummonerStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle incoming state from Wisdom Crystal
  useEffect(() => {
    const state = location.state as { goal?: string };
    if (state?.goal) {
      setGoal(state.goal);
<<<<<<< HEAD
=======
      // Clear state after handling
>>>>>>> feature-branch
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
     try {
<<<<<<< HEAD
      if (!location.state?.goal) {
        const savedGoal = localStorage.getItem(DRAFT_KEY);
        if (savedGoal) setGoal(savedGoal);
=======
      // Only load draft if there's no incoming text from state
      if (!location.state?.goal) {
        const savedGoal = localStorage.getItem(DRAFT_KEY);
        if (savedGoal) {
          setGoal(savedGoal);
        }
>>>>>>> feature-branch
      }
    } catch (error) {
        console.error("Failed to load genesis draft from localStorage", error);
        localStorage.removeItem(DRAFT_KEY);
    }
  }, [location.state]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
<<<<<<< HEAD
      localStorage.setItem(DRAFT_KEY, goal);
    }, 500);
    return () => clearTimeout(handler);
  }, [goal]);

  useEffect(() => {
    try {
        if (generationResult) {
            localStorage.setItem(RESULT_KEY, JSON.stringify(generationResult));
        } else {
            localStorage.removeItem(RESULT_KEY);
        }
    } catch (error) {
      console.error("Failed to save genesis result to localStorage", error);
    }
  }, [generationResult]);
=======
      if (goal) {
        localStorage.setItem(DRAFT_KEY, goal);
      } else {
        localStorage.removeItem(DRAFT_KEY);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [goal]);

>>>>>>> feature-branch

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setIsLoading(true);
    setError(null);
    setGenerationResult(null);
<<<<<<< HEAD
    try {
      const result = await generateComponent(goal);
      setGenerationResult(result);
      setActiveTab('explanation'); // Reset to explanation tab on new generation
      summonerActions.addExp('aurex', 100);
      summonerActions.addExp('nyxos', 75);
      summonerActions.addExp('sylfa', 50);
=======
    setShowPreview(false);
    try {
      const result = await generateComponent(goal);
      setGenerationResult(result);
      setIsModalOpen(true);
      
      // Grant EXP
      summonerActions.addExp('aurex', 100); // Order
      summonerActions.addExp('nyxos', 75); // Chaos
      summonerActions.addExp('sylfa', 50); // Growth

      localStorage.removeItem(DRAFT_KEY);
>>>>>>> feature-branch
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const handleClear = () => {
      setGoal('');
      setGenerationResult(null);
      setError(null);
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(RESULT_KEY);
  };

  const handleCopyCode = () => {
    if (!generationResult?.code) return;
    navigator.clipboard.writeText(generationResult.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const formattedCotAnalysis = useMemo(() => {
    return generationResult ? formatMarkdown(generationResult.cot_analysis) : '';
  }, [generationResult]);

  const formattedExplanation = useMemo(() => {
    return generationResult ? formatMarkdown(generationResult.explanation) : '';
  }, [generationResult]);

  return (
    <div className="animate-fade-in">
      <PageHeader 
=======
  const handleExecuteBlueprint = () => {
      setIsModalOpen(false);
      setShowPreview(true);
  }
  
  const formattedCotAnalysis = React.useMemo(() => {
    return generationResult ? formatMarkdown(generationResult.cot_analysis) : '';
  }, [generationResult]);


  return (
    <div className="animate-fade-in">
      <Header 
>>>>>>> feature-branch
        title="神諭創生室 (Oracle's Genesis Chamber)"
        subtitle="將您的創生目標賦予神諭，觀測其將可能性坍縮為現實。"
        icon={<EvolveIcon className="w-8 h-8"/>}
      />

<<<<<<< HEAD
      <div className="space-y-6">
        <Card className="p-6">
            <div className="flex justify-between items-center mb-3 border-b border-matrix-dark/50 pb-2">
                <h3 className="text-lg font-semibold text-matrix-cyan"><BilingualLabel label="1. 創生目標 (Genesis Goal)" /></h3>
                 <button
                    onClick={handleClear}
                    className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 disabled:opacity-50"
                    disabled={!goal && !generationResult}
                    title="清除目標與結果 (Clear goal and results)"
                >
                    <TrashIcon className="w-4 h-4" />
                    <BilingualLabel label="清除 (Clear)" />
                </button>
            </div>
=======
      {generationResult && (
        <CodeExecutionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onExecute={handleExecuteBlueprint}
            explanation={generationResult.explanation}
            usage={generationResult.usage}
            cot_analysis={generationResult.cot_analysis}
        />
      )}

      <div className="space-y-6">
        <Card className="p-6">
            <h3 className="text-lg font-semibold text-matrix-cyan mb-3 border-b border-matrix-dark/50 pb-2">1. 創生目標 (Genesis Goal)</h3>
>>>>>>> feature-branch
            <textarea
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan h-24 resize-y"
              placeholder="例如：'創建一個顯示當前時間的數位時鐘組件，帶有閃爍的冒號'"
            />
            <div className="text-center mt-4">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !goal.trim()}
                    className="w-full md:w-auto bg-matrix-green text-matrix-bg font-bold py-2 px-8 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow disabled:bg-matrix-dark disabled:cursor-not-allowed disabled:shadow-none"
                >
<<<<<<< HEAD
                    {isLoading ? '生成中...' : generationResult ? '重新生成 (Regenerate)' : '請求創生 (Request Genesis)'}
=======
                    {isLoading ? '生成中...' : '請求創生'}
>>>>>>> feature-branch
                </button>
            </div>
        </Card>
        
        {isLoading && (
            <div className="flex justify-center py-8">
                <Loader text="GENERATING..." />
            </div>
        )}
        {error && <p className="text-red-500 text-center p-4 bg-red-500/10 rounded-md">{error}</p>}
        
        {generationResult && (
<<<<<<< HEAD
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                {/* Left Column: Code */}
                <div className="lg:col-span-1">
                     <Card className="p-0 flex flex-col h-full">
                        <div className="flex justify-between items-center p-4 border-b border-matrix-dark/50">
                            <h3 className="text-lg font-semibold text-matrix-cyan"><BilingualLabel label="2. 創生藍圖 (Genesis Blueprint)" /></h3>
                            <button onClick={handleCopyCode} title="複製程式碼" className="flex items-center gap-2 text-sm px-3 py-1 bg-matrix-bg rounded-md border border-matrix-dark/50 text-matrix-light hover:bg-matrix-dark/50 hover:text-white transition-colors">
                                {isCopied ? <CheckIcon className="w-4 h-4 text-matrix-green" /> : <ClipboardCopyIcon className="w-4 h-4" />}
                                {isCopied ? '已複製!' : '複製'}
                            </button>
                        </div>
                        <div className="w-full h-[32rem] flex-grow">
                            <CodeEditor value={generationResult.code} readOnly />
                        </div>
                    </Card>
                </div>

                {/* Right Column: Preview & Analysis */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                     <Card className="p-0 flex flex-col flex-1 min-h-[16rem]">
                         <h3 className="text-lg font-semibold text-matrix-cyan p-4 border-b border-matrix-dark/50"><BilingualLabel label="3. 現實模擬器 (Reality Simulator)" /></h3>
                        <div className="w-full flex-grow bg-matrix-bg-2/50 border-t border-dashed border-matrix-dark/50 flex items-center justify-center p-4">
                           <div dangerouslySetInnerHTML={{ __html: generationResult.previewHtml }} />
                        </div>
                    </Card>

                    <Card className="p-0 flex flex-col flex-1 min-h-[16rem]">
                        <div className="p-4 border-b border-matrix-dark/50">
                             <h3 className="text-lg font-semibold text-matrix-cyan mb-2"><BilingualLabel label="4. 神諭的低語 (Oracle's Whisperings)" /></h3>
                              <div className="flex items-center space-x-1 bg-matrix-bg p-1 border border-matrix-dark/50 rounded-md">
                                 <button onClick={() => setActiveTab('explanation')} className={`px-3 py-1 text-sm rounded-md transition-colors w-1/2 ${activeTab === 'explanation' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}><BilingualLabel label="詳解" /></button>
                                 <button onClick={() => setActiveTab('cot')} className={`px-3 py-1 text-sm rounded-md transition-colors w-1/2 ${activeTab === 'cot' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}><BilingualLabel label="分析" /></button>
                            </div>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto">
                            {activeTab === 'explanation' ? (
                                 <div 
                                    className="text-matrix-light text-sm prose-styles"
                                    dangerouslySetInnerHTML={{ __html: formattedExplanation }} 
                                />
                            ) : (
                                <div 
                                    className="text-matrix-light text-sm prose-styles"
                                    dangerouslySetInnerHTML={{ __html: formattedCotAnalysis }} 
                                />
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        )}
=======
            <div className="space-y-6 animate-fade-in">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-matrix-cyan mb-3 border-b border-matrix-dark/50 pb-2">2. 思維鏈分析 (Chain-of-Thought Analysis)</h3>
                     <div 
                      className="text-matrix-light text-sm prose-styles"
                      dangerouslySetInnerHTML={{ __html: formattedCotAnalysis }} 
                    />
                </Card>
            
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-matrix-cyan mb-3 border-b border-matrix-dark/50 pb-2">3. 創生藍圖 (React Component)</h3>
                    <div className="w-full h-96">
                        <CodeEditor value={generationResult.code} readOnly />
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-matrix-cyan mb-3 border-b border-matrix-dark/50 pb-2">4. 現實模擬器 (HTML Preview)</h3>
                    <div className="w-full h-full min-h-[20rem] bg-matrix-bg-2/50 border border-dashed border-matrix-dark/50 rounded-md flex items-center justify-center p-4">
                        {showPreview ? (
                            <div dangerouslySetInnerHTML={{ __html: generationResult.previewHtml }} />
                        ) : (
                            <p className="text-matrix-dark text-center">
                                等待藍圖執行...
                            </p>
                        )}
                    </div>
                </Card>
            </div>
        )}

>>>>>>> feature-branch
      </div>
    </div>
  );
};

export default AgentEvolutionPage;
