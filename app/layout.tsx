import type { Metadata, Viewport } from 'next';
import { Bangers, Caveat, IBM_Plex_Mono, Inter, Newsreader, Saira, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MotionProvider from '../components/MotionProvider';
import { LangProvider } from '../lib/i18n';
import { SITE } from '../lib/site';

const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--f-sans', display: 'swap' });
const display = Bangers({ subsets: ['latin'], weight: '400', variable: '--f-display', display: 'swap' });
const hand = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--f-hand', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });
// the 2027 "Woven in Douala" hero and bar: Inter for text and the heavy title, condensed Saira for the edition tag
const inter = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--f-inter', display: 'swap' });
const tag = Saira({ subsets: ['latin'], axes: ['wdth'], variable: '--f-tag', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });

const description =
  'PyCon Cameroon 2027, Douala: Cameroon’s annual Python conference. Talks, hands-on workshops and keynotes in English and French for developers, researchers, educators and industry.';

export const metadata: Metadata = {
  metadataBase: new URL('https://cm.pycon.org'),
  title: { default: `${SITE.name} ${SITE.year} · ${SITE.city}`, template: `%s · ${SITE.name} ${SITE.year}` },
  description,
  applicationName: `${SITE.name} ${SITE.year}`,
  keywords: ['PyCon', 'PyCon Cameroon', 'Python', 'Douala', 'Cameroon', 'conference', 'Django', 'Python Cameroon'],
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} ${SITE.year}`,
    title: `${SITE.name} ${SITE.year} · ${SITE.city}`,
    description,
    locale: 'en',
  },
  twitter: { card: 'summary_large_image', site: '@PythonCameroon' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d1d27' },
    { media: '(prefers-color-scheme: light)', color: '#e9f0f4' },
  ],
};

// before the first paint: the saved theme (or the device's), and a flag that JS is running
const BOOT = `try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('pycon:theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){}`;

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Python Cameroon',
  url: 'https://cm.pycon.org',
  email: SITE.email,
  sameAs: ['https://x.com/PythonCameroon', 'https://linkedin.com/company/PythonCameroon', 'https://github.com/PythonCameroon'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${hand.variable} ${serif.variable} ${mono.variable} ${inter.variable} ${tag.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <LangProvider>
          <MotionProvider />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
