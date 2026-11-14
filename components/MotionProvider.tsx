'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * One place for motion. Smooth scrolling (Lenis) drives ScrollTrigger; elements opt in with
 * attributes. Everything is visible without JavaScript, and nothing moves for visitors who
 * ask for reduced motion.
 *   data-hero / data-hero-line   the opening of a page, played once on load
 *   data-reveal                  rises in when scrolled into view
 *   data-stagger                 its direct children rise in one after another
 *   data-parallax                its <img> drifts slightly against the scroll
 */
export default function MotionProvider() {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ duration: 1.1, anchors: { offset: -80 } });
    lenis.current = l;
    l.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis.current?.scrollTo(0, { immediate: true });
    document.documentElement.classList.add('motion-ready');

    const ctx = gsap.context(() => {
      const ease = 'expo.out';
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
      const hero = gsap.utils.toArray<HTMLElement>('[data-hero]');
      const tl = gsap.timeline({ defaults: { ease } });
      if (lines.length) tl.fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.05);
      if (hero.length) tl.fromTo(hero, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 0.25);

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 32,
          duration: 1,
          ease,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => {
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const img = el.querySelector('img');
        if (!img) return;
        gsap.set(img, { scale: 1.12 });
        gsap.fromTo(
          img,
          { yPercent: -5 },
          { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    });

    // fonts and images can shift the page after load; measure again once they settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
