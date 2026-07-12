import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable premium reveal system for typography.
 * variant: 'editorial' (serif titles, line mask), 'technical' (mono metadata,
 * fade + tracking normalize), 'manifesto' (large statements, slow word stagger)
 */
export function SplitTextReveal({
  lines,
  as: Tag = 'div',
  variant = 'editorial',
  className = '',
  style,
  start = 'top 88%',
  delay = 0,
  once = true,
}) {
  const reducedMotion = useReducedMotion();

  const scope = useGSAPContext(
    (root) => {
      const items = root.querySelectorAll('[data-reveal-item]');
      if (!items.length) return;

      if (reducedMotion) {
        gsap.set(items, { clearProps: 'all' });
        return;
      }

      const isManifesto = variant === 'manifesto';
      const isTechnical = variant === 'technical';

      gsap.set(items, isTechnical ? { opacity: 0, letterSpacing: '0.5em' } : { yPercent: 112, opacity: 0 });

      gsap.to(items, {
        yPercent: isTechnical ? undefined : 0,
        opacity: 1,
        letterSpacing: isTechnical ? '0.2em' : undefined,
        duration: isManifesto ? 1.4 : 1,
        ease: 'expo.out',
        stagger: isManifesto ? 0.14 : 0.07,
        delay,
        scrollTrigger: { trigger: root, start, once },
      });
    },
    [lines, variant]
  );

  return (
    <Tag ref={scope} className={`reveal-text reveal-text--${variant} ${className}`} style={style}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <span data-reveal-item className="reveal-item">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
