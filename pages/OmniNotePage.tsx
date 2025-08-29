import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/noteStore';
import Header from '../components/Header';
import NotesIcon from '../components/icons/NotesIcon';
import NoteCard from '../components/NoteCard';
import SparkleIcon from '../components/icons/SparkleIcon';
import { generateTags } from '../services/geminiService';
import { useNoteDraft } from '../hooks/useNoteDraft';
import MarkdownToolbar from '../components/MarkdownToolbar';
import { formatMarkdown } from '../utils/markdown';
import { useSummonerStore } from '../store/summonerStore';
import SearchIcon from '../components/icons/SearchIcon';
import { useDebounce } from '../hooks/useDebounce';
import GridIcon from '../components/icons/GridIcon';
import ListIcon from '../components/icons/ListIcon';
import type { Note } from '../types';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { useFilteredNotes } from '../hooks/useFilteredNotes';

const VIEW_MODE_KEY = 'junaikey-omninote-view';
type ViewMode = 'grid' | 'list';

const OmniNotePage: React.FC = () => {
  const { notes, addNote, deleteNote, updateNote } = useNoteStore();
  const { actions: summonerActions } = useSummonerStore();
  const [draft, setDraft, clearDraft] = useNoteDraft();
  const { title, tags } = draft;
  
  const { state: content, setState: setContent, undo, redo, reset: resetContentHistory, canUndo, canRedo } = useUndoRedo(draft.content);

  const location = useLocation();
  const navigate = useNavigate();

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [showForm, setShowForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const tagSuggestionsRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(VIEW_MODE_KEY) as ViewMode) || 'list';
  });

  const filteredNotes = useFilteredNotes(activeTag, debouncedSearchQuery);

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
        setActiveTag(state.filterTag);
      }
      if (state.focusSearch) {
        searchInputRef.current?.focus();
      }
      if (state.scrollTo) {
         setTimeout(() => {
          const element = document.getElementById(`note-card-${state.scrollTo}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
      // Clear state after handling
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    // Syncs the undoable content state back to the main draft state for autosave.
    setDraft(prev => {
        if (prev.content === content) return prev;
        return { ...prev, content };
    });
  }, [content, setDraft]);

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);
  
  useEffect(() => {
    if (tagSuggestionsRef.current && activeSuggestionIndex >= 0) {
        const list = tagSuggestionsRef.current;
        const item = list.children[activeSuggestionIndex] as HTMLLIElement;
        if (item) {
            item.scrollIntoView({ block: 'nearest' });
        }
    }
  }, [activeSuggestionIndex]);


  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isModifier = e.ctrlKey || e.metaKey;
    if (!isModifier) return;

    const key = e.key.toLowerCase();
    let handled = false;
    
    // Redo: (Ctrl|Cmd)+Y or (Ctrl|Cmd)+Shift+Z
    if ((key === 'y' && !e.shiftKey) || (key === 'z' && e.shiftKey)) {
        redo();
        handled = true;
    }
    // Undo: (Ctrl|Cmd)+Z
    else if (key === 'z' && !e.shiftKey) {
        undo();
        handled = true;
    }

    if (handled) {
        e.preventDefault();
    }
  };


  const handleUpdateDraft = (field: keyof Omit<typeof draft, 'content'>, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      if (editingNoteId) {
        updateNote(editingNoteId, { title, content, tags: tagArray });
        summonerActions.addExp('sylfa', 10);
        summonerActions.addExp('anima', 5);
      } else {
        addNote({ title, content, tags: tagArray });
        summonerActions.addExp('sylfa', 50);
        summonerActions.addExp('anima', 25);
      }

      clearDraft();
      setShowForm(false);
      setEditingNoteId(null);
      resetContentHistory('');
    }
  };

  const handleToggleForm = () => {
    if (showForm) {
      setShowForm(false);
      setEditingNoteId(null);
      clearDraft();
      resetContentHistory('');
    } else {
      setEditingNoteId(null);
      clearDraft();
      resetContentHistory('');
      setShowForm(true);
    }
  };

  const handleEdit = useCallback((note: Note) => {
    setEditingNoteId(note.id);
    setDraft({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
    resetContentHistory(note.content);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setDraft, resetContentHistory]);
  
  const handleGenerateTags = async () => {
    if (!title.trim() && !content.trim()) {
      alert("請先輸入標題或內容才能生成標籤。");
      return;
    }
    setIsGeneratingTags(true);
    try {
      const generated = await generateTags(title, content);
      handleUpdateDraft('tags', generated.join(', '));
      summonerActions.addExp('machina', 30);
      summonerActions.addExp('aquare', 15);
    } catch (error) {
      console.error(error);
      alert("標籤生成失敗，請稍後再試。");
    } finally {
      setIsGeneratingTags(false);
    }
  };

  const handleToolbarAction = (type: 'wrap' | 'prefix', prefix: string, suffix: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    let newContent;
    let newSelectionStart;
    let newSelectionEnd;

    if (type === 'wrap') {
        newContent = `${content.substring(0, start)}${prefix}${selected}${suffix}${content.substring(end)}`;
        newSelectionStart = start + prefix.length;
        newSelectionEnd = end + prefix.length;
    } else {
        const selectedText = content.substring(start, end);
        const lines = selectedText.split('\n');
        const newLines = lines.map(line => line.startsWith(prefix) ? line.substring(prefix.length) : prefix + line).join('\n');
        newContent = content.substring(0, start) + newLines + content.substring(end);
        newSelectionStart = start;
        newSelectionEnd = start + newLines.length;
    }

    setContent(newContent);

    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleUpdateDraft('tags', value);

    const tagsArray = value.split(',');
    const currentTagPart = tagsArray[tagsArray.length - 1].trim().toLowerCase();
    
    if (currentTagPart) {
        const existingTags = tagsArray.slice(0, -1).map(t => t.trim().toLowerCase());
        const filtered = allTags.filter(t => 
            t.toLowerCase().startsWith(currentTagPart) && !existingTags.includes(t.toLowerCase())
        );
        setTagSuggestions(filtered);
        setActiveSuggestionIndex(filtered.length > 0 ? 0 : -1);
    } else {
        setTagSuggestions([]);
        setActiveSuggestionIndex(-1);
    }
  };

  const handleSelectTag = (tag: string) => {
    const tagsArray = tags.split(',').map(t => t.trim());
    tagsArray[tagsArray.length - 1] = tag;
    const newValue = tagsArray.join(', ') + ', ';
    handleUpdateDraft('tags', newValue);
    setTagSuggestions([]);
    setTimeout(() => tagInputRef.current?.focus(), 0);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex(prev => (prev + 1) % tagSuggestions.length);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex(prev => (prev - 1 + tagSuggestions.length) % tagSuggestions.length);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
        if (activeSuggestionIndex > -1 && tagSuggestions[activeSuggestionIndex]) {
            e.preventDefault();
            handleSelectTag(tagSuggestions[activeSuggestionIndex]);
        }
    } else if (e.key === 'Escape') {
        setTagSuggestions([]);
    }
  };

  const allTags = useMemo(() => {
    const tags = notes.flatMap(note => {
        if (note && Array.isArray(note.tags)) {
            return note.tags.filter(tag => typeof tag === 'string');
        }
        return [];
    });
    return [...new Set(tags)].sort();
  }, [notes]);

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <Header 
        title="萬能筆記系統"
        subtitle="萬象智慧的源泉。捕捉並管理您的思緒。"
        icon={<NotesIcon className="w-8 h-8"/>}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-matrix-dark" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋標題、內容或標籤..."
            className="w-full p-3 pl-10 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
            aria-label="搜尋筆記"
          />
        </div>

        <div className="flex-shrink-0 flex items-center justify-end space-x-2 bg-matrix-bg p-1 border border-matrix-dark/50 rounded-md">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}
            title="列表視圖"
            aria-pressed={viewMode === 'list'}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-matrix-cyan/20 text-matrix-cyan' : 'text-matrix-light hover:bg-matrix-dark/50'}`}
            title="網格視圖"
            aria-pressed={viewMode === 'grid'}
          >
            <GridIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {allTags.length > 0 && (
        <div className="mb-6 p-4 bg-matrix-bg/30 border border-matrix-dark/30 rounded-lg">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-bold text-matrix-light mr-2">萬能標籤節點:</span>
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-matrix-cyan text-matrix-bg font-bold shadow-matrix-glow-cyan scale-105'
                    : 'bg-matrix-dark/50 text-matrix-cyan hover:bg-matrix-cyan hover:text-matrix-bg hover:scale-105'
                }`}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
            {activeTag && (
              <button 
                onClick={() => setActiveTag(null)}
                className="text-xs text-red-400 hover:text-red-300 font-semibold ml-2"
                aria-label="清除標籤篩選"
              >
                清除篩選
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={handleToggleForm}
          className="bg-matrix-cyan text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow-cyan"
        >
          {showForm ? '取消' : '建立新筆記'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 p-4 bg-matrix-bg-2/50 border border-matrix-dark/30 rounded-lg animate-fade-in">
            <div className="mb-4">
              <label htmlFor="title" className="block text-matrix-light mb-2">標題</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => handleUpdateDraft('title', e.target.value)}
                className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-matrix-light mb-2">內容</label>
              <div className="flex flex-col md:flex-row border border-matrix-dark/50 rounded-md" style={{ minHeight: '400px' }}>
                <div className="w-full md:w-1/2 flex flex-col">
                  <MarkdownToolbar onAction={handleToolbarAction} onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} />
                  <textarea
                      id="content"
                      ref={contentRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={handleContentKeyDown}
                      className="flex-grow w-full p-4 bg-matrix-bg focus:outline-none font-mono text-matrix-light resize-none"
                      style={{ minHeight: '200px' }}
                      required
                      placeholder="在此輸入您的 Markdown..."
                  />
                </div>
                <div className="w-full md:w-1/2 p-4 bg-matrix-bg/50 border-t md:border-t-0 md:border-l border-matrix-dark/50 overflow-y-auto flex items-center justify-center" style={{ minHeight: '200px' }}>
                  {content ? (
                      <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}/>
                  ) : (
                      <p className="text-matrix-dark">Markdown 預覽將在此處顯示</p>
                  )}
                </div>
              </div>
            </div>
             <div className="mb-4">
                <label htmlFor="tags" className="block text-matrix-light mb-2">標籤</label>
                 <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <input
                          id="tags"
                          ref={tagInputRef}
                          type="text"
                          value={tags}
                          onChange={handleTagsChange}
                          onKeyDown={handleTagKeyDown}
                          onBlur={() => setTimeout(() => setTagSuggestions([]), 150)}
                          className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                          placeholder="例如：人工智慧, 哲學, Alpha專案"
                          autoComplete="off"
                      />
                      {tagSuggestions.length > 0 && (
                        <ul ref={tagSuggestionsRef} className="absolute z-10 w-full mt-1 bg-matrix-bg-2 border border-matrix-dark/50 rounded-md shadow-lg max-h-40 overflow-y-auto">
                          {tagSuggestions.map((tag, index) => (
                              <li
                                  key={tag}
                                  className={`px-3 py-2 cursor-pointer ${index === activeSuggestionIndex ? 'bg-matrix-cyan/20' : 'hover:bg-matrix-dark/50'}`}
                                  onMouseDown={() => handleSelectTag(tag)}
                              >
                                  {tag}
                              </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                        type="button"
                        onClick={handleGenerateTags}
                        disabled={isGeneratingTags || (!title.trim() && !content.trim())}
                        className="flex items-center space-x-2 bg-matrix-cyan/80 text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-matrix-cyan transition-all shadow-matrix-glow-cyan disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-not-allowed"
                        title="自動生成標籤"
                    >
                        <SparkleIcon className="w-5 h-5" />
                        <span>{isGeneratingTags ? "生成中..." : "自動生成"}</span>
                    </button>
                </div>
                <p className="text-xs text-matrix-dark mt-1">使用逗號分隔標籤。</p>
            </div>
            <button type="submit" className="bg-matrix-green text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow">
              {editingNoteId ? '更新筆記' : '儲存筆記'}
            </button>
          </form>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {isSearching && (
          <div className="text-center py-8 text-matrix-green animate-pulse">搜尋中...</div>
        )}
        {!isSearching && (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2" 
            : "flex flex-col gap-2"
          }>
            {filteredNotes.length > 0 
              ? filteredNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onTagClick={setActiveTag}
                    onEdit={handleEdit}
                  />
                ))
              : (
                <div className="col-span-full text-center py-8 text-matrix-dark">
                  <p>無符合條件之筆記。</p>
                  <p className="text-sm">請嘗試調整您的篩選或搜尋條件。</p>
                </div>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default OmniNotePage;