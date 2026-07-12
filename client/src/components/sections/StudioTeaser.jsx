import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projects.js';
import { site } from '../../data/site.js';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { MagneticLink } from '../interaction/MagneticLink.jsx';
import './studio-teaser.css';

const backdrop = getProjectBySlug('aperture-house');

export function StudioTeaser() {
  return (
    <section className="studio-teaser" data-nav-theme="light" aria-labelledby="studio-teaser-title">
      <div className="studio-teaser__media" style={{ backgroundImage: `url(${backdrop.src})` }} aria-hidden="true" />
      <div className="studio-teaser__plane" aria-hidden="true" />

      <div className="studio-teaser__content">
        <div className="type-mono studio-teaser__label">SCENE 09 — THE DESIGNER</div>
        <h2 id="studio-teaser-title" className="studio-teaser__name">
          <SplitTextReveal lines={['ALI', 'YOUSSEF']} variant="editorial" />
        </h2>
        <p className="studio-teaser__quote">&ldquo;{site.quote}&rdquo;</p>
        <MagneticLink as={Link} to="/studio" className="studio-teaser__cta type-mono" strength={8}>
          <span>ENTER THE STUDIO</span>
          <span aria-hidden="true">→</span>
        </MagneticLink>
      </div>
    </section>
  );
}
