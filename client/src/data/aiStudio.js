/**
 * AI portfolio content.
 * Real commercial works, director specifications, and CMF engineering metadata.
 */

export const aiStudioMeta = {
  name: 'ALI YOUSSEF',
  label: 'GENERATIVE VISUAL DIRECTOR',
  headline: ['GENERATIVE', 'VISION / IN', 'MOTION'],
  intro:
    'AI-directed commercial films and product worlds shaped with a designer’s eye for spatial weight, material caustics, and cinematic camera kinematics.',
  availability: 'Available for Creative Director roles, freelance TVC & studio partnerships',
  location: 'Lebanon · Working worldwide',
};

export const filmCategories = [
  { id: 'all', label: 'All Works', count: 6 },
  { id: 'automotive', label: 'Automotive', count: 1 },
  { id: 'beverage', label: 'Beverage & Product', count: 1 },
  { id: 'fashion', label: 'Luxury Fashion', count: 1 },
  { id: 'coffee', label: 'Macro & Food', count: 1 },
  { id: 'campaign', label: 'Digital Campaign', count: 1 },
  { id: 'manifesto', label: 'Director’s Note', count: 1 },
];

export const aiFilms = [
  {
    id: 'midnight-velocity',
    youtubeId: 'kiF5Y7GxBIE',
    number: '01',
    title: 'Midnight Velocity',
    category: 'Automotive Film',
    categoryKey: 'automotive',
    format: 'Generative video · Direction & edit',
    year: '2025',
    duration: '0:45',
    resolution: '4K UHD · 60fps',
    cinematics: 'Volumetric headlights · High-speed tracking',
    thumbnail: '/img/ai-films/midnight-velocity.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/kiF5Y7GxBIE?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    tools: ['Runway Gen-3', 'ComfyUI', 'DaVinci Resolve'],
    promptDirective:
      'Cinematic night sequence of sleek electric hypercar accelerating through neon metropolis, reflections on wet asphalt, anamorphic lens flare, photorealistic volumetric rain, 35mm film grain --ar 16:9 --style raw',
  },
  {
    id: 'industrial-pulse',
    youtubeId: 'EKkdPS3ZWss',
    number: '02',
    title: 'Industrial Pulse',
    category: 'Product Film',
    categoryKey: 'beverage',
    format: 'Motion study · Art direction',
    year: '2025',
    duration: '1:03',
    resolution: '4K UHD · 60fps',
    cinematics: 'Fluid micro-tracking · Industrial robotic line',
    thumbnail: '/img/ai-films/industrial-pulse.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/EKkdPS3ZWss?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    tools: ['Kling AI', 'Midjourney v6.1', 'After Effects'],
    promptDirective:
      'Industrial beverage bottling facility, macro camera push-in on glass juice bottles with carbonated condensation, robotic conveyor motion, dynamic warm studio lighting --ar 16:9',
  },
  {
    id: 'al-asalah',
    youtubeId: '__rRSpsIp4U',
    number: '03',
    title: 'Al Asalah',
    category: 'Fashion Film',
    categoryKey: 'fashion',
    format: 'Visual development · AI motion',
    year: '2025',
    duration: '0:38',
    resolution: '4K UHD · 60fps',
    cinematics: 'Volumetric pedestal · Gold embroidery caustics',
    thumbnail: '/img/ai-films/al-asalah.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/__rRSpsIp4U?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    tools: ['Midjourney', 'Runway Gen-3', 'DaVinci Resolve'],
    promptDirective:
      'Haute couture luxury Gulf menswear, pure white textured thobe with subtle gold metallic collar embroidery, slow dignified walk in monolithic modern desert architecture, golden hour sun --ar 16:9',
  },
  {
    id: 'morning-ritual',
    youtubeId: 'D4HkGLWwZ28',
    number: '04',
    title: 'Morning Ritual',
    category: 'Food & Beverage',
    categoryKey: 'coffee',
    format: 'Macro direction · Generative film',
    year: '2025',
    duration: '0:52',
    resolution: '4K UHD · 60fps',
    cinematics: 'Extreme macro · Crema flow & rising vapor',
    thumbnail: '/img/ai-films/morning-ritual.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/D4HkGLWwZ28?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    tools: ['ComfyUI', 'Kling AI', 'Premiere Pro'],
    promptDirective:
      'Extreme macro cinematography of fresh roasted artisan coffee beans falling into jute sack, golden crema extraction, subtle morning vapor backlit by soft window daylight --ar 16:9',
  },
  {
    id: 'fast-forward',
    youtubeId: 'WC0CxiJD8-M',
    number: '05',
    title: 'Fast Forward',
    category: 'Digital Campaign',
    categoryKey: 'campaign',
    format: 'Concept · Motion direction',
    year: '2025',
    duration: '0:42',
    resolution: '4K UHD · 60fps',
    cinematics: 'Dynamic urban velocity · Kinetic camera cuts',
    thumbnail: '/img/ai-films/fast-forward.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/WC0CxiJD8-M?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    tools: ['Runway Gen-3', 'Adobe After Effects', 'Topaz Video AI'],
    promptDirective:
      'High-energy urban delivery commercial, modern Middle Eastern city street, vibrant colorful fashion, kinetic dynamic drone push into hero courier, bright cinematic daylight --ar 16:9',
  },
  {
    id: 'directors-note',
    youtubeId: 'F1xeJOPdwRE',
    number: '06',
    title: 'A Message From Ali',
    category: 'Director’s Manifesto',
    categoryKey: 'manifesto',
    format: 'Creative vision · Personal message',
    year: '2025',
    duration: '5:52',
    resolution: '4K UHD · Stereo',
    cinematics: 'Direct-to-camera conversation · Visual philosophy',
    thumbnail: '/img/ai-films/directors-note.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/F1xeJOPdwRE?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    statement:
      'Generative tools are amplifiers of taste, not substitutes for it. Real commercial impact comes from understanding spatial weight, camera intention, and material authenticity.',
    tools: ['Spatial Architecture Experience', 'Creative Direction', 'Film Theory'],
    promptDirective:
      'Ali Youssef speaking on the synthesis of spatial architecture and generative visual direction for international brands and forward-thinking studios.',
  },
];

