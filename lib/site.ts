/**
 * Everything that changes as the 2027 edition takes shape lives here.
 * When the dates, venue, call for proposals or tickets are confirmed, edit this file only.
 */

export const SITE = {
  name: 'PyCon Cameroon',
  year: 2027,
  city: 'Douala',
  region: 'Littoral Region',
  country: 'Cameroon',
  url: 'https://cm.pycon.org/2027',
  /** null until confirmed: the site then shows "to be announced" */
  dates: null as null | { start: string; end: string; label: string },
  venue: null as null | { name: string; address: string; mapsUrl: string },
  languages: 'English and French',
  email: 'organizers@pythoncameroon.org',
  timezone: 'Africa/Douala',
} as const;

/** Where each part of the cycle stands. Flip these as the year goes on. */
export const STATUS = {
  cfp: 'soon' as 'soon' | 'open' | 'closed',
  tickets: 'soon' as 'soon' | 'on-sale' | 'sold-out',
  financialAid: 'soon' as 'soon' | 'open' | 'closed',
  schedule: 'soon' as 'soon' | 'published',
};

export const LINKS = {
  past2026: 'https://cm.pycon.org/2026/en/',
  report2026: 'https://cm.pycon.org/2026/en/report',
  reportPdfEn: 'https://cm.pycon.org/reports/pycon-cameroon-2026-report-en.pdf',
  reportPdfFr: 'https://cm.pycon.org/reports/pycon-cameroon-2026-report-fr.pdf',
  agenda2026: 'https://cm.pycon.org/2026/en/agenda',
  codeOfConduct: 'https://cm.pycon.org/2026/en/code-of-conduct',
  prospectus2026: 'https://ly.reckot.com/sponsor-pyconcm26',
  evisa: 'https://www.evisacam.cm',
  psf: 'https://www.python.org/psf-landing/',
  mail: (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`,
};

export const SOCIAL = [
  { label: 'WhatsApp community', short: 'WhatsApp', href: 'https://chat.whatsapp.com/Ckc80ophGEH0NJFmZAzDMr' },
  { label: 'Discord server', short: 'Discord', href: 'https://discord.gg/mC5zzqGmQ5' },
  { label: 'LinkedIn', short: 'LinkedIn', href: 'https://linkedin.com/company/PythonCameroon' },
  { label: 'X (Twitter)', short: 'X', href: 'https://x.com/PythonCameroon' },
  { label: 'GitHub', short: 'GitHub', href: 'https://github.com/PythonCameroon' },
];

export const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Programme', href: '/agenda' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Attend', href: '/attend' },
  { label: 'Douala', href: '/venue' },
];

export const datesLabel = () => SITE.dates?.label ?? `${SITE.year} · dates to be announced`;
export const venueLabel = () => SITE.venue?.name ?? 'To be announced';
