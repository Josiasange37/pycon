'use client';

import { motion } from 'motion/react';
import { ART } from '../splash/art';
import { useRise } from './SectionHead';

// the hands from the splash come back to wave goodbye
const HANDS = ART.hands.slice(0, 7);

export default function Thanks() {
  const rise = useRise();
  return (
    <section className="thanks" aria-labelledby="thanks-title">
      <div className="thanks__inner">
        <motion.h2 id="thanks-title" {...rise(0)}>
          Thank you for the 2026 edition!
        </motion.h2>
        <motion.p {...rise(1)}>
          PyCon & UbuCon Cameroon 2026 is a wrap. Relive the three days, the numbers and the faces in our report, and
          help us build the next edition.
        </motion.p>
        <motion.div className="thanks__actions" {...rise(2)}>
          <a className="btn btn--light" href="#report">
            View the 2026 Report
          </a>
          <a className="btn btn--line-light" href="#sponsorship">
            Sponsorship prospectus
          </a>
        </motion.div>
      </div>

      <div className="thanks__hands" aria-hidden="true">
        {HANDS.map((h, i) => (
          <motion.img
            key={h.image}
            src={`/splash/art/${h.image}.webp`}
            alt=""
            loading="lazy"
            draggable={false}
            initial={{ y: '70%' }}
            whileInView={{ y: '28%' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 + Math.abs(i - 3) * 0.07, type: 'spring', stiffness: 80, damping: 14 }}
          />
        ))}
      </div>
    </section>
  );
}
