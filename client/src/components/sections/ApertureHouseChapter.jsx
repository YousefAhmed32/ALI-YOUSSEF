import { Link } from 'react-router-dom';
import { getProjectBySlug, projects, catalogueImages } from '../../data/projects.js';
import { ImageReveal } from '../media/ImageReveal.jsx';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { useCursorTarget } from '../interaction/useCursorTarget.js';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import { isUnset } from '../../utils/placeholder.js';
import './aperture-house-chapter.css';

const project = getProjectBySlug('aperture-house');
const catalogueIndex = projects.findIndex((p) => p.slug === project.slug);

export function ApertureHouseChapter() {
  const cursorProps = useCursorTarget('view');
  const openFullImage = useLightboxTrigger(catalogueImages, catalogueIndex);

  return (
    <section className="aperture-chapter" data-nav-theme="light" aria-labelledby="aperture-chapter-title">
      <div className="aperture-chapter__ghost" aria-hidden="true">002</div>

      <div className="aperture-chapter__head">
        <div className="type-mono">SCENE 03 — THE GALLERY&nbsp;&nbsp;002 / 009</div>
        <div className="type-mono">TWO SYNCHRONISED FRAMES</div>
      </div>

      <div className="aperture-chapter__frames">
        <Link to={`/work/${project.slug}`} className="aperture-chapter__frame-a" {...cursorProps}>
          <ImageReveal src={project.src} alt={`${project.name} — full elevation`} variant="aperture" />
          <div className="aperture-chapter__panel type-mono">
            <div className="aperture-chapter__panel-title">{project.name}</div>
            <div>FRAME&nbsp;&nbsp;&nbsp;{project.surface}</div>
            <div>WATER&nbsp;&nbsp;&nbsp;FALLS THROUGH VOID</div>
            <div>TYPE&nbsp;&nbsp;&nbsp;&nbsp;{project.type}</div>
            {!isUnset(project.location) ? <div className="is-muted">LOCATION&nbsp;&nbsp;{project.location}</div> : null}
          </div>
          <span className="aperture-chapter__frame-label type-mono">FRAME A — THE FULL CUT</span>
        </Link>

        <div className="aperture-chapter__frame-b">
          <button
            type="button"
            className="aperture-chapter__crop"
            style={{ backgroundImage: `url(${project.src})`, backgroundSize: '300%', backgroundPosition: '62% 42%' }}
            onClick={openFullImage}
            aria-label={`View full-size image of ${project.name}`}
          />
          <span className="aperture-chapter__frame-label type-mono">FRAME B — THE FALLING WATER</span>
        </div>
      </div>

      <blockquote className="aperture-chapter__quote">
        <SplitTextReveal
          as="p"
          variant="manifesto"
          className="aperture-chapter__quote-text"
          lines={['The opening is the room. Everything else is wall, waiting.']}
        />
      </blockquote>
    </section>
  );
}
