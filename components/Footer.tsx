import Link from 'next/link';
import { LINKS, SITE, SOCIAL, datesLabel } from '../lib/site';
import Mark, { Arrow } from './Mark';
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

export default function Footer() {
  return (
    <footer className="foot deep">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <Mark size={96} />
            <p className="foot__name">
              PyCon Cameroon
              <br />
              {SITE.city} {SITE.year}
            </p>
            <p className="foot__when mono">{datesLabel()}</p>
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
            <div>
              <h2 className="eyebrow">Community</h2>
              <ul>
                {SOCIAL.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="foot__past">
          <p className="eyebrow">Past editions</p>
          <a href={LINKS.past2026} target="_blank" rel="noreferrer" className="foot__edition">
            <span className="mono">2026</span>
            <span>Yaoundé</span>
            <Arrow dir="out" />
          </a>
          <a href={LINKS.report2026} target="_blank" rel="noreferrer" className="foot__edition">
            <span className="mono">2026</span>
            <span>Event report</span>
            <Arrow dir="out" />
          </a>
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
        </div>
      </div>
    </footer>
  );
}
