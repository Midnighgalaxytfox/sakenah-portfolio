'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Loader2, AlertTriangle, Briefcase, Globe, DollarSign, ExternalLink, Building2, CalendarDays, MapPin, Filter, RefreshCcw, Code2, Database } from 'lucide-react';
import { toast } from 'sonner';

const JobCharts = dynamic(() => import('./job-charts').then((m) => m.JobCharts), {
  ssr: false,
  loading: () => <div className="glass-panel rounded-2xl p-6 text-sm text-muted-foreground">Loading charts…</div>,
});

type Job = {
  id: string;
  url: string;
  title: string;
  company: string;
  logo: string | null;
  category: string;
  jobType: string | null;
  publishedAt: string;
  location: string;
  salaryRaw: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  tags: string[];
  track: 'frontend' | 'data' | 'other';
  usCanadaFriendly: boolean;
};

export function JobDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [track, setTrack] = useState<'all' | 'frontend' | 'data'>('all');
  const [jobType, setJobType] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | 'us-canada' | 'worldwide'>('all');
  const [minSalary, setMinSalary] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  const loadJobs = async (refresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/jobs', { cache: refresh ? 'no-store' : 'default' });
      if (!res.ok) throw new Error('Bad response');
      const data = await res.json();
      setJobs(Array.isArray(data?.jobs) ? data.jobs : []);
      setFetchedAt(data?.fetchedAt ?? null);
      if (refresh) toast.success(`Fetched ${data?.jobs?.length ?? 0} jobs`);
    } catch (e) {
      setError('Unable to reach the jobs service right now. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadJobs(false); }, []);

  const jobTypes = useMemo(() => {
    const s = new Set<string>();
    for (const j of jobs ?? []) if (j?.jobType) s.add(j.jobType);
    return ['all', ...Array.from(s).sort()];
  }, [jobs]);

  const filtered = useMemo(() => {
    return (jobs ?? []).filter((j) => {
      if (track !== 'all' && j.track !== track) return false;
      if (jobType !== 'all' && j.jobType !== jobType) return false;
      if (locationFilter === 'us-canada' && !j.usCanadaFriendly) return false;
      if (locationFilter === 'worldwide' && !/worldwide|anywhere/i.test(j.location ?? '')) return false;
      if (minSalary > 0) {
        const max = j.salaryMax ?? 0;
        if (max < minSalary) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${j.title} ${j.company} ${(j.tags ?? []).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, track, jobType, locationFilter, minSalary, query]);

  const stats = useMemo(() => {
    const source = track === 'all' ? jobs : jobs.filter((j) => j.track === track);
    const frontendCount = jobs.filter((j) => j.track === 'frontend').length;
    const dataCount = jobs.filter((j) => j.track === 'data').length;
    const usCanada = source.filter((j) => j.usCanadaFriendly).length;
    const withSalary = source.filter((j) => j.salaryMax && j.salaryMax > 0);
    const avgMax = withSalary.length
      ? Math.round(withSalary.reduce((a, b) => a + (b.salaryMax ?? 0), 0) / withSalary.length)
      : 0;
    return { total: jobs.length, frontendCount, dataCount, usCanada, avgMax, withSalary: withSalary.length };
  }, [jobs, track]);

  return (
    <div className="flex flex-col gap-6">
      {/* Summary tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Tile label="Live roles" value={`${stats.total}`} icon={Briefcase} />
        <Tile label="Front-end" value={`${stats.frontendCount}`} icon={Code2} accent="pink" />
        <Tile label="Data analyst" value={`${stats.dataCount}`} icon={Database} accent="orange" />
        <Tile label="US / CA friendly" value={`${stats.usCanada}`} icon={Globe} accent="purple" />
      </div>

      {/* Filters */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Filter size={14} className="text-primary" /> Filters
          <button
            onClick={() => loadJobs(true)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium hover:bg-primary/20 transition"
          >
            <RefreshCcw size={12} /> Refresh
          </button>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Track</label>
            <div className="mt-1 flex gap-1 flex-wrap">
              {([
                { k: 'all', label: 'All' },
                { k: 'frontend', label: 'Front-end' },
                { k: 'data', label: 'Data' },
              ] as const).map((t) => (
                <button key={t.k} onClick={() => setTrack(t.k)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${track === t.k ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-primary/15 hover:text-primary'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Location</label>
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
              <option value="all">Any</option>
              <option value="us-canada">US / Canada friendly</option>
              <option value="worldwide">Worldwide</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Job type</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm capitalize">
              {jobTypes.map((t) => (
                <option key={t} value={t}>{t === 'all' ? 'Any' : t.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Min salary ${minSalary.toLocaleString()}</label>
            <input type="range" min={0} max={200000} step={5000} value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="mt-3 w-full accent-primary"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Search</label>
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="react, sql, tableau…"
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        {fetchedAt && (
          <p className="text-xs text-muted-foreground">Data source: Remotive public API · last refreshed {new Date(fetchedAt).toLocaleString()}.</p>
        )}
      </div>

      {/* Charts */}
      {!loading && !error && jobs.length > 0 && (
        <JobCharts jobs={jobs} />
      )}

      {/* Listings */}
      {loading ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <Loader2 className="mx-auto animate-spin text-primary" size={28} />
          <p className="mt-2 text-sm text-muted-foreground">Fetching jobs…</p>
        </div>
      ) : error ? (
        <div className="glass-panel rounded-2xl p-10 text-center">
          <AlertTriangle className="mx-auto text-destructive" size={28} />
          <p className="mt-2 font-medium">{error}</p>
          <button onClick={() => loadJobs(true)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center text-muted-foreground">
          No roles match those filters. Try loosening the salary or location.
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-3">
          {filtered.slice(0, 80).map((j, i) => (
            <motion.a
              key={j.id}
              href={j.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.25, delay: (i % 10) * 0.03 }}
              className="group glass-panel rounded-2xl p-4 flex gap-3 hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-secondary overflow-hidden flex items-center justify-center">
                {j.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={j.logo} alt={`${j.company} logo`} className="w-full h-full object-cover" loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <Building2 size={20} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-base tracking-tight leading-snug line-clamp-2 group-hover:text-primary transition">
                    {j.title}
                  </h3>
                  <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition" />
                </div>
                <div className="text-sm text-foreground/80 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="font-medium">{j.company}</span>
                  {j.track !== 'other' && (
                    <span className={`text-xs font-mono rounded-full px-2 py-0.5 ${j.track === 'frontend' ? 'bg-pink-500/15 text-pink-700 dark:text-pink-300' : 'bg-orange-500/15 text-orange-700 dark:text-orange-300'}`}>
                      {j.track === 'frontend' ? 'Front-end' : 'Data'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1.5">
                  <span className="inline-flex items-center gap-1"><MapPin size={11} /> {j.location || 'Remote'}</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays size={11} /> {new Date(j.publishedAt).toLocaleDateString()}</span>
                  {j.salaryRaw && (
                    <span className="inline-flex items-center gap-1 text-primary font-medium">
                      <DollarSign size={11} /> {j.salaryRaw}
                    </span>
                  )}
                </div>
                {j.tags && j.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {j.tags.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] font-mono rounded-md bg-secondary px-1.5 py-0.5 text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}

function Tile({ label, value, icon: Icon, accent = 'default' }: { label: string; value: string; icon: any; accent?: 'default' | 'pink' | 'orange' | 'purple' }) {
  const palette: Record<string, string> = {
    default: 'bg-primary/10 text-primary',
    pink: 'bg-pink-500/15 text-pink-600 dark:text-pink-300',
    orange: 'bg-orange-500/15 text-orange-600 dark:text-orange-300',
    purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-300',
  };
  return (
    <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${palette[accent] ?? palette.default}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-display font-extrabold text-2xl tracking-tight">{value}</div>
      </div>
    </div>
  );
}
