'use client';

import { useEffect, useState } from 'react';
import About from '../components/about/About';
import BackToTop from '../components/about/BackToTop';
import Hero from '../components/hero/Hero';
import Zen from '../components/interlude/Zen';
import Expect from '../components/sections/Expect';
import Footer from '../components/sections/Footer';
import Speakers from '../components/sections/Speakers';
import Sponsors from '../components/sections/Sponsors';
import Thanks from '../components/sections/Thanks';
import Tracks from '../components/sections/Tracks';
import Splash from '../components/splash/Splash';

// 'reveal': the hero is already rising beneath the line as it dissolves
type Stage = 'splash' | 'zen' | 'reveal' | 'home';

// the splash is told once; after that a visit opens on a line of the Zen
const TOLD = 'pycon:intro-seen';

function seenIntro() {
  try {
    return localStorage.getItem(TOLD) === '1';
  } catch {
    return false;
  }
}

const ZEN_SHOWN = 'pycon:zen-shown';

function zenShownThisVisit() {
  try {
    return sessionStorage.getItem(ZEN_SHOWN) === '1';
  } catch {
    return false;
  }
}

function markZenShown() {
  try {
    sessionStorage.setItem(ZEN_SHOWN, '1');
  } catch {
    // storage blocked: the line simply shows again
  }
}

function markIntroSeen() {
  try {
    localStorage.setItem(TOLD, '1');
  } catch {
    // storage blocked: the intro simply plays again next time
  }
}

export default function Home() {
  // undecided until the browser says whether this visitor has seen the intro
  const [stage, setStage] = useState<Stage | null>(null);

  useEffect(() => {
    setStage(!seenIntro() ? 'splash' : zenShownThisVisit() ? 'home' : 'zen');
  }, []);

  if (stage === null) return <div className="ground" aria-hidden="true" />;

  if (stage === 'splash')
    return (
      <Splash
        onDone={() => {
          markIntroSeen();
          setStage('zen');
        }}
      />
    );

  return (
    <>
      {stage !== 'zen' && (
        <main key="home" id="top">
          <Hero onReplay={() => setStage('splash')} />
          <About />
          <Speakers />
          <Sponsors />
          <Expect />
          <Tracks />
          <Thanks />
          <Footer />
          <BackToTop />
        </main>
      )}
      {stage !== 'home' && <Zen key="zen" onLeave={() => setStage('reveal')} onDone={() => {
            markZenShown();
            setStage('home');
          }} />}
    </>
  );
}
