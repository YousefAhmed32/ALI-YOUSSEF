export function AiShowreelBanner({ onPlay }) {
  return (
    <section id="showreel" className="ai-showreel-banner">
      <div
        className="ai-showreel-card"
        onClick={onPlay}
        role="button"
        tabIndex={0}
        aria-label="Play Flagship Commercial Production Showreel"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlay();
          }
        }}
      >
        <img
          src="https://i.ytimg.com/vi/kiF5Y7GxBIE/hqdefault.jpg"
          alt="Ali Youssef Flagship AI Commercial Production"
          className="ai-showreel-card__img"
        />

        <div className="ai-showreel-card__overlay">
          <div className="ai-showreel-card__header">
            <span className="ai-showreel-card__badge">2025 COMMERCIAL SHOWREEL // 4K UHD</span>
            <span className="ai-showreel-card__badge" style={{ color: 'var(--ai-gold)', borderColor: 'rgba(212, 175, 55, 0.4)' }}>
              REAL YOUTUBE COMMERCIALS
            </span>
          </div>

          <div className="ai-showreel-card__play-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div className="ai-showreel-card__footer">
            <div>
              <h2 className="ai-showreel-card__title">FLAGSHIP COMMERCIAL REEL</h2>
              <div className="ai-showreel-card__sub">
                HYPERCAR AUTOMOTIVE &middot; INDUSTRIAL BEVERAGE &middot; GULF HAUTE COUTURE &middot; SPECIALTY ROASTERY
              </div>
            </div>
            <span className="ai-showreel-card__badge">WATCH PRODUCTION [PLAY]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
