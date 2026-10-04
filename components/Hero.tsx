'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { EASE_OUT } from './Reveal';

/** Hero: headline lines rise one by one from behind a mask,
    then the bio and the fact rows settle into place. */
export default function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();

  const lines = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
  };
  const line = {
    hidden: { y: reduce ? 0 : '112%' },
    show: { y: 0, transition: { duration: 0.95, ease: EASE_OUT } },
  };
  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: d, ease: EASE_OUT },
    }),
  };

  return (
    <section id="about" className="hero" aria-label={t.nav.about}>
      {/* key={lang} replays the entrance when the language switches */}
      <motion.div key={lang} variants={lines} initial="hidden" animate="show">
        <div className="hero-lines">
          {t.heroLines.map((l, i) => (
            <span className="hero-line" key={i}>
              <motion.span variants={line}>{l}</motion.span>
            </span>
          ))}
        </div>
        <motion.p className="hero-bio" variants={fade} custom={0.65}>
          {t.heroBio}
        </motion.p>
        <motion.dl className="facts" variants={fade} custom={0.85}>
          {t.facts.map((f) => (
            <div className="fact-row" key={f.label}>
              <dt className="fact-label">{f.label}</dt>
              <dd className="fact-value">
                {f.link && f.linkText ? (
                  <>
                    {f.value.split(f.linkText)[0]}
                    <a href={f.link} target="_blank" rel="noreferrer">
                      {f.linkText}
                    </a>
                    {f.value.split(f.linkText)[1] ?? ''}
                  </>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
