import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '../../components/Mark';
import { DAYS, duration, type Session } from '../../content/schedule2026';
import { pageMetadata } from '../../lib/seo';
import UbuConHero from './UbuConHero';
import './ubucon.css';

export const metadata = pageMetadata({
  title: 'UbuCon Cameroon 2026 | PyCon Cameroon',
  description: 'Discover UbuCon Cameroon 2026, co-organized with PyCon Cameroon: a celebration of Ubuntu, open source, Linux, cloud, packaging and IoT.',
  path: '/ubucon',
  absoluteTitle: true,
});

const topics = [
  {
    number: '01',
    title: 'Ubuntu & Python',
    description: 'How Python powers Ubuntu development, packaging, system tools, and automation. From apt to Juju, Python is everywhere in Ubuntu.',
  },
  {
    number: '02',
    title: 'Linux system administration',
    description: 'Managing Ubuntu servers, desktop environments, networking, and security best practices for developers and sysadmins.',
  },
  {
    number: '03',
    title: 'Open source contributions',
    description: 'Getting started with open source, contributing to Ubuntu and upstream projects, and building a portfolio through FOSS.',
  },
  {
    number: '04',
    title: 'Cloud & infrastructure',
    description: 'Ubuntu Server, LXD, MicroK8s, cloud-native development, and deploying Python applications on Ubuntu infrastructure.',
  },
  {
    number: '05',
    title: 'Snap & packaging',
    description: 'Distributing Python applications as Snaps, building packages for Ubuntu, and understanding the Linux packaging ecosystem.',
  },
  {
    number: '06',
    title: 'IoT & embedded',
    description: 'Ubuntu Core, Python on embedded devices, IoT solutions, and building smart devices with Ubuntu and Python.',
  },
];

const stats = [
  { value: '1', label: 'Dedicated day' },
  { value: '6+', label: 'Talks & workshops' },
  { value: '2', label: 'Communities united' },
  { value: '100%', label: 'Open source' },
];

const portraits: Record<string, string> = {
  'Adonis Simo': '/2026/day2-04.webp',
  'Muluh Azinwi Success Ndahili': '/speakers/Muluh_Azinwi_Success_Ndahili.webp',
  'Edmond Makolle': '/speakers/Edmond_Makole.webp',
  'Steve Yonkeu': '/speakers/Steve_Yonkeu.webp',
  'Daniele Procida': '/speakers/Daniele_Procida.webp',
  'Pedro Leão da Cruz': '/speakers/Pedro_Leao_da_Cruz.webp',
  'Jean Marc Wogue': '/speakers/Jean_Marc_Wogue.webp',
  'Ariane Djeupang J.': '/speakers/Ariane_Djeupang_J.webp',
};

const ubuntuDay = DAYS.find((day) => day.id === 'day-2');

function Speaker({ name }: { name: string }) {
  const portrait = portraits[name];
  return (
    <span className="ubu-speaker">
      {portrait ? (
        <Image src={portrait} alt="" width={30} height={30} className="ubu-speaker__photo" />
      ) : (
        <span className="ubu-speaker__initial" aria-hidden="true">{name.charAt(0)}</span>
      )}
      <span>{name}</span>
    </span>
  );
}

function SessionCard({ session }: { session: Session }) {
  const speakers = session.speakers ?? (session.speaker ? [session.speaker] : []);
  return (
    <article className="ubu-session">
      <div className="ubu-session__head">
        <span className={`ubu-session__type ubu-session__type--${session.kind}`}>{session.kind}</span>
        <span className="ubu-session__time">{session.start}–{session.end}</span>
      </div>
      <h3>{session.title}</h3>
      {session.description && <p className="ubu-session__description">{session.description}</p>}
      <div className="ubu-session__foot">
        {speakers.length > 0 && (
          <div className="ubu-session__speakers" aria-label={speakers.length > 1 ? 'Speakers' : 'Speaker'}>
            {speakers.map((name) => <Speaker key={name} name={name} />)}
          </div>
        )}
        <div className="ubu-session__facts">
          {session.room && <span className="ubu-session__fact"><HallIcon />{session.room} Hall</span>}
          {session.lang && <span className="ubu-session__fact"><LanguageIcon />{session.lang}</span>}
          {session.start && session.end && <span className="ubu-session__fact"><ClockIcon />{duration(session.start, session.end)}</span>}
        </div>
      </div>
    </article>
  );
}

function HallIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 16.5V8l7-4.5L17 8v8.5M6 16.5v-5h8v5M8.5 8.5h.01M11.5 8.5h.01" /></svg>;
}

function LanguageIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="M3 8.5h11M8.5 3c1.5 1.5 2.1 3.3 2.1 5.5s-.6 4-2.1 5.5M13 13l4 4m0-4-4 4" /></svg>;
}

function ClockIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" /><path d="M10 6v4l2.7 1.7" /></svg>;
}

function CoffeeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h12v5.5A4.5 4.5 0 0 1 12.5 19h-3A4.5 4.5 0 0 1 5 14.5V9Zm12 1h1.5a2.5 2.5 0 0 1 0 5H17M8 5c0-1 1-1 1-2m3 2c0-1 1-1 1-2m3 2c0-1 1-1 1-2" /></svg>;
}

function BreakIcon({ label }: { label: string }) {
  const lower = label.toLowerCase();
  if (lower.includes('lunch')) {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v7m-3-7v4a3 3 0 0 0 6 0V3m-3 7v11m10-18v18m0-18c4 3 4 8 0 10" /></svg>;
  }
  if (lower.includes('social') || lower.includes('community games')) {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0m1-4a4 4 0 0 1 5 4" /></svg>;
  }
  if (lower.includes('end of day')) {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 21V3m1 1h11l-2.5 4L18 12H7" /></svg>;
  }
  if (lower.includes('registration')) {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 8h6m-6 4h6m-6 4h3" /></svg>;
  }
  return <CoffeeIcon />;
}

