'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Scroll-triggered gentle rise — used for every content block. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
