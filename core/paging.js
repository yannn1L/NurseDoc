/* ============================================================
   PAGING — engine pemenggalan halaman dokumen
   EOMR: E (cache) + R (deterministik)
============================================================ */
import { registry } from './registry.js';

const PAGE_CAPACITY = 620;
const TITLE_WEIGHT = 200;
const SEC_HDR_WEIGHT = 55;
const cache = new Map(); // docId → pages

export const paging = {
    paginate(doc) {
        if (cache.has(doc.id)) return cache.get(doc.id);
        
        const pages = [];
        let cur = blank();
        
        doc.sections.forEach((sec) => {
            const firstW = sec.blocks[0] ? registry.weight(sec.blocks[0]) : 0;
            const need = SEC_HDR_WEIGHT + firstW;
            
            if (cur.weight > 0 && cur.weight + need > PAGE_CAPACITY) {
                pages.push(cur);
                cur = blank();
            }
            
            cur.blocks.push({ kind: 'section-header', num: sec.num, heading: sec.heading, id: sec.id });
            cur.weight += SEC_HDR_WEIGHT;
            
            sec.blocks.forEach((block) => {
                const w = registry.weight(block);
                if (cur.weight + w > PAGE_CAPACITY && cur.blocks.length > 1) {
                    pages.push(cur);
                    cur = blank();
                }
                cur.blocks.push({ kind: 'block', block });
                cur.weight += w;
            });
        });
        
        if (cur.blocks.length) pages.push(cur);
        if (!pages.length) pages.push(blank());
        
        // Sisipkan title block di page 1
        if (pages[0].weight + TITLE_WEIGHT > PAGE_CAPACITY && pages[0].blocks.length > 0) {
            pages.unshift({ blocks: [{ kind: 'title' }], weight: TITLE_WEIGHT });
        } else {
            pages[0].blocks.unshift({ kind: 'title' });
            pages[0].weight += TITLE_WEIGHT;
        }
        
        cache.set(doc.id, pages);
        return pages;
    },
    invalidate(docId) { cache.delete(docId); },
    invalidateAll() { cache.clear(); },
};

const blank = () => ({ blocks: [], weight: 0 });