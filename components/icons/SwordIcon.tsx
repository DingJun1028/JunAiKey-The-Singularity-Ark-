import React from 'react';

const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 3.5l-18 18"/>
    <path d="M15 3l6 6"/>
    <path d="M11 7l-4 4"/>
    <path d="M3 21l3-3"/>
    <path d="M15 11l-4 4"/>
  </svg>
);

export default SwordIcon;