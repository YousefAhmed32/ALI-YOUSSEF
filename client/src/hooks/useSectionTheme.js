import { useEffect, useState } from 'react';

// Watches every element carrying data-nav-theme="dark|light" and reports
// whichever theme currently sits behind the header band, so the header
// can adapt its contrast without a layout jump.
export function useSectionTheme(defaultTheme = 'light') {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-nav-theme]'));
    if (!targets.length) {
      setTheme(defaultTheme);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setTheme(visible.target.getAttribute('data-nav-theme') || defaultTheme);
        }
      },
      { rootMargin: '-64px 0px -85% 0px', threshold: [0, 0.1, 0.5, 1] }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [defaultTheme]);

  return theme;
}
