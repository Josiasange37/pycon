import Image from 'next/image';
import { Arrow } from '../../components/Mark';
import { Figure, Head } from '../../components/ui';
import { Title as WeaveTitle, Weave } from '../../components/Weave';
import { PHOTOS, SPONSORS_2026, STATS_2026 } from '../../content/edition2026';
import { LINKS, SITE } from '../../lib/site';
import { pageMetadata } from '../../lib/seo';
import '../pages.css';

export const metadata = pageMetadata({
  title: 'Sponsorship',
  description: 'Sponsor PyCon Cameroon 2027 in Douala and see how sponsorship supports lower ticket costs, financial aid, community access and the 2026 partners.',
  path: '/sponsors',
});

const WHY = [
  { title: 'Reach the people who write Python here', body: 'Students, working developers, data teams and founders from across Cameroon, in one place for several days.' },
  { title: 'Hire', body: 'A booth and a talk put you in front of developers looking for their next job or internship, in person.' },
  { title: 'Fund access', body: 'Part of every package pays for financial aid: tickets, transport and rooms for people who could not come otherwise.' },
];

export default function SponsorsPage() {
  return (
    <>
      <section className="sponsor-cover" aria-labelledby="sp-title">
        <Weave className="sponsor-cover__weave" accent />
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
                Discuss sponsorship <Arrow />
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

      <section id="thank-you" className="section sponsor-directory-sec" aria-labelledby="ty-title">
        <div className="wrap">
          <Head
            label="The people behind 2026"
            id="ty-title"
            title="Made possible together"
            aside={<p className="muted" style={{ maxWidth: '34ch' }}>The companies and communities below helped put 500+ people in the room in Yaoundé.</p>}
          />
          <div className="sponsor-directory" role="group" aria-label="2026 sponsors by tier">
            {SPONSORS_2026.map((tier, tierIndex) => (
              <section className={`sponsor-directory__tier${tierIndex < 2 ? ' sponsor-directory__tier--featured' : ''}`} key={tier.tier} aria-labelledby={`sponsor-tier-${tierIndex}`}>
                <div className="sponsor-directory__meta">
                  <p className="eyebrow">2026 supporters</p>
                  <h3 className="h3" id={`sponsor-tier-${tierIndex}`}>{tier.tier}</h3>
                </div>
                <ul className="sponsor-directory__logos" data-stagger>
                  {tier.sponsors.map((sponsor) => {
                    const logo = sponsor.logo;
                    const lockup = Boolean(sponsor.lockup);
                    return (
                      <li key={sponsor.name}>
                        <a className={`sponsor-directory__logo${lockup ? ' sponsor-directory__logo--lockup' : ''}${tierIndex < 2 ? ' sponsor-directory__logo--featured' : ''}`} href={sponsor.url} target="_blank" rel="noreferrer" aria-label={`Visit ${sponsor.name} website`}>
                          {logo && <Image src={logo} alt="" aria-hidden="true" width={lockup ? 300 : 88} height={lockup ? 90 : 88} unoptimized />}
                          {!lockup && <span>{sponsor.name}</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="finale sponsor-final-cta f-river" aria-labelledby="sponsor-final-title">
        <div className="wrap finale__in sponsor-final-cta__in">
          <div className="sponsor-final-cta__heading" data-reveal>
            <Weave className="sponsor-final-cta__weave" accent />
            <WeaveTitle
              id="sponsor-final-title"
              lead="Shape the future"
              main="of Python in Cameroon."
              className="finale__title sponsor-final-cta__title"
            />
          </div>
          <div className="finale__side">
            <p className="finale__text sponsor-final-cta__text" data-reveal>
              Bring your organisation into the room with the developers, founders and students building with Python. Tell
              the organisers what you want to achieve and explore a partnership that helps more students take part.
            </p>
            <div className="finale__actions" data-reveal>
              <a className="wv-btn wv-btn--sun sponsor-final-cta__button" href={LINKS.mail('Sponsoring PyCon Cameroon 2027')}>
                Let’s build it together <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
