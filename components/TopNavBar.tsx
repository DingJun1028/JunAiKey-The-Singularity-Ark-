import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationStore } from '../store/navigationStore';
import { realms as defaultRealms } from '../core/navigation';
import type { RealmId } from '../types';
import BilingualLabel from './BilingualLabel';
import { useCustomizationStore } from '../store/customizationStore';

const TopNavBar: React.FC = () => {
    const { activeRealmId, setActiveRealmId } = useNavigationStore();
    const { realmOrder } = useCustomizationStore();
    const navigate = useNavigate();

    const handleRealmClick = (realmId: RealmId) => {
        const realm = defaultRealms.find(r => r.id === realmId);
        if (realm) {
            setActiveRealmId(realmId);
            navigate(realm.primaryPath);
        }
    };
    
    // Create a sorted list of realms based on the custom order
    const sortedRealms = React.useMemo(() => {
        return realmOrder
            .map(id => defaultRealms.find(r => r.id === id))
            .filter((r): r is NonNullable<typeof r> => !!r);
    }, [realmOrder]);

    return (
        <nav className="flex items-center justify-center flex-grow">
            <div className="flex space-x-2 bg-matrix-bg/50 backdrop-blur-xl p-1 border border-matrix-cyan/20 rounded-lg">
                {sortedRealms.map(realm => (
                    <button
                        key={realm.id}
                        onClick={() => handleRealmClick(realm.id)}
                        className={`px-4 py-1.5 text-center rounded-md transition-all duration-200
                            ${activeRealmId === realm.id
                                ? 'bg-matrix-cyan/20 text-matrix-cyan font-semibold shadow-md'
                                : 'text-matrix-light hover:bg-matrix-dark/50 hover:text-white'
                            }`
                        }
                    >
                        <BilingualLabel label={realm.name} layout="block" primaryClassName="text-sm" />
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default TopNavBar;