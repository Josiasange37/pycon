'use client';

import { motion } from 'motion/react';
import { createElement, memo } from 'react';
import { ART, svgProps } from './art';

/*
 * The banner's five snakes, drawn from its vectors. Each one emerges from the rock
 * head-first: a feathered mask slides along its body while it glides forward.
 */

// which end the head is at, and when (after the snakes cue) it emerges
const HEADS: Record<number, { head: 'left' | 'right'; at: number; wavy?: boolean }> = {
  4: { head: 'right', at: 0 },
  1: { head: 'left', at: 0.12 },
  0: { head: 'right', at: 0.3, wavy: true },
  14: { head: 'right', at: 0.42, wavy: true },
  16: { head: 'right', at: 0.6, wavy: true },
};

export const Snakes = memo(function Snakes({ play, reduced, start }: { play: boolean; reduced: boolean; start: number }) {
  return (
    <svg className="snakes" viewBox="0 0 1920 1080" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="feather-r">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.23" stopColor="#fff" />
        </linearGradient>
        <linearGradient id="feather-l">
          <stop offset="0.77" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ART.snakes.map((s) => {
        const { head, at, wavy } = HEADS[s.index];
        const [x, y, w, h] = s.box;
        const span = w * 1.3;
        const hidden = head === 'right' ? x + w : x - span;
        const shown = head === 'right' ? x - w * 0.3 : x;
        const delay = start + at;
        const travel = head === 'right' ? -30 : 30;
        return (
          <g key={s.index}>
            <mask id={`snake-${s.index}`} maskUnits="userSpaceOnUse" x={x - span} y={y - 20} width={w + span * 2} height={h + 40}>
              <motion.rect
                y={y - 20}
                width={span}
                height={h + 40}
                fill={`url(#feather-${head === 'right' ? 'r' : 'l'})`}
                initial={{ x: reduced ? shown : hidden }}
                animate={play ? { x: shown } : undefined}
                transition={{ delay, duration: 1.5, ease: [0.33, 0, 0.2, 1] }}
              />
            </mask>
            <motion.g
              mask={`url(#snake-${s.index})`}
              opacity={s.opacity}
              initial={reduced ? false : { x: travel }}
              animate={play ? { x: [travel, 0, -travel * 0.06, 0] } : undefined}
              transition={{ delay, duration: 2.4, times: [0, 0.6, 0.8, 1], ease: 'easeOut' }}
            >
              <motion.g
                animate={play && wavy ? { x: [0, 4, 0, -3, 0] } : undefined}
                transition={{ delay: delay + 2.6, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {s.parts.map((p, i) => createElement(p.tag, { key: i, ...svgProps(p.attrs) }))}
              </motion.g>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
});
