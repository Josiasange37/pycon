/*
 * The conference programme, day by day. Durations are worked out from the times, never
 * typed in. Parallel sessions share a slot; the day tabs use the dates below.
 */

export type Kind = 'keynote' | 'talk' | 'workshop' | 'panel' | 'lightning';
export type Room = 'Ndolè' | 'Koki' | 'Eru';

export type Session = {
  kind: Kind;
  title: string;
  start?: string;
  end?: string;
  speaker?: string;
  speakers?: string[];
  room?: Room;
  topic?: string;
  lang: string;
};

export type Slot =
  | { type: 'break'; start: string; end?: string; label: string }
  | { type: 'sessions'; start?: string; sessions: Session[] };

export type Day = { id: string; label: string; date: string; subtitle?: string; complete: boolean; slots: Slot[] };

export const DAYS: Day[] = [
  {
    id: 'day-1',
    label: 'Day 1',
    date: 'Thursday, September 17, 2026',
    complete: true,
    slots: [
      { type: 'break', start: '08:30', end: '09:00', label: 'Registration & welcome coffee' },
      {
        type: 'sessions',
        start: '09:00',
        sessions: [{ kind: 'keynote', title: 'Opening ceremony', start: '09:00', end: '09:10', room: 'Ndolè', lang: 'EN / FR' }],
      },
      {
        type: 'sessions',
        start: '09:15',
        sessions: [
          { kind: 'keynote', title: 'La Tech, je t’aime, moi non plus', start: '09:15', end: '10:00', speaker: 'Sarah Abderemane', room: 'Ndolè', lang: 'FR' },
        ],
      },
      { type: 'break', start: '10:00', end: '11:10', label: 'Coffee break' },
      {
        type: 'sessions',
        start: '11:10',
        sessions: [
          { kind: 'talk', title: 'Python, Dart and Flutter: Native Performance with FFI', start: '11:10', end: '11:45', speaker: 'Yunwen Eric', room: 'Koki', topic: 'Web / Security', lang: 'EN' },
          { kind: 'talk', title: 'Open Source Impact: How Python Communities Solve Real Problems', start: '11:10', end: '11:45', speaker: 'Johnpaul Hampo', room: 'Eru', topic: 'Community / Open Source', lang: 'EN' },
          { kind: 'talk', title: 'Architecture microservices avec Django, FastAPI, RabbitMQ', start: '11:10', end: '11:45', speaker: 'Adrien Sani', room: 'Ndolè', topic: 'DevOps / Cloud', lang: 'FR' },
        ],
      },
      {
        type: 'sessions',
        start: '11:50',
        sessions: [
          { kind: 'talk', title: 'From Belief to Impact: Why Skills Alone Are Not Enough', start: '11:50', end: '12:25', speaker: 'Linuce Demanou', room: 'Koki', topic: 'Web / Security', lang: 'EN' },
          { kind: 'talk', title: 'Beyond Keywords: Vector Search Engine From Scratch', start: '11:50', end: '12:25', speaker: 'Lobga Julius', room: 'Eru', topic: 'AI / Data Science', lang: 'EN' },
          { kind: 'talk', title: 'Stop Clicking in AWS: Django + Terraform', start: '11:50', end: '12:25', speaker: 'Ndongmo Christian', room: 'Ndolè', topic: 'DevOps / Cloud', lang: 'FR / EN' },
        ],
      },
      { type: 'break', start: '12:25', end: '13:35', label: 'Lunch break' },
      {
        type: 'sessions',
        start: '13:35',
        sessions: [
          { kind: 'talk', title: 'From WSGI to ASGI: Modernizing Django', start: '13:35', end: '14:10', speaker: 'Parkson Tano Daniel', room: 'Koki', topic: 'Web / Security', lang: 'EN' },
          { kind: 'talk', title: 'Du Notebook à la production : FastAPI + Docker', start: '13:35', end: '14:10', speaker: 'Tayo Tate Desmond', room: 'Eru', topic: 'AI / Data Science', lang: 'FR / EN' },
        ],
      },
      {
        type: 'sessions',
        start: '14:15',
        sessions: [
          { kind: 'talk', title: 'Construire son propre serveur MCP avec Python', start: '14:15', end: '14:50', speaker: 'Claude Ndanda', room: 'Eru', topic: 'AI / Data Science', lang: 'FR' },
          { kind: 'talk', title: 'AutoXAI : Diagnostic automobile intelligent avec Python', start: '14:15', end: '14:50', speaker: 'Marcela Djoukouo Talotsing', room: 'Ndolè', topic: 'IoT & Hardware', lang: 'FR' },
          { kind: 'talk', title: 'Patrick’s Tips to Get a Job/Internship as a Developer', start: '14:15', end: '14:50', speaker: 'Patrick Nounga', room: 'Ndolè', topic: 'AI / Data Science', lang: 'FR / EN' },
        ],
      },
      { type: 'break', start: '14:50', end: '15:50', label: 'Coffee break' },
      {
        type: 'sessions',
        start: '15:50',
        sessions: [
          { kind: 'workshop', title: 'The Silent Bugs in Tech: Debugging Burnout & Cognitive Overload', start: '15:50', end: '16:55', speaker: 'Sema Kumbela Fombutu', room: 'Ndolè', lang: 'EN' },
        ],
      },
      { type: 'break', start: '16:55', end: '17:15', label: 'Community games & social hour: quizzes, networking, ice-breakers' },
      { type: 'break', start: '17:15', label: 'End of Day 1' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: 'Friday, September 18, 2026',
    subtitle: 'UbuCon Cameroon Day',
    complete: true,
    slots: [
      { type: 'break', start: '08:30', end: '09:00', label: 'Registration & Welcome Coffee' },
      {
        type: 'sessions',
        start: '09:00',
        sessions: [{
          kind: 'keynote',
          title: 'UbuCon Cameroon Opening',
          start: '09:00',
          end: '09:15',
          topic: 'Welcome, Ubuntu ecosystem update',
          lang: 'EN / FR',
        }],
      },
      {
        type: 'sessions',
        start: '09:20',
        sessions: [{ kind: 'keynote', title: 'Building a SaaS in Africa to the World', start: '09:20', end: '10:05', speaker: 'Adonis Simo', room: 'Ndolè', lang: 'FR' }],
      },
      {
        type: 'sessions',
        start: '10:10',
        sessions: [{ kind: 'workshop', title: "Built by Us: A Cameroonian's Roadmap to Open Source", start: '10:10', end: '11:15', speaker: 'Muluh Azinwi Success Ndahili', room: 'Ndolè', lang: 'EN' }],
      },
      {
        type: 'sessions',
        start: '11:20',
        sessions: [{ kind: 'workshop', title: 'Django + Valkey: Caching, Sessions & Real-Time the Open-Source Way', start: '11:20', end: '12:30', speakers: ['Edmond Makolle', 'Steve Yonkeu'], room: 'Ndolè', lang: 'EN / FR' }],
      },
      { type: 'break', start: '12:30', end: '13:40', label: 'Lunch break' },
      {
        type: 'sessions',
        start: '13:40',
        sessions: [{ kind: 'talk', title: 'Career Success & The Next 10 Years', start: '13:40', end: '14:15', speaker: 'Daniele Procida', room: 'Ndolè', lang: 'EN' }],
      },
      {
        type: 'sessions',
        start: '14:20',
        sessions: [{ kind: 'workshop', title: 'Jobs and Early-Career Success', start: '14:20', end: '14:55', speaker: 'Daniele Procida', room: 'Ndolè', lang: 'EN' }],
      },
      {
        type: 'sessions',
        start: '15:00',
        sessions: [{ kind: 'workshop', title: 'Beyond the Spreadsheet: Stand Out by Mastering Google Workspace AI', start: '15:00', end: '16:00', speaker: 'Pedro Leão da Cruz', room: 'Ndolè', lang: 'EN' }],
      },
      { type: 'break', start: '16:00', end: '16:20', label: 'UbuCon social & community games, networking' },
      {
        type: 'sessions',
        start: '16:20',
        sessions: [{ kind: 'workshop', title: 'Authentification 2FA : TOTP avec Django', start: '16:20', end: '17:15', speaker: 'Jean Marc Wogue', room: 'Ndolè', lang: 'FR' }],
      },
      {
        type: 'sessions',
        start: '17:20',
        sessions: [{ kind: 'workshop', title: 'Open Documentation Academy', start: '17:20', end: '18:30', speaker: 'Ariane Djeupang J.', room: 'Ndolè', lang: 'FR / EN' }],
      },
      { type: 'break', start: '18:30', label: 'End of Day 2' },
    ],
  },
  {
    id: 'day-3',
    label: 'Day 3',
    date: 'Saturday, September 19, 2026',
    complete: true,
    slots: [
      {
        type: 'sessions',
        start: '09:00',
        sessions: [
          { kind: 'keynote', title: "AI Can Code, But It Can't Think Like You (Yet): The Human in the Loop", start: '09:00', end: '09:45', speaker: 'Veliswa Boya', room: 'Ndolè', lang: 'EN' },
        ],
      },
      { type: 'break', start: '09:45', end: '10:05', label: 'Coffee break' },
      {
        type: 'sessions',
        start: '10:05',
        sessions: [
          { kind: 'talk', title: 'Python in the Browser: No Install, No Barrier', start: '10:05', end: '10:30', speaker: 'Hypolit Zeuchieu', room: 'Koki', topic: 'Python / Security', lang: 'FR / EN' },
          { kind: 'talk', title: 'Thinking Like a Data Scientist: IBM Methodology', start: '10:05', end: '10:30', speaker: 'Tayo Tate Desmond', room: 'Eru', topic: 'AI / Data Science', lang: 'EN' },
          { kind: 'talk', title: 'L’illusion du développeur augmenté : quand l’IA facilite le code mais exige plus d’expertise', start: '10:05', end: '10:30', speaker: 'Brandon Kamga', room: 'Ndolè', topic: 'Web / Community', lang: 'FR' },
        ],
      },
      {
        type: 'sessions',
        start: '10:35',
        sessions: [
          { kind: 'talk', title: 'Speed Up Your Python Program With Concurrency', start: '10:35', end: '11:00', speaker: 'Yannik Kadjie', room: 'Koki', topic: 'Python / Security', lang: 'FR' },
          { kind: 'talk', title: 'Zero-Touch Dashboards: Django + Metabase per-user governance', start: '10:35', end: '11:00', speaker: 'Ariane Djeupang J.', room: 'Eru', topic: 'AI / Data Science', lang: 'EN / FR' },
          { kind: 'talk', title: 'Architecture à budget zéro : cloud design decisions', start: '10:35', end: '11:00', speaker: 'Jerry Davis Ndjana Mengue', room: 'Ndolè', topic: 'Web / Community', lang: 'FR / EN' },
        ],
      },
      {
        type: 'sessions',
        start: '11:05',
        sessions: [
          { kind: 'talk', title: 'Creative Coding with Matplotlib: Turning Data into Art', start: '11:05', end: '11:30', speaker: 'Marielle Daha', room: 'Koki', topic: 'Python / Security', lang: 'EN' },
          { kind: 'talk', title: "AI Is Not a Tool: It's a Workflow (Claude, Codex, Figma)", start: '11:05', end: '11:30', speaker: 'Emambou Ulrich', room: 'Eru', topic: 'AI / Data Science', lang: 'EN' },
          { kind: 'talk', title: 'Stay in Django, Go Reactive (Django Unicorn)', start: '11:05', end: '11:30', speaker: 'Adonis Simo', room: 'Ndolè', topic: 'Web / Community', lang: 'FR / EN' },
        ],
      },
      { type: 'break', start: '11:30', end: '12:40', label: 'Lunch break' },
      {
        type: 'sessions',
        start: '12:40',
        sessions: [{ kind: 'panel', title: 'Tech Jobs & AI: Surviving Automation, Excelling at Creating Value', start: '12:40', end: '13:25', speakers: ['Daniele Procida', 'Veliswa Boya', 'Leslye Nkwa', 'Marc Daha'], room: 'Ndolè', lang: 'EN / FR' }],
      },
      {
        type: 'sessions',
        start: '13:30',
        sessions: [
          { kind: 'talk', title: "Hacking with Python: Cameroon's Digital Security", start: '13:30', end: '13:55', speaker: 'Mvenyi Donald', room: 'Koki', topic: 'Python / Security', lang: 'EN' },
          { kind: 'talk', title: 'L’importance de la cohérence des données : 03 bonnes pratiques', start: '13:30', end: '13:55', speaker: 'Leslye Nkwa', room: 'Eru', topic: 'AI / Data Science', lang: 'FR' },
          { kind: 'talk', title: 'AI-Powered Smart Agriculture: Greenhouse & Poultry Systems', start: '13:30', end: '13:55', speaker: 'Ayuk Princelen Tanyi', room: 'Ndolè', topic: 'IoT & Hardware', lang: 'EN' },
        ],
      },
      {
        type: 'sessions',
        start: '14:00',
        sessions: [
          { kind: 'talk', title: 'You Don’t Need an App: Solving Real Problems With a Dumb WhatsApp Bot', start: '14:00', end: '14:25', speaker: 'Chifen Sama', room: 'Ndolè', lang: 'EN' },
          { kind: 'talk', title: 'Maximizing the Use of Open Source', start: '14:00', end: '14:25', speaker: 'Samuel Tiokeng', room: 'Ndolè', lang: 'EN' },
        ],
      },
      { type: 'break', start: '14:25', end: '14:45', label: 'Coffee break' },
      {
        type: 'sessions',
        start: '14:45',
        sessions: [{ kind: 'lightning', title: 'Lightning talks — open floor (5-min slots, all attendees welcome)', start: '14:45', end: '15:15', room: 'Ndolè', lang: 'EN / FR' }],
      },
      { type: 'break', start: '15:15', end: '16:10', label: 'Closing ceremony + community games — awards, photos, networking' },
      { type: 'break', start: '16:10', label: 'End of Day 3 — see you next year!' },
    ],
  },
];

const minutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

/** "35 min", "1 h 05" — the length of a session, from its times. */
export function duration(start?: string, end?: string) {
  if (!start || !end) return undefined;
  const d = minutes(end) - minutes(start);
  if (d < 60) return `${d} min`;
  const h = Math.floor(d / 60);
  const m = d % 60;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
}
