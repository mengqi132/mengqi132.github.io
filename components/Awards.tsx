'use client';

import { useLang } from '@/lib/i18n';
import Reveal from './Reveal';

export default function Awards() {
  const { t } = useLang();
  return (
    <section id="awards" aria-label={t.awardTitle}>
      <Reveal>
        <div className="section-kicker">
          <h2 className="section-title">{t.awardTitle}</h2>
          <span className="section-count">{t.awards.length}</span>
        </div>
      </Reveal>
      <ol className="timeline">
        {t.awards.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <li className="timeline-item">
              <div className="timeline-period">{a.year}</div>
              <div>
                <h3 className="timeline-school">{a.title}</h3>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
