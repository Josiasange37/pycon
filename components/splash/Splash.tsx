'use client';

import { motion, MotionConfig, useMotionValue, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Noise from '../reactbits/Noise';
import { ART, H, placeImage, W } from './art';
import { ChalkLogo } from './ChalkLogo';
import { Snakes } from './snakes';
import { Torch, TORCH } from './Torch';
import { EASE_OUT, Wall } from './wall';
import './splash.css';

/*
 * The story, in seconds:
 *   0.0  darkness — an unlit torch, held where the logo will be; two strikes throw sparks
 *   0.5  the flame catches, warming only the rock beside it
 *   1.3  the torch is raised up and out of frame, and its light spreads over the whole wall
 *   0.8  the marks wake, nearest the light first (each with its own gesture)
 *   1.1  a stick of chalk draws the logo; 1.85 the fabric soaks in
 *   1.7  the snakes slither out of the rock toward it
 *   2.2  hands rise from below, reaching for it — the community arrives
 *   3.5  everything settles into a living, breathing wall
 *   4.6  it lets go on its own: the camera pushes into the logo and the dark takes over
 */
export const T = { light: TORCH.catch, wall: 0.8, chalk: 1.1, fill: 1.85, snakes: 1.7, hands: 2.2, settle: 3.5, leave: 4.6 };

type Frame = { x: number; y: number; w: number; h: number };
const box = (f: Frame) => ({ left: `${(f.x / W) * 100}%`, top: `${(f.y / H) * 100}%`, width: `${(f.w / W) * 100}%`, height: `${(f.h / H) * 100}%` });
const src = (image: string) => `/splash/art/${image}.webp`;

// the hands rise from the middle outward, like a crowd catching the moment
const HANDS = ART.hands.map((h) => ({ ...h, order: 0 }));
[...HANDS].sort((a, b) => Math.abs(a.x + a.w / 2 - W / 2) - Math.abs(b.x + b.w / 2 - W / 2)).forEach((h, i) => (h.order = i));

const IMAGES = ['/splash/art/wall.jpg', src(ART.logo.image)];
const LATER = ART.hands.map((h) => src(h.image));

/** Phones held upright get the wall continued above the scene. */
function usePortrait() {
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 4 / 5)');
    const update = () => setPortrait(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return portrait;
}

function useAssetsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const loads = IMAGES.map(
      (src) =>
        new Promise<void>((done) => {
          const img = new Image();
          img.onload = img.onerror = () => done();
          img.src = src;
        }),
    );
    LATER.forEach((s) => (new Image().src = s));
    const fallback = new Promise((r) => setTimeout(r, 1200));
    Promise.race([Promise.all(loads), fallback]).then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}

