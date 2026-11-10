'use client';

import { motion } from 'motion/react';
import { KEYNOTES, type Keynote } from './content';
import { SectionHead, useRise } from './SectionHead';

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

function Portrait({ k }: { k: Keynote }) {
  if (k.photo) return <img src={k.photo} alt={`Portrait of ${k.name}`} loading="lazy" draggable={false} />;
  // until a portrait arrives: their initials, painted on the rock inside an ochre oval
  return (
    <div className="keynote__stone" aria-hidden="true">
      <span>{initials(k.name)}</span>
    </div>
  );
}

export default function Speakers() {
  const rise = useRise();
  return (
    <section className="sec speakers" id="speakers" aria-labelledby="speakers-title">
      <SectionHead id="speakers-title" lead="Meet our" accent="Keynote Speakers" sub="Three keynotes, one to open each day of the conference." />

      <ol className="speakers__list">
        {KEYNOTES.map((k, i) => (
          <motion.li key={k.name} className="keynote" {...rise(i + 1)}>
            <div className="keynote__portrait">
              <Portrait k={k} />
            </div>
            <div className="keynote__body">
              <p className="keynote__when">
                {k.day} keynote <span aria-hidden="true">·</span> {k.date}
              </p>
              <h3>{k.name}</h3>
              <p className="keynote__role">{k.role}</p>
              <p className="keynote__talk">{k.talk}</p>
              <p className="keynote__meta">
                Room {k.room} <span aria-hidden="true">·</span> <abbr title={k.lang === 'FR' ? 'In French' : 'In English'}>{k.lang}</abbr>
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.div className="sec__more" {...rise(4)}>
        <a className="btn btn--line" href="/speakers">
          See all speakers
        </a>
      </motion.div>
    </section>
  );
}
