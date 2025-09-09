
import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const Header: React.FC = () => {
    return (
        <header className="bg-matrix-bg/50 backdrop-blur-sm border-b border-matrix-dark/20 p-4 flex items-center z-20 h-20 flex-shrink-0">
            <Breadcrumbs />
        </header>
    );
};

export default Header;