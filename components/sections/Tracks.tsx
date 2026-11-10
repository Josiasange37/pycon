'use client';

import { motion } from 'motion/react';
import { TRACKS } from './content';
import { useRise } from './SectionHead';

export default function Tracks() {
  const rise = useRise();
  return (
    <section className="sec tracks" id="tracks" aria-label="Tracks">
      {TRACKS.map((t) => (
        <article key={t.id} className="track" data-colour={t.colour} id={t.id} aria-labelledby={`${t.id}-title`}>
          <div className="track__story">
            <motion.p className="track__new" {...rise(0)}>
              New this year
            </motion.p>
            <motion.h2 id={`${t.id}-title`} {...rise(1)}>
              {t.name[0]} <span>{t.name[1]}</span>
            </motion.h2>
            {t.intro.map((p, i) => (
              <motion.p key={i} className="track__intro" {...rise(2 + i)}>
                {p}
              </motion.p>
            ))}
            <motion.div className="track__actions" {...rise(4)}>
              <a className="btn btn--track" href={t.speakers}>
                {t.name[0]} speakers
              </a>
              <a className="btn btn--line" href={t.join}>
                Join the {t.name[0]} track
              </a>
            </motion.div>
          </div>

          <motion.div className="track__panel" {...rise(2)}>
            <h3>Track highlights</h3>
            <ol>
              {t.highlights.map((h) => (
                <li key={h.title}>
                  <h4>{h.title}</h4>
                  <p>{h.body}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </article>
      ))}
    </section>
  );
}
