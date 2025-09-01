
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

export default Header;
