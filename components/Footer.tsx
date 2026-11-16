import Link from 'next/link';
import { LINKS, SITE, SOCIAL, datesLabel } from '../lib/site';
import Image from 'next/image';
import { Arrow } from './Mark';
import './footer.css';

const COLUMNS = [
  {
    title: 'Conference',
    links: [
      { label: 'About PyCon Cameroon', href: '/about' },
      { label: 'Programme', href: '/agenda' },
      { label: 'Speakers', href: '/speakers' },
      { label: 'Code of conduct', href: '/about#code-of-conduct' },
    ],
  },
  {
    title: 'Attend',
    links: [
      { label: 'Tickets', href: '/attend#tickets' },
      { label: 'Financial aid', href: '/attend#financial-aid' },
      { label: 'Visas and invitation letters', href: '/attend#visas' },
      { label: 'Douala city guide', href: '/venue' },
    ],
  },
  {
    title: 'Sponsors',
    links: [
      { label: 'Sponsor 2027', href: '/sponsors' },
      { label: 'Our 2026 sponsors', href: '/sponsors#thank-you' },
      { label: 'Contact the team', href: LINKS.mail('PyCon Cameroon 2027') },
    ],
  },
];

const SOCIAL_ORDER = ['X', 'LinkedIn', 'YouTube', 'Discord', 'GitHub', 'WhatsApp'];
const SOCIAL_LINKS = SOCIAL_ORDER.map((short) => SOCIAL.find((item) => item.short === short)).filter(
  (item): item is (typeof SOCIAL)[number] => Boolean(item),
);

function SocialMark({ network }: { network: string }) {
  const common = {
    'aria-hidden': true as const,
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
  };

  switch (network) {
    case 'X':
      return <svg {...common}><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.3 22H2.2l7.3-8.4L1.8 2h6.4l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" /></svg>;
    case 'LinkedIn':
      return <svg {...common}><path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.35 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.57V9h3.56v11.45Z" /></svg>;
    case 'Discord':
      return <svg {...common}><path d="M19.7 5.1a18 18 0 0 0-4.4-1.4l-.55 1.13a16.6 16.6 0 0 0-5.5 0L8.7 3.7a18 18 0 0 0-4.4 1.4C1.5 9.2.75 13.2 1.1 17.2a18 18 0 0 0 5.4 2.7l1.17-1.9a11 11 0 0 1-1.84-.9l.45-.35c3.55 1.65 7.4 1.65 10.9 0l.46.35c-.59.35-1.2.65-1.84.9l1.17 1.9a18 18 0 0 0 5.4-2.7c.42-4.65-.72-8.6-3.07-12.1ZM8.5 14.7c-1.05 0-1.9-.95-1.9-2.1s.83-2.1 1.9-2.1 1.92.95 1.9 2.1c0 1.15-.84 2.1-1.9 2.1Zm7 0c-1.05 0-1.9-.95-1.9-2.1s.83-2.1 1.9-2.1 1.92.95 1.9 2.1c0 1.15-.84 2.1-1.9 2.1Z" /></svg>;
    case 'GitHub':
      return <svg {...common}><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.12.68-3.78-1.32-3.78-1.32-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.49-.28-5.1-1.25-5.1-5.55 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.14-1.45 3.1-1.15 3.1-1.15.62 1.55.23 2.69.11 2.98.72.79 1.15 1.8 1.15 3.02 0 4.31-2.62 5.27-5.12 5.55.4.35.75 1.03.75 2.08v3.09c0 .3.2.66.77.55A11.2 11.2 0 0 0 12 .8Z" /></svg>;
    case 'YouTube':
      return <svg {...common}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z" /></svg>;
    default:
      return <svg {...common}><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 0 5.3 0 11.9c0 2.1.56 4.1 1.62 5.88L0 24l6.4-1.67a12 12 0 0 0 5.6 1.4h.01c6.6 0 11.98-5.36 11.99-11.95a11.8 11.8 0 0 0-3.5-8.28ZM12 21.7a9.8 9.8 0 0 1-4.99-1.37l-.36-.22-3.8.99 1.01-3.7-.24-.38A9.75 9.75 0 0 1 2.1 11.9c0-5.45 4.44-9.88 9.9-9.88a9.8 9.8 0 0 1 6.98 2.89 9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.89 9.88Zm5.43-7.4c-.3-.15-1.77-.88-2.05-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.77-1.68-2.07-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.63-.94-2.23-.25-.59-.5-.5-.69-.51h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.73 2.02-1.43.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35Z" /></svg>;
  }
}

export default function Footer() {
  return (
    <footer className="foot deep">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <Image src="/hero/badge.webp" alt="" width={88} height={88} className="foot__badge" />
            <p className="foot__name">
              PyCon Cameroon
              <br />
              {SITE.city} {SITE.year}
            </p>
            <p className="foot__when">{datesLabel()}</p>
            <nav className="foot__social" aria-label="Social media">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.short}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialMark network={social.short} />
                </a>
              ))}
            </nav>
          </div>
          <nav className="foot__cols" aria-label="Footer">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <h2 className="eyebrow">{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="foot__past">
          <p className="eyebrow">Past editions</p>
          <a href={LINKS.past2026} target="_blank" rel="noreferrer" className="foot__edition">
            <span className="foot__yr">2026</span>
            <span>Yaoundé</span>
            <Arrow dir="out" />
          </a>
          <Link href="/report/2026" className="foot__edition">
            <span className="foot__yr">2026</span>
            <span>Event report</span>
            <Arrow dir="out" />
          </Link>
        </div>

        <div className="foot__base">
          <p>
            © 2026 Python Cameroon ·{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p>Photos: PyCon Cameroon 2026 · Logo after La Nouvelle Liberté by Joseph-Francis Sumégné</p>
          <p>
            <a href={LINKS.psf} target="_blank" rel="noreferrer">
              PyCon is a trademark of the Python Software Foundation
            </a>
          </p>
          <nav className="foot__legal" aria-label="Policies and safety">
            <a href={LINKS.mail('Terms and conditions')}>Terms and Conditions</a>
            <a href={LINKS.mail('Privacy policy')}>Privacy Policy</a>
            <Link href="/attend#health">Health &amp; Safety</Link>
          </nav>
        </div>

        <p className="foot__signature">
          <Link href="/akana">
            Built by Almight · Akana Signing Josias Aaron
          </Link>
        </p>
      </div>
    </footer>
  );
}