export const aiProducts = [
  {
    number: '01',
    title: 'Scent Ritual',
    category: 'Product Imagery · Home Fragrance',
    image: '/img/ai-marketing/scent-ritual.jpg',
    alt: 'AI-generated candle and fragrance diffuser product scene',
    lens: 'Phase One IQ4 150MP · 90mm Macro f/4',
    lighting: '3200K Warm Key · Volumetric Spill · Caustic Prism',
    materials: 'Smoked Borosilicate Glass · Natural Rattan · Amber Wax',
    focalPoint: 'Wick glow & glass refraction',
    promptDirective:
      'Artisanal amber glass candle with subtle flickering wick beside a glass reed diffuser on a honed slate plinth, cozy contemporary living room interior bokeh, ray-traced caustics, soft morning light --ar 16:10 --stylize 300',
  },
  {
    number: '02',
    title: 'Opal Light',
    category: 'Product Imagery · High Jewellery',
    image: '/img/ai-marketing/opal-light.jpg',
    alt: 'AI-generated opal pendant jewellery scene',
    lens: 'Hasselblad H6D-100c · 120mm Macro f/5.6',
    lighting: 'Biaxial Specular Rim · Soft Velvet Diffusion',
    materials: '18k Yellow Gold · Australian Opal · Micro Pavé Diamonds',
    focalPoint: 'Opal iridescent fire & diamond pavé',
    promptDirective:
      'Macro high jewellery photography of 18k gold halo pendant featuring an Australian white opal with rainbow fire, micro pavé diamond border, resting on cream velvet fabric, razor-sharp focus --ar 3:4 --v 6.1',
  },
  {
    number: '03',
    title: 'Molten Form',
    category: 'Product Imagery · Sculptural Object',
    image: '/img/ai-marketing/molten-form.jpg',
    alt: 'AI-generated sculptural amber glass object',
    lens: 'Leica S3 · Summarit-S 70mm f/2.5',
    lighting: 'Direct Tungsten Caustics · Nero Marquina Bounce',
    materials: 'Hand-blown Borosilicate Amber Glass · Polished Nero Marquina',
    focalPoint: 'Caustic refraction & marble reflection',
    promptDirective:
      'Sculptural hand-blown amber glass vessel with fluid organic curves placed upon a polished Nero Marquina marble pedestal, dramatic architectural shaft of warm light creating caustic refractions on stone --ar 4:5',
  },
  {
    number: '04',
    title: 'Marble & Walnut',
    category: 'Spatial Design · Bespoke Furniture',
    image: '/img/ai-marketing/marble-walnut.jpg',
    alt: 'AI-generated marble and walnut dining suite',
    lens: 'Fujifilm GFX 100 II · 45mm f/2.8 Tilt-Shift',
    lighting: 'Floor-to-ceiling Northern Daylight · Warm Fill',
    materials: 'Honed Calacatta Marble · Solid American Walnut · Bouclé Weave',
    focalPoint: 'Trestle joinery & marble edge profile',
    promptDirective:
      'Contemporary luxury dining room, monolithic Calacatta marble dining table on sculptural solid American walnut trestle base, upholstered bouclé dining chairs, architectural moldings, soft diffused daylight --ar 4:3',
  },
  {
    number: '05',
    title: 'Quiet Suite',
    category: 'Spatial Design · Contemporary Interior',
    image: '/img/ai-marketing/quiet-suite.jpg',
    alt: 'AI-generated contemporary bedroom interior',
    lens: 'Sony A7R V · 24-70mm GM II f/4 at 35mm',
    lighting: 'Concealed LED Cove 2700K · Diffused Linen Window Sheer',
    materials: 'Fluted Acoustic Wool Upholstery · White Oak · Washed Linen',
    focalPoint: 'Headboard fluting & layered textiles',
    promptDirective:
      'Serene contemporary master bedroom suite, custom fluted acoustic upholstered headboard, low minimalist bed with layered textured linen bedding, warm concealed cove illumination, subtle morning sunlight --ar 16:9',
  },
];

