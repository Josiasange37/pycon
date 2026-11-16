import Image from 'next/image';
import { FORMATS_2026, PARTNERS_2026, PHOTOS, STATS_2026, TEAM } from '../content/edition2026';
import { LINKS, SITE, SOCIAL } from '../lib/site';
import { Out } from './Weave';
import styles from './AboutSections.module.css';

const WHATSAPP = SOCIAL.find((item) => item.short === 'WhatsApp')?.href ?? '#';
const DISCORD = SOCIAL.find((item) => item.short === 'Discord')?.href ?? '#';

const VALUES = [
  { title: 'A welcoming community', body: 'Diversity and inclusion make our community stronger. Everyone belongs here, whatever their background, experience or identity.' },
  { title: 'Ideas worth sharing', body: 'From a first tutorial to an advanced deep dive, our talks make room for local and international voices at every level.' },
  { title: 'Learn by doing', body: 'Hands-on workshops turn new ideas into practical skills people can use in their projects and careers.' },
  { title: 'Open to everyone', body: 'We work to make the conference accessible and welcoming. There is no gatekeeping, just room to learn and take part.' },
  { title: 'Make new things', body: 'PyCon is a place to explore creative problem-solving, test ideas and imagine what Python can make possible.' },
  { title: 'Grow together', body: 'Whether you are learning or mentoring, shared knowledge helps build a stronger future for everyone in the room.' },
];

const COMMUNITY_FACTS = [
  { value: STATS_2026[0].value, label: STATS_2026[0].label },
  { value: STATS_2026[1].value, label: STATS_2026[1].label },
  { value: STATS_2026[2].value, label: STATS_2026[2].label },
  { value: STATS_2026[3].value, label: 'speaker countries' },
];

const TOP_FORMATS = FORMATS_2026.slice(0, 3);

