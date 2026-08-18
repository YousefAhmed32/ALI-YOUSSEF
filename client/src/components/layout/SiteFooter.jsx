import { Link } from 'react-router-dom';
import { site } from '../../data/site.js';
import { contact, getWhatsAppUrl } from '../../data/contact.js';
import { RESUME_URL, RESUME_FILE_NAME, CV_DOWNLOAD_ENABLED } from '../../data/resume.js';
import './site-footer.css';

const ROMAN_NUMERALS = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

function toRoman(num) {
  let result = '';
  let remaining = num;
  for (const [value, symbol] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

const CURRENT_YEAR_ROMAN = toRoman(new Date().getFullYear());

const DEVELOPER_NAME = 'YANSY TECH';
const DEVELOPER_SITE_URL = 'https://yansytech.com/';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__row type-mono">
        <span>&copy; {CURRENT_YEAR_ROMAN} — {site.name}</span>
        <nav className="site-footer__links" aria-label="Contact">
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="site-footer__link">
            WHATSAPP
          </a>
          {contact.instagram ? (
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="site-footer__link">
              INSTAGRAM
            </a>
          ) : null}
          <Link to="/contact" className="site-footer__link">
            {site.based}
          </Link>
          <a
            href={CV_DOWNLOAD_ENABLED ? RESUME_URL : undefined}
            download={CV_DOWNLOAD_ENABLED ? RESUME_FILE_NAME : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
            aria-label={CV_DOWNLOAD_ENABLED ? 'Download portfolio CV — opens as a PDF in a new tab' : 'CV updating — download temporarily unavailable'}
            aria-disabled={!CV_DOWNLOAD_ENABLED}
            onClick={(e) => { if (!CV_DOWNLOAD_ENABLED) e.preventDefault(); }}
            style={!CV_DOWNLOAD_ENABLED ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : undefined}
          >
            {CV_DOWNLOAD_ENABLED ? 'DOWNLOAD PORTFOLIO CV' : 'CV Updating...'}
          </a>
        </nav>
      </div>

      <span className="site-footer__divider" aria-hidden="true" />

      <p className="site-footer__credit">
        Designed &amp; Developed by{' '}
        <a
          href={DEVELOPER_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer__credit-link"
          aria-label={`Visit ${DEVELOPER_NAME} website — opens in a new tab`}
        >
          {DEVELOPER_NAME}
        </a>
      </p>
    </footer>
  );
}
