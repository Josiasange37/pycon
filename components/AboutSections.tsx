'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { PARTNERS_2026, PHOTOS, STATS_2026, TEAM } from '../content/edition2026';
import { LINKS, SITE, SOCIAL } from '../lib/site';
import { Out, Title, Weave } from './Weave';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * The About page after the hero, in the hero's own language: whole fields of its colours,
 * the two-tone Inter Black title, paper stickers, portrait prints, the numbers band, the
 * travelling photo strip and the sun finale. Fields alternate; no two neighbours share a ground.
 */

const WHAT_WE_STAND_FOR = [
  { word: 'Welcome.', title: 'A welcoming community', body: 'Diversity and inclusion make our community stronger. Everyone belongs here, whatever their background, experience or identity.' },
  { word: 'Share.', title: 'Ideas worth sharing', body: 'From a first tutorial to an advanced deep dive, our talks make room for local and international voices at every level.' },
  { word: 'Practice.', title: 'Learn by doing', body: 'Hands-on workshops turn new ideas into practical skills people can use in their projects and careers.' },
  { word: 'Belong.', title: 'Open to everyone', body: 'We work to make the conference accessible and welcoming. There is no gatekeeping, just room to learn and take part.' },
  { word: 'Make.', title: 'Make new things', body: 'PyCon is a place to explore creative problem-solving, test ideas and imagine what Python can make possible.' },
  { word: 'Grow.', title: 'Grow together', body: 'Whether you are learning or mentoring, shared knowledge helps build a stronger future for Python in Cameroon.' },
];

const MOMENTS = [
  { word: 'One hall, one family.', body: 'Five hundred people from across Cameroon and beyond fill the same room for three days of Python.', photo: PHOTOS.hall },
  { word: 'Learning side by side.', body: 'Workshops at round tables — beginners and seniors building on the same laptops, helping each other out.', photo: PHOTOS.laptops },
  { word: 'Friends first.', body: 'The conversations that matter happen between sessions, over lunch, and in the WhatsApp group all year long.', photo: PHOTOS.friends },
  { word: 'Art on the walls.', body: 'Live graffiti, lightning talks and closing moments — the parts of the conference you carry home.', photo: PHOTOS.graffiti },
];

const WHATSAPP = SOCIAL.find((s) => s.label.includes('WhatsApp'))!.href;
const DISCORD = SOCIAL.find((s) => s.label.includes('Discord'))!.href;

