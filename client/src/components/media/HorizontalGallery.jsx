import { useEffect, useMemo, useRef, useState } from 'react';
import { setCursor, resetCursor } from '../interaction/cursorStore.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { openLightbox } from './lightboxStore.js';
import './horizontal-gallery.css';

const CLICK_DRAG_TOLERANCE = 6;

export function HorizontalGallery({ items }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isFine = useMediaQuery('(pointer: fine)');
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const pressedIndexRef = useRef(null);

  const lightboxImages = useMemo(
    () => items.map((item) => ({ src: item.src, alt: item.label, caption: item.label })),
    [items]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;

    const updateProgress = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });
    return () => el.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isFine) return undefined;

    const onWheel = (e) => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const goingRight = e.deltaY > 0;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((goingRight && atEnd) || (!goingRight && atStart)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isFine]);

  const onPointerDown = (e) => {
    // Capture the true pressed element before setPointerCapture retargets
    // all later events (including the eventual "click") to the track.
    const pressedBtn = e.target.closest('[data-gallery-index]');
    pressedIndexRef.current = pressedBtn ? Number(pressedBtn.dataset.galleryIndex) : null;

    if (!isFine) return;
    dragState.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: 0 };
    setCursor('drag');
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.moved = Math.max(dragState.current.moved, Math.abs(dx));
    trackRef.current.scrollLeft = dragState.current.startScroll - dx;
  };

  const endDrag = () => {
    dragState.current.active = false;
    resetCursor();
  };

  // setPointerCapture (needed for drag-to-scroll) retargets the resulting
  // click event to the track itself — e.target is no longer the button, so
  // fall back to the element captured at pointerdown time (before capture
  // kicked in). Keyboard-triggered clicks never go through pointer capture,
  // so e.target is still the real button there and takes priority.
  const onTrackClick = (e) => {
    if (dragState.current.moved > CLICK_DRAG_TOLERANCE) return;
    const btnFromTarget = e.target.closest?.('[data-gallery-index]');
    const index = btnFromTarget ? Number(btnFromTarget.dataset.galleryIndex) : pressedIndexRef.current;
    if (index === null || index === undefined) return;
    openLightbox(lightboxImages, index);
  };

  const onKeyDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    if (e.key === 'ArrowRight') {
      el.scrollBy({ left: 320, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      el.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <div className="horizontal-gallery">
      <div
        ref={trackRef}
        className="horizontal-gallery__track"
        role="group"
        aria-label="Material corridor, scrollable"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClick={onTrackClick}
        onKeyDown={onKeyDown}
        onMouseEnter={() => isFine && setCursor('drag')}
        onMouseLeave={() => isFine && resetCursor()}
      >
        {items.map((item, i) => (
          <figure key={item.label} className="horizontal-gallery__item" style={{ width: `${item.w}px` }}>
            <button
              type="button"
              className="horizontal-gallery__image"
              style={{ backgroundImage: `url(${item.src})`, backgroundSize: item.size, backgroundPosition: item.pos }}
              data-gallery-index={i}
              aria-label={`View full-size image — ${item.label}`}
            />
            <figcaption className="type-mono">{item.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="horizontal-gallery__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
      </div>
    </div>
  );
}
