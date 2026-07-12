import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
