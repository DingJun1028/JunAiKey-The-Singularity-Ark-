import React from 'react';

const SimulateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h-3A2.5 2.5 0 0 1 4 4.5v0A2.5 2.5 0 0 1 6.5 2h3z"></path>
        <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0A2.5 2.5 0 0 1 14.5 7h-3a2.5 2.5 0 0 1-2.5-2.5v0A2.5 2.5 0 0 1 11.5 2h3z"></path>
        <path d="M12 12a2.5 2.5 0 0 1 2.5 2.5V17a2.5 2.5 0 0 1-5 0v-2.5A2.5 2.5 0 0 1 12 12z"></path>
        <path d="M4.5 10.5a2.5 2.5 0 0 1 2.5-2.5h10a2.5 2.5 0 0 1 2.5 2.5V17a2.5 2.5 0 0 1-2.5 2.5h-10A2.5 2.5 0 0 1 4.5 17v-6.5z"></path>
        <path d="M12 7v5"></path>
        <path d="M9.5 17a2.5 2.5 0 0 1 5 0"></path>
    </svg>
);

export default SimulateIcon;
