
import React from 'react';
// FIX: Updated react-router-dom import for v6/v7 compatibility.
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import DashboardIcon from '../components/icons/DashboardIcon';
import { useNoteStore } from '../store/noteStore';
import { useProposalStore } from '../store/proposalStore';
import BilingualLabel from '../components/BilingualLabel';
import Card from '../components/Card';
import PlusIcon from '../components/icons/PlusIcon';
import ConsoleIcon from '../components/icons/ConsoleIcon';
import EvolveIcon from '../components/icons/EvolveIcon';
import InsightsIcon from '../components/icons/InsightsIcon';
import { useInsightStore } from '../store/insightStore';
import Loader from '../components/Loader';
import NotesIcon from '../components/icons/NotesIcon';
import CodexIcon from '../components/icons/CodexIcon';
import type { CardType } from '../types';

// Helper component for action buttons
const ActionButton: React.FC<{ icon: React.ReactElement<{ className?: string }>; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center p-4 bg-matrix-bg/50 rounded-lg text-center transition-all hover:bg-matrix-dark/50 hover:scale-105 hover:text-matrix-cyan"
    >
        <div className="mb-2 text-matrix-light">{React.cloneElement(icon, { className: 'w-8 h-8' })}</div>
        <span className="text-sm font-semibold text-matrix-light"><BilingualLabel label={label} /></span>
    </button>
);

const MatrixInsights: React.FC = () => {
    // FIX: Updated useHistory to useNavigate for v6/v7 compatibility.
    const navigate = useNavigate();
    const { insights, isLoading, error, lastAnalysis, actions } = useInsightStore();
    const { notes } = useNoteStore();
    const { proposals } = useProposalStore();

    const findItem = (id: string, type: CardType) => {
        if (type === 'note') {
            return notes.find(n => n.id === id);
        }
        return proposals.find(p => p.id === id);
    };
    
    const handleNavigate = (id: string, type: CardType) => {
        const path = type === 'note' ? '/notes' : '/codex';
        // FIX: Updated history.push to navigate for v6/v7 compatibility.
        navigate(path, { state: { scrollTo: id } });
    };

    return (
        <Card className="lg:col-span-2 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-matrix-cyan flex items-center gap-2">
                    <InsightsIcon className="w-6 h-6" />
                    <BilingualLabel label="矩陣洞察 (Matrix Insights)" />
                </h2>
                <button
                    onClick={actions.fetchInsights}
                    disabled={isLoading}
                    className="bg-matrix-cyan text-matrix-bg font-bold py-1 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow-cyan disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-wait"
                >
                    <BilingualLabel label={isLoading ? '分析中...' : '分析連結'} />
                </button>
            </div>
            
            {isLoading && <Loader text="ANALYZING..." />}
            {error && <p className="text-red-500 text-center p-2 bg-red-500/10 rounded">{error}</p>}
            
            {!isLoading && !error && (
                <div className="space-y-4">
                    {insights.length > 0 ? (
                        insights.map((insight, index) => {
                            const item1 = findItem(insight.item1Id, insight.item1Type);
                            const item2 = findItem(insight.item2Id, insight.item2Type);
                            if (!item1 || !item2) return null;

                            const Icon1 = insight.item1Type === 'note' ? NotesIcon : CodexIcon;
                            const Icon2 = insight.item2Type === 'note' ? NotesIcon : CodexIcon;

                            return (
                                <div key={index} className="p-3 border-l-2 border-matrix-cyan/30 space-y-2 hover:bg-matrix-bg/50 rounded-r-md">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                        <button onClick={() => handleNavigate(item1.id, insight.item1Type)} className="flex items-center gap-2 text-left text-matrix-light hover:text-matrix-cyan transition-colors">
                                            <Icon1 className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm font-medium truncate">{item1.title}</span>
                                        </button>
                                        <span className="text-matrix-dark text-xl self-center sm:mx-2">↔</span>
                                        <button onClick={() => handleNavigate(item2.id, insight.item2Type)} className="flex items-center gap-2 text-left text-matrix-light hover:text-matrix-cyan transition-colors">
                                            <Icon2 className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm font-medium truncate">{item2.title}</span>
                                        </button>
                                    </div>
                                    <blockquote className="text-sm text-matrix-dark italic pl-2 border-l-2 border-matrix-dark/30">
                                        {insight.reason}
                                    </blockquote>
                                </div>
                            );
                        })
                    ) : (
                         <div className="text-center text-matrix-dark py-4">
                            {lastAnalysis
                                ? <p>分析完成，未發現新的顯著連結。</p>
                                : <p>點擊「分析連結」以發現您的筆記與提案之間的隱藏關係。</p>
                            }
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};


const DashboardPage: React.FC = () => {
    // FIX: Updated useHistory to useNavigate for v6/v7 compatibility.
    const navigate = useNavigate();
    const notes = useNoteStore(state => state.notes);
    const proposals = useProposalStore(state => state.proposals);
    
    const allTags = notes.flatMap(note => note.tags || []);
    const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});
    
    const sortedTags = Object.entries(tagCounts).sort(([, countA], [, countB]) => (countB as number) - (countA as number));
    const maxCount = Number(sortedTags[0]?.[1]) || 1;
    const minCount = Number(sortedTags[sortedTags.length - 1]?.[1]) || 1;

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

    // FIX: Updated history.push to navigate for v6/v7 compatibility.
    const handleTagClick = (tag: string) => navigate('/notes', { state: { filterTag: tag } });
    const handleNoteClick = (noteId: string) => navigate('/notes', { state: { scrollTo: noteId } });

    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="儀表板 (Dashboard)"
                subtitle="您的萬能元鑰系統指揮中心。(Your command center for the JunAiKey system.)"
                icon={<DashboardIcon className="w-8 h-8" />}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6">
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

                    <MatrixInsights />
                </div>


                <div className="space-y-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-matrix-cyan mb-4"><BilingualLabel label="快速操作 (Quick Actions)" /></h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* FIX: Updated history.push to navigate for v6/v7 compatibility. */}
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
                                    <button key={tag} onClick={() => handleTagClick(tag)} className="text-matrix-cyan transition-all hover:text-white hover:scale-110" style={getTagStyle(count as number)}>
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
                                        {/* FIX: Updated history.push to navigate for v6/v7 compatibility. */}
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
