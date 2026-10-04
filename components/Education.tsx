'use client';

import { useLang } from '@/lib/i18n';
import Reveal from './Reveal';

export default function Education() {
  const { t } = useLang();
  return (
    <section id="education" aria-label={t.eduTitle}>
      <Reveal>
        <div className="section-kicker">
          <h2 className="section-title">{t.eduTitle}</h2>
        </div>
      </Reveal>
      <ol className="timeline">
        {t.edu.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08}>
            <li className="timeline-item">
              <div className="timeline-period">{e.period}</div>
              <div>
                <h3 className="timeline-school">
                  <a href={e.url} target="_blank" rel="noreferrer">
                    {e.school}
                  </a>
                </h3>
                <p className="timeline-detail">{e.detail}</p>
                <span className="timeline-tag">{e.tag}</span>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
