import { ContentBlock, NurseDocument, PageSheet } from '../types';
import { PAGING_CONFIG, calculateBlockWeight } from '../constants/weights';

const cache = new Map<string, PageSheet[]>();

const blank = (): PageSheet => ({ blocks: [], weight: 0 });

export const paging = {
  paginate(doc: NurseDocument): PageSheet[] {
    if (cache.has(doc.id)) return cache.get(doc.id)!;

    const pages: PageSheet[] = [];
    let cur = blank();

    doc.sections.forEach((sec) => {
      // Cover sections go on their own standalone page
      if (sec.isCover) {
        if (cur.weight > 0) {
          pages.push(cur);
          cur = blank();
        }
        cur.blocks.push({
          kind: 'section-header',
          num: sec.num,
          heading: sec.heading,
          id: sec.id,
          isCover: true,
        });
        sec.blocks.forEach((block) => {
          cur.blocks.push({ kind: 'block', block });
          cur.weight += calculateBlockWeight(block);
        });
        pages.push(cur);
        cur = blank();
        return;
      }

      const firstW = sec.blocks[0] ? calculateBlockWeight(sec.blocks[0]) : 0;
      const need = PAGING_CONFIG.SEC_HDR_WEIGHT + firstW;

      if (cur.weight > 0 && cur.weight + need > PAGING_CONFIG.PAGE_CAPACITY) {
        pages.push(cur);
        cur = blank();
      }

      cur.blocks.push({
        kind: 'section-header',
        num: sec.num,
        heading: sec.heading,
        id: sec.id,
        isCover: false,
      });
      cur.weight += PAGING_CONFIG.SEC_HDR_WEIGHT;

      sec.blocks.forEach((block) => {
        const w = calculateBlockWeight(block);
        if (cur.weight + w > PAGING_CONFIG.PAGE_CAPACITY && cur.blocks.length > 1) {
          pages.push(cur);
          cur = blank();
        }
        cur.blocks.push({ kind: 'block', block });
        cur.weight += w;
      });
    });

    if (cur.blocks.length) pages.push(cur);
    if (!pages.length) pages.push(blank());

    // Insert title block on page 1 ONLY if document does NOT have a cover
    const hasCover = doc.sections.some((s) => s.isCover);
    if (!hasCover) {
      if (pages[0].weight + PAGING_CONFIG.TITLE_WEIGHT > PAGING_CONFIG.PAGE_CAPACITY && pages[0].blocks.length > 0) {
        pages.unshift({ blocks: [{ kind: 'title' }], weight: PAGING_CONFIG.TITLE_WEIGHT });
      } else {
        pages[0].blocks.unshift({ kind: 'title' });
        pages[0].weight += PAGING_CONFIG.TITLE_WEIGHT;
      }
    }

    cache.set(doc.id, pages);
    return pages;
  },

  invalidate(docId: string) {
    cache.delete(docId);
  },

  invalidateAll() {
    cache.clear();
  },
};
