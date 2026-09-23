import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'motion', label: 'Motion' },
  { id: 'images', label: 'Images' },
  { id: 'process', label: 'Process' },
];

export function AiStudioHeader() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(1, window.scrollY / available) : 0);
      setScrolled(window.scrollY > 24);
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
      <Link to="/" className="ai-header__brand" aria-label="Ali Youssef main portfolio">
        <span className="ai-header__brand-mark">AY</span>
        <span className="ai-header__brand-copy">
          Ali Youssef
          <small>Generative visual director</small>
        </span>
      </Link>

      <nav className="ai-header__nav" aria-label="AI portfolio navigation">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={moveTo(item.id)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ai-header__actions">
        <Link to="/" className="ai-header__portfolio-link">
          Main portfolio
          <span aria-hidden="true">↗</span>
        </Link>
        <a href="#contact-ai" onClick={moveTo('contact-ai')} className="ai-header__contact">
          Let’s talk
        </a>
      </div>
    </header>
  );
}

