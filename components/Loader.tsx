
import React from 'react';

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-matrix-bg-2/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-t-matrix-green border-r-matrix-green border-b-matrix-green/20 border-l-matrix-green/20 rounded-full animate-spin"></div>
      <p className="text-matrix-green font-mono tracking-widest animate-pulse">{text}</p>
    </div>
  );
};

export default Loader;
