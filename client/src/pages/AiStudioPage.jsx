import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiStudioLayout } from '../components/ai/AiStudioLayout.jsx';
import {
  aiDisciplines,
  aiFilms,
  aiProcess,
  aiProducts,
  aiStudioMeta,
  aiToolchain,
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

function MediaModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isFilm = item.mediaType === 'film';

  return (
    <div className="ai-modal" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button type="button" className="ai-modal__close" onClick={onClose} aria-label="Close viewer">
        Close <span aria-hidden="true">×</span>
      </button>
      <div className={`ai-modal__content ${isFilm ? 'is-film' : 'is-image'}`} onClick={(event) => event.stopPropagation()}>
        {isFilm ? (
          <iframe
            src={item.videoUrl}
            title={item.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img src={item.image} alt={item.alt} />
        )}
        <div className="ai-modal__caption">
          <span>{item.category}</span>
          <strong>{item.title}</strong>
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
        <img src={aiProducts[1].image} alt="" />
        <span>IMAGE / 02</span>
      </div>

      <button
        type="button"
        className="ai-hero-visual__card ai-hero-visual__card--main"
        onClick={onPlay}
        aria-label={`Play ${aiFilms[0].title}`}
      >
        <img src={aiFilms[0].thumbnail} alt="Automotive AI film still" />
        <span className="ai-hero-visual__scan" aria-hidden="true" />
        <span className="ai-hero-visual__play">
          <PlayIcon />
        </span>
        <span className="ai-hero-visual__label">FILM / 01</span>
      </button>

      <div className="ai-hero-visual__card ai-hero-visual__card--front">
        <img src={aiProducts[2].image} alt="" />
        <span>OBJECT / 03</span>
      </div>

      <div className="ai-hero-visual__badge">
        <span>AI</span>
        <small>Visual<br />direction</small>
      </div>
    </div>
  );
}

function FilmCard({ film, featured = false, onOpen }) {
  return (
    <article className={`ai-film-card ai-reveal ${featured ? 'is-featured' : ''}`}>
      <button type="button" className="ai-film-card__media" onClick={() => onOpen({ ...film, mediaType: 'film' })}>
        <img src={film.thumbnail} alt={`${film.title} film still`} loading={featured ? 'eager' : 'lazy'} />
        <span className="ai-film-card__shade" />
        <span className="ai-film-card__play" aria-hidden="true"><PlayIcon /></span>
        <span className="ai-film-card__index">{film.number}</span>
        <span className="ai-film-card__watch">Play film <ArrowIcon /></span>
      </button>
      <div className="ai-film-card__info">
        <div>
          <p>{film.category}</p>
          <h3>{film.title}</h3>
        </div>
        <div className="ai-film-card__meta">
          <span>{film.format}</span>
          <span>{film.year}</span>
        </div>
      </div>
    </article>
  );
}

function ProductFigure({ product, index, onOpen }) {
  return (
    <figure className={`ai-product ai-product--${index + 1} ai-reveal`}>
      <button
        type="button"
        className="ai-product__media"
        onClick={() => onOpen({ ...product, mediaType: 'image' })}
        aria-label={`Open ${product.title}`}
      >
        <img src={product.image} alt={product.alt} loading="lazy" />
        <span className="ai-product__view">View full image <ArrowIcon /></span>
      </button>
      <figcaption>
        <span>{product.number}</span>
        <div>
          <h3>{product.title}</h3>
          <p>{product.category}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function AiStudioPage() {
  const [activeMedia, setActiveMedia] = useState(null);
  useRevealObserver();

  const whatsappMessage = encodeURIComponent(
    'Hello Ali, I viewed your AI portfolio and would like to discuss a creative role or project.'
  );
  const whatsappUrl = `https://wa.me/${contact.whatsapp.normalizedNumber}?text=${whatsappMessage}`;

  return (
    <AiStudioLayout>
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
                  View selected work <ArrowIcon />
                </a>
                <a href="#contact-ai" className="ai-button ai-button--ghost">
                  Discuss a role
                </a>
              </div>
            </div>
          </div>

          <HeroVisual onPlay={() => setActiveMedia({ ...aiFilms[0], mediaType: 'film' })} />
        </div>

        <div className="ai-hero__foot">
          <span>{aiStudioMeta.location}</span>
          <span>Scroll to explore</span>
          <span>Portfolio / 2025—26</span>
        </div>
      </section>

      <div className="ai-marquee" aria-label="Creative disciplines">
        <div className="ai-marquee__track">
          {[...aiDisciplines, ...aiDisciplines].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <i>✳</i>
            </span>
          ))}
        </div>
      </div>

      <section id="motion" className="ai-motion ai-shell">
        <div className="ai-section-heading ai-reveal">
          <p className="ai-kicker">01 / Selected motion</p>
          <h2>Stories built<br /><em>frame by frame.</em></h2>
          <p className="ai-section-heading__body">
            Generative motion studies across automotive, fashion, product and branded storytelling—directed for atmosphere, pace and visual continuity.
          </p>
        </div>

        <div className="ai-films-grid">
          {aiFilms.map((film, index) => (
            <FilmCard key={film.id} film={film} featured={index === 0} onOpen={setActiveMedia} />
          ))}
        </div>
      </section>

      <section id="images" className="ai-images">
        <div className="ai-images__intro ai-shell ai-reveal">
          <p className="ai-kicker">02 / Generative imagery</p>
          <h2>Product worlds<br />made <em>without a set.</em></h2>
          <div>
            <p>
              From quiet luxury to sculptural objects, each image is treated as a designed scene—not a disposable prompt.
            </p>
            <span>Art direction · Image generation · Retouching</span>
          </div>
        </div>

        <div className="ai-products ai-shell">
          {aiProducts.map((product, index) => (
            <ProductFigure key={product.title} product={product} index={index} onOpen={setActiveMedia} />
          ))}
        </div>
      </section>

      <section className="ai-perspective">
        <div className="ai-perspective__media ai-reveal">
          <div className="ai-perspective__frame ai-perspective__frame--a">
            <img src={aiProducts[3].image} alt="Marble and walnut dining visual" loading="lazy" />
          </div>
          <div className="ai-perspective__frame ai-perspective__frame--b">
            <img src={aiProducts[4].image} alt="Quiet bedroom visual" loading="lazy" />
          </div>
          <span className="ai-perspective__axis" aria-hidden="true" />
        </div>
        <div className="ai-perspective__copy ai-reveal">
          <p className="ai-kicker">A designer behind the machine</p>
          <h2>Space. Material.<br />Light. <em>Then AI.</em></h2>
          <p>
            My background in interior and spatial design shapes the way I work with generative tools: composition has structure, materials respond to light, and every camera move has a reason.
          </p>
          <Link to="/" className="ai-text-link">
            Explore the spatial portfolio <ArrowIcon />
          </Link>
        </div>
      </section>

      <section id="process" className="ai-process ai-shell">
        <div className="ai-process__heading ai-reveal">
          <p className="ai-kicker">03 / Working method</p>
          <h2>From brief<br />to <em>final frame.</em></h2>
          <p>
            The tool changes. The standard stays the same: develop the idea, direct the output, refine the result.
          </p>
        </div>

        <ol className="ai-process__list">
          {aiProcess.map((step) => (
            <li key={step.number} className="ai-process__item ai-reveal">
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <i aria-hidden="true">↘</i>
            </li>
          ))}
        </ol>
      </section>

      <section className="ai-toolchain ai-shell ai-reveal" aria-labelledby="toolchain-title">
        <p className="ai-kicker">Selected workflow</p>
        <h2 id="toolchain-title">Tools are part of the process,<br /><em>not the point.</em></h2>
        <ul>
          {aiToolchain.map((tool, index) => (
            <li key={tool}><span>{String(index + 1).padStart(2, '0')}</span>{tool}</li>
          ))}
        </ul>
      </section>

      <section id="contact-ai" className="ai-contact">
        <div className="ai-contact__glow" aria-hidden="true" />
        <div className="ai-contact__inner ai-shell ai-reveal">
          <p className="ai-kicker">Open to the right conversation</p>
          <h2>Need a new visual<br />language? <em>Let’s make it.</em></h2>
          <p>
            Available for creative roles, collaborations and selected generative film or image commissions.
          </p>
          <div className="ai-contact__actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="ai-button ai-button--light">
              Start a conversation <ArrowIcon />
            </a>
            <Link to="/contact" className="ai-button ai-button--ghost-light">
              Contact details
            </Link>
          </div>
        </div>
        <div className="ai-contact__ribbon" aria-hidden="true">
          <span>AVAILABLE FOR CREATIVE COLLABORATION</span>
          <span>AVAILABLE FOR CREATIVE COLLABORATION</span>
        </div>
      </section>

      <MediaModal item={activeMedia} onClose={() => setActiveMedia(null)} />
    </AiStudioLayout>
  );
}

