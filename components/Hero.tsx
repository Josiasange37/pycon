'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useLang } from '../lib/i18n';
import { SITE } from '../lib/site';
import { HxOut, Icons } from './HxIcons';

gsap.registerPlugin(useGSAP);

/* The "Woven in Douala" hero, drawn from the 1440 frame of the design. */

export default function Hero() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [l1, l2, l3, l4] = t.hero.title;

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.05 });
      tl.from(q('.hx__statue'), { yPercent: 6, autoAlpha: 0, duration: 1.6 }, 0)
        .from(q('.hx__line'), { yPercent: 40, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.15)
        .from(q('.hx__year'), { y: -18, autoAlpha: 0, duration: 1 }, 0.35)
        .from(q('.hx__tag'), { y: -40, rotate: '+=10', autoAlpha: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.12 }, 0.5)
        .from(q('.hx__lede, .hx__actions > *'), { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.07 }, 0.55)
        .from(q('.hx__icons'), { autoAlpha: 0, duration: 1.2, stagger: 0.06 }, 0.7);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hx" aria-labelledby="hero-title">
      <div className="hx__frame">
        <Image className="hx__statue" src="/hero/statue-woven.webp" alt={t.hero.statueAlt} width={632} height={1514} priority sizes="(min-width: 1100px) 43vw, 60vw" />

        <Icons at="tl" />
        <Icons at="mr" />
        <Icons at="tt" />
        <Icons at="bl" />

        <p className="hx__year">
          <span>{String(SITE.year).slice(0, 2)}</span>
          <span>{String(SITE.year).slice(2)}</span>
        </p>

        <p className="hx__tag hx__tag--edition">{t.hero.edition}</p>
        <p className="hx__tag hx__tag--sun" lang="fr">
          <span>
            {t.hero.seeYou[0]}
            <br />
            {t.hero.seeYou[1]}
          </span>
        </p>

        <h1 className="hx__title" id="hero-title">
          <span className="hx__line hx__line--1">{l1}</span> <span className="hx__line hx__line--2 hx__sun">{l2}</span>{' '}
          <span className="hx__line hx__line--3">{l3}</span> <span className="hx__line hx__line--4 hx__sun">{l4}</span>
        </h1>

        <p className="hx__lede">{t.hero.tagline}</p>

        <div className="hx__actions">
          <Link className="hx__btn hx__btn--sun" href="/attend#tickets">
            {t.hero.buyTickets} <HxOut />
          </Link>
          <Link className="hx__btn hx__btn--line" href="/agenda">
            {t.hero.agenda} <HxOut />
          </Link>
        </div>
      </div>
    </section>
  );
}
