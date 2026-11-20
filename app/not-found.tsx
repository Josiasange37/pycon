import Link from 'next/link';
import Mark, { Arrow } from '../components/Mark';
import { Weave } from '../components/Weave';
import { PageScope } from '../components/ui';
import './not-found.css';

export default function NotFound() {
  return (
    <PageScope name="not-found">
      <section className="not-found" aria-labelledby="not-found-title">
        <div className="wrap not-found__in">
          <div className="not-found__map" aria-hidden="true">
            <Weave className="not-found__weave" accent />
            <svg className="not-found__diagram" viewBox="0 0 720 560" fill="none">
              <g className="not-found__streets">
                <path d="M12 119L166 205L238 160L338 214L465 150L700 220" />
                <path d="M16 178L148 254L222 210L324 266L440 208L697 277" />
                <path d="M22 530L166 438L248 475L342 426L461 474L690 390" />
                <path d="M74 42L155 158L123 278L205 367L171 504" />
                <path d="M222 36L288 160L254 260L324 352L288 533" />
                <path d="M526 30L462 156L493 254L424 354L458 530" />
                <path d="M680 48L595 162L630 270L554 365L604 516" />
              </g>
              <circle className="not-found__roundabout" cx="356" cy="308" r="105" />
              <circle className="not-found__roundabout-inner" cx="356" cy="308" r="78" />
              <path className="not-found__route-under" d="M22 466C113 466 148 427 214 397C274 369 285 330 330 308C371 288 411 310 394 350C379 385 332 390 312 359C279 308 319 250 373 244C433 237 469 301 514 306C576 314 607 264 678 225" />
              <path className="not-found__route" d="M22 466C113 466 148 427 214 397C274 369 285 330 330 308C371 288 411 310 394 350C379 385 332 390 312 359C279 308 319 250 373 244C433 237 469 301 514 306C576 314 607 264 678 225" />
              <path className="not-found__route-dashes" d="M22 466C113 466 148 427 214 397C274 369 285 330 330 308C371 288 411 310 394 350C379 385 332 390 312 359C279 308 319 250 373 244C433 237 469 301 514 306C576 314 607 264 678 225" />
              <text className="not-found__number" x="356" y="328" textAnchor="middle">404</text>
              <circle className="not-found__destination-halo" cx="678" cy="225" r="22" />
              <circle className="not-found__destination" cx="678" cy="225" r="8" />
              <circle className="not-found__start" cx="22" cy="466" r="8" />
            </svg>
            <Mark size={118} className="not-found__mark" />
            <span className="not-found__map-label not-found__map-label--start">START HERE</span>
            <span className="not-found__map-label not-found__map-label--end">DETOUR</span>
            <span className="not-found__stamp">DOUALA<br />ROUTE 404</span>
          </div>

          <div className="not-found__copy">
            <h1 className="not-found__title" id="not-found-title">Lost in <span>Douala traffic</span></h1>
            <p className="not-found__lede">This page does not exist, or not yet. The rest of the site is one taxi ride away.</p>
            <Link className="btn btn--taxi not-found__home" href="/">
              Back to the home page <Arrow />
            </Link>
            <div className="not-found__aside">
              <span className="not-found__aside-dot" />
              <span>Every good detour leads somewhere.</span>
            </div>
          </div>
        </div>
      </section>
    </PageScope>
  );
}
