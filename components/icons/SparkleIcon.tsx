import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3z"/>
    <path d="M5 21L3 19"/>
    <path d="M19 21L21 19"/>
    <path d="M21 5L19 3"/>
    <path d="M3 5L5 3"/>
  </svg>
);

export default SparkleIcon;