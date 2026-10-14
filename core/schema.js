/* ============================================================
   SCHEMA — validasi dokumen sebelum masuk store
   EOMR: R (robust) — dokumen cacat tidak crash UI
============================================================ */
const REQUIRED_SEC = ['id', 'num', 'heading', 'blocks'];

const REQUIRED_DOC = ['id', 'type', 'title', 'sections'];

export const schema = {
    validateDocument(doc) {
        const errors = [];
        if (!doc || typeof doc !== 'object') return { ok: false, errors: ['dokumen bukan objek'] };
        
        REQUIRED_DOC.forEach(f => { if (doc[f] == null) errors.push(`field "${f}" wajib`); });
        if (!Array.isArray(doc.sections) || !doc.sections.length) errors.push('sections harus array tidak kosong');
        
        doc.sections?.forEach((sec, i) => {
            ['id', 'num', 'heading', 'blocks'].forEach(f => {
                if (sec[f] == null) errors.push(`sections[${i}].${f} wajib`);
            });
        });
        
        // Peringatan lunak untuk field baru (bukan penolak)
        if (!doc.ruangan) console.info(`[schema] "${doc.id}" belum punya ruangan`);
        if (!doc.clinicalTeacher && !doc.clinicalInstructor)
            console.info(`[schema] "${doc.id}" belum punya CT/CI`);
        
        return { ok: errors.length === 0, errors };
    },
};