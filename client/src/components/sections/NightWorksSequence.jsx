import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projects.js';
import { ImageReveal } from '../media/ImageReveal.jsx';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { useCursorTarget } from '../interaction/useCursorTarget.js';
import './night-works-sequence.css';

const strata = getProjectBySlug('strata-building');
const ember = getProjectBySlug('ember-villa');
const fin = getProjectBySlug('fin-house');

export function NightWorksSequence() {
  const cursorProps = useCursorTarget('view');

  return (
    <section className="night-works" data-nav-theme="dark" aria-label="After sundown — 004 to 006">
      <div className="night-works__head type-mono">
        <span>SCENE 05 — AFTER SUNDOWN&nbsp;&nbsp;004–006 / 009</span>
        <span>THREE WORKS, ONE LIGHT</span>
      </div>

      <Link to={`/work/${strata.slug}`} className="night-works__strata" {...cursorProps}>
        <img src={strata.src} alt={`${strata.name} — full elevation`} loading="lazy" decoding="async" />
        <div className="night-works__strata-gradient" aria-hidden="true" />
        <div className="night-works__strata-title">
          <div className="night-works__ghost">004</div>
          <h3>{strata.name}</h3>
        </div>
        <div className="type-mono night-works__strata-note">
          {strata.typology} — GLASS HELD BETWEEN PLANES
        </div>
      </Link>

      <div className="night-works__pair">
        <div className="night-works__pair-a">
          <ImageReveal src={ember.src} alt={ember.name} variant="depth" />
          <Link to={`/work/${ember.slug}`} className="type-mono night-works__pair-caption" {...cursorProps}>
            005 — {ember.name} &middot; {ember.intent}
          </Link>
        </div>
        <div className="night-works__pair-numeral" aria-hidden="true">
          005<br />006
        </div>
        <div className="night-works__pair-b">
          <ImageReveal src={fin.src} alt={fin.name} variant="curtain" />
          <Link to={`/work/${fin.slug}`} className="type-mono night-works__pair-caption night-works__pair-caption--right" {...cursorProps}>
            006 — {fin.name} &middot; {fin.intent}
          </Link>
        </div>
      </div>

      <SplitTextReveal
        as="p"
        variant="manifesto"
        className="night-works__quote"
        lines={['At night the section reverses: the opening glows, and the mass disappears around it.']}
      />
    </section>
  );
}
