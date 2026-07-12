import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, catalogueImages } from '../../data/projects.js';
import { useCursorTarget } from '../interaction/useCursorTarget.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import './archive-list.css';

export function ArchiveList({ heading = 'SCENE 08 — ARCHIVE', showGhost = true }) {
  const [active, setActive] = useState(0);
  const isFine = useMediaQuery('(pointer: fine)');
  const activeProject = projects[active];
  const openCursor = useCursorTarget('open');
  const openPreviewLightbox = useLightboxTrigger(catalogueImages, active);

  return (
    <section className="archive-list" data-nav-theme="light" aria-label="Archive">
      {showGhost ? (
        <div
          className="archive-list__ghost"
          style={{ backgroundImage: `url(${activeProject.src})` }}
          aria-hidden="true"
        />
      ) : null}

      <div className="archive-list__head">
        <div className="type-mono">{heading} &middot; {projects.length} WORKS</div>
        <div className="type-mono">HOVER — THE ROOM FILLS</div>
      </div>

      <div className="archive-list__grid">
        <ul className="archive-list__rows">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                to={`/work/${p.slug}`}
                className={`archive-list__row${i === active ? ' is-active' : ''}`}
                onMouseEnter={() => isFine && setActive(i)}
                onFocus={() => setActive(i)}
                {...openCursor}
              >
                <span className="archive-list__index">{p.index}</span>
                <span className="archive-list__name">{p.name}</span>
                <span className="type-mono archive-list__typology">{p.typology}</span>
                <span className="type-mono archive-list__status">{p.status}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="archive-list__preview">
          <button
            type="button"
            className="archive-list__preview-trigger"
            onClick={openPreviewLightbox}
            aria-label={`View full-size image of ${activeProject.name}`}
          >
            <img src={activeProject.src} alt={`${activeProject.name} preview`} className="archive-list__preview-img" />
          </button>
          <div className="type-mono archive-list__preview-caption">
            <span>{activeProject.code}</span>
            <span>{activeProject.name}</span>
          </div>
          <Link to={`/work/${activeProject.slug}`} className="type-mono archive-list__preview-cta">
            <span>OPEN PROJECT</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
