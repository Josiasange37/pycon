import type { Metadata } from 'next';
import BackToTop from '../../components/about/BackToTop';
import Agenda from '../../components/agenda/Agenda';
import Footer from '../../components/sections/Footer';
import { PageHeader } from '../../components/site/PageHeader';

export const metadata: Metadata = {
  title: 'Agenda · PyCon Cameroon',
  description: 'The PyCon Cameroon 2026 programme: three days of Python, Ubuntu and open source in Yaoundé, September 17th to 19th.',
};

export default function AgendaPage() {
  return (
    <>
      <main className="page" id="top">
        <PageHeader
          current="/agenda"
          lead="Conference"
          accent="Agenda"
          sub="Three days of Python, Ubuntu and open source. September 17th to 19th, 2026."
        />
        <Agenda />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
