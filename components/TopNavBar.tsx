
// This file is repurposed as BottomNavBar.tsx to implement the new mobile-first UI.
import React, { useState, useEffect } from 'react';
// FIX: Updated react-router-dom import for v6/v7 compatibility.
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from './icons/SettingsIcon';
import { realms as defaultRealms } from '../core/navigation';
import type { Realm, RealmId } from '../types';
import BilingualLabel from './BilingualLabel';
import { useNavigationStore } from '../store/navigationStore';
import { useCustomizationStore } from '../store/customizationStore';
import XIcon from './icons/XIcon';

interface BottomNavBarProps {
  onOpenSettings: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onOpenSettings }) => {
    const [openRealm, setOpenRealm] = useState<Realm | null>(null);
    const { activeRealmId, setActiveRealmId } = useNavigationStore();
    const { realmOrder, sidebarOrders } = useCustomizationStore();
    const location = useLocation();
    // FIX: Updated useHistory to useNavigate for v6/v7 compatibility.
    const navigate = useNavigate();

    useEffect(() => {
        setOpenRealm(null); // Close menu on navigation change
    }, [location.pathname]);

    const handleRealmClick = (realm: Realm) => {
        if (openRealm?.id === realm.id) {
            setOpenRealm(null);
        } else {
            setOpenRealm(realm);
            setActiveRealmId(realm.id);
        }
    };

    const handleNavItemClick = (path: string) => {
        // FIX: Updated history.push to navigate for v6/v7 compatibility.
        navigate(path);
        setOpenRealm(null);
    }
    
    const handleSettingsClick = () => {
        setOpenRealm(null);
        onOpenSettings();
    }

    const sortedRealms = realmOrder
        .map(id => defaultRealms.find(r => r.id === id))
        .filter((r): r is Realm => !!r);
        
    const navItemsForOpenRealm = openRealm ? sidebarOrders[openRealm.id] || [] : [];

    return (
        <>
            {/* Backdrop for open menu */}
            {openRealm && (
                <div 
                    className="fixed inset-0 bg-black/60 z-30 animate-fade-in-fast"
                    onClick={() => setOpenRealm(null)}
                />
            )}
            
            <div className="fixed bottom-0 left-0 right-0 z-40">
                {/* Slide-up Menu */}
                <div className={`absolute bottom-full left-4 right-4 mb-2 bg-matrix-bg/80 backdrop-blur-xl border border-matrix-cyan/30 rounded-lg shadow-lg p-4 transition-all duration-300 ease-out ${openRealm ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
                    {openRealm && (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-matrix-cyan"><BilingualLabel label={openRealm.name} /></h3>
                                <button onClick={() => setOpenRealm(null)} className="p-1 text-matrix-light hover:text-white">
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {navItemsForOpenRealm.map(item => (
                                    <li key={item.path}>
                                        <button onClick={() => handleNavItemClick(item.path)} className="w-full flex items-center space-x-4 p-3 rounded-md text-matrix-light hover:bg-matrix-dark/50 transition-colors">
                                            <item.icon className="w-6 h-6" />
                                            <BilingualLabel label={item.label} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Main Nav Bar */}
                <div className="h-24 bg-matrix-bg/80 backdrop-blur-xl border-t border-matrix-cyan/20">
                    <nav className="flex justify-around items-center h-full max-w-3xl mx-auto px-2">
                        {sortedRealms.map(realm => {
                            const RealmIcon = realm.icon;
                            const isActive = activeRealmId === realm.id;
                            const isOpen = openRealm?.id === realm.id;
                            return (
                                <button
                                    key={realm.id}
                                    onClick={() => handleRealmClick(realm)}
                                    title={realm.name}
                                    className={`flex flex-col items-center justify-center gap-1 p-1 rounded-lg transition-all w-20 h-20 ${isActive ? 'text-matrix-cyan' : 'text-matrix-light hover:text-white'} ${isOpen ? 'bg-matrix-cyan/10' : ''}`}
                                >
                                    <RealmIcon className="w-8 h-8" />
                                    <span className="text-[10px] font-semibold tracking-tighter">{realm.name.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                        <button
                            onClick={handleSettingsClick}
                            title="設定 (Settings)"
                            className="flex flex-col items-center justify-center gap-1 p-1 rounded-lg text-matrix-light hover:text-white w-20 h-20"
                        >
                            <SettingsIcon className="w-8 h-8" />
                            <span className="text-[10px] font-semibold">設定</span>
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default BottomNavBar;
