import type { Metadata } from 'next';
import BackToTop from '../../components/about/BackToTop';
import Footer from '../../components/sections/Footer';
import { PageHeader } from '../../components/site/PageHeader';
import SpeakersPage from '../../components/speakerspage/SpeakersPage';

export const metadata: Metadata = {
  title: 'Speakers · PyCon Cameroon',
  description: 'The keynote speakers and every confirmed speaker of PyCon Cameroon 2026 in Yaoundé.',
};

export default function Page() {
  return (
    <>
      <main className="page" id="top">
        <PageHeader
          current="/speakers"
          lead="Our"
          accent="Speakers"
          sub="One keynote to open each day of PyCon Cameroon and UbuCon 2026, and the people who filled the rest."
        />
        <SpeakersPage />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
