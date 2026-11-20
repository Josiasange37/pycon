import type { Metadata, Viewport } from 'next';
import { Bangers, Caveat, IBM_Plex_Mono, Inter, Newsreader, Saira, Space_Grotesk } from 'next/font/google';
import './globals.css';
import './dark-theme.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MotionProvider from '../components/MotionProvider';
import { LangProvider } from '../lib/i18n';
import { SITE, SOCIAL } from '../lib/site';

const sans = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--f-sans', display: 'swap' });
const display = Bangers({ subsets: ['latin'], weight: '400', variable: '--f-display', display: 'swap' });
const hand = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--f-hand', display: 'swap' });
const serif = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });
// the 2027 "Woven in Douala" hero and bar: Inter for text and the heavy title, condensed Saira for the edition tag
const inter = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--f-inter', display: 'swap' });
const tag = Saira({ subsets: ['latin'], axes: ['wdth'], variable: '--f-tag', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });

const description =
  'Join PyCon Cameroon 2027 in Douala, Cameroon for Python talks and workshops in English and French, with developers, students and researchers from across Africa.';

const PYCON_URL = 'https://cm.pycon.org/';
const AKANA_PROFILE_URL = `${PYCON_URL}akana`;
const AKANA_PERSON_ID = `${AKANA_PROFILE_URL}#akana-signing-josias-aaron`;
const ALMIGHT_BRAND_ID = `${AKANA_PROFILE_URL}#almight`;

export const metadata: Metadata = {
  metadataBase: new URL('https://cm.pycon.org'),
  title: { default: `${SITE.name} ${SITE.year} · Python Conference in ${SITE.city}`, template: `%s · ${SITE.name} ${SITE.year}` },
  description,
  applicationName: `${SITE.name} ${SITE.year}`,
  creator: 'Almight · Akana Signing Josias Aaron',
  keywords: ['PyCon', 'PyCon Cameroon', 'Python', 'Douala', 'Cameroon', 'conference', 'Django', 'Python Cameroon'],
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} ${SITE.year}`,
    title: `${SITE.name} ${SITE.year} · Python Conference in ${SITE.city}`,
    description,
    url: PYCON_URL,
    locale: 'en',
  },
  twitter: { card: 'summary_large_image', site: '@PythonCameroon' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#19264c' },
    { media: '(prefers-color-scheme: light)', color: '#f4edda' },
  ],
};

// before the first paint: the saved theme (or the device's), and a flag that JS is running
const BOOT = `try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('pycon:theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){}`;

const SITE_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${PYCON_URL}#organization`,
      name: 'Python Cameroon',
      url: PYCON_URL,
      email: SITE.email,
      logo: `${PYCON_URL}hero/badge.webp`,
      sameAs: SOCIAL.map(({ href }) => href),
    },
    {
      '@type': 'WebSite',
      '@id': `${PYCON_URL}#website`,
      name: `${SITE.name} ${SITE.year}`,
      url: PYCON_URL,
      publisher: { '@id': `${PYCON_URL}#organization` },
      creator: { '@id': AKANA_PERSON_ID },
    },
    {
      '@type': 'Brand',
      '@id': ALMIGHT_BRAND_ID,
      name: 'Almight',
      url: 'https://almight.me/',
    },
    {
      '@type': 'Person',
      '@id': AKANA_PERSON_ID,
      name: 'Akana Signing Josias Aaron',
      alternateName: 'Almight',
      brand: { '@id': ALMIGHT_BRAND_ID },
      url: AKANA_PROFILE_URL,
      image: `${PYCON_URL}akana-profile.webp`,
      sameAs: [
        'https://www.linkedin.com/in/akana-signing-josias-aaron',
        'https://github.com/Josiasange37',
        'https://almight.me/',
      ],
      mainEntityOfPage: AKANA_PROFILE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${hand.variable} ${serif.variable} ${mono.variable} ${inter.variable} ${tag.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_LD) }} />
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
