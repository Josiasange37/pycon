import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '../../components/Mark';
import { Out, Title, Weave } from '../../components/Weave';
import { EDITION_2026 } from '../../content/edition2026';
import { SIGHTS } from '../../content/douala';
import { LINKS, SITE, datesLabel } from '../../lib/site';
import '../pages.css';
import './venue.css';

const SIGHT_PHOTOS = {
  'La Nouvelle Liberté': {
    src: '/venue/nouvelle-liberte.webp',
    alt: 'La Nouvelle Liberté sculpture at the Deïdo roundabout in Douala',
    author: 'Alessandro Aceri',
    source: 'https://commons.wikimedia.org/wiki/File:Nouvelle_Libert%C3%A9_01.JPG',
  },
  'La Pagode': {
    src: '/venue/pagode-douala.webp',
    alt: 'La Pagode, the historic Bell palace in Bonanjo, Douala',
    author: 'Guillaume WA',
    source: 'https://commons.wikimedia.org/wiki/File:Pagode_Douala.JPG',
  },
  'Cathédrale Saints-Pierre-et-Paul': {
    src: '/venue/cathedrale-douala.webp',
    alt: 'Saint Peter and Saint Paul Cathedral in Douala',
    author: 'Guillaume WA',
    source: 'https://commons.wikimedia.org/wiki/File:Cathedrale_St_Pierre_et_St_Paul.JPG',
  },
  'The Wouri waterfront': {
    src: '/venue/wouri-bridge.webp',
    alt: 'The Wouri Bridge crossing the river in Douala',
    author: 'Happyraph',
    source: 'https://commons.wikimedia.org/wiki/File:PONT_SUR_LE_WOURI.jpg',
  },
} as const;
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/3.0/';
const FEATURED_SIGHTS = SIGHTS.filter((sight) => sight.name in SIGHT_PHOTOS);
const MORE_SIGHTS = SIGHTS.filter((sight) => !(sight.name in SIGHT_PHOTOS));

export const metadata: Metadata = {
  title: `Venue · ${SITE.city}`,
  description: `The PyCon Cameroon ${SITE.year} venue in ${SITE.city} will be announced soon. Find arrival guidance and ideas for exploring the host city.`,
};

