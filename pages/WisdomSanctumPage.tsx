
import React, { useState, useEffect } from 'react';
import { distillWisdom } from '../services/geminiService';
import { useNoteStore } from '../store/noteStore';
import type { Wisdom } from '../types';
import Header from '../components/Header';
import SanctumIcon from '../components/icons/SanctumIcon';
import Loader from '../components/Loader';

const DRAFT_KEY = 'junaikey-wisdom-draft';

const WisdomSanctumPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distilledWisdom, setDistilledWisdom] = useState<Wisdom | null>(null);
  const { addNote } = useNoteStore();

  // Load draft from localStorage on initial render
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        setInputText(savedDraft);
      }
    } catch (error) {
        console.error("Failed to load wisdom draft from localStorage", error);
        localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  // Save draft to localStorage periodically as the user types
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputText) {
        localStorage.setItem(DRAFT_KEY, inputText);
      } else {
        localStorage.removeItem(DRAFT_KEY);
      }
    }, 2000); // Autosave 2 seconds after user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [inputText]);


  const handleDistill = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);
    setDistilledWisdom(null);
    try {
      const result = await distillWisdom(inputText);
      setDistilledWisdom(result);
      localStorage.removeItem(DRAFT_KEY); // Clear draft on success
      setInputText(''); // Clear input field on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveToNotes = () => {
    if(!distilledWisdom) return;
    const noteContent = `Summary: ${distilledWisdom.summary}\n\nKey Points:\n${distilledWisdom.keyPoints.map(p => `- ${p}`).join('\n')}\n\nAction Items:\n${distilledWisdom.actionItems.map(a => `- ${a}`).join('\n')}`;
    addNote({ title: `Wisdom: ${distilledWisdom.title}`, content: noteContent});
    alert("Wisdom saved to Omni-Notes!");
  };

  return (
    <div className="animate-fade-in">
      <Header 
        title="Wisdom Sanctum"
        subtitle="Refine raw information into structured knowledge with AI."
        icon={<SanctumIcon className="w-8 h-8"/>}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <label htmlFor="inputText" className="block text-matrix-light mb-2 text-lg">Input Text</label>
            <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                rows={15}
                placeholder="Paste your text here to distill its wisdom..."
            />
            <button
                onClick={handleDistill}
                disabled={isLoading || !inputText.trim()}
                className="mt-4 bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow disabled:bg-matrix-dark disabled:cursor-not-allowed disabled:shadow-none"
            >
                {isLoading ? 'Distilling...' : 'Distill Wisdom'}
            </button>
        </div>
        
        <div className="flex items-center justify-center bg-matrix-bg/30 p-4 rounded-lg border border-dashed border-matrix-dark/50">
            {isLoading && <Loader text="ANALYZING..." />}
            {error && <p className="text-red-500">{error}</p>}
            {distilledWisdom && (
                <div className="w-full animate-fade-in">
                    <h2 className="text-2xl font-bold text-matrix-cyan mb-2">{distilledWisdom.title}</h2>
                    <p className="text-matrix-light mb-4 italic">{distilledWisdom.summary}</p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-matrix-green">Key Points:</h3>
                            <ul className="list-disc list-inside text-matrix-light">
                                {distilledWisdom.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-matrix-green">Action Items:</h3>
                            <ul className="list-disc list-inside text-matrix-light">
                                {distilledWisdom.actionItems.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                     <button
                        onClick={handleSaveToNotes}
                        className="mt-6 bg-matrix-cyan text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow-cyan"
                    >
                        Save to Notes
                    </button>
                </div>
            )}
             {!isLoading && !error && !distilledWisdom && (
              <p className="text-matrix-dark">Awaiting input for distillation...</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default WisdomSanctumPage;
