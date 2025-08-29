import React, { useState, useMemo } from 'react';
import type { Note } from '../types';
import { formatMarkdown } from '../utils/markdown';
import Card, { CardBody, CardFooter } from './Card';
import NotesIcon from './icons/NotesIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import BilingualLabel from './BilingualLabel';

interface OmniNoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
  onEdit: (note: Note) => void;
}

const OmniNoteCard: React.FC<OmniNoteCardProps> = ({ note, onDelete, onTagClick, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`您確定要刪除筆記「${note.title}」嗎？ (Are you sure you want to delete the note "${note.title}"?)`)) {
      onDelete(note.id);
    }
  };

  const memoizedMarkdown = useMemo(() => formatMarkdown(note.content), [note.content]);

  return (
    <Card className="flex flex-col" id={`note-card-${note.id}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-cyan rounded-t-lg"
        aria-expanded={isExpanded}
        aria-controls={`note-content-${note.id}`}
      >
        <div className="flex items-center gap-3 p-4">
            <NotesIcon className="w-6 h-6 text-matrix-cyan flex-shrink-0" />
            <div className="flex-grow overflow-hidden">
                <h3 className="text-matrix-light font-semibold truncate" title={note.title}>{note.title}</h3>
                <p className="text-xs text-matrix-dark uppercase tracking-wider">Note</p>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-matrix-light transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isExpanded && (
        <div id={`note-content-${note.id}`} className="animate-fade-in-fast">
          <CardBody>
            <div
              className="text-matrix-light break-words prose-styles max-h-96 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: memoizedMarkdown }}
            />
          </CardBody>
          <CardFooter>
            {note.tags && note.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                {note.tags.map(tag => (
                    <button
                    key={tag}
                    onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
                    className="text-xs bg-matrix-dark/50 text-matrix-cyan px-2 py-1 rounded-full transition-all duration-200 hover:bg-matrix-cyan hover:text-matrix-bg hover:scale-110 hover:shadow-md hover:shadow-matrix-cyan/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-cyan"
                    aria-label={`篩選標籤：${tag}`}
                    >
                    #{tag}
                    </button>
                ))}
                </div>
            )}
            <div className="flex justify-between items-center text-xs text-matrix-dark">
              <span>{new Date(note.createdAt).toLocaleString()}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                  className="flex items-center space-x-1 text-matrix-cyan hover:text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-cyan rounded"
                  aria-label={`編輯筆記：${note.title}`}
                >
                  <PencilIcon className="w-4 h-4" />
                  <BilingualLabel label="編輯 (Edit)" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-400 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                  aria-label={`刪除筆記：${note.title}`}
                >
                  <TrashIcon className="w-4 h-4" />
                  <BilingualLabel label="刪除 (Delete)" />
                </button>
              </div>
            </div>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

export default OmniNoteCard;