export default function VenuePage() {
  return (
    <div className="venue-page">
      <section className="v-hero f-river" aria-labelledby="venue-page-title">
        <Weave accent className="wv-corner wv-corner--tr" />
        <div className="wrap v-hero__in">
          <div className="v-hero__copy">
            <p className="wv-stk wv-stk--sun v-hero__stamp">PyCon Cameroon · {SITE.year}</p>
            <Title id="venue-page-title" as="h1" lead="Meet us in" main={`${SITE.city}.`} className="v-hero__title" />
            <p className="v-hero__lede">
              Cameroon’s Python community comes together in {SITE.city} for talks, hands-on workshops and the people
              building what comes next.
            </p>
            <ul className="v-hero__facts" aria-label="Conference details">
              <li>{datesLabel()}</li>
              <li>{SITE.region}, Cameroon</li>
            </ul>
            <Link className="wv-btn wv-btn--sun v-hero__map" href="/#updates">
              Get venue updates <Out />
            </Link>
          </div>
          <figure className="v-hero__city-art">
            <Image
              className="v-hero__statue"
              src="/hero/statue.webp"
              alt="Blue-toned artwork of La Nouvelle Liberté, the metal sculpture of a figure holding a globe overhead"
              width={632}
              height={1514}
              priority
              sizes="(min-width: 960px) 22vw, 52vw"
            />
            <figcaption>
              <span>La Nouvelle Liberté</span>
              <span className="mono">DEÏDO · DOUALA</span>
            </figcaption>
            <span className="wv-stk wv-stk--paper v-hero__city-tag">Host city</span>
          </figure>
        </div>
      </section>

      <section className="section v-location f-paper" aria-labelledby="v-location-title">
        <div className="wrap">
          <header className="v-section-head" data-reveal>
            <p className="eyebrow">The place we’ll meet</p>
            <Title id="v-location-title" lead="Conference" main="location." />
          </header>

          <div className="v-location__grid">
            <div className="v-location__copy" data-reveal>
              <div className="v-address">
                <span className="v-address__eyebrow mono">PyCon Cameroon {SITE.year}</span>
                {SITE.venue ? (
                  <>
                    <h3>{SITE.venue.name}</h3>
                    <address>{SITE.venue.address}</address>
                    <a className="wv-btn wv-btn--ink" href={SITE.venue.mapsUrl} target="_blank" rel="noreferrer">
                      Open in Google Maps <Out />
                    </a>
                  </>
                ) : (
                  <>
                    <h3>Venue to be announced</h3>
                    <p className="v-address__copy">
                      PyCon Cameroon {SITE.year} is coming to {SITE.city}. We’ll publish the venue name, street address
                      and map as soon as they’re confirmed.
                    </p>
                    <Link className="wv-btn wv-btn--ink" href="/#updates">
                      Get announcement updates <Out />
                    </Link>
                  </>
                )}
              </div>

              <div className="v-location__details">
                <p>
                  {SITE.venue
                    ? 'Use the details above to plan your visit. We’ll add any further access and on-site information as it is confirmed.'
                    : 'When the venue is confirmed, this page will include directions, access information and the facilities available to attendees.'}
                </p>
                <ul>
                  <li><span aria-hidden="true">01</span>Exact address and map</li>
                  <li><span aria-hidden="true">02</span>Arrival and transport guidance</li>
                  <li><span aria-hidden="true">03</span>Accessibility and on-site facilities</li>
                </ul>
              </div>
            </div>

            <aside className="v-location__note" data-reveal>
              <Weave accent />
              <span className="mono">{SITE.year} · DOUALA</span>
              <strong>{SITE.venue ? `See you at ${SITE.venue.name}.` : 'We’re choosing a place for the whole community.'}</strong>
              <p>
                {SITE.venue
                  ? 'Find the venue address, map and visitor details in the location panel.'
                  : 'Venue details will be published here once confirmed by the organizers.'}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section v-trip f-night" id="trip" aria-labelledby="v-trip-title">
        <Weave className="wv-corner wv-corner--tl" />
        <div className="wrap">
          <header className="v-section-head v-section-head--center" data-reveal>
            <p className="eyebrow">Visitor guide · {SITE.year}</p>
            <Title id="v-trip-title" lead="Plan your" main="trip." />
          </header>

          <div className="v-trip__grid" data-stagger>
            <article className="v-trip-card v-trip-card--stay">
              <span className="v-trip-card__number mono">01 / STAY</span>
              <h3>Accommodation</h3>
              <p>
                We’ll share recommended hotels near the conference venue and any attendee rates after the location is
                confirmed.
              </p>
              <p className="v-trip-card__aside">
                Douala has options across a range of budgets. Check back here for the 2027 partner list and booking
                details.
              </p>
            </article>

            <article className="v-trip-card v-trip-card--arrival">
              <span className="v-trip-card__number mono">02 / ARRIVAL</span>
              <h3>Getting there</h3>
              <ul className="v-arrivals">
                <li>
                  <strong>By air</strong>
                  <span>Douala International Airport (DLA) serves the city and international arrivals.</span>
                </li>
                <li>
                  <strong>By road</strong>
                  <span>Intercity coaches connect Douala with Yaoundé and other major cities.</span>
                </li>
                <li>
                  <strong>In town</strong>
                  <span>Local taxis and ride-hailing services are common ways to get around.</span>
                </li>
              </ul>
              <p className="v-trip-card__aside">We’ll add venue-specific routes and arrival tips when the location is announced.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section v-explore f-sun" aria-labelledby="v-explore-title">
        <Weave accent className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="v-section-head v-explore__head" data-reveal>
            <div>
              <p className="eyebrow">Make time for the city</p>
              <Title id="v-explore-title" lead="Explore" main="Douala." />
            </div>
            <p className="v-explore__intro">
              Cameroon’s port city is full of art, markets and stories along the Wouri. Here are a few places to start.
            </p>
          </header>

          <div className="v-sight-grid" data-stagger>
            {FEATURED_SIGHTS.map((sight, index) => {
              const photo = SIGHT_PHOTOS[sight.name as keyof typeof SIGHT_PHOTOS];
              return (
                <article className="v-sight-card" key={sight.name}>
                  <figure className="v-sight-card__photo">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1100px) 25vw, (min-width: 680px) 50vw, 100vw" />
                    <figcaption className="wv-stk wv-stk--paper">{sight.area}</figcaption>
                  </figure>
                  <div className="v-sight-card__copy">
                    <span className="v-sight-card__number mono">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{sight.name}</h3>
                    <p>{sight.body}</p>
                    <a className="v-sight-card__map" href={sight.maps} target="_blank" rel="noreferrer">
                      Map <Arrow dir="out" />
                    </a>
                    <p className="v-sight-card__credit">
                      Photo: <a href={photo.source} target="_blank" rel="noreferrer">{photo.author} / Wikimedia Commons</a>
                      {' · '}
                      <a href={LICENSE_URL} target="_blank" rel="noreferrer">CC BY-SA 3.0</a>
                      {' · cropped'}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {MORE_SIGHTS.length > 0 && (
            <ul className="v-sight-more" aria-label="More places to explore">
              {MORE_SIGHTS.map((sight) => (
                <li key={sight.name}>
                  <span>{sight.name}</span>
                  <a href={sight.maps} target="_blank" rel="noreferrer" aria-label={`Find ${sight.name} on Google Maps`}>
                    Map <Arrow dir="out" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          <a className="wv-btn wv-btn--ink v-explore__cta" href="https://www.destinationdouala.com/" target="_blank" rel="noreferrer">
            Discover more of Douala <Out />
          </a>

          <div className="v-explore__archive">
            <p>Last year, PyCon Cameroon brought the community together in {EDITION_2026.city}.</p>
            <a className="link" href={LINKS.report2026} target="_blank" rel="noreferrer">
              Read the 2026 event report <Out />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
