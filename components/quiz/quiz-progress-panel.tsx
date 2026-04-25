'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/lib/progress-store';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

export function QuizProgressPanel() {
  const xp = useProgress((s) => s?.xp ?? 0);
  const level = useProgress((s) => s?.level ?? 1);
  const answered = useProgress((s) => s?.answeredSlugs ?? []);
  const correct = useProgress((s) => s?.correctSlugs ?? []);
  const stats = useProgress((s) => s?.quizStats ?? {});
  const reset = useProgress((s) => s?.reset);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="glass-panel rounded-2xl p-6 animate-pulse h-48" aria-hidden="true" />;
  }

  const totalAnswered = answered?.length ?? 0;
  const totalCorrect = correct?.length ?? 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display font-bold text-2xl tracking-tight">Your progress</h2>
          <p className="text-sm text-muted-foreground">Saved in your browser — never leaves this device.</p>
        </div>
        <button
          type="button"
          onClick={() => { reset?.(); toast.success('Progress reset. Blank slate!'); }}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-medium hover:bg-destructive/10 hover:text-destructive transition"
        >
          <RefreshCcw size={12} /> Reset progress
        </button>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="Level" value={`${level}`} accent />
        <Stat label="XP" value={`${xp}`} />
        <Stat label="Answered" value={`${totalAnswered}`} />
        <Stat label="Accuracy" value={`${accuracy}%`} />
      </div>

      {Object.keys(stats ?? {}).length > 0 && (
        <div className="mt-5">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">By category</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {Object.entries(stats ?? {}).map(([cat, v]: [string, any]) => {
              const pct = v?.total > 0 ? Math.round(((v?.correct ?? 0) / v.total) * 100) : 0;
              return (
                <div key={cat} className="rounded-xl bg-secondary/50 px-3 py-2 text-sm flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold capitalize">{cat}</div>
                    <div className="text-xs text-muted-foreground">{v?.correct ?? 0} / {v?.total ?? 0} correct</div>
                  </div>
                  <div className="font-mono text-primary font-bold">{pct}%</div>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <Link href="/recommender" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow hover:brightness-110 transition">
              Turn these results into a personalized plan →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl bg-secondary/50 px-4 py-3">
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display font-extrabold text-2xl tracking-tight ${accent ? 'text-primary' : ''}`}>{value}</div>
    </div>
  );
}
