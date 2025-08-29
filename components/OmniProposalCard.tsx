import React from 'react';
import { formatMarkdown } from '../utils/markdown';
import type { Proposal } from '../types';
import Card, { CardBody, CardFooter } from './Card';
import CodexIcon from '../components/icons/CodexIcon';
import SimulateIcon from './icons/SimulateIcon';
import ResonateIcon from './icons/ResonateIcon';

interface OmniProposalCardProps {
  proposal: Proposal;
  onResonate: (id: string) => void;
  onSimulate: (proposal: Proposal) => void;
  hasResonated: boolean;
}

const ProposalCardHeader: React.FC<{ title: string; resonance: number; }> = ({ title, resonance }) => (
    <div className="flex items-center gap-3 p-4 border-b border-matrix-cyan/20">
        <CodexIcon className="w-6 h-6 text-matrix-cyan flex-shrink-0" />
        <div className="flex-grow overflow-hidden">
            <h3 className="text-matrix-light font-semibold truncate" title={title}>{title}</h3>
            <p className="text-xs text-matrix-dark uppercase tracking-wider">Proposal</p>
        </div>
        <div className="flex-shrink-0 text-center">
            <div className={`text-2xl font-bold ${resonance > 10 ? 'text-matrix-green' : 'text-matrix-light'}`}>{resonance}</div>
            <div className="text-xs text-matrix-dark -mt-1">共鳴值</div>
        </div>
    </div>
);


const OmniProposalCard: React.FC<OmniProposalCardProps> = ({ proposal, onResonate, onSimulate, hasResonated }) => {
    return (
        <Card className="flex flex-col">
            <ProposalCardHeader title={proposal.title} resonance={proposal.resonance} />
            <CardBody>
                 <div className="text-sm text-matrix-light prose-styles" dangerouslySetInnerHTML={{ __html: formatMarkdown(proposal.description) }} />
            </CardBody>
            <CardFooter>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
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
            </CardFooter>
        </Card>
    );
};

export default OmniProposalCard;
