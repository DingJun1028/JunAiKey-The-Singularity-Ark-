import React, { useState } from 'react';
import { useNoteStore } from '../store/noteStore';
import { useSummonerStore } from '../store/summonerStore';

interface QuickNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickNoteModal: React.FC<QuickNoteModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useNoteStore();
  const { actions: summonerActions } = useSummonerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Default tags for a quick note
    addNote({ title, content, tags: ['quick-note', 'unsorted'] });
    
    // Grant EXP for creation
    summonerActions.addExp('sylfa', 15); // Growth (less than full editor)
    summonerActions.addExp('anima', 10); // Essence
    
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-matrix-bg/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in-fast" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-note-title"
    >
      <div 
        className="bg-matrix-bg-2 border border-matrix-cyan rounded-lg shadow-lg w-full max-w-lg p-6 m-4 animate-fade-in" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 id="quick-note-title" className="text-xl text-matrix-cyan font-bold">快速筆記</h2>
            <button onClick={onClose} className="text-matrix-dark hover:text-matrix-light text-3xl font-bold">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="quick-note-title-input" className="block text-matrix-light mb-2">標題</label>
            <input
              id="quick-note-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
              required
            />
          </div>
          <div>
            <label htmlFor="quick-note-content-input" className="block text-matrix-light mb-2">內容</label>
            <textarea
              id="quick-note-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan h-32 resize-y"
              required
            />
          </div>
          <div className="flex justify-end">
            <button 
                type="submit"
                className="bg-matrix-green text-matrix-bg font-bold py-2 px-6 rounded-md transition-all hover:bg-opacity-90 shadow-matrix-glow"
            >
              儲存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickNoteModal;