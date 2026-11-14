import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '../../components/Mark';
import { PageIntro } from '../../components/ui';
import { LINKS, SITE, STATUS } from '../../lib/site';
import '../pages.css';

export const metadata: Metadata = {
  title: 'Attend',
  description: 'Tickets, financial aid, visas, health and money: what you need to know to attend PyCon Cameroon 2027 in Douala.',
};

const INDEX = [
  { id: 'tickets', label: 'Tickets' },
  { id: 'financial-aid', label: 'Financial aid' },
  { id: 'visas', label: 'Visas and letters' },
  { id: 'health', label: 'Health' },
  { id: 'money', label: 'Money and phones' },
  { id: 'faq', label: 'Questions' },
];

const RATES_2026 = [
  { name: 'Early bird', price: '3,100' },
  { name: 'Normal', price: '5,100' },
  { name: 'On site', price: '10,200' },
];

const FAQ = [
  { q: 'Do I need to know Python already?', a: 'No. There are talks for people who started last month and for people who maintain libraries. Each session says who it is for.' },
  { q: 'Is it in English or French?', a: 'Both. Each session is labelled EN, FR or EN / FR, and the team speaks both. You can ask questions in either language.' },
  { q: 'Should I bring a laptop?', a: 'Yes, if you plan to join workshops. Bring a charger and an adapter for type C or E sockets.' },
  { q: 'Is the venue accessible?', a: 'The venue is not chosen yet. Accessibility is one of the things we check; tell us what you need and we will answer before you book.' },
];

export default function AttendPage() {
  return (
    <>
      <PageIntro
        label="Attend"
        title={'Coming to\nDouala'}
        lede={<p>Everything you need to plan the trip. What is not decided yet says so, and is updated here first.</p>}
      >
        <dl className="facts">
          <div>
            <dt>Tickets</dt>
            <dd>{STATUS.tickets === 'on-sale' ? 'On sale' : 'Not on sale yet'}</dd>
          </div>
          <div>
            <dt>Financial aid</dt>
            <dd>{STATUS.financialAid === 'open' ? 'Applications open' : 'Not open yet'}</dd>
          </div>
          <div>
            <dt>Airport</dt>
            <dd>Douala International (DLA)</dd>
          </div>
          <div>
            <dt>Currency</dt>
            <dd>CFA franc (XAF)</dd>
          </div>
        </dl>
      </PageIntro>

      <div className="wrap guide">
        <nav className="guide__index" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ol>
            {INDEX.map((i, n) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>
                  <span className="mono">{String(n + 1).padStart(2, '0')}</span> {i.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="guide__body">
          <section id="tickets" aria-labelledby="t-title" className="guide__sec">
            <h2 className="h2" id="t-title">
              Tickets
            </h2>
            <p className="lede">Not on sale yet. Prices are announced with the dates.</p>
            <div className="prose">
              <p>
                In 2026, tickets came in three steps, and every ticket included all talks and workshops, coffee, lunch and
                conference swag. Prices were in CFA francs:
              </p>
            </div>
            <ul className="rates" data-stagger>
              {RATES_2026.map((r) => (
                <li key={r.name}>
                  <span className="muted">{r.name}</span>
                  <span className="rates__price">
                    {r.price} <small>XAF</small>
                  </span>
                </li>
              ))}
            </ul>
            <Link className="btn btn--taxi" href="/#updates">
              Tell me when tickets open <Arrow />
            </Link>
          </section>

          <section id="financial-aid" aria-labelledby="fa-title" className="guide__sec">
            <h2 className="h2" id="fa-title">
              Financial aid
            </h2>
            <div className="prose">
              <p>
                Money should not be the reason you miss PyCon Cameroon. In 2026, part of the budget paid for free tickets,
                hotel nights and travel to Yaoundé for speakers and grant recipients from other cities.
              </p>
              <p>For 2027, how to apply is announced with ticket sales.</p>
            </div>
          </section>

          <section id="visas" aria-labelledby="v-title" className="guide__sec">
            <h2 className="h2" id="v-title">
              Visas and invitation letters
            </h2>
            <div className="prose">
              <p>
                Most visitors need a visa, applied for online at the official portal{' '}
                <a href={LINKS.evisa} target="_blank" rel="noreferrer">
                  evisacam.cm
                </a>
                . Apply at least ten days before you travel, and beware of look-alike sites: the official one ends in .cm.
              </p>
              <p>
                Citizens of the CEMAC countries (Central African Republic, Chad, Congo, Equatorial Guinea and Gabon) and of
                Mali and Nigeria do not need one for short visits.
              </p>
              <p>We send invitation letters to registered attendees and speakers. Ask early: embassies can be slow.</p>
            </div>
            <a className="link" href={LINKS.mail('Invitation letter, PyCon Cameroon 2027')}>
              Request an invitation letter <Arrow />
            </a>
          </section>

          <section id="health" aria-labelledby="h-title" className="guide__sec">
            <h2 className="h2" id="h-title">
              Health
            </h2>
            <div className="prose">
              <p>
                <strong>Yellow fever:</strong> a vaccination certificate is required to enter Cameroon, and is checked at
                the airport. Carry the original.
              </p>
              <p>
                <strong>Malaria</strong> is present all year in Douala. See a doctor about prevention before you travel,
                and bring repellent.
              </p>
              <p>Drink bottled or filtered water. Douala is hot and humid; carry water during the day.</p>
            </div>
          </section>

          <section id="money" aria-labelledby="m-title" className="guide__sec">
            <h2 className="h2" id="m-title">
              Money and phones
            </h2>
            <div className="prose">
              <p>
                The currency is the Central African CFA franc (XAF). Cash is still king in taxis and markets; cards work in
                larger hotels and shops. ATMs are common in Akwa and Bonanjo.
              </p>
              <p>
                Mobile money (MTN MoMo, Orange Money) is how most people pay each other. A local SIM card is cheap and needs
                your passport to register.
              </p>
            </div>
          </section>

          <section id="faq" aria-labelledby="q-title" className="guide__sec">
            <h2 className="h2" id="q-title">
              Questions
            </h2>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span aria-hidden="true" className="faq__icon" />
                  </summary>
                  <p className="prose">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="muted" style={{ marginTop: 24 }}>
              Anything else: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
