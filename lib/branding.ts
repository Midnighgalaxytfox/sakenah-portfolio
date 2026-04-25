// Centralized branding for the cherry-blossom theme
export const BRANDING = {
  name: 'Sakenah Aboharb',
  shortName: 'Sakenah',
  title: 'Front-End Developer & Data Analyst',
  tagline: 'Building thoughtful interfaces and telling stories with data.',
  location: 'Auburn Hills, MI · Remote (US / Canada)',
  email: 'sakenahaboharb4it@gmail.com',
  phone: '248-759-1611',
  linkedin: 'https://www.linkedin.com/in/sakenah-aboharb-b5b612316',
  logo: 'https://cdn.abacus.ai/images/40fd41d8-5f2e-4d0b-ba9c-f6dc3db96e80.jpg',
  background: 'https://cdn.abacus.ai/images/764ee1f3-6940-4863-868a-a3f39e617bd4.jpg',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/jobs', label: 'Job Market' },
  { href: '/recommender', label: 'AI Coach' },
  { href: '/character', label: 'Avatar' },
  { href: '/contact', label: 'Contact' },
] as const;
