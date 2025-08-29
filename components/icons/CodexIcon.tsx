import React from 'react';

const CodexIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 2H20v15H6.5A2.5 2.5 0 014 14.5V4.5A2.5 2.5 0 016.5 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6l.9 1.8L15 8.5l-2.1 2.1L12 13l-.9-2.4L9 8.5l2.1-.6.9-1.9z" />
  </svg>
);

export default CodexIcon;