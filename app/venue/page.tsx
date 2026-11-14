import type { Metadata } from 'next';
import Mark, { Arrow } from '../../components/Mark';
import { Head } from '../../components/ui';
import { DAY_TRIPS, GETTING_THERE, HOTELS, RAINFALL, SIGHTS } from '../../content/douala';
import { LINKS, SITE } from '../../lib/site';
import '../pages.css';

export const metadata: Metadata = {
  title: 'Douala',
  description: 'The venue, getting to Douala, getting around, the weather and what to see: a city guide for PyCon Cameroon 2027.',
};

export default function VenuePage() {
  const max = Math.max(...RAINFALL.map((r) => r.mm));
  const total = Math.round(RAINFALL.reduce((n, r) => n + r.mm, 0));

  return (
    <>
      <section className="deep city-intro" aria-labelledby="city-title">
        <div className="wrap city-intro__in">
          <div className="city-intro__text">
            <p className="eyebrow" data-hero>
              Host city · {SITE.year}
            </p>
            <h1 className="display city-intro__title" id="city-title">
              <span className="line-mask">
                <span data-hero-line>Douala</span>
              </span>
            </h1>
            <p className="lede" data-hero>
              Cameroon’s largest city and its port, on the Wouri estuary. Loud, humid, generous and always moving.
            </p>
          </div>
          <div className="city-intro__mark" data-hero>
            <Mark size={420} title="La Nouvelle Liberté, Deïdo roundabout" />
            <p className="mono">La Nouvelle Liberté · Deïdo · 1996</p>
          </div>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="venue-title">
        <div data-reveal>
          <p className="eyebrow">The venue</p>
          <h2 className="h2" id="venue-title">
            {SITE.venue ? SITE.venue.name : 'To be announced'}
          </h2>
        </div>
        <div className="prose" data-reveal>
          {SITE.venue ? (
            <p>
              {SITE.venue.address} ·{' '}
              <a className="link" href={SITE.venue.mapsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps <Arrow dir="out" />
              </a>
            </p>
          ) : (
            <>
              <p className="lede" style={{ marginBottom: 16 }}>
                The venue is announced with the dates.
              </p>
              <p>
                In 2026 the conference used one main hall and smaller rooms for parallel talks and workshops, with lunch on
                site. Expect the same shape in Douala.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="section there" aria-labelledby="there-title">
        <div className="wrap">
          <Head label="Getting there" id="there-title" title="Arriving and moving around" />
          <div className="cards there__grid" data-stagger>
            {GETTING_THERE.map((g, i) => (
              <article key={g.title}>
                <p className="mono there__n">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="h3">{g.title}</h3>
                <p className="prose">{g.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="rain-title">
        <div data-reveal>
          <p className="eyebrow">Weather</p>
          <h2 className="h2" id="rain-title">
            Pack an umbrella
          </h2>
          <div className="prose" style={{ marginTop: 20 }}>
            <p>
              Douala gets about {total.toLocaleString('en')} mm of rain a year, most of it from June to October. Daytime
              highs stay between 28 and 33 °C all year. December to February are the driest
              months.
            </p>
          </div>
        </div>
        <figure className="rain" data-reveal>
          <div className="rain__bars" role="img" aria-label={`Average monthly rainfall in Douala, from ${RAINFALL[11].mm} mm in December to ${max} mm in August`}>
            {RAINFALL.map((r) => (
              <div key={r.m} className="rain__col">
                <span className="rain__val mono">{Math.round(r.mm)}</span>
                <span className="rain__bar" style={{ height: `${(r.mm / max) * 100}%` }} data-wet={r.mm > 400 || undefined} />
                <span className="rain__m mono">{r.m}</span>
              </div>
            ))}
          </div>
          <figcaption className="muted">Average rainfall per month, mm. 1991–2020 normals.</figcaption>
        </figure>
      </section>

      <section className="section explore" aria-labelledby="explore-title">
        <div className="wrap">
          <Head label="Explore Douala" id="explore-title" title="Six places worth the taxi ride" />
          <ol className="sights" data-stagger>
            {SIGHTS.map((s, i) => (
              <li key={s.name}>
                <span className="mono sights__n">{String(i + 1).padStart(2, '0')}</span>
                <div className="sights__text">
                  <h3 className="h3">{s.name}</h3>
                  <p className="mono sights__area">{s.area}</p>
                  <p className="prose">{s.body}</p>
                </div>
                <a className="link sights__map" href={s.maps} target="_blank" rel="noreferrer">
                  Map <Arrow dir="out" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="trips-title">
        <div data-reveal>
          <p className="eyebrow">Stay a few days</p>
          <h2 className="h2" id="trips-title">
            Day trips from Douala
          </h2>
        </div>
        <ul className="trips" data-stagger>
          {DAY_TRIPS.map((t) => (
            <li key={t.name}>
              <div className="trips__head">
                <h3 className="h3">{t.name}</h3>
                <span className="mono muted">{t.distance}</span>
              </div>
              <p className="prose">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section stay" aria-labelledby="stay-title">
        <div className="wrap split">
          <div data-reveal>
            <p className="eyebrow">Where to stay</p>
            <h2 className="h2" id="stay-title">
              Hotels near the centre
            </h2>
            <p className="prose" style={{ marginTop: 20 }}>
              Not official partners: a starting point while we confirm the venue. Recommended hotels and any group rates are
              announced with it.
            </p>
          </div>
          <ul className="hotels" data-stagger>
            {HOTELS.map((h) => (
              <li key={h.name}>
                <span className="hotels__name">{h.name}</span>
                <span className="mono muted">{h.area}</span>
                <span className="muted">{h.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap" style={{ marginTop: 56 }}>
          <a className="link" href={LINKS.mail('Accommodation in Douala, PyCon Cameroon 2027')}>
            Questions about the trip? Write to us <Arrow />
          </a>
        </div>
      </section>
    </>
  );
}
