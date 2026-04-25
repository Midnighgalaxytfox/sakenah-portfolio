'use client';

import { useEffect, useRef, useState } from 'react';

// A small, cute fox face replaces the default system cursor on pointer-capable devices.
// It also leaves a soft cherry-blossom sparkle trail.
export function FoxCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      const el = cursorRef?.current;
      if (el) {
        el.style.left = `${e?.clientX ?? 0}px`;
        el.style.top = `${e?.clientY ?? 0}px`;
      }
      // spawn occasional sparkle trail
      if (Math.random() < 0.22) {
        const trail = document.createElement('div');
        trail.className = 'fox-cursor-trail';
        trail.style.left = `${e?.clientX ?? 0}px`;
        trail.style.top = `${e?.clientY ?? 0}px`;
        trail.style.transform = `translate(-50%, -50%) scale(${0.6 + Math.random() * 0.8})`;
        document.body.appendChild(trail);
        setTimeout(() => {
          trail.style.transition = 'opacity 700ms ease, transform 700ms ease';
          trail.style.opacity = '0';
          trail.style.transform += ' translateY(12px)';
        }, 10);
        setTimeout(() => trail.remove(), 800);
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e?.target as HTMLElement | null;
      const interactive = !!t?.closest?.('a, button, [role="button"], input, textarea, select, label');
      setHover(interactive);
    };

    const onLeave = () => {
      const el = cursorRef?.current;
      if (el) el.style.opacity = '0';
    };
    const onEnter = () => {
      const el = cursorRef?.current;
      if (el) el.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      trailsRef?.current?.forEach?.((el) => el?.remove?.());
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className={`fox-cursor ${hover ? 'hover' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <path d="M5 8 L10 2 L13 10 Z" fill="#ff8a3d" />
        <path d="M27 8 L22 2 L19 10 Z" fill="#ff8a3d" />
        <path d="M7 7 L10 4 L12 9 Z" fill="#ffd3c0" />
        <path d="M25 7 L22 4 L20 9 Z" fill="#ffd3c0" />
        {/* Face */}
        <ellipse cx="16" cy="18" rx="11" ry="10" fill="#ff9a55" />
        <ellipse cx="16" cy="22" rx="8" ry="6" fill="#fff0e6" />
        {/* Eyes */}
        <circle cx="12" cy="17" r="1.6" fill="#2a1a20" />
        <circle cx="20" cy="17" r="1.6" fill="#2a1a20" />
        <circle cx="12.4" cy="16.6" r="0.5" fill="#fff" />
        <circle cx="20.4" cy="16.6" r="0.5" fill="#fff" />
        {/* Nose */}
        <ellipse cx="16" cy="21" rx="1.1" ry="0.8" fill="#2a1a20" />
        {/* Cheeks */}
        <circle cx="9" cy="21" r="1.2" fill="#ffb8c9" opacity="0.7" />
        <circle cx="23" cy="21" r="1.2" fill="#ffb8c9" opacity="0.7" />
        {/* Petal accent */}
        <path d="M28 4 Q30 5 29 7 Q27 8 26 6 Q26 4 28 4 Z" fill="#ff6fa6" />
      </svg>
    </div>
  );
}
