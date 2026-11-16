import type { Metadata } from 'next';
import Image from 'next/image';
import ProgrammeArchive from '../../components/ProgrammeArchive';
import { KeyDates } from '../../components/ui';
import { Out, Title, Weave } from '../../components/Weave';
import { EDITION_2026, FORMATS_2026, LANGUAGES_2026, STATS_2026 } from '../../content/edition2026';
import { LINKS, SITE, SOCIAL, STATUS } from '../../lib/site';
import './agenda.css';

export const metadata: Metadata = {
  title: 'Programme',
  description:
    'The PyCon Cameroon 2027 programme for Douala is being prepared. See exactly how a day runs and explore the full 2026 timetable.',
};

const DAY_ONE = [
  { from: '08:30', to: '09:00', label: 'Welcome', kind: 'break' },
  { from: '09:00', to: '10:00', label: 'Opening + keynote', kind: 'keynote' },
  { from: '10:00', to: '11:10', label: 'Coffee break', kind: 'break' },
  { from: '11:10', to: '12:25', label: 'Talks · 3 rooms', kind: 'talk' },
  { from: '12:25', to: '13:35', label: 'Lunch', kind: 'break' },
  { from: '13:35', to: '14:50', label: 'Talks', kind: 'talk' },
  { from: '14:50', to: '15:50', label: 'Coffee break', kind: 'break' },
  { from: '15:50', to: '17:15', label: 'Workshop + community', kind: 'workshop' },
];

const FORMATS_MAX = Math.max(...FORMATS_2026.map((item) => item.value));
const LANGUAGES_MAX = Math.max(...LANGUAGES_2026.map((item) => item.value));

