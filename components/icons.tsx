/* Hand-picked inline SVG icons — no icon font, no emoji. */
import { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const stroke = (props: P) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
});

export const IconMail = (p: P) => (
  <svg {...stroke(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconSun = (p: P) => (
  <svg {...stroke(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6a8.5 8.5 0 1 0 10.6 10.6Z" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...stroke(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-4.6-4.6" />
  </svg>
);

export const IconCopy = (p: P) => (
  <svg {...stroke(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...stroke(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconExternal = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const IconQuote = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M8 6c-2.5 1-4 3-4 6v6h6v-6H7c0-2 1-3.5 3-4.5L8 6Zm10 0c-2.5 1-4 3-4 6v6h6v-6h-3c0-2 1-3.5 3-4.5L18 6Z" />
  </svg>
);

/* Brand marks (filled) */
export const IconGithub = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 2.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

export const IconScholar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 3 1 8l11 5 9-4.09V14h2V8L12 3Z" />
    <path d="M5 10.6V15c0 1.66 3.13 3 7 3s7-1.34 7-3v-4.4l-7 3.18-7-3.18Z" />
  </svg>
);

export const IconOrcid = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <g fill="var(--paper)">
      <circle cx="7.6" cy="6.9" r="1.3" />
      <rect x="6.5" y="9.4" width="2.2" height="8" />
      <path d="M11.2 9.4h3a4.05 4.05 0 0 1 0 8.1h-3V9.4Zm2.1 2v4.1h.8a2.05 2.05 0 0 0 0-4.1h-.8Z" />
    </g>
  </svg>
);

export const IconOpenReview = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M12 5.5C10 3.9 6.9 3.6 3.5 4.5v13.3c3.4-.9 6.5-.6 8.5 1 2-1.6 5.1-1.9 8.5-1V4.5c-3.4-.9-6.5-.6-8.5 1Z" />
    <path d="M12 5.5v13.3" />
  </svg>
);

export const IconHeart = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...stroke(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.3C6.4 16.9 3 13.7 3 9.9 3 7.2 5.1 5 7.8 5c1.6 0 3.2.8 4.2 2.1C13 5.8 14.6 5 16.2 5 18.9 5 21 7.2 21 9.9c0 3.8-3.4 7-9 10.4Z" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