export default function AboutSections() {
  return (
    <div className={styles.page}>
      <section className={`${styles.community} f-paper`} aria-labelledby="ug-title">
        <div className="wrap">
          <header className={styles.communityHeading} data-reveal>
            <h2 className={styles.sectionTitle} id="ug-title">
              <span>Python Cameroon</span>
              <strong>User group.</strong>
            </h2>
            <p className={styles.communityLead}>
              A community that keeps learning, building and making room for more people to take part.
            </p>
          </header>

          <div className={styles.communityStory}>
            <figure className={styles.communityPhoto} data-reveal>
              <div className={styles.photoFrame}>
                <Image
                  src={PHOTOS.attendees.src}
                  alt={PHOTOS.attendees.alt}
                  fill
                  sizes="(min-width: 960px) 48vw, 92vw"
                />
              </div>
              <figcaption>
                <span>{PHOTOS.attendees.caption}</span>
                <span>01 / together</span>
              </figcaption>
            </figure>

            <div className={styles.communityCopy} data-reveal>
              <p>
                The Python Cameroon user group brings together developers, data scientists,
                students, teachers and tech enthusiasts who want to learn and build with
                Python — fostering innovation and promoting the adoption of Python across
                the country.
              </p>
              <p>
                Between conferences, the community meets regularly: speaker sessions,
                coding workshops, hackathons and mentoring, covering web development with
                Django and Flask, data and machine learning, automation, DevOps and much
                more.
              </p>
              <p>
                The annual conference brings that work into one room, with people from
                across Cameroon and the continent.
              </p>

              <div className={styles.communityActions}>
                <a className="wv-btn wv-btn--sun" href={WHATSAPP} target="_blank" rel="noreferrer">
                  Join the community <Out />
                </a>
                <a className={styles.textLink} href={DISCORD} target="_blank" rel="noreferrer">
                  Find us on Discord <Out />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.factsBand}>
            <p className={styles.factsTitle}>One recent gathering, many ways to take part.</p>
            <dl aria-label="PyCon Cameroon 2026 at a glance">
              {COMMUNITY_FACTS.map((fact) => (
                <div className={styles.fact} key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="mission" className={`${styles.mission} f-night`} aria-labelledby="mission-title">
        <div className={`wrap ${styles.missionInner}`}>
          <div className={styles.missionStatement} data-reveal>
            <h2 id="mission-title">
              A place to <span>learn.</span>
              <br />
              A reason to <span>build.</span>
              <br />
              A community to <span>grow with.</span>
            </h2>
            <svg className={styles.missionThread} viewBox="0 0 600 72" fill="none" aria-hidden="true">
              <path d="M2 36h111c35 0 35-28 70-28s35 56 70 56 35-56 70-56 35 56 70 56 35-28 70-28h135" />
              <circle cx="113" cy="36" r="5" />
              <circle cx="396" cy="64" r="5" />
              <circle cx="600" cy="36" r="5" />
            </svg>
          </div>

          <div className={styles.missionCopy} data-reveal>
            <p className={styles.missionLead}>
              A community-driven conference for the people shaping the future of Python in
              Cameroon and across Central Africa.
            </p>
            <p>
              We bring together developers, researchers, students, founders and educators
              to share what they know, learn from one another and make useful connections.
              The programme is designed to inspire, teach and welcome people at every
              stage of their journey.
            </p>
            <p>
              We believe the Python community grows when more people can take part — that
              means making room for different backgrounds, languages, experience levels
              and ideas.
            </p>
            <ul className={styles.formatList} aria-label="Ways to take part at PyCon Cameroon">
              {TOP_FORMATS.map((format) => <li key={format.label}>{format.label}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.values} f-paper`} aria-labelledby="values-title">
        <div className="wrap">
          <header className={styles.valuesHeading} data-reveal>
            <h2 className={styles.sectionTitle} id="values-title">
              <span>The choices</span>
              <strong>that make room.</strong>
            </h2>
            <p>
              The small choices that make a community feel like yours.
            </p>
          </header>

          <ol className={styles.valueList} data-stagger>
            {VALUES.map((value, index) => (
              <li className={styles.value} key={value.title}>
                <span className={styles.valueNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
                <span className={styles.valueMark} aria-hidden="true">+</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className={`${styles.team} f-river`} aria-labelledby="team-title">
        <div className="wrap">
          <header className={styles.teamHeading} data-reveal>
            <h2 className={styles.sectionTitle} id="team-title">
              <span>The hands</span>
              <strong>behind the room.</strong>
            </h2>
            <p>
              The volunteers who brought PyCon Cameroon 2026 to life in Yaoundé — and who
              are building the next chapter in Douala.
            </p>
          </header>

          <ul className={styles.teamList} data-stagger>
            {TEAM.map((person, index) => (
              <li className={styles.member} key={person.name}>
                <figure>
                  <div className={styles.memberPortrait}>
                    <Image src={person.image} alt={person.name} fill sizes="(min-width: 1100px) 23vw, (min-width: 640px) 44vw, 88vw" />
                  </div>
                  <figcaption>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>organiser</span>
                  </figcaption>
                </figure>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label={`${person.name} on LinkedIn`}>
                  LinkedIn <Out />
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.teamInvite} data-reveal>
            <p>Interested in joining the organising team? We are always looking for passionate volunteers.</p>
            <a className="wv-btn wv-btn--sun" href={LINKS.mail('Joining the PyCon Cameroon 2027 team')}>
              Join our team <Out />
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.partners} f-paper`} aria-labelledby="partners-title">
        <div className="wrap">
          <header className={styles.partnersHeading} data-reveal>
            <h2 className={styles.sectionTitle} id="partners-title">
              <span>Good work</span>
              <strong>travels together.</strong>
            </h2>
            <p>
              We are proud to collaborate with these amazing communities across Africa and
              beyond — they shared the room with us at PyCon Cameroon 2026.
            </p>
          </header>

          <ul className={styles.partnerList} data-stagger>
            {PARTNERS_2026.map((partner, index) => (
              <li key={partner.name}>
                <a href={partner.url} target="_blank" rel="noreferrer">
                  <span className={styles.partnerNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.partnerName}>{partner.name}</span>
                  <Out />
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.partnerNote}>
            In 2026, the conference also welcomed a dedicated Ubuntu and open-source track
            with UbuCon Cameroon.
          </p>
        </div>
      </section>

      <section id="code-of-conduct" className={`${styles.conduct} f-night`} aria-labelledby="coc-title">
        <div className={`wrap ${styles.conductInner}`}>
          <header className={styles.conductHeading} data-reveal>
            <h2 className={styles.sectionTitle} id="coc-title">
              <span>Care is part</span>
              <strong>of the code.</strong>
            </h2>
            <p>How we take care of one another.</p>
          </header>

          <div className={styles.conductBody} data-reveal>
            <p>
              PyCon Cameroon is a harassment-free event for everyone, regardless of age,
              body size, disability, ethnicity, gender identity and expression, level of
              experience, nationality, religion or sexual orientation. This applies on
              site and in all our online channels.
            </p>
            <p>
              Harassment is not acceptable in any form. If something happens, tell an
              organiser or write to <a href={LINKS.mail('PyCon Cameroon code of conduct report')}>{SITE.email}</a>.
              Reports are handled with care and in confidence. Participants who violate
              these rules may be sanctioned or removed from the event at the discretion
              of the organisers.
            </p>
            <a className="wv-btn wv-btn--sun" href={LINKS.codeOfConduct} target="_blank" rel="noreferrer">
              Read the full code of conduct <Out />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
