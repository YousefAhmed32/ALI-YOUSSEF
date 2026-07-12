// Transcribed from the v2 source of truth (Ali Youssef Portfolio v2.dc.html).
// Placeholders such as "[ TO BE CONFIRMED ]" are preserved intentionally —
// they mark facts that were never supplied and must not be invented.

export const TBC = 'TO BE CONFIRMED';

export const projects = [
  {
    index: '001',
    code: 'W—001',
    slug: 'veiled-stone-house',
    name: 'VEILED STONE HOUSE',
    typology: 'RESIDENTIAL',
    type: 'PRIVATE RESIDENCE',
    src: '/img/p1-veiled-stone.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'LIMESTONE / MARBLE / WALNUT',
    intent:
      'A closed limestone mass, cut once. Dark marble and lattice hold the opening; lanterns keep it warm after the sun leaves the wall.',
    layout: 'cinematic',
    chapters: [
      { label: 'THE APPROACH — SHADE BEFORE THRESHOLD', size: '170%', pos: '50% 88%' },
      { label: '02 / STRUCTURE — THE CANTILEVERED ROOM', size: '260%', pos: '38% 22%' },
      { label: '03 / MATERIAL — INLAID DARK MARBLE', size: '430%', pos: '26% 18%' },
      { label: '04 / LIGHT — LANTERNS AT DUSK', size: '400%', pos: '47% 63%' },
      { label: '05 / RESOLUTION — THE APPROACH', size: '160%', pos: '50% 78%' },
    ],
  },
  {
    index: '002',
    code: 'W—002',
    slug: 'aperture-house',
    name: 'APERTURE HOUSE',
    typology: 'RESIDENTIAL',
    type: 'RESIDENTIAL',
    src: '/img/p2-aperture.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'CONCRETE, SINGLE CUT',
    intent:
      'A residence conceived as a single concrete frame, cut open at its centre. Water falls through the void — the opening is the room.',
    layout: 'editorial',
    chapters: [
      { label: 'DETAIL — THE CUT', size: '520%', pos: '56% 32%' },
      { label: 'FRAME B — THE FALLING WATER', size: '300%', pos: '62% 42%' },
    ],
  },
  {
    index: '003',
    code: 'W—003',
    slug: 'suspended-house',
    name: 'SUSPENDED HOUSE',
    typology: 'RESIDENTIAL',
    type: 'RESIDENTIAL',
    src: '/img/p5-suspended.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'TRAVERTINE / GLASS / WATER',
    intent:
      'A stone mass, held off the ground. The stair climbs through falling water.',
    layout: 'cinematic',
    chapters: [],
  },
  {
    index: '004',
    code: 'W—004',
    slug: 'strata-building',
    name: 'STRATA BUILDING',
    typology: 'COMMERCIAL',
    type: 'COMMERCIAL',
    src: '/img/p3-strata.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'GLASS / CONCRETE',
    intent:
      'Three horizontal planes, held apart by light. The building is read at the scale of the street — as strata, not storeys.',
    layout: 'gallery',
    chapters: [],
  },
  {
    index: '005',
    code: 'W—005',
    slug: 'ember-villa',
    name: 'EMBER VILLA',
    typology: 'RESIDENTIAL',
    type: 'RESIDENTIAL',
    src: '/img/p6-ember.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'TIMBER',
    intent: 'Timber fins, lit from within.',
    layout: 'compact',
    chapters: [],
  },
  {
    index: '006',
    code: 'W—006',
    slug: 'fin-house',
    name: 'FIN HOUSE',
    typology: 'RESIDENTIAL',
    type: 'RESIDENTIAL',
    src: '/img/p8-fin.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'BASALT',
    intent: 'White blades against basalt.',
    layout: 'compact',
    chapters: [],
  },
  {
    index: '007',
    code: 'W—007',
    slug: 'prism-mall',
    name: 'PRISM MALL',
    typology: 'COMMERCIAL',
    type: 'COMMERCIAL',
    src: '/img/p7-prism.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'BRASS LATTICE',
    intent: 'A cut read from the street.',
    layout: 'gallery',
    chapters: [],
  },
  {
    index: '008',
    code: 'W—008',
    slug: 'current-villa',
    name: 'CURRENT VILLA',
    typology: 'SPATIAL STUDY',
    type: 'SPATIAL STUDY',
    src: '/img/p9-current.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'POURED CONCRETE',
    intent:
      'The one curve in the catalogue. Two poured ribbons carry the rooms; the garden holds the geometry still.',
    layout: 'editorial',
    chapters: [],
  },
  {
    index: '009',
    code: 'W—009',
    slug: 'facet-kitchen',
    name: 'FACET KITCHEN',
    typology: 'INTERIOR',
    type: 'INTERIOR',
    src: '/img/p4-facet.jpg',
    status: 'VISUALISATION',
    location: TBC,
    surface: 'STONE / LEATHER / BRASS',
    intent:
      'An interior read at arm’s length. Stone folded like paper, leather stretched flat, brass drawn into rings of light.',
    layout: 'compact',
    chapters: [
      { num: 'D—01', label: 'CUT STONE', caption: 'D—01 — THE FOLDED ISLAND', size: '180%', pos: '60% 75%' },
      { num: 'D—02', label: 'SADDLE LEATHER', caption: 'D—02 — LEATHER SCREEN, STITCHED', size: '260%', pos: '92% 30%' },
      { num: 'D—03', label: 'BRASS LIGHT', caption: 'D—03 — RINGS OF BRASS LIGHT', size: '300%', pos: '78% 6%' },
      { num: 'D—04', label: 'GARDEN GLASS', caption: 'D—04 — GLASS TO THE GARDEN', size: '260%', pos: '4% 40%' },
    ],
  },
];

export const materialStrip = [
  { w: 520, src: '/img/p1-veiled-stone.jpg', size: '300%', pos: '30% 20%', label: 'S—01 — MARBLE INLAY, LIT' },
  { w: 340, src: '/img/p6-ember.jpg', size: '300%', pos: '20% 40%', label: 'S—02 — TIMBER FINS' },
  { w: 420, src: '/img/p5-suspended.jpg', size: '260%', pos: '70% 40%', label: 'S—03 — WATER THROUGH GLASS' },
  { w: 340, src: '/img/p8-fin.jpg', size: '300%', pos: '12% 50%', label: 'S—04 — WHITE BLADES' },
  { w: 420, src: '/img/p7-prism.jpg', size: '260%', pos: '78% 30%', label: 'S—05 — BRASS LATTICE ROOF' },
  { w: 340, src: '/img/p2-aperture.jpg', size: '320%', pos: '40% 70%', label: 'S—06 — BOARD-FORMED CONCRETE' },
  { w: 420, src: '/img/p9-current.jpg', size: '260%', pos: '40% 45%', label: 'S—07 — POURED RIBBON' },
];

export const catalogueImages = projects.map((p) => ({
  src: p.src,
  alt: `${p.name} — full frame`,
  caption: p.name,
  eyebrow: p.code,
}));

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getAdjacentProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}
