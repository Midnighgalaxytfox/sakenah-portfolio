import { NextRequest } from 'next/server';
import { buildSiteKnowledge, isProbablySiteRelated } from '@/lib/site-knowledge';

export const dynamic = 'force-dynamic';

type ChatMessage = { role?: string; content?: string };

function cleanMessages(messages: ChatMessage[]) {
  return (messages ?? [])
    .filter((message) => message?.role === 'user' || message?.role === 'assistant')
    .map((message) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: String(message.content ?? '').slice(0, 900),
    }))
    .slice(-8);
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid chat request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const clean = cleanMessages(messages);
  const latest = clean.filter((message) => message.role === 'user').at(-1)?.content ?? '';

  if (!latest.trim()) {
    return new Response(JSON.stringify({ error: 'Please ask a question about Sakenah’s portfolio.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isProbablySiteRelated(latest)) {
    return new Response(
      `data: ${JSON.stringify({ choices: [{ delta: { content: 'I can only answer questions related to Sakenah Aboharb’s portfolio website — her projects, skills, experience, job goals, quiz, mini-apps, and site navigation. Please ask me something about the site.' } }] })}\n\ndata: [DONE]\n\n`,
      {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      }
    );
  }

  const apiKey = process.env.ABACUSAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'LLM API key not configured on server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const siteKnowledge = buildSiteKnowledge();
  const upstream = await fetch('https://apps.abacus.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4-mini',
      stream: true,
      max_tokens: 900,
      temperature: 0.35,
      messages: [
        {
          role: 'system',
          content: `You are Sakura, the site-only AI assistant for Sakenah Aboharb's portfolio.\n\nSTRICT SCOPE RULES:\n1. Answer only about Sakenah, this website, her projects, skills, experience, education, contact details, job goals, quiz, job dashboard, career coach, gamification/avatar system, and site navigation.\n2. If the user asks anything outside this site scope, politely refuse in one short sentence and invite a portfolio-related question.\n3. Do not invent facts. If something is not in the site knowledge, say the site does not list that yet.\n4. Keep answers helpful, accurate, recruiter-friendly, and easy to scan.\n5. When useful, point visitors to the correct page path such as /projects/love-tracker, /quiz, /jobs, /recommender, /character, or /contact.\n6. Use the latest site knowledge below as the source of truth.\n\n${siteKnowledge}`,
        },
        ...clean,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    return new Response(JSON.stringify({ error: `Site assistant request failed (${upstream.status}): ${text.slice(0, 200)}` }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
      } catch (error) {
        console.error('site assistant stream error', error);
        controller.error(error);
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
