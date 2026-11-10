/*
 * The conference programme, day by day. Durations are worked out from the times, never
 * typed in. Days 2 and 3 only hold their keynotes so far: `complete: false` tells the page
 * to say the rest of that day is still to be published.
 */

export type Kind = 'keynote' | 'talk' | 'workshop';
export type Room = 'Ndolé' | 'Koki' | 'Eru';

export type Session = {
  kind: Kind;
  title: string;
  start?: string;
  end?: string;
  speaker?: string;
  room: Room;
  topic?: string;
  lang: string;
};

export type Slot =
  | { type: 'break'; start: string; end?: string; label: string }
  | { type: 'sessions'; start?: string; sessions: Session[] };

export type Day = { id: string; label: string; date: string; complete: boolean; slots: Slot[] };

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
        sessions: [{ kind: 'keynote', title: 'Opening ceremony', start: '09:00', end: '09:10', room: 'Ndolé', lang: 'EN / FR' }],
      },
      {
        type: 'sessions',
        start: '09:15',
        sessions: [
          { kind: 'keynote', title: 'La Tech, je t’aime, moi non plus', start: '09:15', end: '10:00', speaker: 'Sarah Abderemane', room: 'Ndolé', lang: 'FR' },
        ],
      },
      { type: 'break', start: '10:00', end: '11:10', label: 'Coffee break' },
      {
        type: 'sessions',
        start: '11:10',
        sessions: [
          { kind: 'talk', title: 'Python, Dart and Flutter: Native Performance with FFI', start: '11:10', end: '11:45', speaker: 'Yunwen Eric', room: 'Koki', topic: 'Web / Security', lang: 'EN' },
          { kind: 'talk', title: 'Open Source Impact: How Python Communities Solve Real Problems', start: '11:10', end: '11:45', speaker: 'Johnpaul Hampo', room: 'Eru', topic: 'Community / Open Source', lang: 'EN' },
          { kind: 'talk', title: 'Architecture microservices avec Django, FastAPI, RabbitMQ', start: '11:10', end: '11:45', speaker: 'Adrien Sani', room: 'Ndolé', topic: 'DevOps / Cloud', lang: 'FR' },
        ],
      },
      {
        type: 'sessions',
        start: '11:50',
        sessions: [
          { kind: 'talk', title: 'From Belief to Impact: Why Skills Alone Are Not Enough', start: '11:50', end: '12:25', speaker: 'Linuce Demanou', room: 'Koki', topic: 'Web / Security', lang: 'EN' },
          { kind: 'talk', title: 'Beyond Keywords: Vector Search Engine From Scratch', start: '11:50', end: '12:25', speaker: 'Lobga Julius', room: 'Eru', topic: 'AI / Data Science', lang: 'EN' },
          { kind: 'talk', title: 'Stop Clicking in AWS: Django + Terraform', start: '11:50', end: '12:25', speaker: 'Ndongmo Christian', room: 'Ndolé', topic: 'DevOps / Cloud', lang: 'FR / EN' },
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
          { kind: 'talk', title: 'AutoXAI : Diagnostic automobile intelligent avec Python', start: '14:15', end: '14:50', speaker: 'Marcela Djoukouo Talotsing', room: 'Ndolé', topic: 'IoT & Hardware', lang: 'FR' },
          { kind: 'talk', title: 'Patrick’s Tips to Get a Job/Internship as a Developer', start: '14:15', end: '14:50', speaker: 'Patrick Nounga', room: 'Ndolé', topic: 'AI / Data Science', lang: 'FR / EN' },
        ],
      },
      { type: 'break', start: '14:50', end: '15:50', label: 'Coffee break' },
      {
        type: 'sessions',
        start: '15:50',
        sessions: [
          { kind: 'workshop', title: 'The Silent Bugs in Tech: Debugging Burnout & Cognitive Overload', start: '15:50', end: '16:55', speaker: 'Sema Kumbela Fombutu', room: 'Ndolé', lang: 'EN' },
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
    // only the keynote is known; its time is not confirmed
    complete: false,
    slots: [
      {
        type: 'sessions',
        sessions: [{ kind: 'keynote', title: 'Building a SaaS in Africa to the World', speaker: 'Adonis Simo', room: 'Ndolé', lang: 'FR' }],
      },
    ],
  },
  {
    id: 'day-3',
    label: 'Day 3',
    date: 'Saturday, September 19, 2026',
    // only the keynote is known; its time is not confirmed
    complete: false,
    slots: [
      {
        type: 'sessions',
        sessions: [
          { kind: 'keynote', title: 'AI Can Code, But It Can’t Think Like You (Yet): The Human in the Loop', speaker: 'Veliswa Boya', room: 'Ndolé', lang: 'EN' },
        ],
      },
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
