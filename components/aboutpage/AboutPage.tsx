'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { ART } from '../splash/art';
import { Wall } from '../splash/wall';
import { Glyph } from '../sections/Expect';
import { SectionHead, useRise } from '../sections/SectionHead';
import './aboutpage.css';

/*
 * Who we are: the user group behind the conference, its mission, what it values, the
 * people who run it, the communities it works with, and the rules everyone agrees to.
 * Its pictures are cut from the same cave wall as the rest of the site.
 */

const VALUES = [
  {
    title: 'Building a welcoming community',
    body: 'We believe diversity and inclusion are essential to our community’s growth and success. Everyone is welcome here, whatever their background, experience level or identity.',
    glyph: { group: 13, index: 2 },
  },
  {
    title: 'Inspiring talks',
    body: 'From beginner tutorials to deep dives, we offer a wide range of talks for a diverse community. Learn from local and international Python experts.',
    glyph: { group: 3, index: 3 },
  },
  {
    title: 'Hands-on workshops',
    body: 'We learn by doing. Our workshops help you build real skills you can apply straight away in your projects and your career.',
    glyph: { group: 19, index: 0 },
  },
  {
    title: 'Simple and inclusive',
    body: 'We want a welcoming, inclusive environment for everyone, whatever their path or experience. No barriers, just community.',
    glyph: { group: 20, index: 1 },
  },
  {
    title: 'Innovation & creativity',
    body: 'We encourage creative problem-solving and new thinking. PyCon Cameroon is a space where ideas are born and nurtured.',
    glyph: { group: 5, index: 4 },
  },
  {
    title: 'Growing together',
    body: 'Whether you mentor others or are learning yourself, we believe in shared growth. Together, we are building the future of Python in Cameroon.',
    glyph: { group: 6, index: 5 },
  },
];

