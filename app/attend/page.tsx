/*
THESIS: The Attend page is an editorial travel dossier, not a generic FAQ.
OWN-WORLD: Inherit Woven in Douala: warm paper, navy, Wouri blue, taxi yellow, Inter display, and credited Douala photography.
STORY: Local and international attendees see current conference status, find travel guidance, and reach official sources.
FIRST VIEWPORT: A deep-navy cover pairs “Coming to Douala” with a credited portrait and four live status facts; a ruled index leads into wide editorial chapters and historical ticket prices.
FORM: Travel dossier, selected by the user in surface round c61e80db; code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
*/

import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '../../components/Mark';
import { Weave } from '../../components/Weave';
import { LINKS, SITE, STATUS } from '../../lib/site';
import { pageMetadata } from '../../lib/seo';
import '../pages.css';
import './attend.css';

export const metadata = pageMetadata({
  title: 'Attend',
  description: 'Plan your visit to PyCon Cameroon 2027 in Douala with ticket and financial aid updates, visa guidance, health information and travel advice.',
  path: '/attend',
});

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

const ticketStatus = STATUS.tickets === 'on-sale' ? 'On sale' : STATUS.tickets === 'sold-out' ? 'Sold out' : 'Not on sale yet';
const aidStatus = STATUS.financialAid === 'open' ? 'Applications open' : STATUS.financialAid === 'closed' ? 'Applications closed' : 'Not open yet';

