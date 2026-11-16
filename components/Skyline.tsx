'use client';

import { useLang } from '../lib/i18n';

/*
 * The hero's landscape, drawn in the design's flat sticker style (navy outline, cream halo):
 * the Reunification Monument in front of a rising African sun, a baobab, palms, the Wouri with a pirogue,
 * and a kente-style woven strip as the ground line.
 */

const NAVY = '#092942';
const CREAM = '#FFF4D6';
const SUN = '#FFD343';
const BLUE = '#3776AB';
const GREEN = '#187768';

/* the monument's tapering core: 60 wide at the base (y 262), 36 at the top (y 48) */
const BASE_Y = 262;
const TOP_Y = 48;
const L = (y: number) => 690 + ((BASE_Y - y) * 12) / (BASE_Y - TOP_Y);
const R = (y: number) => 750 - ((BASE_Y - y) * 12) / (BASE_Y - TOP_Y);

/* the two ramps that spiral up the tower: front ramp as bands rising left to right, back ramp as the opposite diagonals */
const RAMPS = Array.from({ length: 9 }, (_, i) => {
  const yl = 256 - i * 23;
  const yr = yl - 18;
  const o = 10 - i * 0.6;
  return {
    d: `M${L(yl) - o} ${yl}L${R(yr) + o} ${yr}L${R(yr) + o} ${yr - 8}L${L(yl) - o} ${yl - 8}Z`,
    fill: i % 2 ? CREAM : SUN,
  };
});
const BACK = Array.from({ length: 9 }, (_, i) => {
  const yr = 252 - i * 23;
  const yl = yr - 14;
  return `M${R(yr)} ${yr}L${L(yl)} ${yl}`;
});

function Palm({ x, h, lean = 0, s = 1 }: { x: number; h: number; lean?: number; s?: number }) {
  const top = { x: x + lean, y: 316 - h };
  const trunk = `M${x} 316Q${x + lean * 0.2} ${316 - h * 0.5} ${top.x} ${top.y}`;
  const fronds = [
    [-58, 14],
    [-40, -18],
    [0, -30],
    [40, -18],
    [58, 14],
  ].map(([dx, dy]) => {
    const ex = top.x + dx * s;
    const ey = top.y + dy * s;
    const cx = top.x + dx * 0.5 * s;
    const cy = top.y + (dy - 22) * s;
    return `M${top.x} ${top.y}Q${cx} ${cy} ${ex} ${ey}Q${cx + 4} ${cy + 12 * s} ${top.x} ${top.y}Z`;
  });
  return (
    <g className="sky__rise">
      <path d={trunk} stroke={CREAM} strokeWidth={13 * s} fill="none" strokeLinecap="round" />
      <path d={trunk} stroke={NAVY} strokeWidth={7 * s} fill="none" strokeLinecap="round" />
      {fronds.map((d) => (
        <path key={d} d={d} fill={GREEN} stroke={NAVY} strokeWidth={2.2} strokeLinejoin="round" />
      ))}
      <circle cx={top.x} cy={top.y + 4} r={5 * s} fill={SUN} stroke={NAVY} strokeWidth={2} />
    </g>
  );
}

