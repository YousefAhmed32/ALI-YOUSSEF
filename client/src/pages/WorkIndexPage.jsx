import { RouteTransition } from '../components/layout/RouteTransition.jsx';
import { ArchiveList } from '../components/sections/ArchiveList.jsx';
import { SplitTextReveal } from '../components/typography/SplitTextReveal.jsx';
import { projects } from '../data/projects.js';
import './work-index-page.css';

export function WorkIndexPage() {
  return (
    <RouteTransition>
      <section className="work-index-header" data-nav-theme="light">
        <div className="type-mono work-index-header__label">WORK — FULL INDEX</div>
        <h1 className="work-index-header__title">
          <SplitTextReveal lines={['NINE WORKS,', 'ONE PRACTICE.']} variant="editorial" />
        </h1>
        <p className="work-index-header__intro">
          {projects.length} projects catalogued between mountain and sea — residences, commercial
          volumes and interior studies, each read as a negotiation between mass and opening.
        </p>
      </section>
      <ArchiveList heading="INDEX" showGhost />
    </RouteTransition>
  );
}
