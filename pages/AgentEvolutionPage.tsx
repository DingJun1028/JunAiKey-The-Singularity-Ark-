import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateComponent } from '../services/geminiService';
import Header from '../components/Header';
import EvolveIcon from '../components/icons/EvolveIcon';
import Loader from '../components/Loader';
import CodeEditor from '../components/CodeEditor';
import { useSummonerStore } from '../store/summonerStore';
import CodeExecutionModal from '../components/CodeExecutionModal';
import type { GenerationResult } from '../types';

const DRAFT_KEY = 'junaikey-genesis-draft';

const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-matrix-bg/30 p-4 rounded-lg border border-matrix-dark/30">
        <h3 className="text-lg font-semibold text-matrix-cyan mb-3 border-b border-matrix-dark/50 pb-2">{title}</h3>
        {children}
    </div>
);


const AgentEvolutionPage: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { actions: summonerActions } = useSummonerStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle incoming state from Wisdom Crystal
  useEffect(() => {
    const state = location.state as { goal?: string };
    if (state?.goal) {
      setGoal(state.goal);
      // Clear state after handling
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
     try {
      // Only load draft if there's no incoming text from state
      if (!location.state?.goal) {
        const savedGoal = localStorage.getItem(DRAFT_KEY);
        if (savedGoal) {
          setGoal(savedGoal);
        }
      }
    } catch (error) {
        console.error("Failed to load genesis draft from localStorage", error);
        localStorage.removeItem(DRAFT_KEY);
    }
  }, [location.state]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (goal) {
        localStorage.setItem(DRAFT_KEY, goal);
      } else {
        localStorage.removeItem(DRAFT_KEY);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [goal]);


  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setIsLoading(true);
    setError(null);
    setGenerationResult(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteBlueprint = () => {
      setIsModalOpen(false);
      setShowPreview(true);
  }

  return (
    <div className="animate-fade-in">
      <Header 
        title="神諭創生室 (Oracle's Genesis Chamber)"
        subtitle="將您的創生目標賦予神諭，觀測其將可能性坍縮為現實。"
        icon={<EvolveIcon className="w-8 h-8"/>}
      />

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
        <Section title="1. 創生目標 (Genesis Goal)">
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
                    {isLoading ? '生成中...' : '請求創生'}
                </button>
            </div>
        </Section>
        
        {isLoading && (
            <div className="flex justify-center py-8">
                <Loader text="GENERATING..." />
            </div>
        )}
        {error && <p className="text-red-500 text-center p-4 bg-red-500/10 rounded-md">{error}</p>}
        
        {generationResult && (
            <div className="space-y-6 animate-fade-in">
                <Section title="2. 思維鏈分析 (Chain-of-Thought Analysis)">
                    <p className="text-matrix-light text-sm italic whitespace-pre-wrap">{generationResult.cot_analysis}</p>
                </Section>
            
                <Section title="3. 創生藍圖 (React Component)">
                    <div className="w-full h-96">
                        <CodeEditor value={generationResult.code} readOnly />
                    </div>
                </Section>

                <Section title="4. 現實模擬器 (HTML Preview)">
                    <div className="w-full h-full min-h-[20rem] bg-matrix-bg-2/50 border border-dashed border-matrix-dark/50 rounded-md flex items-center justify-center p-4">
                        {showPreview ? (
                            <div dangerouslySetInnerHTML={{ __html: generationResult.previewHtml }} />
                        ) : (
                            <p className="text-matrix-dark text-center">
                                等待藍圖執行...
                            </p>
                        )}
                    </div>
                </Section>
            </div>
        )}

      </div>
    </div>
  );
};

export default AgentEvolutionPage;