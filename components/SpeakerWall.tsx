'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { SPEAKERS, SPEAKER_PHOTOS_2026, TOPICS, type Topic } from '../content/speakers2026';
import { Weave } from './Weave';

const complete = (value: string) => value && !value.trim().endsWith('…');
const SORTED = [...SPEAKERS].sort((a, b) => a.name.localeCompare(b.name));
const COUNTS = new Map<string, number>();
SPEAKERS.forEach((speaker) => speaker.topics.forEach((topic) => COUNTS.set(topic, (COUNTS.get(topic) ?? 0) + 1)));

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const normalise = (value: string) => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function SpeakerWall() {
  const [topic, setTopic] = useState<Topic | 'All'>('All');
  const [query, setQuery] = useState('');
  const normalizedQuery = normalise(query.trim());

  const shown = useMemo(
    () =>
      SORTED.filter((speaker) => {
        const matchesTopic = topic === 'All' || speaker.topics.includes(topic);
        const searchable = normalise([speaker.name, speaker.role, speaker.talk, ...speaker.topics].join(' '));
        return matchesTopic && (!normalizedQuery || searchable.includes(normalizedQuery));
      }),
    [normalizedQuery, topic],
  );

  const hasFilters = topic !== 'All' || query.length > 0;

  return (
    <div className="wall">
      <div className="wall__toolbar">
        <label className="wall__search">
          <span className="wall__search-label">Find a speaker or talk</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try ‘Django’ or a name"
            autoComplete="off"
          />
        </label>
        <p className="wall__status" aria-live="polite">
          <span className="wall__status-count">{shown.length}</span>
          <span>of {SPEAKERS.length} speakers</span>
        </p>
      </div>

      <div className="wall__topic-head">
        <p className="wall__topic-label">Browse by topic</p>
        {hasFilters && (
          <button
            className="wall__reset"
            type="button"
            onClick={() => {
              setTopic('All');
              setQuery('');
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="wall__filters" role="group" aria-label="Filter speakers by topic">
        {(['All', ...TOPICS.filter((item) => COUNTS.get(item))] as const).map((item) => (
          <button key={item} type="button" aria-pressed={topic === item} onClick={() => setTopic(item)}>
            <span>{item === 'All' ? 'All topics' : item}</span>
            <span className="mono">{item === 'All' ? SPEAKERS.length : COUNTS.get(item)}</span>
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <ul className="wall__list">
          {shown.map((speaker, index) => {
            const photo = SPEAKER_PHOTOS_2026[speaker.name];

            return (
              <li className="wall-card" key={speaker.name} data-reveal>
                <div className={`wall-card__print wall-card__print--${index % 3}`}>
                  <div className={`wall-card__portrait${photo ? '' : ' wall-card__portrait--placeholder'}`}>
                    {photo ? (
                      <Image
                        className="wall-card__photo"
                        src={photo}
                        alt={`Photo of ${speaker.name}`}
                        fill
                        sizes="(min-width: 1060px) 30vw, (min-width: 620px) 46vw, calc(100vw - 40px)"
                      />
                    ) : (
                      <span className="wall-card__monogram" aria-hidden="true">
                        {initials(speaker.name)}
                      </span>
                    )}
                    <div className="wall-card__portrait-brand" aria-hidden="true">
                      <span className="wall-card__edition">PyCon Cameroon · 2026</span>
                      <Weave accent className="wall-card__weave" />
                    </div>
                  </div>
                </div>
                <div className="wall-card__text">
                  <p className="wall-card__meta mono">{speaker.topics.join(' · ')}</p>
                  <h3 className="wall-card__name h3">{speaker.name}</h3>
                  {complete(speaker.role) && <p className="wall-card__role muted">{speaker.role}</p>}
                  {complete(speaker.talk) && <p className="wall-card__talk serif">“{speaker.talk}”</p>}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="wall__empty">
          <p>No speakers match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setTopic('All');
              setQuery('');
            }}
          >
            Show all speakers
          </button>
        </div>
      )}
    </div>
  );
}
