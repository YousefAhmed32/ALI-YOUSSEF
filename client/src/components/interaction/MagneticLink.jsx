import { useRef } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

// Wraps interactive text so it drifts a few px toward the pointer.
// Restrained by design: max ~10px pull, decays back on leave.
export function MagneticLink({ as: Tag = 'span', strength = 10, className = '', children, ...rest }) {
  const ref = useRef(null);
  const isFine = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = isFine && !reducedMotion;

  const handleMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, {
      x: (relX / rect.width) * strength,
      y: (relY / rect.height) * strength,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    if (!enabled || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic-link ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
