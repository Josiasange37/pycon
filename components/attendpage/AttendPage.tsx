'use client';

import { motion } from 'motion/react';
import { useId, useState } from 'react';
import { SectionHead, useRise } from '../sections/SectionHead';
import './attendpage.css';

/*
 * Registration, what a ticket includes, travel and policies. The rates carry the wall's
 * three colours; the sold-out ones say so plainly instead of pretending to be buttons.
 */

type Rate = { name: string; price: string; note: string; body: string; colour: 'ochre' | 'blue' | 'green'; buy?: string };

const RATES: Rate[] = [
  {
    name: 'Early Bird',
    price: '3,100',
    note: 'Limited-time offer',
    body: 'Secure your spot early at our special discounted rate. Available to all attendees for a limited time.',
    colour: 'ochre',
  },
  {
    name: 'Normal Rate',
    price: '5,100',
    note: 'Standard admission',
    body: 'The standard ticket for the conference, including lunch, refreshments and conference swag.',
    colour: 'blue',
  },
  {
    name: 'On-Site',
    price: '10,200',
    note: 'At the door',
    body: 'Buy your ticket on site during the conference, subject to availability. We recommend buying in advance!',
    colour: 'green',
    buy: '#',
  },
];

// the mockup shows only the first group's contents; the others are confirmed with attendees
const INCLUDED = [
  {
    title: 'Main conference days (Sep 17–19)',
    items: [
      'Access to all keynote sessions and talk tracks',
      'Morning coffee and refreshments',
      'Lunch on every conference day',
      'Afternoon tea and coffee break',
      'Access to the Expo Hall and Job Fair',
    ],
  },
  { title: 'Social events', items: ['Details will be shared with registered attendees.'] },
  { title: 'Conference swag', items: ['Details will be shared with registered attendees.'] },
];

const SUPPORTS = [
  'Venue rental and audiovisual equipment',
  'Catering (lunch and breaks)',
  'Internet connectivity',
  'Travel grants for those who need assistance',
  'Community infrastructure and future events',
];

const MAIL = 'organizers@pythoncameroon.org';

function Included() {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="included">
      {INCLUDED.map((g, i) => {
        const on = open === i;
        return (
          <div key={g.title} className="included__item" data-open={on}>
            <h3>
              <button
                type="button"
                id={`${base}-b${i}`}
                aria-expanded={on}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(on ? -1 : i)}
              >
                {g.title}
                <span className="included__sign" aria-hidden="true" />
              </button>
            </h3>
            <div className="included__panel" id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!on}>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AttendPage() {
  const rise = useRise();
  return (
    <>
      <section className="sec attend-rates" aria-labelledby="rates-title">
        <SectionHead
          id="rates-title"
          lead="Registration"
          accent="information"
          sub="PyCon Cameroon trusts you to self-select a fair registration rate. Choosing the right rate helps keep the conference affordable for students and anyone who needs financial assistance."
        />
        <ul className="rates">
          {RATES.map((r, i) => (
            <motion.li key={r.name} className="rate" data-colour={r.colour} {...rise(i + 1)}>
              <h3>{r.name}</h3>
              <p className="rate__price">
                {r.price} <span>XAF</span>
              </p>
              <p className="rate__note">{r.note}</p>
              <p className="rate__body">{r.body}</p>
              {r.buy ? (
                <a className="btn rate__buy" href={r.buy}>
                  Get an on-site ticket
                </a>
              ) : (
                <p className="rate__sold">Sold out</p>
              )}
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="sec attend-included" aria-labelledby="included-title">
        <div className="attend-included__grid">
          <motion.div {...rise(0)}>
            <h2 id="included-title" className="attend-h2">
              What’s included?
            </h2>
            <p className="attend-lead">Your registration gives you access to:</p>
            <Included />
          </motion.div>
          <motion.div className="supports" {...rise(1)}>
            <h2 className="attend-h2">What does your payment support?</h2>
            <p className="attend-lead">Your registration helps us keep PyCon Cameroon affordable. It goes towards:</p>
            <ul>
              {SUPPORTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="sec attend-visa" aria-labelledby="visa-title">
        <SectionHead id="visa-title" lead="International" accent="travel & visas" />
        <motion.div className="visa" {...rise(1)}>
          <h3>Visa information</h3>
          <p>Most visitors to Cameroon need a visa. Please check with your local Cameroonian embassy or consulate for the requirements that apply to you.</p>
          <p>
            <strong>Visa letters:</strong> we can provide an official invitation letter to support your visa application once you
            have a paid registration.
          </p>
          <a className="btn btn--line" href={`mailto:${MAIL}?subject=Invitation%20letter%20request%20%E2%80%94%20PyCon%20Cameroon%202026`}>
            Request an invitation letter
          </a>
        </motion.div>
      </section>

      <section className="sec attend-policies" aria-labelledby="policies-title">
        <div className="policies">
          <motion.h2 id="policies-title" className="attend-h2" {...rise(0)}>
            Policies
          </motion.h2>
          <div className="policies__grid">
            <motion.article {...rise(1)}>
              <h3>Cancellation policy</h3>
              <p>
                Cancellations received by August 15, 2026 will be refunded, less a processing fee. No refunds are given after this
                date, except for visa denial or health reasons.
              </p>
            </motion.article>
            <motion.article {...rise(2)}>
              <h3>Ticket transfers</h3>
              <p>
                You may transfer your ticket to someone else by sending a written request to <a href={`mailto:${MAIL}`}>{MAIL}</a>{' '}
                before September 1, 2026.
              </p>
            </motion.article>
          </div>
          <motion.p className="policies__ask" {...rise(3)}>
            Questions about registration?{' '}
            <a href={`mailto:${MAIL}?subject=Registration%20question`}>Contact our registration team</a>
          </motion.p>
        </div>
      </section>
    </>
  );
}
