import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { subscribeCursor, getCursor } from './cursorStore.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import './custom-cursor.css';

const LABELS = {
  view: 'VIEW',
  open: 'OPEN',
  drag: 'DRAG',
  next: 'NEXT →',
};

export function CustomCursor() {
  const isFine = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();
  const dotRef = useRef(null);
  const [state, setState] = useState(getCursor());
  const [visible, setVisible] = useState(false);

  const enabled = isFine && !reducedMotion;

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add('cursor-enabled');
    return () => document.documentElement.classList.remove('cursor-enabled');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;
    return subscribeCursor((variant, label) => setState({ variant, label }));
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !dotRef.current) return undefined;
    const xTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e) => {
      if (!visible) setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  const label = state.label || LABELS[state.variant] || '';

  return (
    <div
      ref={dotRef}
      className={`custom-cursor custom-cursor--${state.variant}${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <span className="custom-cursor__core" />
      {label ? <span className="custom-cursor__label">{label}</span> : null}
    </div>
  );
}
