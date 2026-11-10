import raw from './art.json';

/*
 * The Figma banner ("Reaching together community banner.svg"), split into animatable pieces
 * by a one-off extraction: positions are in its 1920×1080 artboard, images live in public/splash/art.
 */

export type Part = { tag: string; attrs: Record<string, string | undefined>; box?: number[] };
export type Glyph = { box: number[]; parts: Part[] };
type Placed = { x: number; y: number; w: number; h: number; image: string; iw: number; ih: number; sx: number; sy: number; tx: number; ty: number };

export type Art = {
  size: [number, number];
  logo: Placed;
  hands: Placed[];
  snakes: { index: number; opacity: number; box: number[]; parts: Part[] }[];
  wall: { index: number; opacity: number; box: number[]; glyphs: Glyph[] }[];
};

export const ART = raw as unknown as Art;
export const W = 1920;
export const H = 1080;

const camel = (k: string) => k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

/** SVG attributes from the file, as React props. */
export const svgProps = (attrs: Part['attrs']) =>
  Object.fromEntries(Object.entries(attrs).filter(([, v]) => v !== undefined).map(([k, v]) => [camel(k), v]));

/** Where a pattern-filled image actually lands: its rect, and the image inside it. */
export function placeImage(p: Placed) {
  return {
    frame: { x: p.x, y: p.y, w: p.w, h: p.h },
    img: { left: p.tx * p.w, top: p.ty * p.h, width: p.iw * p.sx * p.w, height: p.ih * p.sy * p.h },
  };
}
