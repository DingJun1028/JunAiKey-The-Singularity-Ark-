
import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from './icons/DashboardIcon';
import NotesIcon from './icons/NotesIcon';
import SanctumIcon from './icons/SanctumIcon';
import EvolveIcon from './icons/EvolveIcon';
import ConsoleIcon from './icons/ConsoleIcon';
import NexusIcon from './icons/NexusIcon';

const navItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/notes', label: 'Omni-Notes', icon: NotesIcon },
  { path: '/sanctum', label: 'Wisdom Sanctum', icon: SanctumIcon },
  { path: '/evolution', label: 'Agent Evolution', icon: EvolveIcon },
  { path: '/console', label: 'Matrix Console', icon: ConsoleIcon },
  { path: '/nexus', label: 'Summoner\'s Nexus', icon: NexusIcon },
];

const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 bg-matrix-bg p-4 flex flex-col border-r border-matrix-dark/20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-matrix-green tracking-widest">JUNAIKEY</h2>
        <p className="text-sm text-matrix-dark">#OmniKey</p>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
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
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-center text-matrix-dark text-xs">
        <p>Terminus Matrix v1.0</p>
        <p>&copy; 2024 Genesis Archives</p>
      </div>
    </nav>
  );
};

export default Sidebar;
