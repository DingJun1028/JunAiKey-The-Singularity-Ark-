import React from 'react';

const StreamFinishedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`inline-block ml-2 flex-shrink-0 ${className}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default StreamFinishedIcon;
