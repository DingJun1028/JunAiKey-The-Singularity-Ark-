
import React from 'react';
import { useLocation } from 'react-router-dom';
import { realms, sidebarNavItems } from '../core/navigation';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    let currentRealmName = '';
    let currentItemName = '';

    for (const realm of realms) {
        const navItems = sidebarNavItems[realm.id] || [];
        const matchedItem = navItems.find(item => currentPath.startsWith(item.path) && (item.path !== '/' || currentPath === '/'));
        if (matchedItem) {
            currentRealmName = realm.name.split(' ')[0];
            currentItemName = matchedItem.label.split(' ')[0];
            break;
        }
    }

    if (!currentRealmName) {
        return <h1 className="text-xl font-semibold text-matrix-light">Dashboard</h1>;
    }

    return (
        <div className="flex items-center text-xl font-semibold text-matrix-light">
            <span>{currentRealmName}</span>
            <span className="mx-2 text-matrix-dark">/</span>
            <span className="text-matrix-cyan">{currentItemName}</span>
        </div>
    );
};

export default Breadcrumbs;
