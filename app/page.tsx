import { HomeHero } from '@/components/home/home-hero';
import { HomeHighlights } from '@/components/home/home-highlights';
import { HomeAbout } from '@/components/home/home-about';
import { HomeSkills } from '@/components/home/home-skills';
import { HomeExperience } from '@/components/home/home-experience';
import { HomeProjects } from '@/components/home/home-projects';
import { HomeCta } from '@/components/home/home-cta';

export default function HomePage() {
  return (
    <div className="relative">
      <HomeHero />
      <HomeHighlights />
      <HomeAbout />
      <HomeSkills />
      <HomeExperience />
      <HomeProjects />
      <HomeCta />
    </div>
  );
}
