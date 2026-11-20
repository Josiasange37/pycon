'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * English / French for the shared chrome (header, menu) and the home hero.
 * The choice is remembered on this device and mirrored on <html lang>.
 */
export type Lang = 'en' | 'fr';

export const DICT = {
  en: {
    nav: { about: 'About', programme: 'Programme', ubucon: 'UbuCon', speakers: 'Speakers', sponsors: 'Sponsors', attend: 'Attend', venue: 'Venue' },
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
      buyTickets: 'Buy tickets',
      ticketInfo: 'Ticket info',
      agenda: 'View agenda',
      statueAlt: 'La Nouvelle Liberté, the scrap-metal statue of a figure holding a globe above its head on the Deïdo roundabout in Douala',
    },
  },
  fr: {
    nav: { about: 'À propos', programme: 'Programme', ubucon: 'UbuCon', speakers: 'Intervenants', sponsors: 'Sponsors', attend: 'Participer', venue: 'Lieu' },
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
      buyTickets: 'Acheter un billet',
      ticketInfo: 'Infos billetterie',
      agenda: 'Voir le programme',
      statueAlt: 'La Nouvelle Liberté, la statue en métal de récupération d’un personnage tenant un globe au-dessus de sa tête, au rond-point Deïdo à Douala',
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
