import { RouteTransition } from '../components/layout/RouteTransition.jsx';
import { HeroExperience } from '../components/sections/HeroExperience.jsx';
import { VeiledStoneChapter } from '../components/sections/VeiledStoneChapter.jsx';
import { ApertureHouseChapter } from '../components/sections/ApertureHouseChapter.jsx';
import { FullRevealMoment } from '../components/sections/FullRevealMoment.jsx';
import { NightWorksSequence } from '../components/sections/NightWorksSequence.jsx';
import { ManifestoSection } from '../components/sections/ManifestoSection.jsx';
import { TypologiesSection } from '../components/sections/TypologiesSection.jsx';
import { FacetKitchenSection } from '../components/sections/FacetKitchenSection.jsx';
import { MaterialGallerySection } from '../components/sections/MaterialGallerySection.jsx';
import { ObjectStudies } from '../components/sections/ObjectStudies.jsx';
import { SelectedInteriors } from '../components/sections/SelectedInteriors.jsx';
import { CraftsmanshipSection } from '../components/sections/CraftsmanshipSection.jsx';
import { ArchiveList } from '../components/sections/ArchiveList.jsx';
import { StudioTeaser } from '../components/sections/StudioTeaser.jsx';
import { ClosingSection } from '../components/sections/ClosingSection.jsx';
import { getProjectBySlug } from '../data/projects.js';

const suspended = getProjectBySlug('suspended-house');

export function HomePage() {
  return (
    <RouteTransition>
      <HeroExperience />
      <VeiledStoneChapter />
      <ApertureHouseChapter />
      <FullRevealMoment
        project={suspended}
        sceneLabel="SCENE 04 — FULL REVEAL  003 / 009"
        notes={['A STONE MASS, HELD OFF THE GROUND', 'THE STAIR CLIMBS THROUGH FALLING WATER', 'IMAGE SCALES SLOWLY ON SCROLL']}
      />
      <NightWorksSequence />
      <ManifestoSection />
      <TypologiesSection />
      <FacetKitchenSection />
      <MaterialGallerySection />
      <ObjectStudies />
      <SelectedInteriors />
      <CraftsmanshipSection />
      <ArchiveList />
      <StudioTeaser />
      <ClosingSection />
    </RouteTransition>
  );
}
