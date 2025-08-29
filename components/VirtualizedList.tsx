import React, { useState, useRef, useEffect, useCallback } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, style: React.CSSProperties) => React.ReactNode;
  itemHeight: number;
  containerHeight: string;
}

const VirtualizedList = <T extends { id: any }>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  
  const renderList = useCallback(() => {
    if (!containerRef.current) return [];

    const containerHeightNum = containerRef.current.clientHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 5); // Render a few items before
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeightNum) / itemHeight) + 5 // And a few after
    );

    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push(
        renderItem(items[i], {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          left: 0,
          right: 0,
          height: `${itemHeight}px`,
        })
      );
    }
    return visibleItems;
  }, [scrollTop, items, itemHeight, renderItem]);


  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflowY: 'auto', position: 'relative' }}
    >
      <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {renderList()}
      </div>
    </div>
  );
};

export default React.memo(VirtualizedList) as typeof VirtualizedList;
