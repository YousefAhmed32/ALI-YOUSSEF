import { useEffect } from 'react';
import gsap from 'gsap';

// Restrained, editorial letter response to pointer presence: nearby glyphs
// drift a few px toward the cursor and settle back; distant glyphs barely move.
export function useLetterMagnet(containerRef, enabled) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return undefined;
    const node = containerRef.current;
    const letters = Array.from(node.querySelectorAll('[data-letter]'));
    if (!letters.length) return undefined;

    const setters = letters.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' }),
      scale: gsap.quickTo(el, 'scale', { duration: 0.55, ease: 'power3.out' }),
    }));

    const radius = 170;
    const strength = 13;

    const onMove = (e) => {
      letters.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const t = Math.max(0, 1 - dist / radius);
        const eased = t * t;
        const angle = Math.atan2(dy, dx);
        setters[i].x(Math.cos(angle) * strength * eased);
        setters[i].y(Math.sin(angle) * strength * 0.6 * eased);
        setters[i].scale(1 + eased * 0.045);
      });
    };

    const onLeave = () => {
      setters.forEach((s) => {
        s.x(0);
        s.y(0);
        s.scale(1);
      });
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, containerRef]);
}
