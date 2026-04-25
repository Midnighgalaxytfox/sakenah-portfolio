# Sakenah Aboharb Portfolio

A polished cherry-blossom and fox themed portfolio for **Sakenah Aboharb**, a Front-End Developer and Data Analyst seeking remote-friendly roles in the US and Canada.

## What this portfolio includes

- Responsive Next.js portfolio pages
- Four unique mini-app project showcases:
  - Love Tracker App
  - Dog Dashboard
  - Fitness Tracker
  - Retail Data Dashboard
- Detailed case-study sections for recruiters and hiring managers
- Skill quiz with correct and incorrect explanations
- XP, levels, badges, and Sims-style avatar customization
- Remote job dashboard
- AI career recommender
- Sakura, a scoped pop-up AI assistant that answers only about this portfolio

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Zustand
- Framer Motion
- Recharts / Chart.js
- Abacus.AI LLM API for the AI assistant and career recommender

## Local setup

### 1. Install required software

Install these on your computer:

- Node.js 20 LTS or newer
- Yarn
- Git
- PostgreSQL, or a hosted Postgres database such as Neon, Supabase, Railway, or Render

### 2. Open the project folder

```bash
cd nextjs_space
```

### 3. Install dependencies

```bash
yarn install
```

### 4. Create your local environment file

Copy the example environment file:

```bash
cp .env.example .env
```

Then open `.env` and fill in:

```bash
DATABASE_URL="your_postgres_connection_string"
ABACUSAI_API_KEY="your_server_side_api_key"
```

Important: never upload `.env` to GitHub.

### 5. Generate Prisma client

```bash
yarn prisma generate
```

### 6. Create database tables

For local development, run:

```bash
yarn prisma db push
```

### 7. Seed quiz questions

```bash
yarn prisma db seed
```

### 8. Start the development server

```bash
yarn dev
```

Then open:

```text
http://localhost:3000
```

## Production build check

Before showing the site to employers or deploying it, run:

```bash
yarn build
```

If the build succeeds, the project is ready to deploy.

## GitHub upload steps

### 1. Create a GitHub repository

Go to GitHub and create a new repository, for example:

```text
sakenah-portfolio
```

Recommended settings:

- Public repository if you want employers to view the code
- Add a professional description
- Do not add another README from GitHub if this README is already in your project

### 2. Initialize Git locally

From inside the `nextjs_space` folder:

```bash
git init
git add .
git commit -m "Initial portfolio website"
```

### 3. Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sakenah-portfolio.git
git push -u origin main
```

### 4. Confirm secrets are not uploaded

Before pushing, always check:

```bash
git status
```

Make sure `.env` is not listed. The `.gitignore` file is already configured to protect it.

## Vercel deployment steps

### 1. Import your GitHub repository into Vercel

Go to Vercel, choose **Add New Project**, and import the GitHub repository.

### 2. Set the root directory

Set the project root to the folder that contains this README and `package.json`:

```text
nextjs_space
```

If your GitHub repository contains only the contents of `nextjs_space`, leave the root directory as default.

### 3. Add environment variables

In Vercel project settings, add:

```text
DATABASE_URL
ABACUSAI_API_KEY
```

### 4. Deploy

Click deploy. After deployment finishes, test:

- Home page
- Projects page
- Each mini-app project page
- Quiz
- Job dashboard
- AI career recommender
- Sakura chat assistant
- Contact page

## How to showcase this to employers

Include both links on your resume and LinkedIn:

```text
Portfolio: your-live-vercel-url
GitHub: https://github.com/YOUR_USERNAME/sakenah-portfolio
```

Recommended resume bullet:

```text
Built and deployed a responsive Next.js portfolio featuring four interactive mini-app case studies, a skill quiz with XP gamification, a remote job dashboard, and a scoped AI portfolio assistant using React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and LLM APIs.
```

Recommended LinkedIn featured description:

```text
My portfolio combines front-end engineering, data analytics, AI, and gamified UX. It includes detailed case studies, custom themed mini-apps, a remote job dashboard, quiz-based career recommendations, and an AI assistant that answers only about my site and work.
```

## Best employer demo flow

Use this order when walking someone through the site:

1. Start on the home page and explain the fox/cherry blossom branding.
2. Open the Projects section.
3. Show each mini-app page and explain the problem, solution, and technical notes.
4. Open the quiz and show the explanations for correct and incorrect answers.
5. Show the avatar/XP system to demonstrate engagement design.
6. Open Sakura chat and ask: “Which project best shows Sakenah’s data skills?”
7. End on Contact.

## Maintenance notes

To update your information later, edit these central files:

- `lib/branding.ts` for name, title, contact info, links, and navigation
- `lib/portfolio-data.ts` for skills, experience, education, and project cards
- `lib/project-showcases.ts` for detailed project case studies
- `lib/site-knowledge.ts` if the AI assistant needs a new knowledge category

Because Sakura pulls from these central data files, updates to your project details and portfolio content are reflected in the assistant automatically.
