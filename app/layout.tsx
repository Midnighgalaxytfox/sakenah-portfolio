import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { SiteNav } from '@/components/nav/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { FallingPetals } from '@/components/backdrop/petals';
import { FoxCursor } from '@/components/backdrop/fox-cursor';
import { Breadcrumbs } from '@/components/nav/breadcrumbs';
import { SiteChatWidget } from '@/components/ai/site-chat-widget';
import { BRANDING } from '@/lib/branding';

export const dynamic = 'force-dynamic';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL) : undefined,
  title: {
    default: `${BRANDING.name} — ${BRANDING.title}`,
    template: `%s · ${BRANDING.shortName}`,
  },
  description: `Portfolio of ${BRANDING.name}, ${BRANDING.title} focused on remote roles in the US and Canada. ${BRANDING.tagline}`,
  keywords: ['Front-End Developer', 'Data Analyst', 'React', 'SQL', 'Tableau', 'Python', 'Remote', 'Portfolio'],
  authors: [{ name: BRANDING.name }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: `${BRANDING.name} — ${BRANDING.title}`,
    description: BRANDING.tagline,
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRANDING.name} — ${BRANDING.title}`,
    description: BRANDING.tagline,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://apps.abacus.ai/chatllm/appllm-lib.js" strategy="afterInteractive" />
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased relative`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="blossom-backdrop" aria-hidden="true" />
          <FallingPetals count={22} />
          <FoxCursor />
          <SiteNav />
          <Breadcrumbs />
          <main className="relative z-[1]">{children}</main>
          <SiteFooter />
          <Toaster />
          <SiteChatWidget />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
