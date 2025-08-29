import React from 'react';
import { useSyncStore } from '../store/syncStore';
import BilingualLabel from './BilingualLabel';

const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SyncManager: React.FC = () => {
    const { syncStatus, lastSync, syncMessage, actions } = useSyncStore();
    const isSyncing = ['syncing', 'connecting', 'pushing', 'pulling'].includes(syncStatus);

    const getStatusColor = () => {
        switch (syncStatus) {
            case 'success': return 'text-matrix-green';
            case 'error': return 'text-red-500';
            case 'syncing':
            case 'connecting':
            case 'pushing':
            case 'pulling':
                return 'text-matrix-cyan animate-pulse';
            default: return 'text-matrix-dark';
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-matrix-bg rounded-lg">
            <div className="flex-grow text-center sm:text-left">
                <p className={`text-sm font-semibold transition-colors ${getStatusColor()}`}>
                    <BilingualLabel label={syncMessage} />
                </p>
                <p className="text-xs text-matrix-dark">
                    {lastSync ? `上次同步: ${new Date(lastSync).toLocaleString()}` : '尚未同步'}
                </p>
            </div>
            <button
                onClick={actions.syncWithBoostSpace}
                disabled={isSyncing}
                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-matrix-cyan text-matrix-bg font-bold py-2 px-6 rounded-md transition-all hover:bg-opacity-90 shadow-matrix-glow-cyan disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-wait"
            >
                {isSyncing && <SpinnerIcon className="w-5 h-5"/>}
                <BilingualLabel label="同步 (Sync)" />
            </button>
        </div>
    );
};

export default SyncManager;