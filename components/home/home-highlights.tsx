'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Briefcase, UserRound, LineChart } from 'lucide-react';

const features = [
  {
    href: '/quiz',
    icon: BrainCircuit,
    title: 'Skill Quiz',
    blurb: 'Front-end + analytics questions with deep explanations. Earn XP for every correct answer.',
    color: 'from-pink-400/20 to-pink-200/5',
  },
  {
    href: '/jobs',
    icon: Briefcase,
    title: 'Live Job Market',
    blurb: 'Real-time remote roles pulled from a public jobs API, filtered for US/Canada with charts.',
    color: 'from-orange-300/20 to-orange-200/5',
  },
  {
    href: '/recommender',
    icon: LineChart,
    title: 'AI Career Coach',
    blurb: 'Your quiz results become a streaming, personalized career plan powered by an LLM.',
    color: 'from-purple-300/20 to-purple-200/5',
  },
  {
    href: '/character',
    icon: UserRound,
    title: 'Blossom Avatar',
    blurb: 'A Sims-style character builder — unlock outfits and accessories as you earn XP.',
    color: 'from-rose-300/20 to-rose-200/5',
  },
];

export function HomeHighlights() {
  return (
    <section className="container-page py-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features?.map?.((f, i) => {
          const Icon = f?.icon;
          return (
            <motion.div
              key={f?.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={f?.href ?? '/'}
                className={`group block rounded-2xl glass-panel p-5 h-full transition hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f?.color} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg tracking-tight">{f?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f?.blurb}</p>
                <span className="mt-3 inline-block text-xs font-mono text-primary group-hover:underline">Open →</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
