'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/portfolio-data';

export function HomeSkills() {
  return (
    <section id="skills" className="container-page py-16">
      <div className="max-w-2xl mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Skills</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
          Tools I reach for on <span className="accent-word">good days</span>.
        </h2>
        <p className="text-muted-foreground mt-3">
          Organized by category so you can tell at a glance whether I’m closer to your front-end opening or your data analyst opening — or happy in either.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SKILLS?.map?.((group, i) => {
          const Icon = group?.icon;
          return (
            <motion.div
              key={group?.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group?.color} flex items-center justify-center`}>
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight">{group?.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group?.items?.map?.((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full bg-secondary/70 text-secondary-foreground px-3 py-1 text-xs font-medium border border-border/50 hover:bg-primary/15 hover:text-primary hover:border-primary/40 transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
