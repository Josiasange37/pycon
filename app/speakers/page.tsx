import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '../../components/Mark';
import SpeakerWall from '../../components/SpeakerWall';
import { Figure, Head, PageIntro } from '../../components/ui';
import { KEYNOTES_2026 } from '../../content/edition2026';
import { LINKS, STATUS } from '../../lib/site';
import '../pages.css';

export const metadata: Metadata = {
  title: 'Speakers',
  description: 'Speak at PyCon Cameroon 2027 in Douala. The call for proposals opens soon; meet the people who spoke in 2026.',
};

export default function SpeakersPage() {
  return (
    <>
      <PageIntro
        variant="deep"
        label="Speakers"
        title={'Your talk\nhere, in Douala'}
        lede={
          <p>
            2027 speakers are chosen from a public call for proposals. Until then, here are the thirty-four people who
            took the stage in Yaoundé.
          </p>
        }
      >
        <div className="sp-intro__faces">
          {KEYNOTES_2026.map((k) => (
            <Figure key={k.name} photo={k.photo} ratio="3 / 4" caption={false} top sizes="16vw" />
          ))}
        </div>
      </PageIntro>

      <section id="cfp" className="section wrap cfp" aria-labelledby="cfp-title">
        <div className="cfp__card" data-reveal>
          <div>
            <span className="tag tag--soon">{STATUS.cfp === 'open' ? 'Open now' : 'Opens soon'}</span>
            <h2 className="h2" id="cfp-title">
              Call for proposals
            </h2>
          </div>
          <div className="cfp__body">
            <p className="lede">You don’t need a novel discovery. Tell us what you built, what broke, or what took far too long to figure out.</p>
            <ul className="cfp__list">
              <li>
                <strong>Talks</strong> of about 30 minutes, <strong>workshops</strong> of about an hour, and short lightning talks.
              </li>
              <li>
                In <strong>English, French or both</strong>. In 2026, ten sessions switched between the two.
              </li>
              <li>
                <strong>First-time speakers</strong> are welcome; ask us for a reviewer to read your draft.
              </li>
              <li>Speakers from outside Cameroon can ask for an invitation letter for their visa.</li>
            </ul>
            <div className="actions">
              <a className="btn btn--taxi" href={LINKS.mail('Tell me when the PyCon Cameroon 2027 CFP opens')}>
                Tell me when it opens <Arrow />
              </a>
              <Link className="link" href="/#updates">
                Follow the community channels <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section sp-keynotes" aria-labelledby="kn-title">
        <div className="wrap">
          <Head label="2026 keynotes" id="kn-title" title="One voice to open each day" />
          <div className="sp-kn">
            {KEYNOTES_2026.map((k, i) => (
              <article key={k.name} className="sp-kn__item" data-reveal>
                <Figure photo={k.photo} ratio="4 / 5" caption={false} top parallax sizes="(min-width: 900px) 30vw, 100vw" />
                <div className="sp-kn__text">
                  <p className="mono sp-kn__meta">
                    0{i + 1} · {k.day} · {k.lang === 'FR' ? 'In French' : 'In English'}
                  </p>
                  <h3 className="h3">{k.name}</h3>
                  <p className="muted">{k.role}</p>
                  <p className="serif sp-kn__talk">“{k.talk}”</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="all-title">
        <Head
          label="Everyone else"
          id="all-title"
          title="The 2026 speakers"
          aside={
            <a className="link" href="https://cm.pycon.org/2026/en/speakers" target="_blank" rel="noreferrer">
              Profiles on the 2026 site <Arrow dir="out" />
            </a>
          }
        />
        <SpeakerWall />
      </section>
    </>
  );
}
