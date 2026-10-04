/* Minimal, dependency-free BibTeX parser.
   Paste any standard .bib entries into public/publications.bib and
   they will be parsed automatically at runtime. */

export interface BibEntry {
  key: string;
  entryType: string; // article | inproceedings | ...
  fields: Record<string, string>;
  raw: string;
}

export interface Publication {
  key: string;
  type: 'journal' | 'conference' | 'workshop';
  title: string;
  authors: string[]; // "First Last" format
  venue: string;
  year: string;
  note: string; // Published | Accepted | ...
  url: string;
  pdf: string;
  doi: string;
  code: string;
  figure: string; // path under /public, may be empty
  raw: string;
}

/** Split a .bib file into entries and parse their fields (brace-aware). */
export function parseBibtex(source: string): BibEntry[] {
  const entries: BibEntry[] = [];
  let i = 0;
  const n = source.length;

  while (i < n) {
    const at = source.indexOf('@', i);
    if (at === -1) break;
    const headerMatch = /^@(\w+)\s*\{\s*([^,\s]+)\s*,/.exec(source.slice(at));
    if (!headerMatch) {
      i = at + 1;
      continue;
    }
    const [, entryType, key] = headerMatch;
    let j = at + headerMatch[0].length;
    const fields: Record<string, string> = {};

    while (j < n) {
      // find next field name or closing brace at depth 0
      while (j < n && /[\s,]/.test(source[j])) j++;
      if (source[j] === '}' || j >= n) {
        j++;
        break;
      }
      const nameMatch = /^([A-Za-z][A-Za-z0-9_-]*)\s*=\s*/.exec(source.slice(j));
      if (!nameMatch) {
        j++;
        continue;
      }
      const fieldName = nameMatch[1].toLowerCase();
      j += nameMatch[0].length;

      let value = '';
      if (source[j] === '{') {
        let depth = 0;
        const start = j + 1;
        j++;
        while (j < n) {
          if (source[j] === '{') depth++;
          else if (source[j] === '}') {
            if (depth === 0) break;
            depth--;
          }
          j++;
        }
        value = source.slice(start, j);
        j++; // skip closing brace
      } else if (source[j] === '"') {
        const start = ++j;
        while (j < n && source[j] !== '"') j++;
        value = source.slice(start, j);
        j++;
      } else {
        const start = j;
        while (j < n && !/[,\s}]/.test(source[j])) j++;
        value = source.slice(start, j);
      }
      fields[fieldName] = value.replace(/\s+/g, ' ').trim();
    }

    const raw = source.slice(at, j).trim();
    entries.push({ key, entryType: entryType.toLowerCase(), fields, raw });
    i = j;
  }
  return entries;
}

/** "Last, First and Last2, First2" -> ["First Last", "First2 Last2"] */
export function parseAuthors(authorField: string): string[] {
  return authorField
    .split(/\s+and\s+/i)
    .map((a) => {
      const parts = a.split(',').map((p) => p.trim());
      if (parts.length === 2) return `${parts[1]} ${parts[0]}`.replace(/[{}]/g, '');
      return a.replace(/[{}]/g, '').trim();
    })
    .filter(Boolean);
}

function inferType(entry: BibEntry): Publication['type'] {
  const explicit = entry.fields.type?.toLowerCase();
  if (explicit === 'journal' || explicit === 'conference' || explicit === 'workshop') {
    return explicit;
  }
  if (entry.entryType === 'article') return 'journal';
  const venue = (entry.fields.booktitle || '').toLowerCase();
  if (venue.includes('workshop')) return 'workshop';
  return 'conference';
}

export function toPublication(entry: BibEntry): Publication {
  const f = entry.fields;
  return {
    key: entry.key,
    type: inferType(entry),
    title: (f.title || 'Untitled').replace(/[{}]/g, ''),
    authors: parseAuthors(f.author || ''),
    venue: (f.journal || f.booktitle || '').replace(/[{}]/g, ''),
    year: f.year || '',
    note: f.note || '',
    url: f.url || '',
    pdf: f.pdf || '',
    doi: f.doi || '',
    code: f.code || '',
    figure: f.figure || '',
    raw: entry.raw,
  };
}

/** One-line formatted citation for quick copying. */
export function formatCitation(p: Publication): string {
  const authors = p.authors.join(', ');
  const venue = p.venue ? `${p.venue}.` : '';
  const tail = p.doi ? ` https://doi.org/${p.doi}` : p.url ? ` ${p.url}` : '';
  return `${authors}. ${p.title}. ${venue} ${p.year}.${tail}`.replace(/\s+/g, ' ').trim();
}
