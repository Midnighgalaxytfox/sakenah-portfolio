export type ProjectTheme = 'love' | 'dog' | 'fitness' | 'retail';
export type ProjectMetricIcon = 'activity' | 'bar-chart' | 'dumbbell' | 'heart' | 'paw' | 'sparkles' | 'trending';

export type ProjectShowcase = {
  slug: string;
  aliases?: string[];
  title: string;
  eyebrow: string;
  subtitle: string;
  story: string;
  theme: ProjectTheme;
  cursorLabel: string;
  cursorTrail: string;
  gradient: string;
  panel: string;
  highlights: string[];
  features: string[];
  metrics: { label: string; value: string; icon: ProjectMetricIcon }[];
  overview: string;
  problem: string;
  solution: string;
  technicalDetails: { label: string; detail: string }[];
  userExperience: string[];
  dataAndLogic: string[];
  accessibility: string[];
  futureUpdates: string[];
  recruiterSummary: string;
};

export const PROJECT_SHOWCASES: ProjectShowcase[] = [
  {
    slug: 'love-tracker',
    title: 'Love Tracker App',
    eyebrow: 'Relationship memory system',
    subtitle: 'A soft, cloud-floating tracker for appreciation, shared goals, and tiny daily compliments.',
    story:
      'This mini app turns relationship maintenance into a gentle ritual: write compliments, track kindness streaks, and watch the fox mascot react with hearts whenever someone celebrates it.',
    theme: 'love',
    cursorLabel: '💗',
    cursorTrail: 'heart',
    gradient: 'from-rose-200 via-pink-100 to-sky-100',
    panel: 'bg-white/78 border-rose-200/70',
    highlights: ['Compliment reactions', 'Affection meter', 'Cloud fox mascot', 'Local progress concept'],
    features: ['Daily appreciation prompts', 'Mood-safe streak tracking', 'Memory-card layout', 'Rewarding hover micro-interactions'],
    metrics: [
      { label: 'Kindness streak', value: '14 days', icon: 'heart' },
      { label: 'Memories saved', value: '128', icon: 'sparkles' },
      { label: 'Joy score', value: '98%', icon: 'trending' },
    ],
    overview:
      'Love Tracker is presented as a wellness-style relationship app rather than a simple counter. The page shows how a front-end product can use emotional design, calming feedback, small rewards, and lightweight persistence to make daily check-ins feel meaningful instead of pressured.',
    problem:
      'Many habit apps are optimized for pressure, streak anxiety, or generic productivity. For relationship care, the better problem to solve is gentle consistency: helping people notice kind actions, save memories, and reconnect without turning affection into a task list.',
    solution:
      'The concept combines compliment prompts, soft animation, a floating cloud mascot, and an affection meter. Interactions are intentionally low-friction: one click creates visible feedback, and the UI rewards kindness with hearts instead of harsh success/failure states.',
    technicalDetails: [
      { label: 'State model', detail: 'Compliments, selected prompts, streaks, and memory cards can be stored locally first, then moved to a database if the app becomes multi-user.' },
      { label: 'Animation system', detail: 'Framer Motion drives burst effects while CSS handles long-running ambient motion, keeping the experience smooth and lightweight.' },
      { label: 'Component design', detail: 'Prompt cards, counters, meters, and mascot feedback are separate reusable pieces so the app can grow without becoming messy.' },
      { label: 'Product thinking', detail: 'The main success metric is repeatable emotional value: users should leave with a saved memory or a kind sentence, not just a completed checkbox.' },
    ],
    userExperience: ['Gentle color palette to reduce pressure', 'Hover/click heart bursts for instant delight', 'Memory-card layout for reflection', 'Encouraging copy that avoids guilt or shame'],
    dataAndLogic: ['Daily prompt rotation', 'Compliment count and streak calculations', 'Mood-safe reminders', 'Local persistence concept for private memories'],
    accessibility: ['Large tap targets', 'Keyboard-focusable interaction stage', 'Readable contrast for buttons and cards', 'Text explanations that do not rely only on animation'],
    futureUpdates: ['Private couple profiles', 'Calendar memory timeline', 'Optional reminder settings', 'Exportable appreciation journal'],
    recruiterSummary:
      'This project demonstrates Sakenah’s ability to pair React interaction design with product empathy, accessibility, state management, and polished animation.',
  },
  {
    slug: 'dog-dashboard',
    title: 'Dog Dashboard',
    eyebrow: 'Pet care command center',
    subtitle: 'A warm puppy-care dashboard for meals, walks, health notes, and happy-tail analytics.',
    story:
      'Designed like a cheerful pet-care cockpit, this dashboard makes routine care feel playful while still showing clean status cards and useful patterns.',
    theme: 'dog',
    cursorLabel: '🐾',
    cursorTrail: 'paw',
    gradient: 'from-amber-100 via-orange-50 to-lime-100',
    panel: 'bg-white/82 border-amber-200/80',
    highlights: ['Paw cursor', 'Feeding rings', 'Walk timeline', 'Treat-powered mood meter'],
    features: ['Meal schedule check-ins', 'Walk distance summary', 'Vet note cards', 'Favorite breed gallery concept'],
    metrics: [
      { label: 'Meals today', value: '2/3', icon: 'paw' },
      { label: 'Walk time', value: '48m', icon: 'activity' },
      { label: 'Tail wags', value: '92%', icon: 'trending' },
    ],
    overview:
      'Dog Dashboard shows how a playful consumer app can still communicate clear, structured information. It blends pet-care tasks, API-driven breed/gallery possibilities, daily status cards, and friendly visual language into one approachable dashboard.',
    problem:
      'Pet owners often track care in scattered notes: meals, walks, vet reminders, grooming, medication, and favorite activities. The challenge is making this information quick to update while still feeling warm and fun.',
    solution:
      'The dashboard organizes care into checklist moments, visual meters, pet mood feedback, and compact summary cards. The design makes urgent items easy to scan while keeping the puppy-care theme charming and memorable.',
    technicalDetails: [
      { label: 'API readiness', detail: 'The concept is structured for Dog CEO API breed images or another pet API, with graceful loading/error states and favorites.' },
      { label: 'Dashboard layout', detail: 'Cards separate meals, walks, health notes, and mood so users can understand the day in seconds.' },
      { label: 'Interaction model', detail: 'Checklist toggles update completion totals immediately, demonstrating stateful UI patterns for routine tracking.' },
      { label: 'Visualization', detail: 'Care completion and walking time can be visualized with progress rings, simple charts, and historical summaries.' },
    ],
    userExperience: ['Paw cursor and puppy theme', 'Checklist actions that feel quick and positive', 'Warm amber/green palette', 'Clear daily status hierarchy'],
    dataAndLogic: ['Meal completion tracking', 'Walk-time summaries', 'Mood meter calculations', 'Favorite breed/gallery data model'],
    accessibility: ['Buttons use visible selected states', 'Readable labels for every task', 'Responsive two-column checklist', 'Non-color indicators such as icons and text'],
    futureUpdates: ['Vet appointment reminders', 'Medication log', 'Breed image gallery with favorites', 'Weekly care trend charts'],
    recruiterSummary:
      'This project highlights Sakenah’s front-end dashboard thinking: organizing real-world tasks, preparing for API data, and making routine workflows enjoyable.',
  },
  {
    slug: 'fitness-tracker',
    title: 'Fitness Tracker',
    eyebrow: 'Gamified wellness tracker',
    subtitle: 'A bright training app for workouts, weekly volume, recovery, and consistency streaks.',
    story:
      'This build focuses on motivating feedback: fast cards, glowing progress lanes, and workout logs that make small wins feel visible.',
    theme: 'fitness',
    cursorLabel: '⚡',
    cursorTrail: 'bolt',
    gradient: 'from-emerald-100 via-teal-50 to-cyan-100',
    panel: 'bg-white/80 border-emerald-200/80',
    highlights: ['Energy cursor', 'Progress rings', 'Weekly volume bars', 'Recovery-aware coaching'],
    features: ['Workout set logger', 'Cardio + strength split', 'Consistency streaks', 'Responsive mobile-first layout'],
    metrics: [
      { label: 'Weekly volume', value: '12.8k', icon: 'dumbbell' },
      { label: 'Active streak', value: '9 days', icon: 'activity' },
      { label: 'Recovery', value: 'Good', icon: 'trending' },
    ],
    overview:
      'Fitness Tracker is a mobile-first wellness product concept focused on progress visibility. It presents workouts as lanes of effort — strength, cardio, mobility, and recovery — so users can understand balance instead of chasing only one number.',
    problem:
      'Fitness apps can overwhelm beginners with too many inputs or focus on intensity without recovery. The product challenge is showing progress clearly while encouraging sustainable consistency.',
    solution:
      'The interface uses energetic visual feedback, weekly training lanes, streaks, and recovery status to help users make practical decisions: train harder, rest, or rebalance the week.',
    technicalDetails: [
      { label: 'Data model', detail: 'Workout entries can include type, duration, sets, reps, weight, perceived effort, and notes for later charting.' },
      { label: 'Progress logic', detail: 'Weekly volume, streaks, and recovery status are derived values, which demonstrates front-end data transformation.' },
      { label: 'Responsive UI', detail: 'The layout is designed to work on phones first, with quick cards and large controls for gym use.' },
      { label: 'Motivation layer', detail: 'Micro-interactions reward completed sets without hiding the data that matters.' },
    ],
    userExperience: ['High-energy colors', 'Fast progress bars', 'Simple training categories', 'Encouragement without unrealistic pressure'],
    dataAndLogic: ['Weekly volume calculation', 'Workout category breakdown', 'Streak and rest-day logic', 'Recovery-aware status labels'],
    accessibility: ['Strong text labels beside percentages', 'Large touch targets', 'Readable dark-stage contrast', 'Progress is shown with both text and bar length'],
    futureUpdates: ['Workout history calendar', 'Exercise library', 'Personal records', 'CSV export for analysis'],
    recruiterSummary:
      'This project shows Sakenah can build interactive, mobile-friendly data products where UI, calculations, and user motivation work together.',
  },
  {
    slug: 'retail-data-dashboard',
    aliases: ['data-dashboard'],
    title: 'Retail Data Dashboard',
    eyebrow: 'Business intelligence cockpit',
    subtitle: 'A polished KPI dashboard translating retail sales data into clean decisions.',
    story:
      'Built to show Sakenah’s analytics side, this dashboard uses executive-style KPI cards, regional performance bars, and product category insights.',
    theme: 'retail',
    cursorLabel: '📊',
    cursorTrail: 'pixel',
    gradient: 'from-sky-100 via-indigo-50 to-fuchsia-100',
    panel: 'bg-white/82 border-sky-200/80',
    highlights: ['Chart cursor', 'KPI cards', 'Regional bars', 'SQL-to-story flow'],
    features: ['Revenue performance cards', 'Category drill-down concept', 'Regional comparison chart', 'Decision-focused analytics copy'],
    metrics: [
      { label: 'Revenue', value: '$482K', icon: 'bar-chart' },
      { label: 'AOV', value: '$64.20', icon: 'trending' },
      { label: 'Conversion', value: '7.8%', icon: 'activity' },
    ],
    overview:
      'Retail Data Dashboard is the analytics case study of the portfolio. It explains how raw retail tables can become a clean decision-making screen through SQL extraction, Python cleanup, KPI design, and Tableau-style storytelling.',
    problem:
      'Retail data is often split across orders, customers, regions, products, and channels. Leaders need revenue, conversion, average order value, and regional performance without reading raw tables.',
    solution:
      'The dashboard compresses the business question into KPI cards, regional bars, and drill-down-ready sections. It uses a SQL-terminal visual motif to make the data pipeline visible, not just the final chart.',
    technicalDetails: [
      { label: 'SQL layer', detail: 'Queries can join orders, customers, products, and regions to build clean KPI tables and reusable extracts.' },
      { label: 'Python layer', detail: 'A pandas cleanup step can handle missing values, date parsing, category normalization, and calculated fields.' },
      { label: 'BI layer', detail: 'Tableau-style dashboards prioritize business questions: what changed, where, why, and what action should follow.' },
      { label: 'Decision design', detail: 'Every chart earns its place by supporting revenue, conversion, regional, or category decisions.' },
    ],
    userExperience: ['Executive-ready KPI cards', 'Dark analytics stage for focus', 'Regional comparison bars', 'Plain-language insight labels'],
    dataAndLogic: ['Revenue and AOV calculations', 'Regional performance ranking', 'Conversion-rate summaries', 'SQL-to-dashboard pipeline narrative'],
    accessibility: ['Text values shown with visual bars', 'High-contrast dark chart panel', 'Readable KPI labels', 'Color is supported by numeric values'],
    futureUpdates: ['Real CSV upload demo', 'Interactive filters', 'Category drill-down cards', 'Downloadable dashboard summary'],
    recruiterSummary:
      'This project proves Sakenah can bridge front-end polish with analytics fundamentals: SQL, Python data preparation, KPI thinking, and stakeholder-ready storytelling.',
  },
];

export function findProjectShowcase(slug: string) {
  return PROJECT_SHOWCASES.find((project) => project.slug === slug || project.aliases?.includes(slug));
}
