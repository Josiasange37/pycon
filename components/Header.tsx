'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LINKS, NAV, SITE, SOCIAL } from '../lib/site';
import Mark from './Mark';
import './header.css';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

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
      <div className="status">
        <div className="wrap status__in">
          <span className="status__dot" aria-hidden="true" />
          <span>
            <span className="status__long">PyCon Cameroon </span>2026 in Yaoundé is a wrap.{' '}
            <a href={LINKS.report2026} target="_blank" rel="noreferrer">
              Read the report
            </a>
          </span>
        </div>
      </div>
      <header className="bar" data-open={open || undefined}>
        <div className="wrap bar__in">
          <Link href="/" className="brand" aria-label={`${SITE.name} ${SITE.year}, home`}>
            <Mark size={34} className="brand__mark" />
            <span className="brand__name">
              PyCon Cameroon
              <span className="brand__edition">
                {SITE.city} {SITE.year}
              </span>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bar__end">
            <ThemeToggle />
            <Link className="btn btn--taxi btn--small bar__cta" href="/#updates">
              Get updates
            </Link>
            <button
              ref={button}
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="menu-btn__lines" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div id="menu" ref={panel} className="menu" hidden={!open}>
          <nav aria-label="Main (mobile)" className="wrap">
            <ul className="menu__list">
              <li>
                <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
                  Home
                </Link>
              </li>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isCurrent(n.href) ? 'page' : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu__foot">
              <Link className="btn btn--taxi" href="/#updates">
                Get updates
              </Link>
              <p className="eyebrow">Past edition</p>
              <a className="link" href={LINKS.past2026} target="_blank" rel="noreferrer">
                PyCon Cameroon 2026 · Yaoundé
              </a>
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

function ThemeToggle() {
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
      className="theme"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
