import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSummonerStore } from '../store/summonerStore';
import { useNoteStore } from '../store/noteStore';
import { spiritColorMap } from '../core/theme';
import QuickNoteModal from './QuickNoteModal';
import NexusIcon from './icons/NexusIcon';
import SummonIcon from './icons/SummonIcon';

const WisdomCrystal: React.FC = () => {
    const navigate = useNavigate();
    const { spirits } = useSummonerStore();
    const { notes } = useNoteStore();
    const crystalRef = useRef<HTMLButtonElement>(null);

    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedSpiritId, setSelectedSpiritId] = useState<string | null>(null);
    const [isNoteModalOpen, setNoteModalOpen] = useState(false);

    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragOffset = useRef({ x: 0, y: 0 });

    const getLatestNote = () => {
        if (notes.length === 0) return null;
        return [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    };

    const skills: Record<string, { name: string; action: () => void }[]> = {
        aurex: [
            { name: '生成佈局', action: () => navigate('/evolution', { state: { goal: 'A responsive dashboard layout with a sidebar and main content area' } }) },
            { name: '檢視聖典', action: () => navigate('/notes', { state: { scrollTo: '3' } }) },
        ],
        sylfa: [
            { name: '建立筆記', action: () => navigate('/notes', { state: { showForm: true } }) },
            { name: '提煉筆記', action: () => {
                const latestNote = getLatestNote();
                if (latestNote) navigate('/sanctum', { state: { text: latestNote.content } });
            }},
        ],
        aquare: [
            { name: '搜尋筆記', action: () => navigate('/notes', { state: { focusSearch: true } }) },
            { name: '篩選傳說', action: () => navigate('/notes', { state: { filterTag: 'core-lore' } }) },
        ],
        pyra: [
            { name: '快速筆記', action: () => setNoteModalOpen(true) },
            { name: '執行技能', action: () => navigate('/shuttle', { state: { activeTab: 'junkey' } }) },
        ],
        terrax: [
            { name: '檢視指南', action: () => navigate('/notes', { state: { filterTag: 'guide' } }) },
            { name: '檢視API', action: () => navigate('/notes', { state: { scrollTo: '4' } }) },
        ],
        luxis: [
            { name: '解釋聖殿', action: () => navigate('/console', { state: { prefill: 'Explain the Wisdom Sanctum page' } }) },
            { name: '檢視引擎', action: () => navigate('/notes', { state: { scrollTo: '7' } }) },
        ],
        nyxos: [
            { name: '生成混沌', action: () => navigate('/evolution', { state: { goal: 'A chaotic, glitchy button that shimmers' } }) },
            { name: '啟動穿梭', action: () => navigate('/shuttle') },
        ],
        nullis: [
            { name: '儀表板', action: () => navigate('/') },
            { name: '控制台', action: () => navigate('/console') },
        ],
        tempest: [
            { name: '會議助手', action: () => navigate('/shuttle', { state: { activeTab: 'junkey', skill: 'meeting' } }) },
            { name: '最新筆記', action: () => {
                const latestNote = getLatestNote();
                if (latestNote) navigate('/notes', { state: { scrollTo: latestNote.id } });
            }},
        ],
        anima: [
            { name: '提煉智慧', action: () => navigate('/sanctum') },
            { name: '篩選哲學', action: () => navigate('/notes', { state: { filterTag: 'philosophy' } }) },
        ],
        machina: [
            { name: 'AI分析', action: () => navigate('/shuttle', { state: { activeTab: 'junai' } }) },
            { name: '神諭創生', action: () => navigate('/evolution') },
        ],
        astra: [
            { name: '召喚中樞', action: () => navigate('/nexus') },
            { name: '萬能筆記', action: () => navigate('/notes') },
        ],
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        if (crystalRef.current) {
            const rect = crystalRef.current.getBoundingClientRect();
            dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        let newX = e.clientX - dragOffset.current.x;
        let newY = e.clientY - dragOffset.current.y;
        newX = Math.max(0, Math.min(window.innerWidth - 64, newX));
        newY = Math.max(0, Math.min(window.innerHeight - 64, newY));
        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        const distance = Math.sqrt(Math.pow(e.clientX - dragStartPos.current.x, 2) + Math.pow(e.clientY - dragStartPos.current.y, 2));
        if (distance < 5) {
            if (selectedSpiritId) {
                setSelectedSpiritId(null);
            } else {
                setMenuOpen(prev => !prev);
            }
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);
    
    useEffect(() => {
        if (isNoteModalOpen) setMenuOpen(false);
    }, [isNoteModalOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
        setSelectedSpiritId(null);
    }
    
    const selectedSkills = selectedSpiritId ? skills[selectedSpiritId] : [];
    const radius = selectedSpiritId ? 100 : 160;
    const items = selectedSpiritId ? selectedSkills : spirits;
    const angleStep = (2 * Math.PI) / (selectedSpiritId ? 8 : items.length);

    return (
        <>
            <QuickNoteModal isOpen={isNoteModalOpen} onClose={() => setNoteModalOpen(false)} />
            {isMenuOpen && <div className="fixed inset-0 bg-matrix-bg/50 backdrop-blur-sm z-40" onClick={closeMenu}></div>}
            <div className="fixed z-50" style={{ left: position.x, top: position.y, pointerEvents: isMenuOpen ? 'auto' : 'none' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}>
                    {items.map((item, index) => {
                        const angle = index * angleStep - (Math.PI / 2);
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);
                        const isSpirit = 'color' in item;
                        const theme = isSpirit ? spiritColorMap[item.color] : spiritColorMap.虹彩色;

                        const action = () => {
                            if (isSpirit) {
                                setSelectedSpiritId(item.id);
                            } else {
                                item.action();
                                closeMenu();
                            }
                        };
                        
                        const finalTransform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1)`;
                        const initialTransform = `translate(-50%, -50%) scale(0)`;

                        return (
                            <button
                                key={isSpirit ? item.id : item.name}
                                onClick={action}
                                className={`absolute w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 shadow-lg ${theme.shadow}`}
                                style={{
                                    transform: isMenuOpen ? finalTransform : initialTransform,
                                    opacity: isMenuOpen ? 1 : 0,
                                    transitionDelay: `${index * 40}ms`,
                                    backgroundColor: isSpirit ? 'rgba(13, 2, 8, 0.9)' : `rgba(0, 255, 255, 0.8)`,
                                    borderColor: theme.border.replace('border-', ''),
                                    borderWidth: '2px',
                                }}
                                title={item.name}
                            >
                                {isSpirit ? <span className={`text-xs font-bold ${theme.text}`}>{item.name.substring(0, 2)}</span> : <SummonIcon className="w-8 h-8 text-matrix-bg" />}
                            </button>
                        );
                    })}
                </div>
                <button
                    ref={crystalRef}
                    onMouseDown={handleMouseDown}
                    className="w-16 h-16 bg-matrix-bg border-2 border-matrix-cyan rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg focus:outline-none animate-pulse-glow"
                    style={{ transition: isDragging ? 'none' : 'all 0.2s ease', pointerEvents: 'auto' }}
                >
                    <NexusIcon className="w-8 h-8 text-matrix-cyan" />
                </button>
            </div>
        </>
    );
};

export default WisdomCrystal;