import type { Metadata } from 'next';
import AboutHero from '../../components/AboutHero';
import AboutSections from '../../components/AboutSections';
import '../pages.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the Python Cameroon community, the people behind PyCon Cameroon, and the values that guide the conference.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSections />
    </>
  );
}
