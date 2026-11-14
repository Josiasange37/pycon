import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Newsreader, Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MotionProvider from '../components/MotionProvider';
import { SITE } from '../lib/site';

const sans = Schibsted_Grotesk({ subsets: ['latin'], variable: '--f-sans', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });

const description =
  'PyCon Cameroon 2027 comes to Douala: a community conference about Python, run by volunteers from Python Cameroon. Talks, workshops and people, in English and French.';

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
    { media: '(prefers-color-scheme: dark)', color: '#0b1915' },
    { media: '(prefers-color-scheme: light)', color: '#f2f4ef' },
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
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <MotionProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
