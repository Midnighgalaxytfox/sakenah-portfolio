import { CharacterBuilder } from '@/components/character/character-builder';

export const metadata = { title: 'Blossom Avatar' };

export default function CharacterPage() {
  return (
    <div className="container-page pt-10 pb-16">
      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Blossom Avatar</p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-3xl">
        Dress your <span className="accent-word">mini self</span>.
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        A tiny, Sims-style character builder. Every quiz you ace and every AI plan you generate unlocks new
        outfits, accessories, and scenery. Your look is saved privately in this browser.
      </p>
      <div className="mt-8">
        <CharacterBuilder />
      </div>
    </div>
  );
}
