'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { MarkdownRender } from '@/components/recommender/markdown-render';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

const starterQuestions = [
  'What are Sakenah’s strongest skills?',
  'Which project should a recruiter view first?',
  'Explain the Retail Data Dashboard.',
];

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Hi, I’m Sakura — Sakenah’s site-only AI assistant. Ask me about her projects, skills, experience, education, job goals, quiz, avatar system, or where to find something on this portfolio.',
};

export function SiteChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const ask = async (question?: string) => {
    const content = (question ?? input).trim();
    if (!content || loading) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', content };
    const assistantId = `assistant-${Date.now()}`;
    const nextMessages = [...messages, userMessage, { id: assistantId, role: 'assistant' as const, content: '' }];

    setMessages(nextMessages);
    setInput('');
    setOpen(true);
    setLoading(true);

    try {
      const res = await fetch('/api/site-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.content.trim())
            .map((message) => ({ role: message.role, content: message.content })),
        }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? 'The site assistant could not respond right now.');
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
            if (delta) {
              setMessages((current) =>
                current.map((message) =>
                  message.id === assistantId ? { ...message, content: message.content + delta } : message
                )
              );
            }
          } catch {
            // Ignore partial SSE chunks until the next complete line arrives.
          }
        }
      }
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: error?.message ?? 'Something went wrong while answering.' }
              : message
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask();
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 print:hidden">
      {open && (
        <section className="w-[min(calc(100vw-2rem),420px)] overflow-hidden rounded-3xl border border-border/70 bg-card/95 shadow-[0_22px_70px_rgba(120,55,80,0.25)] backdrop-blur-xl">
          <header className="flex items-center justify-between gap-3 border-b border-border/70 bg-gradient-to-r from-primary/12 to-accent/12 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="font-display font-bold tracking-tight">Sakura site assistant</h2>
                <p className="text-xs text-muted-foreground">Answers only about this portfolio</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-secondary p-2 text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
              aria-label="Close site assistant"
            >
              <X size={16} />
            </button>
          </header>

          <div className="max-h-[430px] space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`rounded-2xl p-3 text-sm ${
                  message.role === 'user'
                    ? 'ml-8 bg-primary text-primary-foreground'
                    : 'mr-8 bg-secondary/80 text-secondary-foreground border border-border/60'
                }`}
              >
                {message.content ? (
                  message.role === 'assistant' ? <MarkdownRender content={message.content} /> : <p className="leading-relaxed">{message.content}</p>
                ) : (
                  <span className="inline-flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Thinking…</span>
                )}
              </article>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border/70 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  disabled={loading}
                  className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:opacity-60"
                >
                  {question}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Sakenah’s site…"
                className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-label="Ask the site assistant"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                <span className="sr-only">Send</span>
              </button>
            </form>
            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Sparkles size={12} /> Updates from the same central site data whenever the portfolio is changed.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-[0_14px_38px_rgba(219,39,119,0.35)] transition hover:-translate-y-0.5 hover:brightness-110"
        aria-label={open ? 'Hide site assistant' : 'Open site assistant'}
      >
        <MessageCircle size={19} className="transition group-hover:scale-110" />
        Ask Sakura
      </button>
    </div>
  );
}
