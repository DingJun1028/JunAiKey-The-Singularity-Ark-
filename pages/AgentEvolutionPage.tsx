import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateComponent } from '../services/geminiService';
import Header from '../components/Header';
import EvolveIcon from '../components/icons/EvolveIcon';
import Loader from '../components/Loader';
import CodeEditor from '../components/CodeEditor';
import { useSummonerStore } from '../store/summonerStore';
import CodeExecutionModal from '../components/CodeExecutionModal';

const DRAFT_KEY = 'junaikey-genesis-draft';

interface GenerationResult {
    code: string;
    explanation: string;
    usage: string;
    previewHtml: string;
}

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
        />
      )}

      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="goal" className="block text-matrix-light mb-2 text-lg">創生目標</label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan h-24 resize-y"
            placeholder="例如：'創建一個顯示當前時間的數位時鐘組件，帶有閃爍的冒號'"
          />
        </div>
        <div className="text-center">
            <button
                onClick={handleGenerate}
                disabled={isLoading || !goal.trim()}
                className="w-full md:w-auto bg-matrix-green text-matrix-bg font-bold py-2 px-8 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow disabled:bg-matrix-dark disabled:cursor-not-allowed disabled:shadow-none"
            >
                {isLoading ? '生成中...' : '請求創生'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[60vh]">
        <div>
          <h3 className="text-lg font-semibold text-matrix-light mb-2">創生藍圖 (React 組件)</h3>
          <div className="w-full h-full p-4 bg-matrix-bg font-mono text-matrix-light border border-dashed border-matrix-dark/50 rounded-md">
            {isLoading && <div className="flex items-center justify-center h-full"><Loader text="GENERATING..." /></div>}
            {error && <p className="text-red-500">{error}</p>}
            {generationResult && <CodeEditor value={generationResult.code} readOnly />}
            {!isLoading && !error && !generationResult && <p className="text-matrix-dark">等待創生目標...</p>}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-matrix-light mb-2">現實模擬器 (HTML 預覽)</h3>
          <div className="w-full h-full p-4 bg-matrix-bg-2/50 border border-dashed border-matrix-dark/50 rounded-md flex items-center justify-center">
            {showPreview && generationResult ? (
                <div dangerouslySetInnerHTML={{ __html: generationResult.previewHtml }} />
            ) : (
                <p className="text-matrix-dark">等待藍圖執行...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentEvolutionPage;