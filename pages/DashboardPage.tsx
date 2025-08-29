import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DashboardIcon from '../components/icons/DashboardIcon';
import { useNoteStore } from '../store/noteStore';
import { useProposalStore } from '../store/proposalStore';
import NotesIcon from '../components/icons/NotesIcon';
import CodexIcon from '../components/icons/CodexIcon';
import TagIcon from '../components/icons/TagIcon';
import BilingualLabel from '../components/BilingualLabel';
import Card from '../components/Card';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const notes = useNoteStore(state => state.notes);
    const proposals = useProposalStore(state => state.proposals);

    const totalNotes = notes.length;
    const allTags = notes.flatMap(note => note.tags || []);
    const uniqueTags = new Set(allTags);
    const totalProposals = proposals.length;
    
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-matrix-cyan bg-matrix-cyan/10 p-3 rounded-full mb-3">
                        <NotesIcon className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold text-matrix-light">{totalNotes}</p>
                    <h3 className="text-matrix-dark text-sm font-medium"><BilingualLabel label="總筆記 (Total Notes)" /></h3>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-matrix-cyan bg-matrix-cyan/10 p-3 rounded-full mb-3">
                       <TagIcon className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold text-matrix-light">{uniqueTags.size}</p>
                    <h3 className="text-matrix-dark text-sm font-medium"><BilingualLabel label="唯一標籤 (Unique Tags)" /></h3>
                </Card>
                <Card className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-matrix-cyan bg-matrix-cyan/10 p-3 rounded-full mb-3">
                        <CodexIcon className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold text-matrix-light">{totalProposals}</p>
                    <h3 className="text-matrix-dark text-sm font-medium"><BilingualLabel label="進化提案 (Proposals)" /></h3>
                </Card>
            </div>

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