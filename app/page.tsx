import type { Metadata } from 'next';
import Hero from '../components/Hero';
import HomeSections from '../components/HomeSections';
import Welcome from '../components/Welcome';
import { SITE } from '../lib/site';
import { PageScope } from '../components/ui';
import './home.css';

export const metadata: Metadata = { alternates: { canonical: '/' } };

const EVENT_LD = SITE.dates?.start && SITE.dates.end && SITE.venue?.name && SITE.venue.address
  ? {
      '@context': 'https://schema.org',
      '@type': 'Event',
      '@id': `https://cm.pycon.org/#pycon-cameroon-${SITE.year}`,
      name: `${SITE.name} ${SITE.year}`,
      description: `${SITE.name} ${SITE.year}, Cameroon’s Python conference in ${SITE.city}.`,
      startDate: SITE.dates.start,
      endDate: SITE.dates.end,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url: 'https://cm.pycon.org/',
      image: 'https://cm.pycon.org/opengraph-image',
      location: {
        '@type': 'Place',
        name: SITE.venue.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.venue.address,
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        hasMap: SITE.venue.mapsUrl,
      },
      organizer: { '@id': 'https://cm.pycon.org/#organization' },
    }
  : null;

export default function Home() {
  return (
    <PageScope name="home">
      {EVENT_LD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LD) }} />}
      <Hero />
      <Welcome />
      <HomeSections />
    </PageScope>
  );
}
