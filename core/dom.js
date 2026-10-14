/* ============================================================
   DOM — helper query, escape, mount, icons
============================================================ */
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const region = (name) => document.querySelector(`[data-region="${name}"]`);

export function mount(name, html) {
    const el = region(name);
    if (!el) { console.warn(`[dom] region "${name}" not found`); return null; }
    el.innerHTML = html;
    return el;
}

export function safeRender(name, fn) {
    try { return fn(); }
    catch (err) {
        console.error(`[render:${name}]`, err);
        mount(name, `<div class="empty-state">⚠️ Gagal memuat bagian ini.<br><span class="text-[10px]">${esc(err.message)}</span></div>`);
    }
}

export const icons = () => window.lucide?.createIcons?.();

export const delegate = (root, event, selector, handler) => {
    root.addEventListener(event, (e) => {
        const target = e.target.closest(selector);
        if (target && root.contains(target)) handler(e, target);
    });
};