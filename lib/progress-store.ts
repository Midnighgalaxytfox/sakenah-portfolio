'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Character = {
  skin: string;        // face tone
  hair: string;        // hair style key
  hairColor: string;
  outfit: string;      // outfit key
  accessory: string;   // accessory key
  background: string;  // bg scene key
  expression: string;
};

export type QuizStats = {
  [category: string]: {
    correct: number;
    total: number;
  };
};

type State = {
  xp: number;
  level: number;
  answeredSlugs: string[];
  correctSlugs: string[];
  quizStats: QuizStats;
  unlocked: string[];       // item ids unlocked
  character: Character;
  _hasHydrated: boolean;
  addXp: (amount: number) => void;
  recordAnswer: (slug: string, correct: boolean, category: string) => void;
  unlock: (id: string) => void;
  equip: (slot: keyof Character, id: string) => void;
  reset: () => void;
};

const XP_PER_LEVEL = 100;

function calcLevel(xp: number): number {
  return Math.max(1, Math.floor((xp ?? 0) / XP_PER_LEVEL) + 1);
}

const DEFAULT_CHARACTER: Character = {
  skin: 'peach',
  hair: 'bob',
  hairColor: 'black',
  outfit: 'tee',
  accessory: 'none',
  background: 'dawn',
  expression: 'smile',
};

export const useProgress = create<State>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      answeredSlugs: [],
      correctSlugs: [],
      quizStats: {},
      unlocked: ['skin:peach', 'hair:bob', 'hairColor:black', 'outfit:tee', 'accessory:none', 'background:dawn', 'expression:smile'],
      character: DEFAULT_CHARACTER,
      _hasHydrated: false,

      addXp: (amount) => set((s) => {
        const xp = (s?.xp ?? 0) + (amount ?? 0);
        return { xp, level: calcLevel(xp) };
      }),

      recordAnswer: (slug, correct, category) => set((s) => {
        const answered = new Set(s?.answeredSlugs ?? []);
        const correctSet = new Set(s?.correctSlugs ?? []);
        answered.add(slug);
        if (correct) correctSet.add(slug);
        const stats = { ...(s?.quizStats ?? {}) };
        const key = category ?? 'general';
        const prev = stats?.[key] ?? { correct: 0, total: 0 };
        // Only count once per slug
        if (!(s?.answeredSlugs ?? []).includes(slug)) {
          stats[key] = {
            correct: prev.correct + (correct ? 1 : 0),
            total: prev.total + 1,
          };
        }
        return {
          answeredSlugs: Array.from(answered),
          correctSlugs: Array.from(correctSet),
          quizStats: stats,
        };
      }),

      unlock: (id) => set((s) => {
        const unlocked = new Set(s?.unlocked ?? []);
        unlocked.add(id);
        return { unlocked: Array.from(unlocked) };
      }),

      equip: (slot, id) => set((s) => ({
        character: { ...(s?.character ?? DEFAULT_CHARACTER), [slot]: id },
      })),

      reset: () => set(() => ({
        xp: 0,
        level: 1,
        answeredSlugs: [],
        correctSlugs: [],
        quizStats: {},
        unlocked: ['skin:peach', 'hair:bob', 'hairColor:black', 'outfit:tee', 'accessory:none', 'background:dawn', 'expression:smile'],
        character: DEFAULT_CHARACTER,
      })),
    }),
    {
      name: 'sakenah-portfolio-progress',
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
    }
  )
);

export const XP_PER_LEVEL_CONST = XP_PER_LEVEL;
