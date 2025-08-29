import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import CodexIcon from '../components/icons/CodexIcon';
import { useProposalStore } from '../store/proposalStore';
import { useSummonerStore } from '../store/summonerStore';
import type { Proposal, SimulationResult } from '../types';
import OmniProposalCard from '../components/OmniProposalCard';
import SimulationModal from '../components/SimulationModal';
import { simulateProposal } from '../services/geminiService';
import Card from '../components/Card';

type SortBy = 'latest' | 'resonance';

const CodexPage: React.FC = () => {
    const { proposals, addProposal, addResonance } = useProposalStore();
    const { actions: summonerActions } = useSummonerStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [sortBy, setSortBy] = useState<SortBy>('latest');
    const [resonatedIds, setResonatedIds] = useState<Set<string>>(new Set());

    // State for simulation modal
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationError, setSimulationError] = useState<string | null>(null);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);


    const sortedProposals = useMemo(() => {
        return [...proposals].sort((a, b) => {
            if (sortBy === 'resonance') {
                return b.resonance - a.resonance;
            }
            // 'latest' is the default
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [proposals, sortBy]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        addProposal({ title, description });
        summonerActions.addExp('aurex', 50); // Order
        summonerActions.addExp('sylfa', 25); // Growth
        setTitle('');
        setDescription('');
        setShowForm(false);
    };
    
    const handleResonate = (id: string) => {
        if (resonatedIds.has(id)) return;
        addResonance(id);
        setResonatedIds(prev => new Set(prev).add(id));
        summonerActions.addExp('luxis', 10); // Guidance
    };

    const handleSimulate = async (proposal: Proposal) => {
        setSelectedProposal(proposal);
        setIsSimulating(true);
        setSimulationError(null);
        setSimulationResult(null);

        try {
            const result = await simulateProposal(proposal.title, proposal.description);
            setSimulationResult(result);
            summonerActions.addExp('aquare', 40); // Thought
            summonerActions.addExp('nyxos', 20); // Chaos/Innovation
        } catch (error) {
            setSimulationError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setIsSimulating(false);
        }
    };

    const closeSimulationModal = () => {
        setSelectedProposal(null);
        setSimulationResult(null);
        setSimulationError(null);
    };


    return (
        <div className="animate-fade-in">
            <Header 
                title="自主通典室"
                subtitle="提案並共鳴系統的進化，您的意志將塑造矩陣的未來。"
                icon={<CodexIcon className="w-8 h-8"/>}
            />

            <Card className="mb-6 p-4">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="w-full bg-matrix-green text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow"
                >
                    {showForm ? '取消提案' : '提出新的進化提案'}
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4 animate-fade-in">
                        <div>
                            <label htmlFor="proposal-title" className="block text-matrix-light mb-2">提案標題</label>
                            <input
                                id="proposal-title"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="proposal-description" className="block text-matrix-light mb-2">詳細說明 (支援 Markdown)</label>
                            <textarea
                                id="proposal-description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="w-full h-32 p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan resize-y"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-matrix-cyan text-matrix-bg font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow-cyan">
                            提交提案
                        </button>
                    </form>
                )}
            </Card>
            
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-matrix-light">進化提案列表</h2>
                <div className="flex items-center space-x-2 bg-matrix-bg p-1 border border-matrix-dark/50 rounded-md">
                     <button onClick={() => setSortBy('latest')} className={`px-3 py-1 text-sm rounded-md transition-colors ${sortBy === 'latest' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}>最新</button>
                     <button onClick={() => setSortBy('resonance')} className={`px-3 py-1 text-sm rounded-md transition-colors ${sortBy === 'resonance' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}>最高共鳴</button>
                </div>
            </div>

            <div className="space-y-4">
                {sortedProposals.map(p => (
                    <OmniProposalCard 
                        key={p.id} 
                        proposal={p} 
                        onResonate={handleResonate}
                        onSimulate={handleSimulate}
                        hasResonated={resonatedIds.has(p.id)} 
                    />
                ))}
            </div>

             <SimulationModal
                isOpen={!!selectedProposal}
                onClose={closeSimulationModal}
                proposal={selectedProposal}
                isLoading={isSimulating}
                result={simulationResult}
                error={simulationError}
            />
        </div>
    );
};

export default CodexPage;
