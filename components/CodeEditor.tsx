import React, { useRef } from 'react';

const highlightCode = (code: string): string => {
  if (!code) return '';
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Order of replacements is important to avoid conflicts

  // 1. Comments
  highlighted = highlighted.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, `<span class="text-syntax-comment">$1</span>`);

  // 2. Strings
  highlighted = highlighted.replace(/([`'"])(.*?)\1/g, `<span class="text-syntax-string">$1$2$1</span>`);
  
  // 3. JSX Tags (PascalCase for Components, then general tags)
  highlighted = highlighted.replace(/(&lt;\/?\s*)([A-Z]\w*)/g, `$1<span class="text-syntax-tag font-semibold">$2</span>`); 
  highlighted = highlighted.replace(/(&lt;\/?\s*)(\w+)/g, `$1<span class="text-syntax-tag">$2</span>`); 

  // 4. JSX Props (e.g., propName=)
  highlighted = highlighted.replace(/(\s+)([a-zA-Z0-9_-]+)=/g, `$1<span class="text-syntax-prop">$2</span>=`);

  // 5. Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'default', 'async', 'await', 'if', 'else', 'switch', 'case', 'for', 'while', 'new', 'React', 'useState', 'useEffect', 'useRef', 'type', 'interface', 'className'];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(keywordRegex, `<span class="text-syntax-keyword">$1</span>`);

  // 6. Numbers
  highlighted = highlighted.replace(/\b(\d+(\.\d+)?)\b/g, `<span class="text-syntax-number">$1</span>`);

  return highlighted;
};


interface CodeEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, readOnly, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const highlightedHTML = highlightCode(value);

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };
  
  const sharedClasses = "w-full h-full p-4 m-0 bg-transparent font-mono text-matrix-light rounded-md";
  
  if (readOnly) {
    return (
      <pre className={`${sharedClasses} bg-matrix-bg border border-matrix-dark/50 overflow-auto`}>
        <code dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
      </pre>
    );
  }

  return (
    <div className="relative w-full h-full">
      <textarea
        ref={textareaRef}
        className={`${sharedClasses} absolute top-0 left-0 text-transparent caret-matrix-light border border-matrix-dark/50 focus:outline-none focus:ring-2 focus:ring-matrix-cyan resize-none`}
        value={value}
        onScroll={handleScroll}
        spellCheck="false"
        {...props}
      />
      <pre
        ref={preRef}
        className={`${sharedClasses} absolute top-0 left-0 bg-matrix-bg border border-transparent pointer-events-none overflow-hidden`}
        aria-hidden="true"
      >
        <code dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
      </pre>
    </div>
  );
};

export default CodeEditor;