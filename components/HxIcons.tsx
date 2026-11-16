import type { CSSProperties } from 'react';

/* The "Woven in Douala" hero's icon rows and arrow, shared by the home hero and the About hero.
 * The four little rows are the designer's own paths, kept in the 1440 frame coordinates. */
export type Row = { box: [number, number, number, number]; accent?: boolean; paths: string[]; dots: [string, string] };

export const ROWS: Record<'tl' | 'mr' | 'tt' | 'bl', Row> = {
  tl: {
    box: [17, 124, 209, 28],
    paths: ['M36 125L54 138L36 151L18 138L36 125ZM36 131L46 138L36 145L26 138L36 131Z', 'M88 130H104V146H88V130Z', 'M96 133V138M96 138V143M96 138H91M96 138H101', 'M140 143H150V133H170V143H180'],
    dots: ['M209 135.5H214V140.5H209V135.5Z', 'M220 135.5H225V140.5H220V135.5Z'],
  },
  mr: {
    box: [1196, 476, 209, 32],
    paths: ['M1215 477L1233 492L1215 507L1197 492L1215 477ZM1215 483.923L1225 492L1215 500.077L1205 492L1215 483.923Z', 'M1267 482.769H1283V501.231H1267V482.769Z', 'M1275 486.231V492M1275 492V497.769M1275 492H1270M1275 492H1280', 'M1319 497.769H1329V486.231H1349V497.769H1359'],
    dots: ['M1388 489.115H1393V494.885H1388V489.115Z', 'M1399 489.115H1404V494.885H1399V489.115Z'],
  },
  tt: {
    box: [998, 994, 204, 36],
    accent: true,
    paths: ['M1016.58 995L1034.16 1012L1016.58 1029L999 1012L1016.58 995ZM1016.58 1002.85L1026.35 1012L1016.58 1021.15L1006.81 1012L1016.58 1002.85Z', 'M1067.37 1001.54H1083V1022.46H1067.37V1001.54Z', 'M1075.19 1005.46V1012M1075.19 1012V1018.54M1075.19 1012H1070.3M1075.19 1012H1080.07', 'M1118.16 1018.54H1127.93V1005.46H1147.47V1018.54H1157.23'],
    dots: ['M1185.56 1008.73H1190.44V1015.27H1185.56V1008.73Z', 'M1201.19 1008.73H1196.3V1015.27H1201.19V1008.73Z'],
  },
  bl: {
    box: [25, 1134, 209, 28],
    accent: true,
    paths: ['M44 1135L62 1148L44 1161L26 1148L44 1135ZM44 1141L54 1148L44 1155L34 1148L44 1141Z', 'M96 1140H112V1156H96V1140Z', 'M104 1143V1148M104 1148V1153M104 1148H99M104 1148H109', 'M148 1153H158V1143H178V1153H188'],
    dots: ['M217 1145.5H222V1150.5H217V1145.5Z', 'M233 1145.5H228V1150.5H233V1145.5Z'],
  },
};

export function Icons({ at }: { at: keyof typeof ROWS }) {
  const { box, accent, paths, dots } = ROWS[at];
  const [x, y, w, h] = box;
  return (
    <svg
      className={`hx__icons hx__icons--${at}`}
      viewBox={`${x} ${y} ${w} ${h}`}
      style={{ '--x': x, '--y': y - 112, '--w': w } as CSSProperties}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
      <path d={dots[0]} />
      {accent ? <path d={dots[1]} className="hx__dot" stroke="none" /> : <path d={dots[1]} />}
    </svg>
  );
}

/** The design's filled north-east arrow, in the hero's coordinate system. */
export function HxOut() {
  return (
    <svg className="hx__arrow" width="12.5" height="12.5" viewBox="0 0 12.512 12.529" aria-hidden="true" fill="currentColor">
      <path d="M1.274 12.529L0 11.255L9.474 1.764H2.156L2.172 0H12.512V10.356H10.732L10.748 3.038L1.274 12.529Z" />
    </svg>
  );
}
