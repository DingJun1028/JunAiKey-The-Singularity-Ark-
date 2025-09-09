
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
// FIX: Updated react-router-dom import for v6/v7 compatibility.
import { useLocation, useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/noteStore';
import PageHeader from '../components/PageHeader';
import NotesIcon from '../components/icons/NotesIcon';
import OmniNoteCard from '../components/OmniNoteCard';
import { useDebounce } from '../hooks/useDebounce';
import { useFilteredNotes } from '../hooks/useFilteredNotes';
import type { Note } from '../types';
import SearchIcon from '../components/icons/SearchIcon';
import GridIcon from '../components/icons/GridIcon';
import ListIcon from '../components/icons/ListIcon';
import Card from '../components/Card';
import OmniClipboard from '../components/OmniClipboard';
import XIcon from '../components/icons/XIcon';
import NoteEditor from '../components/NoteEditor';
import VirtualizedList from '../components/VirtualizedList';
import NoteCardSkeleton from '../components/NoteCardSkeleton';

const VIEW_MODE_KEY = 'junaikey-omninote-view';
type ViewMode = 'grid' | 'list';

const OmniNotePage: React.FC = () => {
  const { deleteNote } = useNoteStore();
  
  const location = useLocation();
  // FIX: Updated useHistory to useNavigate for v6/v7 compatibility.
  const navigate = useNavigate();

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(VIEW_MODE_KEY) as ViewMode) || 'list';
  });
  const [expandedNoteIds, setExpandedNoteIds] = useState<Set<string>>(new Set());


  const filteredNotes = useFilteredNotes(activeTag, debouncedSearchQuery);

  const handleToggleExpand = (noteId: string) => {
    setExpandedNoteIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(noteId)) {
            newSet.delete(noteId);
        } else {
            newSet.add(noteId);
        }
        return newSet;
    });
  };

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    setSearchQuery(''); // Clear search query for immediate tag filtering
  };

  useEffect(() => {
    // Show searching indicator only while debouncing
    if (searchQuery !== debouncedSearchQuery) {
        setIsSearching(true);
    } else {
        setIsSearching(false);
    }
  }, [searchQuery, debouncedSearchQuery]);


  useEffect(() => {
    const state = location.state as { showForm?: boolean; filterTag?: string; focusSearch?: boolean; scrollTo?: string };
    if (state) {
      if (state.showForm) {
        setShowForm(true);
      }
      if (state.filterTag) {
        handleTagClick(state.filterTag);
      }
      if (state.focusSearch) {
        searchInputRef.current?.focus();
      }
      if (state.scrollTo) {
         const noteId = state.scrollTo;
         setExpandedNoteIds(prev => new Set(prev).add(noteId));
         setTimeout(() => {
          const element = document.getElementById(`note-card-${noteId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100); // Short delay for render
      }
      // Clear state after handling
      // FIX: Updated history.replace to navigate for v6/v7 compatibility.
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);
  
  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);
  
  const handleEdit = useCallback((note: Note) => {
    setEditingNote(note);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFormClose = () => {
    setShowForm(false);
    setEditingNote(null);
  };
  
  const allTags = useMemo(() => {
    const tagsSet = useNoteStore.getState().notes.reduce((acc, note: Note) => {
      (note.tags || []).forEach(tag => acc.add(tag));
      return acc;
    }, new Set<string>());
    return Array.from(tagsSet).sort();
  }, [useNoteStore.getState().notes.length]); // Re-calculate only when note count changes

  const handleDraftFromClip = useCallback((clipText: string) => {
    const newNote: Note = {
      id: '', // will be set by NoteEditor
      title: clipText.split('\n')[0].trim().substring(0, 100) || '來自剪貼簿的新筆記',
      content: clipText,
      tags: ['omni-clipboard'],
      createdAt: '', updatedAt: ''
    };
    setEditingNote(newNote);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const renderNoteCard = useCallback((note: Note, style?: React.CSSProperties) => (
     <OmniNoteCard
        key={note.id}
        note={note}
        onDelete={deleteNote}
        onTagClick={handleTagClick}
        onEdit={handleEdit}
        isExpanded={expandedNoteIds.has(note.id)}
        onToggleExpand={() => handleToggleExpand(note.id)}
        style={style}
    />
  ), [deleteNote, handleEdit, expandedNoteIds, handleToggleExpand]);

  const getItemHeight = useCallback((note: Note): number => {
    // Estimate height: 80px for collapsed, 400px for expanded. This can be fine-tuned.
    return expandedNoteIds.has(note.id) ? 400 : 80;
  }, [expandedNoteIds]);

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <PageHeader 
        title="萬能筆記系統"
        subtitle="萬象智慧的源泉。捕捉並管理您的思緒。"
        icon={<NotesIcon className="w-8 h-8"/>}
      />
      
      <OmniClipboard onDraftFromClip={handleDraftFromClip} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-matrix-dark" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`在 ${useNoteStore.getState().notes.length} 則筆記中搜尋...`}
            className="w-full p-3 pl-10 pr-10 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
            aria-label="搜尋筆記"
          />
           {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); handleTagClick(null); }}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-matrix-dark hover:text-matrix-light"
              aria-label="Clear search"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-shrink-0 flex items-center justify-end space-x-2 bg-matrix-bg p-1 border border-matrix-dark/50 rounded-md">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}
            title="列表視圖" aria-pressed={viewMode === 'list'} >
            <ListIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}
            title="網格視圖" aria-pressed={viewMode === 'grid'} >
            <GridIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {allTags.length > 0 && (
        <Card className="mb-6 p-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-bold text-matrix-light mr-2">萬能標籤節點:</span>
            {allTags.map(tag => (
              <button 
                key={tag} onClick={() => handleTagClick(tag)}
                className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${ activeTag === tag ? 'bg-matrix-cyan text-matrix-bg font-bold shadow-matrix-glow-cyan scale-105' : 'bg-matrix-dark/50 text-matrix-cyan hover:bg-matrix-cyan hover:text-matrix-bg hover:scale-105' }`}
                aria-pressed={activeTag === tag} >
                {tag}
              </button>
            ))}
            {activeTag && (
              <button onClick={() => handleTagClick(null)} className="text-xs text-red-400 hover:text-red-300 font-semibold ml-2" aria-label="清除標籤篩選">
                清除篩選
              </button>
            )}
          </div>
        </Card>
      )}

      <div className="mb-6">
        <button onClick={() => setShowForm(prev => !prev)} className="bg-matrix-cyan text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow-cyan" >
          {showForm ? '取消' : '建立新筆記'}
        </button>

        {showForm && (
          <NoteEditor
            note={editingNote}
            onClose={handleFormClose}
            allTags={allTags}
          />
        )}
      </div>

      <div className="flex-1 min-h-0">
        {isSearching && (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" 
            : "flex flex-col gap-4"}>
              {[...Array(6)].map((_, i) => <NoteCardSkeleton key={i} isGridMode={viewMode === 'grid'} />)}
          </div>
        )}
        {!isSearching && filteredNotes.length > 0 && (
            viewMode === 'list' ? (
                <VirtualizedList
                    items={filteredNotes}
                    renderItem={(note, style) => renderNoteCard(note, style)}
                    getItemHeight={getItemHeight}
                    containerHeight="100%"
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredNotes.map(note => renderNoteCard(note))}
                </div>
            )
        )}
        {!isSearching && filteredNotes.length === 0 && (
          <div className="col-span-full text-center py-8 text-matrix-dark">
            <p>無符合條件之筆記。</p>
            <p className="text-sm">請嘗試調整您的篩選或搜尋條件。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OmniNotePage;
