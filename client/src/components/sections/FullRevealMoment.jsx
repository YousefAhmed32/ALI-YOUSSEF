import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPContext } from '../../hooks/useGSAPContext.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { useCursorTarget } from '../interaction/useCursorTarget.js';
import './full-reveal-moment.css';

gsap.registerPlugin(ScrollTrigger);

export function FullRevealMoment({ project, sceneLabel, notes = [] }) {
  const reducedMotion = useReducedMotion();
  const cursorProps = useCursorTarget('open');

  const scope = useGSAPContext((root) => {
    if (reducedMotion) return;
    const img = root.querySelector('img');
    gsap.fromTo(
      img,
      { scale: 0.94 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'top top', scrub: true },
      }
    );
  }, [project.slug]);

  return (
    <section ref={scope} className="full-reveal" data-nav-theme="dark" aria-labelledby={`full-reveal-${project.slug}`}>
      <Link to={`/work/${project.slug}`} className="full-reveal__link" {...cursorProps}>
        <img src={project.src} alt={`${project.name} — full reveal`} loading="lazy" decoding="async" />
      </Link>
      <div className="full-reveal__gradient" aria-hidden="true" />
      <div className="full-reveal__top-rule" aria-hidden="true" />

      <div className="full-reveal__title-block">
        <div className="type-mono full-reveal__scene-label">{sceneLabel}</div>
        <h2 id={`full-reveal-${project.slug}`} className="full-reveal__title">
          {project.name}
        </h2>
      </div>

      {notes.length ? (
        <div className="type-mono full-reveal__notes">
          {notes.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
