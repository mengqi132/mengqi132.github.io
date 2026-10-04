'use client';

import { useLang } from '@/lib/i18n';
import Reveal from './Reveal';
import { MobileSocials } from './Sidebar';
import { ViewCounter } from './Counters';

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" aria-label={t.contactTitle} style={{ marginBottom: 0 }}>
      <Reveal>
        <div className="section-kicker">
          <h2 className="section-title">{t.contactTitle}</h2>
        </div>
        <a className="contact-email" href="mailto:zyz5004@163.com">
          zyz5004@163.com
        </a>
        <p className="contact-note">{t.contactNote}</p>
      </Reveal>
      <MobileSocials />
      <footer className="footer">
        <span>{t.footerLeft}</span>
        <span className="footer-right">
          {t.footerRight}
          <span className="footer-sep" aria-hidden>·</span>
          <ViewCounter />
        </span>
      </footer>
    </section>
  );
}
