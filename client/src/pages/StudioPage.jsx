import { RouteTransition } from '../components/layout/RouteTransition.jsx';
import { SplitTextReveal } from '../components/typography/SplitTextReveal.jsx';
import { site } from '../data/site.js';
import { projects } from '../data/projects.js';
import { isUnset } from '../utils/placeholder.js';
import { LogoMark } from '../components/brand/LogoMark.jsx';
import './studio-page.css';

export function StudioPage() {
  return (
    <RouteTransition>
      <section className="studio-page" data-nav-theme="light">
        <div className="type-mono studio-page__label">THE DESIGNER</div>
        <h1 className="studio-page__name">
          <SplitTextReveal lines={['ALI', 'YOUSSEF']} variant="editorial" />
        </h1>
        <p className="studio-page__quote">&ldquo;{site.quote}&rdquo;</p>

        <div className="studio-page__portrait" aria-hidden="true">
          <LogoMark size={56} className="studio-page__portrait-mark" />
        </div>

        <div className="studio-page__grid">
          <div className="studio-page__block">
            <div className="type-mono studio-page__block-title">DISCIPLINES</div>
            <ul className="studio-page__list">
              {site.disciplineList.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="studio-page__block">
            <div className="type-mono studio-page__block-title">PRACTICE</div>
            <div className="type-mono studio-page__practice">
              <div>BASED&nbsp;&nbsp;&nbsp;{site.based}</div>
              {!isUnset(site.city) ? <div>CITY&nbsp;&nbsp;&nbsp;&nbsp;{site.city}</div> : null}
              <div>WORKS&nbsp;&nbsp;&nbsp;{String(projects.length).padStart(3, '0')} CATALOGUED</div>
              <div>STATUS&nbsp;&nbsp;{site.status}</div>
            </div>
          </div>
        </div>

        <p className="studio-page__note">
          A practice shaped by a country of stone walls and hard sun — where every room is a
          negotiation between shade and sea light. Each project catalogued here is a
          visualisation; commissioned works are developed individually with each client.
        </p>
      </section>
    </RouteTransition>
  );
}
