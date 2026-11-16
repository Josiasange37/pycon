import type { Metadata } from 'next';
import Image from 'next/image';
import { Arrow } from '../../components/Mark';
import { PageIntro } from '../../components/ui';
import './akana.css';

const PROFILE_URL = 'https://cm.pycon.org/akana';
const PORTFOLIO_URL = 'https://almight.me/';
const PERSON_ID = `${PROFILE_URL}#akana-signing-josias-aaron`;
const DESCRIPTION =
  'Akana Signing Josias Aaron, known by the pseudonym and personal brand Almight, built the PyCon Cameroon 2027 website.';
const PROFILE_TITLE = 'Akana Signing Josias Aaron · Almight';

export const metadata: Metadata = {
  title: { absolute: PROFILE_TITLE },
  description: DESCRIPTION,
  keywords: ['Akana Signing Josias Aaron', 'Almight', 'Almight portfolio', 'PyCon Cameroon website creator'],
  alternates: { canonical: '/akana' },
  openGraph: {
    type: 'profile',
    username: 'Almight',
    siteName: 'PyCon Cameroon 2027',
    title: PROFILE_TITLE,
    description: DESCRIPTION,
    url: PROFILE_URL,
    images: [{ url: `${PROFILE_URL}-profile.webp`, width: 1024, height: 1024, alt: 'Portrait of AKANA SIGNING JOSIAS AARON, known as Almight' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PROFILE_TITLE,
    description: DESCRIPTION,
    images: [`${PROFILE_URL}-profile.webp`],
  },
};

const PROFILE_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${PROFILE_URL}#profile`,
  url: PROFILE_URL,
  name: PROFILE_TITLE,
  mainEntity: { '@id': PERSON_ID },
};

export default function AkanaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_LD) }} />
      <PageIntro
        variant="night"
        label="Almight · pseudonym & personal brand"
        title={'Akana Signing\nJosias Aaron'}
        lede={<p>{DESCRIPTION}</p>}
      >
        <div className="akana-profile">
          <Image
            className="akana-profile__portrait"
            src="/akana-profile.webp"
            alt="Portrait of AKANA SIGNING JOSIAS AARON, known as Almight"
            width={1024}
            height={1024}
            priority
          />
          <nav className="akana-profile__links" aria-label="Akana Signing Josias Aaron's profiles">
            <a className="akana-profile__link akana-profile__link--primary" href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
              <span>Portfolio</span><Arrow dir="out" />
            </a>
            <a className="akana-profile__link" href="https://www.linkedin.com/in/akana-signing-josias-aaron" target="_blank" rel="noreferrer">
              <span>LinkedIn</span><Arrow dir="out" />
            </a>
            <a className="akana-profile__link" href="https://github.com/Josiasange37" target="_blank" rel="noreferrer">
              <span>GitHub</span><Arrow dir="out" />
            </a>
          </nav>
        </div>
      </PageIntro>
    </>
  );
}
