import { useState, useCallback, useMemo } from 'react';

/**
 * A custom hook to manage state with undo/redo functionality.
 * @param initialState The initial state.
 * @returns An object with the current state, setters, and undo/redo handlers.
 */
export const useUndoRedo = <T>(
  initialState: T
): {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  reset: (newState: T) => void;
  canUndo: boolean;
  canRedo: boolean;
} => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [index, setIndex] = useState(0);

  const state = useMemo(() => history[index], [history, index]);

  const setState = useCallback(
    (newState: T) => {
      // If the new state is the same as the current one, do nothing.
      if (Object.is(state, newState)) {
        return;
      }
      
      const newHistory = history.slice(0, index + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setIndex(newHistory.length - 1);
    },
    [history, index, state]
  );

  const undo = useCallback(() => {
    if (index > 0) {
      setIndex((currentIndex) => currentIndex - 1);
    }
  }, [index]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      setIndex((currentIndex) => currentIndex + 1);
    }
  }, [index, history.length]);

  const reset = useCallback((newState: T) => {
    setHistory([newState]);
    setIndex(0);
  }, []);

  return {
    state,
    setState,
    undo,
    redo,
    reset,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  };
};