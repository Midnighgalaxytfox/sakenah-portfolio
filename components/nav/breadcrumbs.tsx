'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const LABELS: Record<string, string> = {
  about: 'About',
  projects: 'Projects',
  quiz: 'Skill Quiz',
  start: 'Start',
  jobs: 'Job Market',
  recommender: 'AI Career Coach',
  character: 'Avatar',
  contact: 'Contact',
};

export function Breadcrumbs() {
  const pathname = usePathname() ?? '/';
  if (pathname === '/') return null;
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="container-page pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition">
            <Home size={14} /> Home
          </Link>
        </li>
        {parts?.map?.((p, i) => {
          const href = '/' + parts.slice(0, i + 1).join('/');
          const isLast = i === parts.length - 1;
          const label = LABELS?.[p] ?? p.charAt(0).toUpperCase() + p.slice(1);
          return (
            <li key={href} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="opacity-50" />
              {isLast ? (
                <span className="font-medium text-foreground">{label}</span>
              ) : (
                <Link href={href} className="hover:text-primary transition">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
