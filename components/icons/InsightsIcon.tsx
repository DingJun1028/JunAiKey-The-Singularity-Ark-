import React from 'react';

const InsightsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.07 12.82c.32-.31.43-.76.32-1.18l-1.3-4.9a1 1 0 00-1.87.5l1.3 4.9c.07.27.22.5.42.68z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.93 11.18c-.32.31-.43.76-.32 1.18l1.3 4.9a1 1 0 001.87-.5l-1.3-4.9c-.07-.27-.22-.5-.42-.68z" />
    <circle cx="12" cy="12" r="10" strokeWidth={1.5}></circle>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6a1 1 0 100-2 1 1 0 000 2zm0 14a1 1 0 100-2 1 1 0 000 2z"></path>
  </svg>
);

export default InsightsIcon;
