import AboutHero from '../../components/AboutHero';
import AboutSections from '../../components/AboutSections';
import { pageMetadata } from '../../lib/seo';
import { PageScope } from '../../components/ui';
import '../pages.css';

export const metadata = pageMetadata({
  title: 'About',
  description: 'Learn about PyCon Cameroon 2027 in Douala, meet the Python Cameroon community and organizers, and read the conference values and code of conduct.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <PageScope name="inner">
      <AboutHero />
      <AboutSections />
    </PageScope>
  );
}
