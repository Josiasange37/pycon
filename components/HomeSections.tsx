'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { KEYNOTES_2026, PHOTOS, SPONSORS_2026 } from '../content/edition2026';
import { LINKS, SITE, SOCIAL, STATUS } from '../lib/site';
import { Out, Title, Weave } from './Weave';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Every section after the hero speaks the hero's language: whole fields of its colours
 * (Wouri blue, paper, night navy, sun), the two-tone Inter Black title, paper stickers turned
 * at an angle with the same dropped shadow, the designer's icon rows at the edges, and the
 * hero's two buttons. Fields alternate so no two neighbours share a ground or a layout.
 */

const EXPECT = [
  {
    word: 'Inspiring talks.',
    body: 'From beginner to expert: web, data science, machine learning, DevOps and Python itself, chosen through an open call for proposals.',
    photo: PHOTOS.hall,
  },
  {
    word: 'Hands-on workshops.',
    body: 'Learn by doing. Bring a laptop, build something real and leave with code that runs on your machine.',
    photo: PHOTOS.laptops,
  },
  {
    word: 'People to build with.',
    body: 'Meet fellow Pythonistas, future colleagues and collaborators from Douala, Yaoundé, Buea and across the continent.',
    photo: PHOTOS.friends,
  },
  {
    word: 'Moments to remember.',
    body: 'Lightning talks, sprints, live art and evenings in the city make PyCon Cameroon more than a conference.',
    photo: PHOTOS.graffiti,
  },
];

const THEMES = ['Machine learning & AI', 'Web & Django', 'Data & science', 'DevOps & cloud', 'Python core', 'Open source', 'IoT & hardware', 'Education', 'Security', 'Python in African industry'];

/** A drifting row, doubled so the scroll never shows its end; the copy is hidden from assistive tech. */
function Drift({ items, dir, className = '' }: { items: readonly string[]; dir: 'left' | 'right'; className?: string }) {
  return (
    <ul className={`wv-drift__row ${className}`.trim()} data-drift={dir}>
      {[...items, ...items].map((n, i) => (
        <li key={`${n}-${i}`} aria-hidden={i >= items.length || undefined}>
          {n}
        </li>
      ))}
    </ul>
  );
}

