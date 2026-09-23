import { Link } from 'react-router-dom';

export function AiStudioFooter() {
  return (
    <footer className="ai-footer">
      <div className="ai-footer__brand">
        <span>ALI YOUSSEF</span>
        <span>GENERATIVE VISUAL DIRECTOR</span>
      </div>
      <div className="ai-footer__meta">
        <span>Lebanon · Worldwide</span>
        <span>© {new Date().getFullYear()}</span>
        <Link to="/">Main portfolio ↗</Link>
      </div>
    </footer>
  );
}

