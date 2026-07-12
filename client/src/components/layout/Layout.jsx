import { cloneElement, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import { SiteHeader } from './SiteHeader.jsx';
import { SiteFooter } from './SiteFooter.jsx';
import { ScrollToTop } from './ScrollToTop.jsx';
import { FullscreenMenu } from '../navigation/FullscreenMenu.jsx';
import { CustomCursor } from '../interaction/CustomCursor.jsx';
import { WhatsAppFloatingButton } from '../interaction/WhatsAppAction.jsx';
import { Lightbox } from '../media/Lightbox.jsx';

function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();
  return (
    <AnimatePresence mode="wait" initial={false}>
      {element ? cloneElement(element, { key: location.pathname }) : null}
    </AnimatePresence>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <ScrollToTop />
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} menuOpen={menuOpen} menuTriggerRef={menuTriggerRef} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuTriggerRef} />
      <main id="main" tabIndex={-1}>
        <AnimatedOutlet />
      </main>
      <SiteFooter />
      {menuOpen ? null : <WhatsAppFloatingButton />}
      <Lightbox />
    </>
  );
}
