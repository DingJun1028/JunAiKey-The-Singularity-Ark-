import React, { useState, useEffect, useRef } from 'react';
import { useNoteStore } from '../store/noteStore';
import Header from '../components/Header';
import NotesIcon from '../components/icons/NotesIcon';
import NoteCard, { formatMarkdown } from '../components/NoteCard';

const DRAFT_KEY = 'junaikey-note-draft';

// Toolbar Icons defined as inline components
const BoldIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>;
const ItalicIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>;
const StrikethroughIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" y1="12" x2="20" y2="12"></line></svg>;
const ListUnorderedIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg>;
const ListOrderedIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"></line><line x1="10" x2="21" y1="12" y2="12"></line><line x1="10" x2="21" y1="18" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>;
const CodeIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const CodeBlockIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 13-2 2 2 2"></path><path d="m14 17 2-2-2-2"></path></svg>;


const OmniNotePage: React.FC = () => {
  const { notes, addNote, deleteNote } = useNoteStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Load draft from localStorage on initial render
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.title) setTitle(draft.title);
        if (draft.content) setContent(draft.content);
      }
    } catch (error) {
        console.error("Failed to parse note draft from localStorage", error);
        localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  // Save draft to localStorage whenever title or content changes
  useEffect(() => {
    const draft = { title, content };
    if (title.trim() || content.trim()) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } else {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [title, content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      addNote({ title, content });
      localStorage.removeItem(DRAFT_KEY);
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  };
  
  const wrapSelection = (prefix: string, suffix: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newContent = `${content.substring(0, start)}${prefix}${selected}${suffix}${content.substring(end)}`;
    setContent(newContent);
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const prefixLines = (prefix: string) => {
      const textarea = contentRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      
      const lines = selectedText.split('\n');
      const newLines = lines.map(line => {
        if (line.startsWith(prefix)) {
            return line.substring(prefix.length);
        }
        return prefix + line;
      }).join('\n');

      const newContent = content.substring(0, start) + newLines + content.substring(end);
      setContent(newContent);

      setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start, start + newLines.length);
      }, 0);
  };

  const ToolbarButton = ({ children, onClick, title }: { children: React.ReactNode, onClick: () => void, title: string }) => (
    <button type="button" onClick={onClick} title={title} className="p-2 text-matrix-light hover:bg-matrix-dark/50 rounded transition-colors">
        {children}
    </button>
  );

  const ToolbarDivider = () => <div className="w-px h-5 bg-matrix-dark/50 mx-1"></div>;

  return (
    <div className="animate-fade-in">
      <Header 
        title="Omni-Note System"
        subtitle="The source of all wisdom. Capture and manage your thoughts."
        icon={<NotesIcon className="w-8 h-8"/>}
      />

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-matrix-cyan text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow-cyan"
        >
          {showForm ? 'Cancel' : 'Create New Note'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 p-4 bg-matrix-bg-2/50 border border-matrix-dark/30 rounded-lg animate-fade-in">
            <div className="mb-4">
              <label htmlFor="title" className="block text-matrix-light mb-2">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-matrix-bg border border-matrix-dark/50 rounded-md focus:outline-none focus:ring-2 focus:ring-matrix-cyan"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-matrix-light mb-2">Content</label>
              <div className="flex flex-col md:flex-row border border-matrix-dark/50 rounded-md" style={{ minHeight: '400px' }}>
                {/* Left Pane: Editor */}
                <div className="w-full md:w-1/2 flex flex-col">
                  {/* Toolbar */}
                  <div className="flex-shrink-0 flex items-center flex-wrap space-x-1 p-1 border-b border-matrix-dark/50 bg-matrix-bg">
                      {/* Text Style Group */}
                      <ToolbarButton onClick={() => wrapSelection('**', '**')} title="Bold"><BoldIcon /></ToolbarButton>
                      <ToolbarButton onClick={() => wrapSelection('*', '*')} title="Italic"><ItalicIcon /></ToolbarButton>
                      <ToolbarButton onClick={() => wrapSelection('~~', '~~')} title="Strikethrough"><StrikethroughIcon /></ToolbarButton>
                      <ToolbarDivider />
                      {/* Headings Group */}
                      <ToolbarButton onClick={() => prefixLines('# ')} title="Heading 1"><span className="font-bold text-sm">H1</span></ToolbarButton>
                      <ToolbarButton onClick={() => prefixLines('## ')} title="Heading 2"><span className="font-bold text-sm">H2</span></ToolbarButton>
                      <ToolbarButton onClick={() => prefixLines('### ')} title="Heading 3"><span className="font-bold text-sm">H3</span></ToolbarButton>
                      <ToolbarDivider />
                      {/* Block Elements Group */}
                      <ToolbarButton onClick={() => prefixLines('* ')} title="Unordered List"><ListUnorderedIcon /></ToolbarButton>
                      <ToolbarButton onClick={() => prefixLines('1. ')} title="Ordered List"><ListOrderedIcon /></ToolbarButton>
                      <ToolbarDivider />
                      {/* Code Group */}
                      <ToolbarButton onClick={() => wrapSelection('`', '`')} title="Inline Code"><CodeIcon /></ToolbarButton>
                      <ToolbarButton onClick={() => wrapSelection('\n```\n', '\n```\n')} title="Code Block"><CodeBlockIcon /></ToolbarButton>
                  </div>
                  {/* Textarea */}
                  <textarea
                      id="content"
                      ref={contentRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="flex-grow w-full p-4 bg-matrix-bg focus:outline-none font-mono text-matrix-light resize-none"
                      style={{ minHeight: '200px' }}
                      required
                      placeholder="Type your Markdown here..."
                  />
                </div>
                {/* Right Pane: Preview */}
                <div 
                    className="w-full md:w-1/2 p-4 bg-matrix-bg/50 border-t md:border-t-0 md:border-l border-matrix-dark/50 overflow-y-auto"
                    style={{ minHeight: '200px' }}
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(content) || '<p class="text-matrix-dark">Preview...</p>' }}
                />
              </div>
            </div>
            <button type="submit" className="bg-matrix-green text-matrix-bg font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all shadow-matrix-glow">
              Save Note
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(note => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default OmniNotePage;