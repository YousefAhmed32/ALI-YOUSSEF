import { useMemo } from 'react';
import { setCursor, resetCursor } from './cursorStore.js';

// Returns event handlers that switch the global custom cursor's variant
// while the pointer is over the target, and restore it on leave.
export function useCursorTarget(variant, label = '') {
  return useMemo(
    () => ({
      onMouseEnter: () => setCursor(variant, label),
      onMouseLeave: () => resetCursor(),
    }),
    [variant, label]
  );
}
