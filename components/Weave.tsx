/*
 * The hero's vocabulary, shared by every home section after it:
 * the designer's icon row (diamond, framed cross, step, two dots), the filled north-east arrow,
 * and the two-tone Inter Black title (a smaller first line, a larger second line in the field's tone).
 */

import type { ReactNode } from 'react';

/** The designer's icon row from the hero, in its own coordinates. `accent` fills the last dot with sun. */
export function Weave({ accent = false, className = '' }: { accent?: boolean; className?: string }) {
  return (
    <svg
      className={`wv-weave ${className}`.trim()}
      viewBox="16 123 211 30"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M36 125L54 138L36 151L18 138L36 125ZM36 131L46 138L36 145L26 138L36 131Z" />
      <path d="M88 130H104V146H88V130Z" />
      <path d="M96 133V138M96 138V143M96 138H91M96 138H101" />
      <path d="M140 143H150V133H170V143H180" />
      <path d="M209 135.5H214V140.5H209V135.5Z" />
      {accent ? (
        <path d="M220 135.5H225V140.5H220V135.5Z" className="wv-weave__dot" stroke="none" />
      ) : (
        <path d="M220 135.5H225V140.5H220V135.5Z" />
      )}
    </svg>
  );
}

/** The design's filled north-east arrow. */
export function Out({ className = 'wv-arrow' }: { className?: string }) {
  return (
    <svg className={className} width="12.5" height="12.5" viewBox="0 0 12.512 12.529" aria-hidden="true" fill="currentColor">
      <path d="M1.274 12.529L0 11.255L9.474 1.764H2.156L2.172 0H12.512V10.356H10.732L10.748 3.038L1.274 12.529Z" />
    </svg>
  );
}

/**
 * The hero's title, set for a section: line one in the field's ink and a touch smaller,
 * line two in the field's tone (sun on blue, Wouri blue on paper).
 */
export function Title({
  id,
  lead,
  main,
  as: Tag = 'h2',
  className = '',
}: {
  id: string;
  lead: ReactNode;
  main: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <Tag className={`wv-title ${className}`.trim()} id={id}>
      <span className="wv-title__line wv-title__lead">{lead}</span> <span className="wv-title__line wv-title__main">{main}</span>
    </Tag>
  );
}