export default function UbuConPage() {
  return (
    <div className="ubu-page">
      <UbuConHero />

      <section className="ubu-about f-paper" aria-labelledby="ubu-about-title">
        <div className="wrap ubu-about__grid">
          <div className="ubu-about__copy" data-reveal>
            <p className="ubu-eyebrow">Ubuntu, together</p>
            <h2 id="ubu-about-title">What is <span>UbuCon?</span></h2>
            <p>
              UbuCon (Ubuntu Conference) is a community-driven event that brings together Ubuntu enthusiasts,
              developers, and open source advocates. For the first time in Cameroon, UbuCon Cameroon and PyCon Cameroon
              came together as co-organizers for a dedicated day of Ubuntu and open source.
            </p>
            <p>
              This partnership between PyCon Cameroon and UbuCon Cameroon celebrates the deep relationship between
              Python and the Ubuntu ecosystem: from system tools and automation to cloud infrastructure and beyond.
            </p>
          </div>
          <figure className="ubu-about__photo" data-reveal>
            <Image
              src="/2026/day2-01.webp"
              alt="UbuCon Cameroon and PyCon Cameroon attendees gathered beneath their shared event banner"
              width={1600}
              height={1066}
              sizes="(min-width: 900px) 48vw, 100vw"
            />
            <figcaption><span>Ubuntu community, Cameroon</span><span className="ubu-mono">YAOUNDÉ · 2026</span></figcaption>
          </figure>
        </div>
        <div className="wrap ubu-glance" aria-label="UbuCon Cameroon at a glance" data-reveal>
          <dl className="ubu-glance__stats">
            {stats.map((stat, index) => (
              <div className="ubu-stat" key={stat.label}>
                <dt><span className={index % 2 === 1 ? 'ubu-stat__number ubu-stat__number--ubuntu' : 'ubu-stat__number'}>{stat.value}</span></dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ubu-topics f-paper" aria-labelledby="ubu-topics-title">
        <div className="wrap">
          <header className="ubu-section-head" data-reveal>
            <div><p className="ubu-eyebrow">Ideas built in the open</p><h2 id="ubu-topics-title">UbuCon <span>topics</span></h2></div>
            <p>What you can expect at the UbuCon community gathering.</p>
          </header>
          <div className="ubu-topics__grid" data-stagger>
            {topics.map((topic, index) => (
              <article className={`ubu-topic ubu-topic--${index % 3}`} key={topic.number}>
                <span className="ubu-topic__number ubu-mono">{topic.number}</span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ubu-world f-night" aria-labelledby="ubu-world-title">
        <div className="wrap ubu-world__inner">
          <div className="ubu-world__copy" data-reveal>
            <p className="ubu-eyebrow">A global open source community</p>
            <h2 id="ubu-world-title">Ubuntu is <span>everywhere.</span></h2>
            <p>Discover UbuCon events happening globally and connect with Ubuntu communities wherever they meet.</p>
            <a className="ubu-world__link" href="https://ubuntu.com/community" target="_blank" rel="noreferrer">
              Explore the Ubuntu community <Arrow />
            </a>
          </div>
          <div className="ubu-world__word" aria-hidden="true" data-reveal>
            <span>UBUNTU</span>
            <span>FOR ALL</span>
            <i />
            <small className="ubu-mono">CAMEROON IS PART OF THE STORY</small>
          </div>
        </div>
      </section>

      <section className="ubu-schedule f-paper" id="ubu-schedule" aria-labelledby="ubu-schedule-title">
        <div className="wrap">
          <header className="ubu-section-head ubu-section-head--schedule" data-reveal>
            <div><p className="ubu-eyebrow">Friday · September 18, 2026</p><h2 id="ubu-schedule-title">UbuCon <span>schedule</span></h2></div>
            <p>One day to build, share, and learn together.</p>
          </header>
          <div className="ubu-day-banner" data-reveal>
            <span className="ubu-day-banner__icon"><Image src="/partners/ubucon-cameroon.webp" alt="" width={34} height={34} /></span>
            <div><strong>UbuCon Cameroon Day</strong><span>Friday, September 18 · Co-organized with PyCon Cameroon</span></div>
            <span className="ubu-day-banner__tag ubu-mono">DAY 02</span>
          </div>
          <p className="ubu-schedule__note">Each session shows its start time, end time and duration. A 5-minute transition is scheduled between two presentations.</p>
          <ol className="ubu-schedule__list">
            {ubuntuDay?.slots.map((slot, index) => slot.type === 'break' ? (
              <li className="ubu-break" key={`break-${index}`}>
                <time>{slot.start}{slot.end ? ` – ${slot.end}` : ''}</time>
                <span className="ubu-break__icon"><BreakIcon label={slot.label} /></span>
                <span className="ubu-break__label">{slot.label}</span>
                <span className="ubu-break__line" />
              </li>
            ) : slot.sessions.map((session) => (
              <li className="ubu-schedule__row" key={`${session.start}-${session.title}`}>
                <time className="ubu-schedule__rail">{session.start}</time>
                <SessionCard session={session} />
              </li>
            )))}
          </ol>
        </div>
      </section>

      <section className="ubu-join f-river" aria-labelledby="ubu-join-title">
        <div className="wrap ubu-join__inner" data-reveal>
          <p className="ubu-eyebrow">UbuCon Cameroon × PyCon Cameroon</p>
          <h2 id="ubu-join-title">Open source is <span>for everyone.</span></h2>
          <p>Whether you&apos;re an Ubuntu power user or just getting started with Linux, there&apos;s a place for you in the community.</p>
          <Link className="ubu-join__button" href="/report/2026">See the 2026 gathering <Arrow /></Link>
        </div>
      </section>
    </div>
  );
}