export default function Skyline() {
  const { t } = useLang();
  return (
    <svg className="sky" viewBox="0 0 1440 380" preserveAspectRatio="xMidYMax meet" role="img" aria-label={t.hero.artAlt}>
      <defs>
        <pattern id="kente" width="64" height="28" patternUnits="userSpaceOnUse">
          <rect width="64" height="28" fill={NAVY} />
          <rect x="0" width="16" height="28" fill={SUN} />
          <rect x="16" width="16" height="28" fill={GREEN} />
          <rect x="36" y="4" width="8" height="8" fill={SUN} />
          <rect x="36" y="16" width="8" height="8" fill={SUN} />
          <rect x="48" width="16" height="28" fill={BLUE} />
          <rect x="4" y="12" width="8" height="4" fill="#CE1126" />
          <rect x="52" y="12" width="8" height="4" fill={CREAM} />
        </pattern>
      </defs>

      {/* the rising sun, ringed */}
      <g className="sky__rise">
        <circle cx="720" cy="178" r="190" fill="none" stroke={SUN} strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
        <circle cx="720" cy="178" r="160" fill={SUN} opacity="0.35" />
        <circle cx="720" cy="178" r="124" fill={SUN} stroke={CREAM} strokeWidth="6" />
      </g>

      {/* birds over the river */}
      <path
        d="M1010 96q9-9 18 0q9-9 18 0M1068 128q7-7 14 0q7-7 14 0M372 112q8-8 16 0q8-8 16 0"
        fill="none"
        stroke={NAVY}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* baobab */}
      <g className="sky__rise">
        <path d="M376 316C382 284 374 252 384 222L418 222C428 252 420 284 426 316Z" fill={NAVY} stroke={CREAM} strokeWidth="5" strokeLinejoin="round" />
        <path d="M388 224L356 188M400 222L398 180M414 224L448 190M392 210L372 200M410 208L430 198" stroke={NAVY} strokeWidth="7" strokeLinecap="round" />
        {[
          [350, 182, 26, 14],
          [398, 170, 30, 16],
          [452, 184, 26, 14],
          [372, 196, 16, 9],
          [430, 196, 16, 9],
        ].map(([cx, cy, rx, ry]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={GREEN} stroke={NAVY} strokeWidth="2.4" />
        ))}
        <path d="M394 250v40M410 246v46" stroke={CREAM} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>

      <Palm x={226} h={170} lean={-18} />
      <Palm x={286} h={120} lean={12} s={0.8} />
      <Palm x={1188} h={180} lean={20} />
      <Palm x={1262} h={118} lean={-10} s={0.75} />

      {/* the Reunification Monument: two ramps spiralling up a tapering tower, on a stepped drum */}
      <g className="sky__rise">
        <path d={`M${L(BASE_Y)} ${BASE_Y}L${L(TOP_Y)} ${TOP_Y}L${R(TOP_Y)} ${TOP_Y}L${R(BASE_Y)} ${BASE_Y}Z`} fill={BLUE} stroke={CREAM} strokeWidth="8" strokeLinejoin="round" />
        <path d={`M${L(BASE_Y)} ${BASE_Y}L${L(TOP_Y)} ${TOP_Y}L${R(TOP_Y)} ${TOP_Y}L${R(BASE_Y)} ${BASE_Y}Z`} fill={BLUE} stroke={NAVY} strokeWidth="2.6" strokeLinejoin="round" />
        {BACK.map((d) => (
          <path key={d} d={d} stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
        ))}
        {RAMPS.map((r) => (
          <path key={r.d} d={r.d} fill={r.fill} stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round" />
        ))}
        <path d="M698 48h44l-6-10h-32z" fill={SUN} stroke={NAVY} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M720 38V18" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
        <circle cx="720" cy="16" r="5" fill={SUN} stroke={NAVY} strokeWidth="2.4" />

        <rect x="636" y="262" width="168" height="30" rx="4" fill={CREAM} stroke={NAVY} strokeWidth="2.6" />
        <path d="M720 266l3.1 6.4 7 .9-5.1 4.9 1.3 7-6.3-3.4-6.3 3.4 1.3-7-5.1-4.9 7-.9z" fill={SUN} stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M660 270v16M680 270v16M760 270v16M780 270v16" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
        <rect x="602" y="292" width="236" height="12" fill={SUN} stroke={NAVY} strokeWidth="2.6" />
        <rect x="574" y="304" width="292" height="12" fill={CREAM} stroke={NAVY} strokeWidth="2.6" />
      </g>

      {/* savanna grass */}
      <path
        d="M120 316l6-16 4 16 6-12 3 12M520 316l5-14 4 14 6-10 2 10M900 316l6-16 4 16 6-12 3 12M1340 316l5-14 4 14 6-10 2 10"
        fill="none"
        stroke={GREEN}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* the Wouri, with a pirogue */}
      <rect x="0" y="316" width="1440" height="38" fill={BLUE} />
      <rect x="0" y="314" width="1440" height="4" fill={NAVY} />
      <path d="M60 336h90M260 344h60M480 334h110M860 344h70M1110 336h100M1320 344h70" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
      <g className="sky__rise">
        <path d="M934 326h112q-10 16-50 16q-46 0-62-16z" fill={NAVY} stroke={CREAM} strokeWidth="3" strokeLinejoin="round" />
        <path d="M948 330h86" stroke={SUN} strokeWidth="3" strokeLinecap="round" />
        <circle cx="990" cy="296" r="6" fill={NAVY} />
        <path d="M990 302v20M982 310l16 6" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
        <path d="M1006 300l-22 42" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* woven strip */}
      <rect x="0" y="354" width="1440" height="26" fill="url(#kente)" />
      <rect x="0" y="352" width="1440" height="3" fill={NAVY} />
    </svg>
  );
}
