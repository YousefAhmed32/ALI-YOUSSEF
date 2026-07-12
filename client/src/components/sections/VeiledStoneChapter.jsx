import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug, projects, catalogueImages } from '../../data/projects.js';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { useGSAPContext } from '../../hooks/useGSAPContext.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import { isUnset } from '../../utils/placeholder.js';
import './veiled-stone-chapter.css';

gsap.registerPlugin(ScrollTrigger);

const project = getProjectBySlug('veiled-stone-house');
const catalogueIndex = projects.findIndex((p) => p.slug === project.slug);

export function VeiledStoneChapter() {
  const reducedMotion = useReducedMotion();
  const openFullImage = useLightboxTrigger(catalogueImages, catalogueIndex);

  const scope = useGSAPContext((root) => {
    const crops = root.querySelectorAll('[data-crop]');
    gsap.set(crops, reducedMotion ? {} : { opacity: 0, y: 36 });
    crops.forEach((crop) => {
      gsap.to(crop, {
        opacity: 1,
        y: 0,
        duration: reducedMotion ? 0.01 : 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: crop, start: 'top 88%', once: true },
      });
    });

    if (!reducedMotion) {
      gsap.to(root.querySelector('[data-parallax-main]'), {
        backgroundPosition: '50% 62%',
        ease: 'none',
        scrollTrigger: { trigger: root.querySelector('[data-parallax-main]'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  }, []);

  return (
    <section ref={scope} className="veiled-chapter" data-nav-theme="dark" aria-labelledby="veiled-chapter-title">
      <div className="veiled-chapter__rail">
        <div className="veiled-chapter__rail-sticky">
          <div className="type-mono veiled-chapter__scene-label">SCENE 02 — IMMERSION&nbsp;&nbsp;001 / 009</div>
          <div className="veiled-chapter__ghost">001</div>
          <h2 id="veiled-chapter-title" className="veiled-chapter__title">
            <SplitTextReveal lines={['VEILED', 'STONE', 'HOUSE']} variant="editorial" />
          </h2>
          <p className="veiled-chapter__intent">{project.intent}</p>
          <div className="type-mono veiled-chapter__meta">
            <div>TYPE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.type}</div>
            <div>SURFACE&nbsp;&nbsp;{project.surface}</div>
            <div>STATUS&nbsp;&nbsp;&nbsp;{project.status}</div>
            {!isUnset(project.location) ? <div className="is-muted">LOCATION&nbsp;&nbsp;{project.location}</div> : null}
          </div>
          <Link to={`/work/${project.slug}`} className="veiled-chapter__cta type-mono">
            <span className="veiled-chapter__cta-badge" aria-hidden="true">↓</span>
            <span>OPEN THE PROJECT</span>
          </Link>
        </div>
      </div>

      <div className="veiled-chapter__images">
        <button
          type="button"
          data-crop
          data-parallax-main
          className="veiled-chapter__main"
          style={{ backgroundImage: `url(${project.src})` }}
          onClick={openFullImage}
          aria-label={`View full-size image of ${project.name}`}
        />
        <div className="veiled-chapter__pair">
          <button
            type="button"
            data-crop
            className="veiled-chapter__pair-item"
            style={{ backgroundImage: `url(${project.src})`, backgroundSize: '300%', backgroundPosition: '30% 20%' }}
            onClick={openFullImage}
            aria-label={`View full-size image of ${project.name}`}
          />
          <button
            type="button"
            data-crop
            className="veiled-chapter__pair-item"
            style={{ backgroundImage: `url(${project.src})`, backgroundSize: '380%', backgroundPosition: '52% 30%' }}
            onClick={openFullImage}
            aria-label={`View full-size image of ${project.name}`}
          />
        </div>
        <button
          type="button"
          data-crop
          className="veiled-chapter__final"
          style={{ backgroundImage: `url(${project.src})`, backgroundSize: '170%', backgroundPosition: '50% 88%' }}
          onClick={openFullImage}
          aria-label={`View full-size image of ${project.name}`}
        >
          <div className="type-mono veiled-chapter__final-caption">THE APPROACH — SHADE BEFORE THRESHOLD</div>
        </button>
      </div>
    </section>
  );
}
