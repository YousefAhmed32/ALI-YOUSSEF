import { useState, useRef, useCallback } from 'react';
import { aiProducts } from '../../data/aiStudio.js';

function ImageMagnifier({ src, alt, zoomLevel = 2.5, focalPoint }) {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [showZoom, setShowZoom] = useState(false);
  const imgRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, []);

  return (
    <div
      className="ai-magnifier-container"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
      ref={imgRef}
    >
      <img src={src} alt={alt} className="ai-magnifier-base-img" loading="lazy" />

      {/* Floating Loupe Magnifier */}
      {showZoom && (
        <div
          className="ai-magnifier-lens"
          style={{
            left: `${zoomPos.x}%`,
            top: `${zoomPos.y}%`,
            backgroundImage: `url("${src}")`,
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            backgroundSize: `${zoomLevel * 100}%`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Interactive Helper Badge */}
      <div className="ai-magnifier-hint-badge">
        <span style={{ color: 'var(--ai-gold)' }}>🔍</span>
        <span>HOVER TO INSPECT 2.5× CMF TEXTURE</span>
      </div>

      {focalPoint && (
        <div className="ai-magnifier-focal-badge">
          <span>FOCUS // {focalPoint.label}</span>
        </div>
      )}
    </div>
  );
}

function ProductShowcaseCard({ item, onOpenFullscreen }) {
  const [activeLighting, setActiveLighting] = useState(item.lightingModes[0].id);

  const currentMode = item.lightingModes.find((m) => m.id === activeLighting) || item.lightingModes[0];

  return (
    <article
      className="ai-product-showcase"
      style={{
        backgroundColor: currentMode.bg,
      }}
    >
      <div className="ai-product-media-col">
        <ImageMagnifier
          src={item.image}
          alt={`${item.name} — ${item.category}`}
          zoomLevel={2.6}
          focalPoint={item.zoomFocalPoint}
        />

        <div className="ai-product-media-actions">
          <button
            type="button"
            className="ai-product-fullscreen-btn"
            onClick={() => onOpenFullscreen(item)}
          >
            <span>VIEW 8K HIGH-RES MASTER</span>
            <span>⤢</span>
          </button>
        </div>
      </div>

      <div className="ai-product-meta">
        <div className="ai-product-meta__category">
          {item.brand} // {item.category}
        </div>
        <h3 className="ai-product-meta__name">{item.name}</h3>
        <p className="ai-product-meta__tagline">“{item.tagline}”</p>

        {/* Studio Lighting Switcher */}
        <div className="ai-lighting-switcher">
          <span className="ai-lighting-switcher__label">VIRTUAL STUDIO LIGHTING RIG:</span>
          <div className="ai-lighting-switcher__pills">
            {item.lightingModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`ai-lighting-pill ${activeLighting === mode.id ? 'is-active' : ''}`}
                onClick={() => setActiveLighting(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* CMF Engineering Specifications */}
        <div className="ai-product-cmf">
          <div className="ai-product-cmf__row">
            <span className="ai-product-cmf__label">CMF / MATERIAL SPEC</span>
            <span className="ai-product-cmf__val">{item.cmf.material}</span>
          </div>
          <div className="ai-product-cmf__row">
            <span className="ai-product-cmf__label">SURFACE HONING &amp; TEXTURE</span>
            <span className="ai-product-cmf__val">{item.cmf.finish}</span>
          </div>
          <div className="ai-product-cmf__row">
            <span className="ai-product-cmf__label">OPTICAL LIGHTING SETUP</span>
            <span className="ai-product-cmf__val">{item.cmf.lightingSetup}</span>
          </div>
        </div>

        {/* Prompt Directive Excerpt */}
        <div style={{ marginBottom: '20px' }}>
          <span className="ai-product-cmf__label" style={{ display: 'block', marginBottom: '6px' }}>
            PROMPT DIRECTIVE &amp; CAMERA PARAMETERS
          </span>
          <div className="ai-product-prompt-box">
            {item.promptExcerpt}
          </div>
        </div>

        {/* Deliverables */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {item.deliverables.map((deliv) => (
            <span key={deliv} className="ai-film-card__tech-tag" style={{ color: 'var(--ai-gold)' }}>
              {deliv}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function AiProductsShowcase() {
  const [fullscreenProduct, setFullscreenProduct] = useState(null);

  return (
    <section id="products" className="ai-section">
      <div className="ai-section__header">
        <div className="ai-section__eyebrow">
          <span className="ai-section__eyebrow-line" />
          <span>CHAPTER 02 // REAL MARKETING VISUAL SUITES</span>
        </div>
        <h2 className="ai-section__title">
          FLAGSHIP AI PRODUCT CAMPAIGNS <span className="ai-section__title-serif">(5 Suites)</span>
        </h2>
        <p className="ai-section__desc">
          Photorealistic commercial marketing visuals created for high-end luxury brands, jewellery houses, collectible design,
          and interior architecture. Hover over any image to engage the 2.5× texture loupe, or switch virtual studio lighting rigs.
        </p>
      </div>

      <div className="ai-products-wrapper">
        {aiProducts.map((item) => (
          <ProductShowcaseCard
            key={item.id}
            item={item}
            onOpenFullscreen={(prod) => setFullscreenProduct(prod)}
          />
        ))}
      </div>

      {/* Fullscreen Master Modal */}
      {fullscreenProduct && (
        <div
          className="ai-film-modal-backdrop"
          onClick={() => setFullscreenProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={fullscreenProduct.name}
        >
          <div
            className="ai-film-modal-window"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '1280px' }}
          >
            <div className="ai-film-modal-header">
              <div>
                <div style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '11px', color: 'var(--ai-gold)' }}>
                  {fullscreenProduct.brand} // HIGH RESOLUTION INSPECTOR
                </div>
                <h3 className="ai-film-modal-title">{fullscreenProduct.name}</h3>
              </div>
              <button
                type="button"
                className="ai-film-modal-close"
                onClick={() => setFullscreenProduct(null)}
              >
                CLOSE [ESC] ✕
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%', maxHeight: '80vh', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={fullscreenProduct.image}
                alt={fullscreenProduct.name}
                style={{ width: '100%', height: 'auto', maxHeight: '78vh', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--ai-bg-surface)', borderTop: '1px solid var(--ai-border)' }}>
              <div style={{ fontSize: '13px', color: 'var(--ai-text-secondary)' }}>
                {fullscreenProduct.tagline}
              </div>
              <a
                href={fullscreenProduct.image}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-hero__btn-primary"
                style={{ padding: '8px 16px', fontSize: '11px' }}
              >
                <span>OPEN RAW ASSET IN NEW TAB</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
