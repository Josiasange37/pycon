/*
 * Every confirmed speaker of PyCon Cameroon 2026 besides the keynotes, as the mockup lists them.
 * Where the mockup cut a role or a title short with '…', the full title comes from the Day 1
 * agenda when it is there; otherwise the text is kept as far as it was legible.
 */

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

// the mockup shows '+1 more' or '+2 more' on a few cards without naming the extra topics;
// only the topics it shows are listed
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
