import React from 'react';

const ThemeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H5z" />
    <path d="M12 21V11a2 2 0 012-2h4a2 2 0 012 2v10" />
    <path d="M12 7V3h4a2 2 0 012 2v2" />
  </svg>
);

export default ThemeIcon;