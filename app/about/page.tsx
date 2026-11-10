import type { Metadata } from 'next';
import BackToTop from '../../components/about/BackToTop';
import AboutPage from '../../components/aboutpage/AboutPage';
import Footer from '../../components/sections/Footer';
import { PageHeader } from '../../components/site/PageHeader';

export const metadata: Metadata = {
  title: 'About · PyCon Cameroon',
  description: 'Who we are: the Python Cameroon user group, our mission, our values, the team and our code of conduct.',
};

export default function About() {
  return (
    <main className="page" id="top">
      <PageHeader
        current="/about"
        lead="About"
        accent="PyCon Cameroon"
        sub="Discover who we are and our mission to grow the Python community in Cameroon."
      />
      <AboutPage />
      <Footer />
      <BackToTop />
    </main>
  );
}