export default function Splash({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const ready = useAssetsReady();
  const portrait = usePortrait();
  const play = ready && !reduced;
  const [settled, setSettled] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  // The torchlight is one pre-drawn pool of light, held on the logo. Its growth and the
  // fading darkness are CSS animations (splash.css), so they keep time with the flame even
  // when the main thread is busy; only its position is set here.
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);

  useEffect(() => {
    if (!play) return;
    const s = setTimeout(() => setSettled(true), T.settle * 1000);
    // once raised out of frame the torch is removed, so its flame stops burning CPU
    const g = setTimeout(() => setTorchGone(true), (TORCH.raise + TORCH.raiseFor + 0.2) * 1000);
    return () => {
      clearTimeout(s);
      clearTimeout(g);
    };
  }, [play]);

  useEffect(() => {
    if (reduced) setSettled(true);
  }, [reduced]);

  // nobody has to press anything: once the wall has breathed a moment, the story moves on
  useEffect(() => {
    if (!settled) return;
    const t = setTimeout(() => setExiting(true), (T.leave - T.settle) * 1000);
    return () => clearTimeout(t);
  }, [settled]);

  // the torch is lit at the logo, wherever the layout puts it
  const logoRef = useRef<HTMLDivElement>(null);
  const base = useRef({ x: 0, y: 0 });
  const [torchAt, setTorchAt] = useState<{ x: number; y: number } | null>(null);
  const [torchGone, setTorchGone] = useState(false);
  useEffect(() => {
    const measure = () => {
      const el = logoRef.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      base.current = { x: b.left + b.width / 2, y: b.top + b.height / 2 };
      setTorchAt((t) => t ?? base.current);
      lx.jump(base.current.x);
      ly.jump(base.current.y);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [lx, ly]);

  const exit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
  }, [exiting]);

  // The wall runs ~800 CSS animations; their start/end events would each wake React's
  // root listeners for nothing. Swallow them before they get there.
  useEffect(() => {
    const swallow = (e: Event) => {
      if (rootRef.current?.contains(e.target as Node)) e.stopPropagation();
    };
    const types = ['animationstart', 'animationend', 'animationiteration'];
    types.forEach((t) => window.addEventListener(t, swallow, true));
    return () => types.forEach((t) => window.removeEventListener(t, swallow, true));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.key === 'Enter' && !(e.target instanceof HTMLButtonElement))) exit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exit]);

  return (
    <MotionConfig reducedMotion="user">
      <main ref={rootRef} className="splash" data-play={play} data-wall={play || reduced} data-exiting={exiting}>
        <h1 className="sr-only">PyCon</h1>

        <div className="stage">
          <motion.div
            className="stage__inner"
            style={{ transformOrigin: '50% 46%' }}
            animate={exiting ? { scale: 1.9, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={exiting ? { duration: 1.3, ease: [0.65, 0, 0.35, 1], opacity: { duration: 1.05, delay: 0.25, ease: [0.4, 0, 1, 1] } } : { duration: 0 }}
            onAnimationComplete={() => exiting && onDone()}
          >
            <motion.div className="layer">
              <Wall start={T.wall} />
            </motion.div>
            {portrait && (
              <motion.div className="layer sky" aria-hidden="true">
                <Wall start={T.wall + 0.6} />
              </motion.div>
            )}

            <motion.div className="layer">
              <Snakes play={play} reduced={reduced} start={T.snakes} />
            </motion.div>

            <motion.div className="layer">
              <div ref={logoRef} className="logo-wrap" style={box(ART.logo)}>
                <ChalkLogo src={src(ART.logo.image)} play={play} reduced={reduced} drawAt={T.chalk} fillAt={T.fill} />
              </div>
            </motion.div>

            <motion.div className="layer hands">
              <motion.div
                className="layer"
                animate={exiting ? { y: '40%' } : { y: 0 }}
                transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              >
                {HANDS.map((h) => (
                  <Hand key={h.image} hand={h} play={play} reduced={reduced} />
                ))}
              </motion.div>
            </motion.div>

            <Embers play={play} />
          </motion.div>
        </div>

        <motion.div className="torch" style={{ x: lx, y: ly }} aria-hidden="true">
          <div className="torch__reach">
            <div className="torch__pool" />
          </div>
        </motion.div>
        <div className="darkness" aria-hidden="true" />
        {!reduced && !torchGone && torchAt && <Torch at={torchAt} play={play} />}
        <Noise opacity={0.12} fps={12} dust={0.1} contrast={0.7} blendMode="overlay" />

        <motion.button
          type="button"
          className="enter"
          onClick={exit}
          initial={{ opacity: 0, y: -8 }}
          animate={ready && !exiting && !settled ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ delay: exiting ? 0 : reduced ? 0 : 1, duration: 0.5, ease: EASE_OUT }}
          whileTap={{ scale: 0.96 }}
        >
          <span>Skip intro</span>
        </motion.button>
      </main>
    </MotionConfig>
  );
}

/** A hand rises into frame on a soft spring, swinging in toward the logo, then breathes. */
function Hand({ hand, play, reduced }: { hand: (typeof HANDS)[number]; play: boolean; reduced: boolean }) {
  const side = hand.x + hand.w / 2 < W / 2 ? -1 : 1;
  const delay = T.hands + hand.order * 0.05;
  const on = play || reduced;
  const { img } = placeImage(hand);
  // the image sits inside its frame the way the banner's pattern places it
  const imgStyle = { left: `${(img.left / hand.w) * 100}%`, top: `${(img.top / hand.h) * 100}%`, width: `${(img.width / hand.w) * 100}%` };
  return (
    <motion.div
      className="hand"
      style={{ ...box(hand), transformOrigin: '50% 100%' }}
      initial={reduced ? false : { y: '115%', rotate: side * 12 }}
      animate={on ? { y: '0%', rotate: 0 } : undefined}
      transition={{ delay, type: 'spring', stiffness: 95, damping: 15, mass: 1 }}
    >
      <motion.div
        className="hand__sway"
        style={{ transformOrigin: '50% 100%' }}
        animate={play ? { rotate: [0, side * -1.6, 0, side * 1.1, 0], y: [0, -4, 0, -2, 0] } : undefined}
        transition={{ delay: delay + 1.4, duration: 4.5 + (hand.order % 3) * 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src={src(hand.image)} alt="" draggable={false} style={imgStyle} />
      </motion.div>
    </motion.div>
  );
}

/** Sparks drifting up through the torchlight. */
function Embers({ play }: { play: boolean }) {
  return (
    <div className="embers" data-on={play} aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => {
        const r = (n: number) => ((i * 9301 + n * 49297) % 233280) / 233280;
        return (
          <span
            key={i}
            style={
              {
                left: `${30 + r(1) * 40}%`,
                top: `${30 + r(2) * 55}%`,
                '--s': `${1.5 + r(3) * 2.5}px`,
                '--dur': `${5 + r(4) * 6}s`,
                '--delay': `${T.light + 0.8 + r(5) * 4}s`,
                '--dx': `${(r(6) - 0.5) * 120}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
