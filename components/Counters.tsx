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

/** Heart + like count; sized to sit in a .controls row. */
export function LikeButton() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
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

  if (likes === null) return null;

  return (
    <motion.button
      type="button"
      className={`control-btn like-btn${liked ? ' liked' : ''}`}
      onClick={like}
      aria-label={t.counters.like}
      whileTap={reduce ? undefined : { scale: 0.88 }}
    >
      <IconHeart filled={liked} />
      <motion.span
        className="counter-num"
        key={likes}
        initial={reduce ? false : { scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      >
        {likes}
      </motion.span>
    </motion.button>
  );
}

/** Eye + view count; increments once per page load. */
export function ViewCounter() {
  const { t } = useLang();
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API}/hit/${NS}/pageviews`)
      .then((r) => r.json())
      .then((d) => setViews(d.value))
      .catch(() => setViews(null));
  }, []);

  if (views === null) return null;

  return (
    <span className="view-count" role="img" aria-label={t.counters.views}>
      <IconEye />
      <span className="counter-num">{views}</span>
    </span>
  );
}
