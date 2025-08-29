import React from 'react';

type ActionType = 'wrap' | 'prefix';

interface MarkdownToolbarProps {
    onAction: (type: ActionType, prefix: string, suffix?: string) => void;
}

// Toolbar Icons defined at the module level for performance.
const BoldIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>;
const ItalicIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>;
const StrikethroughIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"></path><path d="M14 12a4 4 0 0 1 0 8H6"></path><line x1="4" y1="12" x2="20" y2="12"></line></svg>;
const ListUnorderedIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line></svg>;
const ListOrderedIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"></line><line x1="10" x2="21" y1="12" y2="12"></line><line x1="10" x2="21" y1="18" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>;
const CodeIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const CodeBlockIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 13-2 2 2 2"></path><path d="m14 17 2-2-2-2"></path></svg>;


const ToolbarButton = ({ children, onClick, title }: { children: React.ReactNode, onClick: () => void, title: string }) => (
    <button type="button" onClick={onClick} title={title} className="p-2 text-matrix-light hover:bg-matrix-dark/50 rounded transition-colors">
        {children}
    </button>
);
const ToolbarDivider = () => <div className="w-px h-5 bg-matrix-dark/50 mx-1"></div>;


const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ onAction }) => {
    return (
        <div className="flex-shrink-0 flex items-center flex-wrap space-x-1 p-1 border-b border-matrix-dark/50 bg-matrix-bg">
            {/* Text Style Group */}
            <ToolbarButton onClick={() => onAction('wrap', '**', '**')} title="粗體"><BoldIcon /></ToolbarButton>
            <ToolbarButton onClick={() => onAction('wrap', '*', '*')} title="斜體"><ItalicIcon /></ToolbarButton>
            <ToolbarButton onClick={() => onAction('wrap', '~~', '~~')} title="刪除線"><StrikethroughIcon /></ToolbarButton>
            <ToolbarDivider />
            {/* Headings Group */}
            <ToolbarButton onClick={() => onAction('prefix', '# ')} title="標題 1"><span className="font-bold text-sm">H1</span></ToolbarButton>
            <ToolbarButton onClick={() => onAction('prefix', '## ')} title="標題 2"><span className="font-bold text-sm">H2</span></ToolbarButton>
            <ToolbarButton onClick={() => onAction('prefix', '### ')} title="標題 3"><span className="font-bold text-sm">H3</span></ToolbarButton>
            <ToolbarDivider />
            {/* Block Elements Group */}
            <ToolbarButton onClick={() => onAction('prefix', '* ')} title="無序列表"><ListUnorderedIcon /></ToolbarButton>
            <ToolbarButton onClick={() => onAction('prefix', '1. ')} title="有序列表"><ListOrderedIcon /></ToolbarButton>
            <ToolbarDivider />
            {/* Code Group */}
            <ToolbarButton onClick={() => onAction('wrap', '`', '`')} title="行內代碼"><CodeIcon /></ToolbarButton>
            <ToolbarButton onClick={() => onAction('wrap', '\n```\n', '\n```\n')} title="代碼區塊"><CodeBlockIcon /></ToolbarButton>
        </div>
    );
};

export default MarkdownToolbar;
