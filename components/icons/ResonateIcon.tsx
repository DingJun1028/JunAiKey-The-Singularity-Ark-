import React from 'react';

const ResonateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
    <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"></path>
    <path d="M12 1v0"></path><path d="M12 23v0"></path>
    <path d="M4.22 4.22l0 0"></path><path d="M19.78 19.78l0 0"></path>
    <path d="M1 12h0"></path><path d="M23 12h0"></path>
    <path d="M4.22 19.78l0 0"></path><path d="M19.78 4.22l0 0"></path>
  </svg>
);

export default ResonateIcon;
