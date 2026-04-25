'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowLeft, ArrowUpRight, BarChart3, CheckCircle2, Dumbbell, Heart, PawPrint, Plus, Sparkles, TrendingUp } from 'lucide-react';
import type { ProjectShowcase } from '@/lib/project-showcases';
import { PROJECT_SHOWCASES } from '@/lib/project-showcases';
import { ThemedProjectCursor } from './themed-project-cursor';

type Burst = { id: number; x: number; y: number; label: string };

const metricIcons = {
  activity: Activity,
  'bar-chart': BarChart3,
  dumbbell: Dumbbell,
  heart: Heart,
  paw: PawPrint,
  sparkles: Sparkles,
  trending: TrendingUp,
} as const;
const lovePrompts = ['Your kindness matters', 'You are safe here', 'Tiny notes become memories', 'Soft love still counts'];
const dogTasks = ['Breakfast', 'Fresh water', 'Afternoon walk', 'Brush coat'];
const workoutPlan = [
  { name: 'Strength', value: 82, color: 'bg-emerald-400' },
  { name: 'Cardio', value: 64, color: 'bg-cyan-400' },
  { name: 'Mobility', value: 48, color: 'bg-lime-400' },
  { name: 'Recovery', value: 76, color: 'bg-teal-400' },
];
const retailBars = [
  { region: 'Midwest', value: 86 },
  { region: 'Ontario', value: 73 },
  { region: 'Remote', value: 92 },
  { region: 'East', value: 68 },
];