export const aiProcess = [
  {
    number: '01',
    title: 'Find the visual idea',
    subtitle: 'Treatment & Architectural Premise',
    text: 'Translate the brief into a sharp creative premise, camera angle blueprints, mood boards, and lighting rules. Every production begins with a defined visual constraint.',
    deliverable: 'Visual Bible · Framing Rules · Mood Treatment',
  },
  {
    number: '02',
    title: 'Build the world',
    subtitle: 'CMF & Consistency Systems',
    text: 'Develop characters, products, environments and material language. Using ControlNet and IP-Adapter frameworks to guarantee that products, faces, and materials maintain exact continuity.',
    deliverable: 'Consistent Seed Models · CMF Material Sheets · LoRA Weights',
  },
  {
    number: '03',
    title: 'Direct the movement',
    subtitle: 'Camera Kinematics & Motion Synthesis',
    text: 'Shape camera behaviour, velocity curves, and spatial transitions. Iterating on motion models to achieve optical continuity and eliminate temporal jitter or morphing artifacts.',
    deliverable: 'Camera Motion Curves · Frame-by-Frame Direction · Multi-angle Stems',
  },
  {
    number: '04',
    title: 'Finish the story',
    subtitle: 'DaVinci Grading & Master Delivery',
    text: 'Master color in DaVinci Resolve using ACES color-managed workflows, 4K spatial upscaling, dynamic grain matching, and custom sound design designed for high-impact broadcast.',
    deliverable: 'ACEScct Color Grade · 4K Master Deliverable · Multi-platform Crops',
  },
];

export const aiDisciplines = [
  'AI COMMERCIAL FILMS',
  'CMF PRODUCT WORLDS',
  'CAMPAIGN ART DIRECTION',
  'TEMPORAL MOTION SYSTEMS',
  'SPATIAL SCENOGRAPHY',
];

export const aiToolchain = [
  { name: 'Midjourney v6.1', category: 'High-Fidelity Diffusion', role: 'World Building & Textures' },
  { name: 'Runway Gen-3 Alpha', category: 'Temporal Motion', role: 'Camera Kinematics & Speed' },
  { name: 'Kling AI 1.5', category: 'Physics & Fluid Motion', role: 'Macro & Object Simulation' },
  { name: 'ComfyUI & ControlNet', category: 'Pipeline Engineering', role: 'Pose & Seed Continuity' },
  { name: 'DaVinci Resolve Studio', category: 'Color & Grading', role: 'ACEScct Color Pipeline' },
  { name: 'Adobe After Effects', category: 'Finishing & VFX', role: 'Tracking, Clean Plates & Comp' },
];
