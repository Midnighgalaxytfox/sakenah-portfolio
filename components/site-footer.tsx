import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import { BRANDING } from '@/lib/branding';

export function SiteFooter() {
  return (
    <footer className="mt-24 py-10 border-t border-border/60 bg-secondary/40 backdrop-blur">
      <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {BRANDING.name}. Crafted with care under the cherry blossoms.</p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-1.5 hover:text-primary transition"><Mail size={14} /> Contact</Link>
          <span className="inline-flex items-center gap-1.5"><Linkedin size={14} /> LinkedIn: sakenah-aboharb</span>
        </div>
      </div>
    </footer>
  );
}
