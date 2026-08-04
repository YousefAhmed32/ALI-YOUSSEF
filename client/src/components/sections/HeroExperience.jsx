import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { projects } from '../../data/projects.js';
import { site } from '../../data/site.js';
import { RESUME_URL, RESUME_FILE_NAME, CV_DOWNLOAD_ENABLED } from '../../data/resume.js';
import { LetterType } from '../typography/LetterType.jsx';
import { DownloadIcon } from '../brand/DownloadIcon.jsx';
import { MagneticLink } from '../interaction/MagneticLink.jsx';
import { useGSAPContext } from '../../hooks/useGSAPContext.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useLetterMagnet } from '../../hooks/useLetterMagnet.js';
import { isUnset } from '../../utils/placeholder.js';
import './hero-experience.css';

const heroProject = projects.find((p) => p.index === '003');

export function HeroExperience() {
  const reducedMotion = useReducedMotion();
  const isWideViewport = useMediaQuery('(min-width: 900px)');
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const isDesktop = isWideViewport && isFinePointer;
  const titleRef = useRef(null);

  useLetterMagnet(titleRef, isDesktop && !reducedMotion);

  const scope = useGSAPContext((root) => {
    if (reducedMotion) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.fromTo(root.querySelector('.hero__media'), { opacity: 0 }, { opacity: 1, duration: 1.1 })
      .fromTo(
        root.querySelector('.hero__media img'),
        { clipPath: 'inset(0% 46% 0% 0%)', scale: 1.12 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.6, ease: 'expo.inOut' },
        '-=0.6'
      )
      .fromTo(
        root.querySelectorAll('.hero__title-line--ali [data-letter]'),
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.035 },
        '-=1.1'
      )
      .fromTo(
        root.querySelectorAll('.hero__title-line--youssef [data-letter]'),
        { yPercent: 130, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.03 },
        '-=0.75'
      )
      .fromTo(
        root.querySelector('.hero__disciplines'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        [root.querySelector('.hero__metadata'), root.querySelector('.hero__actions')],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(
        [root.querySelector('.hero__tension'), root.querySelector('.hero__scroll-cue'), root.querySelector('.hero__label')],
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.5'
      );

    return () => tl.kill();
  }, []);

  return (
    <section ref={scope} className="hero" data-nav-theme="light" aria-label="Ali Youssef — arrival">
      <div className="hero__media">
        <img src={heroProject.src} alt={`${heroProject.name} — featured project`} fetchPriority="high" />
        <div className="hero__media-gradient" aria-hidden="true" />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__label type-mono">SCENE 01 — ARRIVAL &middot; BASED IN {site.based}</div>

      <h1 className="hero__title" ref={titleRef}>
        <span className="sr-only">{site.name}</span>
        <div className="hero__title-line hero__title-line--ali">
          <LetterType word="ALI" />
        </div>
        <div className="hero__title-line hero__title-line--youssef">
          <LetterType word="YOUSSEF" />
        </div>
      </h1>

      <div className="hero__intro">
        <div className="hero__disciplines">
          {site.disciplines.map((d, i) => (
            <div key={d} className={i === 1 ? 'is-accent' : ''}>
              {d}
            </div>
          ))}
        </div>

        <div className="hero__actions">
          <MagneticLink as={Link} to="/work" strength={8} className="hero__cta hero__cta--primary type-mono">
            <span>VIEW THE WORK</span>
            <span className="hero__cta-icon" aria-hidden="true">→</span>
          </MagneticLink>
          <MagneticLink
            as="a"
            href={CV_DOWNLOAD_ENABLED ? RESUME_URL : undefined}
            download={CV_DOWNLOAD_ENABLED ? RESUME_FILE_NAME : undefined}
            target="_blank"
            rel="noopener noreferrer"
            strength={8}
            className="hero__cta hero__cta--secondary type-mono"
            aria-label={CV_DOWNLOAD_ENABLED ? "Download Ali Youssef's CV as a PDF — opens in a new tab" : 'CV updating — download temporarily unavailable'}
            aria-disabled={!CV_DOWNLOAD_ENABLED}
            onClick={(e) => { if (!CV_DOWNLOAD_ENABLED) e.preventDefault(); }}
            style={!CV_DOWNLOAD_ENABLED ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : undefined}
          >
            <span>{CV_DOWNLOAD_ENABLED ? 'DOWNLOAD CV' : 'CV Updating...'}</span>
            <DownloadIcon size={13} className="hero__cta-icon" />
          </MagneticLink>
        </div>
      </div>

      <div className="hero__metadata type-mono">
        <div>PROJECT&nbsp;&nbsp;{heroProject.index} — {heroProject.name}</div>
        <div>MASS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{heroProject.surface}</div>
        {!isUnset(heroProject.location) ? <div className="is-muted">LOCATION&nbsp;&nbsp;{heroProject.location}</div> : null}
      </div>

      <div className="hero__tension type-mono">
        <span>MASS</span>
        <span className="hero__tension-rule" />
        <span>OPENING</span>
        <span className="hero__tension-rule" />
        <span>LIGHT</span>
      </div>

      <div className="hero__scroll-cue type-mono">SCROLL — THE APERTURE OPENS</div>
    </section>
  );
}
