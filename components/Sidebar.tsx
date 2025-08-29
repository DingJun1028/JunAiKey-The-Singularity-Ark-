
import React from 'react';
import { NavLink } from 'react-router-dom';
import SettingsIcon from './icons/SettingsIcon';
import { useNavigationStore } from '../store/navigationStore';
import { sidebarNavItems } from '../core/navigation';

interface SidebarProps {
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenSettings }) => {
  const activeRealmId = useNavigationStore(state => state.activeRealmId);
  
  const currentNavItems = sidebarNavItems[activeRealmId] || [];

  const renderLabel = (label: string) => {
    const match = label.match(/(.+)\s\((.+)\)/);
    if (match) {
      return (
        <span className="font-medium">
          {match[1]}
          <span className="text-xs text-matrix-dark ml-1.5">{match[2]}</span>
        </span>
      );
    }
    return <span className="font-medium">{label}</span>;
  };

  return (
    <nav className="w-72 bg-matrix-bg p-4 flex flex-col border-r border-matrix-dark/20 transition-all duration-300">
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
              {renderLabel(item.label)}
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
          {renderLabel('設定 (Settings)')}
        </button>
        <div className="text-center text-matrix-dark text-xs mt-4">
          <p>Terminus Matrix v2.0</p>
          <p>&copy; 2024 Genesis Archives</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
