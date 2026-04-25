'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { BRANDING } from '@/lib/branding';

export function HomeHero() {
  return (
    <section className="container-page pt-10 md:pt-16 pb-10">
      <div className="grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-mono mb-5">
            <Sparkles size={12} /> Open to remote roles · US / Canada
          </span>
          <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            Hi, I’m <span className="accent-word">{BRANDING.shortName}</span>.
            <br />
            <span className="text-foreground/90">I build calm UIs and curious dashboards.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-[60ch]">
            Front-end developer and data analyst blending React craft with SQL-driven storytelling.
            This portfolio is part resume, part playground — take a quiz, browse live jobs, or build a tiny avatar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition">
              See my work <ArrowRight size={16} />
            </Link>
            <Link href="/quiz" className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-semibold border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition">
              Try the skill quiz
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-2.5 text-sm font-semibold border border-border hover:border-accent hover:text-accent transition">
              Contact me
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={14} /> {BRANDING.location}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="hero-fox-illustration relative aspect-square max-w-[460px] mx-auto rounded-[28px] overflow-hidden shadow-lg" role="img" aria-label="Animated fox resting under cherry blossoms">
            <div className="hero-tree" aria-hidden="true" />
            <div className="hero-cloud" aria-hidden="true" />
            <div className="hero-fox" aria-hidden="true">🦊</div>
            <div className="hero-blossoms" aria-hidden="true"><span /> <span /> <span /></div>
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -left-3 glass-panel rounded-2xl px-4 py-3 text-sm shadow-md"
          >
            <div className="font-mono text-xs text-muted-foreground">React · SQL · Tableau</div>
            <div className="font-semibold">Two crafts. One calm page.</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute -bottom-3 -right-3 glass-panel rounded-2xl px-4 py-3 text-sm shadow-md"
          >
            <div className="font-mono text-xs text-muted-foreground">AWS Cloud Practitioner</div>
            <div className="font-semibold">· Certified</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
