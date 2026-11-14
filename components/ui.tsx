import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Photo } from '../content/edition2026';
import { STATUS } from '../lib/site';

/** A 2026 photo with its caption and credit. `ratio` crops it; `top` keeps the top of the frame. */
export function Figure({
  photo,
  ratio = '3 / 2',
  sizes = '100vw',
  caption = true,
  parallax = false,
  priority = false,
  top = false,
  className = '',
}: {
  photo: Photo;
  ratio?: string;
  sizes?: string;
  caption?: boolean;
  parallax?: boolean;
  priority?: boolean;
  top?: boolean;
  className?: string;
}) {
  return (
    <figure className={`figure ${className}`}>
      <div className="figure__frame" style={{ aspectRatio: ratio }} data-parallax={parallax || undefined}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: top ? 'center 18%' : 'center' }}
        />
      </div>
      {caption && photo.caption && (
        <figcaption>
          <span className="serif">{photo.caption}</span>
          <span>Photo: PyCon Cameroon 2026</span>
        </figcaption>
      )}
    </figure>
  );
}

/** Section heading: a mono label on a rule, then a big left-aligned title, with an optional aside. */
export function Head({ label, title, aside, id }: { label: string; title: ReactNode; aside?: ReactNode; id?: string }) {
  return (
    <div className="head" data-reveal>
      <p className="head__label eyebrow">{label}</p>
      <div className="head__row">
        <h2 className="h2" id={id}>
          {title}
        </h2>
        {aside}
      </div>
    </div>
  );
}

/** The opening of an inner page. Each page passes its own visual in `children`. */
export function PageIntro({
  label,
  title,
  lede,
  children,
  variant = 'plain',
}: {
  label: string;
  title: string;
  lede: ReactNode;
  children?: ReactNode;
  variant?: 'plain' | 'deep';
}) {
  return (
    <section className={`intro ${variant === 'deep' ? 'deep' : ''}`}>
      <div className="wrap intro__in">
        <div className="intro__text">
          <p className="eyebrow" data-hero>
            {label}
          </p>
          <h1 className="h1">
            {title.split('\n').map((line) => (
              <span className="line-mask" key={line}>
                <span data-hero-line>{line}</span>
              </span>
            ))}
          </h1>
          <div className="lede" data-hero>
            {lede}
          </div>
        </div>
        {children && (
          <div className="intro__aside" data-hero>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

const state = (s: string) => (s === 'soon' ? 'Not announced' : s === 'open' || s === 'on-sale' ? 'Open now' : 'Closed');

export const KEY_DATES = [
  { when: '17–19 Sep 2026', what: 'PyCon Cameroon 2026, Yaoundé', state: 'Done', done: true },
  { when: 'To be announced', what: 'Call for proposals opens', state: state(STATUS.cfp), done: false },
  { when: 'To be announced', what: 'Financial aid applications', state: state(STATUS.financialAid), done: false },
  { when: 'To be announced', what: 'Tickets on sale', state: state(STATUS.tickets), done: false },
  { when: 'To be announced', what: 'Programme published', state: state(STATUS.schedule), done: false },
  { when: '2027', what: 'PyCon Cameroon 2027, Douala', state: 'Dates to come', done: false, strong: true },
];

export function KeyDates() {
  return (
    <ol className="dates" data-stagger>
      {KEY_DATES.map((d) => (
        <li key={d.what} className={d.strong ? 'dates__row dates__row--strong' : 'dates__row'}>
          <span className="mono dates__when">{d.when}</span>
          <span className="dates__what">{d.what}</span>
          <span className={`tag ${d.done ? 'tag--done' : 'tag--soon'}`}>{d.state}</span>
        </li>
      ))}
    </ol>
  );
}
