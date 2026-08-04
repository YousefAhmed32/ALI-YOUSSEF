import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects.js';
import { site, navigation } from '../../data/site.js';
import { contact } from '../../data/contact.js';
import { RESUME_URL, RESUME_FILE_NAME, CV_DOWNLOAD_ENABLED } from '../../data/resume.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { LogoMark } from '../brand/LogoMark.jsx';
import { DownloadIcon } from '../brand/DownloadIcon.jsx';
import './fullscreen-menu.css';

const FOCUSABLE = 'a[href], button:not([disabled])';

export function FullscreenMenu({ open, onClose, triggerRef }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const active = projects[activeIndex] || projects[0];

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    const firstLink = panelRef.current?.querySelector(FOCUSABLE);
    firstLink?.focus();
    const triggerEl = triggerRef?.current;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      triggerEl?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fullscreen-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Full index"
          ref={panelRef}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        >
          <div className="fullscreen-menu__top">
            <span className="type-mono fullscreen-menu__mark">
              <LogoMark size={18} />
              FULL INDEX
            </span>
            <button type="button" className="fullscreen-menu__close type-mono" onClick={onClose}>
              CLOSE — ESC
            </button>
          </div>

          <div className="fullscreen-menu__body">
            <div className="fullscreen-menu__list">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <Link to={item.to} className="fullscreen-menu__nav-link" onClick={onClose}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.1 + navigation.length * 0.05, duration: 0.5 }}
              >
                <a
                  href={CV_DOWNLOAD_ENABLED ? RESUME_URL : undefined}
                  download={CV_DOWNLOAD_ENABLED ? RESUME_FILE_NAME : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fullscreen-menu__nav-link fullscreen-menu__nav-link--cv"
                  aria-label={CV_DOWNLOAD_ENABLED ? 'Download CV — opens as a PDF in a new tab' : 'CV updating — download temporarily unavailable'}
                  aria-disabled={!CV_DOWNLOAD_ENABLED}
                  onClick={(e) => { if (!CV_DOWNLOAD_ENABLED) e.preventDefault(); }}
                  style={!CV_DOWNLOAD_ENABLED ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : undefined}
                >
                  <span>{CV_DOWNLOAD_ENABLED ? 'DOWNLOAD CV' : 'CV Updating...'}</span>
                  <DownloadIcon size={18} className="fullscreen-menu__nav-link-icon" />
                </a>
              </motion.div>
              <div className="fullscreen-menu__divider" />
              {projects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="fullscreen-menu__row"
                  onMouseEnter={() => setActiveIndex(i)}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.16 + i * 0.04, duration: 0.5 }}
                >
                  <Link to={`/work/${p.slug}`} onClick={onClose} className="fullscreen-menu__row-link">
                    <span className="type-mono fullscreen-menu__row-index">{p.index}</span>
                    <span className="fullscreen-menu__row-name">{p.name}</span>
                    <span className="type-mono fullscreen-menu__row-typology">{p.typology}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="fullscreen-menu__preview">
              <img src={active.src} alt="" className="fullscreen-menu__preview-img" />
              <div className="fullscreen-menu__preview-caption type-mono">
                <span>{active.code}</span>
                <span>{active.name}</span>
              </div>
            </div>
          </div>

          <div className="fullscreen-menu__footer type-mono">
            <span>BASED IN {site.based} &middot; MASS / OPENING / LIGHT</span>
            {contact.instagram ? (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="fullscreen-menu__social"
              >
                INSTAGRAM
              </a>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
