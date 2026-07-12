import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projects.js';
import { ImageReveal } from '../media/ImageReveal.jsx';
import { useCursorTarget } from '../interaction/useCursorTarget.js';
import './typologies-section.css';

const prism = getProjectBySlug('prism-mall');
const current = getProjectBySlug('current-villa');

export function TypologiesSection() {
  const cursorProps = useCursorTarget('view');

  return (
    <section className="typologies" data-nav-theme="light" aria-label="Return to day — 007 to 008">
      <div className="typologies__head type-mono">
        <span>SCENE 06 — RETURN TO DAY&nbsp;&nbsp;007–008 / 009</span>
        <span>CITY / EXPERIMENT</span>
      </div>

      <Link to={`/work/${prism.slug}`} className="typologies__prism" {...cursorProps}>
        <img src={prism.src} alt={prism.name} loading="lazy" decoding="async" />
        <div className="typologies__prism-caption">
          <div className="typologies__prism-heading">007 — {prism.name}</div>
          <div className="type-mono">{prism.typology} — {prism.intent}</div>
        </div>
      </Link>

      <div className="typologies__current">
        <div className="typologies__current-text">
          <div className="typologies__current-ghost" aria-hidden="true">008</div>
          <h3 className="typologies__current-title">
            CURRENT<br />VILLA
          </h3>
          <p>{current.intent}</p>
        </div>
        <Link to={`/work/${current.slug}`} className="typologies__current-frame" {...cursorProps}>
          <span className="typologies__current-frame-outline" aria-hidden="true" />
          <ImageReveal src={current.src} alt={current.name} variant="mask" />
          <span className="typologies__current-corner" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
