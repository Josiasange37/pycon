'use client';

import { createElement, memo, type CSSProperties } from 'react';
import { ART as art, type Glyph, type Part, svgProps as props } from './art';

/*
 * The cave wall, drawn from the Figma banner's own vectors (art.json, 1920×1080).
 * Each strip in the banner is split into its marks, and every mark has its own gesture:
 * outlines are traced, ochre hands are pressed onto the rock, the ox walks in, the
 * dancers keep dancing. The light spreads from the logo, so marks wake nearest-first.
 *
 * The gestures are CSS animations (splash.css, the .k-* classes), each element carrying
 * only its start time in --d. Driving ~800 pieces from JavaScript froze the main thread
 * for over a second right as the story began.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_DRAW = [0.65, 0, 0.35, 1] as const;

type Kind =
  | 'trace' | 'ochre' | 'spiral' | 'ladder' | 'dots' | 'chevrons' | 'trail' | 'sun' | 'diamond' | 'figure'
  | 'walkLeft' | 'walkRight' | 'giraffe' | 'dancers' | 'dust';

// the banner repeats four strip templates; their marks always come in this order (left to right)
const STRIP_A: Kind[] = ['trace', 'trace', 'trail', 'sun', 'diamond', 'figure'];
const STRIP_B: Kind[] = ['ochre', 'spiral', 'ladder', 'ochre', 'dots', 'chevrons'];
const STRIP_C: Kind[] = ['walkLeft', 'giraffe', 'dancers'];
const FRIEZE: Kind[] = ['walkLeft', 'dust', 'dust', 'walkRight'];
const TEMPLATE: Record<number, Kind[]> = {
  2: STRIP_C, 13: STRIP_C, 15: STRIP_C,
  17: FRIEZE, 18: FRIEZE, 26: FRIEZE,
  12: STRIP_B, 19: STRIP_B, 20: STRIP_B, 22: STRIP_B, 23: STRIP_B, 25: STRIP_B, 29: STRIP_B,
};
const kindOf = (group: number, i: number): Kind => (TEMPLATE[group] ?? STRIP_A)[i] ?? 'trace';

const CENTRE = [art.logo.x + art.logo.w / 2, art.logo.y + art.logo.h / 2];

/** Marks wake in order of their distance from the logo, with a little irregularity. */
export function wakeTime([x, y, w, h]: number[], start: number, i: number) {
  const dist = Math.hypot(x + w / 2 - CENTRE[0], (y + h / 2 - CENTRE[1]) * 1.4);
  return start + (dist / 1100) * 1.0 + (((i * 37) % 11) / 11) * 0.18;
}

const at = (d: number, loop?: number): CSSProperties => ({ '--d': `${d.toFixed(2)}s`, ...(loop !== undefined && { '--loop': `${loop.toFixed(2)}s` }) }) as CSSProperties;
const isStroke = (p: Part) => !!p.attrs.stroke && !p.attrs.fill && !p.attrs['stroke-dasharray'];

/** Every leaf of a mark, each with its own entrance class and start time. */
function Parts({ parts, d, step, cls }: { parts: Part[]; d: number; step: number; cls: (p: Part) => string }) {
  return (
    <>
      {parts.map((p, i) => {
        const c = cls(p);
        return createElement(p.tag, {
          key: i,
          ...props(p.attrs),
          ...(c === 'k-draw' && { pathLength: 1 }),
          className: c,
          style: at(d + i * step),
        });
      })}
    </>
  );
}

const Static = ({ parts }: { parts: Part[] }) => <>{parts.map((p, i) => createElement(p.tag, { key: i, ...props(p.attrs) }))}</>;
const drawOrFade = (p: Part) => (isStroke(p) ? 'k-draw' : 'k-fade');

function Mark({ glyph, kind, d }: { glyph: Glyph; kind: Kind; d: number }) {
  const { parts } = glyph;
  const traced = (step: number) => <Parts parts={parts} d={d} step={step} cls={drawOrFade} />;

  switch (kind) {
    case 'trace':
    case 'diamond':
    case 'ladder':
      return traced(kind === 'ladder' ? 0.18 : 0.12);

    case 'figure':
      // drawn, then it shifts its weight now and then
      return <g className="k-sway" style={at(d, d + 1.4)}>{traced(0.1)}</g>;

    case 'sun':
      return <g className="k-burst" style={at(d)}>{traced(0.1)}</g>;

    case 'spiral':
      // scratched in from the centre while it turns
      return <g className="k-spiral" style={at(d)}>{traced(0.08)}</g>;

    case 'chevrons':
      return (
        <g className="k-pulse" style={at(d, d + 1.4)}>
          <Parts parts={parts} d={d} step={0.12} cls={() => 'k-drop'} />
        </g>
      );

    case 'dots':
      return <Parts parts={parts} d={d} step={0.07} cls={() => 'k-pop'} />;

    case 'trail':
      // footsteps, left to right
      return <Parts parts={[...parts].sort((a, b) => (a.box?.[0] ?? 0) - (b.box?.[0] ?? 0))} d={d} step={0.09} cls={() => 'k-pop'} />;

    case 'ochre':
      // pressed onto the rock: it lands, and the paint spreads out in a ring
      return (
        <g>
          <ellipse
            className="k-ring"
            style={at(d + 0.14)}
            cx={glyph.box[0] + glyph.box[2] / 2}
            cy={glyph.box[1] + glyph.box[3] / 2}
            rx={glyph.box[2] * 0.6}
            ry={glyph.box[3] * 0.55}
            fill="none"
            stroke="#c8653f"
            strokeWidth={2}
          />
          <g className="k-stamp" style={at(d)}>
            <Static parts={parts} />
          </g>
        </g>
      );

    case 'walkLeft':
    case 'walkRight':
      // it walks into its place on the wall, nodding with each step
      return (
        <g className={kind === 'walkLeft' ? 'k-walk-l' : 'k-walk-r'} style={at(d)}>
          <g className="k-bob" style={at(d)}>
            <Static parts={parts} />
          </g>
        </g>
      );

    case 'giraffe':
      // stands up from grazing
      return (
        <g className="k-stand" style={at(d)}>
          <Static parts={parts} />
        </g>
      );

    case 'dancers':
      return (
        <g className="k-rise" style={at(d)}>
          <g className="k-hop" style={at(d, d + 0.9)}>
            <Static parts={parts} />
          </g>
        </g>
      );

    case 'dust':
      return (
        <g className="k-fade-slow" style={at(d + 0.8)}>
          <Static parts={parts} />
        </g>
      );
  }
}

/**
 * ~760 elements that never re-render after mounting: the story starts them through
 * the splash root's data-wall attribute (see splash.css), not through a prop.
 */
export const Wall = memo(function Wall({ start }: { start: number }) {
  let n = 0;
  return (
    <svg className="wall" viewBox="0 0 1920 1080" fill="none" aria-hidden="true">
      {art.wall.map((group) => (
        <g key={group.index} opacity={group.opacity}>
          {group.glyphs.map((glyph, i) => (
            <Mark key={i} glyph={glyph} kind={kindOf(group.index, i)} d={wakeTime(glyph.box, start, n++)} />
          ))}
        </g>
      ))}
    </svg>
  );
});
