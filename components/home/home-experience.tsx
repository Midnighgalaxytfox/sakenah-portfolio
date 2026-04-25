'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE } from '@/lib/portfolio-data';

export function HomeExperience() {
  return (
    <section id="experience" className="section-alt py-16">
      <div className="container-page">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Experience</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            A path that <span className="accent-word">earned</span> its engineering.
          </h2>
          <p className="text-muted-foreground mt-3">
            From Amazon routes to Tableau dashboards — every stop taught me something about reliability, systems, and working with real people.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-[92px] top-0 bottom-0 w-px bg-primary/20" aria-hidden="true" />
          <div className="flex flex-col gap-5">
            {EXPERIENCE?.map?.((job, i) => (
              <motion.div
                key={job?.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative pl-10 md:pl-[120px]"
              >
                <span className="absolute left-[7px] md:left-[85px] top-5 w-4 h-4 rounded-full bg-primary shadow-md ring-4 ring-background" aria-hidden="true" />
                <div className="glass-panel rounded-2xl p-5 hover:shadow-lg transition">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-lg tracking-tight">{job?.role}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                        <span className="inline-flex items-center gap-1"><Building2 size={12} /> {job?.company}</span>
                        <span className="inline-flex items-center gap-1"><Calendar size={12} /> {job?.period}</span>
                        <span className="inline-flex items-center gap-1"><MapPin size={12} /> {job?.location}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
                    {job?.highlights?.map?.((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
