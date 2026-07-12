import { Link } from 'react-router-dom';
import { ImageReveal } from '../media/ImageReveal.jsx';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { MagneticLink } from '../interaction/MagneticLink.jsx';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import { getAdjacentProject, projects, catalogueImages } from '../../data/projects.js';
import { isUnset } from '../../utils/placeholder.js';
import './project-detail.css';

const HERO_VARIANT = {
  cinematic: 'aperture',
  editorial: 'curtain',
  gallery: 'mask',
  compact: 'depth',
};

export function ProjectDetail({ project }) {
  const next = getAdjacentProject(project.slug);
  const titleWords = project.name.split(' ');
  const catalogueIndex = projects.findIndex((p) => p.slug === project.slug);
  const openHeroLightbox = useLightboxTrigger(catalogueImages, catalogueIndex);

  return (
    <article className={`project-detail project-detail--${project.layout}`} data-nav-theme="dark">
      <header className="project-detail__opening">
        <div className="project-detail__ghost" aria-hidden="true">{project.index}</div>
        <div className="type-mono project-detail__scene-label">
          PROJECT {project.index} / 009 &middot; {project.typology}
        </div>
        <h1 className="project-detail__title">
          <SplitTextReveal lines={titleWords} variant="editorial" />
        </h1>
        <p className="project-detail__intent">{project.intent}</p>
        <div className="type-mono project-detail__meta">
          <div>TYPE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.type}</div>
          <div>SURFACE&nbsp;&nbsp;{project.surface}</div>
          <div>STATUS&nbsp;&nbsp;&nbsp;{project.status}</div>
          {!isUnset(project.location) ? <div className="is-muted">LOCATION&nbsp;&nbsp;{project.location}</div> : null}
        </div>
      </header>

      <button
        type="button"
        className="project-detail__hero"
        aria-label={`View full-size image of ${project.name}`}
        onClick={openHeroLightbox}
      >
        <ImageReveal
          src={project.src}
          alt={`${project.name} — hero`}
          variant={HERO_VARIANT[project.layout] || 'depth'}
          eager
        />
      </button>

      {project.chapters.length ? (
        <div className={`project-detail__chapters project-detail__chapters--${project.layout}`}>
          {project.chapters.map((chapter, i) => (
            <figure className="project-detail__chapter" key={chapter.caption || chapter.label || i}>
              <button
                type="button"
                className="project-detail__chapter-img"
                aria-label={`View full-size image — ${chapter.caption || chapter.label}`}
                style={{
                  backgroundImage: `url(${project.src})`,
                  backgroundSize: chapter.size || 'cover',
                  backgroundPosition: chapter.pos || 'center',
                }}
                onClick={openHeroLightbox}
              />
              <figcaption className="type-mono">
                {chapter.num ? `${chapter.num} — ` : ''}
                {chapter.caption || chapter.label}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      <nav className="project-detail__next" aria-label="Next project">
        <span className="type-mono project-detail__next-label">NEXT PROJECT</span>
        <MagneticLink as={Link} to={`/work/${next.slug}`} className="project-detail__next-link" strength={6}>
          <span className="project-detail__next-thumb" style={{ backgroundImage: `url(${next.src})` }} aria-hidden="true" />
          <span className="project-detail__next-name">{next.name}</span>
          <span className="project-detail__next-arrow" aria-hidden="true">→</span>
        </MagneticLink>
      </nav>
    </article>
  );
}
