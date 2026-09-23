import { useEffect, useState } from 'react';
import { aiStudioMeta } from '../../data/aiStudio.js';

export function AiHeroSection({ onPlayShowreel, onPlayDirectorNote }) {
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 41); // ~24 fps update rate
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="ai-hero">
      <div className="ai-hero__backdrop" />

      <div className="ai-hero__meta-top">
        <div className="ai-hero__status-badge">
          <span className="ai-hero__status-pulse" />
          <span>SENIOR AI DIRECTION // {aiStudioMeta.status}</span>
        </div>
        <span className="ai-hero__timecode">TC // {timecode} [24.00 FPS]</span>
      </div>

      <h1 className="ai-hero__title">
        EXECUTIVE AI DIRECTION &amp; <br />
        <span className="ai-hero__title-italic">Synthetic Cinema.</span>
      </h1>

      <p className="ai-hero__lead">
        Bridging architectural spatial discipline with frontier generative video intelligence. We direct custom neural
        checkpoints, cinematic camera physics, and photorealistic CMF lighting to produce commercial TVCs and product campaigns
        for international houses and top-tier digital agencies.
      </p>

      <div className="ai-hero__actions">
        <button type="button" onClick={onPlayShowreel} className="ai-hero__btn-primary">
          <span style={{ color: '#000' }}>▶</span>
          <span>PLAY COMMERCIAL REEL</span>
        </button>
        <button type="button" onClick={onPlayDirectorNote} className="ai-hero__btn-secondary">
          <span style={{ color: 'var(--ai-gold)' }}>✦</span>
          <span>DIRECTOR’S STATEMENT</span>
        </button>
        <a href="#products" onClick={scrollTo('products')} className="ai-hero__btn-secondary">
          <span>PRODUCT SUITES (5)</span>
          <span>→</span>
        </a>
      </div>

      <div className="ai-hero__stats">
        {aiStudioMeta.stats.map((stat) => (
          <div key={stat.label} className="ai-hero__stat-card">
            <span className="ai-hero__stat-value">{stat.value}</span>
            <span className="ai-hero__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
