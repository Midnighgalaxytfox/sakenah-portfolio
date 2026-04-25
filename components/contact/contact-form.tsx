'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm?.((f) => ({ ...(f ?? {}), [e?.target?.name ?? '']: e?.target?.value ?? '' } as any));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    if (!form?.name || !form?.email || !form?.message) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form ?? {}),
      });
      if (!res?.ok) throw new Error('Request failed');
      setSent(true);
      toast.success('Message saved — Sakenah will be in touch soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Could not send message. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="glass-panel rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="font-display font-bold text-2xl mt-4">Message received</h3>
        <p className="text-muted-foreground mt-2">Thanks for reaching out. I’ll reply within a business day.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Your name</span>
          <input
            name="name"
            value={form?.name ?? ''}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Jane Recruiter"
          />
        </label>
        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Email</span>
          <input
            name="email"
            type="email"
            value={form?.email ?? ''}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="jane@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Subject</span>
        <input
          name="subject"
          value={form?.subject ?? ''}
          onChange={onChange}
          className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Role opportunity at Acme Co."
        />
      </label>
      <label className="block">
        <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Message</span>
        <textarea
          name="message"
          value={form?.message ?? ''}
          onChange={onChange}
          required
          rows={6}
          className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          placeholder="Tell me about the role, team, and what you’re optimizing for..."
        />
      </label>
      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <AlertCircle size={12} /> Your info is stored privately. No marketing.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {loading ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
