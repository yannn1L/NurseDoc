/* ============================================================
   PREFS — localStorage wrapper (fail-safe)
============================================================ */
const NS = 'nursefolio:';
const memory = new Map(); // fallback jika localStorage penuh/blocked

export const prefs = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(NS + key);
            if (raw == null) return memory.has(key) ? memory.get(key) : fallback;
            return JSON.parse(raw);
        } catch { return memory.get(key) ?? fallback; }
    },
    set(key, value) {
        try { localStorage.setItem(NS + key, JSON.stringify(value)); }
        catch { memory.set(key, value); }
    },
    clear() {
        try { Object.keys(localStorage).forEach(k => k.startsWith(NS) && localStorage.removeItem(k)); }
        catch { memory.clear(); }
    },
};