'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useLang } from '../lib/i18n';
import { SITE } from '../lib/site';

gsap.registerPlugin(useGSAP);

/* The "Woven in Douala" hero, drawn from the 1440 frame of the design.
 * The four little icon rows are the designer's own paths, kept in frame coordinates. */
type Row = { box: [number, number, number, number]; accent?: boolean; paths: string[]; dots: [string, string] };

const ROWS: Record<'tl' | 'mr' | 'tt' | 'bl', Row> = {
  tl: {
    box: [17, 124, 209, 28],
    paths: ['M36 125L54 138L36 151L18 138L36 125ZM36 131L46 138L36 145L26 138L36 131Z', 'M88 130H104V146H88V130Z', 'M96 133V138M96 138V143M96 138H91M96 138H101', 'M140 143H150V133H170V143H180'],
    dots: ['M209 135.5H214V140.5H209V135.5Z', 'M220 135.5H225V140.5H220V135.5Z'],
  },
  mr: {
    box: [1196, 476, 209, 32],
    paths: ['M1215 477L1233 492L1215 507L1197 492L1215 477ZM1215 483.923L1225 492L1215 500.077L1205 492L1215 483.923Z', 'M1267 482.769H1283V501.231H1267V482.769Z', 'M1275 486.231V492M1275 492V497.769M1275 492H1270M1275 492H1280', 'M1319 497.769H1329V486.231H1349V497.769H1359'],
    dots: ['M1388 489.115H1393V494.885H1388V489.115Z', 'M1399 489.115H1404V494.885H1399V489.115Z'],
  },
  tt: {
    box: [998, 994, 204, 36],
    accent: true,
    paths: ['M1016.58 995L1034.16 1012L1016.58 1029L999 1012L1016.58 995ZM1016.58 1002.85L1026.35 1012L1016.58 1021.15L1006.81 1012L1016.58 1002.85Z', 'M1067.37 1001.54H1083V1022.46H1067.37V1001.54Z', 'M1075.19 1005.46V1012M1075.19 1012V1018.54M1075.19 1012H1070.3M1075.19 1012H1080.07', 'M1118.16 1018.54H1127.93V1005.46H1147.47V1018.54H1157.23'],
    dots: ['M1185.56 1008.73H1190.44V1015.27H1185.56V1008.73Z', 'M1201.19 1008.73H1196.3V1015.27H1201.19V1008.73Z'],
  },
  bl: {
    box: [25, 1134, 209, 28],
    accent: true,
    paths: ['M44 1135L62 1148L44 1161L26 1148L44 1135ZM44 1141L54 1148L44 1155L34 1148L44 1141Z', 'M96 1140H112V1156H96V1140Z', 'M104 1143V1148M104 1148V1153M104 1148H99M104 1148H109', 'M148 1153H158V1143H178V1153H188'],
    dots: ['M217 1145.5H222V1150.5H217V1145.5Z', 'M233 1145.5H228V1150.5H233V1145.5Z'],
  },
};

function Icons({ at }: { at: keyof typeof ROWS }) {
  const { box, accent, paths, dots } = ROWS[at];
  const [x, y, w, h] = box;
  return (
    <svg
      className={`hx__icons hx__icons--${at}`}
      viewBox={`${x} ${y} ${w} ${h}`}
      style={{ '--x': x, '--y': y - 112, '--w': w } as React.CSSProperties}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      <path d={dots[0]} />
      {accent ? <path d={dots[1]} className="hx__dot" stroke="none" /> : <path d={dots[1]} />}
    </svg>
  );
}

/** The design's filled north-east arrow. */
function Out() {
  return (
    <svg className="hx__arrow" width="12.5" height="12.5" viewBox="0 0 12.512 12.529" aria-hidden="true" fill="currentColor">
      <path d="M1.274 12.529L0 11.255L9.474 1.764H2.156L2.172 0H12.512V10.356H10.732L10.748 3.038L1.274 12.529Z" />
    </svg>
  );
}

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
            {t.hero.buyTickets} <Out />
          </Link>
          <Link className="hx__btn hx__btn--line" href="/agenda">
            {t.hero.agenda} <Out />
          </Link>
        </div>
      </div>
    </section>
  );
}
