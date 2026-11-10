import { ART } from '../splash/art';
import { FOOTER } from './content';
import './sections.css';

// placeholders until the real profiles are confirmed
const SOCIAL = [
  { label: 'X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'WhatsApp', href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <a className="footer__mark" href="/">
            <img src={`/splash/art/${ART.logo.image}.webp`} alt="" width={44} height={46} loading="lazy" />
            PyCon Cameroon
          </a>
          <p>{FOOTER.blurb}</p>
          <ul className="footer__social" aria-label="PyCon Cameroon elsewhere">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER.columns.map((c) => (
          <nav key={c.title} className="footer__col" aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__base">
        <p>
          © 2026 PyCon Cameroon. All rights reserved. Built by <span className="footer__credit">Muluh Azinwi Success</span>.
        </p>
        <ul>
          {FOOTER.legal.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
