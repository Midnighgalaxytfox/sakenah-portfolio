'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/lib/progress-store';
import { Sparkles, Loader2, Wand2, RotateCcw } from 'lucide-react';
import { MarkdownRender } from './markdown-render';
import { toast } from 'sonner';

export function RecommenderPanel() {
  const stats = useProgress((s) => s?.quizStats ?? {});
  const xp = useProgress((s) => s?.xp ?? 0);
  const level = useProgress((s) => s?.level ?? 1);
  const answered = useProgress((s) => (s?.answeredSlugs ?? []).length);
  const correct = useProgress((s) => (s?.correctSlugs ?? []).length);
  const addXp = useProgress((s) => s?.addXp);
  const unlock = useProgress((s) => s?.unlock);

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => setMounted(true), []);

  const summary = useMemo(() => {
    const fe = stats?.frontend ?? { correct: 0, total: 0 };
    const da = stats?.data ?? { correct: 0, total: 0 };
    return {
      feCorrect: fe.correct ?? 0, feTotal: fe.total ?? 0,
      daCorrect: da.correct ?? 0, daTotal: da.total ?? 0,
    };
  }, [stats]);

  const generate = async () => {
    if (loading) return;
    if (answered < 3) {
      toast('Answer at least 3 quiz questions first for a useful plan.', { icon: '🌸' });
      return;
    }
    abortRef.current?.abort?.();
    const controller = new AbortController();
    abortRef.current = controller;
    setText('');
    setLoading(true);
    try {
      const res = await fetch('/api/recommender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizStats: stats, xp, level, answered, correct }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? 'Server error');
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const raw of lines) {
          const line = raw.trim();
          if (!line || !line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (payload === '[DONE]') continue;
          try {
            const parsed = JSON.parse(payload);
            const delta = parsed?.choices?.[0]?.delta?.content ?? '';
            if (delta) setText((t) => t + delta);
          } catch {
            // ignore partials
          }
        }
      }
      if (!hasGenerated) {
        addXp?.(25);
        unlock?.('accessory:laptop');
        unlock?.('background:library');
        toast.success('+25 XP for consulting the coach!', { icon: '💼' });
      }
      setHasGenerated(true);
    } catch (e: any) {
      if (e?.name !== 'AbortError') toast.error(e?.message ?? 'Could not reach the coach.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setHasGenerated(false);
  };

  return (
    <div className="grid md:grid-cols-[0.9fr_1.6fr] gap-5">
      <aside className="glass-panel rounded-2xl p-5 h-max">
        <h2 className="font-display font-bold text-lg tracking-tight">Your input</h2>
        {mounted ? (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Questions answered</span><strong>{answered}</strong></div>
            <div className="flex justify-between"><span>Total correct</span><strong>{correct}</strong></div>
            <div className="flex justify-between"><span>XP · Level</span><strong>{xp} · L{level}</strong></div>
            <div className="border-t border-border/60 pt-2 mt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Front-end</div>
              <div className="flex justify-between"><span>Correct</span><strong>{summary.feCorrect} / {summary.feTotal}</strong></div>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Data & analytics</div>
              <div className="flex justify-between"><span>Correct</span><strong>{summary.daCorrect} / {summary.daTotal}</strong></div>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              No personal info is sent — only these counts reach the language model.
            </p>
          </div>
        ) : (
          <div className="h-32 animate-pulse bg-secondary rounded-xl mt-3" />
        )}
        <button
          onClick={generate}
          disabled={loading}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-md hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {loading ? 'Thinking…' : hasGenerated ? 'Regenerate plan' : 'Generate my plan'}
        </button>
        {hasGenerated && !loading && (
          <button
            onClick={handleReset}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-xs font-medium hover:bg-primary/10 hover:text-primary transition"
          >
            <RotateCcw size={12} /> Clear
          </button>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Want better advice?{' '}
          <Link href="/quiz" className="text-primary hover:underline font-medium">Answer more questions →</Link>
        </p>
      </aside>

      <section className="glass-panel rounded-2xl p-6 min-h-[300px]">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-primary" />
          <h2 className="font-display font-bold text-lg tracking-tight">Personalized plan</h2>
          {loading && <span className="ml-auto text-xs text-muted-foreground font-mono">streaming…</span>}
        </div>
        {text ? (
          <MarkdownRender content={text} />
        ) : (
          <div className="text-sm text-muted-foreground">
            {loading
              ? 'Warming up the blossoms…'
              : 'Answer a few quiz questions then hit “Generate my plan”. The coach will stream a tailored response here.'}
          </div>
        )}
      </section>
    </div>
  );
}
