import React from 'react';

const ArchitectureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <rect x="9" y="3" width="6" height="6" rx="1"></rect>
    <rect x="3" y="15" width="6" height="6" rx="1"></rect>
    <rect x="15" y="15" width="6" height="6" rx="1"></rect>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 15l6-6 6 6"></path>
  </svg>
);

export default ArchitectureIcon;
