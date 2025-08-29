import React, { useState } from 'react';
import Header from '../components/Header';
import LayoutIcon from '../components/icons/LayoutIcon';
import { useCustomizationStore } from '../store/customizationStore';
import { useSummonerStore } from '../store/summonerStore';
import { realms as defaultRealms } from '../core/navigation';
import type { Realm, RealmId, NavItem } from '../types';
import DraggableListItem from '../components/DraggableListItem';
import BilingualLabel from '../components/BilingualLabel';


const LayoutCustomizationPage: React.FC = () => {
    const { realmOrder, sidebarOrders, setRealmOrder, setSidebarOrder } = useCustomizationStore();
    const { actions: summonerActions } = useSummonerStore();

    const [draggedItem, setDraggedItem] = useState<{ type: 'realm' | 'sidebar'; index: number; realmId?: RealmId } | null>(null);

    const handleDragStart = (type: 'realm' | 'sidebar', index: number, realmId?: RealmId) => {
        setDraggedItem({ type, index, realmId });
    };

    const handleDrop = (type: 'realm' | 'sidebar', dropIndex: number, realmId?: RealmId) => {
        if (!draggedItem || draggedItem.type !== type) return;

        let awardedExp = false;

        if (type === 'realm') {
            const newOrder = [...realmOrder];
            const [movedItem] = newOrder.splice(draggedItem.index, 1);
            newOrder.splice(dropIndex, 0, movedItem);
            if (JSON.stringify(newOrder) !== JSON.stringify(realmOrder)) {
               setRealmOrder(newOrder);
               awardedExp = true;
            }
        } else if (type === 'sidebar' && realmId && draggedItem.realmId === realmId) {
            const currentItems = sidebarOrders[realmId];
            const newItems = [...currentItems];
            const [movedItem] = newItems.splice(draggedItem.index, 1);
            newItems.splice(dropIndex, 0, movedItem);
             if (JSON.stringify(newItems) !== JSON.stringify(currentItems)) {
                setSidebarOrder(realmId, newItems);
                awardedExp = true;
            }
        }
        
        if (awardedExp) {
            summonerActions.addExp('terrax', 10); // Stability/Foundation
            summonerActions.addExp('nullis', 5); // System Integration
        }
        
        setDraggedItem(null);
    };

    const orderedRealms = realmOrder.map(id => defaultRealms.find(r => r.id === id)).filter(Boolean) as Realm[];

    return (
        <div className="animate-fade-in space-y-8">
            <Header
                title="介面佈局 (UI Layout)"
                subtitle="編織您的矩陣介面，使其完美貼合您的意志。"
                icon={<LayoutIcon className="w-8 h-8" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Realm Reordering */}
                <div className="bg-matrix-bg/30 p-6 rounded-lg border border-matrix-dark/30">
                    <h2 className="text-xl font-semibold text-matrix-cyan mb-4">
                        <BilingualLabel label="領域佈局 (Realm Layout)" />
                    </h2>
                     <p className="text-sm text-matrix-dark mb-4">拖放以重新排序頂部導覽列中的主要領域。</p>
                    <div className="space-y-2">
                        {orderedRealms.map((realm, index) => (
                            <DraggableListItem
                                key={realm.id}
                                index={index}
                                onDragStart={() => handleDragStart('realm', index)}
                                onDrop={() => handleDrop('realm', index)}
                            >
                                <BilingualLabel label={realm.name} layout="block" />
                            </DraggableListItem>
                        ))}
                    </div>
                </div>

                {/* Sidebar Reordering */}
                <div className="bg-matrix-bg/30 p-6 rounded-lg border border-matrix-dark/30">
                    <h2 className="text-xl font-semibold text-matrix-cyan mb-4">
                        <BilingualLabel label="側邊欄佈局 (Sidebar Layout)" />
                    </h2>
                    <p className="text-sm text-matrix-dark mb-4">拖放以重新排序每個領域內的側邊欄項目。</p>
                    <div className="space-y-6">
                        {orderedRealms.map(realm => (
                            <div key={realm.id}>
                                <h3 className="font-semibold text-matrix-light border-b border-matrix-dark/50 pb-2 mb-3">
                                    <BilingualLabel label={realm.name} />
                                </h3>
                                <div className="space-y-2">
                                    {(sidebarOrders[realm.id] || []).map((item, index) => (
                                        <DraggableListItem
                                            key={item.path}
                                            index={index}
                                            onDragStart={() => handleDragStart('sidebar', index, realm.id)}
                                            onDrop={() => handleDrop('sidebar', index, realm.id)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <item.icon className="w-5 h-5 text-matrix-cyan/80" />
                                                <BilingualLabel label={item.label} />
                                            </div>
                                        </DraggableListItem>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutCustomizationPage;
