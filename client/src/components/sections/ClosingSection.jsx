import { Link } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projects.js';
import { site } from '../../data/site.js';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { MagneticLink } from '../interaction/MagneticLink.jsx';
import { LogoMark } from '../brand/LogoMark.jsx';
import './closing-section.css';

const backdrop = getProjectBySlug('veiled-stone-house');

export function ClosingSection() {
  return (
    <section className="closing" data-nav-theme="dark" aria-label="Closing threshold">
      <div className="closing__media" style={{ backgroundImage: `url(${backdrop.src})` }} aria-hidden="true" />
      <div className="closing__rule" aria-hidden="true" />

      <div className="type-mono closing__label">END OF SEQUENCE&nbsp;&nbsp;009 / 009</div>

      <div className="closing__lines">
        {site.closingLines.map((line) => (
          <SplitTextReveal
            key={line.text}
            as="div"
            variant="manifesto"
            lines={[line.text]}
            className={[
              'closing__line',
              line.indent ? `closing__line--indent-${line.indent === 1 ? 'lg' : 'md'}` : '',
              line.emphasis ? 'closing__line--emphasis' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>

      <div className="type-mono closing__meta">
        <span>COMMISSIONS&nbsp;&nbsp;[ EMAIL — {site.email} ]</span>
        <span>PORTFOLIO PDF&nbsp;&nbsp;ON REQUEST</span>
        <span>{site.based}</span>
      </div>

      <MagneticLink as={Link} to="/contact" className="closing__cta type-mono" strength={10}>
        <span>BEGIN A COMMISSION</span>
        <span aria-hidden="true">→</span>
      </MagneticLink>

      <div className="type-mono closing__footer">
        <LogoMark size={16} className="closing__footer-mark" aria-hidden="true" />
        <span>MASS / OPENING / LIGHT</span>
        <span>MADE AS ARCHITECTURE, NOT A PAGE</span>
      </div>
    </section>
  );
}
