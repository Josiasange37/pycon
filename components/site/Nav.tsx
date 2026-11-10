'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { EASE_OUT } from '../splash/wall';
import '../hero/hero.css';
import { ThemeToggle } from './ThemeToggle';

/*
 * The one bar every page wears: the wordmark, the six pages, one action. On the home page it
 * drops in after the hero; elsewhere it is simply there.
 */

export const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Attend', href: '/attend' },
  { label: 'Venue', href: '/venue' },
];

// placeholder until the report page exists
export const REPORT = '#report';

export function SiteNav({ current, entrance = false }: { current?: string; entrance?: boolean }) {
  const enter = entrance
    ? {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 1, duration: 0.8, ease: EASE_OUT },
      }
    : {};

  return (
    <motion.header className="hero__nav" {...enter}>
      <Link className="hero__mark" href="/">
        PyCon Cameroon
      </Link>
      <nav aria-label="Main">
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={n.href === current ? 'page' : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
      <a className="hero__button hero__button--small" href={REPORT}>
        View the 2026 Report
      </a>
    </motion.header>
  );
}
