import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Ojuju } from 'next/font/google';
import './globals.css';

const sans = Inter_Tight({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-sans' });
// Ojuju: a display face by Nigerian designer Chisaokwu Joboson, drawn from African mask forms
const display = Ojuju({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'PyCon Cameroon',
  description: 'Python, written on the oldest wall we know.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0c0b' },
    { media: '(prefers-color-scheme: light)', color: '#f3ede3' },
  ],
};

// set the theme before the first paint, so a light-theme visitor never sees a dark flash
const THEME_SCRIPT = `try{var t=localStorage.getItem('pycon:theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
