import React, { useState, useRef, useMemo, useEffect } from 'react';
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

const VIEW_MODE_KEY = 'junaikey-omninote-view';
type ViewMode = 'grid' | 'list';

const OmniNotePage: React.FC = () => {
  const { notes, addNote, deleteNote, updateNote } = useNoteStore();
  const { actions: summonerActions } = useSummonerStore();
  const [draft, setDraft, clearDraft] = useNoteDraft();
  const { title, content, tags } = draft;

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [showForm, setShowForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return (localStorage.getItem(VIEW_MODE_KEY) as ViewMode) || 'list';
  });

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  const handleUpdateDraft = (field: keyof typeof draft, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      if (editingNoteId) {
        updateNote(editingNoteId, { title, content, tags: tagArray });
        // Grant EXP for refining knowledge
        summonerActions.addExp('sylfa', 10); // Growth
        summonerActions.addExp('anima', 5);  // Essence
      } else {
        addNote({ title, content, tags: tagArray });
        // Grant EXP for creation
        summonerActions.addExp('sylfa', 50); // Growth
        summonerActions.addExp('anima', 25); // Essence
      }

      clearDraft();
      setShowForm(false);
      setEditingNoteId(null);
    }
  };

  const handleToggleForm = () => {
    if (showForm) {
      // Always clear state when cancelling
      setShowForm(false);
      setEditingNoteId(null);
      clearDraft();
    } else {
      // Open for a new note
      setEditingNoteId(null);
      clearDraft(); // Ensure a blank slate
      setShowForm(true);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setDraft({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleGenerateTags = async () => {
    if (!title.trim() && !content.trim()) {
      alert("請先輸入標題或內容才能生成標籤。");
      return;
    }
    setIsGeneratingTags(true);
    try {
      const generated = await generateTags(title, content);
      handleUpdateDraft('tags', generated.join(', '));
      // Grant EXP for using AI
      summonerActions.addExp('machina', 30); // Machine
      summonerActions.addExp('aquare', 15); // Thought
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
    } else { // prefix
        const selectedText = content.substring(start, end);
        const lines = selectedText.split('\n');
        const newLines = lines.map(line => line.startsWith(prefix) ? line.substring(prefix.length) : prefix + line).join('\n');
        newContent = content.substring(0, start) + newLines + content.substring(end);
        newSelectionStart = start;
        newSelectionEnd = start + newLines.length;
    }

    setDraft(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };

  // FIX: Memoize and defensively calculate allTags to prevent type errors from malformed persisted data.
  const allTags = useMemo(() => {
    // Defensively handle cases where note.tags might be missing or malformed from persisted data.
    // This ensures that `allTags` is always `string[]`.
    const tags = notes.flatMap(note => {
        if (note && Array.isArray(note.tags)) {
            // Ensure every item in the tags array is a string before returning it.
            return note.tags.filter(tag => typeof tag === 'string');
        }
        return []; // Return an empty array for invalid notes or tags.
    });
    return [...new Set(tags)].sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        // Tag filtering
        if (!activeTag) return true;
        // Defensively check for tags array
        return (note.tags || []).includes(activeTag);
      })
      .filter(note => {
        // Search filtering
        if (!debouncedSearchQuery.trim()) return true;
        const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
        return (
          note.title.toLowerCase().includes(lowerCaseQuery) ||
          note.content.toLowerCase().includes(lowerCaseQuery) ||
          // Defensively check for tags array
          (note.tags || []).some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        );
      });
  }, [notes, activeTag, debouncedSearchQuery]);

  return (
    <div className="animate-fade-in">
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
                  <MarkdownToolbar onAction={handleToolbarAction} />
                  <textarea
                      id="content"
                      ref={contentRef}
                      value={content}
                      onChange={(e) => handleUpdateDraft('content', e.target.value)}
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
                    <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => handleUpdateDraft('tags', e.target.value)}
                        className="flex-1 p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                        placeholder="例如：人工智慧, 哲學, Alpha專案"
                    />
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

      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "grid grid-cols-1 gap-4"}>
        {filteredNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(note => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} onTagClick={setActiveTag} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default OmniNotePage;