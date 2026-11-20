/**
 * The 2026 speakers besides the keynotes, as listed on the 2026 site. Entries ending in '…'
 * were cut short in the source; the page only shows text that is complete.
 */

import { KEYNOTES_2026 } from './edition2026';

export const TOPICS = [
  'Machine learning & AI',
  'Web development',
  'DevOps & infrastructure',
  'Open source',
  'Community',
  'Python core',
  'IoT & hardware',
  'Social impact',
  'Ubuntu & Linux',
  'Cybersecurity',
  'Education',
] as const;

export type Topic = (typeof TOPICS)[number];

export type Speaker = { name: string; role: string; talk: string; topics: Topic[] };

/** Profile photos from the official PyCon Cameroon 2026 speaker page. */
export const SPEAKER_PHOTOS_2026: Record<string, string> = {
  'Adrien Sani': '/speakers/Adrien_Sani.webp',
  'Ariane Djeupang J': '/speakers/Ariane_Djeupang_J.webp',
  'Ayuk Princelen Tanyi': '/speakers/Ayuk_Princelen_Tanyi.webp',
  'Chifen Sama': '/speakers/Chifen_Sama.webp',
  'Claude Ndanda': '/speakers/Claude_Ndanda.webp',
  'Daniele Procida': '/speakers/Daniele_Procida.webp',
  'Emambou Ulrich': '/speakers/Emambou_Ulrich.webp',
  'Edmond Makolle': '/speakers/Edmond_Makole.webp',
  'Hypolit Zeuchieu': '/speakers/Hypolit_Zeuchieu.webp',
  'Jean Marc Wogue': '/speakers/Jean_Marc_Wogue.webp',
  'Jerry Davis Ndjana Mengue': '/speakers/Jerry_Davis_Ndjana_Mengue.webp',
  'Johnpaul Hampo': '/speakers/Johnpaul_Hampo.webp',
  'Leslye Nkwa': '/speakers/Leslye_Nkwa.webp',
  'Linuce Demanou': '/speakers/Linuce_Demanou.webp',
  'Lobga Julius': '/speakers/Lobga_Julius.webp',
  'Marcela Djoukouo Talotsing': '/speakers/Marcela_Djoukouo_Talotsing.webp',
  'Marc Daha': '/speakers/Marc_Daha.webp',
  'Marielle Daha': '/speakers/Marielle_Daha.webp',
  'Muluh Azinwi Success Ndahi’li': '/speakers/Muluh_Azinwi_Success_Ndahili.webp',
  'Mvenyi Donald': '/speakers/Mvenyi_Donald.webp',
  'Ndongmo Christian': '/speakers/Ndongmo_Christian.webp',
  'Parkson Tano Daniel': '/speakers/Parkson_Tano_Daniel.webp',
  'Pedro Leão da Cruz': '/speakers/Pedro_Leao_da_Cruz.webp',
  'Patrick Nounga': '/speakers/Patrick_Nounga.webp',
  'Samuel Tiokeng': '/speakers/Samuel_Tiokeng.webp',
  'Sema Kumbela Fombutu': '/speakers/Sema_Kumbela_Fombutu.webp',
  'Steve Yonkeu': '/speakers/Steve_Yonkeu.webp',
  'Tayo Tate Desmond Corentin': '/speakers/Tayo_Tate_Desmond_Corentin.webp',
  'Brandon Kamga': '/speakers/Brandon_Kamga.webp',
  'Yannik Kadjie': '/speakers/Yannik_Kadjie.webp',
  'Yunwen Eric': '/speakers/Yunwen_Eric.webp',
};

/**
 * Folds case, accents and punctuation, so the programme's spelling of a name
 * ("Ariane Djeupang J.", "Muluh Azinwi Success Ndahili") finds the speaker list's.
 */
export const nameKey = (name: string) =>
  name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

const PHOTO_BY_NAME = new Map<string, string>([
  ...KEYNOTES_2026.map((keynote) => [nameKey(keynote.name), keynote.photo.src] as const),
  ...Object.entries(SPEAKER_PHOTOS_2026).map(([name, src]) => [nameKey(name), src] as const),
]);

