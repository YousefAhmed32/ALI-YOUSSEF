import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectBySlug, projects, catalogueImages } from '../../data/projects.js';
import { useCursorTarget } from '../interaction/useCursorTarget.js';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import './facet-kitchen-section.css';

const project = getProjectBySlug('facet-kitchen');
const catalogueIndex = projects.findIndex((p) => p.slug === project.slug);

export function FacetKitchenSection() {
  const [active, setActive] = useState(0);
  const cursorProps = useCursorTarget('view');
  const openFullImage = useLightboxTrigger(catalogueImages, catalogueIndex);
  const detail = project.chapters[active];

  return (
    <section className="facet" data-nav-theme="light" aria-labelledby="facet-title">
      <div className="facet__head type-mono">
        <span>SCENE 07 — CLOSE READING&nbsp;&nbsp;009 / 009</span>
        <span>HOVER THE CROPS — THE PLATE CHANGES</span>
      </div>

      <div className="facet__grid">
        <div className="facet__intro">
          <div>
            <h2 id="facet-title" className="facet__title">
              FACET<br />KITCHEN
            </h2>
            <p>{project.intent}</p>
          </div>
          <div className="type-mono facet__meta">
            <div>TYPE&nbsp;&nbsp;&nbsp;&nbsp;{project.type}</div>
            <div>PLATE&nbsp;&nbsp;&nbsp;{detail.label}</div>
          </div>
        </div>

        <div className="facet__plate">
          <Link to={`/work/${project.slug}`} className="facet__plate-link" {...cursorProps}>
            <div
              className="facet__plate-img"
              style={{ backgroundImage: `url(${project.src})`, backgroundSize: detail.size, backgroundPosition: detail.pos }}
            />
            <div className="type-mono facet__plate-caption">{detail.caption}</div>
          </Link>
          <button
            type="button"
            className="facet__plate-expand type-mono"
            onClick={openFullImage}
            aria-label="View full-size image"
          >
            VIEW FULL ↗
          </button>
        </div>

        <div className="facet__thumbs">
          {project.chapters.map((d, i) => (
            <button
              key={d.num}
              type="button"
              className={`facet__thumb${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                setActive(i);
                openFullImage(e);
              }}
              aria-pressed={i === active}
              aria-label={`${d.caption} — view full-size`}
            >
              <span
                className="facet__thumb-img"
                style={{ backgroundImage: `url(${project.src})`, backgroundSize: d.size, backgroundPosition: d.pos }}
              />
              <span className="type-mono facet__thumb-num">{d.num}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
