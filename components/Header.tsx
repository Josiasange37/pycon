'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LangSwitch, useLang } from '../lib/i18n';
import { LINKS, NAV, SITE, SOCIAL } from '../lib/site';
import Image from 'next/image';
import { Arrow } from './Mark';
import './header.css';

const NAV_KEY = {
  '/about': 'about',
  '/agenda': 'programme',
  '/ubucon': 'ubucon',
  '/speakers': 'speakers',
  '/sponsors': 'sponsors',
  '/attend': 'attend',
  '/venue': 'venue',
} as const;

export default function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const label = (href: string, fallback: string) => t.nav[NAV_KEY[href as keyof typeof NAV_KEY]] ?? fallback;
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // the bar tightens once the page scrolls under it
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the phone menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('menu-open');
    const bar = panel.current?.parentElement;
    if (bar && panel.current) panel.current.style.top = `${bar.getBoundingClientRect().bottom - 1}px`;
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a, button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          button.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          button.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="bar" data-open={open || undefined} data-stuck={stuck || undefined}>
        <div className="wrap bar__in">
          <Link href="/" className="brand" aria-label={`${SITE.name} ${SITE.year}, home`}>
            <Image src="/hero/badge.webp" alt="" width={60} height={60} className="brand__mark" priority />
            <span className="brand__name" aria-hidden="true">
              <span>PyCon</span>
              <span>Cameroon</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isCurrent(n.href) ? 'page' : undefined}
                    className={n.href === '/ubucon' ? 'nav__ubucon' : undefined}
                  >
                    {n.href === '/ubucon' && <Image src="/partners/ubucon-cameroon.webp" alt="" width={18} height={18} />}
                    {label(n.href, n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bar__end">
            <LangSwitch className="bar__lang" />
            <ThemeToggle className="bar__theme" />
            <Link className="btn btn--blue bar__cta" href="/#updates">
              {t.getUpdates} <Arrow dir="out" />
            </Link>
            <button
              ref={button}
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
              <span className="menu-btn__lines" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div id="menu" ref={panel} className="menu" hidden={!open}>
          <nav aria-label="Main (mobile)" className="wrap">
            <ul className="menu__list">
              <li>
                <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
                  {t.home}
                </Link>
              </li>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isCurrent(n.href) ? 'page' : undefined}
                    className={n.href === '/ubucon' ? 'menu__ubucon' : undefined}
                  >
                    {n.href === '/ubucon' && <Image src="/partners/ubucon-cameroon.webp" alt="" width={30} height={30} />}
                    {label(n.href, n.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu__foot">
              <Link className="btn btn--blue" href="/#updates">
                {t.getUpdates} <Arrow dir="out" />
              </Link>
              <div className="menu__prefs">
                <LangSwitch />
                <ThemeToggle />
              </div>
              <p className="eyebrow">{t.pastEdition}</p>
              <a className="link" href={LINKS.past2026} target="_blank" rel="noreferrer">
                PyCon Cameroon 2026 · Yaoundé
              </a>
              <Link className="link" href="/report/2026">
                Read the 2026 event report <Arrow dir="out" />
              </Link>
              <ul className="menu__social">
                {SOCIAL.slice(0, 4).map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.short}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function ThemeToggle({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem('pycon:theme', next);
    } catch {
      // storage blocked: the switch still works for this visit
    }
  };

  return (
    <button
      type="button"
      className={`theme ${className}`}
      onClick={toggle}
      aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
      title={theme === 'dark' ? t.themeLight : t.themeDark}
    >
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="10" cy="10" r="3.6" />
          <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M16.6 12.4A7 7 0 0 1 7.6 3.4a7 7 0 1 0 9 9Z" />
        </svg>
      )}
    </button>
  );
}
