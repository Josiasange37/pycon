import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '../../../components/Mark';
import { Figure, Head, PageIntro } from '../../../components/ui';
import { EDITION_2026, FORMATS_2026, KEYNOTES_2026, LANGUAGES_2026, PHOTOS, SPONSORS_2026, STATS_2026 } from '../../../content/edition2026';
import { LINKS } from '../../../lib/site';
import '../../pages.css';

export const metadata: Metadata = {
  title: '2026 edition report',
  description: 'The people, programme and moments behind PyCon Cameroon 2026 in Yaoundé.',
};

export default function Report2026Page() {
  const maxFormat = Math.max(...FORMATS_2026.map((item) => item.value));
  const maxLanguage = Math.max(...LANGUAGES_2026.map((item) => item.value));

  return (
    <>
      <PageIntro
        label="Past edition · Report 2026"
        title={'Three days in\nYaoundé'}
        lede={
          <p>
            PyCon Cameroon brought Python developers, students, researchers and companies together at Girafe Hôtel from
            17–19 September 2026. Here is the edition at a glance, with the programme, speakers and moments that made it.
          </p>
        }
      >
        <dl className="facts report-intro__facts">
          <div><dt>Edition</dt><dd>{EDITION_2026.name}</dd></div>
          <div><dt>Dates</dt><dd>{EDITION_2026.dates}</dd></div>
          <div><dt>Venue</dt><dd>{EDITION_2026.venue}</dd></div>
          <div><dt>Languages</dt><dd>English · French · bilingual</dd></div>
        </dl>
      </PageIntro>

      <section className="section wrap report-cover" aria-label="PyCon Cameroon 2026 closing session">
        <Figure photo={PHOTOS.closing} ratio="2.05 / 1" sizes="100vw" top />
      </section>

      <section className="section deep report-stats" aria-labelledby="report-stats-title">
        <div className="wrap">
          <Head label="The edition, at a glance" id="report-stats-title" title="A room full of Python people" />
          <dl className="report-stats__grid">
            {STATS_2026.map((stat, index) => (
              <div className={index === 0 ? 'report-stat report-stat--accent' : 'report-stat'} key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap report-programme" aria-labelledby="report-programme-title">
        <Head
          label="Programme and access"
          id="report-programme-title"
          title="37 sessions, English and French"
          aside={<p className="muted">Talks, workshops, keynotes and a panel across three days.</p>}
        />
        <div className="report-programme__columns">
          <ReportBars title="Session formats" items={FORMATS_2026} max={maxFormat} />
          <ReportBars title="Session languages" items={LANGUAGES_2026} max={maxLanguage} />
        </div>
      </section>

      <section className="section report-keynotes" aria-labelledby="report-keynotes-title">
        <div className="wrap">
          <Head label="Three days · Three keynotes" id="report-keynotes-title" title="Voices from the stage" />
          <ol className="report-keynotes__grid">
            {KEYNOTES_2026.map((keynote) => (
              <li key={keynote.name}>
                <Figure photo={keynote.photo} ratio="4 / 5" sizes="(min-width: 900px) 30vw, 90vw" top />
                <p className="eyebrow report-keynotes__day">{keynote.day.replace(' · ', ' / ')} · {keynote.lang}</p>
                <h3 className="h3">{keynote.name}</h3>
                <p className="muted">{keynote.role}</p>
                <p className="report-keynotes__talk">“{keynote.talk}”</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap report-community" aria-labelledby="report-community-title">
        <div className="report-community__photo">
          <Figure photo={PHOTOS.team} ratio="4 / 3" sizes="(min-width: 900px) 48vw, 90vw" top />
        </div>
        <div className="report-community__copy">
          <p className="eyebrow">Made possible together</p>
          <h2 className="h2" id="report-community-title">The community made the room.</h2>
          <p className="prose">
            Organisers, volunteers, speakers, partner communities and sponsors brought the 2026 edition to life. The
            event welcomed more than 500 people, with speakers from six countries and a programme shaped around practical
            learning and shared experience.
          </p>
          <div className="actions">
            <Link className="btn btn--line" href="/sponsors#thank-you">
              Meet the 2026 sponsors <Arrow dir="out" />
            </Link>
            <span className="mono">{SPONSORS_2026.flatMap((tier) => tier.sponsors).length} sponsors and supporters</span>
          </div>
        </div>
      </section>

      <section className="section deep report-downloads" aria-labelledby="report-downloads-title">
        <div className="wrap report-downloads__in">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 className="h2" id="report-downloads-title">The full record.</h2>
          </div>
          <div className="report-downloads__links">
            <a className="btn btn--taxi" href={LINKS.reportPdfEn} target="_blank" rel="noreferrer">
              Download report · English <Arrow dir="out" />
            </a>
            <a className="btn btn--line" href={LINKS.reportPdfFr} target="_blank" rel="noreferrer">
              Télécharger le rapport · Français <Arrow dir="out" />
            </a>
            <a className="link" href={LINKS.agenda2026} target="_blank" rel="noreferrer">
              Browse the 2026 agenda <Arrow dir="out" />
            </a>
            <a className="link" href={LINKS.report2026} target="_blank" rel="noreferrer">
              Open the original online report <Arrow dir="out" />
            </a>
            <Link className="link" href="/agenda">
              See the 2027 programme status <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ReportBars({ title, items, max }: { title: string; items: readonly { label: string; value: number }[]; max: number }) {
  return (
    <div className="report-bars">
      <h3 className="h3">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <div className="report-bars__meta"><span>{item.label}</span><span className="mono">{item.value}</span></div>
            <span className="report-bars__track" aria-hidden="true">
              <span style={{ width: `${(item.value / max) * 100}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
