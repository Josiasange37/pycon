'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { EASE_OUT } from '../splash/wall';
import { DAYS, duration, type Session } from './schedule';
import './agenda.css';

/*
 * The programme as a timeline, one day at a time. The chosen day lives in the address
 * (#day-2), so a day can be shared and the back button walks between days.
 */

const KIND_LABEL = { keynote: 'Keynote', talk: 'Talk', workshop: 'Workshop' } as const;

function dayFromHash() {
  const id = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
  const i = DAYS.findIndex((d) => d.id === id);
  return i < 0 ? 0 : i;
}

function SessionCard({ s }: { s: Session }) {
  const length = duration(s.start, s.end);
  return (
    <article className="session" data-kind={s.kind}>
      <p className="session__kind">{KIND_LABEL[s.kind]}</p>
      <h3>{s.title}</h3>
      <dl className="session__facts">
        {s.start && (
          <div>
            <dt>Time</dt>
            <dd>
              {s.start}–{s.end}
              {length && <span className="session__len"> · {length}</span>}
            </dd>
          </div>
        )}
        {s.speaker && (
          <div>
            <dt>Speaker</dt>
            <dd className="session__speaker">{s.speaker}</dd>
          </div>
        )}
        <div>
          <dt>Room</dt>
          <dd>{s.room}</dd>
        </div>
        {s.topic && (
          <div>
            <dt>Topic</dt>
            <dd>{s.topic}</dd>
          </div>
        )}
        <div>
          <dt>Language</dt>
          <dd>{s.lang}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function Agenda() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // follow the address: on arrival and when the visitor goes back or forward
  useEffect(() => {
    const sync = () => setActive(dayFromHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const choose = (i: number, focus = false) => {
    setActive(i);
    // replace, not push: switching days should not bury the page under history entries
    history.replaceState(null, '', `#${DAYS[i].id}`);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const last = DAYS.length - 1;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose((next + DAYS.length) % DAYS.length, true);
  };

  const day = DAYS[active];

  return (
    <section className="agenda" aria-label="Programme">
      <div className="agenda__days" role="tablist" aria-label="Conference days" onKeyDown={onKey}>
        {DAYS.map((d, i) => (
          <button
            key={d.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${d.id}`}
            tabIndex={i === active ? 0 : -1}
            className="agenda__day"
            onClick={() => choose(i)}
          >
            {i === active && !reduced && (
              <motion.span className="agenda__day-fill" layoutId="agenda-day" transition={{ type: 'spring', duration: 0.4, bounce: 0 }} />
            )}
            {i === active && reduced && <span className="agenda__day-fill" />}
            <span className="agenda__day-label">{d.label}</span>
            <span className="agenda__day-date">{d.date.split(', ')[1]}</span>
          </button>
        ))}
      </div>

      <p className="agenda__note">Each session shows its start and end time and its length. There are 5 minutes between talks.</p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={day.id}
          role="tabpanel"
          id={`panel-${day.id}`}
          aria-labelledby={`tab-${day.id}`}
          className="agenda__panel"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <h2 className="agenda__date">{day.date}</h2>

          <ol className="timeline">
            {day.slots.map((slot, i) =>
              slot.type === 'break' ? (
                <li key={i} className="timeline__break">
                  <span className="timeline__time">
                    {slot.start}
                    {slot.end && `–${slot.end}`}
                  </span>
                  <span className="timeline__label">{slot.label}</span>
                </li>
              ) : (
                <li key={i} className="timeline__slot">
                  <span className="timeline__time">{slot.start ?? 'Time to be confirmed'}</span>
                  <div className="timeline__sessions" data-count={slot.sessions.length}>
                    {slot.sessions.map((s) => (
                      <SessionCard key={s.title} s={s} />
                    ))}
                  </div>
                </li>
              ),
            )}
          </ol>

          {!day.complete && (
            <p className="agenda__pending">
              The full programme for {day.label} will be published here. For now, this is the keynote that opens the day.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
