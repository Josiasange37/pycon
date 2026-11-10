'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Fragment, useEffect, useState } from 'react';
import { EASE_OUT } from '../splash/wall';
import './zen.css';

/*
 * Between the splash and the hero: the dark the splash zoomed into, a prompt typing
 * `import this`, and one line of the Zen of Python answering it, word by word. Then the
 * page moves on by itself; a click or a key only hurries it.
 */

// lines from PEP 20 that read well on their own
const ZEN = [
  'Beautiful is better than ugly.',
  'Simple is better than complex.',
  'Readability counts.',
  'Now is better than never.',
  'Explicit is better than implicit.',
  'Flat is better than nested.',
  'Sparse is better than dense.',
  'Errors should never pass silently.',
  'In the face of ambiguity, refuse the temptation to guess.',
  'Special cases aren’t special enough to break the rules.',
];

const CODE = 'import this';
const TYPE_EVERY = 0.055;
const WORD_EVERY = 0.07;
const HOLD = 2.2;
const SEEN = 'pycon:zen';

/** A different line on every visit: walk the list from wherever the last visit stopped. */
function nextLine() {
  let i = Math.floor(Math.random() * ZEN.length);
  try {
    const last = Number(localStorage.getItem(SEEN));
    if (localStorage.getItem(SEEN) !== null && Number.isInteger(last)) i = (last + 1) % ZEN.length;
    localStorage.setItem(SEEN, String(i));
  } catch {
    // storage blocked: a random line is fine
  }
  return ZEN[i];
}

export default function Zen({ onLeave, onDone }: { onLeave?: () => void; onDone: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const [line] = useState(nextLine);
  const [typed, setTyped] = useState(reduced ? CODE.length : 0);
  const [leaving, setLeaving] = useState(false);
  const words = line.split(' ');

  const typing = typed < CODE.length;

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_EVERY * 1000);
    return () => clearTimeout(t);
  }, [typing, typed]);

  // the prompt is answered: the line arrives, holds, and the page moves on
  useEffect(() => {
    if (typing) return;
    const t = setTimeout(() => setLeaving(true), (words.length * WORD_EVERY + 0.8 + HOLD) * 1000);
    return () => clearTimeout(t);
  }, [typing, words.length]);

  useEffect(() => {
    if (leaving) onLeave?.();
  }, [leaving, onLeave]);

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') setLeaving(true);
    };
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, []);

  return (
    <motion.div
      className="zen"
      onClick={() => setLeaving(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={leaving ? { duration: 1.1, delay: 0.1, ease: [0.65, 0, 0.35, 1] } : { duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={() => leaving && onDone()}
    >
      <motion.figure
        className="zen__figure"
        initial={reduced ? false : { y: 14 }}
        animate={leaving && !reduced ? { y: -28, scale: 0.97 } : { y: 0, scale: 1 }}
        transition={leaving ? { duration: 1.2, ease: [0.65, 0, 0.35, 1] } : { duration: 0.9, ease: EASE_OUT }}
      >
        <pre className="zen__prompt" aria-label=">>> import this">
          <code>
            <span className="zen__chevrons">&gt;&gt;&gt; </span>
            <span className="zen__kw">{CODE.slice(0, Math.min(typed, 6))}</span>
            {CODE.slice(6, typed)}
            <span className="zen__caret" data-done={!typing} aria-hidden="true" />
          </code>
        </pre>

        <blockquote className="zen__line">
          <p aria-label={line}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="zen__word" aria-hidden="true">
                  <motion.span
                    initial={reduced ? false : { opacity: 0, y: '0.5em' }}
                    animate={typing ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * WORD_EVERY, duration: 0.8, ease: EASE_OUT }}
                  >
                    {w}
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
          </p>
        </blockquote>

        <motion.figcaption
          className="zen__cite"
          initial={{ opacity: 0, y: 8 }}
          animate={typing ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + words.length * WORD_EVERY, duration: 0.7, ease: EASE_OUT }}
        >
          Tim Peters
        </motion.figcaption>
      </motion.figure>
    </motion.div>
  );
}
