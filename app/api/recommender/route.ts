import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

type StatsPayload = {
  quizStats?: Record<string, { correct: number; total: number }>;
  xp?: number;
  level?: number;
  answered?: number;
  correct?: number;
};

function buildPrompt(p: StatsPayload): string {
  const stats = p?.quizStats ?? {};
  const frontend = stats?.frontend ?? { correct: 0, total: 0 };
  const data = stats?.data ?? { correct: 0, total: 0 };
  const frontPct = frontend.total > 0 ? Math.round((frontend.correct / frontend.total) * 100) : 0;
  const dataPct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
  const answered = p?.answered ?? (frontend.total + data.total);
  const correct = p?.correct ?? (frontend.correct + data.correct);

  return `You are a warm but rigorous career coach for Sakenah Aboharb, a recent computer science student who is both a Front-End Developer and a Data Analyst, looking for REMOTE roles in the US/Canada.

Here are quiz results from her interactive portfolio:
- Total answered: ${answered}
- Total correct: ${correct}
- Current XP: ${p?.xp ?? 0}, Level: ${p?.level ?? 1}
- Front-end accuracy: ${frontend.correct}/${frontend.total} (${frontPct}%)
- Data & analytics accuracy: ${data.correct}/${data.total} (${dataPct}%)

Produce a PERSONALIZED career plan in concise, friendly Markdown. Use second person ("you"). Match tone to her strongest side (front-end vs. data vs. balanced) and be honest about gaps. Structure your response EXACTLY as these sections with H2 headings:

## Your Profile Snapshot
One short paragraph identifying whether she leans front-end, data, or hybrid. Reference the actual percentages.

## Recommended Career Path
Bullet the top 2–3 job titles to target (be specific, e.g. "Junior Front-End Developer", "React Developer", "Junior Data Analyst", "BI Analyst", "Analytics Engineer"). Explain in one sentence each why it fits.

## Skills to Sharpen Next
4–6 concrete, specific skill/topic suggestions tailored to her weaker category. No generic advice.

## Suggested Search Terms
4–6 exact search queries she can paste into Remotive, LinkedIn, or We Work Remotely.

## Learning Resources
3–4 respected free/affordable resources (Codecademy, freeCodeCamp, StrataScratch, Kaggle, Mode Analytics SQL tutorial, Frontend Mentor, Scrimba React, Fullstackopen.com). Give a one-line reason each.

## Next 7 Days Plan
A realistic, encouraging 7-day checklist — one bullet per day.

Keep the entire response under 550 words. No preamble, no closing sign-off — start directly with the first "## Your Profile Snapshot" heading.`;
}

export async function POST(req: NextRequest) {
  let payload: StatsPayload = {};
  try {
    payload = (await req.json()) as StatsPayload;
  } catch {}

  const apiKey = process.env.ABACUSAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'LLM API key not configured on server.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  const prompt = buildPrompt(payload);

  const upstream = await fetch('https://apps.abacus.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4-mini',
      stream: true,
      max_tokens: 1400,
      messages: [
        { role: 'system', content: 'You are a concise, honest, encouraging career coach specializing in remote tech roles for early-career developers and analysts.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    return new Response(JSON.stringify({ error: `LLM request failed (${upstream.status}): ${text.slice(0, 200)}` }), {
      status: 502, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Pipe through streaming SSE from upstream to client unchanged.
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const encoder = new TextEncoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
      } catch (e) {
        console.error('stream pipe error', e);
        controller.error(e);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