export default function AboutSections() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      const ease = 'expo.out';

      // The crowd photo is the one full-page reveal: a framed print that opens to full width.
      gsap.fromTo(
        q('.reveal__frame'),
        { clipPath: 'inset(23% 20% 23% 20%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: q('.reveal')[0], start: 'top 85%', end: 'top 15%', scrub: 0.6 } },
      );
      gsap.fromTo(q('.reveal__frame img'), { scale: 1.38 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: q('.reveal')[0], start: 'top bottom', end: 'bottom top', scrub: true } });

      // The team portraits behave like paper prints: each turns into its place as it enters.
      (q('.kp') as HTMLElement[]).forEach((el, i) => {
        gsap.fromTo(
          el.querySelector('.kp__print'),
          { y: 84, rotate: i % 2 ? 9 : -9, scale: 0.88, autoAlpha: 0 },
          {
            y: 0,
            rotate: i % 2 ? 2.4 : -2,
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'back.out(1.25)',
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
        gsap.to(el.querySelector('.kp__photo'), { yPercent: -4 - i * 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // The partner wall lands like a set of oversized printed marks.
      (q('[data-sponsor-tier]') as HTMLElement[]).forEach((tier) => {
        const cards = Array.from(tier.querySelectorAll<HTMLElement>('.sponsors__logo-item'));
        gsap.fromTo(
          cards,
          { y: 112, rotate: (i) => (i % 2 ? 7 : -7), scale: 0.84, autoAlpha: 0 },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.3,
            ease: 'back.out(1.5)',
            stagger: { each: 0.11, from: 'center' },
            scrollTrigger: { trigger: tier, start: 'top 82%', once: true },
          },
        );
        gsap.fromTo(
          tier.querySelector('.sponsors__tier-name'),
          { x: -36, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.8, ease, scrollTrigger: { trigger: tier, start: 'top 82%', once: true } },
        );
      });

      // On wide screens, the photo sequence moves sideways as one editorial strip.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1100px) and (min-height: 680px)', () => {
        const section = q('.expect')[0] as HTMLElement | undefined;
        const track = q('.expect__track')[0] as HTMLElement | undefined;
        if (!section || !track) return;
        section.classList.add('is-travelling');
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
        });
        return () => section.classList.remove('is-travelling');
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ——— the user group: who we are between conferences ——— */}
      <section className="sec community f-paper" aria-labelledby="community-title">
        <Weave accent className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="split-head">
            <p className="split-head__text" data-rise>
              Python Cameroon brings together developers, data scientists, students, teachers and tech enthusiasts who want
              to learn and build with Python.
            </p>
            <Title id="community-title" lead="A user group" main="first." className="split-head__title" />
          </header>
          <div className="about-copy" data-reveal>
            <p>
              Between conferences, the community shares knowledge through speaker sessions, coding workshops, hackathons
              and mentoring. The annual conference brings that work into one room with people from across Cameroon and
              the continent.
            </p>
            <p>The WhatsApp group and Discord server are open all year — say hello, ask a question, offer a talk.</p>
          </div>
          <div className="about-actions" data-rise>
            <a className="wv-btn wv-btn--sun" href={WHATSAPP} target="_blank" rel="noreferrer">
              Join the WhatsApp community <Out />
            </a>
            <a className="wv-btn wv-btn--line" href={DISCORD} target="_blank" rel="noreferrer">
              Join the Discord server <Out />
            </a>
          </div>
        </div>
      </section>

      {/* ——— the 2026 crowd: a framed print that opens to the full width ——— */}
      <div className="reveal f-river">
        <figure className="reveal__frame">
          <Image src={PHOTOS.closing.src} alt={PHOTOS.closing.alt} fill sizes="100vw" />
        </figure>
        <div className="wrap reveal__cap">
          <span className="wv-stk wv-stk--paper" data-slap>
            {PHOTOS.closing.caption}
          </span>
          <Link className="wv-btn wv-btn--line reveal__report" href="/report/2026" data-rise>
            Read the 2026 edition report <Out />
          </Link>
        </div>
      </div>

      {/* ——— the mission, with the 2026 numbers underneath ——— */}
      <section id="mission" className="sec mission f-night" aria-labelledby="mission-title">
        <div className="wrap">
          <header className="split-head">
            <p className="split-head__text" data-rise>
              We bring together developers, researchers, students, founders and educators to share what they know, learn
              from one another and make useful connections. The programme is designed to inspire, teach and welcome
              people at every stage of their journey.
            </p>
            <Title id="mission-title" lead="Make space for" main="what’s next." className="split-head__title" />
          </header>
          <div className="about-copy" data-reveal>
            <p>
              We believe the Python community grows when more people can take part. That means making room for different
              backgrounds, languages, experience levels and ideas — a community to grow with.
            </p>
            <p className="wv-stk wv-stk--sun mission__stk" data-slap>
              A place to learn. A reason to build.
            </p>
          </div>
          <div className="numbers">
            <div className="wrap numbers__in">
              <Image className="numbers__ghost" src="/hero/statue-woven.webp" alt="" width={632} height={1514} sizes="45vw" aria-hidden="true" />
              <dl className="numbers__grid" data-stagger>
                {STATS_2026.map((stat, i) => (
                  <div className={`numbers__item${i === 0 ? ' numbers__item--sun' : ''}`} key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="numbers__n">{stat.value}</dd>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="numbers__foot">
                <span>Numbers from PyCon Cameroon 2026, in Yaoundé.</span>
                <Link href="/report/2026">Read the 2026 report</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— what we stand for: the values, as woven pillar rows ——— */}
      <section className="sec pillars-sec f-paper" aria-labelledby="values-title">
        <Weave accent className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="split-head">
            <p className="split-head__text" data-rise>
              The small choices that make a community feel like yours — and the values that guide how the team runs the
              conference.
            </p>
            <Title id="values-title" lead="What we" main="stand for." className="split-head__title" />
          </header>
          <ol className="pillars about-pillars" data-stagger>
            {WHAT_WE_STAND_FOR.map((value, i) => (
              <li key={value.word} className={`pillar${i === WHAT_WE_STAND_FOR.length - 1 ? ' pillar--sun' : ''}`}>
                <p className="pillar__word" aria-hidden="true">
                  {value.word}
                </p>
                <div className="pillar__text">
                  <h3 className="pillar__title">{value.title}</h3>
                  <p className="pillar__body">{value.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— the organisers: six portrait prints ——— */}
      <section id="team" className="sec team f-river" aria-labelledby="team-title">
        <div className="wrap">
          <header className="split-head">
            <p className="split-head__text" data-rise>
              The volunteers who brought PyCon Cameroon 2026 to life in Yaoundé — and who are building the next chapter in
              Douala.
            </p>
            <Title id="team-title" lead="Meet the" main="organisers." className="split-head__title" />
          </header>
          <ul className="kps">
            {TEAM.map((person, i) => (
              <li key={person.name} className="kp">
                <div className="kp__print">
                  <div className="kp__frame">
                    <Image className="kp__photo" src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 960px) 28vw, 78vw" style={{ objectPosition: 'center 20%' }} />
                  </div>
                  <span className="wv-stk wv-stk--sun kp__day">0{i + 1}</span>
                </div>
                <h3 className="kp__name">{person.name}</h3>
                <p className="kp__role">{person.role}</p>
                <a className="kp__link" href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <Out />
                </a>
              </li>
            ))}
          </ul>
          <div className="about-team__join" data-reveal>
            <p>Help shape the next chapter in Douala.</p>
            <a className="wv-btn wv-btn--sun" href={LINKS.mail('Joining the PyCon Cameroon 2027 team')}>
              Join the 2027 team <Out />
            </a>
          </div>
        </div>
      </section>

      {/* ——— the community in pictures: four moments, travelling sideways on desktop ——— */}
      <section className="expect f-paper" aria-labelledby="ex-title">
        <div className="expect__track">
          <header className="expect__intro">
            <Weave accent />
            <Title id="ex-title" lead="The community" main="in pictures." />
            <p className="expect__lede">PyCon Cameroon 2026, Yaoundé — moments from the hall, the workshops and everything in between.</p>
          </header>
          {MOMENTS.map((moment, i) => (
            <article key={moment.word} className={`expect__panel expect__panel--${i % 2 ? 'b' : 'a'}`}>
              <div className="expect__photo">
                <Image src={moment.photo.src} alt={moment.photo.alt} fill sizes="(min-width: 960px) 40vw, 90vw" />
              </div>
              <h3 className="expect__word">{moment.word}</h3>
              <p className="expect__body">{moment.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ——— community partners: a printed wall of marks ——— */}
      <section className="sec partners f-river" aria-labelledby="partners-title">
        <div className="wrap sponsors__head">
          <div className="sponsors__heading">
            <p className="sponsors__eyebrow" data-rise>
              Better together · PyCon Cameroon 2026
            </p>
            <Title id="partners-title" lead="Community" main="partners." />
          </div>
          <div className="sponsors__intro">
            <p>Communities who shared the room with us in 2026 — user groups and open-source crews from Douala, Yaoundé and beyond.</p>
            <Link className="wv-btn wv-btn--line" href="/report/2026" data-rise>
              Read the 2026 report <Out />
            </Link>
          </div>
        </div>
        <div className="wrap sponsors__wall" role="group" aria-label="Community partners, PyCon Cameroon 2026">
          <section className="sponsors__tier" data-sponsor-tier aria-labelledby="partners-tier">
            <header className="sponsors__tier-meta">
              <h3 className="sponsors__tier-name" id="partners-tier">
                Past edition · community partners
              </h3>
            </header>
            <ul className="sponsors__logos">
              {PARTNERS_2026.map((partner) => {
                const slug = partner.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return (
                  <li className="sponsors__logo-item" key={partner.name}>
                    <a
                      className={`sponsor-logo sponsor-logo--${slug}`}
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${partner.name}, community partner at PyCon Cameroon 2026`}
                    >
                      <span className="sponsor-logo__wordmark">{partner.name}</span>
                      <Out className="sponsor-logo__arrow" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <div className="wrap sponsors__endmark">
          <Weave accent />
          <span>In 2026, the conference also welcomed a dedicated Ubuntu and open-source track with UbuCon Cameroon.</span>
        </div>
      </section>

      {/* ——— how we take care: the code of conduct ——— */}
      <section id="code-of-conduct" className="sec coc f-night" aria-labelledby="coc-title">
        <div className="wrap">
          <header className="split-head">
            <p className="split-head__text" data-rise>
              PyCon Cameroon is a harassment-free event for everyone, whatever their gender, age, origin, religion,
              language, disability, appearance or experience. This applies to talks, workshops, social events and online
              channels.
            </p>
            <Title id="coc-title" lead="Everyone" main="belongs here." className="split-head__title" />
          </header>
          <div className="about-copy" data-reveal>
            <p>
              Harassment is not acceptable in any form. If something happens, tell an organiser or write to{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Reports are handled with care and in confidence.
            </p>
            <p className="wv-stk wv-stk--sun coc__stk" data-slap>
              Respect · Care · Community
            </p>
          </div>
          <div className="about-actions" data-rise>
            <a className="wv-btn wv-btn--sun" href={LINKS.codeOfConduct} target="_blank" rel="noreferrer">
              Read the full code of conduct <Out />
            </a>
          </div>
        </div>
      </section>

      {/* ——— closing call to action: the sun sticker, full size ——— */}
      <section id="join" className="finale f-sun" aria-labelledby="join-title">
        <Weave className="wv-corner wv-corner--tl" />
        <Weave className="wv-corner wv-corner--br" />
        <div className="wrap finale__in">
          <Title id="join-title" lead="See you" main="in Douala." />
          <div className="finale__side">
            <p className="finale__text" data-rise>
              Between conferences, the community keeps building — the WhatsApp group and Discord are open all year. RSVP
              with the team or write to the organisers about anything at all.
            </p>
            <div className="finale__actions" data-rise>
              <a className="wv-btn wv-btn--ink" href={WHATSAPP} target="_blank" rel="noreferrer">
                Join the community <Out />
              </a>
              <a className="wv-btn wv-btn--line" href={LINKS.mail('Keep me posted about PyCon Cameroon 2027')}>
                Get updates by email <Out />
              </a>
            </div>
            <ul className="finale__social" data-rise>
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label} <Out />
                  </a>
                </li>
              ))}
              <li>
                <a href={LINKS.mail('Hello PyCon Cameroon')}>
                  Email the organisers <Out />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
