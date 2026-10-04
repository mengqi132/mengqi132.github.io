'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLang } from '@/lib/i18n';
import {
  parseBibtex,
  toPublication,
  formatCitation,
  Publication,
} from '@/lib/bibtex';
import Reveal, { EASE_OUT } from './Reveal';
import {
  IconSearch,
  IconExternal,
  IconCopy,
  IconCheck,
  IconQuote,
} from './icons';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
const ME = 'yizhou zhang';

type Filter = 'all' | Publication['type'];

function usePublications() {
  const [pubs, setPubs] = useState<Publication[]>([]);
  useEffect(() => {
    fetch(`${BASE}/publications.bib`)
      .then((r) => r.text())
      .then((text) => {
        const list = parseBibtex(text).map(toPublication);
        // year desc, stable within the same year (bib file order wins)
        list.sort((a, b) => Number(b.year) - Number(a.year));
        setPubs(list);
      })
      .catch(() => setPubs([]));
  }, []);
  return pubs;
}

/** Authors with the owner highlighted. */
function AuthorList({ authors }: { authors: string[] }) {
  return (
    <p className="pub-authors">
      {authors.map((a, i) => (
        <span key={i}>
          <span className={a.toLowerCase() === ME ? 'me' : undefined}>{a}</span>
          {i < authors.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  );
}

/** Reserved figure slot: shows the image when present, otherwise a
    quiet dashed placeholder marking where it should go. */
function PubFigure({ figure, hint }: { figure: string; hint: string }) {
  const [broken, setBroken] = useState(false);
  const hasImage = figure !== '' && !broken;
  return (
    <div className="pub-figure">
      <div className={`pub-figure-box${hasImage ? ' has-image' : ''}`}>
        {hasImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`${BASE}/${figure}`}
            alt=""
            loading="lazy"
            onError={() => setBroken(true)}
          />
        ) : (
          <p className="pub-figure-hint">
            {hint}
            <br />
            <span className="hint-path">/public/{figure || 'figures/…'}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function BibDrawer({ pub, onClose }: { pub: Publication; onClose: () => void }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const copyBib = async () => {
    try {
      await navigator.clipboard.writeText(pub.raw);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = pub.raw;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      className="bib-drawer"
      initial={reduce ? false : { height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={reduce ? undefined : { height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      <div className="bib-box" style={{ marginTop: 18 }}>
        <button
          className={`bib-copy${copied ? ' copied' : ''}`}
          onClick={copyBib}
          aria-live="polite"
        >
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? t.copied : t.copy}
        </button>
        <pre tabIndex={0}>{pub.raw}</pre>
      </div>
    </motion.div>
  );
}

function PubEntry({
  pub,
  open,
  onToggleBib,
}: {
  pub: Publication;
  open: boolean;
  onToggleBib: () => void;
}) {
  const { t } = useLang();
  const [cited, setCited] = useState(false);

  const status =
    /accept/i.test(pub.note) ? t.statusAccepted
    : /publish/i.test(pub.note) ? t.statusPublished
    : pub.note;

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(formatCitation(pub));
      setCited(true);
      setTimeout(() => setCited(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Reveal>
      <article className="pub-entry">
        <div className="pub-main">
          <div className="pub-venue-line">
            {status && <span className="pub-badge">{status}</span>}
            <span>
              {pub.venue}
              {pub.venue && pub.year ? ' · ' : ''}
              {pub.year}
            </span>
          </div>
          <h3>
            {pub.url ? (
              <a
                className="pub-title-link"
                href={pub.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="pub-title">{pub.title}</span>
              </a>
            ) : (
              <span className="pub-title">{pub.title}</span>
            )}
          </h3>
          <AuthorList authors={pub.authors} />
          <div className="pub-actions">
            {pub.url && (
              <a className="pub-link" href={pub.url} target="_blank" rel="noreferrer">
                <IconExternal /> {t.linkLabels.page}
              </a>
            )}
            {pub.pdf && (
              <a className="pub-link" href={pub.pdf} target="_blank" rel="noreferrer">
                <IconExternal /> {t.linkLabels.pdf}
              </a>
            )}
            {pub.doi && (
              <a
                className="pub-link"
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noreferrer"
              >
                <IconExternal /> {t.linkLabels.doi}
              </a>
            )}
            {pub.code && (
              <a className="pub-link" href={pub.code} target="_blank" rel="noreferrer">
                <IconExternal /> {t.linkLabels.code}
              </a>
            )}
            <button
              className="pub-link"
              onClick={onToggleBib}
              aria-expanded={open}
            >
              <IconCopy /> {t.bibtex}
            </button>
            <button className="pub-link" onClick={copyCitation} aria-live="polite">
              {cited ? <IconCheck /> : <IconQuote />}
              {cited ? t.copied : 'Cite'}
            </button>
          </div>
        </div>
        <PubFigure figure={pub.figure} hint={t.figureHint} />
        <AnimatePresence>
          {open && <BibDrawer pub={pub} onClose={onToggleBib} />}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

export default function Publications() {
  const { t } = useLang();
  const pubs = usePublications();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [openKey, setOpenKey] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pubs.filter((p) => {
      if (filter !== 'all' && p.type !== filter) return false;
      if (!q) return true;
      const hay = [p.title, p.venue, p.year, ...p.authors].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [pubs, query, filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.pubFilters.all },
    { key: 'journal', label: t.pubFilters.journal },
    { key: 'conference', label: t.pubFilters.conference },
    { key: 'workshop', label: t.pubFilters.workshop },
  ];

  return (
    <section id="publications" aria-label={t.pubTitle}>
      <Reveal>
        <div className="section-kicker">
          <h2 className="section-title">{t.pubTitle}</h2>
          <span className="section-count">{pubs.length}</span>
        </div>
        <div className="pub-toolbar">
          <label className="pub-search">
            <IconSearch />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.pubSearch}
              aria-label={t.pubSearch}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <div className="pub-filters" role="group" aria-label="Filter by type">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {visible.length === 0 ? (
        <p className="pub-empty">{t.pubEmpty}</p>
      ) : (
        visible.map((pub) => (
          <PubEntry
            key={pub.key}
            pub={pub}
            open={openKey === pub.key}
            onToggleBib={() => setOpenKey(openKey === pub.key ? null : pub.key)}
          />
        ))
      )}
    </section>
  );
}
