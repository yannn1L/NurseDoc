import { ContentBlock, NurseDocument, SearchHit } from '../types';

interface IndexRow {
  docId: string;
  sectionId: string;
  docTitle: string;
  type: NurseDocument['type'];
  ruangan: string;
  heading: string;
  text: string;
}

function extractText(blocks: ContentBlock[] = []): string {
  return blocks
    .map((b) => {
      const parts: string[] = [];
      if ('judul' in b && b.judul) parts.push(b.judul);
      if ('heading' in b && b.heading) parts.push(b.heading);
      if ('text' in b && typeof b.text === 'string') parts.push(b.text);
      if ('title' in b && typeof b.title === 'string') parts.push(b.title);
      if ('fields' in b && Array.isArray(b.fields)) {
        parts.push(b.fields.map((f) => `${f.label} ${f.value}`).join(' '));
      }
      if ('steps' in b && Array.isArray(b.steps)) {
        parts.push(
          b.steps
            .map((s) => (typeof s === 'string' ? s : `${(s as any).step || ''} ${s.text || ''}`))
            .join(' ')
        );
      }
      if ('items' in b && Array.isArray(b.items)) {
        parts.push(
          b.items
            .map((i) => {
              if (typeof i === 'string') return i;
              if (typeof i === 'object' && i !== null) {
                return `${(i as any).label || ''} ${(i as any).content || ''} ${(i as any).rationale || ''} ${(i as any).step || ''} ${(i as any).text || ''}`;
              }
              return '';
            })
            .join(' ')
        );
      }
      if ('rows' in b && Array.isArray(b.rows)) parts.push(b.rows.flat().join(' '));
      if ('detail' in b && b.detail) parts.push(`${b.title || ''} ${b.detail}`);
      if ('s' in b) parts.push([b.s, b.o, b.a, b.p].join(' '));
      return parts.join(' ');
    })
    .join(' ');
}

function snippet(text: string, q: string): string {
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text.slice(0, 120) + (text.length > 120 ? '…' : '');
  const start = Math.max(0, i - 40);
  return (start > 0 ? '…' : '') + text.slice(start, start + 140) + '…';
}

class SearchEngine {
  private index: IndexRow[] = [];

  build(documents: NurseDocument[]): void {
    this.index = [];
    documents.forEach((doc) => {
      doc.sections.forEach((sec) => {
        const text = extractText(sec.blocks);
        this.index.push({
          docId: doc.id,
          sectionId: sec.id,
          docTitle: doc.title,
          type: doc.type,
          ruangan: doc.ruangan || '',
          heading: sec.heading || (sec.isCover ? 'Cover' : ''),
          text,
        });
      });
    });
  }

  query(q: string): SearchHit[] {
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    const hits: SearchHit[] = [];

    for (const row of this.index) {
      const inH = row.heading.toLowerCase().includes(q);
      const inT = row.text.toLowerCase().includes(q);
      const inD = row.docTitle.toLowerCase().includes(q);
      const inR = (row.ruangan || '').toLowerCase().includes(q);

      if (!inH && !inT && !inD && !inR) continue;

      const score = (inH ? 3 : 0) + (inD ? 2 : 0) + (inR ? 2 : 0) + (inT ? 1 : 0);
      hits.push({ ...row, score, preview: snippet(row.text, q) });
    }

    return hits.sort((a, b) => b.score - a.score).slice(0, 12);
  }
}

export const searchEngine = new SearchEngine();
