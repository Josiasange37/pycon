'use client';

import { animate, motion, useMotionValue, useMotionValueEvent } from 'motion/react';
import { useEffect, useRef } from 'react';
import { EASE_DRAW, EASE_OUT } from './wall';
import { LOGO_H, LOGO_OUTLINE, LOGO_W } from './logo-path';

/*
 * The logo is drawn the way the mockup shows it was made: a stick of chalk traces the
 * outline, then the woven fabric soaks into the shape from its heart, and the hand-drawn
 * chalk gives way to the real artwork.
 */

// chalk sizes are tuned for a ~400px logo; the traced path's units may be finer
const K = LOGO_W / 400;

type Props = {
  src: string;
  play: boolean;
  reduced: boolean;
  drawAt: number;
  fillAt: number;
};

export function ChalkLogo({ src, play, reduced, drawAt, fillAt }: Props) {
  const progress = useMotionValue(reduced ? 1 : 0);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!play || reduced) return;
    const c = animate(progress, 1, { delay: drawAt, duration: 0.85, ease: EASE_DRAW });
    return () => c.stop();
  }, [play, reduced, drawAt, progress]);

  // the glowing chalk tip rides the end of the line as it is drawn
  useMotionValueEvent(progress, 'change', (p) => {
    const path = pathRef.current;
    const tip = tipRef.current;
    if (!path || !tip) return;
    const pt = path.getPointAtLength(path.getTotalLength() * p);
    tip.setAttribute('cx', String(pt.x));
    tip.setAttribute('cy', String(pt.y));
    tip.style.opacity = p > 0.002 && p < 0.998 ? '1' : '0';
  });

  const on = play || reduced;

  return (
    <div className="logo">
      <motion.img
        src={src}
        alt=""
        draggable={false}
        initial={reduced ? false : { clipPath: 'circle(0% at 50% 52%)', filter: 'brightness(1.9) saturate(0.4)' }}
        animate={on ? { clipPath: 'circle(72% at 50% 52%)', filter: 'brightness(1) saturate(1)' } : undefined}
        transition={{ delay: fillAt, duration: 0.95, ease: EASE_OUT, filter: { delay: fillAt + 0.15, duration: 1.1 } }}
      />
      <svg viewBox={`0 0 ${LOGO_W} ${LOGO_H}`} aria-hidden="true">
        <defs>
          <filter id="chalk" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency={0.7 / K} numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={6 * K} xChannelSelector="R" yChannelSelector="G" result="d" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.6 0 0 0 2.7" result="g" />
            <feComposite in="d" in2="g" operator="in" />
          </filter>
        </defs>
        <motion.g
          initial={{ opacity: reduced ? 0 : 1 }}
          animate={on ? { opacity: 0 } : undefined}
          transition={{ delay: fillAt + 0.55, duration: 0.7 }}
        >
          <motion.path
            ref={pathRef}
            d={LOGO_OUTLINE}
            transform={`translate(${LOGO_W * 0.015} ${LOGO_H * 0.015}) scale(0.97)`}
            fill="none"
            stroke="#ecebe6"
            strokeWidth={13 * K}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chalk)"
            style={{ pathLength: progress }}
          />
          <circle ref={tipRef} r={7 * K} fill="#fffaf0" opacity={0} className="logo__tip" transform={`translate(${LOGO_W * 0.015} ${LOGO_H * 0.015}) scale(0.97)`} />
        </motion.g>
      </svg>
    </div>
  );
}
