import Hero from '../components/Hero';
import HomeSections from '../components/HomeSections';
import Welcome from '../components/Welcome';
import './home.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <HomeSections />
    </>
  );
}
