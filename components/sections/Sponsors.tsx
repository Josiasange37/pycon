'use client';

import { motion } from 'motion/react';
import { SPONSORS } from './content';
import { SectionHead, useRise } from './SectionHead';

/** The sponsors pass by slowly in one endless row; a hover holds them still. */
export default function Sponsors() {
  const rise = useRise();
  // twice over, so the row can loop without a seam
  const row = [...SPONSORS, ...SPONSORS];
  return (
    <section className="sec sponsors" id="sponsors" aria-labelledby="sponsors-title">
      <SectionHead id="sponsors-title" lead="Our" accent="Sponsors" sub="The organisations that made PyCon Cameroon 2026 possible." />

      <motion.div className="sponsors__rail" {...rise(2)}>
        <ul className="sponsors__track">
          {row.map((s, i) => (
            <li key={i} className="sponsor" aria-hidden={i >= SPONSORS.length || undefined}>
              {s}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div className="sec__more" {...rise(3)}>
        <a className="btn btn--line" href="/sponsors">
          See all our sponsors
        </a>
      </motion.div>
    </section>
  );
}
