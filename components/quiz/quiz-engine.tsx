'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Loader2, Sparkles, Trophy } from 'lucide-react';
import { useProgress } from '@/lib/progress-store';
import { toast } from 'sonner';

type Question = {
  id: number;
  slug: string;
  category: string;
  subcategory: string | null;
  difficulty: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanations: Record<string, string>;
  xpReward: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...(arr ?? [])];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizEngine() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [finished, setFinished] = useState(false);

  const addXp = useProgress((s) => s?.addXp);
  const recordAnswer = useProgress((s) => s?.recordAnswer);
  const unlock = useProgress((s) => s?.unlock);
  const xpTotal = useProgress((s) => s?.xp ?? 0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/quiz/questions', { cache: 'no-store' });
        if (!res?.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (!alive) return;
        const list: Question[] = Array.isArray(data?.questions) ? data.questions : [];
        setQuestions(shuffle(list));
      } catch (e: any) {
        if (alive) setError('We could not load the quiz. Please refresh.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const current = useMemo<Question | null>(() => {
    if (!questions || questions.length === 0) return null;
    return questions[index] ?? null;
  }, [questions, index]);

  const total = questions?.length ?? 0;
  const progressPct = total > 0 ? Math.round(((index + (selected !== null ? 1 : 0)) / total) * 100) : 0;

  const onPick = (i: number) => {
    if (selected !== null || !current) return;
    setSelected(i);
    const correct = i === current.correctIndex;
    recordAnswer?.(current.slug, correct, current.category ?? 'general');
    if (correct) {
      addXp?.(current.xpReward ?? 10);
      setSessionCorrect((c) => c + 1);
      setSessionXp((x) => x + (current?.xpReward ?? 10));
      toast.success(`+${current?.xpReward ?? 10} XP`, { icon: '🌸' });

      // Unlockables keyed to milestones
      const newXp = (xpTotal ?? 0) + (current?.xpReward ?? 10);
      if (newXp >= 30) unlock?.('hair:ponytail');
      if (newXp >= 60) unlock?.('outfit:hoodie');
      if (newXp >= 100) unlock?.('accessory:glasses');
      if (newXp >= 150) unlock?.('hair:long');
      if (newXp >= 200) unlock?.('outfit:blazer');
      if (newXp >= 260) unlock?.('accessory:petal-crown');
      if (newXp >= 320) unlock?.('background:sunset');
      if (newXp >= 400) unlock?.('outfit:kimono');
    } else {
      // Small pity XP
      addXp?.(2);
      setSessionXp((x) => x + 2);
    }
  };

  const onNext = () => {
    if (selected === null) return;
    if (index + 1 >= (questions?.length ?? 0)) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const onRestart = () => {
    setQuestions((q) => (q ? shuffle(q) : q));
    setIndex(0);
    setSelected(null);
    setSessionCorrect(0);
    setSessionXp(0);
    setFinished(false);
  };

  if (loading) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center">
        <Loader2 className="mx-auto animate-spin text-primary" size={32} />
        <p className="mt-3 text-muted-foreground">Loading questions…</p>
      </div>
    );
  }
  if (error || !questions || questions.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <p className="text-destructive font-medium">{error ?? 'No questions available.'}</p>
        <Link href="/quiz" className="mt-4 inline-flex rounded-full bg-secondary px-4 py-2 text-sm">Back to quiz hub</Link>
      </div>
    );
  }

  if (finished) {
    const pct = total > 0 ? Math.round((sessionCorrect / total) * 100) : 0;
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto">
          <Trophy size={32} />
        </div>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mt-4">Quiz complete</h2>
        <p className="text-muted-foreground mt-2">You answered <strong>{sessionCorrect}</strong> / {total} correctly ({pct}%) and earned <strong>{sessionXp} XP</strong> this round.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/recommender" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md hover:brightness-110 transition">
            <Sparkles size={16} /> Get my AI career plan
          </Link>
          <Link href="/character" className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-semibold border border-border hover:bg-primary/10 hover:text-primary transition">
            See my avatar
          </Link>
          <button type="button" onClick={onRestart} className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-2.5 text-sm font-semibold border border-border hover:border-accent hover:text-accent transition">
            <RefreshCcw size={14} /> Retake
          </button>
        </div>
      </motion.div>
    );
  }

  const q = current!;
  const isCorrect = selected !== null && selected === q.correctIndex;
  const wrongExp = selected !== null && !isCorrect ? (q?.wrongExplanations?.[String(selected)] ?? '') : '';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
        <span>Question {index + 1} / {total}</span>
        <span className="uppercase tracking-widest">{q?.category} · {q?.subcategory} · {q?.difficulty}</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden" aria-label="progress">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${progressPct}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q?.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="glass-panel rounded-3xl p-6 md:p-8 mt-4"
        >
          <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight">
            {q?.question}
          </h2>

          <div className="mt-5 grid gap-2">
            {q?.options?.map?.((opt, i) => {
              const isPicked = selected === i;
              const isRight = selected !== null && i === q.correctIndex;
              const isWrongPick = selected !== null && isPicked && !isCorrect;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onPick(i)}
                  disabled={selected !== null}
                  className={`text-left w-full rounded-xl px-4 py-3 border-2 text-sm transition flex items-start gap-3 ${
                    isRight
                      ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                      : isWrongPick
                      ? 'border-destructive bg-destructive/10'
                      : isPicked
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card/70 hover:border-primary/50 hover:bg-primary/5'
                  } ${selected !== null ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isRight ? 'bg-emerald-500 text-white' : isWrongPick ? 'bg-destructive text-white' : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {isRight ? <CheckCircle2 size={14} /> : isWrongPick ? <XCircle size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`mt-5 rounded-2xl p-4 border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
                  <div className="flex items-center gap-2 font-semibold">
                    {isCorrect ? (
                      <><CheckCircle2 size={18} className="text-emerald-600" /> Correct — +{q?.xpReward ?? 10} XP</>
                    ) : (
                      <><XCircle size={18} className="text-destructive" /> Not quite — +2 XP for effort</>
                    )}
                  </div>

                  {!isCorrect && wrongExp && (
                    <div className="mt-2 text-sm">
                      <p className="font-semibold text-destructive mb-1">Why that answer misleads:</p>
                      <p className="text-foreground/90 leading-relaxed">{wrongExp}</p>
                    </div>
                  )}

                  <div className="mt-3 text-sm">
                    <p className="font-semibold text-primary mb-1">
                      {isCorrect ? 'Why this answer is correct:' : (
                        <>The correct answer is <span className="font-bold">{q?.options?.[q?.correctIndex] ?? ''}</span></>
                      )}
                    </p>
                    <p className="text-foreground/90 leading-relaxed">{q?.explanation}</p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md hover:brightness-110 transition"
                  >
                    {index + 1 >= total ? 'See results' : 'Next question'} <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
