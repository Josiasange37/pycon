'use client';

import { useMemo, useState } from 'react';
import { SPEAKERS, TOPICS, type Topic } from '../content/speakers2026';

const complete = (s: string) => s && !s.trim().endsWith('…');
const SORTED = [...SPEAKERS].sort((a, b) => a.name.localeCompare(b.name));

/** The 2026 speakers as a typographic wall, filterable by topic. */
export default function SpeakerWall() {
  const [topic, setTopic] = useState<Topic | 'All'>('All');
  const counts = useMemo(() => {
    const c = new Map<string, number>();
    SPEAKERS.forEach((s) => s.topics.forEach((t) => c.set(t, (c.get(t) ?? 0) + 1)));
    return c;
  }, []);
  const shown = topic === 'All' ? SORTED : SORTED.filter((s) => s.topics.includes(topic));

  return (
    <div className="wall">
      <div className="wall__filters" role="group" aria-label="Filter by topic">
        {(['All', ...TOPICS.filter((t) => counts.get(t))] as const).map((t) => (
          <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>
            {t} <span className="mono">{t === 'All' ? SPEAKERS.length : counts.get(t)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} speakers shown
      </p>
      <ul className="wall__list">
        {shown.map((s) => (
          <li key={s.name}>
            <span className="wall__initial" aria-hidden="true">
              {s.name[0]}
            </span>
            <div>
              <p className="wall__name">{s.name}</p>
              {complete(s.talk) && <p className="wall__talk serif">{s.talk}</p>}
              <p className="wall__topic mono">{s.topics.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
