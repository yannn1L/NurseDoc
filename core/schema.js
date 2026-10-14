/* ============================================================
   SCHEMA — validasi dokumen sebelum masuk store
   EOMR: R (robust) — dokumen cacat tidak crash UI
============================================================ */
const REQUIRED_DOC = ['id', 'type', 'title', 'sections'];
const REQUIRED_SEC = ['id', 'num', 'heading', 'blocks'];

export const schema = {
    validateDocument(doc) {
        const errors = [];
        if (!doc || typeof doc !== 'object') return { ok: false, errors: ['dokumen bukan objek'] };
        
        REQUIRED_DOC.forEach(f => {
            if (doc[f] == null) errors.push(`field "${f}" wajib`);
        });
        if (!Array.isArray(doc.sections) || !doc.sections.length)
            errors.push('sections harus array tidak kosong');
        
        doc.sections?.forEach((sec, i) => {
            REQUIRED_SEC.forEach(f => {
                if (sec[f] == null) errors.push(`sections[${i}].${f} wajib`);
            });
            if (Array.isArray(sec.blocks)) {
                sec.blocks.forEach((b, j) => {
                    if (!b.type) errors.push(`sections[${i}].blocks[${j}].type wajib`);
                });
            }
        });
        
        return { ok: errors.length === 0, errors };
    },
};