import React from 'react';

const NexusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2.25m0 13.5V21m-6.364-.636l1.591-1.591M20.409 4.227l-1.591 1.591M4.227 4.227l1.591 1.591M18.818 19.182l-1.591-1.591M3 12h2.25m13.5 0H21m-3.636 6.364l-1.591-1.591M5.818 5.818l-1.591-1.591" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

export default NexusIcon;
