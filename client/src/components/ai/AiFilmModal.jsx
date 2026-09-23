import { useEffect, useRef, useState } from 'react';

export function AiFilmModal({ film, onClose }) {
  const modalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!film) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [film, onClose]);

  const handleCopyPrompt = () => {
    if (!film?.promptDirective) return;
    navigator.clipboard.writeText(film.promptDirective);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!film) return null;

  const isVertical = film.aspectRatio?.includes('9:16');

  return (
    <div
      className="ai-film-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={film.title}
    >
      <div
        className="ai-film-modal-window"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: isVertical ? '1180px' : '1100px' }}
      >
        <div className="ai-film-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--ai-gold)', fontSize: '14px', fontWeight: 700 }}>✦</span>
            <div>
              <div style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '11px', color: 'var(--ai-gold)', letterSpacing: '0.16em' }}>
                {film.tag} // {film.year} // {film.duration}
              </div>
              <h3 className="ai-film-modal-title">{film.title}</h3>
              {film.titleAr && (
                <div style={{ fontSize: '12px', color: 'var(--ai-text-secondary)', marginTop: '2px', direction: 'rtl', textAlign: 'left' }}>
                  {film.titleAr}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="ai-film-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            CLOSE [ESC] ✕
          </button>
        </div>

        <div className={`ai-film-modal-content-grid ${isVertical ? 'is-vertical-layout' : ''}`}>
          {/* Video Player Column */}
          <div className="ai-film-modal-player-col">
            <div className={`ai-film-modal-iframe-container ${isVertical ? 'is-vertical-frame' : ''}`}>
              {/* Ambient blurred backdrop for luxury immersion */}
              <div
                className="ai-film-modal-ambient-glow"
                style={{ backgroundImage: `url(${film.thumbnail})` }}
                aria-hidden="true"
              />
              <iframe
                src={film.videoUrl}
                title={film.title}
                className="ai-film-modal-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="ai-film-modal-quick-links">
              <a
                href={film.directYoutubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-film-modal-yt-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>WATCH FULL SCREEN ON YOUTUBE</span>
                <span>↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPrompt}
                className="ai-film-modal-copy-btn"
              >
                <span>{copied ? '✓ COPIED DIRECTIVE' : 'COPY PROMPT DIRECTIVE'}</span>
              </button>
            </div>
          </div>

          {/* Technical Specs & Prompt Inspector Column */}
          <div className="ai-film-modal-info-col">
            <div className="ai-film-modal-meta-box">
              <span className="ai-film-modal-label">CLIENT / COMMISSION</span>
              <span className="ai-film-modal-val" style={{ color: 'var(--ai-gold)' }}>{film.client}</span>
            </div>

            <div className="ai-film-modal-meta-box">
              <span className="ai-film-modal-label">SYNOPSIS &amp; ART DIRECTION</span>
              <p className="ai-film-modal-desc">{film.synopsis}</p>
            </div>

            <div className="ai-film-modal-meta-box">
              <span className="ai-film-modal-label">CAMERA MOVEMENT &amp; KINEMATICS</span>
              <span className="ai-film-modal-val">{film.cameraMovement}</span>
            </div>

            <div className="ai-film-modal-meta-box">
              <span className="ai-film-modal-label">SOUND DESIGN &amp; FOLEY SYNTHESIS</span>
              <span className="ai-film-modal-val">{film.soundDesign}</span>
            </div>

            <div className="ai-film-modal-directive-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="ai-film-modal-label" style={{ color: 'var(--ai-gold)' }}>
                  PROMPT ARCHITECTURE &amp; TOKENS
                </span>
                <span style={{ fontFamily: 'var(--ai-font-mono)', fontSize: '10px', color: 'var(--ai-text-muted)' }}>
                  {film.metrics?.renderPasses || 'Master Pass'}
                </span>
              </div>
              <div className="ai-modal-directive-box">
                {film.promptDirective}
              </div>
            </div>

            {/* Neural Stack Tags */}
            <div style={{ marginTop: '16px' }}>
              <span className="ai-film-modal-label" style={{ marginBottom: '8px', display: 'block' }}>
                GENERATIVE ENGINE STACK:
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {film.stack.map((item) => (
                  <span key={item} className="ai-film-card__tech-tag" style={{ color: '#fff', background: 'rgba(212, 175, 55, 0.08)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
