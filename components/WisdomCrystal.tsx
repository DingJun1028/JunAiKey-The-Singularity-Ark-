
import React, { useState, useRef, useEffect, useMemo } from 'react';
// FIX: Updated react-router-dom import for v6/v7 compatibility.
import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '../store/favoriteStore';
import { allAvailableActions } from '../core/actions';
import QuickNoteModal from './QuickNoteModal';
import ManageFavoritesModal from './ManageFavoritesModal';
import NexusIcon from './icons/NexusIcon';
import PlusIcon from './icons/PlusIcon';

const WisdomCrystal: React.FC = () => {
    // FIX: Updated useHistory to useNavigate for v6/v7 compatibility.
    const navigate = useNavigate();
    const crystalRef = useRef<HTMLButtonElement>(null);
    const { favoriteIds, isInitialized } = useFavoriteStore(state => ({
        favoriteIds: state.favoriteIds,
        isInitialized: state.isInitialized,
    }));

    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isManageModalOpen, setManageModalOpen] = useState(false);
    
    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragOffset = useRef({ x: 0, y: 0 });

    const favoriteActions = useMemo(() => {
        if (!isInitialized) return [];
        return favoriteIds
            .map(id => allAvailableActions.find(action => action.id === id))
            .filter(Boolean);
    }, [favoriteIds, isInitialized]);
    
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
    
    const closeMenu = () => {
        setMenuOpen(false);
    }
    
    const menuItems = [...favoriteActions, {
        id: 'manage-favorites',
        label: '管理我的最愛 (Manage Favorites)',
        path: '#',
        icon: PlusIcon,
        action: () => setManageModalOpen(true),
    }];

    const radius = 120;
    const angleStep = (2 * Math.PI) / (menuItems.length > 8 ? menuItems.length : 8);

    return (
        <>
            <ManageFavoritesModal isOpen={isManageModalOpen} onClose={() => setManageModalOpen(false)} />
            {isMenuOpen && <div className="fixed inset-0 bg-matrix-bg/50 backdrop-blur-sm z-40" onClick={closeMenu}></div>}
            <div className="fixed z-50" style={{ left: position.x, top: position.y, pointerEvents: isMenuOpen ? 'auto' : 'none' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}>
                    {menuItems.map((item, index) => {
                        const angle = index * angleStep - (Math.PI / 2);
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);
                        const Icon = item.icon;

                        const handleAction = () => {
                            if ('action' in item && typeof item.action === 'function') {
                                item.action();
                            } else {
                                // FIX: Updated history.push to navigate for v6/v7 compatibility.
                                navigate(item.path);
                            }
                            closeMenu();
                        };
                        
                        const finalTransform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1)`;
                        const initialTransform = `translate(-50%, -50%) scale(0)`;

                        return (
                            <button
                                key={item.id}
                                onClick={handleAction}
                                className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 shadow-lg shadow-matrix-cyan/30 bg-matrix-bg/90 border-2 border-matrix-cyan`}
                                style={{
                                    transform: isMenuOpen ? finalTransform : initialTransform,
                                    opacity: isMenuOpen ? 1 : 0,
                                    transitionDelay: `${index * 40}ms`,
                                }}
                                title={item.label}
                            >
                                <Icon className="w-8 h-8 text-matrix-cyan" />
                            </button>
                        );
                    })}
                </div>
                <button
                    ref={crystalRef}
                    onMouseDown={handleMouseDown}
                    className="w-16 h-16 bg-matrix-bg border-2 border-matrix-cyan rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg focus:outline-none animate-pulse-glow"
                    style={{ transition: isDragging ? 'none' : 'all 0.2s ease', pointerEvents: 'auto' }}
                    aria-label="打開快速操作選單"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                >
                    <NexusIcon className="w-8 h-8 text-matrix-cyan" />
                </button>
            </div>
        </>
    );
};

export default WisdomCrystal;
