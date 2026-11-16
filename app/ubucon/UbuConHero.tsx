'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { Arrow } from '../../components/Mark';

gsap.registerPlugin(useGSAP);

export default function UbuConHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      const timeline = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.06 });

      timeline
        .from(q('.ub-hero__statue'), { yPercent: 5, autoAlpha: 0, duration: 1.4 }, 0)
        .from(q('.ub-hero__title-line'), { yPercent: 110, autoAlpha: 0, duration: 0.95, stagger: 0.12 }, 0.12)
        .from(q('.ub-hero__lede, .ub-hero__actions'), { y: 18, autoAlpha: 0, duration: 0.72, stagger: 0.09 }, 0.48)
        .from(q('.ub-hero__seal'), { scale: 0.82, rotate: -8, autoAlpha: 0, duration: 0.95, ease: 'back.out(1.15)' }, 0.34)
        .from(q('.ub-hero__date-stamp'), { y: -14, rotate: 6, autoAlpha: 0, duration: 0.65 }, 0.72);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="ub-hero" aria-labelledby="ubu-title">
      <div className="ub-hero__frame">
        <div className="ub-hero__copy">
          <h1 id="ubu-title" className="ub-hero__title">
            <span className="ub-hero__title-mask"><span className="ub-hero__title-line">UbuCon</span></span>
            <span className="ub-hero__title-mask ub-hero__title-mask--second"><span className="ub-hero__title-line">Cameroon<span className="ub-hero__period">.</span></span></span>
          </h1>
          <p className="ub-hero__lede">
            A celebration of Ubuntu and open source, co-organized with PyCon Cameroon.
          </p>
          <div className="ub-hero__actions">
            <a className="ub-hero__primary" href="#ubu-schedule">Explore the day <Arrow /></a>
            <a className="ub-hero__secondary" href="#ubu-about-title">What is UbuCon? <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="ub-hero__stage" aria-hidden="true">
          <Image
            className="ub-hero__statue"
            src="/hero/statue-woven.webp"
            alt=""
            width={632}
            height={1514}
            priority
            sizes="(min-width: 900px) 42vw, 62vw"
          />
          <div className="ub-hero__seal">
            <span className="ub-hero__seal-frame">
              <Image src="/partners/ubucon-cameroon.webp" alt="UbuCon Cameroon Ubuntu and Cameroon emblem" width={200} height={201} priority />
            </span>
          </div>
          <span className="ub-hero__date-stamp ubu-mono">18 SEPTEMBER · YAOUNDÉ</span>
        </div>
      </div>
    </section>
  );
}
