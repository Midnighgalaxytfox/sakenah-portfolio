import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Public Remotive API (no auth, JSON). We server-fetch to avoid CORS/rate issues,
// then normalize into a consistent shape the UI can render.
type RemotiveJob = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string;
  category: string;
  job_type?: string;
  publication_date: string;
  candidate_required_location: string;
  salary?: string;
  tags?: string[];
};

export type NormalizedJob = {
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

function parseSalary(raw: string | undefined | null): { min: number | null; max: number | null } {
  if (!raw) return { min: null, max: null };
  // Strip non-numeric except digits, k, and separators
  const s = raw.replace(/,/g, '').toLowerCase();
  const nums = s.match(/\d+(?:\.\d+)?/g);
  if (!nums || nums.length === 0) return { min: null, max: null };
  const vals = nums.map((n) => {
    const asNum = parseFloat(n);
    // detect the 'k' shorthand near this number
    return asNum < 1000 ? asNum * 1000 : asNum;
  });
  if (vals.length === 1) return { min: vals[0], max: vals[0] };
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

function inferTrack(title: string, category: string, tags: string[]): 'frontend' | 'data' | 'other' {
  const t = `${title} ${category} ${(tags ?? []).join(' ')}`.toLowerCase();
  if (/(front.?end|react|vue|angular|ui engineer|javascript engineer|web developer)/.test(t)) return 'frontend';
  if (/(data analyst|business intelligence|bi analyst|data scientist|analytics|sql|tableau|power ?bi|data engineer)/.test(t)) return 'data';
  return 'other';
}

function isUsCanadaFriendly(location: string): boolean {
  const l = (location ?? '').toLowerCase();
  if (!l) return false;
  if (/(usa|u\.s\.a\.|united states|us only|americas|canada|north america|worldwide|anywhere|remote)/.test(l)) return true;
  return false;
}

async function fetchRemotive(search: string): Promise<RemotiveJob[]> {
  const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(search)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'sakenah-portfolio/1.0 (contact: sakenahaboharb4it@gmail.com)' },
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Remotive responded ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.jobs) ? (data.jobs as RemotiveJob[]) : [];
}

function normalize(j: RemotiveJob): NormalizedJob {
  const sal = parseSalary(j?.salary ?? null);
  const tags = Array.isArray(j?.tags) ? j.tags : [];
  return {
    id: String(j?.id),
    url: j?.url ?? '#',
    title: j?.title ?? 'Untitled role',
    company: j?.company_name ?? 'Unknown company',
    logo: j?.company_logo ?? null,
    category: j?.category ?? 'General',
    jobType: j?.job_type ?? null,
    publishedAt: j?.publication_date ?? new Date().toISOString(),
    location: j?.candidate_required_location ?? 'Remote',
    salaryRaw: j?.salary ?? null,
    salaryMin: sal.min,
    salaryMax: sal.max,
    tags,
    track: inferTrack(j?.title ?? '', j?.category ?? '', tags),
    usCanadaFriendly: isUsCanadaFriendly(j?.candidate_required_location ?? ''),
  };
}

export async function GET() {
  try {
    const [frontend, data] = await Promise.all([
      fetchRemotive('front end developer').catch(() => [] as RemotiveJob[]),
      fetchRemotive('data analyst').catch(() => [] as RemotiveJob[]),
    ]);
    const merged = new Map<number, RemotiveJob>();
    for (const j of [...(frontend ?? []), ...(data ?? [])]) {
      if (j?.id !== undefined) merged.set(j.id, j);
    }
    const normalized = Array.from(merged.values()).map(normalize);
    // Sort newest first
    normalized.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return NextResponse.json({
      source: 'remotive.com (public API)',
      fetchedAt: new Date().toISOString(),
      count: normalized.length,
      jobs: normalized,
    });
  } catch (e: any) {
    console.error('jobs API error', e);
    return NextResponse.json({ error: 'Failed to fetch live jobs. Remotive may be rate-limiting.' }, { status: 502 });
  }
}
