/**
 * The 2027 mark: a figure on one leg holding a wire globe above its head, drawn after
 * La Nouvelle Liberté by Joseph-Francis Sumégné (1996), on the Deïdo roundabout in Douala.
 * The figure takes the text colour; the globe takes --mark-globe.
 */
export default function Mark({ size = 40, title, className }: { size?: number; title?: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 64"
      width={(size * 48) / 64}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill="none" stroke="var(--mark-globe, currentColor)" strokeWidth="1.3">
        <circle cx="25" cy="8.4" r="6.05" />
        <ellipse cx="25" cy="8.4" rx="2.85" ry="6.05" />
        <path d="M18.95 8.4h12.1M19.9 5.05h10.2M19.9 11.75h10.2" />
      </g>
      <g fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 1.1V14.6" strokeWidth="1.35" fill="none" />
        <path d="M25 14.3v3.7" strokeWidth="1.9" fill="none" />
        <circle cx="22.7" cy="21.4" r="3.3" stroke="none" />
        <path
          stroke="none"
          d="M23.07 17.37L24.28 15.51L24.39 17.72ZM25.04 18.09L27.01 17.09L26.01 19.06ZM26.38 19.71L28.59 19.82L26.73 21.03ZM26.73 21.77L28.59 22.98L26.38 23.09ZM26.01 23.74L27.01 25.71L25.04 24.71ZM24.39 25.08L24.28 27.29L23.07 25.43ZM22.33 25.43L21.12 27.29L21.01 25.08ZM20.36 24.71L18.39 25.71L19.39 23.74ZM19.02 23.09L16.81 22.98L18.67 21.77ZM18.67 21.03L16.81 19.82L19.02 19.71ZM19.39 19.06L18.39 17.09L20.36 18.09ZM21.01 17.72L21.12 15.51L22.33 17.37Z"
        />
        <path d="M22.4 24.8v2.4" strokeWidth="2.6" fill="none" />
        <path d="M15.6 27.6C17.6 26.3 29.6 25.3 32.6 26.3C31.8 30.2 29.8 33.9 28.8 37.3L29.9 42.3L19.7 42.5L20.7 37.6C19 34.2 16.6 31 15.6 27.6Z" strokeWidth="1.4" />
        <path d="M31.4 27.4L35.4 16.2" strokeWidth="3.8" fill="none" />
        <path d="M35.4 16.2L26.6 17.4" strokeWidth="3.2" fill="none" />
        <path d="M16.8 28.6L10.8 34.4" strokeWidth="3.8" fill="none" />
        <path d="M10.8 34.4L18.6 39.4" strokeWidth="3.2" fill="none" />
        <path d="M22.4 42L21.5 51.6" strokeWidth="5.4" fill="none" />
        <path d="M21.5 51.6L20.8 61.4L24 62" strokeWidth="4" fill="none" />
        <path d="M27.6 42L35.8 49.8" strokeWidth="5" fill="none" />
        <path d="M35.8 49.8L27.4 55.2L25.8 57.2" strokeWidth="3.8" fill="none" />
      </g>
    </svg>
  );
}

/** The tide line: two braided channels of the Wouri, used once per page at most. */
export function Tide({ className = 'tide' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 9 C 150 3, 300 15, 450 9 S 750 3, 900 9 S 1100 14, 1200 8" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M0 16 C 180 21, 330 11, 520 16 S 820 22, 1000 15 S 1140 12, 1200 17" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Arrow({ dir = 'right' }: { dir?: 'right' | 'out' | 'down' }) {
  const d = dir === 'out' ? 'M5 11L11 5M6 5h5v5' : dir === 'down' ? 'M8 3v10M4 9l4 4 4-4' : 'M3 8h10M9 4l4 4-4 4';
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
