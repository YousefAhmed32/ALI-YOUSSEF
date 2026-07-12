import { craftsmanship } from '../../data/interiors.js';
import { SplitTextReveal } from '../typography/SplitTextReveal.jsx';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import './craftsmanship-section.css';

const LIGHTBOX_IMAGES = [
  { src: craftsmanship.src, alt: craftsmanship.alt, caption: craftsmanship.title, eyebrow: craftsmanship.eyebrow },
];

export function CraftsmanshipSection() {
  const openLightboxAt = useLightboxTrigger(LIGHTBOX_IMAGES, 0);

  return (
    <section className="craftsmanship" data-nav-theme="dark" aria-labelledby="craftsmanship-title">
      <div className="craftsmanship__media">
        <button
          type="button"
          className="craftsmanship__media-inner"
          style={{ aspectRatio: `${craftsmanship.width} / ${craftsmanship.height}` }}
          onClick={openLightboxAt}
          aria-label="View full-size image — material and craftsmanship review"
        >
          <img
            src={craftsmanship.src}
            alt={craftsmanship.alt}
            width={craftsmanship.width}
            height={craftsmanship.height}
            loading="lazy"
            decoding="async"
          />
        </button>
        <div className="type-mono craftsmanship__studio-note">{craftsmanship.note}</div>
      </div>

      <div className="craftsmanship__text">
        <div className="type-mono craftsmanship__eyebrow">{craftsmanship.eyebrow}</div>
        <h2 id="craftsmanship-title" className="craftsmanship__title">
          <SplitTextReveal lines={['Material &', 'Craftsmanship']} variant="editorial" />
        </h2>
        <p className="craftsmanship__copy">{craftsmanship.copy}</p>
      </div>
    </section>
  );
}
