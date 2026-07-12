import { interiorWorks } from '../../data/interiors.js';
import { ImageReveal } from '../media/ImageReveal.jsx';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import './selected-interiors.css';

const [majlis, olive, wardrobe, dressing] = interiorWorks;

const LIGHTBOX_IMAGES = interiorWorks.map((item) => ({
  src: item.src,
  alt: item.alt,
  caption: item.title,
  eyebrow: item.code,
}));

export function SelectedInteriors() {
  const openMajlis = useLightboxTrigger(LIGHTBOX_IMAGES, 0);
  const openOlive = useLightboxTrigger(LIGHTBOX_IMAGES, 1);
  const openWardrobe = useLightboxTrigger(LIGHTBOX_IMAGES, 2);
  const openDressing = useLightboxTrigger(LIGHTBOX_IMAGES, 3);

  return (
    <section className="selected-interiors" data-nav-theme="light" aria-labelledby="selected-interiors-title">
      <div className="selected-interiors__head type-mono">
        <span>SELECTED INTERIORS — SPACE &amp; LIGHT</span>
        <span>{interiorWorks.length} ROOMS, ONE HAND</span>
      </div>
      <h2 id="selected-interiors-title" className="sr-only">Selected interior works</h2>

      <div className="selected-interiors__feature">
        <button
          type="button"
          className="selected-interiors__feature-media"
          style={{ aspectRatio: `${majlis.width} / ${majlis.height}` }}
          onClick={openMajlis}
          aria-label={`View full-size image — ${majlis.title}`}
        >
          <ImageReveal src={majlis.src} alt={majlis.alt} variant="mask" />
        </button>
        <div className="selected-interiors__feature-text">
          <span className="type-mono selected-interiors__code">{majlis.code}</span>
          <h3 className="selected-interiors__feature-title">{majlis.title}</h3>
          <p className="type-mono selected-interiors__category">{majlis.category}</p>
          <p className="selected-interiors__note">{majlis.note}</p>
        </div>
      </div>

      <figure className="selected-interiors__banner">
        <button
          type="button"
          className="selected-interiors__banner-trigger"
          onClick={openOlive}
          aria-label={`View full-size image — ${olive.title}`}
        >
          <img
            src={olive.src}
            alt={olive.alt}
            width={olive.width}
            height={olive.height}
            loading="lazy"
            decoding="async"
          />
          <div className="selected-interiors__banner-gradient" aria-hidden="true" />
        </button>
        <figcaption>
          <span className="type-mono">{olive.code} — {olive.category}</span>
          <h3>{olive.title}</h3>
        </figcaption>
      </figure>

      <div className="selected-interiors__pair">
        <figure className="selected-interiors__pair-a">
          <button
            type="button"
            className="selected-interiors__pair-media"
            style={{ aspectRatio: `${wardrobe.width} / ${wardrobe.height}` }}
            onClick={openWardrobe}
            aria-label={`View full-size image — ${wardrobe.title}`}
          >
            <ImageReveal src={wardrobe.src} alt={wardrobe.alt} variant="depth" />
          </button>
          <figcaption className="type-mono">
            <span>{wardrobe.code} — {wardrobe.title}</span>
            <span>{wardrobe.category}</span>
          </figcaption>
        </figure>
        <figure className="selected-interiors__pair-b">
          <button
            type="button"
            className="selected-interiors__pair-media"
            style={{ aspectRatio: `${dressing.width} / ${dressing.height}` }}
            onClick={openDressing}
            aria-label={`View full-size image — ${dressing.title}`}
          >
            <ImageReveal src={dressing.src} alt={dressing.alt} variant="curtain" />
          </button>
          <figcaption className="type-mono">
            <span>{dressing.code} — {dressing.title}</span>
            <span>{dressing.category}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
