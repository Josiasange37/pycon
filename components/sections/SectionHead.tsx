'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '../splash/wall';
import './sections.css';

/** Each part of a section rises once as it scrolls into view, a beat after the last. */
export function useRise() {
  const reduced = useReducedMotion() ?? false;
  return (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { delay: i * 0.09, duration: 0.9, ease: EASE_OUT },
  });
}

type Props = {
  id: string;
  lead: string;
  accent: string;
  sub?: string;
  align?: 'center' | 'start';
};

/** The house heading: the words, the ochre part, and a short stroke of ochre under it. */
export function SectionHead({ id, lead, accent, sub, align = 'center' }: Props) {
  const rise = useRise();
  return (
    <div className="sec-head" data-align={align}>
      <motion.h2 id={id} {...rise(0)}>
        {lead} <span className="sec-head__accent">{accent}</span>
      </motion.h2>
      <motion.span className="sec-head__mark" aria-hidden="true" {...rise(1)} />
      {sub && <motion.p {...rise(2)}>{sub}</motion.p>}
    </div>
  );
}
