import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DashboardIcon from '../components/icons/DashboardIcon';
import { useNoteStore } from '../store/noteStore';
import { useProposalStore } from '../store/proposalStore';
import BilingualLabel from '../components/BilingualLabel';
import Card from '../components/Card';
import PlusIcon from '../components/icons/PlusIcon';
import ConsoleIcon from '../components/icons/ConsoleIcon';
import EvolveIcon from '../components/icons/EvolveIcon';

// Helper component for action buttons
// FIX: Changed icon prop type to `React.ReactElement<{ className?: string }>` to be more specific for `React.cloneElement`.
// This allows TypeScript to know that the cloned element accepts a className prop, resolving the error.
const ActionButton: React.FC<{ icon: React.ReactElement<{ className?: string }>; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center p-4 bg-matrix-bg/50 rounded-lg text-center transition-all hover:bg-matrix-dark/50 hover:scale-105 hover:text-matrix-cyan"
    >
        <div className="mb-2 text-matrix-light">{React.cloneElement(icon, { className: 'w-8 h-8' })}</div>
        <span className="text-sm font-semibold text-matrix-light"><BilingualLabel label={label} /></span>
    </button>
);


const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const notes = useNoteStore(state => state.notes);
    const proposals = useProposalStore(state => state.proposals);
    
    const allTags = notes.flatMap(note => note.tags || []);
    const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});
    
    // FIX: Use destructuring in the sort callback to help TypeScript correctly infer the value types as numbers.
    const sortedTags = Object.entries(tagCounts).sort(([, countA], [, countB]) => countB - countA);
    const maxCount = sortedTags[0]?.[1] || 1;
    const minCount = sortedTags[sortedTags.length - 1]?.[1] || 1;

    const getTagStyle = (count: number) => {
        const minSize = 0.8; // rem
        const maxSize = 1.5; // rem
        // Use a logarithmic scale to better visualize differences
        const scale = (Math.log(count) - Math.log(minCount)) / (Math.log(maxCount) - Math.log(minCount) || 1);
        const size = minSize + (maxSize - minSize) * scale;
        const opacity = 0.6 + 0.4 * scale;
        return { fontSize: `${size}rem`, opacity };
    };

    const recentNotes = [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    const topProposals = [...proposals].sort((a, b) => b.resonance - a.resonance).slice(0, 3);

    const handleTagClick = (tag: string) => navigate('/notes', { state: { filterTag: tag } });
    const handleNoteClick = (noteId: string) => navigate('/notes', { state: { scrollTo: noteId } });

    return (
        <div className="animate-fade-in space-y-8">
            <Header
                title="儀表板 (Dashboard)"
                subtitle="您的萬能元鑰系統指揮中心。(Your command center for the JunAiKey system.)"
                icon={<DashboardIcon className="w-8 h-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-6">
                    <h2 className="text-xl font-semibold text-matrix-cyan mb-4"><BilingualLabel label="最近筆記 (Recent Notes)" /></h2>
                    {recentNotes.length > 0 ? (
                        <ul className="space-y-3">
                            {recentNotes.map(note => (
                                <li key={note.id}>
                                    <button onClick={() => handleNoteClick(note.id)} className="w-full text-left p-3 rounded-md transition-colors hover:bg-matrix-dark/20">
                                        <p className="font-medium text-matrix-light truncate">{note.title}</p>
                                        <p className="text-xs text-matrix-dark">{new Date(note.createdAt).toLocaleString()}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-matrix-dark text-center py-4">尚無筆記。(No notes yet.)</p>
                    )}
                </Card>

                <div className="space-y-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-matrix-cyan mb-4"><BilingualLabel label="快速操作 (Quick Actions)" /></h2>
                        <div className="grid grid-cols-2 gap-4">
                            <ActionButton icon={<PlusIcon />} label="新筆記 (New Note)" onClick={() => navigate('/notes', { state: { showForm: true } })} />
                            <ActionButton icon={<PlusIcon />} label="新提案 (New Proposal)" onClick={() => navigate('/codex')} />
                            <ActionButton icon={<ConsoleIcon />} label="AI 主控台 (AI Console)" onClick={() => navigate('/console')} />
                            <ActionButton icon={<EvolveIcon />} label="生成組件 (Generate)" onClick={() => navigate('/evolution')} />
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-matrix-cyan mb-4 text-center"><BilingualLabel label="知識星座 (Tag Cloud)" /></h2>
                        {sortedTags.length > 0 ? (
                            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center">
                                {sortedTags.map(([tag, count]) => (
                                    <button key={tag} onClick={() => handleTagClick(tag)} className="text-matrix-cyan transition-all hover:text-white hover:scale-110" style={getTagStyle(count)}>
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        ) : (
                             <p className="text-matrix-dark text-center py-4">尚無標籤。(No tags yet.)</p>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-matrix-cyan mb-4"><BilingualLabel label="高共鳴提案 (Top Proposals)" /></h2>
                         {topProposals.length > 0 ? (
                            <ul className="space-y-2">
                                {topProposals.map(proposal => (
                                    <li key={proposal.id}>
                                        <button onClick={() => navigate('/codex')} className="w-full text-left p-2 rounded-md transition-colors hover:bg-matrix-dark/20">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium text-matrix-light truncate">{proposal.title}</p>
                                                <span className="text-sm font-bold text-matrix-green">{proposal.resonance}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-matrix-dark text-center py-4">尚無提案。(No proposals yet.)</p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;