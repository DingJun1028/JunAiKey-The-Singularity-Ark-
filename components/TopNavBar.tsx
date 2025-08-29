import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationStore } from '../store/navigationStore';
import { realms } from '../core/navigation';
import type { RealmId } from '../types';

const TopNavBar: React.FC = () => {
    const { activeRealmId, setActiveRealmId } = useNavigationStore();
    const navigate = useNavigate();

    const handleRealmClick = (realmId: RealmId) => {
        const realm = realms.find(r => r.id === realmId);
        if (realm) {
            setActiveRealmId(realmId);
            navigate(realm.primaryPath);
        }
    };

    return (
        <nav className="flex items-center justify-center flex-grow">
            <div className="flex space-x-2 bg-matrix-bg p-1 border border-matrix-dark/50 rounded-lg">
                {realms.map(realm => {
                    const realmNameMatch = realm.name.match(/(.+)\s\((.+)\)/);
                    const chineseName = realmNameMatch ? realmNameMatch[1] : realm.name;
                    const englishName = realmNameMatch ? realmNameMatch[2] : null;

                    return (
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
                            <div className="flex flex-col leading-tight">
                                <span className="font-medium text-sm">{chineseName}</span>
                                {englishName && (
                                    <span className="text-xs text-matrix-dark/80 mt-0.5">{englishName}</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default TopNavBar;