import { PROJECTS } from '@/lib/portfolio-data';
import { HomeProjects } from '@/components/home/home-projects';
import { Code2, Database, Layers, Rocket } from 'lucide-react';

export const metadata = { title: 'Projects' };

const principles = [
  { icon: Rocket, title: 'Ship small', text: 'Prefer one well-finished feature to three half-baked ones.' },
  { icon: Code2, title: 'Readable first', text: 'Clear code out-values clever code, always.' },
  { icon: Database, title: 'Let data speak', text: 'A chart only earns space if it changes a decision.' },
  { icon: Layers, title: 'Composable UI', text: 'Tiny primitives → reusable patterns → maintainable apps.' },
];

export default function ProjectsPage() {
  return (
    <div>
      <section className="container-page pt-10 pb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Projects</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-3xl">
          A small shelf of <span className="accent-word">things I built</span>.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
          These are compact, production-quality practice projects that each tackled a specific challenge —
          animation, data integration, persistence, or analytics. Live demos and source are available on request while I finalize public repos.
        </p>
      </section>

      <HomeProjects />

      <section className="section-alt py-14">
        <div className="container-page">
          <h2 className="font-display font-bold text-2xl tracking-tight mb-6">How I approach builds</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {principles?.map?.((p) => {
              const Icon = p?.icon;
              return (
                <div key={p?.title} className="glass-panel rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-lg transition">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg tracking-tight">{p?.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p?.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
