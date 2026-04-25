'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Years coding', value: 5 },
  { label: 'Quiz questions', value: 26 },
  { label: 'Certifications', value: 3 },
  { label: 'Dashboards built', value: 12 },
];

function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * (value ?? 0)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{n}</span>;
}

export function HomeAbout() {
  return (
    <section id="about" className="section-alt py-16 mt-6">
      <div className="container-page grid md:grid-cols-[1.15fr_1fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">About</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            A <span className="accent-word">bilingual</span> technologist.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            I speak two technical languages fluently: the declarative grammar of React components and the
            analytical grammar of SQL joins. That dual perspective helps me design interfaces that are not
            just beautiful, but informed by what the data actually says.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            I’m currently wrapping up Computer Science coursework at Oakland Community College, while
            shipping React apps, Tableau dashboards, and Python EDA notebooks on the side. My AWS Cloud
            Practitioner certification keeps me comfortable across the stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          {stats?.map?.((s, i) => (
            <motion.div
              key={s?.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-panel rounded-2xl p-5 text-center"
            >
              <div className="font-display font-extrabold text-4xl tracking-tight text-primary">
                <CountUp value={s?.value ?? 0} />+
              </div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">{s?.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
