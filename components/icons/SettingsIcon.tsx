import React from 'react';

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.61l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96c-.51-.4-1.08-.73-1.7-.98l-.38-2.65A.5.5 0 0 0 14 2H10a.5.5 0 0 0-.5.44l-.38 2.65c-.61.25-1.19.59-1.7.98l-2.39-.96a.5.5 0 0 0-.61.22L2.49 9.85a.5.5 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.5.5 0 0 0-.12.61l1.92 3.32a.5.5 0 0 0 .61.22l2.39-.96c.51.4 1.08.73 1.7.98l.38 2.65a.5.5 0 0 0 .5.44h4a.5.5 0 0 0 .5-.44l.38 2.65c.61-.25 1.19-.59 1.7-.98l2.39.96a.5.5 0 0 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.61l-2.03-1.58z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export default SettingsIcon;
