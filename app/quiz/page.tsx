import Link from 'next/link';
import { BrainCircuit, Code2, Database, Trophy, Zap, Sparkles } from 'lucide-react';
import { QuizProgressPanel } from '@/components/quiz/quiz-progress-panel';

export const metadata = { title: 'Skill Quiz' };

export default function QuizHubPage() {
  return (
    <div>
      <section className="container-page pt-10 pb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Skill Quiz</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-3xl">
          Put my craft to the <span className="accent-word">test</span>.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
          A short, honest quiz covering front-end development and data analytics. Each answer comes with a
          teaching moment: why the right answer is right, and why the tempting wrong ones look tempting. Earn XP toward your avatar as you go.
        </p>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <div className="glass-panel rounded-2xl p-4">
            <Code2 size={18} className="text-primary mb-2" />
            <div className="font-semibold">Front-end</div>
            <div className="text-xs text-muted-foreground">React, JavaScript, CSS, a11y, REST</div>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <Database size={18} className="text-primary mb-2" />
            <div className="font-semibold">Data & analytics</div>
            <div className="text-xs text-muted-foreground">SQL, Python, viz, statistics</div>
          </div>
          <div className="glass-panel rounded-2xl p-4">
            <Trophy size={18} className="text-primary mb-2" />
            <div className="font-semibold">XP rewards</div>
            <div className="text-xs text-muted-foreground">Earn 10–20 XP per correct answer</div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz/start"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition"
          >
            <BrainCircuit size={16} /> Start the quiz
          </Link>
          <Link
            href="/recommender"
            className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-semibold border border-border hover:bg-primary/10 hover:text-primary transition"
          >
            <Sparkles size={16} /> Jump to AI coach
          </Link>
          <Link
            href="/character"
            className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-2.5 text-sm font-semibold border border-border hover:border-accent hover:text-accent transition"
          >
            <Zap size={16} /> View avatar
          </Link>
        </div>
      </section>

      <section className="container-page py-8">
        <QuizProgressPanel />
      </section>
    </div>
  );
}
