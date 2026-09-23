import { useState, useMemo } from 'react';
import { aiFilms } from '../../data/aiStudio.js';
import { AiFilmModal } from './AiFilmModal.jsx';

const CATEGORIES = [
  { id: 'all', label: 'ALL COMMERCIALS (6)' },
  { id: 'automotive', label: 'AUTOMOTIVE & SPEED', match: (f) => f.category.includes('AUTOMOTIVE') },
  { id: 'beverage', label: 'BEVERAGE & FLUIDS', match: (f) => f.category.includes('INDUSTRIAL') },
  { id: 'fashion', label: 'LUXURY & FASHION', match: (f) => f.category.includes('HAUTE') },
  { id: 'macro', label: 'MACRO & COFFEE', match: (f) => f.category.includes('FOOD') },
  { id: 'director', label: 'DIRECTOR STATEMENT', match: (f) => f.category.includes('DIRECTOR') },
];

export function AiFilmsShowcase() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFilms = useMemo(() => {
    if (activeCategory === 'all') return aiFilms;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    return cat?.match ? aiFilms.filter(cat.match) : aiFilms;
  }, [activeCategory]);

  return (
    <section id="films" className="ai-section">
      <div className="ai-section__header">
        <div className="ai-section__eyebrow">
          <span className="ai-section__eyebrow-line" />
          <span>CHAPTER 01 // SYNTHETIC CINEMATOGRAPHY &amp; TVC REEL</span>
        </div>
        <h2 className="ai-section__title">
          FLAGSHIP COMMERCIAL FILMS <span className="ai-section__title-serif">(6 Real Works)</span>
        </h2>
        <p className="ai-section__desc">
          High-velocity commercial productions directed for broadcast and social platforms. Each piece demonstrates continuous 3D camera
          trajectories, zero temporal jitter, photorealistic volumetric lighting, and custom sound design.
        </p>

        {/* Category Filter Tabs */}
        <div className="ai-films-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`ai-filter-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ai-films-grid">
        {filteredFilms.map((film) => (
          <article key={film.id} className="ai-film-card">
            <div
              className="ai-film-card__media"
              onClick={() => setSelectedFilm(film)}
              role="button"
              tabIndex={0}
              aria-label={`Play commercial film: ${film.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedFilm(film);
                }
              }}
            >
              <img
                src={film.thumbnail}
                alt={film.title}
                className="ai-film-card__img"
                loading="lazy"
              />

              <div className="ai-film-card__top-pills">
                <span className="ai-film-card__pill">{film.tag}</span>
                <span className="ai-film-card__pill" style={{ color: 'var(--ai-gold)' }}>
                  {film.duration} // 4K UHD
                </span>
              </div>

              <div className="ai-film-card__play-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <div className="ai-film-card__live-indicator">
                <span className="ai-film-card__live-dot" />
                <span>YOUTUBE 4K DIRECT</span>
              </div>
            </div>

            <div className="ai-film-card__info">
              <div className="ai-film-card__category">{film.category}</div>
              <h3 className="ai-film-card__title">{film.title}</h3>
              {film.titleAr && (
                <div className="ai-film-card__title-ar" style={{ direction: 'rtl', textAlign: 'left' }}>
                  {film.titleAr}
                </div>
              )}
              <p className="ai-film-card__synopsis">{film.synopsis}</p>

              <div className="ai-film-card__tech-row">
                {film.stack.map((tech) => (
                  <span key={tech} className="ai-film-card__tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="ai-film-card__footer">
                <span className="ai-film-card__client">{film.client}</span>
                <button
                  type="button"
                  className="ai-film-card__open-btn"
                  onClick={() => setSelectedFilm(film)}
                >
                  <span>INSPECT &amp; PLAY</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <AiFilmModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </section>
  );
}
