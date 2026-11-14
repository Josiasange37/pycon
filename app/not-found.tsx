import Link from 'next/link';
import Mark, { Arrow } from '../components/Mark';

export default function NotFound() {
  return (
    <section className="section wrap" style={{ display: 'grid', gap: 28, justifyItems: 'start', minHeight: '60vh', alignContent: 'center' }}>
      <Mark size={120} />
      <p className="eyebrow">404 · page not found</p>
      <h1 className="h1">Lost in Douala traffic</h1>
      <p className="lede">This page does not exist, or not yet. The rest of the site is one taxi ride away.</p>
      <Link className="btn btn--taxi" href="/">
        Back to the home page <Arrow />
      </Link>
    </section>
  );
}
