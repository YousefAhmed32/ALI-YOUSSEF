// Lightweight pub-sub outside React so cursor variant changes never
// trigger a re-render fan-out through context consumers.
let variant = 'default';
let label = '';
const listeners = new Set();

export function setCursor(nextVariant = 'default', nextLabel = '') {
  variant = nextVariant;
  label = nextLabel;
  listeners.forEach((fn) => fn(variant, label));
}

export function resetCursor() {
  setCursor('default', '');
}

export function subscribeCursor(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getCursor() {
  return { variant, label };
}
