'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { KEYNOTES_2026 } from '../content/edition2026';
import { SPEAKERS } from '../content/speakers2026';
import { DAYS, duration } from '../content/schedule2026';
import type { Day, Session } from '../content/schedule2026';

const SPEAKER_PHOTOS: Record<string, string> = {
  'Sarah Abderemane': '/2026/day1-02.webp',
  'Adonis Simo': '/2026/day2-04.webp',
  'Veliswa Boya': '/2026/day3-02.webp',
  'Yunwen Eric': '/speakers/Yunwen_Eric.webp',
  'Johnpaul Hampo': '/speakers/Johnpaul_Hampo.webp',
  'Adrien Sani': '/speakers/Adrien_Sani.webp',
  'Linuce Demanou': '/speakers/Linuce_Demanou.webp',
  'Lobga Julius': '/speakers/Lobga_Julius.webp',
  'Ndongmo Christian': '/speakers/Ndongmo_Christian.webp',
  'Parkson Tano Daniel': '/speakers/Parkson_Tano_Daniel.webp',
  'Tayo Tate Desmond': '/speakers/Tayo_Tate_Desmond_Corentin.webp',
  'Claude Ndanda': '/speakers/Claude_Ndanda.webp',
  'Marcela Djoukouo Talotsing': '/speakers/Marcela_Djoukouo_Talotsing.webp',
  'Patrick Nounga': '/speakers/Patrick_Nounga.webp',
  'Sema Kumbela Fombutu': '/speakers/Sema_Kumbela_Fombutu.webp',
  'Muluh Azinwi Success Ndahili': '/speakers/Muluh_Azinwi_Success_Ndahili.webp',
  'Edmond Makolle': '/speakers/Edmond_Makolle.webp',
  'Steve Yonkeu': '/speakers/Steve_Yonkeu.webp',
  'Daniele Procida': '/speakers/Daniele_Procida.webp',
  'Pedro Leão da Cruz': '/speakers/Pedro_Leao_da_Cruz.webp',
  'Jean Marc Wogue': '/speakers/Jean_Marc_Wogue.webp',
  'Ariane Djeupang J.': '/speakers/Ariane_Djeupang_J.webp',
  'Hypolit Zeuchieu': '/speakers/Hypolit_Zeuchieu.webp',
  'Brandon Kamga': '/speakers/Brandon_Kamga.webp',
  'Yannik Kadjie': '/speakers/Yannik_Kadjie.webp',
  'Jerry Davis Ndjana Mengue': '/speakers/Jerry_Davis_Ndjana_Mengue.webp',
  'Marielle Daha': '/speakers/Marielle_Daha.webp',
  'Emambou Ulrich': '/speakers/Emambou_Ulrich.webp',
  'Leslye Nkwa': '/speakers/Leslye_Nkwa.webp',
  'Marc Daha': '/speakers/Marc_Daha.webp',
  'Mvenyi Donald': '/speakers/Mvenyi_Donald.webp',
  'Ayuk Princelen Tanyi': '/speakers/Ayuk_Princelen_Tanyi.webp',
  'Chifen Sama': '/speakers/Chifen_Sama.webp',
  'Samuel Tiokeng': '/speakers/Samuel_Tiokeng.webp',
};

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const normaliseName = (name: string) =>
  name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

type SpeakerProfile = { role?: string; topics?: readonly string[] };

const speakerProfiles = new Map<string, SpeakerProfile>(
  [
    ...SPEAKERS.map((speaker) => [speaker.name, { role: speaker.role, topics: speaker.topics }] as const),
    ...KEYNOTES_2026.map((speaker) => [speaker.name, { role: speaker.role }] as const),
  ].map(([name, role]) => [normaliseName(name), role] as const),
);

function speakerProfile(name: string) {
  const normalized = normaliseName(name);
  const exact = speakerProfiles.get(normalized);
  const prefixMatch = exact ?? [...speakerProfiles].find(([profileName]) => profileName.startsWith(normalized))?.[1];
  if (!prefixMatch) return undefined;

  return {
    role: prefixMatch.role && !/(?:…|\.\.\.)$/.test(prefixMatch.role.trim()) ? prefixMatch.role : undefined,
    topics: prefixMatch.topics,
  };
}

