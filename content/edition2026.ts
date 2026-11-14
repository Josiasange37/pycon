/** The 2026 edition in Yaoundé: the recap shown across the 2027 site. Source: the 2026 report. */

export const EDITION_2026 = {
  name: 'PyCon Cameroon 2026',
  city: 'Yaoundé',
  dates: '17–19 September 2026',
  venue: 'Girafe Hôtel, Elig-Essono, Yaoundé',
};

export const STATS_2026 = [
  { value: '500+', label: 'people in the room' },
  { value: '34', label: 'speakers' },
  { value: '37', label: 'sessions' },
  { value: '6', label: 'speaker countries' },
];

export const FORMATS_2026 = [
  { label: 'Talks', value: 26 },
  { label: 'Workshops', value: 7 },
  { label: 'Keynotes', value: 3 },
  { label: 'Panel', value: 1 },
];

export const LANGUAGES_2026 = [
  { label: 'English', value: 18 },
  { label: 'Bilingual', value: 10 },
  { label: 'French', value: 9 },
];

export type Photo = { src: string; alt: string; caption?: string };

const p = (file: string, alt: string, caption?: string): Photo => ({ src: `/2026/${file}.webp`, alt, caption });

export const PHOTOS = {
  closing: p('day3-01', 'Hundreds of attendees cheering at the front of the hall at the end of PyCon Cameroon 2026', 'Closing session, day 3, Yaoundé'),
  hall: p('day1-01', 'A packed hall of attendees raising their arms in front of the conference backdrop', 'Day 1, the main hall'),
  team: p('cover', 'Organisers and volunteers of PyCon Cameroon 2026 posing in front of the sponsor wall', 'Organisers and volunteers'),
  keynote: p('day1-02', 'Sarah Abderemane giving the opening keynote with a microphone beside the projection screen', 'Opening keynote'),
  panel: p('day3-03', 'Five panellists seated on stage during the panel on tech jobs and AI', 'Panel on tech jobs and AI'),
  workshops: p('day2-02', 'A wide hall of attendees working on laptops at round tables', 'Workshop hall, day 2'),
  hands: p('day1-06', 'Audience members raising their hands during a session', 'Questions from the floor'),
  laptops: p('day2-06', 'Attendees at a round table with sticker-covered laptops, working together', 'Hands-on workshop'),
  friends: p('day2-07', 'Three attendees in conference T-shirts hugging and smiling', 'Between sessions'),
  graffiti: p('day3-05', 'A live graffiti canvas reading PyCon Cameroon held up on stage', 'Live graffiti, day 3'),
  lunch: p('day1-05', 'A smiling attendee holding a plate of food at lunch', 'Lunch together'),
  lineup: p('day3-07', 'Speakers, organisers and volunteers lined up on stage at the closing ceremony', 'Closing ceremony'),
  sponsorsSlide: p('day1-09', 'The host thanking sponsors in front of a projected slide of sponsor logos', 'Thanking the sponsors'),
  notes: p('day1-08', 'Two attendees taking handwritten notes during a talk', 'Taking notes'),
  sarah: p('day1-02', 'Sarah Abderemane on stage'),
  adonis: p('day2-04', 'Adonis Simo speaking with a handheld microphone'),
  veliswa: p('day3-02', 'Veliswa Boya laughing on stage'),
};

export type Keynote = {
  name: string;
  role: string;
  talk: string;
  day: string;
  lang: 'EN' | 'FR';
  photo: Photo;
};

export const KEYNOTES_2026: Keynote[] = [
  {
    name: 'Sarah Abderemane',
    role: 'Software engineer, accessibility advocate, Microsoft MVP',
    talk: 'La Tech, je t’aime, moi non plus',
    day: 'Day 1 · 17 September',
    lang: 'FR',
    photo: PHOTOS.sarah,
  },
  {
    name: 'Adonis Simo',
    role: 'Product builder at Martha IA, 3× AWS Certified',
    talk: 'Building a SaaS in Africa to the World',
    day: 'Day 2 · 18 September',
    lang: 'FR',
    photo: PHOTOS.adonis,
  },
  {
    name: 'Veliswa Boya',
    role: 'Senior Developer Advocate at AWS',
    talk: 'AI Can Code, But It Can’t Think Like You (Yet): The Human in the Loop',
    day: 'Day 3 · 19 September',
    lang: 'EN',
    photo: PHOTOS.veliswa,
  },
];

