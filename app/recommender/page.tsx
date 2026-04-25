import { RecommenderPanel } from '@/components/recommender/recommender-panel';

export const metadata = { title: 'AI Career Coach' };

export default function RecommenderPage() {
  return (
    <div className="container-page pt-10 pb-16">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">AI Career Coach</p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-3xl">
        A plan, <span className="accent-word">shaped by you</span>.
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        This coach reads your quiz performance, then streams a tailored week-one plan in seconds.
        The more questions you answer, the sharper the advice. Your data never leaves the page — only the anonymous stats are sent to the language model.
      </p>
      <div className="mt-8">
        <RecommenderPanel />
      </div>
    </div>
  );
}
