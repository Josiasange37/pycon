import type { MetadataRoute } from 'next';
import { KEYNOTES_2026, PHOTOS, SPONSORS_2026, TEAM } from '../content/edition2026';
import { SPEAKER_PHOTOS_2026 } from '../content/speakers2026';

const BASE = 'https://cm.pycon.org';
const ROUTES = ['', '/about', '/agenda', '/ubucon', '/speakers', '/sponsors', '/attend', '/venue', '/report/2026', '/akana'];

const keynotePhotos = KEYNOTES_2026.map((keynote) => keynote.photo.src);
const speakerPhotos = Object.values(SPEAKER_PHOTOS_2026);
const sponsorLogos = SPONSORS_2026.flatMap((tier) => tier.sponsors.flatMap((sponsor) => sponsor.logo ? [sponsor.logo] : []));
const partnerLogos = [
  '/partners/ubucon-cameroon.webp',
  '/partners/django-cameroon.webp',
  '/partners/angular-cameroon.webp',
  '/partners/aws-user-group-douala.webp',
  '/partners/gdg-yaounde.webp',
  '/partners/microsoft-user-group-cameroon.webp',
  '/partners/onyani.webp',
  '/partners/reckot.webp',
];

const IMAGES_BY_ROUTE: Record<string, string[]> = {
  '': [
    '/hero/badge.webp',
    '/hero/statue-woven.webp',
    '/hero/badge-large.webp',
    PHOTOS.closing.src,
    PHOTOS.hall.src,
    PHOTOS.laptops.src,
    PHOTOS.friends.src,
    PHOTOS.graffiti.src,
    ...keynotePhotos,
    ...sponsorLogos,
  ],
  '/about': [
    PHOTOS.hands.src,
    PHOTOS.notes.src,
    PHOTOS.lunch.src,
    PHOTOS.attendees.src,
    ...TEAM.map((person) => person.image),
    ...partnerLogos,
  ],
  '/agenda': [...keynotePhotos, ...speakerPhotos],
  '/speakers': [...keynotePhotos, ...speakerPhotos],
  '/sponsors': [PHOTOS.sponsorsSlide.src, ...sponsorLogos],
  '/venue': [
    '/hero/statue.webp',
    '/venue/nouvelle-liberte.webp',
    '/venue/pagode-douala.webp',
    '/venue/cathedrale-douala.webp',
    '/venue/wouri-bridge.webp',
  ],
  '/report/2026': [PHOTOS.closing.src, PHOTOS.attendees.src, ...keynotePhotos],
  '/akana': ['/akana-profile.webp'],
  '/ubucon': [
    '/partners/ubucon-cameroon.webp',
    PHOTOS.adonis.src,
    SPEAKER_PHOTOS_2026['Muluh Azinwi Success Ndahi’li'],
    SPEAKER_PHOTOS_2026['Edmond Makolle'],
    SPEAKER_PHOTOS_2026['Steve Yonkeu'],
    SPEAKER_PHOTOS_2026['Daniele Procida'],
    SPEAKER_PHOTOS_2026['Pedro Leão da Cruz'],
    SPEAKER_PHOTOS_2026['Jean Marc Wogue'],
    SPEAKER_PHOTOS_2026['Ariane Djeupang J'],
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => {
    const imagePaths = [...new Set(IMAGES_BY_ROUTE[route] ?? [])];

    return {
      url: route ? `${BASE}${route}` : `${BASE}/`,
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.7,
      ...(imagePaths.length > 0 && { images: imagePaths.map((path) => new URL(path, `${BASE}/`).toString()) }),
    };
  });
}
