import Image from 'next/image';
import Link from 'next/link';
import { PHOTOS } from '../content/edition2026';
import { Out } from './Weave';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <section className={`${styles.hero} f-sun`} aria-labelledby="about-hero-title">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title} id="about-hero-title">
            <span className={styles.titleLead}>The people</span>
            <span className={styles.titleScript}>who grow Python</span>
            <span className={styles.titleClose}>in Cameroon.</span>
          </h1>

          <p className={styles.lede}>
            PyCon Cameroon is the volunteer-run community that grows Python across the country — and the annual conference
            that brings everyone together.
          </p>

          <div className={styles.actions}>
            <Link className={`wv-btn wv-btn--sun ${styles.primary}`} href="#team">
              Meet the team <Out />
            </Link>
            <Link className={styles.secondary} href="#mission">
              How we work <Out />
            </Link>
          </div>
        </div>

        <figure className={styles.mosaic}>
          <div className={`${styles.frame} ${styles.frameMain}`}>
            <Image
              src={PHOTOS.hands.src}
              alt={PHOTOS.hands.alt}
              fill
              priority
              sizes="(min-width: 960px) 38vw, 90vw"
            />
          </div>
          <div className={`${styles.frame} ${styles.frameNotes}`}>
            <Image
              src={PHOTOS.notes.src}
              alt={PHOTOS.notes.alt}
              fill
              sizes="(min-width: 960px) 21vw, 44vw"
            />
          </div>
          <div className={`${styles.frame} ${styles.frameLunch}`}>
            <Image
              src={PHOTOS.lunch.src}
              alt={PHOTOS.lunch.alt}
              fill
              sizes="(min-width: 960px) 21vw, 44vw"
            />
          </div>
          <figcaption className={styles.caption}>
            <span>PyCon Cameroon</span>
            <span>Yaoundé · 2026</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
