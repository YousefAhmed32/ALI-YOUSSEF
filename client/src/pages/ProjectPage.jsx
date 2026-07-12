import { useParams } from 'react-router-dom';
import { RouteTransition } from '../components/layout/RouteTransition.jsx';
import { ProjectDetail } from '../components/sections/ProjectDetail.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';
import { getProjectBySlug } from '../data/projects.js';

export function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundPage />;

  return (
    <RouteTransition>
      <ProjectDetail project={project} />
    </RouteTransition>
  );
}
