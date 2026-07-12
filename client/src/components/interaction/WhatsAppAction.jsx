import { getWhatsAppUrl } from '../../data/contact.js';
import './whatsapp-action.css';

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.96 9.96 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2m0 18.2a8.16 8.16 0 0 1-4.17-1.14l-.3-.18-3 .79.8-2.93-.2-.3a8.18 8.18 0 1 1 6.87 3.76m4.47-6.13c-.24-.12-1.44-.71-1.66-.79s-.39-.12-.55.12-.63.79-.78.95-.28.18-.53.06a6.7 6.7 0 0 1-1.96-1.21 7.3 7.3 0 0 1-1.36-1.69c-.14-.24 0-.37.11-.5s.24-.28.36-.42a1.6 1.6 0 0 0 .24-.4.44.44 0 0 0-.02-.42c-.06-.12-.55-1.32-.75-1.81s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.73 2.73 0 0 0-.85 2.03c0 1.2.87 2.35 1 2.51s1.7 2.6 4.13 3.64a13.6 13.6 0 0 0 1.38.51 3.3 3.3 0 0 0 1.53.1c.47-.07 1.44-.59 1.64-1.16s.2-1.06.14-1.16-.22-.16-.46-.28"
      />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-fab__icon">
        <WhatsAppGlyph />
      </span>
      <span className="whatsapp-fab__label" aria-hidden="true">Start a conversation</span>
    </a>
  );
}

export function WhatsAppInlineLink({ className = '', children }) {
  return (
    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
