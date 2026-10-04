'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { EASE_OUT } from './Reveal';
import {
  IconMail,
  IconGithub,
  IconScholar,
  IconOrcid,
  IconOpenReview,
  IconSun,
  IconMoon,
} from './icons';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const PROFILE_LINKS = [
  { href: 'mailto:zyz5004@163.com', label: 'Email', Icon: IconMail },
  { href: 'https://github.com/mengqi132', label: 'GitHub', Icon: IconGithub },
  {
    href: 'https://scholar.google.com/citations?user=7_odtWkAAAAJ&hl=zh-TW',
    label: 'Google Scholar',
    Icon: IconScholar,
  },
  { href: 'https://orcid.org/0009-0006-5084-6671', label: 'ORCID', Icon: IconOrcid },
  {
    href: 'https://openreview.net/profile?id=%7EYizhou_Zhang7',
    label: 'OpenReview',
    Icon: IconOpenReview,
  },
];

function ThemeButton() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const reduce = useReducedMotion();
  return (
    <button className="control-btn" onClick={toggle} aria-label={t.themeToggle}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduce ? false : { rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          style={{ display: 'inline-flex' }}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function LangButton() {
  const { lang, setLang, t } = useLang();
  return (
    <button
      className="control-btn"
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      aria-label="Switch language / 切换语言"
    >
      <span className="lang-seg" aria-hidden>
        <span className={lang === 'en' ? 'seg-active' : ''}>EN</span>
        <span className="seg-sep">/</span>
        <span className={lang === 'zh' ? 'seg-active' : ''}>中</span>
      </span>
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {t.langToggle}
      </span>
    </button>
  );
}

function Avatar({ small = false }: { small?: boolean }) {
  const { t } = useLang();
  return (
    <div className="avatar-frame">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/avatar.jpg`}
        alt={small ? '' : `${t.name} avatar`}
        width={small ? 42 : 92}
        height={small ? 42 : 92}
      />
    </div>
  );
}

function useNav() {
  const { t } = useLang();
  return [
    { href: '#about', label: t.nav.about },
    { href: '#publications', label: t.nav.publications },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ];
}

/** Desktop sticky sidebar — first column of the .site grid. */
export default function Sidebar() {
  const { t } = useLang();
  const nav = useNav();

  return (
    <aside className="sidebar">
        <div className="sidebar-top">
          <Avatar />
          <h1 className="sidebar-name serif">
            {t.name}
            <span className="zh-name">{t.zhName}</span>
          </h1>
          <p className="sidebar-role">
            {t.role1}
            <span className="accent-dot">·</span>
            {t.role2}
          </p>
          <nav className="nav" aria-label="Sections">
            <ul className="nav-list">
              {nav.map((n) => (
                <li key={n.href}>
                  <a className="nav-link" href={n.href}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="socials">
            {PROFILE_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                className="social-link"
                href={href}
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
          <div className="controls">
            <ThemeButton />
            <LangButton />
          </div>
        </div>
    </aside>
  );
}

/** Mobile top bar + horizontal section nav, rendered above the grid. */
export function MobileChrome() {
  const { t } = useLang();
  const nav = useNav();
  return (
    <>
      <header className="mobilebar">
        <Avatar small />
        <div className="mobilebar-name">
          {t.name} <span className="zh-name">{t.zhName}</span>
        </div>
        <div className="mobilebar-controls">
          <ThemeButton />
          <LangButton />
        </div>
      </header>
      <nav className="mobilenav" aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} className="nav-link" href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
    </>
  );
}

/** Social links row shown on mobile above the footer. */
export function MobileSocials() {
  return (
    <div className="socials-mobile">
      {PROFILE_LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          className="social-link"
          href={href}
          aria-label={label}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
