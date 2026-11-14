import Link from 'next/link';
import Mark, { Arrow, Tide } from '../components/Mark';
import { Figure, Head, KeyDates } from '../components/ui';
import { EDITION_2026, KEYNOTES_2026, PHOTOS, SPONSOR_NAMES_2026, STATS_2026 } from '../content/edition2026';
import { CITY_FACTS } from '../content/douala';
import { LINKS, SITE, SOCIAL, venueLabel } from '../lib/site';
import './home.css';

const EXPECT = [
  { title: 'Talks in English and French', body: 'In 2026, 18 sessions were in English, 9 in French and 10 in both. Every session is labelled, so you can plan your day.' },
  { title: 'Workshops you leave with code from', body: 'Bring a laptop. Workshops run longer than talks and end with something that works on your machine.' },
  { title: 'A keynote each morning', body: 'One speaker opens each day. In 2026: an accessibility advocate, a SaaS founder and an AWS developer advocate.' },
  { title: 'Lunch and coffee together', body: 'Included in every ticket. Most of the conversations that matter happen in the queue for food.' },
  { title: 'People to build with', body: 'Students, maintainers, founders, data people and first-time speakers, from Douala, Yaoundé, Buea and across the continent.' },
];

const THEMES = ['Machine learning & AI', 'Web & Django', 'Data & science', 'DevOps & cloud', 'Python core', 'Open source & community', 'IoT & hardware', 'Education', 'Security', 'Python in African industry'];

