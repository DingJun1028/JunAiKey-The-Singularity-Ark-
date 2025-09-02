<<<<<<< HEAD

import React from 'react';
import PageHeader from '../components/PageHeader';
=======
import React from 'react';
import Header from '../components/Header';
>>>>>>> feature-branch
import ShuttleIcon from '../components/icons/ShuttleIcon';
import BilingualLabel from '../components/BilingualLabel';
import Card from '../components/Card';
import SyncManager from '../components/SyncManager';

interface AppOption {
  id: string;
  name: string;
  initial: string;
}

const apps: AppOption[] = [
    { id: 'supasend', name: 'Supasend', initial: 'Su' },
    { id: 'capacities', name: 'Capacities', initial: 'Ca' },
    { id: 'mymemo', name: 'My Memo.ai', initial: 'Me' },
    { id: 'capture', name: 'Capture', initial: 'Ca' },
    { id: 'notion', name: 'Notion', initial: 'No' },
    { id: 'evernote', name: 'Evernote', initial: 'Ev' },
];

const DataShuttlePage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
<<<<<<< HEAD
            <PageHeader 
=======
            <Header 
>>>>>>> feature-branch
              title="通用同步中樞 (Universal Sync Hub)"
              subtitle="由 Boost.space 驅動的中央數據管道。(The central data conduit, powered by Boost.space.)"
              icon={<ShuttleIcon className="w-8 h-8"/>}
            />
            
            <Card className="p-6">
                <SyncManager />
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-matrix-light mb-3 border-b border-matrix-dark/30 pb-2">
                        <BilingualLabel label="連結狀態 (Connection Status)" />
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {apps.map(app => (
                            <div key={app.id} className="flex items-center p-2 bg-matrix-bg/50 rounded-md">
                                <div className="w-8 h-8 mr-3 flex-shrink-0 bg-matrix-green/20 rounded-md flex items-center justify-center text-matrix-green font-bold text-sm">
                                    {app.initial}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium text-matrix-light text-sm">{app.name}</p>
                                    <p className="text-xs text-matrix-green">已連結</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="text-center mt-6">
                    <p className="text-sm text-matrix-dark italic">所有同步操作均通過 Boost.space 作為通用管道進行。</p>
                </div>
            </Card>

        </div>
    );
};

<<<<<<< HEAD
export default DataShuttlePage;
=======
export default DataShuttlePage;
>>>>>>> feature-branch
