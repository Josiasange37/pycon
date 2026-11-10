/*
 * Everything the home page says below the hero, in one place, so the words can change
 * without touching the layout. Links marked '#' are placeholders until those pages exist.
 */

export type Keynote = {
  name: string;
  role: string;
  talk: string;
  day: string;
  date: string;
  room: string;
  lang: 'EN' | 'FR';
  /** a portrait in /public/speakers; until one is added, the card shows initials */
  photo?: string;
};

export const KEYNOTES: Keynote[] = [
  {
    name: 'Sarah Abderemane',
    role: 'Software Engineer, Accessibility Advocate and Microsoft MVP',
    talk: 'La Tech, je t’aime, moi non plus',
    day: 'Day 1',
    date: 'September 17, 2026',
    room: 'Ndolé',
    lang: 'FR',
  },
  {
    name: 'Adonis Simo',
    role: 'Product Builder, Martha IA, 3× AWS Certified',
    talk: 'Building a SaaS in Africa to the World',
    day: 'Day 2',
    date: 'September 18, 2026',
    room: 'Ndolé',
    lang: 'FR',
  },
  {
    name: 'Veliswa Boya',
    role: 'Developer Advocate at AWS',
    talk: 'AI Can Code, But It Can’t Think Like You (Yet): The Human in the Loop',
    day: 'Day 3',
    date: 'September 19, 2026',
    room: 'Ndolé',
    lang: 'EN',
  },
];

export type Sponsor = { name: string; url?: string; blurb?: string };
export type Tier = { tier: string; sponsors: Sponsor[] };

// names only until the logo files are added to /public/sponsors
export const SPONSOR_TIERS: Tier[] = [
  {
    tier: 'Diamond sponsor',
    sponsors: [
      {
        name: 'Canonical',
        url: 'https://canonical.com',
        blurb:
          'Canonical delivers secure, enterprise-grade open-source solutions used by millions of developers and organisations worldwide. Its flagship product, Ubuntu, is the world’s most used open-source OS and a go-to platform for cloud infrastructure and Python development. Canonical also offers MicroK8s, LXD and Ubuntu Pro.',
      },
    ],
  },
  { tier: 'Speaker dinner sponsor', sponsors: [{ name: 'AWS' }] },
  { tier: 'Bronze sponsors', sponsors: [{ name: 'Apify' }, { name: 'Valkey' }, { name: 'SupraPay' }, { name: 'Trust Consulting' }] },
  {
    tier: 'Community sponsors',
    sponsors: [{ name: 'Black Python Devs' }, { name: 'CHAOSS' }, { name: 'Django Software Foundation' }, { name: 'JetBrains' }, { name: 'DEFNA' }],
  },
  { tier: 'Hosting sponsor', sponsors: [{ name: 'PythonAnywhere' }] },
];

export const SPONSORS = SPONSOR_TIERS.flatMap((t) => t.sponsors.map((s) => s.name));

export type Expectation = { title: string; body: string; glyph: { group: number; index: number } };

// each one wears a mark from the cave wall (a group and glyph from art.json)
export const EXPECT: Expectation[] = [
  {
    title: 'Three keynotes',
    body: 'One to open each day of the conference, from people building with Python across Africa and beyond.',
    glyph: { group: 2, index: 2 },
  },
  {
    title: 'Talks in English and French',
    body: 'Sessions in both of Cameroon’s official languages, so everyone can follow and everyone can speak.',
    glyph: { group: 12, index: 1 },
  },
  {
    title: 'Hands-on workshops',
    body: 'Bring a laptop and leave with something working, from your first script to production deployments.',
    glyph: { group: 12, index: 0 },
  },
  {
    title: 'Two dedicated tracks',
    body: 'UbuCon Cameroon for Ubuntu and open source, and a Django track for the web.',
    glyph: { group: 2, index: 0 },
  },
  {
    title: 'A community to meet',
    body: 'Developers, students, founders and researchers from across the continent, in the same rooms for three days.',
    glyph: { group: 17, index: 0 },
  },
];

export type Track = {
  id: string;
  name: [string, string];
  colour: 'ubuntu' | 'django';
  intro: string[];
  highlights: { title: string; body: string }[];
  speakers: string;
  join: string;
};

export const TRACKS: Track[] = [
  {
    id: 'ubucon',
    name: ['UbuCon', 'Cameroon'],
    colour: 'ubuntu',
    intro: [
      'For the first time, PyCon Cameroon 2026 joins forces with UbuCon Cameroon to offer a track dedicated to Ubuntu and open source, co-organised by Python Cameroon and UbuCon Cameroon.',
      'Talks and workshops on Ubuntu, Linux system administration, open-source contribution, cloud infrastructure, and how Python powers the Ubuntu ecosystem.',
    ],
    highlights: [
      { title: 'Ubuntu & Python', body: 'How Python powers Ubuntu development, packaging and automation.' },
      { title: 'Open-source contributions', body: 'Getting started contributing to Ubuntu and open-source projects.' },
      { title: 'Cloud & infrastructure', body: 'Ubuntu Server, cloud-native development and DevOps with Python.' },
      { title: 'Community & networking', body: 'Meet the Ubuntu Cameroon community and connect with contributors worldwide.' },
    ],
    speakers: '#ubucon-speakers',
    join: '#ubucon-join',
  },
  {
    id: 'django',
    name: ['Django', 'Track'],
    colour: 'django',
    intro: [
      'PyCon Cameroon 2026 brings a Django track for web developers: from building robust web applications to REST APIs, through deployment best practice and scaling Django in production.',
      'Whether you are new to Django or a seasoned developer, the track offers practical workshops, real case studies and expert talks.',
    ],
    highlights: [
      { title: 'Web development with Django', body: 'Building modern web applications with Django and its best practices.' },
      { title: 'REST APIs & DRF', body: 'Designing and building APIs with Django REST Framework.' },
      { title: 'Deployment & scaling', body: 'Running in production, performance tuning and strategies for scale.' },
      { title: 'Django & AI/ML', body: 'Bringing machine-learning models and AI features into Django applications.' },
    ],
    speakers: '#django-speakers',
    join: '#django-join',
  },
];

export const FOOTER = {
  blurb: 'The first Python conference in Cameroon, bringing together developers, enthusiasts and innovators from across Africa and beyond.',
  columns: [
    {
      title: 'About',
      links: [
        { label: 'Overview', href: '/about' },
        { label: 'Team', href: '/about#team' },
        { label: 'Code of conduct', href: '/about#code-of-conduct' },
        { label: 'Python Software Foundation', href: 'https://www.python.org/psf/' },
      ],
    },
    {
      title: 'Programme',
      links: [
        { label: 'Agenda', href: '/agenda' },
        { label: '2026 Report', href: '#report' },
        { label: 'Speakers', href: '/speakers' },
        { label: 'Submission guide', href: '#' },
        { label: 'Attend', href: '/attend' },
        { label: 'Venue', href: '/venue' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'organizers@pythoncameroon.org', href: 'mailto:organizers@pythoncameroon.org' },
        { label: 'Sponsorship', href: '/sponsors' },
        { label: 'Support', href: '#' },
        { label: 'Financial aid', href: '#' },
      ],
    },
  ],
  legal: [
    { label: 'Terms and conditions', href: '#' },
    { label: 'Privacy policy', href: '#' },
    { label: 'Health & safety', href: '#' },
  ],
};
