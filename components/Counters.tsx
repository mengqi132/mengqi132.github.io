'use client';

/* Like + view counters backed by the free Abacus counting API
   (https://abacus.jasoncameron.dev) — the only storage available on a
   GitHub Pages static site. Repeat clicks are allowed by design. */

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { IconHeart, IconEye } from './icons';

const API = 'https://abacus.jasoncameron.dev';
const NS = 'mengqi132-github-io';

export default function Counters() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    // every page load counts as one view
    fetch(`${API}/hit/${NS}/pageviews`)
      .then((r) => r.json())
      .then((d) => setViews(d.value))
      .catch(() => setViews(null));
    fetch(`${API}/get/${NS}/likes`)
      .then((r) => (r.ok ? r.json() : { value: 0 }))
      .then((d) => setLikes(d.value))
      .catch(() => setLikes(null));
  }, []);

  const like = () => {
    if (busy.current) return;
    busy.current = true;
    setLiked(true);
    fetch(`${API}/hit/${NS}/likes`)
      .then((r) => r.json())
      .then((d) => setLikes(d.value))
      .catch(() => {})
      .finally(() => {
        busy.current = false;
      });
  };

  if (views === null && likes === null) return null;

  return (
    <div className="counters">
      <motion.button
        type="button"
        className={`counter-btn like-btn${liked ? ' liked' : ''}`}
        onClick={like}
        aria-label={t.counters.like}
        whileTap={reduce ? undefined : { scale: 0.86 }}
      >
        <IconHeart filled={liked} />
        <motion.span
          className="counter-num"
          key={likes ?? 'x'}
          initial={reduce ? false : { scale: 1.4 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          {likes ?? '–'}
        </motion.span>
      </motion.button>
      <span className="counter-btn" role="img" aria-label={t.counters.views}>
        <IconEye />
        <span className="counter-num">{views ?? '–'}</span>
      </span>
    </div>
  );
}
