'use client';

import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useState } from 'react';
import { KEYNOTES } from '../sections/content';
import { SectionHead, useRise } from '../sections/SectionHead';
import { EASE_OUT } from '../splash/wall';
import { SPEAKERS, TOPICS, type Topic } from './speakers-data';
import './speakerspage.css';

/*
 * The keynotes first, as on the home page, then everyone else: a filter by topic and a
 * wall of names, each in an ochre oval painted in one of the wall's own pigments.
 */

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

// only the topics someone actually speaks on, most-filled first
const COUNTS = TOPICS.map((t) => ({ topic: t, count: SPEAKERS.filter((s) => s.topics.includes(t)).length }))
  .filter((t) => t.count > 0)
  .sort((a, b) => b.count - a.count);

export default function SpeakersPage() {
  const rise = useRise();
  const [topic, setTopic] = useState<Topic | null>(null);
  const shown = topic ? SPEAKERS.filter((s) => s.topics.includes(topic)) : SPEAKERS;

  return (
    <MotionConfig reducedMotion="user">
      <section className="sec speakers-keynotes" aria-labelledby="keynotes-title">
        <SectionHead id="keynotes-title" lead="Keynote" accent="Speakers" />
        <ol className="speakers__list">
          {KEYNOTES.map((k, i) => (
            <motion.li key={k.name} className="keynote" {...rise(i + 1)}>
              <div className="keynote__portrait">
                {k.photo ? (
                  <img src={k.photo} alt={`Portrait of ${k.name}`} loading="lazy" draggable={false} />
                ) : (
                  <div className="keynote__stone" aria-hidden="true">
                    <span>{initials(k.name)}</span>
                  </div>
                )}
              </div>
              <div className="keynote__body">
                <p className="keynote__when">
                  {k.day} keynote <span aria-hidden="true">·</span> {k.date}
                </p>
                <h3>{k.name}</h3>
                <p className="keynote__role">{k.role}</p>
                <p className="keynote__talk">{k.talk}</p>
                <p className="keynote__meta">
                  Room {k.room} <span aria-hidden="true">·</span>{' '}
                  <abbr title={k.lang === 'FR' ? 'In French' : 'In English'}>{k.lang}</abbr>
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="sec all-speakers" aria-labelledby="all-speakers-title">
        <SectionHead id="all-speakers-title" lead="All" accent="Speakers" sub="The rest of the people confirmed for PyCon Cameroon 2026." />

        <motion.div className="topics" role="group" aria-label="Filter speakers by topic" {...rise(3)}>
          <button type="button" className="topic" aria-pressed={topic === null} onClick={() => setTopic(null)}>
            All <span className="topic__count">{SPEAKERS.length}</span>
          </button>
          {COUNTS.map(({ topic: t, count }) => (
            <button key={t} type="button" className="topic" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t} <span className="topic__count">{count}</span>
            </button>
          ))}
        </motion.div>

        <p className="all-speakers__status" aria-live="polite">
          {topic ? `${shown.length} speaking on ${topic.toLowerCase()}` : `${shown.length} speakers`}
        </p>

        <motion.ul className="roster" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((s) => (
              <motion.li
                key={s.name}
                className="person"
                data-tint={SPEAKERS.indexOf(s) % 4}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <span className="person__oval" aria-hidden="true">
                  {initials(s.name)}
                </span>
                <h3>{s.name}</h3>
                <p className="person__role">{s.role}</p>
                <p className="person__talk">{s.talk}</p>
                <p className="person__topic">{s.topics.join(' · ')}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </MotionConfig>
  );
}
