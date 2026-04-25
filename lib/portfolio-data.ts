// Static content used across home + detail pages
import { Code2, Database, Wrench, Sparkles, Award, GraduationCap } from 'lucide-react';

export const SKILLS = [
  {
    category: 'Front-End',
    icon: Code2,
    color: 'from-pink-500/20 to-pink-300/5',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Responsive Design', 'Reusable UI Components', 'Cross-Browser Compatibility'],
  },
  {
    category: 'Data & Analytics',
    icon: Database,
    color: 'from-orange-500/20 to-orange-300/5',
    items: ['SQL', 'Python', 'Excel', 'Tableau', 'Data Visualization', 'Exploratory Data Analysis', 'KPI Reporting'],
  },
  {
    category: 'Tools & Cloud',
    icon: Wrench,
    color: 'from-purple-500/20 to-purple-300/5',
    items: ['Git', 'GitHub', 'AWS Cloud Practitioner', 'REST APIs', 'JSON', 'Microsoft Office'],
  },
  {
    category: 'Methods',
    icon: Sparkles,
    color: 'from-rose-500/20 to-rose-300/5',
    items: ['Agile', 'Debugging', 'Performance Optimization', 'Accessibility', 'Code Review'],
  },
] as const;

export const EXPERIENCE = [
  {
    role: 'Front-End Developer — Technical Projects',
    company: 'Self-directed',
    period: 'Jan 2024 – Present',
    location: 'Remote',
    highlights: [
      'Built responsive React applications with reusable component libraries and polished UX.',
      'Integrated REST APIs with JSON payloads for real-time product experiences.',
      'Optimized rendering paths and bundle sizes for measurable performance wins.',
      'Applied WCAG-informed patterns so interfaces work for keyboard and screen reader users.',
    ],
  },
  {
    role: 'Business Intelligence / Data Analyst — Technical Projects',
    company: 'Self-directed',
    period: 'Oct 2024 – Present',
    location: 'Remote',
    highlights: [
      'Designed Tableau dashboards translating messy tables into executive-ready stories.',
      'Wrote SQL queries joining multi-table datasets to answer ad-hoc business questions.',
      'Performed exploratory data analysis in Python (pandas, NumPy) with clear narratives.',
      'Communicated findings to non-technical stakeholders through charts and concise memos.',
    ],
  },
  {
    role: 'Delivery Associate',
    company: 'Amazon',
    period: 'Nov 2020 – Jul 2024',
    location: 'Michigan, US',
    highlights: [
      'Sustained a high on-time delivery rate under tight SLAs across thousands of stops.',
      'Operated logistics software and route-optimization tools daily.',
      'Earned a reputation for reliability, accuracy, and customer-facing professionalism.',
    ],
  },
  {
    role: 'Inventory Specialist',
    company: 'RGIS',
    period: '2020',
    location: 'Michigan, US',
    highlights: [
      'Captured and reconciled large volumes of inventory data with high accuracy.',
      'Collaborated in small teams to complete audits under deadline pressure.',
    ],
  },
  {
    role: 'Cashier / Food Server',
    company: 'Chipotle',
    period: '2019 – 2020',
    location: 'Michigan, US',
    highlights: [
      'Thrived in a high-volume, customer-facing environment with clear communication.',
      'Balanced cash drawers and followed strict food-safety protocols.',
    ],
  },
] as const;

export const PROJECTS = [
  {
    slug: 'love-tracker',
    name: 'Love Tracker App',
    stack: ['React', 'TypeScript', 'LocalStorage', 'Framer Motion'],
    tagline: 'A gentle habit tracker for couples and close friends.',
    description:
      'A React application that lets two people log small acts of appreciation each day. Streaks, gentle reminders, and a calming petal-based animation keep it sticky without feeling demanding.',
    accent: 'rose',
    focus: 'frontend',
  },
  {
    slug: 'dog-dashboard',
    name: 'Dog Dashboard',
    stack: ['React', 'REST API', 'Recharts'],
    tagline: 'A playful interface built on the Dog CEO API.',
    description:
      'Browsable breeds, favorites, and a stats panel showing image counts per breed. Built as a showcase of REST integration, responsive grids, and accessible keyboard navigation.',
    accent: 'amber',
    focus: 'frontend',
  },
  {
    slug: 'fitness-tracker',
    name: 'Fitness Tracker',
    stack: ['React', 'Chart.js', 'Local Persistence'],
    tagline: 'Log workouts, visualize progress, stay honest.',
    description:
      'A mobile-first PWA for tracking strength and cardio sessions. Weekly volume charts, rest-day awareness, and encouraging micro-animations reward consistency.',
    accent: 'emerald',
    focus: 'frontend',
  },
  {
    slug: 'retail-data-dashboard',
    name: 'Retail Data Dashboard',
    stack: ['Tableau', 'SQL', 'Python (pandas)'],
    tagline: 'KPI dashboard translating raw sales tables into a single screen.',
    description:
      'An executive-ready Tableau workbook powered by SQL extracts and a Python ETL step. Conversion, AOV, and regional performance are surfaced with color-blind-friendly palettes and drill-downs.',
    accent: 'blue',
    focus: 'data',
  },
] as const;

export const EDUCATION = [
  {
    icon: GraduationCap,
    title: 'Computer Science',
    org: 'Oakland Community College',
    period: 'Sep 2020 – Present',
    detail: 'Coursework across programming fundamentals, data structures, databases, and web technologies.',
  },
  {
    icon: Award,
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    period: 'Issued 2024',
    detail: 'Foundational understanding of AWS services, architecture, security, and billing.',
  },
  {
    icon: Award,
    title: 'Front-End Engineer Career Path',
    org: 'Codecademy',
    period: 'Completed',
    detail: 'Full career path covering HTML, CSS, JavaScript, React, testing, and web performance.',
  },
  {
    icon: Award,
    title: 'Business Intelligence Data Analyst Career Path',
    org: 'Codecademy',
    period: 'Completed',
    detail: 'SQL, Python, Tableau, data modeling, and storytelling with data.',
  },
] as const;
