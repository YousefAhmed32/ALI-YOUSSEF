import { RouteTransition } from '../components/layout/RouteTransition.jsx';
import { SplitTextReveal } from '../components/typography/SplitTextReveal.jsx';
import { site } from '../data/site.js';
import { contact, getWhatsAppUrl } from '../data/contact.js';
import { isUnset } from '../utils/placeholder.js';
import './contact-page.css';

export function ContactPage() {
  return (
    <RouteTransition>
      <section className="contact-page" data-nav-theme="dark">
        <div className="type-mono contact-page__label">BEGIN A COMMISSION</div>
        <h1 className="contact-page__title">
          <SplitTextReveal lines={["LET'S SHAPE SOMETHING", 'ENDURING.']} variant="editorial" />
        </h1>
        <p className="contact-page__intro">
          For private residences, bespoke interiors, and selected collaborations.
        </p>

        <div className="contact-page__actions">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-page__cta contact-page__cta--primary type-mono"
          >
            <span>START A CONVERSATION</span>
            <span aria-hidden="true">→</span>
          </a>
          {contact.instagram ? (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-page__cta contact-page__cta--secondary type-mono"
            >
              <span>INSTAGRAM</span>
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>

        <dl className="contact-page__details">
          <div>
            <dt className="type-mono">WHATSAPP</dt>
            <dd>{contact.whatsapp.displayNumber}</dd>
          </div>
          {!isUnset(contact.email) ? (
            <div>
              <dt className="type-mono">EMAIL</dt>
              <dd>{contact.email}</dd>
            </div>
          ) : null}
          <div>
            <dt className="type-mono">BASED</dt>
            <dd>{site.based}</dd>
          </div>
          <div>
            <dt className="type-mono">STATUS</dt>
            <dd>{site.status}</dd>
          </div>
        </dl>

        {isUnset(contact.email) ? (
          <p className="contact-page__note">
            WhatsApp is the fastest way to reach the studio directly — email will be published
            here once set up.
          </p>
        ) : null}
      </section>
    </RouteTransition>
  );
}
