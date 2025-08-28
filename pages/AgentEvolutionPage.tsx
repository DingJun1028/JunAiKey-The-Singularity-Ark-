import React, { useState, useEffect } from 'react';
import { evolveCode } from '../services/geminiService';
import { MOCK_FILES } from '../constants';
import type { MockFile } from '../types';
import Header from '../components/Header';
import EvolveIcon from '../components/icons/EvolveIcon';
import Loader from '../components/Loader';
import CodeEditor from '../components/CodeEditor';

const DRAFT_KEY = 'junaikey-evolution-draft';

const AgentEvolutionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<MockFile>(MOCK_FILES[0]);
  const [originalCode, setOriginalCode] = useState(selectedFile.content);
  const [evolvedCode, setEvolvedCode] = useState<string | null>(null);
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load draft from localStorage on initial render
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.filePath) {
            const savedFile = MOCK_FILES.find(f => f.path === draft.filePath);
            if (savedFile) {
                setSelectedFile(savedFile);
            }
        }
        if (draft.goal) {
          setGoal(draft.goal);
        }
      }
    } catch (error) {
        console.error("Failed to parse evolution draft from localStorage", error);
        localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  // Save draft to localStorage whenever selected file or goal changes
  useEffect(() => {
    const draft = { filePath: selectedFile.path, goal };
    if (selectedFile.path !== MOCK_FILES[0].path || goal.trim()) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } else {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [selectedFile, goal]);

  useEffect(() => {
    setOriginalCode(selectedFile.content);
    setEvolvedCode(null);
  }, [selectedFile]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const file = MOCK_FILES.find(f => f.path === e.target.value);
    if(file) setSelectedFile(file);
  }

  const handleEvolve = async () => {
    if (!goal.trim()) return;
    setIsLoading(true);
    setError(null);
    setEvolvedCode(null);
    try {
      const result = await evolveCode(originalCode, goal);
      setEvolvedCode(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <Header 
        title="Agent Evolution System"
        subtitle="Grant AI the authority to modify its own core logic."
        icon={<EvolveIcon className="w-8 h-8"/>}
      />

      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <div className="flex-1">
          <label htmlFor="fileSelect" className="block text-matrix-light mb-1">Select File to Evolve</label>
          <select 
            id="fileSelect"
            value={selectedFile.path}
            onChange={handleFileChange}
            className="w-full p-2 bg-matrix-bg font-mono border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
          >
            {MOCK_FILES.map(f => <option key={f.path} value={f.path}>{f.path}</option>)}
          </select>
        </div>
        <div className="flex-[2]">
          <label htmlFor="goal" className="block text-matrix-light mb-1">Evolution Goal</label>
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
            placeholder="e.g., 'Add a dark mode toggle button'"
          />
        </div>
        <div className="self-end">
            <button
                onClick={handleEvolve}
                disabled={isLoading}
                className="w-full md:w-auto bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow disabled:bg-matrix-dark disabled:cursor-not-allowed disabled:shadow-none"
            >
                {isLoading ? 'Evolving...' : 'Evolve'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[60vh]">
        <div>
          <h3 className="text-lg font-semibold text-matrix-light mb-2">Original Code</h3>
          <CodeEditor value={originalCode} readOnly />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-matrix-light mb-2">Evolved Code</h3>
          <div className="w-full h-full p-4 bg-matrix-bg font-mono text-matrix-light border border-dashed border-matrix-dark/50 rounded-md">
            {isLoading && <div className="flex items-center justify-center h-full"><Loader text="GENERATING..." /></div>}
            {error && <p className="text-red-500">{error}</p>}
            {evolvedCode && <CodeEditor value={evolvedCode} onChange={(e) => setEvolvedCode(e.target.value)} />}
            {!isLoading && !error && !evolvedCode && <p className="text-matrix-dark">Awaiting evolution...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentEvolutionPage;