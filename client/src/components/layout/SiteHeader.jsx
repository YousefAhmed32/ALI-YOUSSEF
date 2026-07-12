import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site, navigation } from '../../data/site.js';
import { useSectionTheme } from '../../hooks/useSectionTheme.js';
import { MagneticLink } from '../interaction/MagneticLink.jsx';
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
        {site.initials}&nbsp;&nbsp;{site.name}
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