const shortDate = (date: string) => {
  const match = date.match(/, ([A-Za-z]+) (\d+), \d{4}$/);
  return match ? `${match[1].slice(0, 3)} ${match[2]}` : date;
};

function ActivityIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const kind = normalized.includes('registration') || normalized.includes('welcome')
    ? 'registration'
    : normalized.includes('lunch')
      ? 'meal'
      : normalized.includes('coffee')
        ? 'coffee'
        : normalized.includes('community') || normalized.includes('social')
          ? 'community'
          : 'event';

  return (
    <span className={`program__activity-icon program__activity-icon--${kind}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'registration' && <>
          <rect x="5" y="4" width="14" height="17" rx="1" />
          <path d="M9 4V2.5h6V4M9 9h6M9 13h6M9 17h3" />
        </>}
        {kind === 'meal' && <>
          <path d="M6 3v6M3.5 3v4a2.5 2.5 0 0 0 5 0V3M6 9v12M16 3v18M16 3c2.8 2.2 3.5 5.1 3.5 8H16" />
        </>}
        {kind === 'coffee' && <>
          <path d="M4 8h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 4c-1-1 1-1.5 0-2.5M12 4c-1-1 1-1.5 0-2.5" />
        </>}
        {kind === 'community' && <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1a6 6 0 0 1 12 0v1M17 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6V20" />
        </>}
        {kind === 'event' && <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>}
      </svg>
    </span>
  );
}

function SpeakerAvatar({ name, large = false }: { name: string; large?: boolean }) {
  const photo = SPEAKER_PHOTOS[name];
  const sizeClass = large ? ' program__speaker-avatar--large' : '';

  if (photo) {
    return <Image className={`program__speaker-avatar${sizeClass}`} src={photo} alt="" width={large ? 112 : 38} height={large ? 112 : 38} />;
  }

  return <span className={`program__speaker-avatar program__speaker-avatar--initials${sizeClass}`} aria-hidden="true">{initials(name)}</span>;
}

function SpeakerPortrait({ name }: { name: string }) {
  const photo = SPEAKER_PHOTOS[name];

  if (photo) {
    return <Image className="program-detail__portrait-image" src={photo} alt="" width={640} height={800} sizes="(min-width: 900px) 38vw, 100vw" />;
  }

  return <span className="program-detail__portrait-image program-detail__portrait-image--initials" aria-hidden="true">{initials(name)}</span>;
}

function HallIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2.5 7.5 7.5-4.25 7.5 4.25v1h-15v-1Z" />
      <path d="M4.5 9v6.25M8 9v6.25M12 9v6.25M15.5 9v6.25M3 15.75h14M2.25 18h15.5" />
    </svg>
  );
}

export default function ProgrammeSchedule() {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<{ day: Day; session: Session } | null>(null);
  const [openingKey, setOpeningKey] = useState<string | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const day = DAYS[activeDay];

  function openSession(sessionDay: Day, session: Session, key: string) {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpeningKey(key);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150;
    openTimerRef.current = setTimeout(() => {
      setSelectedProgram({ day: sessionDay, session });
      setOpeningKey(null);
      openTimerRef.current = null;
    }, delay);
  }

  function closeSession() {
    setSelectedProgram(null);
  }

  function handleTabKey(event: ReactKeyboardEvent<HTMLDivElement>) {
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

  useEffect(() => () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
  }, []);

  useEffect(() => {
    if (!selectedProgram) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleDialogKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedProgram(null);
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleDialogKey);
    return () => {
      document.removeEventListener('keydown', handleDialogKey);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [selectedProgram]);

  const selectedSpeakers = selectedProgram
    ? selectedProgram.session.speakers ?? (selectedProgram.session.speaker ? [selectedProgram.session.speaker] : [])
    : [];
  const featuredSpeaker = selectedSpeakers[0];
  const featuredProfile = featuredSpeaker ? speakerProfile(featuredSpeaker) : undefined;

  return (
    <div className="program__agenda-ui">
      <div className="program__day-tabs" role="tablist" aria-label="Choose a programme day" onKeyDown={handleTabKey}>
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
            <span className="program__tab-label">{item.label}</span>
            <span className="program__tab-date">{shortDate(item.date)}</span>
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
            <p className="program__edition-label">{day.subtitle ?? `PyCon Cameroon 2026 · ${day.label}`}</p>
            <h2>{day.date}</h2>
          </div>
          <span className={`program__day-status ${day.complete ? 'program__day-status--complete' : ''}`}>
            {day.complete ? 'Full timetable' : 'Schedule details coming soon'}
          </span>
        </div>
        <p className="program__agenda-note">
          Each session shows its start time, end time and duration. A 5-minute transition is scheduled between presentations.
        </p>

        <ol className="program__timeline">
          {day.slots.map((slot, index) => {
            if (slot.type === 'break') {
              return (
                <li className="program__slot program__slot--break" key={`${day.id}-break-${index}`}>
                  <div className="program__slot-time">
                    <time dateTime={slot.start}>{slot.start}</time>
                    {slot.end && <span>to {slot.end}</span>}
                  </div>
                  <div className="program__break-content">
                    <ActivityIcon label={slot.label} />
                    <p>{slot.label}</p>
                  </div>
                </li>
              );
            }

            const start = slot.start ?? slot.sessions[0]?.start;
            const sessionListModifier = slot.sessions.length > 1
              ? `program__session-list--${slot.sessions.length}`
              : '';
            return (
              <li className="program__slot program__slot--sessions" key={`${day.id}-sessions-${index}`}>
                <div className="program__slot-time">
                  {start ? <time dateTime={start}>{start}</time> : <span className="program__time-tbc">Time TBC</span>}
                </div>
                <ul className={`program__session-list ${sessionListModifier}`}>
                  {slot.sessions.map((session, sessionIndex) => {
                    const sessionKey = `${day.id}-${index}-${sessionIndex}`;
                    const speakers = session.speakers ?? (session.speaker ? [session.speaker] : []);

                    return (
                      <li key={`${session.title}-${sessionIndex}`}>
                        <button
                          aria-haspopup="dialog"
                          aria-label={`Open details for ${session.title}`}
                          className={`program__session program__session--${session.kind}${openingKey === sessionKey ? ' program__session--opening' : ''}`}
                          onClick={() => openSession(day, session, sessionKey)}
                          type="button"
                        >
                          <span className="program__session-topline">
                            <span aria-level={3} className="program__session-title" role="heading">{session.title}</span>
                            <span className={`program__kind program__kind--${session.kind}`}>{session.kind}</span>
                          </span>
                          {session.start && session.end && (
                            <span className="program__session-time">
                              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
                                <path d="M10 5.75v4.5l2.75 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <time dateTime={session.start}>{session.start}</time>–<time dateTime={session.end}>{session.end}</time>
                              <span>· {duration(session.start, session.end)}</span>
                            </span>
                          )}
                          {speakers.length > 0 && (
                            <span className="program__speaker-list">
                              {speakers.map((speaker) => (
                                <span className="program__speaker-line" key={speaker}>
                                  <SpeakerAvatar name={speaker} />
                                  <span className="program__speaker">{speaker}</span>
                                </span>
                              ))}
                            </span>
                          )}
                          <span className="program__session-meta">
                            {session.room && <span className="program__room"><HallIcon />{session.room}</span>}
                            {session.topic && <span>{session.topic}</span>}
                            {session.lang && <span className="program__language">{session.lang}</span>}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      {selectedProgram && typeof document !== 'undefined' && createPortal(
        <div className="program-detail-overlay" role="presentation">
          <aside
            aria-labelledby="program-detail-title"
            aria-modal="true"
            className="program-detail"
            role="dialog"
          >
            <section
              aria-label={selectedSpeakers.length > 0 ? 'Speaker profile' : 'Session artwork'}
              className="program-detail__visual"
            >
              <svg className="program-detail__weave" viewBox="0 0 600 760" fill="none" aria-hidden="true">
                <path d="M-70 176C91 53 206 74 292 174s154 118 274 26 155-131 224-76" />
                <path d="M-82 350c132 121 244 127 350 11s177-117 276-18 171 116 271 7" />
                <path d="M-70 541c124-126 243-139 357-26s175 136 283 29 174-125 264-29" />
                <circle cx="274" cy="157" r="6" />
                <circle cx="298" cy="341" r="6" />
                <circle cx="282" cy="527" r="6" />
              </svg>
              <div className="program-detail__visual-topline">
                <p className="program-detail__brand">PyCon Cameroon <span>·</span> 2026</p>
                <span className="program-detail__edition-mark">CM</span>
              </div>

              {featuredSpeaker ? (
                <>
                  <div className="program-detail__portrait-frame">
                    <SpeakerPortrait name={featuredSpeaker} />
                    <span className="program-detail__portrait-index">01 / {String(selectedSpeakers.length).padStart(2, '0')}</span>
                  </div>
                  <div className="program-detail__featured-person">
                    <p className="program-detail__side-label">
                      {selectedSpeakers.length > 1 ? 'Featured speaker' : 'Speaker'}
                    </p>
                    <h3>{featuredSpeaker}</h3>
                    {featuredProfile?.role && <p className="program-detail__role">{featuredProfile.role}</p>}
                    {featuredProfile?.topics && featuredProfile.topics.length > 0 && (
                      <ul className="program-detail__topics" aria-label={`${featuredSpeaker} topics`}>
                        {featuredProfile.topics.map((topic) => <li key={topic}>{topic}</li>)}
                      </ul>
                    )}
                  </div>
                  {selectedSpeakers.length > 1 && (
                    <div className="program-detail__lineup">
                      <p className="program-detail__side-label">Also on stage</p>
                      {selectedSpeakers.slice(1).map((speaker, index) => (
                        <div className="program-detail__lineup-person" key={speaker}>
                          <span className="program-detail__lineup-number">0{index + 2}</span>
                          <SpeakerAvatar name={speaker} />
                          <span>{speaker}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="program-detail__session-art">
                  <span className="program-detail__session-art-mark" aria-hidden="true">Py</span>
                  <p className="program-detail__side-label">Session format</p>
                  <h3>{selectedProgram.session.kind}</h3>
                  {selectedProgram.session.topic && <p>{selectedProgram.session.topic}</p>}
                </div>
              )}

              <p className="program-detail__visual-foot">Woven together in Cameroon</p>
            </section>

            <section className="program-detail__main">
              <div className="program-detail__topbar">
                <p className="program-detail__main-brand">Programme <span>·</span> {selectedProgram.day.label}</p>
                <button
                  aria-label="Close programme details"
                  className="program-detail__close"
                  onClick={closeSession}
                  ref={closeButtonRef}
                  type="button"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span>Close</span>
                </button>
              </div>

              <div className="program-detail__content">
                <header className="program-detail__intro">
                  <p className="program-detail__eyebrow">
                    {selectedProgram.day.subtitle ?? 'PyCon Cameroon'}
                    <span aria-hidden="true">·</span>
                    {selectedProgram.day.date}
                  </p>
                  <span className={`program__kind program__kind--${selectedProgram.session.kind}`}>
                    {selectedProgram.session.kind}
                  </span>
                  <h2 id="program-detail-title">{selectedProgram.session.title}</h2>
                  {selectedProgram.session.topic && (
                    <p className="program-detail__focus"><span>Talk focus</span>{selectedProgram.session.topic}</p>
                  )}
                </header>

                <section className="program-detail__facts" aria-labelledby="program-detail-facts-title">
                  <h3 id="program-detail-facts-title">Session details</h3>
                  <dl>
                    <div>
                      <dt>Time</dt>
                      <dd>
                        {selectedProgram.session.start && selectedProgram.session.end
                          ? `${selectedProgram.session.start} – ${selectedProgram.session.end}`
                          : 'Time to be announced'}
                      </dd>
                    </div>
                    {selectedProgram.session.start && selectedProgram.session.end && (
                      <div>
                        <dt>Duration</dt>
                        <dd>{duration(selectedProgram.session.start, selectedProgram.session.end)}</dd>
                      </div>
                    )}
                    <div>
                      <dt>Hall</dt>
                      <dd>{selectedProgram.session.room ?? 'To be announced'}</dd>
                    </div>
                    <div>
                      <dt>Language</dt>
                      <dd>{selectedProgram.session.lang}</dd>
                    </div>
                  </dl>
                </section>
              </div>
            </section>
          </aside>
        </div>,
        document.body,
      )}
    </div>
  );
}
