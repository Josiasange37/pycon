'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useLang } from '../lib/i18n';
import { SITE } from '../lib/site';
import { Out, Title, Weave } from './Weave';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pillar = { word: string; title: string; body: string };

const COPY = {
  en: {
    welcome: 'Welcome to',
    sticker: ['Python,', 'rooted in Africa'],
    intro:
      'After a first edition that filled a hall in Yaoundé, PyCon Cameroon moves to the coast. A celebration of Python, technology and African innovation: inspiring talks, hands-on workshops and the people you will keep building with long after the closing keynote.',
    more: 'Who we are and how we work',
    ring: 'PYCON CAMEROON · DOUALA 2027 · PYTHON, ROOTED IN AFRICA · ',
    pillars: [
      {
        word: 'Connect.',
        title: 'A welcoming community',
        body: 'Developers, researchers, founders, students and educators from across Cameroon and the continent, in one room. Whatever your background, there is a place for you here.',
      },
      {
        word: 'Learn.',
        title: 'Talks for every level',
        body: 'From your first script to Python in production: AI, data, the web, hardware and the language itself, chosen through an open call for proposals.',
      },
      {
        word: 'Build.',
        title: 'Workshops you leave with code from',
        body: 'Bring a laptop. Hands-on sessions run longer than talks and end with something that works on your machine.',
      },
      {
        word: 'Belong.',
        title: 'Rooted here, open to the world',
        body: 'Tickets priced so students can come, financial aid for those who need it, and a programme that speaks to the whole country.',
      },
    ],
  },
  fr: {
    welcome: 'Bienvenue à',
    sticker: ['Python,', 'enraciné en Afrique'],
    intro:
      'Après une première édition qui a rempli une salle à Yaoundé, PyCon Cameroon rejoint la côte. Une célébration de Python, de la technologie et de l’innovation africaine : des conférences inspirantes, des ateliers pratiques et des personnes avec qui vous continuerez à construire bien après la keynote de clôture.',
    more: 'Qui nous sommes et comment nous travaillons',
    ring: 'PYCON CAMEROON · DOUALA 2027 · PYTHON, ENRACINÉ EN AFRIQUE · ',
    pillars: [
      {
        word: 'Connecter.',
        title: 'Une communauté accueillante',
        body: 'Développeurs, chercheurs, fondateurs, étudiants et enseignants de tout le Cameroun et du continent, dans une même salle. Quel que soit votre parcours, vous avez votre place ici.',
      },
      {
        word: 'Apprendre.',
        title: 'Des conférences pour tous les niveaux',
        body: 'De votre premier script à Python en production : IA, données, web, matériel et le langage lui-même, choisis via un appel à propositions ouvert.',
      },
      {
        word: 'Construire.',
        title: 'Des ateliers dont on repart avec du code',
        body: 'Apportez un ordinateur. Les ateliers durent plus longtemps que les conférences et se terminent par quelque chose qui fonctionne sur votre machine.',
      },
      {
        word: 'Appartenir.',
        title: 'Enraciné ici, ouvert au monde',
        body: 'Des billets à prix étudiant, une aide financière pour ceux qui en ont besoin et un programme qui parle à tout le pays.',
      },
    ],
  },
} as const;

export default function Welcome() {
  const { lang } = useLang();
  const c = COPY[lang];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      const head = q('.welcome__head')[0];

      // The welcome heading and edition stamp land like the hero's paper marks.
      gsap
        .timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: head, start: 'top 78%', once: true } })
        .from(q('.welcome__head .wv-title__line'), { yPercent: 32, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0)
        .from(q('.welcome__year'), { y: -16, rotate: '+=5', autoAlpha: 0, duration: 0.75 }, 0.25)
        .from(q('.welcome__intro, .welcome__more'), { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.32);

      // The circular type and badge move together as a restrained continuation of the hero's weave.
      gsap.to(q('.orbit__ring'), {
        rotate: 48,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to(q('.orbit__badge'), {
        y: -6,
        rotate: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.from(q('.orbit .wv-stk'), {
        y: -40,
        rotate: '+=10',
        autoAlpha: 0,
        duration: 0.9,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: q('.orbit')[0], start: 'top 75%', once: true },
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="welcome wv f-paper" aria-labelledby="welcome-title">
      <Weave className="wv-corner wv-corner--tr" accent />
      <div className="wrap">
        <header className="welcome__head">
          <div className="welcome__title-wrap">
            <Title id="welcome-title" lead={c.welcome} main={SITE.name} className="welcome__title" />
            <p className="wv-year welcome__year">
              <span className="sr-only">{SITE.year}</span>
              <span aria-hidden="true">{String(SITE.year).slice(0, 2)}</span>
              <span aria-hidden="true">{String(SITE.year).slice(2)}</span>
            </p>
          </div>
          <div className="welcome__text">
            <p className="welcome__intro">{c.intro}</p>
            <Link className="wv-btn wv-btn--line welcome__more" href="/about">
              {c.more} <Out />
            </Link>
          </div>
        </header>

        <div className="welcome__body">
          <ol className="pillars">
            {(c.pillars as readonly Pillar[]).map((p, i) => (
              <li key={p.word} className={`pillar${i === c.pillars.length - 1 ? ' pillar--sun' : ''}`}>
                <p className="pillar__word" aria-hidden="true">
                  {p.word}
                </p>
                <div className="pillar__text">
                  <h3 className="pillar__title">{p.title}</h3>
                  <p className="pillar__body">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="orbit" aria-hidden="true">
            <div className="orbit__stage">
              <svg className="orbit__line" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="168" />
              </svg>
              <svg className="orbit__ring" viewBox="0 0 400 400">
                <defs>
                  <path id="orbit-path" d="M200 200m-182 0a182 182 0 1 1 364 0a182 182 0 1 1-364 0" />
                </defs>
                <text>
                  <textPath href="#orbit-path" textLength={1140} lengthAdjust="spacing">
                    {c.ring}
                  </textPath>
                </text>
              </svg>
              <Image className="orbit__badge" src="/hero/badge-large.webp" alt="" width={1204} height={1216} sizes="(min-width: 960px) 26vw, 60vw" />
              <p className="wv-stk wv-stk--sun orbit__stk" lang={lang}>
                <span>
                  {c.sticker[0]}
                  <br />
                  {c.sticker[1]}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
