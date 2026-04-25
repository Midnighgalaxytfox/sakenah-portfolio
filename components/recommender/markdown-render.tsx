'use client';

import { useMemo } from 'react';

// Minimal Markdown renderer sufficient for the LLM’s h2/list/bold output.
// Not a full Markdown spec — it keeps us dependency-free and predictable.
export function MarkdownRender({ content }: { content: string }) {
  const html = useMemo(() => toHtml(content ?? ''), [content]);
  return (
    <div
      className="prose-styled text-sm leading-relaxed text-foreground/90"
      // This is LLM-generated but sanitized below to strip HTML tags the model may hallucinate.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(s: string): string {
  // bold **x**, italic *x*, code `x`, links [text](url)
  let out = escapeHtml(s);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-primary hover:underline font-medium">$1<\/a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1<\/strong>');
  out = out.replace(/(^|\s)\*([^*]+)\*(?=\s|$|[.,;:!?])/g, '$1<em>$2<\/em>');
  out = out.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-secondary font-mono text-xs">$1<\/code>');
  return out;
}

function toHtml(md: string): string {
  const lines = (md ?? '').split('\n');
  const out: string[] = [];
  let inUl = false;
  let inOl = false;
  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };
  for (const raw of lines) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim()) { closeLists(); out.push(''); continue; }
    // headings
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    const h1 = line.match(/^#\s+(.*)$/);
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
    if (h2) { closeLists(); out.push(`<h3 class="font-display font-bold text-lg tracking-tight text-primary mt-5 mb-2">${inline(h2[1])}</h3>`); continue; }
    if (h3) { closeLists(); out.push(`<h4 class="font-display font-semibold text-base mt-4 mb-1">${inline(h3[1])}</h4>`); continue; }
    if (h1) { closeLists(); out.push(`<h2 class="font-display font-extrabold text-xl tracking-tight mt-5 mb-2">${inline(h1[1])}</h2>`); continue; }
    if (bullet) {
      if (!inUl) { closeLists(); out.push('<ul class="list-disc pl-5 space-y-1 my-2">'); inUl = true; }
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    if (numbered) {
      if (!inOl) { closeLists(); out.push('<ol class="list-decimal pl-5 space-y-1 my-2">'); inOl = true; }
      out.push(`<li>${inline(numbered[1])}</li>`);
      continue;
    }
    closeLists();
    out.push(`<p class="my-2">${inline(line)}</p>`);
  }
  closeLists();
  return out.join('\n');
}
