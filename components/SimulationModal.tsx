import React from 'react';
import type { Proposal, SimulationResult } from '../types';
import { formatMarkdown } from '../utils/markdown';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal | null;
  isLoading: boolean;
  result: SimulationResult | null;
  error: string | null;
}

const SimulationLoader: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-2 border-matrix-cyan/30 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-matrix-cyan/50 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-2 border-matrix-cyan/70 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        </div>
        <p className="text-matrix-cyan font-mono tracking-widest animate-pulse">ORACLE IS SIMULATING...</p>
    </div>
);


const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose, proposal, isLoading, result, error }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="simulation-modal-title"
    >
      <div 
        className="bg-matrix-bg-2 border border-purple-400 rounded-lg shadow-lg w-full max-w-2xl p-6 m-4 animate-fade-in shadow-purple-400/50 flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div>
                <h2 id="simulation-modal-title" className="text-2xl text-purple-400 font-bold">神諭模擬室</h2>
                <p className="text-sm text-matrix-dark">{proposal?.title}</p>
            </div>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-3xl font-bold">&times;</button>
        </div>
        
        <div className="flex-grow min-h-0 overflow-y-auto pr-2" style={{maxHeight: '70vh'}}>
            {isLoading && <SimulationLoader />}
            {error && <p className="text-red-500 text-center p-4">{error}</p>}
            {result && !isLoading && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <h3 className="text-lg font-semibold text-matrix-green mb-2">概念實現 (Concept)</h3>
                        <div className="text-matrix-light bg-matrix-bg/50 p-3 rounded-md prose-styles" dangerouslySetInnerHTML={{__html: formatMarkdown(result.concept)}} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-matrix-green mb-2">潛在增益 (Benefits)</h3>
                        <ul className="list-disc list-inside text-matrix-light bg-matrix-bg/50 p-3 rounded-md space-y-1">
                            {result.benefits.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-matrix-green mb-2">潛在挑戰 (Challenges)</h3>
                        <ul className="list-disc list-inside text-matrix-light bg-matrix-bg/50 p-3 rounded-md space-y-1">
                            {result.challenges.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-matrix-green mb-2">神諭結論 (Conclusion)</h3>
                        <div className="text-matrix-light bg-matrix-bg/50 p-3 rounded-md italic prose-styles" dangerouslySetInnerHTML={{__html: formatMarkdown(result.conclusion)}} />
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SimulationModal;
