import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout.jsx';
import { HomePage } from '../pages/HomePage.jsx';

const WorkIndexPage = lazy(() => import('../pages/WorkIndexPage.jsx').then((m) => ({ default: m.WorkIndexPage })));
const ProjectPage = lazy(() => import('../pages/ProjectPage.jsx').then((m) => ({ default: m.ProjectPage })));
const StudioPage = lazy(() => import('../pages/StudioPage.jsx').then((m) => ({ default: m.StudioPage })));
const ContactPage = lazy(() => import('../pages/ContactPage.jsx').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx').then((m) => ({ default: m.NotFoundPage })));

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/work"
          element={
            <Suspense fallback={null}>
              <WorkIndexPage />
            </Suspense>
          }
        />
        <Route
          path="/work/:slug"
          element={
            <Suspense fallback={null}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path="/studio"
          element={
            <Suspense fallback={null}>
              <StudioPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={null}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