export default function Home() {
  return (
    <>
      {/* ——— hero ——— */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <p className="eyebrow hero__kicker" data-hero>
            After Yaoundé in 2026, the conference moves to the coast
          </p>
          <h1 className="hero__title" id="hero-title">
            <span className="line-mask hero__name">
              <span data-hero-line>PyCon Cameroon</span>
            </span>
            <span className="line-mask hero__city">
              <span data-hero-line>
                Douala <span className="hero__year">2027</span>
              </span>
            </span>
          </h1>
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="lede" data-hero>
                A community conference about Python, run by volunteers from Python Cameroon. In 2027 it comes to Douala,
                the port city on the Wouri estuary, for talks, workshops and long conversations in English and French.
              </p>
              <div className="actions" data-hero>
                <Link className="btn btn--taxi" href="#updates">
                  Get updates <Arrow />
                </Link>
                <Link className="link" href="/sponsors">
                  Sponsor 2027 <Arrow />
                </Link>
              </div>
            </div>
            <dl className="facts hero__facts" data-hero>
              <div>
                <dt>City</dt>
                <dd>
                  {SITE.city}, {SITE.region}
                </dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>{SITE.dates?.label ?? '2027 · to be announced'}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{venueLabel()}</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{SITE.languages}</dd>
              </div>
            </dl>
          </div>
        </div>
        <Mark size={560} className="hero__monument" />
      </section>

      <Tide />

      <div className="wide" data-reveal>
        <Figure photo={PHOTOS.closing} ratio="21 / 9" parallax priority sizes="100vw" className="wide__fig" />
      </div>

      {/* ——— key dates ——— */}
      <section className="section wrap split" aria-labelledby="dates-title">
        <div className="sticky-col" data-reveal>
          <p className="eyebrow">Key dates</p>
          <h2 className="h2" id="dates-title">
            What happens when
          </h2>
          <p className="prose" style={{ marginTop: 20 }}>
            Nothing for 2027 is fixed yet. Dates appear here first, then in the community channels. We will not guess.
          </p>
        </div>
        <KeyDates />
      </section>

      {/* ——— 2026 recap ——— */}
      <section className="section recap" aria-labelledby="recap-title">
        <div className="wrap">
          <Head
            label="The 2026 edition"
            id="recap-title"
            title={
              <>
                Three days
                <br />
                in Yaoundé
              </>
            }
            aside={
              <div className="actions">
                <a className="link" href={LINKS.past2026} target="_blank" rel="noreferrer">
                  Visit the 2026 site <Arrow dir="out" />
                </a>
                <a className="link" href={LINKS.report2026} target="_blank" rel="noreferrer">
                  Read the report <Arrow dir="out" />
                </a>
              </div>
            }
          />
          <dl className="stats" data-stagger>
            {STATS_2026.map((s) => (
              <div key={s.label}>
                <dt className="number">{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mosaic">
            <Figure photo={PHOTOS.hall} ratio="4 / 3" parallax sizes="(min-width: 900px) 58vw, 100vw" className="mosaic__a" />
            <Figure photo={PHOTOS.keynote} ratio="4 / 5" parallax sizes="(min-width: 900px) 36vw, 100vw" className="mosaic__b" />
            <Figure photo={PHOTOS.laptops} ratio="3 / 2" sizes="(min-width: 900px) 30vw, 100vw" className="mosaic__c" />
            <Figure photo={PHOTOS.panel} ratio="3 / 2" sizes="(min-width: 900px) 30vw, 100vw" className="mosaic__d" />
            <Figure photo={PHOTOS.graffiti} ratio="3 / 2" sizes="(min-width: 900px) 30vw, 100vw" className="mosaic__e" />
          </div>
          <p className="recap__note serif" data-reveal>
            {EDITION_2026.dates} at the {EDITION_2026.venue}. Twenty-eight of the thirty-four speakers came from Cameroon;
            the others from the United Kingdom, Senegal, Rwanda, France and South Africa.
          </p>
        </div>
      </section>

      {/* ——— why Douala ——— */}
      <section className="deep douala" aria-labelledby="douala-title">
        <div className="wrap douala__in">
          <div className="douala__text">
            <p className="eyebrow">Why Douala</p>
            <h2 className="h2" id="douala-title" data-reveal>
              The city that gave Cameroon its name
            </h2>
            <div className="prose" data-reveal>
              <p>
                In the 1470s Portuguese sailors reached the Wouri estuary and called it Rio dos Camarões, the river of
                shrimp. The name stuck to the whole country. Douala grew on its banks into Cameroon’s largest city and its
                economic capital.
              </p>
              <p>
                Most of the country’s trade and industry runs through it, and so does a large part of its tech community. Even the
                time zone in your Python code is named after it: <code className="mono">ZoneInfo(&quot;Africa/Douala&quot;)</code>.
              </p>
            </div>
            <Link className="btn btn--taxi" href="/venue" data-reveal>
              Douala city guide <Arrow />
            </Link>
          </div>
          <div className="douala__aside">
            <Mark size={340} className="douala__mark" title="La Nouvelle Liberté, Deïdo, Douala" />
            <dl className="douala__facts" data-stagger>
              {CITY_FACTS.map((f) => (
                <div key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ——— about ——— */}
      <section className="section wrap split" aria-labelledby="about-title">
        <div data-reveal>
          <p className="eyebrow">About</p>
          <h2 className="h2" id="about-title">
            By the community, for the community
          </h2>
        </div>
        <div className="about__body" data-reveal>
          <p className="lede" style={{ maxWidth: '38ch' }}>
            PyCon Cameroon is the yearly gathering of Python Cameroon, a volunteer user group of developers, data
            scientists, students and teachers.
          </p>
          <div className="prose">
            <p>
              Nobody is paid to organise it. Tickets are priced so that students can come, and part of the budget goes
              back out as financial aid. Talks are chosen from a public call for proposals, and first-time speakers are
              welcome.
            </p>
          </div>
          <Link className="link" href="/about">
            Who we are and how we work <Arrow />
          </Link>
        </div>
      </section>

      {/* ——— keynotes ——— */}
      <section className="section keynotes" aria-labelledby="keynotes-title">
        <div className="wrap">
          <Head
            label="Keynotes"
            id="keynotes-title"
            title="Who opened each day in 2026"
            aside={
              <p className="muted keynotes__aside">
                2027 keynotes are announced after the call for proposals.{' '}
                <Link className="link" href="/speakers">
                  Speakers
                </Link>
              </p>
            }
          />
          <ol className="kn">
            {KEYNOTES_2026.map((k, i) => (
              <li key={k.name} className="kn__item" data-reveal>
                <span className="kn__n mono">0{i + 1}</span>
                <Figure photo={k.photo} ratio="4 / 5" caption={false} top sizes="(min-width: 900px) 22vw, 60vw" className="kn__photo" />
                <div className="kn__text">
                  <p className="mono kn__meta">
                    {k.day} · <span className="tag">{k.lang}</span>
                  </p>
                  <h3 className="h3">{k.name}</h3>
                  <p className="muted">{k.role}</p>
                  <p className="kn__talk serif">“{k.talk}”</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— what to expect ——— */}
      <section className="section expect" aria-labelledby="expect-title">
        <div className="wrap split">
          <div>
            <p className="eyebrow">What to expect</p>
            <h2 className="h2" id="expect-title" data-reveal>
              A PyCon day, as it ran in Yaoundé
            </h2>
            <div style={{ marginTop: 32 }} data-reveal>
              <Figure photo={PHOTOS.lunch} ratio="4 / 3" sizes="(min-width: 900px) 36vw, 100vw" />
            </div>
          </div>
          <ol className="expect__list" data-stagger>
            {EXPECT.map((e, i) => (
              <li key={e.title}>
                <span className="mono expect__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="h3">{e.title}</h3>
                  <p className="prose">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— themes ——— */}
      <section className="section section--tight wrap themes" aria-labelledby="themes-title">
        <div className="themes__head" data-reveal>
          <p className="eyebrow">Tracks</p>
          <h2 className="h3" id="themes-title">
            Themes we expect proposals on
          </h2>
          <p className="muted">Final tracks are set with the call for proposals.</p>
        </div>
        <ul className="themes__list" data-stagger>
          {THEMES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {/* ——— get involved ——— */}
      <section className="section involve" aria-labelledby="involve-title">
        <div className="wrap">
          <Head label="Get involved" id="involve-title" title="Three ways in" />
          <div className="cards involve__cards" data-stagger>
            <article>
              <span className="tag tag--soon">Opens soon</span>
              <h3 className="h3">Speak</h3>
              <p className="prose">
                Tell us what you built, what broke, or what took far too long to figure out. No novel discovery needed.
                Talks in English, French or both.
              </p>
              <Link className="link" href="/speakers#cfp">
                Call for proposals <Arrow />
              </Link>
            </article>
            <article>
              <span className="tag">Write to us</span>
              <h3 className="h3">Volunteer</h3>
              <p className="prose">
                Registration desk, rooms, livestream, social media, the Douala logistics team. We need people who know the
                city.
              </p>
              <a className="link" href={LINKS.mail('Volunteer for PyCon Cameroon 2027')}>
                Write to the team <Arrow />
              </a>
            </article>
            <article>
              <span className="tag">Write to us</span>
              <h3 className="h3">Sponsor</h3>
              <p className="prose">
                Put your company in front of the people who write Python in Cameroon, and pay for students who could not
                come otherwise.
              </p>
              <Link className="link" href="/sponsors">
                Sponsorship <Arrow />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ——— sponsors ——— */}
      <section className="sponsors-band" aria-labelledby="sponsors-title">
        <div className="wrap sponsors-band__head" data-reveal>
          <p className="eyebrow" id="sponsors-title">
            Thank you to our 2026 sponsors
          </p>
          <Link className="link" href="/sponsors">
            Become a 2027 sponsor <Arrow />
          </Link>
        </div>
        <div className="marquee">
          <ul className="marquee__track">
            {[0, 1].map((copy) =>
              SPONSOR_NAMES_2026.map((n) => (
                <li key={`${copy}-${n}`} aria-hidden={copy === 1 || undefined} className="sponsors-band__name">
                  {n}
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      {/* ——— stay in the loop ——— */}
      <section id="updates" className="updates" aria-labelledby="updates-title">
        <div className="wrap updates__in">
          <div>
            <h2 className="h2" id="updates-title" data-reveal>
              Be the first to know
            </h2>
            <p className="updates__lede" data-reveal>
              Dates, the venue, the call for proposals and tickets are announced in the community channels first.
            </p>
          </div>
          <ul className="updates__links" data-stagger>
            {SOCIAL.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <span>{s.label}</span>
                  <Arrow dir="out" />
                </a>
              </li>
            ))}
            <li>
              <a href={LINKS.mail('Keep me posted about PyCon Cameroon 2027')}>
                <span>Email the organisers</span>
                <Arrow />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
