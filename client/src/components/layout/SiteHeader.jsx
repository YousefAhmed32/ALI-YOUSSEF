import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site, navigation } from '../../data/site.js';
import { RESUME_URL, RESUME_FILE_NAME, CV_DOWNLOAD_ENABLED } from '../../data/resume.js';
import { useSectionTheme } from '../../hooks/useSectionTheme.js';
import { MagneticLink } from '../interaction/MagneticLink.jsx';
import { LogoMark } from '../brand/LogoMark.jsx';
import { DownloadIcon } from '../brand/DownloadIcon.jsx';
import './site-header.css';

export function SiteHeader({ onOpenMenu, menuOpen, menuTriggerRef }) {
  const location = useLocation();
  const theme = useSectionTheme('light');
  const [compressed, setCompressed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompressed(y > 80);
      if (y > lastY.current && y > 200) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'site-header',
        `site-header--${theme}`,
        compressed ? 'is-compressed' : '',
        hidden && !menuOpen ? 'is-hidden' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link to="/" className="site-header__mark type-mono">
        <LogoMark size={20} />
        {site.name}
      </Link>
      <nav className="site-header__nav" aria-label="Primary">
        {navigation.map((item) => (
          <MagneticLink as={Link} to={item.to} key={item.to} strength={6} className="site-header__link">
            <span
              className={location.pathname.startsWith(item.to) ? 'is-active' : ''}
              data-label={item.label}
            >
              {item.label}
            </span>
          </MagneticLink>
        ))}
        <MagneticLink as={Link} to="/ai-studio" strength={6} className="site-header__link site-header__ai-link">
          <span
            className={location.pathname.startsWith('/ai-studio') ? 'is-active' : ''}
            data-label="AI STUDIO ✦"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            AI STUDIO <span style={{ fontSize: '9px', color: 'var(--bronze)', fontWeight: 700 }}>✦</span>
          </span>
        </MagneticLink>
        <MagneticLink
          as="a"
          href={CV_DOWNLOAD_ENABLED ? RESUME_URL : undefined}
          download={CV_DOWNLOAD_ENABLED ? RESUME_FILE_NAME : undefined}
          target="_blank"
          rel="noopener noreferrer"
          strength={6}
          className="site-header__cv type-mono"
          aria-label={CV_DOWNLOAD_ENABLED ? 'Download CV — opens as a PDF in a new tab' : 'CV updating — download temporarily unavailable'}
          aria-disabled={!CV_DOWNLOAD_ENABLED}
          onClick={(e) => { if (!CV_DOWNLOAD_ENABLED) e.preventDefault(); }}
          style={!CV_DOWNLOAD_ENABLED ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : undefined}
        >
          <DownloadIcon size={11} className="site-header__cv-icon" />
          <span>{CV_DOWNLOAD_ENABLED ? 'CV' : 'CV Updating...'}</span>
        </MagneticLink>
        <button
          type="button"
          ref={menuTriggerRef}
          className="site-header__menu-trigger type-mono"
          onClick={onOpenMenu}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'CLOSE' : 'INDEX'}
        </button>
      </nav>
    </header>
  );
}
