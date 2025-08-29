import React, { useState } from 'react';
import type { Note } from '../types';
import { formatMarkdown } from '../utils/markdown';
import ChevronDownIcon from './icons/ChevronDownIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
  onEdit: (note: Note) => void;
}

const NoteCardComponent: React.FC<NoteCardProps> = ({ note, onDelete, onTagClick, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`您確定要刪除筆記「${note.title}」嗎？ (Are you sure you want to delete the note "${note.title}"?)`)) {
      onDelete(note.id);
    }
  };
  
  const memoizedMarkdown = React.useMemo(() => formatMarkdown(note.content), [note.content]);
  
  return (
    <div 
      id={`note-card-${note.id}`}
      className="bg-matrix-bg/50 border border-matrix-dark/30 rounded-lg flex flex-col transition-shadow hover:shadow-lg hover:border-matrix-dark/50 overflow-hidden h-full"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 w-full text-left flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-matrix-cyan focus:ring-inset"
        aria-expanded={isExpanded}
        aria-controls={`note-content-${note.id}`}
      >
        <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-matrix-cyan break-words">{note.title}</h3>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-matrix-light transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div id={`note-content-${note.id}`} className="px-4 pb-4 animate-fade-in-fast">
          <div className="border-t border-matrix-dark/30 pt-4">
            <div 
              className="text-matrix-light break-words prose-styles"
              dangerouslySetInnerHTML={{ __html: memoizedMarkdown }} 
            />
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="text-xs bg-matrix-dark/50 text-matrix-cyan px-2 py-1 rounded-full transition-all duration-200 hover:bg-matrix-cyan hover:text-matrix-bg hover:scale-110 hover:shadow-md hover:shadow-matrix-cyan/50"
                  aria-label={`篩選標籤：${tag}`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
          <div className="mt-4 pt-2 border-t border-matrix-dark/20 flex justify-between items-center text-xs text-matrix-dark">
            <span>{new Date(note.createdAt).toLocaleString()}</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onEdit(note)}
                className="flex items-center space-x-1 text-matrix-cyan hover:text-white font-semibold transition-colors"
                aria-label={`編輯筆記：${note.title}`}
              >
                <PencilIcon className="w-4 h-4" />
                <span>編輯 (Edit)</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-1 text-red-500 hover:text-red-400 font-semibold transition-colors"
                aria-label={`刪除筆記：${note.title}`}
              >
                <TrashIcon className="w-4 h-4" />
                <span>刪除 (Delete)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NoteCard = React.memo(NoteCardComponent);
export default NoteCard;