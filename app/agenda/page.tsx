import type { Metadata } from 'next';
import ProgrammeSchedule from '../../components/ProgrammeSchedule';
import { EDITION_2026 } from '../../content/edition2026';
import './agenda.css';

export const metadata: Metadata = {
  title: 'Programme',
  description: `PyCon Cameroon 2026 programme in ${EDITION_2026.city}, ${EDITION_2026.dates}.`,
};

export default function ProgrammePage() {
  return (
    <>
      <section className="program-hero f-river" aria-labelledby="programme-title">
        <svg className="program-hero__weave" viewBox="0 0 1000 640" fill="none" aria-hidden="true">
          <path className="program-hero__thread program-hero__thread--sun" d="M-18 158C115 36 230 35 340 143s159 128 262 76 184-173 327-98" />
          <path className="program-hero__thread program-hero__thread--cream" d="M-18 314c126 123 250 129 362 14s180-118 278-21 177 118 307 7" />
          <path className="program-hero__thread program-hero__thread--mist" d="M-18 488c122-119 240-128 355-19s184 123 286 20 178-120 306-5" />
          <circle className="program-hero__knot program-hero__knot--sun" cx="322" cy="126" r="7" />
          <circle className="program-hero__knot program-hero__knot--cream" cx="350" cy="303" r="7" />
          <circle className="program-hero__knot program-hero__knot--mist" cx="329" cy="469" r="7" />
        </svg>
        <div className="wrap program-hero__in">
          <div className="program-hero__copy">
            <h1 className="program-hero__title" id="programme-title">
              Conference <span className="program-hero__title-accent">Agenda</span>
            </h1>
            <p className="program-hero__when">
              {EDITION_2026.dates} <span aria-hidden="true">·</span> {EDITION_2026.city}
            </p>
          </div>
        </div>
      </section>

      <section id="agenda" className="program-agenda f-paper" aria-label="Programme by day">
        <div className="wrap">
          <ProgrammeSchedule />
        </div>
      </section>
    </>
  );
}
