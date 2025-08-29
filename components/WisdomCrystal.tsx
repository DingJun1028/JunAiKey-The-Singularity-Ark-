import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotesIcon from './icons/NotesIcon';
import NexusIcon from './icons/NexusIcon';
import ConsoleIcon from './icons/ConsoleIcon';
import PlusIcon from './icons/PlusIcon';
import QuickNoteModal from './QuickNoteModal';
import EvolveIcon from './icons/EvolveIcon';
import SanctumIcon from './icons/SanctumIcon';
import DashboardIcon from './icons/DashboardIcon';

const WisdomCrystal: React.FC = () => {
    const navigate = useNavigate();
    const crystalRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isNoteModalOpen, setNoteModalOpen] = useState(false);

    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragOffset = useRef({ x: 0, y: 0 });

    const runes = [
        { icon: <DashboardIcon className="w-6 h-6"/>, label: "儀表板", action: () => navigate('/') },
        { icon: <NotesIcon className="w-6 h-6"/>, label: "萬能筆記", action: () => navigate('/notes') },
        { icon: <PlusIcon className="w-6 h-6"/>, label: "快速筆記", action: () => setNoteModalOpen(true) },
        { icon: <SanctumIcon className="w-6 h-6"/>, label: "智慧聖殿", action: () => navigate('/sanctum') },
        { icon: <EvolveIcon className="w-6 h-6"/>, label: "神諭創生", action: () => navigate('/evolution') },
        { icon: <ConsoleIcon className="w-6 h-6"/>, label: "召喚主控台", action: () => navigate('/console') },
        { icon: <NexusIcon className="w-6 h-6"/>, label: "召喚中樞", action: () => navigate('/nexus') },
    ];

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        if (crystalRef.current) {
            const rect = crystalRef.current.getBoundingClientRect();
            dragOffset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        let newX = e.clientX - dragOffset.current.x;
        let newY = e.clientY - dragOffset.current.y;
        
        // Clamp position to be within viewport
        newX = Math.max(0, Math.min(window.innerWidth - 64, newX));
        newY = Math.max(0, Math.min(window.innerHeight - 64, newY));

        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        const distance = Math.sqrt(Math.pow(e.clientX - dragStartPos.current.x, 2) + Math.pow(e.clientY - dragStartPos.current.y, 2));
        if (distance < 5) { // It's a click, not a drag
            setMenuOpen(prev => !prev);
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
        // Close menu if a modal opens
        if(isNoteModalOpen) {
            setMenuOpen(false);
        }
    }, [isNoteModalOpen]);

    const radius = 80;
    const angleStep = (2 * Math.PI) / runes.length;

    return (
        <>
            <QuickNoteModal isOpen={isNoteModalOpen} onClose={() => setNoteModalOpen(false)} />
            <div className="fixed z-50" style={{ left: position.x, top: position.y }}>
                 {isMenuOpen && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {runes.map((rune, index) => {
                            const angle = index * angleStep - (Math.PI / 2); // Start from top
                            const x = radius * Math.cos(angle);
                            const y = radius * Math.sin(angle);
                            return (
                                <button
                                    key={rune.label}
                                    onClick={() => { rune.action(); setMenuOpen(false); }}
                                    className="absolute w-12 h-12 bg-matrix-cyan/80 text-matrix-bg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-matrix-cyan shadow-lg shadow-matrix-cyan/50 animate-fade-in-fast"
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`,
                                    }}
                                    title={rune.label}
                                >
                                    {rune.icon}
                                </button>
                            );
                        })}
                    </div>
                )}
                <button
                    ref={crystalRef}
                    onMouseDown={handleMouseDown}
                    className="w-16 h-16 bg-matrix-bg border-2 border-matrix-cyan rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg focus:outline-none animate-pulse-glow"
                    style={{ transition: isDragging ? 'none' : 'all 0.2s ease' }}
                >
                    <NexusIcon className="w-8 h-8 text-matrix-cyan" />
                </button>
            </div>
        </>
    );
};

export default WisdomCrystal;