/**
 * The single place a 2026 speaker's photo is looked up, by the name as any page writes it:
 * an exact match first, else the listed name it shortens ("Tayo Tate Desmond" → "… Corentin").
 */
export function speakerPhoto(name: string): string | undefined {
  const key = nameKey(name);
  if (!key) return undefined;
  const exact = PHOTO_BY_NAME.get(key);
  if (exact) return exact;
  for (const [listed, src] of PHOTO_BY_NAME) if (listed.startsWith(key)) return src;
  return undefined;
}

export const SPEAKERS: Speaker[] = [
  {
    name: 'Adrien Sani',
    role: 'Développeur Fullstack spécialisé en architectures…', // truncated in the mockup, confirm
    talk: 'Architecture microservices avec Django, FastAPI, RabbitMQ',
    topics: ['Web development'],
  },
  {
    name: 'Ariane Djeupang J',
    role: 'ML Engineer',
    talk: 'Open Documentation Academy',
    topics: ['Ubuntu & Linux'],
  },
  {
    name: 'Ayuk Princelen Tanyi',
    role: 'Group leader and ML developer',
    talk: 'AI-Powered Smart Agriculture: Greenhouse &…', // truncated in the mockup, confirm
    topics: ['IoT & hardware'],
  },
  {
    name: 'Chifen Sama',
    role: 'Nurse & developer — I build boringly simple tech that h…', // truncated in the mockup, confirm
    talk: 'You Don’t Need an App: Solving Real Problems Wit…', // truncated in the mockup, confirm
    topics: ['Social impact'],
  },
  {
    name: 'Claude Ndanda',
    role: 'Software Engineer',
    talk: 'Construire son propre serveur MCP avec Python',
    topics: ['Machine learning & AI'],
  },
  {
    name: 'Daniele Procida',
    role: 'Director of Engineering @ Canonical',
    talk: 'Career Success & The Next 10 Years',
    topics: ['Community'],
  },
  {
    name: 'Emambou Ulrich',
    role: 'Chief Product Officer, NOVA HEALTHTECH',
    talk: 'AI Is Not a Tool: It’s a Workflow (Claude, Codex,…', // truncated in the mockup, confirm
    topics: ['Machine learning & AI'],
  },
  {
    name: 'Edmond Makolle',
    role: 'Backend Engineer, Freelancer & Python…', // truncated in the mockup, confirm
    talk: 'Django + Valkey: Caching, Sessions & Real-Time the…', // truncated in the mockup, confirm
    topics: ['DevOps & infrastructure'],
  },
  {
    name: 'Hypolit Zeuchieu',
    role: 'Trust Consulting, Backend Developer',
    talk: 'Python in the Browser: No Install, No Barrier',
    topics: ['Python core'],
  },
  {
    name: 'Jean Marc Wogue',
    role: 'Web developer',
    talk: 'Authentification 2FA : TOTP avec Django',
    topics: ['Web development'],
  },
  {
    name: 'Jerry Davis Ndjana Mengue',
    role: 'IT Manager',
    talk: 'Architecture à budget zéro : cloud design decisions',
    topics: ['DevOps & infrastructure'],
  },
  {
    name: 'Johnpaul Hampo',
    role: 'Founder, Hamplus Technologies International…', // truncated in the mockup, confirm
    talk: 'Open Source Impact: How Python Communities Solve Real Problems',
    topics: ['Open source'],
  },
  {
    name: 'Leslye Nkwa',
    role: 'Alea jacta est.',
    talk: 'L’importance de la cohérence des données : 0…', // truncated in the mockup, confirm
    topics: ['Machine learning & AI'],
  },
  {
    name: 'Linuce Demanou',
    role: 'Camertronix, ML Engineer',
    talk: 'From Belief to Impact: Why Skills Alone Are Not Enough',
    topics: ['Community'],
  },
  {
    name: 'Lobga Julius',
    role: 'AI and Software Engineer at InchTechs',
    talk: 'Beyond Keywords: Vector Search Engine From Scratch',
    topics: ['Machine learning & AI'],
  },
  {
    name: 'Marcela Djoukouo Talotsing',
    role: 'Prévoir la panne aujourd’hui, sauver une vie demain.',
    talk: 'AutoXAI : Diagnostic automobile intelligent avec Python',
    topics: ['IoT & hardware'],
  },
  {
    name: 'Marc Daha',
    role: 'Digital Project Manager & CEO | Hinkaku Ltd',
    talk: 'Emploi Tech & IA : Survivre à l’automatisation, exceller…', // truncated in the mockup, confirm
    topics: ['Community'],
  },
  {
    name: 'Marielle Daha',
    role: 'CS student & aspiring ML engineer | University of…', // truncated in the mockup, confirm
    talk: 'Creative Coding with Matplotlib: Turning Data int…', // truncated in the mockup, confirm
    topics: ['Python core'],
  },
  {
    name: 'Muluh Azinwi Success Ndahi’li',
    role: 'Above & Beyond',
    talk: 'Built by Us: A Cameroonian’s Roadmap to Open Source',
    topics: ['Open source'],
  },
  {
    name: 'Mvenyi Donald',
    role: 'Corynth Tech',
    talk: 'Hacking with Python: Cameroon’s Digital Security',
    topics: ['Cybersecurity'],
  },
  {
    name: 'Ndongmo Christian',
    role: 'Senior Backend & DevOps Architect @ HooYia | DevOp…', // truncated in the mockup, confirm
    talk: 'Stop Clicking in AWS: Django + Terraform',
    topics: ['DevOps & infrastructure'],
  },
  {
    name: 'Parkson Tano Daniel',
    role: 'QUICKERPAY, CTO',
    talk: 'From WSGI to ASGI: Modernizing Django',
    topics: ['Web development'],
  },
  {
    name: 'Pedro Leão da Cruz',
    role: 'Engineering Manager @ Canonical',
    talk: 'Beyond the Spreadsheet: Stand Out by Mastering…', // truncated in the mockup, confirm
    topics: ['Machine learning & AI'],
  },
  {
    name: 'Patrick Nounga',
    role: 'Law & HR professional, Head of board of Directors, Huma…', // truncated in the mockup, confirm
    talk: 'Patrick’s Tips to Get a Job/Internship as a Developer',
    topics: ['Community'],
  },
  {
    name: 'Samuel Tiokeng',
    role: 'DevOps Engineer @ ProgressSoft Corporation',
    talk: 'Maximizing the Use of Open Source',
    topics: ['Open source'],
  },
  {
    name: 'Sema Kumbela Fombutu',
    role: 'People-Systems-Legacy: building resilient people an…', // truncated in the mockup, confirm
    talk: 'The Silent Bugs in Tech: Debugging Burnout & Cognitive Overload',
    topics: ['Social impact'],
  },
  {
    name: 'Steve Yonkeu',
    role: 'Chair, PyCon Cameroon | Software Engineer | Microso…', // truncated in the mockup, confirm
    talk: 'Django + Valkey: Caching, Sessions & Real-Time the…', // truncated in the mockup, confirm
    topics: ['DevOps & infrastructure'],
  },
  {
    name: 'Tayo Tate Desmond Corentin',
    role: 'ISDEV EXPERTS, IA & Data, Data scientist',
    talk: 'Du Notebook à la production : FastAPI + Docker',
    topics: ['Machine learning & AI'],
  },
  {
    name: 'Brandon Kamga',
    role: 'Cloud Native & AI Engineer',
    talk: 'L’illusion du développeur augmenté : quand l’IA facili…', // truncated in the mockup, confirm
    topics: ['Education'],
  },
  {
    name: 'Yannik Kadjie',
    role: 'Software Developer',
    talk: 'Speed Up Your Python Program With Concurrency',
    topics: ['Python core'],
  },
  {
    name: 'Yunwen Eric',
    role: 'Building the Future with Flutter | Web Developer |…', // truncated in the mockup, confirm
    talk: 'Python, Dart and Flutter: Native Performance with FFI',
    topics: ['Open source'],
  },
];
