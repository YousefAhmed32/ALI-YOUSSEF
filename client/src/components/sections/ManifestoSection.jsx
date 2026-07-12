import { useRef } from 'react';
import { site } from '../../data/site.js';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import './manifesto-section.css';

export function ManifestoSection() {
  const ref = useRef(null);
  const isFine = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();
  const enabled = isFine && !reducedMotion;

  const handleMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--light-x', `${x}%`);
    ref.current.style.setProperty('--light-y', `${y}%`);
  };

  return (
    <section
      ref={ref}
      className="manifesto"
      data-nav-theme="dark"
      onMouseMove={handleMove}
      aria-label="Manifesto"
    >
      {enabled ? <div className="manifesto__field" aria-hidden="true" /> : null}
      <div className="manifesto__rule" aria-hidden="true" />
      <div className="type-mono manifesto__label">MANIFESTO &middot; MASS / OPENING / LIGHT</div>
      <div className="manifesto__lines">
        {site.manifesto.map((line, i) => (
          <SplitTextReveal
            key={line.text}
            as="div"
            variant="manifesto"
            lines={[line.text]}
            delay={i * 0.15}
            className={[
              'manifesto__line',
              line.indent ? `manifesto__line--indent-${line.indent === 1 ? 'lg' : 'md'}` : '',
              line.emphasis ? 'manifesto__line--emphasis' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
      <p className="manifesto__note">{site.manifestoNote}</p>
    </section>
  );
}
