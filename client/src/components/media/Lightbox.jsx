import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { closeLightbox, setLightboxIndex, subscribeLightbox, getLightboxState } from './lightboxStore.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import './lightbox.css';

const FOCUSABLE = 'button:not([disabled])';
const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SWIPE_THRESHOLD = 56;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function Lightbox() {
  const [state, setState] = useState(getLightboxState);
  const { open, images, index } = state;
  const reducedMotion = useReducedMotion();

  const panelRef = useRef(null);
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const transform = useRef({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map());
  const pinchStart = useRef(null);
  const dragStart = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => subscribeLightbox(setState), []);

  const current = images[index];
  const hasMultiple = images.length > 1;

  const applyTransform = useCallback((next) => {
    transform.current = next;
    if (imgRef.current) {
      imgRef.current.style.transform = `translate(${next.x}px, ${next.y}px) scale(${next.scale})`;
    }
    setIsZoomed(next.scale > 1.01);
  }, []);

  const resetTransform = useCallback(() => {
    applyTransform({ scale: 1, x: 0, y: 0 });
  }, [applyTransform]);

  // Reset zoom + loading state whenever the active image changes.
  useEffect(() => {
    resetTransform();
    setLoaded(false);
  }, [index, open, resetTransform]);

  // Preload neighbours so prev/next feels instant.
  useEffect(() => {
    if (!open || images.length < 2) return;
    [index - 1, index + 1].forEach((i) => {
      const target = images[(i + images.length) % images.length];
      if (target?.src) {
        const img = new Image();
        img.src = target.src;
      }
    });
  }, [open, index, images]);

  const goTo = useCallback(
    (nextIndex) => {
      const wrapped = (nextIndex + images.length) % images.length;
      setLightboxIndex(wrapped);
    },
    [images.length]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Lock scroll, trap focus, wire keyboard while open.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowRight' && hasMultiple) goNext();
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      state.returnFocusEl?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hasMultiple, goNext, goPrev]);

  const zoomAt = useCallback(
    (clientX, clientY, targetScale) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const originX = clientX - rect.left - rect.width / 2;
      const originY = clientY - rect.top - rect.height / 2;
      const scale = clamp(targetScale, MIN_SCALE, MAX_SCALE);
      if (scale <= 1) {
        resetTransform();
        return;
      }
      const ratio = scale / transform.current.scale;
      const x = clamp(transform.current.x * ratio - originX * (ratio - 1), -rect.width, rect.width);
      const y = clamp(transform.current.y * ratio - originY * (ratio - 1), -rect.height, rect.height);
      applyTransform({ scale, x, y });
    },
    [applyTransform, resetTransform]
  );

  const onDoubleClick = (e) => {
    if (transform.current.scale > 1.01) {
      resetTransform();
    } else {
      zoomAt(e.clientX, e.clientY, 2.4);
    }
  };

  const onWheel = (e) => {
    if (!hasMultiple && transform.current.scale <= 1 && e.deltaY < 0) return;
    e.preventDefault();
    const next = transform.current.scale - e.deltaY * 0.0018;
    zoomAt(e.clientX, e.clientY, next);
  };

  const onPointerDown = (e) => {
    stageRef.current?.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale: transform.current.scale,
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      };
      dragStart.current = null;
    } else if (pointers.current.size === 1) {
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        originX: transform.current.x,
        originY: transform.current.y,
        moved: 0,
      };
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const scale = clamp((dist / pinchStart.current.dist) * pinchStart.current.scale, MIN_SCALE, MAX_SCALE);
      const mid = pinchStart.current.mid;
      zoomAt(mid.x, mid.y, scale);
      return;
    }

    if (pointers.current.size === 1 && dragStart.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current.moved = Math.max(dragStart.current.moved, Math.hypot(dx, dy));

      if (transform.current.scale > 1.01) {
        applyTransform({
          scale: transform.current.scale,
          x: dragStart.current.originX + dx,
          y: dragStart.current.originY + dy,
        });
      }
    }
  };

  const onPointerUp = (e) => {
    const wasSingle = pointers.current.size === 1;
    const drag = dragStart.current;
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinchStart.current = null;

    if (wasSingle && drag && transform.current.scale <= 1.01 && hasMultiple) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) goNext();
        else goPrev();
      }
    }
    dragStart.current = null;
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  if (!open || !current) return null;

  const transition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt || 'Image viewer'}
          ref={panelRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onClick={onBackdropClick}
        >
          <div className="lightbox__chrome">
            <div className="lightbox__meta type-mono">
              {current.eyebrow ? <span className="lightbox__eyebrow">{current.eyebrow}</span> : null}
              {current.caption ? <span className="lightbox__caption">{current.caption}</span> : null}
            </div>
            {hasMultiple ? (
              <div className="lightbox__counter type-mono">
                {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
            ) : null}
            <button type="button" className="lightbox__close type-mono" onClick={closeLightbox} aria-label="Close image viewer">
              CLOSE
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div
            ref={stageRef}
            className={`lightbox__stage${isZoomed ? ' is-zoomed' : ''}`}
            onDoubleClick={onDoubleClick}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.src}
                className="lightbox__frame"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                transition={transition}
              >
                {!loaded ? <span className="lightbox__shimmer" aria-hidden="true" /> : null}
                <img
                  ref={imgRef}
                  src={current.src}
                  alt={current.alt || ''}
                  className={`lightbox__img${loaded ? ' is-loaded' : ''}`}
                  onLoad={() => setLoaded(true)}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {hasMultiple ? (
            <>
              <button type="button" className="lightbox__nav lightbox__nav--prev type-mono" onClick={goPrev} aria-label="Previous image">
                ←
              </button>
              <button type="button" className="lightbox__nav lightbox__nav--next type-mono" onClick={goNext} aria-label="Next image">
                →
              </button>
            </>
          ) : null}

          <div className="lightbox__hint type-mono" aria-hidden="true">
            {hasMultiple ? 'SWIPE OR ARROW KEYS TO NAVIGATE  ·  ' : ''}DOUBLE-CLICK OR PINCH TO ZOOM
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
