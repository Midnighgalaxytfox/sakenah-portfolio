import { BRANDING, NAV_LINKS } from '@/lib/branding';
import { EDUCATION, EXPERIENCE, PROJECTS, SKILLS } from '@/lib/portfolio-data';
import { PROJECT_SHOWCASES } from '@/lib/project-showcases';

function skillSummary() {
  return SKILLS.map((group) => `- ${group.category}: ${group.items.join(', ')}`).join('\n');
}

function experienceSummary() {
  return EXPERIENCE.map((item) => `- ${item.role} at ${item.company} (${item.period}, ${item.location}): ${item.highlights.join(' ')}`).join('\n');
}

function educationSummary() {
  return EDUCATION.map((item) => `- ${item.title}, ${item.org} (${item.period}): ${item.detail}`).join('\n');
}

function projectSummary() {
  return PROJECT_SHOWCASES.map((project) => {
    const base = PROJECTS.find((item) => item.slug === project.slug || project.aliases?.includes(item.slug));
    return `- ${project.title} (/projects/${project.slug})\n  Tagline: ${base?.tagline ?? project.subtitle}\n  Stack: ${base?.stack?.join(', ') ?? 'Project-specific stack documented on page'}\n  Overview: ${project.overview}\n  Problem: ${project.problem}\n  Solution: ${project.solution}\n  Technical details: ${project.technicalDetails.map((item) => `${item.label}: ${item.detail}`).join(' | ')}\n  UX: ${project.userExperience.join('; ')}\n  Data/logic: ${project.dataAndLogic.join('; ')}\n  Accessibility: ${project.accessibility.join('; ')}\n  Future updates: ${project.futureUpdates.join('; ')}\n  Recruiter takeaway: ${project.recruiterSummary}`;
  }).join('\n');
}

export function buildSiteKnowledge() {
  const nav = NAV_LINKS.map((link) => `${link.label}: ${link.href}`).join(', ');
  return `SITE KNOWLEDGE FOR SAKENAH ABOHARB PORTFOLIO\n\nIdentity\n- Name: ${BRANDING.name}\n- Title: ${BRANDING.title}\n- Tagline: ${BRANDING.tagline}\n- Location and target market: ${BRANDING.location}\n- Email: ${BRANDING.email}\n- Phone: ${BRANDING.phone}\n- LinkedIn: ${BRANDING.linkedin}\n- Brand theme: fox sitting under a cherry blossom tree, falling petals, soft glass panels, warm polished portfolio style.\n\nNavigation\n${nav}\n\nSkills\n${skillSummary()}\n\nExperience\n${experienceSummary()}\n\nEducation and certifications\n${educationSummary()}\n\nProjects and mini-app details\n${projectSummary()}\n\nInteractive features\n- Skill Quiz: front-end and data questions with correct and incorrect explanations. Quiz progress awards XP and feeds the career recommender.\n- Live Job Market: remote-friendly job dashboard using a public jobs API with US/Canada filtering and visual summaries.\n- AI Career Coach: generates a personalized remote-tech career plan from quiz performance.\n- Blossom Avatar: Sims-style avatar builder with XP, levels, and unlockable outfits/accessories.\n- Site-only AI Assistant: answers only questions about this portfolio, Sakenah, her projects, skills, background, job goals, and site navigation.\n\nFreshness rule\nThis knowledge is generated from the same central data files that power the website every time the assistant API runs. When the portfolio data, project case studies, skills, experience, or branding are updated in code, the assistant receives the updated information automatically on the next request.`;
}

export function isProbablySiteRelated(message: string) {
  const text = message.toLowerCase().trim();
  const phrases = [
    'love tracker', 'dog dashboard', 'retail data dashboard', 'fitness tracker', 'mini app', 'front-end',
    'data analyst', 'career coach', 'job market', 'skill quiz', 'blossom avatar', 'site assistant'
  ];
  const terms = [
    'sakenah', 'portfolio', 'site', 'website', 'project', 'fitness', 'retail', 'dashboard', 'skills', 'react',
    'javascript', 'html', 'css', 'sql', 'python', 'tableau', 'aws', 'data', 'frontend', 'developer', 'analyst',
    'experience', 'education', 'contact', 'email', 'phone', 'linkedin', 'job', 'remote', 'canada', 'quiz', 'xp',
    'badge', 'avatar', 'character', 'gamification', 'career', 'resume', 'hire', 'navigation', 'page'
  ];
  const smallTalk = ['hi', 'hello', 'hey', 'help', 'what can you do', 'who are you'];
  if (smallTalk.includes(text)) return true;
  if (phrases.some((phrase) => text.includes(phrase))) return true;
  return terms.some((term) => new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text));
}
