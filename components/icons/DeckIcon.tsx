import React from 'react';

const DeckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18m-9 4v10" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11h.01" />
  </svg>
);

export default DeckIcon;