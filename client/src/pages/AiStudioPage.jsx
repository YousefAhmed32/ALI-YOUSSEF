import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AiStudioLayout } from '../components/ai/AiStudioLayout.jsx';
import {
  aiDisciplines,
  aiFilms,
  aiProcess,
  aiProducts,
  aiStudioMeta,
  aiToolchain,
  filmCategories,
} from '../data/aiStudio.js';
import { contact } from '../data/contact.js';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 7 8 5-8 5V7Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function useRevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.ai-reveal'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function MediaModal({ item, allItems = [], onSelect, onClose, onCopyPrompt, isCopied }) {
  useEffect(() => {
    if (!item) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (allItems.length > 1) {
        const currentIndex = allItems.findIndex((x) => x.id === item.id || x.title === item.title);
        if (event.key === 'ArrowRight') {
          const nextIndex = (currentIndex + 1) % allItems.length;
          onSelect({ ...allItems[nextIndex], mediaType: item.mediaType });
        } else if (event.key === 'ArrowLeft') {
          const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
          onSelect({ ...allItems[prevIndex], mediaType: item.mediaType });
        }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [item, allItems, onSelect, onClose]);

  if (!item) return null;

  const isFilm = item.mediaType === 'film';
  const currentIndex = allItems.findIndex((x) => x.id === item.id || x.title === item.title);
  const hasMultiple = allItems.length > 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    onSelect({ ...allItems[prevIndex], mediaType: item.mediaType });
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % allItems.length;
    onSelect({ ...allItems[nextIndex], mediaType: item.mediaType });
  };

  return (
    <div className="ai-modal" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button type="button" className="ai-modal__close" onClick={onClose} aria-label="Close viewer">
        Close <span aria-hidden="true">×</span>
      </button>

      {/* Prev / Next Controls */}
      {hasMultiple && (
        <>
          <button
            type="button"
            className="ai-modal__nav ai-modal__nav--prev"
            onClick={handlePrev}
            aria-label="Previous item (Left Arrow)"
          >
            ‹
          </button>
          <button
            type="button"
            className="ai-modal__nav ai-modal__nav--next"
            onClick={handleNext}
            aria-label="Next item (Right Arrow)"
          >
            ›
          </button>
        </>
      )}

      <div
        className={`ai-modal__content ${isFilm ? 'is-film' : 'is-image'}`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Ambient backlight blur */}
        <div
          className="ai-modal__ambient-glow"
          style={{ backgroundImage: `url(${item.thumbnail || item.image})` }}
          aria-hidden="true"
        />

        {isFilm ? (
          <div className="ai-modal__player-frame">
            <iframe
              src={item.videoUrl}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="ai-modal__image-frame">
            <img src={item.image} alt={item.alt} decoding="async" />
          </div>
        )}

        <div className="ai-modal__caption">
          <div className="ai-modal__caption-info">
            <div className="ai-modal__meta-tags">
              <span>{item.category}</span>
              {item.duration && <span className="ai-modal__tag-highlight">{item.duration} · {item.resolution}</span>}
              {item.lens && <span className="ai-modal__tag-highlight">{item.lens}</span>}
            </div>
            <strong>{item.title}</strong>
            {item.statement && <p className="ai-modal__statement">“{item.statement}”</p>}
            {item.cinematics && <p className="ai-modal__cinematics">Kinematics: {item.cinematics}</p>}
            {item.materials && <p className="ai-modal__materials">CMF: {item.materials}</p>}
          </div>

          <div className="ai-modal__actions">
            {item.promptDirective && (
              <button
                type="button"
                className={`ai-modal__prompt-btn ${isCopied ? 'is-copied' : ''}`}
                onClick={() => onCopyPrompt(item.promptDirective)}
                title="Copy prompt directive to clipboard"
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
                <span>{isCopied ? 'Copied Prompt' : 'Copy Prompt Directive'}</span>
              </button>
            )}

            {isFilm && (
              <a
                href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-modal__yt-link"
              >
                Watch on YouTube <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroVisual({ onPlay }) {
  const visualRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!visualRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visualRef.current.style.setProperty('--tilt-x', `${x * 10}deg`);
    visualRef.current.style.setProperty('--tilt-y', `${y * -8}deg`);
    visualRef.current.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    visualRef.current.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };

  const resetPointer = () => {
    if (!visualRef.current) return;
    visualRef.current.style.setProperty('--tilt-x', '0deg');
    visualRef.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={visualRef}
      className="ai-hero-visual"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-label="Selected generative image and film compositions"
    >
      <div className="ai-hero-visual__orbit ai-hero-visual__orbit--one" />
      <div className="ai-hero-visual__orbit ai-hero-visual__orbit--two" />

      <div className="ai-hero-visual__card ai-hero-visual__card--back">
        <img src={aiProducts[1].image} alt="" decoding="async" />
        <span>JEWELLERY / 02</span>
      </div>

      <button
        type="button"
        className="ai-hero-visual__card ai-hero-visual__card--main"
        onClick={onPlay}
        aria-label={`Play ${aiFilms[0].title}`}
      >
        <img src={aiFilms[0].thumbnail} alt="Automotive AI film still" decoding="async" />
        <span className="ai-hero-visual__scan" aria-hidden="true" />
        <span className="ai-hero-visual__play">
          <PlayIcon />
        </span>
        <span className="ai-hero-visual__label">REEL / 01 · 4K</span>
      </button>

      <div className="ai-hero-visual__card ai-hero-visual__card--front">
        <img src={aiProducts[2].image} alt="" decoding="async" />
        <span>SCULPTURE / 03</span>
      </div>

      <div className="ai-hero-visual__badge">
        <span>AI</span>
        <small>Creative<br />Director</small>
      </div>
    </div>
  );
}

function FilmCard({ film, featured = false, onOpen, onCopyPrompt, isCopied }) {
  return (
    <article className={`ai-film-card ai-reveal ${featured ? 'is-featured' : ''}`}>
      <button
        type="button"
        className="ai-film-card__media"
        onClick={() => onOpen({ ...film, mediaType: 'film' })}
      >
        <img src={film.thumbnail} alt={`${film.title} film still`} decoding="async" />
        <span className="ai-film-card__shade" />
        
        {/* Top Badges */}
        <div className="ai-film-card__header-tags">
          <span className="ai-film-card__tag-category">{film.category}</span>
          <span className="ai-film-card__tag-spec">{film.duration} · {film.resolution}</span>
        </div>

        <span className="ai-film-card__play" aria-hidden="true"><PlayIcon /></span>
        <span className="ai-film-card__index">{film.number}</span>
        
        {/* Bottom Kinematics Tag */}
        {film.cinematics && (
          <div className="ai-film-card__kinematics">
            <span className="ai-film-card__kinematics-dot" />
            <span>{film.cinematics}</span>
          </div>
        )}

        <span className="ai-film-card__watch">Play film <ArrowIcon /></span>
      </button>

      <div className="ai-film-card__info">
        <div>
          <p>{film.category}</p>
          <h3>{film.title}</h3>
          {film.tools && (
            <div className="ai-film-card__tools">
              {film.tools.map((t) => (
                <span key={t} className="ai-film-card__tool-chip">{t}</span>
              ))}
            </div>
          )}
        </div>
        <div className="ai-film-card__meta">
          <span>{film.format}</span>
          <span>{film.year}</span>
          {film.promptDirective && (
            <button
              type="button"
              className="ai-film-card__copy-prompt-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCopyPrompt(film.promptDirective);
              }}
              title="Copy prompt directive"
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
              <span>{isCopied ? 'Copied' : 'Prompt'}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductFigure({ product, index, onOpen, onCopyPrompt, isCopied }) {
  const [inspectOpen, setInspectOpen] = useState(false);

  return (
    <figure className={`ai-product ai-product--${index + 1} ai-reveal`}>
      <button
        type="button"
        className="ai-product__media"
        onClick={() => onOpen({ ...product, mediaType: 'image' })}
        aria-label={`Open ${product.title}`}
      >
        <img src={product.image} alt={product.alt} decoding="async" />
        
        {/* Precision Spec Loupe Pill */}
        <div className="ai-product__spec-overlay">
          <span className="ai-product__spec-dot" />
          <span>{product.focalPoint || 'CMF Refraction'}</span>
        </div>

        <span className="ai-product__view">Inspect 8K Master <ArrowIcon /></span>
      </button>

      <figcaption>
        <div className="ai-product__header">
          <span className="ai-product__number">{product.number}</span>
          <div className="ai-product__title-group">
            <h3>{product.title}</h3>
            <p>{product.category}</p>
          </div>
        </div>

        {/* CMF Spec Sheet Drawer */}
        <div className="ai-product__cmf-drawer">
          <button
            type="button"
            className="ai-product__cmf-toggle"
            onClick={() => setInspectOpen(!inspectOpen)}
            aria-expanded={inspectOpen}
          >
            <span>CMF &amp; Optic Blueprint</span>
            <i>{inspectOpen ? '−' : '+'}</i>
          </button>

          {inspectOpen && (
            <div className="ai-product__cmf-details">
              <div><strong>Optics:</strong> {product.lens}</div>
              <div><strong>Lighting:</strong> {product.lighting}</div>
              <div><strong>Materials:</strong> {product.materials}</div>
              {product.promptDirective && (
                <button
                  type="button"
                  className="ai-product__copy-prompt"
                  onClick={() => onCopyPrompt(product.promptDirective)}
                >
                  {isCopied ? <CheckIcon /> : <CopyIcon />}
                  <span>{isCopied ? 'Directive Copied' : 'Copy Prompt Architecture'}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export function AiStudioPage() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProcess, setActiveProcess] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedText, setCopiedText] = useState(null);

  useRevealObserver();

  const handleCopyPrompt = useCallback((prompt) => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopiedText(prompt);
    setToastMessage('Prompt Directive copied to clipboard');
    setTimeout(() => {
      setCopiedText(null);
      setToastMessage(null);
    }, 2800);
  }, []);

  const heroFilm = aiFilms[0];
  const commercialFilms = useMemo(() => {
    if (activeCategory === 'all') {
      return aiFilms.slice(1, 5);
    }
    return aiFilms.filter((f) => f.categoryKey === activeCategory);
  }, [activeCategory]);

  const directorFilm = aiFilms[5];

  const whatsappMessage = encodeURIComponent(
    'Hello Ali, I viewed your Generative Visual Director portfolio and would like to discuss a senior creative role or commercial film project.'
  );
  const whatsappUrl = `https://wa.me/${contact.whatsapp.normalizedNumber}?text=${whatsappMessage}`;

  return (
    <AiStudioLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="ai-toast" role="status" aria-live="polite">
          <CheckIcon />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick Action Dock */}
      <nav className="ai-floating-dock" aria-label="Quick studio navigation">
        <button
          type="button"
          className="ai-dock-btn ai-dock-btn--reel"
          onClick={() => setActiveMedia({ ...heroFilm, mediaType: 'film' })}
        >
          <span className="ai-dock-btn__icon"><PlayIcon /></span>
          <span>Showreel</span>
        </button>
        <span className="ai-dock-divider" />
        <a href="#motion" className="ai-dock-btn">Motion ({aiFilms.length})</a>
        <a href="#images" className="ai-dock-btn">Worlds ({aiProducts.length})</a>
        <a href="#process" className="ai-dock-btn">Method</a>
        <a href="#contact-ai" className="ai-dock-btn ai-dock-btn--cta">Discuss Role ↗</a>
      </nav>

      {/* Hero Section */}
      <section className="ai-hero" aria-labelledby="ai-hero-title">
        <div className="ai-hero__ambient" aria-hidden="true" />
        <div className="ai-hero__grid">
          <div className="ai-hero__copy">
            <p className="ai-kicker ai-hero__kicker">
              <span className="ai-status-dot" />
              {aiStudioMeta.availability}
            </p>

            <h1 id="ai-hero-title">
              <span>{aiStudioMeta.headline[0]}</span>
              <span>{aiStudioMeta.headline[1]}</span>
              <span className="is-accent">{aiStudioMeta.headline[2]}</span>
            </h1>

            <div className="ai-hero__intro-row">
              <p>{aiStudioMeta.intro}</p>
              <div className="ai-hero__actions">
                <a href="#motion" className="ai-button ai-button--primary">
                  Explore Selected Films <ArrowIcon />
                </a>
                <a href="#contact-ai" className="ai-button ai-button--ghost">
                  Discuss a Role
                </a>
              </div>
            </div>
          </div>

          <HeroVisual onPlay={() => setActiveMedia({ ...heroFilm, mediaType: 'film' })} />
        </div>

        <div className="ai-hero__foot">
          <span>{aiStudioMeta.location}</span>
          <span>Scroll to explore</span>
          <span>Creative Director · 2025—26</span>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="ai-marquee" aria-label="Creative disciplines">
        <div className="ai-marquee__track">
          {[...aiDisciplines, ...aiDisciplines].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <i>✳</i>
            </span>
          ))}
        </div>
      </div>

      {/* Section 01: Selected Motion */}
      <section id="motion" className="ai-motion ai-shell">
        <div className="ai-section-heading ai-reveal">
          <p className="ai-kicker">01 / Selected Motion &amp; Commercials</p>
          <h2>Stories built<br /><em>frame by frame.</em></h2>
          <p className="ai-section-heading__body">
            Generative motion studies across automotive, product fluidics, luxury fashion and branded campaigns—directed with strict camera kinematics, optical continuity, and broadcast color grading.
          </p>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="ai-filter-bar ai-reveal" role="tablist" aria-label="Filter motion by discipline">
          {filmCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`ai-filter-pill ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="ai-filter-pill__count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Films Grid */}
        <div className="ai-films-grid">
          {activeCategory === 'all' && (
            <FilmCard
              film={heroFilm}
              featured
              onOpen={setActiveMedia}
              onCopyPrompt={handleCopyPrompt}
              isCopied={copiedText === heroFilm.promptDirective}
            />
          )}

          {commercialFilms.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              featured={activeCategory !== 'all' && commercialFilms.length === 1}
              onOpen={setActiveMedia}
              onCopyPrompt={handleCopyPrompt}
              isCopied={copiedText === film.promptDirective}
            />
          ))}
        </div>

        {/* Director's Spotlight Feature */}
        {(activeCategory === 'all' || activeCategory === 'manifesto') && directorFilm && (
          <aside className="ai-director-spotlight ai-reveal">
            <div className="ai-director-spotlight__media">
              <button
                type="button"
                className="ai-director-spotlight__thumb"
                onClick={() => setActiveMedia({ ...directorFilm, mediaType: 'film' })}
                aria-label={`Play ${directorFilm.title}`}
              >
                <img src={directorFilm.thumbnail} alt={directorFilm.title} decoding="async" />
                <span className="ai-director-spotlight__play" aria-hidden="true"><PlayIcon /></span>
                <span className="ai-director-spotlight__badge">DIRECTOR’S STATEMENT · 5:52</span>
              </button>
            </div>
            <div className="ai-director-spotlight__content">
              <p className="ai-kicker">Creative Vision &amp; Philosophy</p>
              <h3>{directorFilm.title}</h3>
              <blockquote className="ai-director-spotlight__quote">
                “{directorFilm.statement}”
              </blockquote>
              <div className="ai-director-spotlight__actions">
                <button
                  type="button"
                  className="ai-button ai-button--primary"
                  onClick={() => setActiveMedia({ ...directorFilm, mediaType: 'film' })}
                >
                  Watch personal note <PlayIcon />
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${directorFilm.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ai-director-spotlight__yt-link"
                >
                  Open on YouTube <ArrowIcon />
                </a>
              </div>
            </div>
          </aside>
        )}
      </section>

      {/* Section 02: Generative Imagery & Product Worlds */}
      <section id="images" className="ai-images">
        <div className="ai-images__intro ai-shell ai-reveal">
          <p className="ai-kicker">02 / Generative Imagery &amp; CMF</p>
          <h2>Product worlds<br />made <em>without a set.</em></h2>
          <div>
            <p>
              From quiet luxury perfumes to sculptural stone furniture, each scene is engineered with authentic lighting caustics, material refraction, and optical focal depth—not disposable prompts.
            </p>
            <span>Art Direction · CMF Engineering · Prompt Architecture · Retouching</span>
          </div>
        </div>

        <div className="ai-products ai-shell">
          {aiProducts.map((product, index) => (
            <ProductFigure
              key={product.title}
              product={product}
              index={index}
              onOpen={setActiveMedia}
              onCopyPrompt={handleCopyPrompt}
              isCopied={copiedText === product.promptDirective}
            />
          ))}
        </div>
      </section>

      {/* Perspective / Spatial Background */}
      <section className="ai-perspective">
        <div className="ai-perspective__media ai-reveal">
          <div className="ai-perspective__frame ai-perspective__frame--a">
            <img src={aiProducts[3].image} alt="Marble and walnut dining visual" decoding="async" />
          </div>
          <div className="ai-perspective__frame ai-perspective__frame--b">
            <img src={aiProducts[4].image} alt="Quiet bedroom visual" decoding="async" />
          </div>
          <span className="ai-perspective__axis" aria-hidden="true" />
        </div>
        <div className="ai-perspective__copy ai-reveal">
          <p className="ai-kicker">The Spatial Unfair Advantage</p>
          <h2>Space. Material.<br />Light. <em>Then AI.</em></h2>
          <p>
            A background in interior and spatial architecture provides what prompt engineering alone cannot: genuine intuition for volumetric weight, surface bounce, ray caustics, and camera rationale.
          </p>
          <Link to="/" className="ai-text-link">
            Explore the spatial architecture portfolio <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Section 03: Working Method Pipeline */}
      <section id="process" className="ai-process ai-shell">
        <div className="ai-process__heading ai-reveal">
          <p className="ai-kicker">03 / Production Pipeline</p>
          <h2>From brief<br />to <em>broadcast frame.</em></h2>
          <p>
            The software evolves continuously. The directorial standard remains immutable: establish the architectural constraint, direct the output, and master the grade.
          </p>
        </div>

        <ol className="ai-process__list">
          {aiProcess.map((step, idx) => {
            const isActive = activeProcess === idx;
            return (
              <li
                key={step.number}
                className={`ai-process__item ai-reveal ${isActive ? 'is-selected' : ''}`}
                onClick={() => setActiveProcess(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveProcess(idx);
                }}
              >
                <div className="ai-process__meta-col">
                  <span className="ai-process__number">{step.number}</span>
                  <span className="ai-process__subtitle">{step.subtitle}</span>
                </div>
                <div className="ai-process__body-col">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <div className="ai-process__deliverable">
                    <small>Deliverable:</small>
                    <span>{step.deliverable}</span>
                  </div>
                </div>
                <div className="ai-process__status-col">
                  <i aria-hidden="true">{isActive ? '✓' : '↘'}</i>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Section 04: Toolchain & Stack */}
      <section id="toolchain" className="ai-toolchain ai-shell ai-reveal" aria-labelledby="toolchain-title">
        <p className="ai-kicker">Studio Technology Stack</p>
        <h2 id="toolchain-title">Tools are part of the process,<br /><em>not the point.</em></h2>
        <ul className="ai-toolchain__grid">
          {aiToolchain.map((tool, index) => (
            <li key={tool.name} className="ai-toolchain__item">
              <div className="ai-toolchain__head">
                <span className="ai-toolchain__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="ai-toolchain__category">{tool.category}</span>
              </div>
              <strong className="ai-toolchain__name">{tool.name}</strong>
              <span className="ai-toolchain__role">{tool.role}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 05: Contact / Call to Action */}
      <section id="contact-ai" className="ai-contact">
        <div className="ai-contact__glow" aria-hidden="true" />
        <div className="ai-contact__inner ai-shell ai-reveal">
          <p className="ai-kicker">Open for Creative Leadership</p>
          <h2>Need a new visual<br />language? <em>Let’s make it.</em></h2>
          <p>
            Available for Senior AI Creative Director roles, international studio partnerships, and selected high-end commercial commissions.
          </p>
          <div className="ai-contact__actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="ai-button ai-button--light">
              Start a Conversation <ArrowIcon />
            </a>
            <Link to="/contact" className="ai-button ai-button--ghost-light">
              Full Contact Details
            </Link>
          </div>
        </div>
        <div className="ai-contact__ribbon" aria-hidden="true">
          <span>AVAILABLE FOR CREATIVE DIRECTION</span>
          <span>AVAILABLE FOR CREATIVE DIRECTION</span>
        </div>
      </section>

      {/* Media Theatre Modal */}
      <MediaModal
        item={activeMedia}
        allItems={activeMedia?.mediaType === 'image' ? aiProducts : aiFilms}
        onSelect={setActiveMedia}
        onClose={() => setActiveMedia(null)}
        onCopyPrompt={handleCopyPrompt}
        isCopied={copiedText && (activeMedia?.promptDirective === copiedText)}
      />
    </AiStudioLayout>
  );
}
