/* ============================================================
   REGISTRY — dispatch blok (validate / weight / render)
   EOMR: M + R — 1 titik ekstensi, fallback aman
============================================================ */
const pool = { web: {}, doc: {} };

export const registry = {
    install({ web = {}, doc = {} }) {
        pool.web = { ...web };
        pool.doc = { ...doc };
    },
    has(type) { return type in pool.web; },
    validate(type, block) {
        const def = pool.web[type];
        if (!def) return false;
        return typeof def.validate === 'function' ? def.validate(block) : true;
    },
    weight(block) {
        const def = pool.web[block?.type];
        return def?.weight?.(block) ?? 40;
    },
    renderWeb(block) {
        const def = pool.web[block?.type];
        if (!def) return fallback(block);
        try { return def.render(block); }
        catch (e) { console.error('[registry:web]', block.type, e); return fallback(block); }
    },
    renderDoc(block) {
        const def = pool.doc[block?.type];
        if (!def) return fallback(block);
        try { return def.render(block); }
        catch (e) { console.error('[registry:doc]', block.type, e); return fallback(block); }
    },
};

const fallback = (b) => `<div class="empty-state">[blok tidak dikenal: ${b?.type ?? '?'}]</div>`;