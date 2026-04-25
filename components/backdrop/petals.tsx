'use client';

import { useEffect, useState } from 'react';

type Petal = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
  hue: number;
};

export function FallingPetals({ count = 26 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate on client to avoid SSR mismatch
    const arr: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 14,
      delay: Math.random() * 12,
      size: 8 + Math.random() * 12,
      drift: (Math.random() - 0.5) * 60,
      hue: 335 + Math.random() * 20,
    }));
    setPetals(arr);
  }, [count]);

  if (petals?.length === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {petals?.map?.((p) => (
        <span
          key={p?.id}
          className="petal"
          style={{
            left: `${p?.left ?? 0}%`,
            width: `${p?.size ?? 12}px`,
            height: `${p?.size ?? 12}px`,
            animationDuration: `${p?.duration ?? 14}s`,
            animationDelay: `-${p?.delay ?? 0}s`,
            background: `radial-gradient(circle at 30% 30%, hsl(${p?.hue ?? 340} 90% 90%), hsl(${p?.hue ?? 340} 85% 70%) 55%, hsl(${p?.hue ?? 340} 80% 60%))`,
          }}
        />
      ))}
    </div>
  );
}
