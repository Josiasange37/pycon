import type { Metadata } from 'next';
import BackToTop from '../../components/about/BackToTop';
import Footer from '../../components/sections/Footer';
import { PageHeader } from '../../components/site/PageHeader';
import VenuePage from '../../components/venuepage/VenuePage';

export const metadata: Metadata = { title: 'Venue · PyCon Cameroon' };

export default function Venue() {
  return (
    <main className="page">
      <PageHeader current="/venue" lead="The" accent="Venue" sub="Join us in Yaoundé, the political capital of Cameroon." />
      <VenuePage />
      <Footer />
      <BackToTop />
    </main>
  );
}
