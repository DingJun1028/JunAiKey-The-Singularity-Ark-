import React, { useRef, useEffect } from 'react';

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
  const lineNumbersRef = useRef<HTMLPreElement>(null);

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
  const highlightedHTML = highlightCode(value);
  
  // Resync scroll on value change in case of external updates
  useEffect(() => {
    handleScroll();
  }, [value]);


  const handleScroll = () => {
    if (textareaRef.current && preRef.current && lineNumbersRef.current) {
        const scrollTop = textareaRef.current.scrollTop;
        const scrollLeft = textareaRef.current.scrollLeft;

        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
        
        lineNumbersRef.current.scrollTop = scrollTop;
    }
  };
  
  const sharedEditorClasses = "p-4 m-0 font-mono text-matrix-light whitespace-pre";
  const lineNumbersClasses = `flex-shrink-0 p-4 font-mono text-right text-matrix-dark bg-matrix-bg select-none border-r border-matrix-dark/50`;
  
  if (readOnly) {
    return (
      <div className="flex w-full h-full bg-matrix-bg border border-matrix-dark/50 rounded-md overflow-auto">
        <pre className={`${lineNumbersClasses} sticky left-0`}>
          {lineNumbers}
        </pre>
        <pre className={`${sharedEditorClasses} flex-1`}>
          <code dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
        </pre>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full bg-matrix-bg border border-matrix-dark/50 rounded-md overflow-hidden">
      <pre
        ref={lineNumbersRef}
        className={`${lineNumbersClasses} overflow-hidden`}
        aria-hidden="true"
      >
        {lineNumbers}
      </pre>
      <div className="relative flex-1 h-full">
        <textarea
            ref={textareaRef}
            className={`absolute top-0 left-0 w-full h-full bg-transparent text-transparent caret-matrix-light resize-none focus:outline-none z-10 ${sharedEditorClasses}`}
            value={value}
            onScroll={handleScroll}
            spellCheck="false"
            {...props}
        />
        <pre
            ref={preRef}
            className={`absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden ${sharedEditorClasses}`}
            aria-hidden="true"
        >
            <code dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;