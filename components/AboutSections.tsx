'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { PARTNERS_2026, PHOTOS, TEAM } from '../content/edition2026';
import { LINKS, SITE, SOCIAL } from '../lib/site';
import { Out, Title, Weave } from './Weave';

gsap.registerPlugin(useGSAP);

const WHATSAPP = SOCIAL.find((s) => s.short === 'WhatsApp')?.href ?? '#';
const DISCORD = SOCIAL.find((s) => s.short === 'Discord')?.href ?? '#';

const VALUES = [
  { title: 'A welcoming community', body: 'Diversity and inclusion make our community stronger. Everyone belongs here, whatever their background, experience or identity.' },
  { title: 'Ideas worth sharing', body: 'From a first tutorial to an advanced deep dive, our talks make room for local and international voices at every level.' },
  { title: 'Learn by doing', body: 'Hands-on workshops turn new ideas into practical skills people can use in their projects and careers.' },
  { title: 'Open to everyone', body: 'We work to make the conference accessible and welcoming. There is no gatekeeping, just room to learn and take part.' },
  { title: 'Make new things', body: 'PyCon is a place to explore creative problem-solving, test ideas and imagine what Python can make possible.' },
  { title: 'Grow together', body: 'Whether you are learning or mentoring, shared knowledge helps build a stronger future for everyone in the room.' },
];

export default function AboutSections() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.from('.kp__print', {
      y: 64,
      opacity: 0,
      rotate: (i: number) => (i % 2 ? 5 : -5),
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: '.kps', start: 'top 78%' },
    });
    gsap.from('.about-value', {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.about-values', start: 'top 80%' },
    });
  }, { scope: root });

  return (
    <div ref={root}>
      <section className="sec ug f-paper" aria-labelledby="ug-title">
        <Weave accent className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="about-head about-head--left" data-reveal>
            <Title id="ug-title" lead="Python Cameroon" main="User group." />
          </header>
          <div className="ug__grid">
            <div className="about-copy" data-reveal>
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
            </div>
            <figure className="ug__figure" data-reveal>
              <div className="kp__print">
                <div className="kp__frame">
                  <Image src={PHOTOS.attendees.src} alt={PHOTOS.attendees.alt} fill sizes="(min-width: 960px) 38vw, 90vw" />
                </div>
                <span className="wv-stk wv-stk--sun kp__day">Yaoundé · 2026</span>
              </div>
            </figure>
          </div>
          <div className="about-actions" data-rise>
            <a className="wv-btn wv-btn--sun" href={WHATSAPP} target="_blank" rel="noreferrer">
              Join the community <Out />
            </a>
            <a className="wv-btn wv-btn--line" href={DISCORD} target="_blank" rel="noreferrer">
              Join the Discord <Out />
            </a>
          </div>
        </div>
      </section>

      <section id="mission" className="sec mission f-night" aria-labelledby="mission-title">
        <div className="wrap">
          <header className="about-head" data-reveal>
            <Title id="mission-title" lead="Our" main="mission." />
            <p className="about-head__lede">
              A community-driven conference for the people shaping the future of Python in
              Cameroon and across Central Africa.
            </p>
          </header>
          <div className="about-copy about-copy--center" data-reveal>
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
            <p className="wv-stk wv-stk--sun mission__stk" data-slap>
              A place to learn. A reason to build. A community to grow with.
            </p>
          </div>
        </div>
      </section>

      <section className="sec values f-paper" aria-labelledby="values-title">
        <div className="wrap">
          <header className="about-head" data-reveal>
            <Title id="values-title" lead="Our" main="values." />
            <p className="about-head__lede">The small choices that make a community feel like yours.</p>
          </header>
          <ol className="about-values">
            {VALUES.map((value, i) => (
              <li key={value.title} className="about-value">
                <span className="about-value__mark">0{i + 1}</span>
                <h3 className="about-value__title">{value.title}</h3>
                <p className="about-value__body">{value.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="team" className="sec team f-river" aria-labelledby="team-title">
        <Weave accent className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="about-head" data-reveal>
            <Title id="team-title" lead="Meet the" main="organisers." />
            <p className="about-head__lede">
              The volunteers who brought PyCon Cameroon 2026 to life in Yaoundé — and who
              are building the next chapter in Douala.
            </p>
          </header>
          <ul className="kps">
            {TEAM.map((person, i) => (
              <li key={person.name} className="kp">
                <div className="kp__print">
                  <div className="kp__frame">
                    <Image src={person.image} alt={person.name} fill sizes="(min-width: 960px) 30vw, 90vw" />
                  </div>
                  <span className="wv-stk wv-stk--sun kp__day">0{i + 1}</span>
                </div>
                <h3 className="kp__name">{person.name}</h3>
                <p className="kp__role">{person.role}</p>
                <a
                  className="kp__link"
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                >
                  LinkedIn <Out className="kp__link-arrow" />
                </a>
              </li>
            ))}
          </ul>
          <div className="about-team__join" data-reveal>
            <p>Interested in joining the organising team? We are always looking for passionate volunteers.</p>
            <a
              className="wv-btn wv-btn--sun"
              href={LINKS.mail('Joining the PyCon Cameroon 2027 team')}
            >
              Join our team <Out />
            </a>
          </div>
        </div>
      </section>

      <section className="sec partners f-paper" aria-labelledby="partners-title">
        <div className="wrap">
          <header className="about-head" data-reveal>
            <Title id="partners-title" lead="Partner" main="communities." />
            <p className="about-head__lede">
              We are proud to collaborate with these amazing communities across Africa and
              beyond — they shared the room with us at PyCon Cameroon 2026.
            </p>
          </header>
          <ul className="about-partners" data-stagger>
            {PARTNERS_2026.map((partner) => (
              <li key={partner.name}>
                <a
                  className="about-partners__card"
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="about-partners__word">{partner.name}</span>
                  <Out className="about-partners__arrow" />
                </a>
              </li>
            ))}
          </ul>
          <p className="about-partners__note">
            In 2026, the conference also welcomed a dedicated Ubuntu and open-source track
            with UbuCon Cameroon.
          </p>
        </div>
      </section>

      <section id="code-of-conduct" className="sec coc f-night" aria-labelledby="coc-title">
        <Weave accent className="wv-corner wv-corner--tl" />
        <div className="wrap">
          <header className="about-head" data-reveal>
            <Title id="coc-title" lead="Code of" main="conduct." />
            <p className="about-head__lede">How we take care of one another.</p>
          </header>
          <div className="about-copy about-copy--center" data-reveal>
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
          </div>
          <div className="about-actions about-actions--center" data-rise>
            <a
              className="wv-btn wv-btn--sun"
              href={LINKS.codeOfConduct}
              target="_blank"
              rel="noreferrer"
            >
              Read the full code of conduct <Out />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