export default function ProgrammePage() {
  return (
    <>
      {/* Hero — the homepage's Wouri field, in its own composition. */}
      <section className="program-hero f-river" aria-labelledby="programme-title">
        <Weave className="wv-corner wv-corner--tr" />
        <div className="wrap program-hero__in">
          <div className="program-hero__text">
            <p className="program-hero__eyebrow" data-hero>
              PyCon Cameroon · Douala
            </p>
            <h1 className="program-hero__title" id="programme-title">
              <span className="line-mask">
                <span className="program-hero__line" data-hero-line>
                  Programme
                </span>
              </span>
              <span className="line-mask">
                <span className="program-hero__line program-hero__line--sun" data-hero-line>
                  2027.
                </span>
              </span>
            </h1>
            <div className="program-hero__lede" data-hero>
              <p>
                The 2027 dates and session list are still to come — they will be announced on this page
                first. Until then: exactly how a PyCon Cameroon day runs, hour by hour, from the
                published 2026 timetable.
              </p>
            </div>
            <div className="program-hero__actions" data-hero>
              <a className="wv-btn wv-btn--sun" href="#archive-2026">
                The 2026 archive <Out />
              </a>
              <a className="wv-btn wv-btn--line" href="#day-shape">
                How a day runs <Out />
              </a>
            </div>
            <dl className="program-hero__facts" data-hero>
              <div>
                <dt>City</dt>
                <dd>
                  {SITE.city}, {SITE.country}
                </dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>{SITE.dates?.label ?? 'To be announced'}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{SITE.venue?.name ?? 'To be announced'}</dd>
              </div>
            </dl>
          </div>
          <div className="program-hero__stage" data-hero>
            <figure className="program-hero__figure">
              <Image
                className="program-hero__statue"
                src="/hero/statue-woven.webp"
                alt=""
                width={632}
                height={1514}
                priority
                sizes="(max-width: 980px) 52vw, 400px"
              />
              <span className="wv-stk wv-stk--sun program-hero__stk program-hero__stk--status">
                {STATUS.schedule === 'published' ? 'Programme published' : 'Programme in preparation'}
              </span>
              <span className="wv-stk wv-stk--paper program-hero__stk program-hero__stk--place">
                Douala · 2027
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* The rhythm of one real day, from the 2026 archive. */}
      <section className="program-shape f-paper" id="day-shape" aria-labelledby="shape-title">
        <Weave className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="split-head">
            <div className="split-head__side">
              <p className="split-head__text" data-reveal>
                Thursday 17 September 2026 in Yaoundé — one real day from the published timetable. The
                strip reads left to right: 8 h 45 min from welcome coffee to community hour, with real
                breaks in between to meet people.
              </p>
              <ul className="program__legend" data-reveal>
                <li>
                  <span className="program__legend-dot program__legend-dot--keynote" />
                  Keynote
                </li>
                <li>
                  <span className="program__legend-dot program__legend-dot--talk" />
                  Talks
                </li>
                <li>
                  <span className="program__legend-dot program__legend-dot--workshop" />
                  Workshop
                </li>
                <li>
                  <span className="program__legend-dot program__legend-dot--break" />
                  Break
                </li>
              </ul>
            </div>
            <Title className="split-head__title" id="shape-title" lead="How a day" main="runs." />
          </header>
          <div className="program__flow">
            {DAY_ONE.map((item) => (
              <div
                className={`program__flow-stop program__flow-stop--${item.kind}`}
                key={item.from}
                style={{ flexGrow: timeInMinutes(item.to) - timeInMinutes(item.from), flexBasis: 0 }}
                title={`${item.from}–${item.to} · ${item.label}`}
              >
                <span className="program__flow-time">{item.from}</span>
                <span className="program__flow-label">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="program__flow-caption">
            <span className="mono">08:30</span>
            <p>8 h 45 min together, including time to meet between sessions.</p>
            <span className="mono">17:15</span>
          </div>
        </div>
      </section>

      {/* The road to Douala, in the night field. */}
      <section className="program-dates f-night" aria-labelledby="dates-title">
        <div className="wrap program-dates__in">
          <header className="program-dates__head">
            <Title id="dates-title" lead="What happens" main="when." />
            <p className="program-dates__note" data-reveal>
              The road to Douala, step by step. Every confirmed date lands on this page first.
            </p>
            <Weave accent className="program-dates__weave" />
          </header>
          <KeyDates />
        </div>
        <p className="program-dates__foot wrap" data-reveal>
          The call for proposals, ticket sales and the 2027 timetable will be announced here when
          confirmed.
        </p>
      </section>

      {/* The 2026 archive, hour by hour. */}
      <section className="program-archive f-river" id="archive-2026" aria-labelledby="archive-title">
        <Weave className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="split-head">
            <div className="split-head__side">
              <p className="split-head__text" data-reveal>
                {EDITION_2026.city} · {EDITION_2026.dates} — the last edition. Day 1 has its full
                timetable; the other days list their confirmed keynote.
              </p>
              <a
                className="wv-btn wv-btn--line program__source-link"
                href={LINKS.agenda2026}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                Open the full 2026 agenda <Out />
              </a>
            </div>
            <Title className="split-head__title" id="archive-title" lead="The 2026" main="archive." />
          </header>
          <ProgrammeArchive />
          <p className="program__archive-note" data-reveal>
            Days 2 and 3 show the keynote recorded in the archive; the available archive does not list
            its time or the rest of those days’ schedules.
          </p>
        </div>
      </section>

      {/* What 2026 was, in numbers. */}
      <section className="program-recap f-paper" aria-labelledby="recap-title">
        <Weave className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="split-head">
            <div className="split-head__side">
              <p className="split-head__text" data-reveal>
                What the 2026 edition actually was — the numbers behind the programme, from the
                post-event report.
              </p>
            </div>
            <Title className="split-head__title" id="recap-title" lead="2026 in" main="numbers." />
          </header>
          <div className="program__recap-grid">
            <dl
              className="program__stats"
              aria-label="PyCon Cameroon 2026 attendance and programme statistics"
              data-stagger
            >
              {STATS_2026.map((stat) => (
                <div className="program__stat" key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
            <div className="program__breakdown">
              <div className="program__breakdown-group">
                <h3>Sessions by format</h3>
                {FORMATS_2026.map((item) => (
                  <div className="program__bar-row" key={item.label}>
                    <span>{item.label}</span>
                    <span className="program__bar-track" aria-hidden="true">
                      <span
                        className="program__bar-fill"
                        style={{ width: `${(item.value / FORMATS_MAX) * 100}%` }}
                      />
                    </span>
                    <span className="program__bar-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="program__breakdown-group">
                <h3>Session languages</h3>
                {LANGUAGES_2026.map((item) => (
                  <div className="program__bar-row" key={item.label}>
                    <span>{item.label}</span>
                    <span className="program__bar-track" aria-hidden="true">
                      <span
                        className="program__bar-fill program__bar-fill--sun"
                        style={{ width: `${(item.value / LANGUAGES_MAX) * 100}%` }}
                      />
                    </span>
                    <span className="program__bar-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <a className="wv-btn wv-btn--line program__report-link" href="/report/2026">
                Read the 2026 report <Out />
              </a>
            </div>
          </div>
          <p className="program__source-note">Session and attendance figures are from the PyCon Cameroon 2026 report.</p>
        </div>
      </section>

      {/* The sun field closes the page, like the hero's last paper label. */}
      <section className="program-finale f-sun" aria-labelledby="finale-title">
        <div className="wrap program-finale__in">
          <Title className="program-finale__title" id="finale-title" lead="See you in" main="Douala." />
          <div className="program-finale__side">
            <p className="program-finale__text" data-reveal>
              The 2027 programme will be announced on this page first. Want a nudge when it lands?
              Write to us, or say hello in the community.
            </p>
            <div className="program-finale__actions" data-reveal>
              <a className="wv-btn wv-btn--ink" href={LINKS.mail('Programme for PyCon Cameroon 2027')}>
                Ask about the programme <Out />
              </a>
              <a className="wv-btn wv-btn--line" href={SOCIAL[0].href}>
                WhatsApp community <Out />
              </a>
            </div>
            <ul className="program-finale__social" data-reveal>
              {SOCIAL.map((item) => (
                <li key={item.short}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function timeInMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
