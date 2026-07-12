import { objectStudies } from '../../data/interiors.js';
import { ImageReveal } from '../media/ImageReveal.jsx';
import { useLightboxTrigger } from '../media/useLightboxTrigger.js';
import './object-studies.css';

const LIGHTBOX_IMAGES = objectStudies.map((item) => ({
  src: item.src,
  alt: item.alt,
  caption: item.title,
  eyebrow: item.code,
}));

function ObjectStudyItem({ item, index }) {
  const openLightboxAt = useLightboxTrigger(LIGHTBOX_IMAGES, index);

  return (
    <figure className={`object-studies__item object-studies__item--${index}`}>
      <span className="object-studies__ghost" aria-hidden="true">{item.code}</span>
      <button
        type="button"
        className="object-studies__frame"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
        onClick={openLightboxAt}
        aria-label={`View full-size image — ${item.title}`}
      >
        <ImageReveal src={item.src} alt={item.alt} variant={index === 1 ? 'curtain' : 'depth'} />
      </button>
      <figcaption>
        <h3 className="object-studies__title">{item.title}</h3>
        <ul className="type-mono object-studies__tags">
          {item.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

export function ObjectStudies() {
  return (
    <section className="object-studies" data-nav-theme="dark" aria-labelledby="object-studies-title">
      <div className="object-studies__head type-mono">
        <span>BESPOKE OBJECTS — MATERIAL STUDY</span>
        <span>ONE FORM, THREE MATERIALS</span>
      </div>

      <h2 id="object-studies-title" className="sr-only">Bespoke object studies</h2>

      <div className="object-studies__grid">
        {objectStudies.map((item, i) => (
          <ObjectStudyItem item={item} index={i} key={item.slug} />
        ))}
      </div>
    </section>
  );
}
