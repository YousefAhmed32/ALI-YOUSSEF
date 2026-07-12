import { Link } from 'react-router-dom';
import { RouteTransition } from '../components/layout/RouteTransition.jsx';
import './not-found-page.css';

export function NotFoundPage() {
  return (
    <RouteTransition>
      <section className="not-found" data-nav-theme="light">
        <div className="type-mono not-found__label">404</div>
        <h1 className="not-found__title">THE WALL HAS NO OPENING HERE.</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="type-mono not-found__link">
          ← RETURN HOME
        </Link>
      </section>
    </RouteTransition>
  );
}