// read from the previous site's team section: confirm every spelling, and add photos and profiles
const TEAM = [
  { name: 'Steve Yonkeu', role: 'Lead, Python Cameroon', linkedin: '#' },
  { name: 'Edmond Makolle', role: 'Co-lead, mentoring & learning coordinator', linkedin: '#' },
  { name: 'Linuce Demanou', role: 'Social media lead', linkedin: '#' },
  { name: 'Ndongmo Christian', role: 'Open-source coordinator', linkedin: '#' },
  { name: 'Akumbou Evena', role: 'Project coordinator', linkedin: '#' },
  { name: 'Etti Junior', role: 'UI/UX & graphic designer', linkedin: '#' },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

/**
 * A framed piece of the cave wall: the banner's 1920×1080 artboard, cropped to one region
 * (x, y, w, h in its own units). Anything placed inside sits on top of the rock.
 */
function WallPanel({ crop, label, children }: { crop: [number, number, number, number]; label: string; children?: ReactNode }) {
  const [x, y, w, h] = crop;
  return (
    <figure className="wallpanel" style={{ aspectRatio: `${w} / ${h}` }} role="img" aria-label={label}>
      <div
        className="wallpanel__stage"
        style={{ width: `${(1920 / w) * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
        aria-hidden="true"
      >
        <Wall start={0} />
      </div>
      {children}
    </figure>
  );
}

// the logo's place in the banner, for the mission panel
const LOGO = ART.logo;
const MISSION_CROP: [number, number, number, number] = [560, 200, 800, 600];

export default function AboutPage() {
  const rise = useRise();

  return (
    <>
      {/* ——— the user group ——— */}
      <section className="sec ab-group" aria-labelledby="group-title">
        <div className="ab-split">
          <div className="ab-story">
            <motion.h2 id="group-title" className="ab-title" {...rise(0)}>
              Python Cameroon <span>User Group</span>
            </motion.h2>
            <motion.p {...rise(1)}>
              The Python Cameroon user group is a dynamic community of developers, data scientists and tech
              enthusiasts in Cameroon who share a passion for the Python programming language. We are dedicated to
              sharing knowledge, and to promoting innovation and the adoption of Python in every sector.
            </motion.p>
            <motion.p {...rise(2)}>
              The community meets regularly to talk about everything Python: web development with Django and Flask,
              scientific computing, machine learning with TensorFlow and PyTorch, data science with Pandas,
              automation, DevOps and much more.
            </motion.p>
            <motion.p {...rise(3)}>
              We run talks, coding workshops, hackathons and mentoring programmes that help members grow their
              Python skills and build practical applications that solve real problems.
            </motion.p>
            <motion.div className="ab-actions" {...rise(4)}>
              <a className="btn btn--line" href="#">
                Join our community
              </a>
            </motion.div>
          </div>

          <motion.div {...rise(2)}>
            <WallPanel crop={[1440, 520, 480, 360]} label="Dancers and antelopes from the cave wall, with raised hands below">
              <div className="wallpanel__hands" aria-hidden="true">
                {['image6', 'image7', 'image10'].map((img) => (
                  <img key={img} src={`/splash/art/${img}.webp`} alt="" loading="lazy" draggable={false} />
                ))}
              </div>
            </WallPanel>
          </motion.div>
        </div>
      </section>

      {/* ——— the mission ——— */}
      <section className="sec ab-mission" aria-labelledby="mission-title">
        <SectionHead id="mission-title" lead="Our" accent="Mission" />
        <div className="ab-split">
          <motion.div {...rise(1)}>
            <WallPanel crop={MISSION_CROP} label="The PyCon Cameroon Python logo on the cave wall">
              <img
                className="wallpanel__logo"
                src={`/splash/art/${LOGO.image}.webp`}
                alt=""
                loading="lazy"
                draggable={false}
                style={{
                  left: `${((LOGO.x - MISSION_CROP[0]) / MISSION_CROP[2]) * 100}%`,
                  top: `${((LOGO.y - MISSION_CROP[1]) / MISSION_CROP[3]) * 100}%`,
                  width: `${(LOGO.w / MISSION_CROP[2]) * 100}%`,
                }}
              />
            </WallPanel>
          </motion.div>

          <div className="ab-story">
            <motion.h3 className="ab-subtitle" {...rise(1)}>
              PyCon Cameroon
            </motion.h3>
            <motion.p {...rise(2)}>
              PyCon Cameroon is a community conference that gives the Python community in Cameroon and Central Africa
              a platform to grow. We believe diversity and inclusion are essential to our community’s growth and
              success.
            </motion.p>
            <motion.p {...rise(3)}>
              We work to create a welcoming, inclusive environment for every participant, whatever their background,
              gender, age or identity. The conference is designed to inspire, educate and connect developers at every
              level.
            </motion.p>
            <motion.p {...rise(4)}>
              Bringing together tech enthusiasts from across Africa and the world, from startups and students to
              researchers and seasoned professionals, PyCon Cameroon is a unique chance to learn, network and
              collaborate with like-minded people.
            </motion.p>
            <motion.p className="ab-invite" {...rise(5)}>
              Join us in celebrating the power of Python and its part in building the future of technology in
              Cameroon and beyond.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ——— values: a list of marks, not a grid of cards ——— */}
      <section className="sec ab-values" aria-labelledby="values-title">
        <SectionHead id="values-title" lead="Our" accent="Values" />
        <ul className="ab-values__list">
          {VALUES.map((v, i) => (
            <motion.li key={v.title} {...rise((i % 2) + 1)}>
              <span className="ab-oval" aria-hidden="true">
                <Glyph {...v.glyph} />
              </span>
              <div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ——— the team ——— */}
      <section className="sec ab-team" id="team" aria-labelledby="team-title">
        <SectionHead
          id="team-title"
          lead="Meet the"
          accent="Team"
          sub="The PyCon Cameroon team brings together people with a wide range of experience and skills. We are committed to a welcoming, inclusive environment for every participant, speaker, sponsor and volunteer."
        />
        <ul className="ab-team__list">
          {TEAM.map((m, i) => (
            <motion.li key={m.name} className="member" {...rise((i % 3) + 1)}>
              <span className="member__oval" aria-hidden="true">
                {initials(m.name)}
              </span>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
              <a href={m.linkedin} className="member__link" aria-label={`${m.name} on LinkedIn`}>
                LinkedIn
              </a>
            </motion.li>
          ))}
        </ul>
        <motion.div className="ab-join" {...rise(1)}>
          <p>Interested in joining the organising team? We’re always looking for passionate volunteers!</p>
          <a className="btn btn--line" href="#">
            Join our team
          </a>
        </motion.div>
      </section>

      {/* ——— partner communities ——— */}
      <section className="sec ab-partners" aria-labelledby="partners-title">
        <SectionHead
          id="partners-title"
          lead="Partner"
          accent="Communities"
          sub="We’re proud to work with communities across Africa and beyond."
        />
        <motion.div className="ab-partners__invite" {...rise(3)}>
          <p>Run a community and want to partner with us?</p>
          <a className="btn btn--line" href="mailto:organizers@pythoncameroon.org?subject=Community%20partnership%20with%20PyCon%20Cameroon">
            Get in touch
          </a>
        </motion.div>
      </section>

      {/* ——— code of conduct ——— */}
      <section className="sec ab-coc" id="code-of-conduct" aria-labelledby="coc-title">
        <SectionHead id="coc-title" lead="Code of" accent="Conduct" />
        <div className="ab-coc__body">
          <motion.h3 {...rise(1)}>Our commitment</motion.h3>
          <motion.p {...rise(2)}>
            PyCon Cameroon is committed to providing a harassment-free conference experience for everyone, regardless
            of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body
            size, race, ethnicity, religion (or lack thereof), or technology choices.
          </motion.p>
          <motion.p {...rise(3)}>
            We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not
            appropriate for any conference venue, including talks, workshops, parties, Twitter and other online media.
          </motion.p>
          <motion.p {...rise(4)}>
            Conference participants violating these rules may be sanctioned or expelled from the conference without a
            refund, at the discretion of the organisers.
          </motion.p>
          <motion.div className="ab-actions" {...rise(5)}>
            <a className="btn btn--line" href="#">
              Read the full code of conduct
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
