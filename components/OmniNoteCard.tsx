<<<<<<< HEAD
import React, { useMemo, useState } from 'react';
import type { Note } from '../types';
import { formatMarkdown, stripMarkdown } from '../utils/markdown';
=======
import React, { useMemo } from 'react';
import type { Note } from '../types';
import { formatMarkdown } from '../utils/markdown';
>>>>>>> feature-branch
import Card, { CardBody, CardFooter } from './Card';
import NotesIcon from './icons/NotesIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import BilingualLabel from './BilingualLabel';
<<<<<<< HEAD
import ExportIcon from './icons/ExportIcon';
import XIcon from './icons/XIcon';
import { sanitizeFilename } from '../utils/text';
=======
>>>>>>> feature-branch

interface OmniNoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTagClick: (tag: string) => void;
  onEdit: (note: Note) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
<<<<<<< HEAD
  style?: React.CSSProperties; // Added for virtualization
}

const OmniNoteCard: React.FC<OmniNoteCardProps> = ({ note, onDelete, onTagClick, onEdit, isExpanded, onToggleExpand, style }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
=======
}

const OmniNoteCard: React.FC<OmniNoteCardProps> = ({ note, onDelete, onTagClick, onEdit, isExpanded, onToggleExpand }) => {
>>>>>>> feature-branch

  const handleDelete = () => {
    if (window.confirm(`您確定要刪除筆記「${note.title}」嗎？ (Are you sure you want to delete the note "${note.title}"?)`)) {
      onDelete(note.id);
    }
  };
<<<<<<< HEAD
  
  const handleExport = (format: 'md' | 'txt') => {
    const content = format === 'txt' ? stripMarkdown(note.content) : note.content;
    const filename = `${sanitizeFilename(note.title)}.${format}`;
    const blob = new Blob([content], { type: format === 'md' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    setShowExportOptions(false); // Hide options after export
  };

=======
>>>>>>> feature-branch

  const memoizedMarkdown = useMemo(() => formatMarkdown(note.content), [note.content]);

  return (
<<<<<<< HEAD
    <div style={style}>
        <Card className="flex flex-col h-full" id={`note-card-${note.id}`}>
        <button
            onClick={onToggleExpand}
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
            <div id={`note-content-${note.id}`} className="animate-fade-in-fast flex flex-col flex-grow">
            <CardBody className="flex-grow">
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
                <div className="flex items-center space-x-2 sm:space-x-4">
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
                    
                    {/* Self-contained export section */}
                    <div className="flex items-center space-x-2">
                        {showExportOptions && (
                            <div className="flex items-center space-x-2 animate-fade-in-fast bg-matrix-bg p-1 rounded-md border border-matrix-dark/50">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleExport('md'); }}
                                    className="px-3 py-1 bg-matrix-bg border border-matrix-cyan text-matrix-cyan rounded hover:bg-matrix-cyan hover:text-matrix-bg transition-colors text-xs font-semibold"
                                    title="匯出為 Markdown"
                                >
                                    .md
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleExport('txt'); }}
                                    className="px-3 py-1 bg-matrix-bg border border-matrix-light text-matrix-light rounded hover:bg-matrix-light hover:text-matrix-bg transition-colors text-xs font-semibold"
                                    title="匯出為純文字"
                                >
                                    .txt
                                </button>
                            </div>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowExportOptions(!showExportOptions); }}
                            className="flex items-center space-x-1 text-matrix-light hover:text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-matrix-cyan rounded"
                            aria-label={showExportOptions ? '取消匯出' : `匯出筆記：${note.title}`}
                        >
                            {showExportOptions 
                                ? <XIcon className="w-4 h-4" /> 
                                : <><ExportIcon className="w-4 h-4" /> <BilingualLabel label="匯出" /></>
                            }
                        </button>
                    </div>
                </div>
                </div>
            </CardFooter>
            </div>
        )}
        </Card>
    </div>
  );
};

export default React.memo(OmniNoteCard);
=======
    <Card className="flex flex-col" id={`note-card-${note.id}`}>
      <button
        onClick={onToggleExpand}
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
>>>>>>> feature-branch
