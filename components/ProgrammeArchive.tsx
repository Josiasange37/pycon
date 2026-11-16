'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { DAYS, duration } from '../content/schedule2026';

export default function ProgrammeArchive() {
  const [activeDay, setActiveDay] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const day = DAYS[activeDay];

  function handleTabKey(event: KeyboardEvent<HTMLDivElement>) {
    let next = activeDay;
    if (event.key === 'ArrowRight') next = (activeDay + 1) % DAYS.length;
    else if (event.key === 'ArrowLeft') next = (activeDay - 1 + DAYS.length) % DAYS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = DAYS.length - 1;
    else return;

    event.preventDefault();
    setActiveDay(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="program__archive-ui">
      <div className="program__day-tabs" role="tablist" aria-label="Choose a day from the 2026 programme archive" onKeyDown={handleTabKey}>
        {DAYS.map((item, index) => (
          <button
            aria-controls="program-day-panel"
            aria-selected={activeDay === index}
            className="program__day-tab"
            id={`program-day-tab-${item.id}`}
            key={item.id}
            onClick={() => setActiveDay(index)}
            ref={(element) => { tabRefs.current[index] = element; }}
            role="tab"
            tabIndex={activeDay === index ? 0 : -1}
            type="button"
          >
            <span className="program__tab-number">0{index + 1}</span>
            <span className="program__tab-label">{item.label}</span>
            <span className="program__tab-date">{item.date.replace(', 2026', '')}</span>
          </button>
        ))}
      </div>

      <section
        aria-labelledby={`program-day-tab-${day.id}`}
        className="program__day-panel"
        id="program-day-panel"
        key={day.id}
        role="tabpanel"
        tabIndex={0}
      >
        <div className="program__day-heading">
          <div>
            <p className="program__edition-label">PyCon Cameroon 2026 · {day.label}</p>
            <h3>{day.date}</h3>
          </div>
          <span className={`program__day-status ${day.complete ? 'program__day-status--complete' : ''}`}>
            {day.complete ? 'Full timetable' : 'Keynote listed'}
          </span>
        </div>

        <ol className="program__timeline">
          {day.slots.map((slot, index) => {
            if (slot.type === 'break') {
              return (
                <li className="program__slot program__slot--break" key={`${day.id}-break-${index}`}>
                  <div className="program__slot-time">
                    <time>{slot.start}</time>
                    {slot.end && <span>to {slot.end}</span>}
                  </div>
                  <p>{slot.label}</p>
                </li>
              );
            }

            const start = slot.start ?? slot.sessions[0]?.start;
            const end = slot.sessions[0]?.end;
            return (
              <li className="program__slot program__slot--sessions" key={`${day.id}-sessions-${index}`}>
                <div className="program__slot-time">
                  {start ? <time>{start}</time> : <span className="program__time-tbc">Time TBC</span>}
                  {end && <span>to {end}</span>}
                  {start && end && <small>{duration(start, end)}</small>}
                </div>
                <ul className="program__session-list">
                  {slot.sessions.map((session, sessionIndex) => (
                    <li className={`program__session program__session--${session.kind}`} key={`${session.title}-${sessionIndex}`}>
                      <div className="program__session-topline">
                        <span className={`program__kind program__kind--${session.kind}`}>{session.kind}</span>
                        {session.lang && <span className="program__language">{session.lang}</span>}
                      </div>
                      <h4>{session.title}</h4>
                      {session.speaker && <p className="program__speaker">{session.speaker}</p>}
                      <div className="program__session-meta">
                        {session.room && <span>{session.room}</span>}
                        {session.topic && <span>{session.topic}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
