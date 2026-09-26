import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'motion', label: 'Motion' },
  { id: 'images', label: 'Product Worlds' },
  { id: 'process', label: 'Method' },
  { id: 'toolchain', label: 'Toolchain' },
];

export function AiStudioHeader() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(1, window.scrollY / available) : 0);
      setScrolled(window.scrollY > 24);

      // Detect current section
      const sections = ['contact-ai', 'toolchain', 'process', 'images', 'motion'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const moveTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`ai-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ai-header__progress" style={{ transform: `scaleX(${progress})` }} />

      <div className="ai-header__brand-group">
        <Link to="/" className="ai-header__brand" aria-label="Ali Youssef main portfolio">
          <span className="ai-header__brand-mark">AY</span>
          <span className="ai-header__brand-copy">
            Ali Youssef
            <small>Generative visual director</small>
          </span>
        </Link>

        {/* Dual Portfolio Mode Switcher */}
        <div className="ai-header__mode-switcher" role="group" aria-label="Portfolio discipline switcher">
          <Link to="/" className="ai-header__mode-btn" title="Switch to Spatial & Architecture Portfolio">
            <span className="ai-header__mode-icon">🏛️</span>
            <span>Spatial</span>
          </Link>
          <span className="ai-header__mode-btn is-active" aria-current="page">
            <span className="ai-header__mode-dot" />
            <span>AI Studio</span>
          </span>
        </div>
      </div>

      <nav className="ai-header__nav" aria-label="AI portfolio navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={moveTo(item.id)}
            className={activeSection === item.id ? 'is-current' : ''}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ai-header__actions">
        <Link to="/" className="ai-header__portfolio-link">
          Spatial Work <span aria-hidden="true">↗</span>
        </Link>
        <a href="#contact-ai" onClick={moveTo('contact-ai')} className="ai-header__contact">
          Let’s Talk
        </a>
      </div>
    </header>
  );
}
