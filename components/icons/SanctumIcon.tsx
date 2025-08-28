
import React from 'react';

const SanctumIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11.414 15H9v-2.414l7.293-7.293a1 1 0 011.414 0L21 8.586a1 1 0 010 1.414L15 16v5h-2v-4l-4.707-4.707a1 1 0 010-1.414L11.293 3.293a1 1 0 011.414 0L15 6Z" />
  </svg>
);

export default SanctumIcon;
