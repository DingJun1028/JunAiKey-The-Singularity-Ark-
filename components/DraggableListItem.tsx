import React, { useState } from 'react';

interface DraggableListItemProps {
  index: number;
  onDragStart: (index: number) => void;
  onDrop: (index: number) => void;
  children: React.ReactNode;
}

const DraggableListItem: React.FC<DraggableListItemProps> = ({ index, onDragStart, onDrop, children }) => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggedOver(true);
    };
    
    const handleDragLeave = () => {
        setIsDraggedOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggedOver(false);
        onDrop(index);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
                p-3 bg-matrix-bg border border-matrix-dark/50 rounded-md cursor-grab transition-all duration-200 
                hover:bg-matrix-dark/30 hover:border-matrix-cyan/50
                ${isDraggedOver ? 'border-matrix-green ring-2 ring-matrix-green' : ''}
            `}
        >
            {children}
        </div>
    );
};

export default DraggableListItem;
