import type { Metadata } from 'next';
import { Arrow } from '../../components/Mark';
import { Figure, Head, PageIntro } from '../../components/ui';
import { PARTNERS_2026, PHOTOS, TEAM } from '../../content/edition2026';
import { LINKS, SITE } from '../../lib/site';
import '../pages.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'PyCon Cameroon is the yearly conference of Python Cameroon, a volunteer user group. Who we are, how we work and our code of conduct.',
};

const PRINCIPLES = [
  { title: 'Volunteer-run', body: 'Everyone on the team has a day job or classes. We say what we can do, and we do it.' },
  { title: 'Priced for students', body: 'Tickets are cheap on purpose, and financial aid covers people who still cannot pay.' },
  { title: 'Bilingual by default', body: 'Talks, signs and help are in English and French. Nobody has to choose a side to take part.' },
  { title: 'Open selection', body: 'Talks come from a public call for proposals and are chosen on their content, not on who paid.' },
  { title: 'Built to be repeated', body: 'After each edition we publish a report: who came, what ran, what we learned. 2026’s is online.' },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title={'Python people\nfrom Cameroon'}
        lede={
          <p>
            PyCon Cameroon is the yearly conference of Python Cameroon, a user group of developers, data scientists,
            students and teachers. After Yaoundé in 2026, the next edition is in Douala.
          </p>
        }
      />

      <section className="wrap about-photo" data-reveal>
        <Figure photo={PHOTOS.team} ratio="16 / 9" top parallax sizes="100vw" />
      </section>

      <section className="section wrap split" aria-labelledby="group-title">
        <div data-reveal>
          <p className="eyebrow">Python Cameroon</p>
          <h2 className="h2" id="group-title">
            A user group first
          </h2>
        </div>
        <div className="prose about-prose" data-reveal>
          <p>
            Python Cameroon brings together people who use Python for the web, data, science, automation and teaching.
            Between conferences the group runs speaker sessions, coding workshops, hackathons and mentoring.
          </p>
          <p>
            The conference is where all of that meets once a year: three days of talks and workshops, with partner
            communities such as Django Cameroon and the AWS User Group Douala, and speakers from across the continent.
          </p>
          <div className="actions" style={{ marginTop: 28 }}>
            <a className="btn btn--line" href="https://chat.whatsapp.com/Ckc80ophGEH0NJFmZAzDMr" target="_blank" rel="noreferrer">
              Join the community <Arrow dir="out" />
            </a>
          </div>
        </div>
      </section>

      <section className="section principles-sec" aria-labelledby="pr-title">
        <div className="wrap">
          <Head label="How we work" id="pr-title" title="Five things we hold to" />
          <ol className="principles" data-stagger>
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3">{p.title}</h3>
                <p className="prose">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className="section wrap" aria-labelledby="team-title">
        <Head
          label="The team"
          id="team-title"
          title="Who organised 2026"
          aside={<p className="muted" style={{ maxWidth: '34ch' }}>The 2027 team is forming now, with volunteers in Douala.</p>}
        />
        <ul className="team" data-stagger>
          {TEAM.map((m) => (
            <li key={m.name}>
              <p className="team__name">{m.name}</p>
              <p className="muted">{m.role}</p>
            </li>
          ))}
          <li className="team__join">
            <p className="team__name">You?</p>
            <a className="link" href={LINKS.mail('Joining the PyCon Cameroon 2027 team')}>
              Join the 2027 team <Arrow />
            </a>
          </li>
        </ul>
      </section>

      <section className="section section--tight wrap" aria-labelledby="partners-title">
        <div className="partners">
          <p className="eyebrow" id="partners-title">
            Partner communities in 2026
          </p>
          <ul>
            {PARTNERS_2026.map((p) => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="code-of-conduct" className="deep coc" aria-labelledby="coc-title">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Code of conduct</p>
            <h2 className="h2" id="coc-title" data-reveal>
              Everyone is welcome. Harassment is not.
            </h2>
          </div>
          <div className="prose coc__body" data-reveal>
            <p>
              PyCon Cameroon is a harassment-free event for everyone, whatever their gender, age, origin, religion,
              language, disability, appearance or experience. This applies to talks, workshops, social events and online
              channels.
            </p>
            <p>
              If something happens, tell any organiser or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We
              act on every report, in confidence.
            </p>
            <a className="btn btn--taxi" href={LINKS.codeOfConduct} target="_blank" rel="noreferrer">
              Read the full code of conduct <Arrow dir="out" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
