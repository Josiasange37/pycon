import type { Metadata } from 'next';
import { Arrow } from '../../components/Mark';
import { Head, PageIntro } from '../../components/ui';
import { FORMATS_2026, LANGUAGES_2026 } from '../../content/edition2026';
import { DAYS, duration } from '../../content/schedule2026';
import { LINKS, SITE } from '../../lib/site';
import '../pages.css';

export const metadata: Metadata = {
  title: 'Programme',
  description: 'The PyCon Cameroon 2027 programme is published after the call for proposals. See how the 2026 days ran in Yaoundé.',
};

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

// how a 2026 day was spent, from the Day 1 timetable
const STRIP = [
  { from: '08:30', to: '09:00', label: 'Registration', kind: 'break' },
  { from: '09:00', to: '10:00', label: 'Opening & keynote', kind: 'keynote' },
  { from: '10:00', to: '11:10', label: 'Coffee', kind: 'break' },
  { from: '11:10', to: '12:25', label: 'Talks, 3 rooms', kind: 'talk' },
  { from: '12:25', to: '13:35', label: 'Lunch', kind: 'break' },
  { from: '13:35', to: '14:50', label: 'Talks', kind: 'talk' },
  { from: '14:50', to: '15:50', label: 'Coffee', kind: 'break' },
  { from: '15:50', to: '16:55', label: 'Workshop', kind: 'workshop' },
  { from: '16:55', to: '17:15', label: 'Social', kind: 'break' },
];
const START = toMin('08:30');
const SPAN = toMin('17:15') - START;
const BREAKS = STRIP.filter((s) => s.kind === 'break').reduce((n, s) => n + toMin(s.to) - toMin(s.from), 0);

export default function ProgrammePage() {
  const day1 = DAYS[0];
  const maxF = Math.max(...FORMATS_2026.map((f) => f.value));
  const maxL = Math.max(...LANGUAGES_2026.map((f) => f.value));

  return (
    <>
      <PageIntro
        label="Programme"
        title={'Not published\nyet'}
        lede={<p>The 2027 timetable goes up here once the call for proposals has closed and talks are chosen. This is how the 2026 days ran.</p>}
      >
        <dl className="facts">
          <div>
            <dt>Status</dt>
            <dd>
              <span className="tag tag--soon">Not announced</span>
            </dd>
          </div>
          <div>
            <dt>Days</dt>
            <dd>To be announced</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>English, French, both</dd>
          </div>
          <div>
            <dt>Time zone</dt>
            <dd className="mono">{SITE.timezone} · UTC+1</dd>
          </div>
        </dl>
      </PageIntro>

      <section className="section wrap" aria-labelledby="shape-title">
        <Head label="The shape of a day" id="shape-title" title="08:30 to 17:15, in 2026" />
        <div className="strip" data-reveal>
          {STRIP.map((s) => (
            <div
              key={s.from}
              className={`strip__block strip__block--${s.kind}`}
              style={{ flexGrow: toMin(s.to) - toMin(s.from), flexBasis: 0 }}
              title={`${s.from}–${s.to} ${s.label}`}
            >
              <span className="mono">{s.from}</span>
              <span className="strip__label">{s.label}</span>
            </div>
          ))}
        </div>
        <ul className="strip__legend mono">
          <li data-kind="keynote">Keynote</li>
          <li data-kind="talk">Talks</li>
          <li data-kind="workshop">Workshop</li>
          <li data-kind="break">Breaks</li>
        </ul>
        <p className="muted strip__note">
          {(SPAN / 60).toFixed(1)} hours, {(BREAKS / 60).toFixed(1)} of them in breaks. That is on purpose: most people come for each other.
        </p>
      </section>

      <section className="section timetable-sec" aria-labelledby="tt-title">
        <div className="wrap">
          <Head
            label="2026 · Day 1"
            id="tt-title"
            title={day1.date.replace(', 2026', '')}
            aside={
              <a className="link" href={LINKS.agenda2026} target="_blank" rel="noreferrer">
                Full 2026 agenda <Arrow dir="out" />
              </a>
            }
          />
          <div className="tt" role="table" aria-label="Day 1 timetable, 2026">
            <div className="tt__row tt__row--head" role="row">
              <span role="columnheader">Time</span>
              <span role="columnheader">Session</span>
              <span role="columnheader">Room</span>
              <span role="columnheader">Lang</span>
            </div>
            {day1.slots.map((slot, i) =>
              slot.type === 'break' ? (
                <div className="tt__row tt__row--break" role="row" key={i}>
                  <span role="cell" className="mono">
                    {slot.start}
                    {slot.end ? `–${slot.end}` : ''}
                  </span>
                  <span role="cell">{slot.label}</span>
                  <span role="cell" />
                  <span role="cell" />
                </div>
              ) : (
                slot.sessions.map((s, j) => (
                  <div className={`tt__row tt__row--${s.kind}`} role="row" key={`${i}-${j}`}>
                    <span role="cell" className="mono tt__time">
                      {j === 0 ? `${s.start ?? ''}–${s.end ?? ''}` : ''}
                      {j === 0 && <small>{duration(s.start, s.end)}</small>}
                    </span>
                    <span role="cell" className="tt__session">
                      <span className="tt__kind mono">{s.kind}</span>
                      <strong>{s.title}</strong>
                      {s.speaker && <span className="muted">{s.speaker}</span>}
                    </span>
                    <span role="cell" className="tt__room">{s.room}</span>
                    <span role="cell">
                      <span className="tag">{s.lang}</span>
                    </span>
                  </div>
                ))
              ),
            )}
          </div>
          <p className="muted tt__note">Rooms in 2026 were named after Cameroonian dishes: Ndolè, Koki and Eru. Ndolè is a Sawa dish, from Douala.</p>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="mix-title">
        <div data-reveal>
          <p className="eyebrow">2026 in numbers</p>
          <h2 className="h2" id="mix-title">
            37 sessions, three languages of delivery
          </h2>
        </div>
        <div className="bars" data-reveal>
          <p className="eyebrow">Formats</p>
          {FORMATS_2026.map((f) => (
            <div className="bar-row" key={f.label}>
              <span>{f.label}</span>
              <span className="bar-row__track">
                <span className="bar-row__fill" style={{ width: `${(f.value / maxF) * 100}%` }} />
              </span>
              <span className="mono">{f.value}</span>
            </div>
          ))}
          <p className="eyebrow" style={{ marginTop: 32 }}>
            Language
          </p>
          {LANGUAGES_2026.map((f) => (
            <div className="bar-row" key={f.label}>
              <span>{f.label}</span>
              <span className="bar-row__track">
                <span className="bar-row__fill bar-row__fill--alt" style={{ width: `${(f.value / maxL) * 100}%` }} />
              </span>
              <span className="mono">{f.value}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