function SponsorTier({ tierIndex, tier }: { tierIndex: number; tier: (typeof SPONSORS_2026)[number] }) {
  const tierSlug = tier.tier.toLowerCase().replaceAll(' ', '-');
  const featured = tierIndex < 2;

  return (
    <section
      className={`sponsors__tier sponsors__tier--${tierSlug}${featured ? ' sponsors__tier--featured' : ''}`}
      data-sponsor-tier
      aria-labelledby={`sponsor-tier-${tierSlug}`}
    >
      <header className="sponsors__tier-meta">
        <h3 className="sponsors__tier-name" id={`sponsor-tier-${tierSlug}`}>{tier.tier}</h3>
      </header>
      <ul className="sponsors__logos">
        {tier.sponsors.map((sponsor) => {
          const slug = sponsor.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const logo = sponsor.logo;
          const lockup = Boolean(sponsor.lockup);
          return (
            <li className="sponsors__logo-item" key={sponsor.name}>
              <a
                className={`sponsor-logo sponsor-logo--${slug}${featured ? ' sponsor-logo--feature' : ''}`}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${sponsor.name} website`}
              >
                {logo && (
                  <Image
                    className={`sponsor-logo__mark${lockup ? ' sponsor-logo__mark--lockup' : ''}`}
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width={lockup ? 300 : 88}
                    height={lockup ? 90 : 88}
                    unoptimized
                  />
                )}
                {!lockup && <span className="sponsor-logo__wordmark">{sponsor.name}</span>}
                <Out className="sponsor-logo__arrow" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function HomeSections() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      const ease = 'expo.out';

      // The recap photo is the one full-page reveal: a framed print opens onto the crowd.
      gsap.fromTo(
        q('.reveal__frame'),
        { clipPath: 'inset(23% 20% 23% 20%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: q('.reveal')[0], start: 'top 85%', end: 'top 15%', scrub: 0.6 } },
      );
      gsap.fromTo(q('.reveal__frame img'), { scale: 1.38 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: q('.reveal')[0], start: 'top bottom', end: 'bottom top', scrub: true } });

      // The keynote portraits behave like paper prints: each turns into its place as it enters.
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

      // The sponsor wall lands like a set of oversized printed marks, tier by tier.
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
      {/* ——— the 2026 crowd: a framed print that opens to the full width ——— */}
      <div className="reveal f-paper">
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

      {/* ——— keynote speakers ——— */}
      <section className="sec keynotes f-river" aria-labelledby="kn-title">
        <Weave className="wv-corner wv-corner--tr" />
        <div className="wrap">
          <header className="split-head">
            <p className="split-head__text" data-rise>
              Three keynotes, one to open each day of the conference. The 2027 keynotes are announced after the call for
              proposals.
            </p>
            <Title id="kn-title" lead="Meet the 2026" main="keynotes." className="split-head__title" />
          </header>
          <ol className="kps">
            {KEYNOTES_2026.map((k) => (
              <li key={k.name} className="kp">
                <div className="kp__print">
                  <div className="kp__frame">
                    <Image className="kp__photo" src={k.photo.src} alt={k.photo.alt} fill sizes="(min-width: 960px) 28vw, 78vw" style={{ objectPosition: 'center 20%' }} />
                  </div>
                  <span className="wv-stk wv-stk--sun kp__day">{k.day.replace(' · ', ', ')}</span>
                </div>
                <h3 className="kp__name">{k.name}</h3>
                <p className="kp__role">{k.role}</p>
                <p className="kp__talk">“{k.talk}”</p>
              </li>
            ))}
          </ol>
          <Link className="wv-btn wv-btn--line sec__cta" href="/speakers" data-rise>
            See all speakers <Out />
          </Link>
        </div>
      </section>

      {/* ——— sponsors ——— */}
      <section className="sec sponsors f-paper" aria-labelledby="sp-title">
        <div className="wrap sponsors__head">
          <div className="sponsors__heading">
            <p className="sponsors__eyebrow" data-rise>Made possible by 12 partners · PyCon Cameroon 2026</p>
            <Title id="sp-title" lead="Thank you to our" main="2026 sponsors." />
          </div>
          <div className="sponsors__intro">
            <p>Companies and communities that backed the room, the programme and the people who made it happen.</p>
            <Link className="wv-btn wv-btn--sun" href="/sponsors" data-rise>
              Become a 2027 sponsor <Out />
            </Link>
          </div>
        </div>
        <div className="wrap sponsors__wall" role="group" aria-label="2026 sponsors by tier">
          <div className="sponsors__featured-pair">
            {SPONSORS_2026.slice(0, 2).map((tier, i) => <SponsorTier key={tier.tier} tierIndex={i} tier={tier} />)}
          </div>
          {SPONSORS_2026.slice(2).map((tier, i) => <SponsorTier key={tier.tier} tierIndex={i + 2} tier={tier} />)}
        </div>
        <div className="wrap sponsors__endmark">
          <Weave accent />
          <span>Built together, in Cameroon and beyond.</span>
        </div>
      </section>

      {/* ——— what to expect: four moments, travelling sideways on desktop ——— */}
      <section className="expect f-river" aria-labelledby="ex-title">
        <div className="expect__track">
          <header className="expect__intro">
            <Weave accent />
            <Title id="ex-title" lead="What to" main="expect." />
            <p className="expect__lede">Photos from PyCon Cameroon 2026 in Yaoundé. Douala raises the bar.</p>
          </header>
          {EXPECT.map((e, i) => (
            <article key={e.word} className={`expect__panel expect__panel--${i % 2 ? 'b' : 'a'}`}>
              <div className="expect__photo">
                <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 960px) 40vw, 90vw" />
              </div>
              <h3 className="expect__word">{e.word}</h3>
              <p className="expect__body">{e.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ——— themes ——— */}
      <section className="sec themes f-paper" aria-labelledby="th-title">
        <Weave className="wv-corner wv-corner--tr" />
        <div className="wrap themes__head">
          <Title id="th-title" lead="Themes for" main="your talk." />
          <p className="themes__note" data-rise>
            The call for proposals is {STATUS.cfp === 'open' ? 'open now' : 'opening soon'}. Final tracks are set with it.
          </p>
        </div>
        <div className="wv-drift wv-drift--themes">
          <Drift items={THEMES.slice(0, 5)} dir="left" className="wv-drift__row--ink" />
          <Drift items={THEMES.slice(5)} dir="right" className="wv-drift__row--tone" />
        </div>
        <div className="wrap themes__foot">
          <Link className="wv-btn wv-btn--line" href="/speakers#cfp" data-rise>
            How to propose a talk <Out />
          </Link>
        </div>
      </section>

      {/* ——— closing call to action: the sun sticker, full size ——— */}
      <section id="updates" className="finale f-sun" aria-labelledby="fn-title">
        <Weave className="wv-corner wv-corner--tl" />
        <Weave className="wv-corner wv-corner--br" />
        <div className="wrap finale__in">
          <Title id="fn-title" lead="Thank you for" main="an amazing 2026!" />
          <div className="finale__side">
            <p className="finale__text" data-rise>
              Join us in Douala for PyCon Cameroon 2027. RSVP with the team or check the programme page for the latest
              agenda updates.
            </p>
            <div className="finale__actions" data-rise>
              <a className="wv-btn wv-btn--ink" href={LINKS.mail(`RSVP for PyCon Cameroon ${SITE.year}`)}>
                RSVP for {SITE.year} <Out />
              </a>
              <Link className="wv-btn wv-btn--line" href="/agenda">
                View agenda <Out />
              </Link>
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
                <a href={LINKS.mail('Keep me posted about PyCon Cameroon 2027')}>
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
