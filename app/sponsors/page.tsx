import type { Metadata } from 'next';
import BackToTop from '../../components/about/BackToTop';
import Footer from '../../components/sections/Footer';
import { PageHeader } from '../../components/site/PageHeader';
import SponsorsPage from '../../components/sponsorspage/SponsorsPage';

export const metadata: Metadata = {
  title: 'Sponsors · PyCon Cameroon',
  description: 'The organisations that made PyCon Cameroon 2026 possible.',
};

export default function Page() {
  return (
    <main className="page" id="top">
      <PageHeader current="/sponsors" lead="Our" accent="Sponsors" sub="They make PyCon Cameroon 2026 possible. Thank you!" />
      <SponsorsPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
