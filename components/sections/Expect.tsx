'use client';

import { motion } from 'motion/react';
import { createElement } from 'react';
import { ART, svgProps } from '../splash/art';
import { EXPECT } from './content';
import { SectionHead, useRise } from './SectionHead';

/** One mark from the cave wall, drawn on its own. */
export function Glyph({ group, index }: { group: number; index: number }) {
  const glyph = ART.wall.find((w) => w.index === group)?.glyphs[index];
  if (!glyph) return null;
  const [x, y, w, h] = glyph.box;
  const pad = Math.max(w, h) * 0.08;
  return (
    <svg className="expect__glyph" viewBox={`${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`} aria-hidden="true">
      {glyph.parts.map((p, i) => createElement(p.tag, { key: i, ...svgProps(p.attrs) }))}
    </svg>
  );
}

export default function Expect() {
  const rise = useRise();
  return (
    <section className="sec expect" id="expect" aria-labelledby="expect-title">
      <div className="expect__grid">
        <SectionHead id="expect-title" lead="What to" accent="expect" sub="Three days in Yaoundé, written on the same wall as everything else." align="start" />
        <ul className="expect__list">
          {EXPECT.map((e, i) => (
            <motion.li key={e.title} {...rise(i + 1)}>
              <Glyph {...e.glyph} />
              <div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
