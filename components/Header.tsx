<<<<<<< HEAD

import React from 'react';
import { useUiStore } from '../store/uiStore';
import MenuIcon from './icons/MenuIcon';
import Breadcrumbs from './Breadcrumbs';

const Header: React.FC = () => {
    const { toggleSidebar } = useUiStore();

    return (
        <header className="bg-matrix-bg/50 backdrop-blur-sm border-b border-matrix-dark/20 p-4 flex items-center z-20 h-20 flex-shrink-0">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-matrix-light hover:bg-matrix-dark/50 transition-colors mr-4"
                aria-label="Toggle Sidebar"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
            <Breadcrumbs />
        </header>
    );
};

=======
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4">
        <div className="text-matrix-cyan">{icon}</div>
        <div>
          <h1 className="text-3xl font-bold text-matrix-light">{title}</h1>
          <p className="text-matrix-dark">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-matrix-cyan/50 to-transparent"></div>
    </div>
  );
};

const Header = React.memo(HeaderComponent);
>>>>>>> feature-branch
export default Header;
