
import React, { useState, useRef, useMemo, useCallback } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, style: React.CSSProperties) => React.ReactNode;
  getItemHeight: (item: T) => number;
  containerHeight: string;
}

const VirtualizedList = <T extends { id: any }>({
  items,
  renderItem,
  getItemHeight,
  containerHeight,
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { positions, totalHeight } = useMemo(() => {
    const pos: number[] = [];
    let currentPos = 0;
    for (const item of items) {
      pos.push(currentPos);
      currentPos += getItemHeight(item);
    }
    return { positions: pos, totalHeight: currentPos };
  }, [items, getItemHeight]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  
  const renderList = useCallback(() => {
    if (!containerRef.current) return [];

    const containerHeightNum = containerRef.current.clientHeight;

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

// By explicitly casting the memoized component, we ensure that TypeScript understands
// it is a generic component, which resolves type inference issues in parent components.
export default React.memo(VirtualizedList) as <T extends { id: any }>(
  props: VirtualizedListProps<T>
) => React.ReactElement;
