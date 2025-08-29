import React from 'react';
import { formatMarkdown } from '../utils/markdown';
import type { Proposal } from '../types';
import SimulateIcon from './icons/SimulateIcon';
import ResonateIcon from './icons/ResonateIcon';

interface ProposalCardProps {
  proposal: Proposal;
  onResonate: (id: string) => void;
  onSimulate: (proposal: Proposal) => void;
  hasResonated: boolean;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onResonate, onSimulate, hasResonated }) => {
    return (
        <div className="bg-matrix-bg/50 border border-matrix-dark/30 rounded-lg p-4 flex flex-col md:flex-row md:items-start gap-4 animate-fade-in-fast">
            <div className="flex-shrink-0 text-center w-full md:w-20">
                <div className={`text-3xl font-bold ${proposal.resonance > 10 ? 'text-matrix-green' : 'text-matrix-light'}`}>{proposal.resonance}</div>
                <div className="text-xs text-matrix-dark">共鳴值</div>
            </div>
            <div className="flex-grow border-t md:border-t-0 md:border-l border-matrix-dark/30 pt-4 md:pt-0 md:pl-4">
                <h3 className="text-lg font-semibold text-matrix-cyan mb-2">{proposal.title}</h3>
                <div className="text-sm text-matrix-light prose-styles" dangerouslySetInnerHTML={{ __html: formatMarkdown(proposal.description) }} />
                <div className="mt-4 pt-2 border-t border-matrix-dark/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                     <p className="text-xs text-matrix-dark">{new Date(proposal.createdAt).toLocaleString()}</p>
                     <div className="flex items-center gap-2">
                        <button
                            onClick={() => onSimulate(proposal)}
                            title="讓神諭模擬此提案"
                            className="flex items-center space-x-2 bg-purple-500/80 text-white font-bold py-1 px-3 rounded-md transition-all shadow-md shadow-purple-500/30 hover:bg-purple-500 hover:shadow-purple-500/50"
                        >
                            <SimulateIcon className="w-4 h-4" />
                            <span>模擬</span>
                        </button>
                        <button
                            onClick={() => onResonate(proposal.id)}
                            disabled={hasResonated}
                            className="flex items-center space-x-2 bg-matrix-cyan/80 text-matrix-bg font-bold py-1 px-3 rounded-md transition-all shadow-matrix-glow-cyan hover:bg-matrix-cyan disabled:bg-matrix-dark disabled:text-matrix-dark/50 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            <ResonateIcon className="w-4 h-4" />
                            <span>{hasResonated ? '已共鳴' : '共鳴'}</span>
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalCard;
