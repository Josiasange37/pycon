import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Photo } from '../content/edition2026';
import { SITE } from '../lib/site';
import { Weave } from './Weave';

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
      <div className="head__eyebrow">
        <p className="head__label eyebrow">{label}</p>
        <Weave accent className="head__weave" />
      </div>
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
  variant = 'river',
}: {
  label: string;
  title: string;
  lede: ReactNode;
  children?: ReactNode;
  variant?: 'river' | 'paper' | 'night' | 'sun';
}) {
  return (
    <section className={`intro intro--${variant}${children ? '' : ' intro--single'}`}>
      <Weave accent className="intro__weave" />
      <div className="wrap intro__in">
        <div className="intro__text">
          <p className="eyebrow" data-hero>
            {label}
          </p>
          <h1 className="h1 intro__title" id="page-title">
            {title.split('\n').map((line, i) => (
              <span className="line-mask" key={`${i}-${line}`}>
                <span className={`intro__line intro__line--${i + 1}`} data-hero-line>
                  {line}
                </span>
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
      <p className="intro__edition mono" aria-hidden="true">PYTHON CAMEROON · {SITE.year}</p>
    </section>
  );
}

/**
 * Wraps a page so that its stylesheet styles that page only. Next keeps a page's global CSS in the
 * document after a client-side navigation, so every page stylesheet (home.css, pages.css, agenda.css…)
 * prefixes its rules with `:where([data-page~='name'])`: no added specificity, no effect on other pages.
 * The wrapper itself is `display: contents` (globals.css), so it never changes the layout.
 */
export function PageScope({ name, children }: { name: string; children: ReactNode }) {
  return <div data-page={name}>{children}</div>;
}
