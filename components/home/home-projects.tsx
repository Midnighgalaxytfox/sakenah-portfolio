'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/portfolio-data';

const accents: Record<string, string> = {
  rose: 'from-pink-400 to-rose-500',
  amber: 'from-amber-400 to-orange-500',
  emerald: 'from-emerald-400 to-teal-500',
  blue: 'from-sky-400 to-indigo-500',
};

export function HomeProjects() {
  return (
    <section id="projects" className="container-page py-16">
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Projects</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            Small apps, <span className="accent-word">big lessons</span>.
          </h2>
          <p className="text-muted-foreground mt-3">
            Each project was a chance to practice shipping: designing, building, deploying, and reflecting.
          </p>
        </div>
        <Link href="/projects" className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition">
          See all <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {PROJECTS?.map?.((p, i) => (
          <motion.article
            key={p?.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-panel rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition group"
          >
            <Link href={`/projects/${p?.slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl" aria-label={`Open ${p?.name} mini app`}>
              <div className={`h-2 bg-gradient-to-r ${accents?.[p?.accent ?? 'rose'] ?? accents.rose}`} aria-hidden="true" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-bold text-xl tracking-tight group-hover:text-primary transition">{p?.name}</h3>
                  <span className="text-xs font-mono rounded-full px-2 py-0.5 bg-accent/15 text-accent-foreground border border-accent/30">
                    {p?.focus === 'data' ? 'Analytics' : 'Front-End'}
                  </span>
                </div>
                <p className="text-sm text-primary mt-0.5 font-medium">{p?.tagline}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p?.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p?.stack?.map?.((s) => (
                    <span key={s} className="inline-flex items-center rounded-md bg-secondary/70 px-2 py-0.5 text-xs font-mono text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Open mini app <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
