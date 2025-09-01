import React, { useState, useRef, useEffect } from 'react';
import { useNoteStore } from '../store/noteStore';
import { useSummonerStore } from '../store/summonerStore';
import { generateTags } from '../services/geminiService';
import { useNoteDraft } from '../hooks/useNoteDraft';
import MarkdownToolbar from './MarkdownToolbar';
import { formatMarkdown } from '../utils/markdown';
import { useUndoRedo } from '../hooks/useUndoRedo';
import Card from './Card';
import SparkleIcon from './icons/SparkleIcon';
import type { Note } from '../types';

interface NoteEditorProps {
    note: Note | null;
    onClose: () => void;
    allTags: string[];
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onClose, allTags }) => {
    const { addNote, updateNote } = useNoteStore();
    const { actions: summonerActions } = useSummonerStore();

    const [draft, setDraft, clearDraft] = useNoteDraft();
    const { title, tags } = draft;

    const { state: content, setState: setContent, undo, redo, reset: resetContentHistory, canUndo, canRedo } = useUndoRedo(draft.content);

    const [isGeneratingTags, setIsGeneratingTags] = useState(false);
    const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const tagInputRef = useRef<HTMLInputElement>(null);
    const tagSuggestionsRef = useRef<HTMLUListElement>(null);
    
    useEffect(() => {
        if (note) {
            setDraft({
                title: note.title,
                content: note.content,
                tags: note.tags.join(', '),
            });
            resetContentHistory(note.content);
        } else {
            clearDraft();
            resetContentHistory('');
        }
    }, [note]);

    useEffect(() => {
        setDraft(prev => ({ ...prev, content }));
    }, [content]);
    
    const handleUpdateDraft = (field: keyof Omit<typeof draft, 'content'>, value: string) => {
        setDraft(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && content) {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
            if (note && note.id) { // Editing existing note
                updateNote(note.id, { title, content, tags: tagArray });
                summonerActions.addExp('sylfa', 10);
                summonerActions.addExp('anima', 5);
            } else { // Creating new note
                addNote({ title, content, tags: tagArray });
                summonerActions.addExp('sylfa', 50);
                summonerActions.addExp('anima', 25);
            }
            clearDraft();
            resetContentHistory('');
            onClose();
        }
    };

    const handleGenerateTags = async () => {
        if (!title.trim() && !content.trim()) return;
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

    const handleToolbarAction = (type: 'wrap' | 'prefix', prefix: string, suffix = '') => {
        const textarea = contentRef.current;
        if (!textarea) return;
        const { selectionStart, selectionEnd } = textarea;
        const selected = content.substring(selectionStart, selectionEnd);
        let newContent;
        if (type === 'wrap') {
            newContent = `${content.substring(0, selectionStart)}${prefix}${selected}${suffix}${content.substring(selectionEnd)}`;
            setContent(newContent);
            setTimeout(() => textarea.setSelectionRange(selectionStart + prefix.length, selectionEnd + prefix.length), 0);
        } else { // prefix
            const lines = content.substring(0, selectionStart).split('\n');
            const currentLineStart = content.lastIndexOf('\n', selectionStart - 1) + 1;
            const line = content.substring(currentLineStart, selectionEnd);
            let newLines;
            if (line.startsWith(prefix)) {
                newLines = line.substring(prefix.length);
            } else {
                newLines = prefix + line;
            }
            newContent = content.substring(0, currentLineStart) + newLines + content.substring(selectionEnd);
            setContent(newContent);
        }
        textarea.focus();
    };

     const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleUpdateDraft('tags', value);
        const currentTagPart = value.split(',').pop()?.trim().toLowerCase() || '';
        if (currentTagPart) {
            const existingTags = value.split(',').slice(0, -1).map(t => t.trim().toLowerCase());
            const filtered = allTags.filter(t => t.toLowerCase().startsWith(currentTagPart) && !existingTags.includes(t.toLowerCase()));
            setTagSuggestions(filtered);
            setActiveSuggestionIndex(filtered.length > 0 ? 0 : -1);
        } else {
            setTagSuggestions([]);
        }
    };

    const handleSelectTag = (tag: string) => {
        const tagsArray = tags.split(',').map(t => t.trim());
        tagsArray[tagsArray.length - 1] = tag;
        handleUpdateDraft('tags', tagsArray.join(', ') + ', ');
        setTagSuggestions([]);
        tagInputRef.current?.focus();
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
     const handleContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
            if ((e.key === 'y') || (e.key === 'z' && e.shiftKey)) { e.preventDefault(); redo(); }
        }
    };


    return (
        <Card className="mt-4">
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                    <label htmlFor="title" className="block text-matrix-light mb-2">標題</label>
                    <input id="title" type="text" value={title} onChange={(e) => handleUpdateDraft('title', e.target.value)} className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan" required />
                </div>
                <div>
                    <label htmlFor="content" className="block text-matrix-light mb-2">內容</label>
                    <div className="flex flex-col md:flex-row border border-matrix-dark/50 rounded-md" style={{ minHeight: '400px' }}>
                        <div className="w-full md:w-1/2 flex flex-col">
                            <MarkdownToolbar onAction={handleToolbarAction} onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} />
                            <textarea id="content" ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={handleContentKeyDown} className="flex-grow w-full p-4 bg-matrix-bg focus:outline-none font-mono text-matrix-light resize-none" style={{ minHeight: '200px' }} required placeholder="在此輸入您的 Markdown..." />
                        </div>
                        <div className="w-full md:w-1/2 p-4 bg-matrix-bg/50 border-t md:border-t-0 md:border-l border-matrix-dark/50 overflow-y-auto flex items-center justify-center" style={{ minHeight: '200px' }}>
                            {content ? <div className="w-full h-full prose-styles" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} /> : <p className="text-matrix-dark">Markdown 預覽將在此處顯示</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="tags" className="block text-matrix-light mb-2">標籤</label>
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <input id="tags" ref={tagInputRef} type="text" value={tags} onChange={handleTagsChange} onKeyDown={handleTagKeyDown} onBlur={() => setTimeout(() => setTagSuggestions([]), 150)} className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan" placeholder="例如：人工智慧, 哲學, Alpha專案" autoComplete="off" />
                            {tagSuggestions.length > 0 && (
                                <ul ref={tagSuggestionsRef} className="absolute z-10 w-full mt-1 bg-matrix-bg-2 border border-matrix-dark/50 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                    {tagSuggestions.map((tag: string, index) => (
                                        <li key={tag} className={`px-3 py-2 cursor-pointer ${index === activeSuggestionIndex ? 'bg-matrix-cyan/20' : 'hover:bg-matrix-dark/50'}`} onMouseDown={() => handleSelectTag(tag)}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button type="button" onClick={handleGenerateTags} disabled={isGeneratingTags || (!title.trim() && !content.trim())} className="flex items-center space-x-2 bg-matrix-cyan/80 text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-matrix-cyan transition-all shadow-matrix-glow-cyan disabled:bg-matrix-dark disabled:shadow-none disabled:cursor-not-allowed" title="自動生成標籤">
                            <SparkleIcon className="w-5 h-5" />
                            <span>{isGeneratingTags ? "生成中..." : "自動生成"}</span>
                        </button>
                    </div>
                    <p className="text-xs text-matrix-dark mt-1">使用逗號分隔標籤。</p>
                </div>
                <button type="submit" className="bg-matrix-green text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow">
                    {note && note.id ? '更新筆記' : '儲存筆記'}
                </button>
            </form>
        </Card>
    );
};

export default NoteEditor;
