import React from 'react';

const NoteCardSkeleton: React.FC<{ isGridMode: boolean }> = ({ isGridMode }) => {
  return (
    <div className={`bg-matrix-bg/50 border border-matrix-dark/30 rounded-lg p-4 animate-pulse ${isGridMode ? 'h-32' : ''}`}>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-matrix-dark/50 rounded w-3/4"></div>
        <div className="h-5 w-5 bg-matrix-dark/50 rounded-full"></div>
      </div>
    </div>
  );
};

export default NoteCardSkeleton;
