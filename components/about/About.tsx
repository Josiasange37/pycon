'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ART } from '../splash/art';
import { EASE_OUT } from '../splash/wall';
import './about.css';

/*
 * Below the hero: what PyCon Cameroon is, then three reasons to come. Each reason wears
 * an ochre oval like the handprints on the cave wall, filled with the splash's own art:
 * the raised hands, and the woven fabric inside the logo.
 */

type Pillar = { title: string; body: string; image: string; alt: string; fit: 'hand' | 'fabric' };

const PILLARS: Pillar[] = [
  {
    title: 'African Innovation Hub',
    body: 'Connect with developers, entrepreneurs, and tech enthusiasts from across Africa and the world. Experience the unique blend of Cameroonian culture and cutting-edge technology.',
    image: '/splash/art/image7.webp',
    alt: 'An open hand raised in greeting',
    fit: 'hand',
  },
  {
    title: 'Python for Everyone',
    body: 'Whether you’re a beginner taking your first steps or an expert pushing boundaries, our diverse program caters to all skill levels and interests.',
    image: `/splash/art/${ART.logo.image}.webp`,
    alt: 'The woven fabric that fills the PyCon Cameroon Python logo',
    fit: 'fabric',
  },
  {
    title: 'Community Driven',
    body: 'We believe in building a welcoming, inclusive community where everyone feels valued. Diversity and collaboration are at the heart of everything we do.',
    image: '/splash/art/image10.webp',
    alt: 'A hand waving hello',
    fit: 'hand',
  },
];

export default function About() {
  const reduced = useReducedMotion() ?? false;
  // each part rises once as it scrolls into view
  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { delay: i * 0.09, duration: 0.9, ease: EASE_OUT },
  });

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__intro">
        <motion.h2 id="about-title" {...rise(0)}>
          Welcome to <span className="about__accent">PyCon Cameroon 2026</span>
        </motion.h2>
        <motion.span className="about__mark" aria-hidden="true" {...rise(1)} />
        <motion.p {...rise(2)}>
          Join us for Cameroon’s first-ever PyCon, a celebration of Python, technology, and African innovation.
          Experience two days of inspiring talks, hands-on workshops, and unforgettable networking opportunities in
          the vibrant city of Yaoundé.
        </motion.p>
      </div>

      <ul className="about__pillars">
        {PILLARS.map((p, i) => (
          <motion.li key={p.title} className="pillar" {...rise(i + 1)}>
            <div className="pillar__oval" data-fit={p.fit}>
              <img src={p.image} alt={p.alt} loading="lazy" draggable={false} />
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
