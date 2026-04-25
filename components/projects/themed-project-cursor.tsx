'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProjectTheme } from '@/lib/project-showcases';

const themeTitles: Record<ProjectTheme, string> = {
  love: 'Love tracker heart cursor',
  dog: 'Dog dashboard paw cursor',
  fitness: 'Fitness tracker lightning cursor',
  retail: 'Retail dashboard chart cursor',
};

export function ThemedProjectCursor({ theme, label }: { theme: ProjectTheme; label: string }) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
    if (!finePointer) return;

    setEnabled(true);
    document.body.classList.add('project-cursor-active');

    const moveCursor = (event: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.classList.remove('project-cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className={`project-cursor project-cursor-${theme}`} aria-label={themeTitles[theme]} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
