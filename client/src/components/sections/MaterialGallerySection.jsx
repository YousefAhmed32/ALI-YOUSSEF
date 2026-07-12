import { materialStrip } from '../../data/projects.js';
import { HorizontalGallery } from '../media/HorizontalGallery.jsx';
import './material-gallery-section.css';

export function MaterialGallerySection() {
  return (
    <section className="material-gallery" data-nav-theme="light" aria-label="Material corridor">
      <div className="material-gallery__head">
        <div className="type-mono">MATERIAL CORRIDOR — ONE HORIZONTAL MOMENT</div>
        <div className="material-gallery__chip type-mono" aria-hidden="true">DRAG</div>
      </div>
      <HorizontalGallery items={materialStrip.map((s) => ({ ...s, label: s.label }))} />
    </section>
  );
}
