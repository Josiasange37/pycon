'use client';

import { motion } from 'motion/react';
import { ART } from '../splash/art';
import { Wall } from '../splash/wall';
import { Glyph } from '../sections/Expect';
import { SectionHead, useRise } from '../sections/SectionHead';
import './venuepage.css';

/*
 * Where PyCon Cameroon happens and how to get there. No photograph of the venue or the
 * city could be found under an open licence, so the pictures are the cave wall itself:
 * the logo on its stone for the venue, and one mark from the wall for each place to visit.
 */

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const FEATURES = [
  'High-speed internet connectivity',
  'Modern audiovisual equipment',
  'Comfortable seating and workspaces',
  'Accessible facilities for all attendees',
];

const SITES = [
  {
    name: 'National Museum',
    body: 'Explore the rich history and culture of Cameroon in this former presidential palace.',
    query: 'Musée National Yaoundé',
    glyph: { group: 2, index: 2 },
  },
  {
    name: 'Bois Sainte Anastasie',
    body: 'A beautiful urban park, perfect for a relaxing walk amid nature in the city centre.',
    query: 'Bois Sainte Anastasie Yaoundé',
    glyph: { group: 2, index: 1 },
  },
  {
    name: 'Monument de la Réunification',
    body: 'An iconic monument to the reunification of the French and British Cameroons.',
    query: 'Monument de la Réunification Yaoundé',
    glyph: { group: 3, index: 3 },
  },
];

// the banner's 1920×1080 artboard, cropped around the logo
const CROP = { x: 560, y: 200, w: 800, h: 600 };
const L = ART.logo;

/** A framed piece of the cave wall with the logo on it. */
function WallPicture() {
  return (
    <div className="wallpic" aria-hidden="true">
      <div
        className="wallpic__stage"
        style={{
          width: `${(1920 / CROP.w) * 100}%`,
          left: `${(-CROP.x / CROP.w) * 100}%`,
          top: `${(-CROP.y / CROP.h) * 100}%`,
        }}
      >
        <Wall start={0} />
      </div>
      <img
        className="wallpic__logo"
        src={`/splash/art/${L.image}.webp`}
        alt=""
        style={{
          left: `${((L.x - CROP.x) / CROP.w) * 100}%`,
          top: `${((L.y - CROP.y) / CROP.h) * 100}%`,
          width: `${(L.w / CROP.w) * 100}%`,
        }}
      />
    </div>
  );
}

export default function VenuePage() {
  const rise = useRise();
  return (
    <>
      <section className="sec venue-where" aria-labelledby="where-title">
        <div className="venue-where__grid">
          <div>
            <SectionHead id="where-title" lead="Conference" accent="location" align="start" />
            <motion.address className="venue-card" {...rise(1)}>
              <h3>Girafe Hôtel</h3>
              <p>
                Elig-Essono, Yaoundé, Cameroon
                <br />
                Facing Sanza Night Club, BP 764 Yaoundé
              </p>
              <a className="btn btn--line" href={maps('Girafe Hôtel Elig-Essono Yaoundé')} target="_blank" rel="noreferrer">
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
            </motion.address>
            <motion.p className="venue-text" {...rise(2)}>
              PyCon Cameroon 2026 takes place at the Girafe Hôtel, in the Elig-Essono neighbourhood in the heart of Yaoundé. Easy to
              reach from anywhere in the city, the hotel offers a modern, welcoming setting to bring the Cameroonian Python community
              together.
            </motion.p>
            <motion.div {...rise(3)}>
              <p className="venue-text">The venue offers:</p>
              <ul className="venue-features">
                {FEATURES.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.figure className="venue-figure" {...rise(1)}>
            <WallPicture />
            <figcaption>Girafe Hôtel, Elig-Essono, Yaoundé</figcaption>
          </motion.figure>
        </div>
      </section>

      <section className="sec venue-trip" aria-labelledby="trip-title">
        <SectionHead id="trip-title" lead="Plan your" accent="trip" />
        <div className="trip">
          <motion.article {...rise(1)}>
            <h3>Accommodation</h3>
            <p>We will be partnering with several hotels near the conference venue to offer special rates for attendees.</p>
            <p>
              <strong>Official hotels:</strong> list coming soon.
            </p>
            <p className="trip__aside">Yaoundé offers accommodation from luxury hotels to budget-friendly guesthouses.</p>
          </motion.article>
          <motion.article {...rise(2)}>
            <h3>Getting there</h3>
            <p>
              <strong>By air:</strong> Yaoundé Nsimalen International Airport (NSI) is the main airport serving the city.
            </p>
            <p>
              <strong>By bus:</strong> several reliable bus companies run routes connecting Yaoundé to other major cities such as
              Douala.
            </p>
            <p className="trip__aside">Ride-hailing apps such as Yango, and local taxis, are widely available for getting around the city.</p>
          </motion.article>
        </div>
      </section>

      <section className="sec venue-explore" aria-labelledby="explore-title">
        <SectionHead id="explore-title" lead="Explore" accent="Yaoundé" sub="Enjoy the city of seven hills during your stay." />
        <ul className="sites">
          {SITES.map((s, i) => (
            <motion.li key={s.name} className="site" {...rise(i + 1)}>
              <div className="site__art" aria-hidden="true">
                <Glyph {...s.glyph} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
              <a href={maps(s.query)} target="_blank" rel="noreferrer">
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.div className="sec__more" {...rise(4)}>
          <a className="btn btn--line" href={maps('tourist attractions Yaoundé')} target="_blank" rel="noreferrer">
            More places to visit
          </a>
        </motion.div>
      </section>
    </>
  );
}
