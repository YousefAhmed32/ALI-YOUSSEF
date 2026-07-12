import { useCallback } from 'react';
import { openLightbox } from './lightboxStore.js';

// Returns an onClick handler that opens the shared lightbox at `index` within
// `images`, and restores focus to the trigger element on close. Meant for a
// real <button> (native keyboard activation already gives Enter/Space).
export function useLightboxTrigger(images, index) {
  return useCallback(
    (e) => {
      openLightbox(images, index, e.currentTarget);
    },
    [images, index]
  );
}
