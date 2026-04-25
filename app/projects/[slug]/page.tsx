import { notFound } from 'next/navigation';
import { ProjectShowcasePage } from '@/components/projects/project-showcase-page';
import { PROJECT_SHOWCASES, findProjectShowcase } from '@/lib/project-showcases';

export function generateStaticParams() {
  return PROJECT_SHOWCASES.flatMap((project) => [
    { slug: project.slug },
    ...(project.aliases ?? []).map((slug) => ({ slug })),
  ]);
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = findProjectShowcase(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = findProjectShowcase(params.slug);
  if (!project) notFound();
  return <ProjectShowcasePage project={project} />;
}
