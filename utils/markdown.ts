// This utility file houses the markdown-to-HTML conversion logic,
// making it reusable and easy to maintain.

const processInlines = (str: string): string => {
  // Note: str is expected to be HTML-escaped already.
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(.*?)\*(?!\*)/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/`([^`]+)`/g, '<code class="bg-matrix-dark/50 text-matrix-cyan px-1 rounded-sm font-mono text-sm">$1</code>');
};

export const formatMarkdown = (text: string = ''): string => {
  if (!text) return '';

  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // --- Block Elements ---
  // The order of processing is important.

  // Code Blocks (Verbatim - no inline processing)
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => 
    `<pre class="bg-matrix-bg p-2 rounded-md my-2"><code class="font-mono text-syntax-string">${code.trim()}</code></pre>`
  );

  // Blockquotes (FIXED: handles multiple lines and processes inlines)
  html = html.replace(/^(?:&gt; .*(?:\n|$))+/gm, (match) => {
    const content = match.split('\n')
      .map(line => line.replace(/^&gt; ?/, ''))
      .filter(Boolean)
      .join('<br />');
    return `<blockquote class="border-l-2 border-matrix-cyan pl-4 italic text-matrix-dark my-2">${processInlines(content)}</blockquote>`;
  });

  // Headings (processes inlines)
  html = html.replace(/^### (.*$)/gim, (m, c) => `<h3 class="text-xl font-semibold text-matrix-light mt-4 mb-2">${processInlines(c)}</h3>`);
  html = html.replace(/^## (.*$)/gim, (m, c) => `<h2 class="text-2xl font-semibold text-matrix-light mt-4 mb-2">${processInlines(c)}</h2>`);
  html = html.replace(/^# (.*$)/gim, (m, c) => `<h1 class="text-3xl font-semibold text-matrix-light mt-4 mb-2">${processInlines(c)}</h1>`);

  // Lists (processes inlines)
  html = html.replace(/^((\s*([*]|\d+\.)\s+.*(?:\n|$))+)/gm, (match) => {
    const lines = match.trim().split('\n');
    const isOrdered = /^\d+\./.test(lines[0]);
    const listType = isOrdered ? 'ol' : 'ul';
    const items = lines.map(line => `<li>${processInlines(line.replace(/^\s*([*]|\d+\.)\s+/, ''))}</li>`).join('');
    return `<${listType} class="${isOrdered ? 'list-decimal' : 'list-disc'} list-inside my-2 ml-4 space-y-1">${items}</${listType}>`;
  });

  // --- Paragraphs ---
  // Process remaining text blocks as paragraphs.
  return html.split(/\n\n+/).map(paragraph => {
    // Check if the paragraph is actually one of the block-level elements we've already processed
    if (paragraph.match(/^\s*<(h[1-3]|ul|ol|blockquote|pre)/)) {
        // This handles cases where text is adjacent to a block element without a double newline.
        const parts = paragraph.split(/(?=<(?:h[1-3]|ul|ol|blockquote|pre))/g);
        return parts.map(part => {
            if (part.match(/^\s*<(?:h[1-3]|ul|ol|blockquote|pre)/)) {
                return part; // Return the already processed HTML block
            }
            if (part.trim() === '') return '';
            // Process the remaining text as a paragraph
            return `<p class="my-2 leading-relaxed">${processInlines(part.trim().replace(/\n/g, '<br />'))}</p>`;
        }).join('');
    }
    if (paragraph.trim() === '') return '';
    // This is a standard paragraph block.
    return `<p class="my-2 leading-relaxed">${processInlines(paragraph.trim().replace(/\n/g, '<br />'))}</p>`;
  }).join('');
};

export const stripMarkdown = (text: string = ''): string => {
  if (!text) return '';
  
  let strippedText = text;
  
  // Remove block elements
  strippedText = strippedText.replace(/```[\s\S]*?```/g, ''); // Code blocks
  strippedText = strippedText.replace(/^(#+\s*|>\s*|[-*]\s*|\d+\.\s*)/gm, ''); // Headings, blockquotes, list items

  // Remove inline elements
  strippedText = strippedText.replace(/(\*\*|__|\*|_|~~)(.*?)\1/g, '$2'); // Bold, italic, strikethrough
  strippedText = strippedText.replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Links
  strippedText = strippedText.replace(/!\[.*?\]\(.*?\)/g, ''); // Images
  strippedText = strippedText.replace(/`([^`]+)`/g, '$1'); // Inline code

  // Clean up extra newlines
  strippedText = strippedText.replace(/\n{2,}/g, '\n');

  return strippedText.trim();
};
