import type { Metadata } from 'next';
import BackToTop from '../../components/about/BackToTop';
import AttendPage from '../../components/attendpage/AttendPage';
import Footer from '../../components/sections/Footer';
import { PageHeader } from '../../components/site/PageHeader';

export const metadata: Metadata = { title: 'Attend · PyCon Cameroon' };

export default function Attend() {
  return (
    <main className="page">
      <PageHeader
        current="/attend"
        lead="Attend"
        accent="PyCon"
        sub="Everything you need to know about registration, travel, and your stay in Yaoundé."
      />
      <AttendPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
