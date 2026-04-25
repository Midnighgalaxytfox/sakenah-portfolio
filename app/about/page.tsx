import { BRANDING } from '@/lib/branding';
import { EDUCATION } from '@/lib/portfolio-data';
import { HomeSkills } from '@/components/home/home-skills';
import { HomeExperience } from '@/components/home/home-experience';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div>
      <section className="container-page pt-10 pb-8">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-8 items-center">
          <div className="about-fox-card relative aspect-square max-w-[380px] rounded-3xl overflow-hidden shadow-lg mx-auto md:mx-0" role="img" aria-label="Fox and blossom illustration representing Sakenah's portfolio brand">
            <div className="about-moon" aria-hidden="true" />
            <div className="about-branch" aria-hidden="true" />
            <div className="about-fox" aria-hidden="true">🦊</div>
            <div className="about-petal about-petal-one" aria-hidden="true" />
            <div className="about-petal about-petal-two" aria-hidden="true" />
            <div className="about-petal about-petal-three" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">About</p>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
              Slow pages, <span className="accent-word">sharp thinking</span>.
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I’m Sakenah — a front-end developer and data analyst from Auburn Hills, Michigan. I’m wrapping
              up my Computer Science degree and currently seeking remote roles across the US and Canada.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              My past includes four years as an Amazon Delivery Associate, inventory work with RGIS, and
              long shifts at Chipotle — experiences that forged reliability, patience, and the habit of
              finishing what I start. Those instincts now show up in how I ship code: test edge cases, keep
              things accessible, and bring a stakeholder’s eye to every dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="section-alt py-14 mt-6">
        <div className="container-page">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Education & Certifications</p>
          <h2 className="font-display font-bold text-3xl tracking-tight">Always learning.</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {EDUCATION?.map?.((e) => {
              const Icon = e?.icon;
              return (
                <div key={e?.title} className="glass-panel rounded-2xl p-5 flex gap-4 hover:shadow-lg transition">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg tracking-tight">{e?.title}</h3>
                    <p className="text-sm text-primary font-medium">{e?.org}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e?.period}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e?.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <HomeSkills />
      <HomeExperience />
    </div>
  );
}
