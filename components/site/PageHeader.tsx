'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '../splash/wall';
import { SiteNav } from './Nav';
import './page.css';

/*
 * The top of every inner page: the menu, then the page's title written on the cave wall,
 * the same stone the home page opens on.
 */
export function PageHeader({ current, lead, accent, sub }: { current: string; lead: string; accent: string; sub: string }) {
  const reduced = useReducedMotion() ?? false;
  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1 + i * 0.09, duration: 0.9, ease: EASE_OUT },
  });

  return (
    <div className="page-top">
      <SiteNav current={current} />
      <div className="page-top__title">
        <motion.h1 {...rise(0)}>
          {lead} <span className="sec-head__accent">{accent}</span>
        </motion.h1>
        <motion.span className="sec-head__mark" aria-hidden="true" {...rise(1)} />
        <motion.p {...rise(2)}>{sub}</motion.p>
      </div>
    </div>
  );
}
