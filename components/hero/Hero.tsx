'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ART } from '../splash/art';
import { Snakes } from '../splash/snakes';
import { EASE_OUT, Wall } from '../splash/wall';
import { REPORT, SiteNav } from '../site/Nav';
import './hero.css';

/*
 * The home page hero: the splash's cave wall, quieter. The wall is shifted so its empty
 * heart sits on the right, and the logo takes that place; the left stays calm stone for
 * the words. No hands here — the splash already told that part of the story.
 */

export const EVENT = {
  name: 'PyCon Cameroon',
  year: '2026',
  status: 'We’re done for 2026!',
  when: 'September 17th–19th, 2026',
  where: 'Yaoundé, Cameroon',
  line: 'Africa’s Python Conference, Reimagined in the Heart of Africa',
  report: REPORT,
  agenda: '/agenda',
};

const rise = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.55 + i * 0.09, duration: 1, ease: EASE_OUT },
});

export default function Hero({ onReplay }: { onReplay?: () => void }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* the wall, moved so its empty heart frames the logo on the right */}
      <motion.div
        className="hero__wall"
        initial={reduced ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 1.4, ease: 'easeOut' }, scale: { duration: 2.6, ease: EASE_OUT } }}
        aria-hidden="true"
      >
        <div className="hero__stage">
          <Wall start={0} />
          <Snakes play={false} reduced start={0} />
        </div>
      </motion.div>

      <motion.p
        className="hero__status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {EVENT.status}{' '}
        <a href={EVENT.report}>
          See how it went <span aria-hidden="true">→</span>
        </a>
      </motion.p>

      <SiteNav entrance />

      <div className="hero__body">
        <div className="hero__copy">
          <motion.h1 id="hero-title" {...rise(0)}>
            <span className="hero__name">{EVENT.name}</span> {EVENT.year}
          </motion.h1>
          <motion.p className="hero__line" {...rise(1)}>
            {EVENT.line}
          </motion.p>
          <motion.p className="hero__when" {...rise(2)}>
            <span className="hero__nowrap">{EVENT.when}</span> <span aria-hidden="true">·</span>{' '}
            <span className="hero__nowrap">{EVENT.where}</span>
          </motion.p>
          <motion.div className="hero__actions" {...rise(3)}>
            <a className="hero__button" href={EVENT.report}>
              View the 2026 Report
            </a>
            <a className="hero__link" href={EVENT.agenda}>
              View Agenda <span aria-hidden="true">→</span>
            </a>
          </motion.div>
          {onReplay && (
            <motion.button type="button" className="hero__replay" onClick={onReplay} {...rise(4)}>
              Replay the intro
            </motion.button>
          )}
        </div>

        <div className="hero__logo">
          <motion.img
            src={`/splash/art/${ART.logo.image}.webp`}
            alt="The Python logo, drawn in chalk and filled with woven fabric"
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.6, ease: EASE_OUT }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
