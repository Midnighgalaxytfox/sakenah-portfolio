import { JobDashboard } from '@/components/jobs/job-dashboard';

export const metadata = { title: 'Remote Job Market' };

export default function JobsPage() {
  return (
    <div className="container-page pt-10 pb-16">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Live Job Market</p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-3xl">
        Real remote roles, <span className="accent-word">right now</span>.
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Live listings for remote front-end developer and data analyst roles, pulled straight from the public
        Remotive API. Filter by track, location preference, and pay range — and see what the market looks like at a glance.
      </p>
      <div className="mt-8">
        <JobDashboard />
      </div>
    </div>
  );
}
