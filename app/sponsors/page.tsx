import type { Metadata } from 'next';
import { Arrow } from '../../components/Mark';
import { Figure, Head } from '../../components/ui';
import { PACKAGES_2026, PHOTOS, SPONSORS_2026, STATS_2026 } from '../../content/edition2026';
import { LINKS, SITE } from '../../lib/site';
import '../pages.css';

export const metadata: Metadata = {
  title: 'Sponsors',
  description: 'Sponsor PyCon Cameroon 2027 in Douala, and thank you to the companies and communities who made 2026 possible.',
};

const WHY = [
  { title: 'Reach the people who write Python here', body: 'Students, working developers, data teams and founders from across Cameroon, in one place for several days.' },
  { title: 'Hire', body: 'A booth and a talk put you in front of developers looking for their next job or internship, in person.' },
  { title: 'Fund access', body: 'Part of every package pays for financial aid: tickets, transport and rooms for people who could not come otherwise.' },
];

export default function SponsorsPage() {
  return (
    <>
      <section className="sponsor-cover" aria-labelledby="sp-title">
        <div className="wrap sponsor-cover__in">
          <p className="eyebrow" data-hero>
            Sponsorship · {SITE.name} {SITE.year}
          </p>
          <h1 className="h1" id="sp-title">
            <span className="line-mask">
              <span data-hero-line>Put your name</span>
            </span>
            <span className="line-mask">
              <span data-hero-line>on Douala 2027</span>
            </span>
          </h1>
          <div className="sponsor-cover__foot" data-hero>
            <p className="lede">Tickets stay cheap enough for students because sponsors pay for what tickets don’t.</p>
            <div className="actions">
              <a className="btn sponsor-cover__btn" href={LINKS.mail('Sponsoring PyCon Cameroon 2027')}>
                Talk to the team <Arrow />
              </a>
              <a className="link sponsor-cover__link" href={LINKS.prospectus2026} target="_blank" rel="noreferrer">
                2026 prospectus <Arrow dir="out" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="why-title">
        <Head label="Why sponsor" id="why-title" title="What your money does" />
        <div className="split">
          <div data-reveal>
            <Figure photo={PHOTOS.sponsorsSlide} ratio="4 / 3" sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <div>
            <dl className="sp-stats" data-stagger>
              {STATS_2026.map((s) => (
                <div key={s.label}>
                  <dt className="number">{s.value}</dt>
                  <dd>{s.label} in 2026</dd>
                </div>
              ))}
            </dl>
            <ol className="sp-why" data-stagger>
              {WHY.map((w) => (
                <li key={w.title}>
                  <h3 className="h3">{w.title}</h3>
                  <p className="prose">{w.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section packages-sec" aria-labelledby="pk-title">
        <div className="wrap">
          <Head
            label="Packages"
            id="pk-title"
            title="2026 packages, for reference"
            aside={<p className="muted" style={{ maxWidth: '36ch' }}>2027 packages and prices are confirmed with the new prospectus. Custom packages are welcome.</p>}
          />
          <div className="pk" role="table" aria-label="2026 sponsorship packages">
            <div className="pk__row pk__row--head" role="row">
              <span role="columnheader">Tier</span>
              <span role="columnheader">Local, XAF</span>
              <span role="columnheader">International, USD</span>
              <span role="columnheader">Includes</span>
            </div>
            {PACKAGES_2026.map((p) => (
              <div className="pk__row" role="row" key={p.tier} data-reveal>
                <span role="cell" className="pk__tier">
                  {p.tier}
                </span>
                <span role="cell" className="mono pk__price">
                  {p.xaf}
                </span>
                <span role="cell" className="mono pk__price">
                  {p.usd}
                </span>
                <span role="cell" className="pk__inc">
                  {p.includes.join(' · ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="thank-you" className="section wrap" aria-labelledby="ty-title">
        <Head label="Thank you" id="ty-title" title="Who made 2026 happen" />
        <div className="tiers">
          {SPONSORS_2026.map((t) => (
            <div className={`tiers__row ${t.tier === 'Diamond' ? 'tiers__row--top' : ''}`} key={t.tier} data-reveal>
              <p className="eyebrow">{t.tier}</p>
              <ul>
                {t.sponsors.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