export function ProjectShowcasePage({ project }: { project: ProjectShowcase }) {
  const nextProject = useMemo(() => {
    const currentIndex = PROJECT_SHOWCASES.findIndex((item) => item.slug === project.slug);
    return PROJECT_SHOWCASES[(currentIndex + 1) % PROJECT_SHOWCASES.length];
  }, [project.slug]);

  return (
    <div className={`project-detail project-theme-${project.theme} min-h-screen overflow-hidden`}>
      <ThemedProjectCursor theme={project.theme} label={project.cursorLabel} />
      <section className={`relative border-b border-white/50 bg-gradient-to-br ${project.gradient}`}>
        <div className="project-orb project-orb-one" aria-hidden="true" />
        <div className="project-orb project-orb-two" aria-hidden="true" />
        <div className="container-page pt-10 pb-16 md:pb-20 relative z-[1]">
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-white transition">
            <ArrowLeft size={16} /> Back to projects
          </Link>

          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-12 items-center mt-10">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary font-bold mb-3">{project.eyebrow}</p>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.03]">
                {project.title}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{project.subtitle}</p>
              <p className="mt-4 max-w-2xl leading-relaxed">{project.story}</p>

              <div className="flex flex-wrap gap-2 mt-7">
                {project.highlights.map((item) => (
                  <span key={item} className="rounded-full bg-white/75 border border-white/70 px-3 py-1 text-sm font-semibold shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.08 }}>
              <ProjectHeroDemo project={project} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-4">
          {project.metrics.map((metric) => {
            const Icon = metricIcons[metric.icon];
            return (
              <motion.div key={metric.label} whileHover={{ y: -4 }} className={`${project.panel} glass-panel rounded-3xl p-5 border`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="font-display text-3xl font-extrabold tracking-tight mt-1">{metric.value}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mt-6">
          <div className={`${project.panel} glass-panel rounded-3xl p-6 border`}>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Why this build stands out</p>
            <h2 className="font-display text-2xl font-bold tracking-tight">Cute UI with real product thinking.</h2>
            <div className="grid gap-3 mt-5">
              {project.features.map((feature) => (
                <div key={feature} className="flex gap-3 rounded-2xl bg-white/60 p-3 border border-white/70">
                  <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={18} />
                  <span className="text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${project.panel} glass-panel rounded-3xl p-6 border`}>
            {project.theme === 'love' && <LoveTrackerApp />}
            {project.theme === 'dog' && <DogDashboardApp />}
            {project.theme === 'fitness' && <FitnessTrackerApp />}
            {project.theme === 'retail' && <RetailDashboardApp />}
          </div>
        </div>

        <section className="mt-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-6" aria-label={`${project.title} detailed case study`}>
          <div className={`${project.panel} glass-panel rounded-3xl p-6 border space-y-5`}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Detailed case study</p>
              <h2 className="font-display text-3xl font-bold tracking-tight">More than a pretty demo.</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{project.overview}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/65 border border-white/70 p-4">
                <h3 className="font-display font-bold text-lg tracking-tight">Problem</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div className="rounded-2xl bg-white/65 border border-white/70 p-4">
                <h3 className="font-display font-bold text-lg tracking-tight">Solution</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4">
              <h3 className="font-display font-bold text-lg tracking-tight">Recruiter takeaway</h3>
              <p className="mt-2 text-sm leading-relaxed">{project.recruiterSummary}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className={`${project.panel} glass-panel rounded-3xl p-6 border`}>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Technical notes</p>
              <div className="space-y-3">
                {project.technicalDetails.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/65 border border-white/70 p-4">
                    <h3 className="font-display font-bold tracking-tight">{item.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid md:grid-cols-3 gap-4" aria-label={`${project.title} implementation details`}>
          {[
            ['User experience', project.userExperience],
            ['Data & logic', project.dataAndLogic],
            ['Accessibility', project.accessibility],
          ].map(([title, items]) => (
            <div key={title as string} className={`${project.panel} glass-panel rounded-3xl p-5 border`}>
              <h3 className="font-display font-bold text-lg tracking-tight">{title as string}</h3>
              <ul className="mt-3 space-y-2">
                {(items as string[]).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className={`${project.panel} glass-panel rounded-3xl p-5 border mt-6`}>
          <h3 className="font-display font-bold text-lg tracking-tight">Planned intelligent updates</h3>
          <p className="text-sm text-muted-foreground mt-1">These next improvements are documented here so the project story can evolve as the site grows.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {project.futureUpdates.map((item) => (
              <div key={item} className="rounded-2xl bg-white/65 border border-white/70 p-3 text-sm font-medium">{item}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 rounded-3xl border border-white/70 bg-white/65 p-5 shadow-sm">
          <div>
            <p className="font-semibold">Keep exploring Sakenah’s project world</p>
            <p className="text-sm text-muted-foreground">Each project has its own cursor, mood, and mini interaction.</p>
          </div>
          <Link href={`/projects/${nextProject.slug}`} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-bold hover:opacity-90 transition">
            Next: {nextProject.title} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProjectHeroDemo({ project }: { project: ProjectShowcase }) {
  if (project.theme === 'love') return <LoveCloudMascot />;
  if (project.theme === 'dog') return <DogMascotCard />;
  if (project.theme === 'fitness') return <FitnessPulseCard />;
  return <RetailAnalyticsCard />;
}

function LoveCloudMascot() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [compliments, setCompliments] = useState(18);

  const createHearts = () => {
    const base = Date.now();
    setCompliments((count) => count + 1);
    setBursts((current) => [
      ...current,
      ...Array.from({ length: 14 }, (_, index) => ({
        id: base + index,
        x: 32 + ((index * 13) % 42),
        y: 24 + ((index * 17) % 34),
        label: ['💗', '💕', '💖', '💞'][index % 4],
      })),
    ]);
    window.setTimeout(() => {
      setBursts((current) => current.filter((heart) => heart.id < base || heart.id >= base + 14));
    }, 950);
  };

  return (
    <div className="love-cloud-stage" onMouseEnter={createHearts} onFocus={createHearts} tabIndex={0} role="button" aria-label="Compliment the love tracker fox">
      <div className="cloud-main">
        <span className="cloud-bubble cloud-bubble-one" />
        <span className="cloud-bubble cloud-bubble-two" />
        <span className="cloud-bubble cloud-bubble-three" />
      </div>
      <div className="mini-fox" aria-hidden="true">
        <span className="fox-ear left" />
        <span className="fox-ear right" />
        <span className="fox-face">🦊</span>
      </div>
      <AnimatePresence>
        {bursts.map((heart) => (
          <motion.span
            key={heart.id}
            className="floating-heart"
            initial={{ opacity: 0, scale: 0.5, left: `${heart.x}%`, top: `${heart.y}%` }}
            animate={{ opacity: 1, scale: 1.2, y: -70, rotate: (heart.id % 2 === 0 ? 18 : -18) }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.9 }}
          >
            {heart.label}
          </motion.span>
        ))}
      </AnimatePresence>
      <button onClick={createHearts} className="compliment-button" type="button">
        Compliment fox <Heart size={15} />
      </button>
      <div className="love-counter">{compliments} compliments collected</div>
    </div>
  );
}

function DogMascotCard() {
  const [happy, setHappy] = useState(74);
  return (
    <div className="dog-stage">
      <div className="dog-sun" />
      <div className="dog-avatar" aria-hidden="true">🐶</div>
      <div className="dog-bowl">🥣</div>
      <button type="button" onClick={() => setHappy((value) => Math.min(100, value + 6))} className="stage-button amber-button">
        Give treat <Plus size={15} />
      </button>
      <div className="stage-meter">
        <span>Happy tail meter</span>
        <strong>{happy}%</strong>
        <div><i style={{ width: `${happy}%` }} /></div>
      </div>
    </div>
  );
}

function FitnessPulseCard() {
  const [energy, setEnergy] = useState(68);
  return (
    <div className="fitness-stage">
      <div className="pulse-ring" />
      <div className="fitness-avatar" aria-hidden="true">🏃‍♀️</div>
      <button type="button" onClick={() => setEnergy((value) => Math.min(100, value + 8))} className="stage-button fitness-button">
        Complete set <DumbbellIcon />
      </button>
      <div className="stage-meter dark-meter">
        <span>Training energy</span>
        <strong>{energy}%</strong>
        <div><i style={{ width: `${energy}%` }} /></div>
      </div>
    </div>
  );
}

function DumbbellIcon() {
  return <span aria-hidden="true" className="text-sm">🏋️</span>;
}

function RetailAnalyticsCard() {
  return (
    <div className="retail-stage">
      <div className="retail-grid" aria-hidden="true" />
      <div className="retail-terminal">
        <p>SELECT region, revenue</p>
        <p>FROM retail_sales</p>
        <p>WHERE channel = &apos;remote&apos;;</p>
      </div>
      <div className="retail-mini-chart" aria-label="Retail KPI mini chart">
        {retailBars.map((bar) => <i key={bar.region} style={{ height: `${bar.value}%` }} title={bar.region} />)}
      </div>
    </div>
  );
}

function LoveTrackerApp() {
  const [selected, setSelected] = useState(lovePrompts[0]);
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Live demo interaction</p>
      <h3 className="font-display text-2xl font-bold tracking-tight">Compliment garden</h3>
      <p className="text-sm text-muted-foreground mt-2">Choose a compliment and the tracker turns it into a memory card.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        {lovePrompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => setSelected(prompt)} className={`rounded-2xl p-4 text-left border transition ${selected === prompt ? 'bg-rose-100 border-rose-300 text-rose-950' : 'bg-white/70 border-white hover:bg-rose-50'}`}>
            <span className="text-lg">💌</span>
            <span className="block font-semibold mt-2">{prompt}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-3xl bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 p-5">
        <p className="text-sm font-semibold text-rose-800">Today’s memory</p>
        <p className="font-display text-xl font-bold mt-1">“{selected}.”</p>
      </div>
    </div>
  );
}

function DogDashboardApp() {
  const [done, setDone] = useState<string[]>(['Breakfast']);
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-amber-700 mb-2">Live demo interaction</p>
      <h3 className="font-display text-2xl font-bold tracking-tight">Puppy care checklist</h3>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        {dogTasks.map((task) => {
          const active = done.includes(task);
          return (
            <button key={task} type="button" onClick={() => setDone((items) => active ? items.filter((item) => item !== task) : [...items, task])} className={`rounded-2xl p-4 text-left border transition ${active ? 'bg-amber-100 border-amber-300' : 'bg-white/75 border-white hover:bg-amber-50'}`}>
              <span className="text-2xl">{active ? '✅' : '🐾'}</span>
              <span className="block font-semibold mt-2">{task}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Completed {done.length} of {dogTasks.length} care moments today.</p>
    </div>
  );
}

function FitnessTrackerApp() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-emerald-700 mb-2">Live demo interaction</p>
      <h3 className="font-display text-2xl font-bold tracking-tight">Weekly training lanes</h3>
      <div className="space-y-4 mt-5">
        {workoutPlan.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm font-semibold mb-1"><span>{item.name}</span><span>{item.value}%</span></div>
            <div className="h-4 rounded-full bg-white/80 overflow-hidden border border-white">
              <motion.div className={`h-full rounded-full ${item.color}`} initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetailDashboardApp() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-sky-700 mb-2">Live demo interaction</p>
      <h3 className="font-display text-2xl font-bold tracking-tight">Regional KPI snapshot</h3>
      <div className="mt-5 h-64 rounded-3xl bg-slate-950 p-5 flex items-end gap-4 border border-sky-200 shadow-inner">
        {retailBars.map((bar) => (
          <div key={bar.region} className="flex-1 h-full flex flex-col justify-end gap-2">
            <motion.div className="rounded-t-2xl bg-gradient-to-t from-sky-500 to-fuchsia-400 shadow-[0_0_22px_rgba(56,189,248,0.45)]" initial={{ height: 0 }} whileInView={{ height: `${bar.value}%` }} viewport={{ once: true }} transition={{ duration: 0.75 }} />
            <span className="text-[11px] text-sky-100 text-center">{bar.region}</span>
          </div>
        ))}
      </div>
    </div>
  );
}