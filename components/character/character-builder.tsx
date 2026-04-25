'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Check, Sparkles, Shirt, Palette, Scissors, Smile, Gift, Trees, Download } from 'lucide-react';
import { useProgress } from '@/lib/progress-store';
import { CATALOG, SLOT_META, SLOT_ORDER, getBySlot, type Slot } from '@/lib/character-catalog';
import { CharacterSvg } from './character-svg';
import { toast } from 'sonner';

const SLOT_ICONS: Record<Slot, any> = {
  skin: Palette,
  hair: Scissors,
  hairColor: Palette,
  outfit: Shirt,
  accessory: Gift,
  background: Trees,
  expression: Smile,
};

export function CharacterBuilder() {
  const xp = useProgress((s) => s?.xp ?? 0);
  const level = useProgress((s) => s?.level ?? 1);
  const unlocked = useProgress((s) => s?.unlocked ?? []);
  const character = useProgress((s) => s?.character);
  const equip = useProgress((s) => s?.equip);
  const unlock = useProgress((s) => s?.unlock);
  const addXp = useProgress((s) => s?.addXp);
  const [activeSlot, setActiveSlot] = useState<Slot>('outfit');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Auto-unlock anything whose XP threshold has been met (keeps state fresh
  // even if the user’s xp grew while viewing other pages).
  useEffect(() => {
    if (!mounted) return;
    for (const item of CATALOG) {
      if ((item?.unlockXp ?? 0) <= (xp ?? 0) && !unlocked.includes(item.id)) {
        unlock?.(item.id);
      }
    }
  }, [xp, unlocked, mounted, unlock]);

  const nextUnlock = useMemo(() => {
    const locked = CATALOG.filter((i) => !unlocked.includes(i.id) && (i?.unlockXp ?? 0) > 0);
    return locked.sort((a, b) => a.unlockXp - b.unlockXp)[0];
  }, [unlocked]);

  const progressToNext = nextUnlock
    ? Math.min(100, Math.round(((xp ?? 0) / nextUnlock.unlockXp) * 100))
    : 100;

  if (!mounted || !character) {
    return <div className="glass-panel rounded-2xl p-12 animate-pulse h-96" aria-hidden />;
  }

  const onTry = (slot: Slot, id: string) => {
    if (!unlocked.includes(id)) {
      const item = CATALOG.find((c) => c.id === id);
      toast(`Locked — needs ${item?.unlockXp ?? 0} XP`, { icon: '🔒' });
      return;
    }
    equip?.(slot, id);
  };

  const onCelebrate = () => {
    addXp?.(5);
    toast.success('+5 XP — looking good!', { icon: '✨' });
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-5">
      {/* Preview */}
      <div className="glass-panel rounded-3xl p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl tracking-tight">Preview</h2>
            <p className="text-xs text-muted-foreground">Saved automatically to this browser.</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Level</div>
            <div className="font-display font-extrabold text-2xl text-primary leading-none">{level}</div>
          </div>
        </div>

        <div className="relative mx-auto my-4">
          <motion.div
            key={JSON.stringify(character)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <CharacterSvg character={character} size={280} />
          </motion.div>
        </div>

        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
          XP toward next unlock
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressToNext}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{xp} XP</span>
          {nextUnlock ? (
            <span>Next: <strong className="text-primary">{nextUnlock.label}</strong> @ {nextUnlock.unlockXp} XP</span>
          ) : (
            <span>All items unlocked 🎊</span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/quiz" className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow hover:brightness-110 transition">
            <Sparkles size={12} /> Earn XP via quiz
          </Link>
          <button onClick={onCelebrate} className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground px-4 py-2 text-xs font-medium hover:bg-primary/15 hover:text-primary transition">
            <Download size={12} /> +5 XP for styling
          </button>
        </div>
      </div>

      {/* Slot tabs + items */}
      <div className="glass-panel rounded-3xl p-5 flex flex-col">
        <div className="flex flex-wrap gap-1 mb-4">
          {SLOT_ORDER.map((s) => {
            const Icon = SLOT_ICONS[s];
            const active = activeSlot === s;
            return (
              <button
                key={s}
                onClick={() => setActiveSlot(s)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? 'bg-primary text-primary-foreground shadow' : 'bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary'}`}
              >
                <Icon size={12} /> {SLOT_META[s].label}
              </button>
            );
          })}
        </div>

        <h3 className="font-display font-bold text-lg tracking-tight">{SLOT_META[activeSlot].label}</h3>
        <p className="text-xs text-muted-foreground mb-3">{SLOT_META[activeSlot].description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {getBySlot(activeSlot).map((item) => {
            const isUnlocked = unlocked.includes(item.id);
            const isEquipped = character[activeSlot] === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTry(activeSlot, item.id)}
                className={`relative text-left rounded-2xl p-3 border-2 transition ${
                  isEquipped
                    ? 'border-primary bg-primary/5 shadow-md'
                    : isUnlocked
                    ? 'border-border bg-card/70 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md'
                    : 'border-border bg-muted/30 opacity-70 cursor-not-allowed'
                }`}
                disabled={!isUnlocked && !isEquipped}
                aria-pressed={isEquipped}
              >
                <div className="flex items-center gap-2">
                  {item.color ? (
                    <span className="inline-block w-6 h-6 rounded-full border border-border" style={{ background: item.color }} />
                  ) : item.icon ? (
                    <span className="text-xl" aria-hidden>{item.icon}</span>
                  ) : (
                    <span className="inline-block w-6 h-6 rounded bg-secondary" />
                  )}
                  <span className="font-semibold text-sm truncate">{item.label}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-muted-foreground">{item.unlockXp > 0 ? `${item.unlockXp} XP` : 'starter'}</span>
                  {isEquipped ? (
                    <span className="inline-flex items-center gap-1 text-primary font-semibold"><Check size={11} /> wearing</span>
                  ) : isUnlocked ? (
                    <span className="text-primary font-semibold">Try on</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-muted-foreground"><Lock size={10} /> locked</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          Tip: the <Link href="/quiz" className="text-primary hover:underline font-medium">skill quiz</Link> gives 10–20 XP per correct answer, and generating an <Link href="/recommender" className="text-primary hover:underline font-medium">AI career plan</Link> unlocks two bonus items at once.
        </div>
      </div>
    </div>
  );
}
