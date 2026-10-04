'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { EASE_OUT } from './Reveal';

/** Hero: the headline is typed character by character (replayed when
    the language switches); the bio and fact rows fade in while typing
    is still underway. A <noscript> copy keeps the text accessible
    without JavaScript. */
export default function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const lines = t.heroLines;

  const [typed, setTyped] = useState({ line: 0, ch: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    let line = 0;
    let ch = 0;
    let timer: ReturnType<typeof setTimeout>;
    setTyped({ line: 0, ch: 0 });
    setDone(false);
    const tick = () => {
      if (line >= lines.length) {
        setDone(true);
        return;
      }
      const text = lines[line];
      if (ch <= text.length) {
        setTyped({ line, ch });
        ch += 1;
        timer = setTimeout(tick, 38 + Math.random() * 46);
      } else {
        line += 1;
        ch = 0;
        timer = setTimeout(tick, 300);
      }
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [lines, reduce]);

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: d, ease: EASE_OUT },
    }),
  };

  const cursorOn = !reduce && !done;

  return (
    <section id="about" className="hero" aria-label={t.nav.about}>
      <noscript>
        <div className="hero-lines">
          {lines.map((l, i) => (
            <span className="hero-line" key={i}>
              <span>{l}</span>
            </span>
          ))}
        </div>
      </noscript>
      {/* key={lang} replays the typing when the language switches */}
      <div key={lang}>
        <div className="hero-lines" aria-hidden={!done}>
          {lines.map((l, i) => {
            const shown =
              done || reduce
                ? l
                : i < typed.line
                  ? l
                  : i === typed.line
                    ? l.slice(0, typed.ch)
                    : '';
            const showCursor =
              !reduce && (cursorOn ? i === typed.line : i === lines.length - 1);
            return (
              <span className="hero-line" key={i}>
                <span>
                  {shown}
                  {showCursor ? <span className="type-cursor" /> : null}
                </span>
              </span>
            );
          })}
        </div>
        <motion.p className="hero-bio" variants={fade} custom={1.2} initial="hidden" animate="show">
          {t.heroBio}
        </motion.p>
        <motion.dl className="facts" variants={fade} custom={1.45} initial="hidden" animate="show">
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
      </div>
    </section>
  );
}