export default function AttendPage() {
  return (
    <>
      <section className="attend-cover deep" aria-labelledby="attend-title">
        <Weave className="attend-cover__weave" accent />
        <div className="wrap attend-cover__in">
          <div className="attend-cover__intro">
            <h1 className="attend-cover__title" id="attend-title">
              Coming to <span>Douala.</span>
            </h1>
            <p className="attend-cover__lede">
              Everything you need to plan the trip. What is not decided yet says so, and is updated here first.
            </p>
            <p className="attend-cover__edition mono">PyCon Cameroon · {SITE.year}</p>
            <a className="btn btn--taxi attend-cover__action" href="#tickets">
              Explore the guide <Arrow />
            </a>
          </div>

          <figure className="attend-cover__photo">
            <div className="attend-cover__frame">
              <Image
                src="/venue/nouvelle-liberte.webp"
                alt="La Nouvelle Liberté sculpture at the Deïdo roundabout in Douala"
                fill
                priority
                sizes="(min-width: 960px) 38vw, 100vw"
              />
            </div>
            <figcaption>
              <span>La Nouvelle Liberté · Deïdo</span>
              <span>
                Photo: <a href="https://commons.wikimedia.org/wiki/File:Nouvelle_Libert%C3%A9_01.JPG" target="_blank" rel="noreferrer">Alessandro Aceri</a>
                {' · '}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>
              </span>
            </figcaption>
          </figure>

          <dl className="attend-cover__facts" aria-label={`${SITE.year} conference planning status`}>
            <div>
              <dt>Dates</dt>
              <dd>{SITE.dates?.label ?? 'To be announced'}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{SITE.venue?.name ?? 'Being confirmed'}</dd>
            </div>
            <div>
              <dt>Tickets</dt>
              <dd>{ticketStatus}</dd>
            </div>
            <div>
              <dt>Financial aid</dt>
              <dd>{aidStatus}</dd>
            </div>
          </dl>
        </div>
      </section>

      <nav className="attend-index wrap" aria-label="On this page">
        <p className="attend-index__title">In this guide</p>
        <ol>
          {INDEX.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>
                <span>{item.label}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="wrap attend-guide">
        <section id="tickets" aria-labelledby="tickets-title" className="attend-chapter">
          <div className="attend-chapter__heading">
            <h2 className="attend-chapter__title" id="tickets-title">Tickets</h2>
            <p className="attend-chapter__note">{SITE.year} · {ticketStatus}</p>
          </div>
          <div className="attend-chapter__body">
            <p className="attend-chapter__lead">Prices are announced with the dates.</p>
            <p>
              In 2026, every ticket included all talks and workshops, coffee, lunch and conference swag. Those prices in
              CFA francs are kept here as a reference for the previous edition.
            </p>
            <table className="attend-rates">
              <caption>PyCon Cameroon 2026 · Yaoundé · XAF</caption>
              <thead>
                <tr><th scope="col">Ticket</th><th scope="col">Price</th></tr>
              </thead>
              <tbody>
                {RATES_2026.map((rate) => (
                  <tr key={rate.name}>
                    <th scope="row">{rate.name}</th>
                    <td>{rate.price} <span>XAF</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link className="btn btn--taxi attend-chapter__action" href="/#updates">
              Tell me when tickets open <Arrow />
            </Link>
          </div>
        </section>

        <section id="financial-aid" aria-labelledby="aid-title" className="attend-chapter">
          <div className="attend-chapter__heading">
            <h2 className="attend-chapter__title" id="aid-title">Financial aid</h2>
            <p className="attend-chapter__note">{SITE.year} · {aidStatus}</p>
          </div>
          <div className="attend-chapter__body">
            <p className="attend-chapter__lead">Money should not be the reason you miss PyCon Cameroon.</p>
            <p>
              In 2026, part of the budget paid for free tickets, hotel nights and travel to Yaoundé for speakers and grant
              recipients from other cities.
            </p>
            <p>For 2027, how to apply is announced with ticket sales.</p>
          </div>
        </section>

        <section id="visas" aria-labelledby="visas-title" className="attend-chapter">
          <div className="attend-chapter__heading">
            <h2 className="attend-chapter__title" id="visas-title">Visas and invitation letters</h2>
            <p className="attend-chapter__note">Before you travel</p>
          </div>
          <div className="attend-chapter__body">
            <p>
              Visa requirements vary by nationality and passport type. Check your current requirements on the official
              Cameroon eVisa portal before booking. Apply early and follow the processing guidance shown there; avoid
              look-alike sites by checking the address ends in <strong>.cm</strong>.
            </p>
            <p>We send invitation letters to registered attendees and speakers. Ask early: embassies can be slow.</p>
            <a className="attend-text-link" href={LINKS.evisa} target="_blank" rel="noreferrer">
              Open the official eVisa portal <Arrow dir="out" />
            </a>
            <a className="attend-text-link" href={LINKS.mail('Invitation letter, PyCon Cameroon 2027')}>
              Request an invitation letter <Arrow />
            </a>
          </div>
        </section>

        <section id="health" aria-labelledby="health-title" className="attend-chapter">
          <div className="attend-chapter__heading">
            <h2 className="attend-chapter__title" id="health-title">Health</h2>
            <p className="attend-chapter__note">Before you travel</p>
          </div>
          <div className="attend-chapter__body attend-chapter__body--health">
            <p><strong>Yellow fever:</strong> Cameroon requires a vaccination certificate for travellers aged one year and older. Keep the original with your travel documents.</p>
            <p><strong>Malaria:</strong> risk is present throughout the year. Ask a clinician about prevention before you travel, and bring repellent.</p>
            <p>Drink bottled or filtered water. Douala is hot and humid; carry water during the day.</p>
            <a className="attend-text-link" href="https://www.who.int/travel-advice" target="_blank" rel="noreferrer">
              Check WHO travel advice <Arrow dir="out" />
            </a>
          </div>
        </section>

        <section id="money" aria-labelledby="money-title" className="attend-chapter">
          <div className="attend-chapter__heading">
            <h2 className="attend-chapter__title" id="money-title">Money and phones</h2>
            <p className="attend-chapter__note">In Douala</p>
          </div>
          <div className="attend-chapter__body">
            <p>
              The currency is the Central African CFA franc (XAF). Cash is still king in taxis and markets; cards work in
              larger hotels and shops. ATMs are common in Akwa and Bonanjo.
            </p>
            <p>
              Mobile money (MTN MoMo, Orange Money) is how most people pay each other. A local SIM card is cheap and needs
              your passport to register.
            </p>
            <dl className="attend-local-facts">
              <div><dt>Airport</dt><dd>Douala International · DLA</dd></div>
              <div><dt>Currency</dt><dd>CFA franc · XAF</dd></div>
            </dl>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-title" className="attend-chapter attend-chapter--faq">
          <div className="attend-chapter__heading">
            <h2 className="attend-chapter__title" id="faq-title">Questions</h2>
            <p className="attend-chapter__note">A few useful answers</p>
          </div>
          <div className="attend-chapter__body">
            <div className="attend-faq">
              {FAQ.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span className="attend-faq__icon" aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            <p className="attend-contact">Anything else? <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </div>
        </section>
      </div>
    </>
  );
}
