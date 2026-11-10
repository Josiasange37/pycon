'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/*
 * The opening: a fire in the dark where the logo will be. Two strikes throw sparks, the
 * fire catches and builds, then it flares up — its light floods the wall — and dies down
 * where the logo is about to be drawn.
 *
 * The flames are a small WebGL shader (rising, turbulent noise shaped into tongues of fire
 * over a bed of embers), so they read as real fire rather than drawn shapes. Without WebGL,
 * a CSS flame stands in.
 */

export const TORCH = { strikes: [0.05, 0.2], catch: 0.3, raise: 0.8, raiseFor: 0.9 };

const SPARKS = Array.from({ length: 9 }, (_, i) => {
  const a = -Math.PI / 2 + ((i / 8) * 2 - 1) * 1.25;
  const d = 26 + ((i * 37) % 23);
  return { x: Math.cos(a) * d, y: Math.sin(a) * d };
});

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
// phones often run mediump, where a sin() hash turns to frozen blocks: ask for highp,
// and hash without sin() so the noise stays smooth even where highp is missing
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float t;      // seconds
uniform float grow;   // 0 = unlit, 1 = full fire, >1 = flaring
uniform vec2 res;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = vec2((uv.x - 0.5) * res.x / res.y, uv.y);
  float g = max(grow, 0.001);
  float y0 = 0.07;
  float h = (p.y - y0) / (0.82 * g);

  // rising turbulence, stretched upward the way real flames are
  vec2 q = vec2(p.x * 5.5, p.y * 2.2 - t * 3.2);
  float w = fbm(q * 0.8 + vec2(0.0, -t * 0.4));
  float n = fbm(q + vec2(w * 1.6, 0.0));
  // a faster, finer layer that splits the top into separate licking tongues
  float n2 = fbm(vec2(p.x * 9.0 + w * 2.0, p.y * 3.6 - t * 4.4));

  // a cone of fire, eaten into tongues by the noise, harder the higher it goes
  float sway = (w - 0.5) * 0.36 * h + (n2 - 0.5) * 0.1 * h;
  float wide = 0.23 * min(g, 1.3);
  // narrower where it rises out of the coals, widest just above them, tapering to tongues
  float profile = pow(max(1.0 - h, 0.0), 0.5) * (0.62 + 0.38 * smoothstep(-0.05, 0.22, h));
  float d = abs(p.x + sway) / (wide * profile + 0.004);
  float shape = clamp(1.0 - d * d, 0.0, 1.0) * clamp(1.0 - h * 0.85, 0.0, 1.0) * smoothstep(-0.04, 0.1, h);

  // two smaller tongues lean out of the sides, each on its own rhythm, so it reads as a fire
  // of several flames rather than one shape
  for (int k = 0; k < 2; k++) {
    float side = k == 0 ? -1.0 : 1.0;
    float hs = (p.y - y0) / (0.5 * g * (0.85 + 0.15 * sin(t * (5.0 + side) + side)));
    float xs = p.x - side * 0.075 * min(g, 1.2) + (w - 0.5) * 0.3 * hs - side * 0.04 * hs;
    float ps = pow(max(1.0 - hs, 0.0), 0.6);
    float ds = abs(xs) / (wide * 0.5 * ps + 0.004);
    shape = max(shape, 0.8 * clamp(1.0 - ds * ds, 0.0, 1.0) * clamp(1.0 - hs, 0.0, 1.0) * smoothstep(-0.04, 0.08, hs));
  }

  float f = shape * 1.2 - n * (0.42 + 1.0 * h) - (n2 - 0.45) * 0.55 * h;
  // a crisper edge: flames have a boundary, not a haze
  f = smoothstep(0.02, 0.62, f);

  // the bed of embers: a soft oval that glows and dims in patches, never a hard bar
  float bed = exp(-pow((p.y - y0) * 16.0, 2.0) - pow(p.x * 6.5, 2.0));
  float flicker = 0.55 + 0.45 * noise(vec2(p.x * 16.0 + t * 0.7, p.y * 16.0 - t * 1.3));
  float coal = bed * flicker * min(g, 1.0);
  f = max(f, coal * 0.75);

  // black-body colour: red at the edges, orange, then a small yellow-white core
  vec3 c = min(vec3(f * 1.55, pow(f, 2.3) * 1.12, pow(f, 6.0) * 0.85), 1.0);
  float a = clamp(f * 1.8, 0.0, 1.0);
  gl_FragColor = vec4(c * a, a);
}`;

/** Runs the fire shader; returns false when WebGL is not available. */
function useFireShader(canvas: React.RefObject<HTMLCanvasElement | null>, play: boolean) {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const el = canvas.current;
    if (!el || !play) return;
    const gl = el.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      setOk(false);
      return;
    }
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setOk(false);
      return;
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, 't');
    const uGrow = gl.getUniformLocation(prog, 'grow');
    const uRes = gl.getUniformLocation(prog, 'res');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = Math.round(el.clientWidth * dpr);
    el.height = Math.round(el.clientHeight * dpr);
    gl.viewport(0, 0, el.width, el.height);
    gl.uniform2f(uRes, el.width, el.height);

    const start = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
    let raf = 0;
    const frame = (now: number) => {
      const s = (now - start) / 1000;
      // catches small, builds to a full fire, then flares as its light spreads
      const grow = 0.25 * ease((s - TORCH.catch) / 0.15) + 0.75 * ease((s - TORCH.catch - 0.1) / 0.7) + 0.45 * ease((s - TORCH.raise) / 0.6);
      gl.uniform1f(uT, s % 60);
      gl.uniform1f(uGrow, grow);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [canvas, play]);
  return ok;
}

export function Torch({ at, play }: { at: { x: number; y: number }; play: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const webgl = useFireShader(canvas, play);

  return (
    <div
      className="fire"
      data-lit={play}
      style={{ left: at.x, top: at.y, '--catch': `${TORCH.catch}s`, '--flare': `${TORCH.raise}s`, '--flare-for': `${TORCH.raiseFor}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* the warm light it throws on the rock around it */}
      <div className="fire__glow" />

      {/* strikes: sparks in the dark before it catches */}
      {TORCH.strikes.map((t, s) =>
        SPARKS.map((p, i) => (
          <motion.span
            key={`${s}-${i}`}
            className="fire__spark"
            initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
            animate={play ? { opacity: [0, 1, 0], x: p.x * (s ? 1.2 : 0.8), y: [0, p.y * (s ? 1.2 : 0.8), p.y + 18], scale: 0.3 } : undefined}
            transition={{ delay: t + i * 0.01, duration: 0.55, ease: 'easeOut' }}
          />
        )),
      )}

      <div className="fire__body">
        {webgl ? <canvas ref={canvas} className="fire__flames" /> : <div className="fire__fallback" />}
      </div>
    </div>
  );
}
