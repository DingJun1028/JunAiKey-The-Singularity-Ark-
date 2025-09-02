<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SettingsIcon from './icons/SettingsIcon';
import { useUiStore } from '../store/uiStore';
import { realms as defaultRealms, sidebarNavItems as defaultSidebarNavItems } from '../core/navigation';
import type { RealmId } from '../types';
import BilingualLabel from './BilingualLabel';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { useNavigationStore } from '../store/navigationStore';
import { useCustomizationStore } from '../store/customizationStore';
=======
import React from 'react';
import { NavLink } from 'react-router-dom';
import SettingsIcon from './icons/SettingsIcon';
import { useNavigationStore } from '../store/navigationStore';
import { sidebarNavItems as defaultSidebarNavItems } from '../core/navigation';
import { useCustomizationStore } from '../store/customizationStore';
import BilingualLabel from './BilingualLabel';
>>>>>>> feature-branch

interface SidebarProps {
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenSettings }) => {
<<<<<<< HEAD
  const { isSidebarCollapsed, toggleSidebar } = useUiStore();
  const { activeRealmId } = useNavigationStore();
  const { realmOrder, sidebarOrders } = useCustomizationStore();
  
  const [openRealmId, setOpenRealmId] = useState<RealmId | null>(activeRealmId);

  // Effect to automatically open the active realm's section when not collapsed
  useEffect(() => {
    if (!isSidebarCollapsed) {
      setOpenRealmId(activeRealmId);
    }
  }, [activeRealmId, isSidebarCollapsed]);

  const handleRealmClick = (realmId: RealmId) => {
    if (isSidebarCollapsed) {
        toggleSidebar(); // Expand the sidebar on click
        setOpenRealmId(realmId);
    } else {
        setOpenRealmId(prev => (prev === realmId ? null : realmId)); // Toggle accordion
    }
  };

  const sortedRealms = realmOrder
    .map(id => defaultRealms.find(r => r.id === id))
    .filter(Boolean);

  return (
    <div className={`fixed top-0 left-0 h-full bg-matrix-bg/50 backdrop-blur-xl border-r border-matrix-cyan/20 transition-all duration-300 z-30 ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`p-4 h-20 flex items-center ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                {!isSidebarCollapsed && (
                    <div>
                        <h1 className="text-xl font-bold text-matrix-cyan tracking-wider">萬能元鑰創世紀</h1>
                        <p className="text-xs text-matrix-dark">JunAiKey Genesis</p>
                    </div>
                )}
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                {sortedRealms.map(realm => {
                    if (!realm) return null;
                    const navItems = sidebarOrders[realm.id] || [];
                    const isOpen = openRealmId === realm.id;
                    const RealmIcon = realm.icon;

                    // Collapsed View
                    if (isSidebarCollapsed) {
                        return (
                             <button 
                                key={realm.id} 
                                onClick={() => handleRealmClick(realm.id)} 
                                title={realm.name} 
                                className={`w-full flex justify-center items-center p-3 my-1 rounded-lg transition-colors ${activeRealmId === realm.id ? 'bg-matrix-cyan/20' : 'hover:bg-matrix-dark/50'}`}
                             >
                                 <RealmIcon className="w-6 h-6 text-matrix-light" />
                             </button>
                        );
                    }

                    // Expanded View
                    return (
                        <div key={realm.id}>
                            <button onClick={() => handleRealmClick(realm.id)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-matrix-dark/50 transition-colors">
                                <span className={`font-semibold ${activeRealmId === realm.id ? 'text-matrix-cyan' : 'text-matrix-light'}`}>
                                    <BilingualLabel label={realm.name} />
                                </span>
                                <ChevronRightIcon className={`w-4 h-4 text-matrix-light transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                            </button>
                            <div className={`pl-4 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                                <ul className="py-2 space-y-1 border-l border-matrix-dark/30">
                                    {navItems.map(item => (
                                        <li key={item.path}>
                                            <NavLink to={item.path} end={item.path === '/'} className={({ isActive }) => `flex items-center space-x-3 p-2 ml-2 rounded-md text-sm transition-colors ${isActive ? 'bg-matrix-green/10 text-matrix-green' : 'text-matrix-light hover:bg-matrix-dark/20'}`}>
                                                <item.icon className="w-5 h-5" />
                                                <BilingualLabel label={item.label} />
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-2 border-t border-matrix-dark/20">
                <button onClick={onOpenSettings} title="設定 (Settings)" className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-matrix-light hover:bg-matrix-dark/50 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <SettingsIcon className="w-6 h-6" />
                    {!isSidebarCollapsed && <BilingualLabel label="設定 (Settings)" />}
                </button>
                 {!isSidebarCollapsed && (
                    <div className="text-center text-matrix-dark text-xs mt-2 px-2">
                        <p>Terminus Matrix v2.1</p>
                        <p>&copy; 2024 Genesis Archives</p>
                    </div>
                 )}
            </div>
        </div>
    </div>
  );
};

export default Sidebar;
=======
  const activeRealmId = useNavigationStore(state => state.activeRealmId);
  const { sidebarOrders } = useCustomizationStore();
  
  const currentNavItems = sidebarOrders[activeRealmId] || defaultSidebarNavItems[activeRealmId] || [];

  return (
    <nav className="w-72 bg-matrix-bg/50 backdrop-blur-xl p-4 flex flex-col border-r border-matrix-cyan/20 transition-all duration-300">
      <div className="mb-8">
         <h1 className="text-xl font-bold text-matrix-cyan tracking-wider">萬能元鑰創世紀</h1>
         <p className="text-xs text-matrix-dark">JunAiKey Genesis</p>
      </div>
      <ul className="space-y-2">
        {currentNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-matrix-green/10 text-matrix-green shadow-matrix-glow'
                    : 'text-matrix-light hover:bg-matrix-dark/20 hover:text-white'
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <BilingualLabel label={item.label} />
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button
          onClick={onOpenSettings}
          className="flex items-center w-full space-x-3 p-2 rounded-md transition-all duration-200 text-matrix-light hover:bg-matrix-dark/20 hover:text-white mb-2"
          title="設定 (Settings)"
        >
          <SettingsIcon className="w-6 h-6" />
          <BilingualLabel label="設定 (Settings)" />
        </button>
        <div className="text-center text-matrix-dark text-xs mt-4">
          <p>Terminus Matrix v2.1</p>
          <p>&copy; 2024 Genesis Archives</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
>>>>>>> feature-branch
