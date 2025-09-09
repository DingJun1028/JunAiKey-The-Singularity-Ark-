import React from 'react';
import { useFavoriteStore } from '../store/favoriteStore';
import { allAvailableActions } from '../core/actions';
import BilingualLabel from './BilingualLabel';
import StarIcon from './icons/StarIcon'; // Assuming a StarIcon exists or will be created

interface ManageFavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageFavoritesModal: React.FC<ManageFavoritesModalProps> = ({ isOpen, onClose }) => {
  const { favoriteIds, actions } = useFavoriteStore();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-favorites-title"
    >
      <div 
        className="bg-matrix-bg-2 border border-matrix-cyan rounded-lg shadow-lg w-full max-w-lg p-6 m-4 flex flex-col" 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '80vh' }}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 id="manage-favorites-title" className="text-xl text-matrix-cyan font-bold">
                <BilingualLabel label="管理我的最愛 (Manage Favorites)" />
            </h2>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-3xl font-bold">&times;</button>
        </div>
        
        <p className="text-sm text-matrix-dark mb-4 flex-shrink-0">
            <BilingualLabel label="點擊星號以新增或移除您的快速操作選單項目。(Click a star to add or remove items from your quick action menu.)" />
        </p>

        <div className="flex-grow min-h-0 overflow-y-auto pr-2">
            <ul className="space-y-2">
                {allAvailableActions.map(action => {
                    const isFavorite = favoriteIds.includes(action.id);
                    const Icon = action.icon;
                    return (
                        <li key={action.id} className="flex items-center justify-between p-2 bg-matrix-bg/50 rounded-md">
                            <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-matrix-light" />
                                <BilingualLabel label={action.label} />
                            </div>
                            <button 
                                onClick={() => actions.toggleFavorite(action.id)}
                                className="p-2 rounded-full hover:bg-matrix-dark/50"
                                aria-label={isFavorite ? `從我的最愛移除 ${action.label}` : `新增 ${action.label} 到我的最愛`}
                                aria-pressed={isFavorite}
                            >
                                <StarIcon className={`w-6 h-6 transition-colors ${isFavorite ? 'text-yellow-400 fill-current' : 'text-matrix-dark'}`} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageFavoritesModal;
