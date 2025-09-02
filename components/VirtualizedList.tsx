<<<<<<< HEAD
import React, { useState, useRef, useMemo, useCallback } from 'react';

// FIX: Update component to support variable item heights for features like expandable notes.
// - Changed `itemHeight` prop to `getItemHeight` function.
// - Recalculate item positions and total height when items or height logic changes.
// - Adjusted render logic to find visible items based on their individual positions and heights.
=======
import React, { useState, useRef, useEffect, useCallback } from 'react';
>>>>>>> feature-branch

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, style: React.CSSProperties) => React.ReactNode;
<<<<<<< HEAD
  getItemHeight: (item: T) => number;
=======
  itemHeight: number;
>>>>>>> feature-branch
  containerHeight: string;
}

const VirtualizedList = <T extends { id: any }>({
  items,
  renderItem,
<<<<<<< HEAD
  getItemHeight,
=======
  itemHeight,
>>>>>>> feature-branch
  containerHeight,
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

<<<<<<< HEAD
  const { positions, totalHeight } = useMemo(() => {
    const pos: number[] = [];
    let currentPos = 0;
    for (const item of items) {
      pos.push(currentPos);
      currentPos += getItemHeight(item);
    }
    return { positions: pos, totalHeight: currentPos };
  }, [items, getItemHeight]);

=======
>>>>>>> feature-branch
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  
  const renderList = useCallback(() => {
    if (!containerRef.current) return [];

    const containerHeightNum = containerRef.current.clientHeight;
<<<<<<< HEAD

    // Find the first item that is visible in the viewport
    let startIndex = 0;
    for(let i = 0; i < positions.length; i++) {
        if (positions[i] + getItemHeight(items[i]) > scrollTop) {
            startIndex = i;
            break;
        }
    }
    // Render a buffer of items before the viewport for smoother scrolling
    startIndex = Math.max(0, startIndex - 5);

    // Find the last item that is visible in the viewport
    let endIndex = startIndex;
    while (endIndex < items.length && positions[endIndex] < scrollTop + containerHeightNum) {
        endIndex++;
    }
    // Render a buffer of items after the viewport for smoother scrolling
    endIndex = Math.min(items.length - 1, endIndex + 5);

    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
        const item = items[i];
        if (!item) continue;
        
        visibleItems.push(
            renderItem(item, {
              position: 'absolute',
              top: `${positions[i]}px`,
              left: 0,
              right: 0,
              height: `${getItemHeight(item)}px`,
            })
        );
    }
    return visibleItems;
  }, [scrollTop, containerRef, items, getItemHeight, renderItem, positions]);
=======
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
>>>>>>> feature-branch

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

<<<<<<< HEAD
export default React.memo(VirtualizedList) as typeof VirtualizedList;
=======
export default React.memo(VirtualizedList) as typeof VirtualizedList;
>>>>>>> feature-branch
