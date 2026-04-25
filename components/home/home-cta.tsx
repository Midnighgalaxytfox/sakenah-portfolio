'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HomeCta() {
  return (
    <section className="container-page py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground shadow-lg"
      >
        <div className="relative z-10 max-w-xl">
          <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
            Hiring for a remote role?
          </h3>
          <p className="mt-3 text-primary-foreground/90">
            I’d love to talk. Whether it’s a React front-end role, a data analyst opening, or something hybrid — let’s see if we’re a match.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition">
              Send a message <ArrowRight size={16} />
            </Link>
            <Link href="/recommender" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 px-5 py-2.5 text-sm font-semibold hover:bg-primary-foreground/20 transition">
              Try the AI coach
            </Link>
          </div>
        </div>
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