export type Sponsor = { name: string; url: string };
export type Tier = { tier: string; sponsors: Sponsor[] };

export const SPONSORS_2026: Tier[] = [
  { tier: 'Diamond', sponsors: [{ name: 'Canonical', url: 'https://canonical.com/' }] },
  { tier: 'Speaker dinner', sponsors: [{ name: 'AWS', url: 'https://aws.amazon.com/' }] },
  {
    tier: 'Bronze',
    sponsors: [
      { name: 'Apify', url: 'https://apify.com/' },
      { name: 'Valkey', url: 'https://valkey.io/' },
      { name: 'SupraPay', url: 'https://www.suprapay.io/' },
      { name: 'Trust Consulting', url: 'https://www.linkedin.com/company/trust-consulting-sarl' },
    ],
  },
  {
    tier: 'Community',
    sponsors: [
      { name: 'Black Python Devs', url: 'https://blackpythondevs.com/' },
      { name: 'CHAOSS', url: 'https://chaoss.community/' },
      { name: 'Django Software Foundation', url: 'https://www.djangoproject.com/foundation/' },
      { name: 'JetBrains', url: 'https://www.jetbrains.com/' },
      { name: 'DEFNA', url: 'https://www.defna.org/' },
    ],
  },
  { tier: 'Hosting', sponsors: [{ name: 'PythonAnywhere', url: 'https://www.pythonanywhere.com/' }] },
];

export const SPONSOR_NAMES_2026 = SPONSORS_2026.flatMap((t) => t.sponsors.map((s) => s.name));

export const PARTNERS_2026 = [
  { name: 'Django Cameroon', url: 'https://djangocameroon.org/' },
  { name: 'AWS User Group Douala', url: 'https://dla.awscmr.com/' },
  { name: 'Angular Cameroon', url: 'https://ngcameroon.org/' },
  { name: 'GDG Yaoundé', url: 'https://gdg.community.dev/gdg-yaounde' },
  { name: 'Microsoft User Group Cameroon', url: 'https://t.me/+uOFiAi93Sr42Nzhk' },
  { name: 'Onyani', url: 'https://onyani.com/' },
  { name: 'Reckot', url: 'https://reckot.com/' },
];

/** The 2026 packages, shown as a reference until the 2027 prospectus is out. */
export const PACKAGES_2026 = [
  { tier: 'Diamond', usd: '7,000', xaf: '1,000,000', includes: ['Premium booth', 'Keynote slot', 'Two talks', '10 tickets', 'Dedicated sponsor page'] },
  { tier: 'Gold', usd: '5,000', xaf: '500,000', includes: ['Booth', 'One talk', '5 tickets'] },
  { tier: 'Silver', usd: '3,000', xaf: '375,000', includes: ['One talk', '3 tickets'] },
  { tier: 'Bronze', usd: '1,500', xaf: '100,000', includes: ['One talk', '1 ticket', 'Logo on site and stage'] },
  { tier: 'Community', usd: '500', xaf: '50,000', includes: ['1 ticket', 'Logo on site'] },
];

export const TEAM = [
  { name: 'Steve Yonkeu', role: 'Lead, Python Cameroon · Conference chair' },
  { name: 'Edmond Makolle', role: 'Co-lead · Mentorship and learning' },
  { name: 'Abuambou Evodia', role: 'Project coordinator' },
  { name: 'Djoko Christian', role: 'Open source coordinator' },
  { name: 'Ange Demanou', role: 'Social media' },
  { name: 'Essi Junior', role: 'UI/UX and graphic design' },
  { name: 'Emy Njong', role: 'Organiser' },
];
