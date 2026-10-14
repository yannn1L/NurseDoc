/* ============================================================
   SEARCH — index + query (ranked)
   EOMR: E (index dibangun sekali) + O (rank: heading > body)
============================================================ */
let index = []; // { docId, sectionId, docTitle, type, heading, text }

export const search = {
    build(documents) {
        index = [];
        documents.forEach((doc) => {
            doc.sections.forEach((sec) => {
                const text = extractText(sec.blocks);
                index.push({
                    docId: doc.id,
                    sectionId: sec.id,
                    docTitle: doc.title,
                    type: doc.type,
                    ruangan: doc.ruangan || '',
                    heading: sec.heading,
                    text,
                });
            });
        });
    },
    
    query(q) {
        q = (q || '').trim().toLowerCase();
        if (!q) return [];
        const hits = [];
        for (const row of index) {
            const inH = row.heading.toLowerCase().includes(q);
            const inT = row.text.toLowerCase().includes(q);
            const inD = row.docTitle.toLowerCase().includes(q);
            const inR = (row.ruangan || '').toLowerCase().includes(q);
            if (!inH && !inT && !inD && !inR) continue;
            const score = (inH ? 3 : 0) + (inD ? 2 : 0) + (inR ? 2 : 0) + (inT ? 1 : 0);
            hits.push({ ...row, score, preview: snippet(row.text, q) });
        }
        return hits.sort((a, b) => b.score - a.score).slice(0, 12);
    },
};

function extractText(blocks = []) {
    return blocks.map((b) => {
        if (b.text) return b.text;
        if (b.items) return b.items.map((i) => i.text || i).join(' ');
        if (b.rows) return b.rows.flat().join(' ');
        if (b.detail) return b.detail;
        if (b.s) return [b.s, b.o, b.a, b.p].join(' ');
        return '';
    }).join(' ');
}

function snippet(text, q) {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 120) + '…';
    const start = Math.max(0, i - 40);
    return (start > 0 ? '…' : '') + text.slice(start, start + 140) + '…';
}