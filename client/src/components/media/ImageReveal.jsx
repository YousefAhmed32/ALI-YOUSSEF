import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import './image-reveal.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * variant:
 *  aperture — narrow clip-path opening expands to full frame
 *  curtain  — opaque plane slides away to reveal the image
 *  mask     — circular clip-path reveal, expands from center
 *  depth    — scale-in with subtle parallax on scroll
 */
export function ImageReveal({
  src,
  alt = '',
  variant = 'depth',
  className = '',
  imgStyle,
  eager = false,
  sizes,
  start = 'top 85%',
}) {
  const reducedMotion = useReducedMotion();
  const imgRef = useRef(null);
  const curtainRef = useRef(null);

  const scope = useGSAPContext(
    (root) => {
      if (reducedMotion) return;
      const img = imgRef.current;
      if (!img) return;

      if (variant === 'aperture') {
        gsap.set(img, { clipPath: 'inset(38% 38% 38% 38%)', scale: 1.15 });
        gsap.to(img, {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: root, start, once: true },
        });
      } else if (variant === 'mask') {
        gsap.set(img, { clipPath: 'circle(0% at 50% 50%)' });
        gsap.to(img, {
          clipPath: 'circle(75% at 50% 50%)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start, once: true },
        });
      } else if (variant === 'curtain' && curtainRef.current) {
        gsap.set(img, { scale: 1.06 });
        gsap.to(curtainRef.current, {
          xPercent: 101,
          duration: 1.2,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: root, start, once: true },
        });
        gsap.to(img, {
          scale: 1,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: root, start, once: true },
        });
      } else {
        gsap.set(img, { opacity: 0, y: 40, scale: 1.08 });
        gsap.to(img, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start, once: true },
        });
      }
    },
    [variant, src]
  );

  return (
    <div ref={scope} className={`image-reveal image-reveal--${variant} ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={imgStyle}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
      />
      {variant === 'curtain' ? <span ref={curtainRef} className="image-reveal__curtain" aria-hidden="true" /> : null}
    </div>
  );
}
