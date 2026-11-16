'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * English / French for the shared chrome (header, menu) and the home hero.
 * The choice is remembered on this device and mirrored on <html lang>.
 */
export type Lang = 'en' | 'fr';

export const DICT = {
  en: {
    nav: { about: 'About', programme: 'Programme', speakers: 'Speakers', sponsors: 'Sponsors', attend: 'Attend', venue: 'Venue' },
    home: 'Home',
    getUpdates: 'Get updates',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    pastEdition: 'Past edition',
    themeDark: 'Switch to dark theme',
    themeLight: 'Switch to light theme',
    language: 'Language',
    hero: {
      title: ['Come for', 'PyCon.', 'Stay for', 'Douala.'],
      tagline: 'Big ideas. Real connections. Unmistakably Cameroon. Join the Python community in a city that never does ordinary.',
      edition: '2nd edition',
      seeYou: ['On se voit', 'là-bas.'],
      keepPosted: 'Keep me posted',
      buyTickets: 'Buy tickets',
      discover: 'Discover Douala',
      in: 'in',
      sub: 'See you in 2027!',
      lede: 'Talks, hands-on workshops and the people shaping Python in Africa, in Cameroon’s port city.',
      report: 'View the 2026 report',
      agenda: 'View agenda',
      countSmall: 'The countdown is on',
      countBig: 'Pack your laptop!',
      statueAlt: 'La Nouvelle Liberté, the scrap-metal statue of a figure holding a globe above its head on the Deïdo roundabout in Douala',
      artAlt: 'The Reunification Monument rising in front of an African sun, between a baobab and palm trees, above the Wouri river with a pirogue',
    },
    band: {
      label: 'PyCon Cameroon 2027 at a glance',
      speak: 'Speak',
      cfp: 'Call for proposals',
      cfpSoon: 'opening soon',
      cfpOpen: 'open now',
      cfpClosed: 'closed',
      dates: 'Dates to be announced',
      venue: 'Venue to be announced',
      line: 'Africa’s Python conference.',
    },
    strip: {
      formats: ['Talks', 'Workshops', 'Keynotes'],
      last: (people: string, speakers: string, sessions: string, city: string) =>
        `Last edition: ${people} people, ${speakers} speakers and ${sessions} sessions in ${city}.`,
    },
  },
  fr: {
    nav: { about: 'À propos', programme: 'Programme', speakers: 'Intervenants', sponsors: 'Sponsors', attend: 'Participer', venue: 'Lieu' },
    home: 'Accueil',
    getUpdates: 'Rester informé',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    pastEdition: 'Édition précédente',
    themeDark: 'Passer au thème sombre',
    themeLight: 'Passer au thème clair',
    language: 'Langue',
    hero: {
      title: ['Viens pour', 'PyCon.', 'Reste pour', 'Douala.'],
      tagline: 'De grandes idées. De vraies rencontres. Résolument camerounais. Rejoins la communauté Python dans une ville qui ne fait jamais dans l’ordinaire.',
      edition: '2e édition',
      seeYou: ['On se voit', 'là-bas.'],
      keepPosted: 'Rester informé',
      buyTickets: 'Acheter un billet',
      discover: 'Découvrir Douala',
      in: 'à',
      sub: 'Rendez-vous en 2027 !',
      lede: 'Conférences, ateliers pratiques et celles et ceux qui font Python en Afrique, dans la ville portuaire du Cameroun.',
      report: 'Voir le bilan 2026',
      agenda: 'Voir le programme',
      countSmall: 'Le compte à rebours est lancé',
      countBig: 'Sortez vos laptops !',
      statueAlt: 'La Nouvelle Liberté, la statue en métal de récupération d’un personnage tenant un globe au-dessus de sa tête, au rond-point Deïdo à Douala',
      artAlt: 'Le monument de la Réunification devant un soleil africain, entre un baobab et des palmiers, au-dessus du Wouri et d’une pirogue',
    },
    band: {
      label: 'PyCon Cameroon 2027 en bref',
      speak: 'Intervenir',
      cfp: 'Appel à propositions',
      cfpSoon: 'bientôt ouvert',
      cfpOpen: 'ouvert',
      cfpClosed: 'clos',
      dates: 'Dates à venir',
      venue: 'Lieu à venir',
      line: 'La conférence Python de l’Afrique.',
    },
    strip: {
      formats: ['Conférences', 'Ateliers', 'Keynotes'],
      last: (people: string, speakers: string, sessions: string, city: string) =>
        `Dernière édition : ${people} participants, ${speakers} intervenants et ${sessions} sessions à ${city}.`,
    },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof DICT)['en'] | (typeof DICT)['fr'] };

const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: DICT.en });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('pycon:lang');
    } catch {
      // storage blocked: fall back to the browser language
    }
    const initial: Lang = saved === 'fr' || saved === 'en' ? saved : navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('pycon:lang', l);
    } catch {
      // the switch still works for this visit
    }
  }, []);

  return <LangContext.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** EN | FR segmented switch. */
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`lang ${className}`} role="group" aria-label={t.language}>
      {(['en', 'fr'] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className="lang__btn"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          aria-label={l === 'en' ? 'English' : 'Français'}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
