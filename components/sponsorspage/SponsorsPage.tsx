'use client';

import { motion } from 'motion/react';
import { SPONSOR_TIERS } from '../sections/content';
import { useRise } from '../sections/SectionHead';
import './sponsorspage.css';

/*
 * Every sponsor, by tier. The diamond sponsor gets the whole width and its own words;
 * the others share a grid of name plates until their logo files arrive.
 */
export default function SponsorsPage() {
  const rise = useRise();
  const [lead, ...rest] = SPONSOR_TIERS;
  const diamond = lead.sponsors[0];

  return (
    <div className="sec sponsorpage">
      <section className="sponsorpage__tier" aria-labelledby="tier-diamond">
        <motion.h2 id="tier-diamond" className="sponsorpage__tiername" {...rise(0)}>
          {lead.tier}
        </motion.h2>
        <motion.article className="diamond" {...rise(1)}>
          <div className="diamond__plate" aria-hidden="true">
            {diamond.name}
          </div>
          <div className="diamond__text">
            <h3>{diamond.name}</h3>
            <p>{diamond.blurb}</p>
            {diamond.url && (
              <a className="diamond__link" href={diamond.url} target="_blank" rel="noreferrer">
                Visit website <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </motion.article>
      </section>

      {rest.map((t, ti) => {
        const id = `tier-${ti}`;
        return (
          <section key={t.tier} className="sponsorpage__tier" aria-labelledby={id}>
            <motion.h2 id={id} className="sponsorpage__tiername" {...rise(0)}>
              {t.tier}
            </motion.h2>
            <ul className="plates">
              {t.sponsors.map((s, i) => (
                <motion.li key={s.name} className="plate" {...rise(i + 1)}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.name}
                    </a>
                  ) : (
                    <span>{s.name}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </section>
        );
      })}

      <motion.div className="sponsorpage__join" {...rise(0)}>
        <p>Want to see your name on this wall next year?</p>
        <a className="btn btn--line" href="mailto:organizers@pythoncameroon.org?subject=Sponsoring%20PyCon%20Cameroon">
          Become a sponsor
        </a>
      </motion.div>
    </div>
  );
}
