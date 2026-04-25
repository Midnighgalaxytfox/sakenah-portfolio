// Catalog of all character customization items, their XP unlock thresholds,
// and pretty labels / hex colors used by the SVG renderer.
import type { Character } from '@/lib/progress-store';

export type Slot = keyof Character;

export type Item = {
  id: string;
  slot: Slot;
  label: string;
  unlockXp: number;
  color?: string;
  icon?: string; // emoji or short glyph
  description?: string;
};

export const CATALOG: Item[] = [
  // --- skin tones ---
  { id: 'skin:peach', slot: 'skin', label: 'Peach', unlockXp: 0, color: '#ffd3b5' },
  { id: 'skin:warm', slot: 'skin', label: 'Warm', unlockXp: 0, color: '#e9b18a' },
  { id: 'skin:honey', slot: 'skin', label: 'Honey', unlockXp: 15, color: '#c9905a' },
  { id: 'skin:cocoa', slot: 'skin', label: 'Cocoa', unlockXp: 15, color: '#8b5a3c' },
  { id: 'skin:porcelain', slot: 'skin', label: 'Porcelain', unlockXp: 30, color: '#fce7d8' },

  // --- hair styles ---
  { id: 'hair:bob', slot: 'hair', label: 'Blossom Bob', unlockXp: 0, icon: '🌸' },
  { id: 'hair:bun', slot: 'hair', label: 'Top Bun', unlockXp: 10, icon: '🍤' },
  { id: 'hair:ponytail', slot: 'hair', label: 'Ponytail', unlockXp: 30, icon: '💇' },
  { id: 'hair:long', slot: 'hair', label: 'Long Flow', unlockXp: 150, icon: '🧖' },
  { id: 'hair:short', slot: 'hair', label: 'Pixie', unlockXp: 80, icon: '✂️' },

  // --- hair colors ---
  { id: 'hairColor:black', slot: 'hairColor', label: 'Midnight', unlockXp: 0, color: '#1f1420' },
  { id: 'hairColor:brown', slot: 'hairColor', label: 'Chestnut', unlockXp: 0, color: '#6b3f2a' },
  { id: 'hairColor:blonde', slot: 'hairColor', label: 'Honey', unlockXp: 40, color: '#d9b778' },
  { id: 'hairColor:pink', slot: 'hairColor', label: 'Sakura', unlockXp: 120, color: '#ff7fb0' },
  { id: 'hairColor:lavender', slot: 'hairColor', label: 'Lavender', unlockXp: 240, color: '#b695d7' },

  // --- outfits ---
  { id: 'outfit:tee', slot: 'outfit', label: 'Casual Tee', unlockXp: 0, color: '#7ec6f0' },
  { id: 'outfit:hoodie', slot: 'outfit', label: 'Dev Hoodie', unlockXp: 60, color: '#5d4fbe' },
  { id: 'outfit:blazer', slot: 'outfit', label: 'Interview Blazer', unlockXp: 200, color: '#2f2a4a' },
  { id: 'outfit:dress', slot: 'outfit', label: 'Petal Dress', unlockXp: 120, color: '#ff9cb8' },
  { id: 'outfit:kimono', slot: 'outfit', label: 'Festival Kimono', unlockXp: 400, color: '#e94f7e' },

  // --- accessories ---
  { id: 'accessory:none', slot: 'accessory', label: 'None', unlockXp: 0 },
  { id: 'accessory:glasses', slot: 'accessory', label: 'Focus Glasses', unlockXp: 100, icon: '👓' },
  { id: 'accessory:headphones', slot: 'accessory', label: 'Headphones', unlockXp: 80, icon: '🎧' },
  { id: 'accessory:petal-crown', slot: 'accessory', label: 'Petal Crown', unlockXp: 260, icon: '🌼' },
  { id: 'accessory:laptop', slot: 'accessory', label: 'Laptop Sticker', unlockXp: 180, icon: '💻' },

  // --- backgrounds ---
  { id: 'background:dawn', slot: 'background', label: 'Dawn Garden', unlockXp: 0 },
  { id: 'background:sunset', slot: 'background', label: 'Blossom Sunset', unlockXp: 320 },
  { id: 'background:library', slot: 'background', label: 'Cozy Library', unlockXp: 180 },
  { id: 'background:tokyo', slot: 'background', label: 'Tokyo Skyline', unlockXp: 360 },

  // --- expressions ---
  { id: 'expression:smile', slot: 'expression', label: 'Soft Smile', unlockXp: 0, icon: '😊' },
  { id: 'expression:wink', slot: 'expression', label: 'Wink', unlockXp: 20, icon: '😉' },
  { id: 'expression:focused', slot: 'expression', label: 'Focused', unlockXp: 60, icon: '🤓' },
  { id: 'expression:joyful', slot: 'expression', label: 'Joyful', unlockXp: 140, icon: '😄' },
];

export const SLOT_META: Record<Slot, { label: string; description: string }> = {
  skin: { label: 'Skin Tone', description: 'Pick a complexion.' },
  hair: { label: 'Hairstyle', description: 'Cut, style, and shape.' },
  hairColor: { label: 'Hair Color', description: 'From natural to bold.' },
  outfit: { label: 'Outfit', description: 'Show up in your vibe.' },
  accessory: { label: 'Accessory', description: 'One fun detail.' },
  background: { label: 'Background', description: 'Set the scene.' },
  expression: { label: 'Expression', description: 'Choose the mood.' },
};

export const SLOT_ORDER: Slot[] = ['skin', 'hair', 'hairColor', 'outfit', 'accessory', 'background', 'expression'];

export function getItem(id: string): Item | undefined {
  return CATALOG.find((i) => i?.id === id);
}

export function getBySlot(slot: Slot): Item[] {
  return CATALOG.filter((i) => i?.slot === slot).sort((a, b) => a.unlockXp - b.unlockXp);
}
