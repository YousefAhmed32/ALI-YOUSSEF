// Same outside-React pub-sub pattern as cursorStore.js — any gallery item
// anywhere in the tree can open the one mounted <Lightbox/> without prop
// drilling or a context re-render fan-out.
let state = { open: false, images: [], index: 0, returnFocusEl: null };
const listeners = new Set();

function emit() {
  listeners.forEach((fn) => fn(state));
}

export function openLightbox(images, index = 0, returnFocusEl = null) {
  if (!images?.length) return;
  state = { open: true, images, index: Math.min(Math.max(index, 0), images.length - 1), returnFocusEl };
  emit();
}

export function closeLightbox() {
  state = { ...state, open: false };
  emit();
}

export function setLightboxIndex(index) {
  state = { ...state, index: Math.min(Math.max(index, 0), state.images.length - 1) };
  emit();
}

export function subscribeLightbox(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getLightboxState() {
  return state;
}
