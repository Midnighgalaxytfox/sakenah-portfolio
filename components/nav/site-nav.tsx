'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, BRANDING } from '@/lib/branding';
import { useProgress } from '@/lib/progress-store';

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const xp = useProgress((s) => s?.xp ?? 0);
  const level = useProgress((s) => s?.level ?? 1);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-40 px-4 pt-3">
      <div className="mx-auto max-w-[1200px]">
        <nav className="glass-panel rounded-full px-3 py-2 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 pl-2 shrink-0" aria-label="Home">
            <span className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm">
              <Image src={BRANDING.logo} alt="Fox under cherry blossom logo" fill sizes="32px" className="object-cover" />
            </span>
            <span className="font-display font-bold tracking-tight text-lg hidden sm:inline">{BRANDING.shortName}</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-2 flex-1">
            {NAV_LINKS?.map?.((l) => {
              const active = pathname === l?.href || (l?.href !== '/' && pathname?.startsWith?.(l?.href));
              return (
                <li key={l?.href}>
                  <Link
                    href={l?.href ?? '/'}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground/80 hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {l?.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            {mounted && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-accent/15 text-accent-foreground border border-accent/30 px-3 py-1.5 text-xs font-mono">
                <span className="text-accent font-bold">Lv {level}</span>
                <span className="opacity-60">·</span>
                <span>{xp} XP</span>
              </div>
            )}
            <button
              className="lg:hidden p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition"
              onClick={() => setOpen?.((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mt-2 glass-panel rounded-2xl p-2 animate-in fade-in slide-in-from-top-2">
            <ul className="flex flex-col">
              {NAV_LINKS?.map?.((l) => {
                const active = pathname === l?.href;
                return (
                  <li key={l?.href}>
                    <Link
                      href={l?.href ?? '/'}
                      className={`block px-4 py-2 rounded-xl text-sm font-medium transition ${
                        active ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                    >
                      {l?.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
