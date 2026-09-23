import { useEffect } from 'react';
import { CustomCursor } from '../interaction/CustomCursor.jsx';
import { ScrollToTop } from '../layout/ScrollToTop.jsx';
import { AiStudioHeader } from './AiStudioHeader.jsx';
import { AiStudioFooter } from './AiStudioFooter.jsx';
import './ai-studio.css';

export function AiStudioLayout({ children }) {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const theme = document.querySelector('meta[name="theme-color"]');
    const previousDescription = description?.getAttribute('content');
    const previousTheme = theme?.getAttribute('content');

    document.title = 'Ali Youssef — Generative Visual Director';
    description?.setAttribute(
      'content',
      'Selected AI-directed films, product imagery and generative visual work by Ali Youssef.'
    );
    theme?.setAttribute('content', '#090d0d');

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.setAttribute('content', previousDescription);
      if (theme && previousTheme) theme.setAttribute('content', previousTheme);
    };
  }, []);

  return (
    <div className="ai-studio-root">
      <a href="#main-ai" className="skip-link">
        Skip to AI portfolio
      </a>
      <CustomCursor />
      <ScrollToTop />
      <AiStudioHeader />
      <main id="main-ai" tabIndex={-1}>
        {children}
      </main>
      <AiStudioFooter />
    </div>
  );
}

