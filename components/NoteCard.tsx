import React from 'react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

// A more comprehensive markdown to HTML converter
export const formatMarkdown = (text: string = ''): string => {
  if (!text) return '';
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Process block-level elements first
  // Code Blocks
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => 
    `<pre class="bg-matrix-bg p-2 rounded-md my-2"><code class="font-mono text-syntax-string">${code.trim()}</code></pre>`
  );

  // Blockquotes
  html = html.replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-2 border-matrix-cyan pl-4 italic text-matrix-dark my-2">$1</blockquote>');

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-matrix-light mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-matrix-light mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-semibold text-matrix-light mt-4 mb-2">$1</h1>');

  // Lists (unordered and ordered)
  html = html.replace(/^((\s*([*]|\d+\.)\s+.*(?:\n|$))+)/gm, (match) => {
    const lines = match.trim().split('\n');
    const isOrdered = /^\d+\./.test(lines[0]);
    const listType = isOrdered ? 'ol' : 'ul';
    const items = lines.map(line => `<li>${line.replace(/^\s*([*]|\d+\.)\s+/, '')}</li>`).join('');
    return `<${listType} class="${isOrdered ? 'list-decimal' : 'list-disc'} list-inside my-2 ml-4 space-y-1">${items}</${listType}>`;
  });

  // Process inline elements
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
  html = html.replace(/(?<!\*)\*(.*?)\*(?!\*)/g, '<em>$1</em>'); // Italic
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>'); // Strikethrough
  html = html.replace(/`([^`]+)`/g, '<code class="bg-matrix-dark/50 text-matrix-cyan px-1 rounded-sm font-mono text-sm">$1</code>'); // Inline Code

  // Process paragraphs for remaining text
  return html.split(/\n\n+/).map(paragraph => {
    // Check if the paragraph is already a block-level element
    if (paragraph.match(/^\s*<(h[1-3]|ul|ol|li|blockquote|pre)/)) {
      return paragraph;
    }
    if (paragraph.trim() === '') return '';
    // Wrap in <p> and convert single newlines to <br>
    return `<p class="my-2">${paragraph.trim().replace(/\n/g, '<br />')}</p>`;
  }).join('');
};


const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <div className="bg-matrix-bg/50 border border-matrix-dark/30 rounded-lg p-4 flex flex-col transition-shadow hover:shadow-lg hover:border-matrix-dark/50">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-matrix-cyan mb-2">{note.title}</h3>
        <div 
            className="text-matrix-light break-words prose-styles"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(note.content) }} 
        />
      </div>
      <div className="mt-4 flex justify-between items-center text-xs text-matrix-dark">
        <span>{new Date(note.createdAt).toLocaleString()}</span>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-400 font-semibold transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;