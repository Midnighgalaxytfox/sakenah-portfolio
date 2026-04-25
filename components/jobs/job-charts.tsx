'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

type Job = {
  id: string;
  title: string;
  company: string;
  tags: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  track: 'frontend' | 'data' | 'other';
  location: string;
  jobType: string | null;
};

const COLORS = ['#FF6FA6', '#FF9149', '#A19AD3', '#60B5FF', '#80D8C3', '#FF9898'];

export function JobCharts({ jobs }: { jobs: Job[] }) {
  // 1) Track breakdown
  const trackData = useMemo(() => {
    const counts: Record<string, number> = { 'Front-end': 0, 'Data': 0, 'Other': 0 };
    for (const j of jobs ?? []) {
      if (j?.track === 'frontend') counts['Front-end']++;
      else if (j?.track === 'data') counts['Data']++;
      else counts['Other']++;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  // 2) Top skills
  const skillData = useMemo(() => {
    const allowed = new Set([
      'react','javascript','typescript','html','css','vue','angular','next','tailwind','node','nodejs','redux',
      'sql','python','tableau','powerbi','power-bi','pandas','numpy','excel','analytics','aws','gcp','azure','r',
    ]);
    const counts: Record<string, number> = {};
    for (const j of jobs ?? []) {
      for (const t of j?.tags ?? []) {
        const k = (t ?? '').toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
        if (!k) continue;
        if (allowed.has(k)) counts[k] = (counts[k] ?? 0) + 1;
      }
    }
    const display: Record<string, string> = {
      react: 'React', javascript: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS',
      vue: 'Vue', angular: 'Angular', next: 'Next.js', tailwind: 'Tailwind', node: 'Node',
      nodejs: 'Node.js', redux: 'Redux', sql: 'SQL', python: 'Python', tableau: 'Tableau',
      powerbi: 'Power BI', 'power-bi': 'Power BI', pandas: 'pandas', numpy: 'NumPy', excel: 'Excel',
      analytics: 'Analytics', aws: 'AWS', gcp: 'GCP', azure: 'Azure', r: 'R',
    };
    const rows = Object.entries(counts)
      .map(([k, v]) => ({ skill: display[k] ?? k, count: v }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
    return rows;
  }, [jobs]);

  // 3) Salary buckets
  const salaryData = useMemo(() => {
    const buckets = [
      { label: '<50k', min: 0, max: 49999, count: 0 },
      { label: '50–75k', min: 50000, max: 74999, count: 0 },
      { label: '75–100k', min: 75000, max: 99999, count: 0 },
      { label: '100–125k', min: 100000, max: 124999, count: 0 },
      { label: '125–150k', min: 125000, max: 149999, count: 0 },
      { label: '150k+', min: 150000, max: Number.MAX_SAFE_INTEGER, count: 0 },
    ];
    for (const j of jobs ?? []) {
      const s = j?.salaryMax ?? j?.salaryMin;
      if (!s || s <= 0) continue;
      for (const b of buckets) {
        if (s >= b.min && s <= b.max) { b.count++; break; }
      }
    }
    return buckets.map((b) => ({ bucket: b.label, jobs: b.count }));
  }, [jobs]);

  return (
    <div className="grid lg:grid-cols-3 gap-3">
      <ChartCard title="Roles by track" description="How this week’s listings split across the categories I target.">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10 }} />
            <Pie data={trackData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={72} paddingAngle={3}>
              {trackData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top in-demand skills" description="Most frequent tags across the current listings.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={skillData} layout="vertical" margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
            <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
            <XAxis type="number" tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis type="category" dataKey="skill" tickLine={false} tick={{ fontSize: 10 }} width={70} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10 }} />
            <Bar dataKey="count" fill="#FF6FA6" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Salary distribution" description="Posted-salary roles, bucketed by top of range.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salaryData} margin={{ top: 8, right: 12, left: 8, bottom: 24 }}>
            <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
            <XAxis dataKey="bucket" tickLine={false} tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={40} />
            <YAxis tickLine={false} tick={{ fontSize: 10 }} allowDecimals={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 10 }} />
            <Bar dataKey="jobs" fill="#FF9149" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="mb-2">
        <h3 className="font-display font-bold text-base tracking-tight">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="h-56 w-full">{children}</div>
    </div>
  );
}
