/* ============================================================
   APP — bootstrap + global wiring
   EOMR: titik masuk tunggal; semua wiring terlihat di sini
============================================================ */
import { bus } from './bus.js';
import { store } from './store.js';
import { schema } from './schema.js';
import { registry } from './registry.js';
import { paging } from './paging.js';
import { search } from './search.js';
import { render } from './render.js';
import { delegate, icons } from './dom.js';

import { DOCUMENTS } from '../data/documents.js';
import { TYPE_META } from '../data/types.js';
import { webBlocks } from '../data/blocks.web.js';
import { docBlocks } from '../data/blocks.doc.js';

/* ---------- 1. Install block renderers ---------- */
registry.install({ web: webBlocks, doc: docBlocks });

/* ---------- 2. Validate documents ---------- */
const valid = [];
const rejected = [];
for (const doc of DOCUMENTS) {
  const { ok, errors } = schema.validateDocument(doc);
  if (ok) valid.push(doc);
  else { rejected.push({ id: doc?.id, errors }); console.warn('[schema] rejected:', doc?.id, errors); }
}
if (rejected.length) console.info(`[app] ${rejected.length} dokumen dikarantina`);

/* ---------- 3. Build search index ---------- */
search.build(valid);

/* ---------- 4. Init store ---------- */
store.init({ docs: valid, types: TYPE_META });

/* ---------- 5. Wire bus → render ---------- */
bus.on('viewer:refresh',  () => { render.viewer(); icons(); });
bus.on('sidebar:refresh', () => { render.sidebar(); render.docCount(); icons(); });
bus.on('toc:refresh',     () => { render.toc(); icons(); });
bus.on('overlay:refresh', () => { render.overlay(); icons(); });
bus.on('search:query',    () => { render.overlay(); });
bus.on('filters:refresh', () => { render.filters(); });

/* ---------- 6. Event delegation (view-agnostic) ---------- */
const root = document.body;

delegate(root, 'click', '.doc-card', (e, el) => store.actions.selectDoc(el.dataset.doc));
delegate(root, 'click', '.filter-chip', (e, el) => store.actions.setFilter(el.dataset.filter));
delegate(root, 'click', '.seg-toggle button', (e, el) => store.actions.setViewMode(el.dataset.mode));

delegate(root, 'click', '.toc-link', (e, el) => {
  e.preventDefault();
  const target = document.querySelector(el.getAttribute('href'));
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

delegate(root, 'click', '[data-close-search]', () => store.actions.closeSearch());
delegate(root, 'click', '[data-goto]', (e, el) => {
  const [docId, secId] = el.dataset.goto.split('|');
  store.actions.closeSearch();
  if (docId !== store.state.activeId) store.actions.selectDoc(docId);
  setTimeout(() => {
    document.getElementById(secId)?.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 260);
});

/* focus search input triggers overlay */
document.getElementById('globalSearch')?.addEventListener('focus', (e) => {
  e.target.blur();
  store.actions.openSearch();
});

/* overlay input (re-attach per render via input event bubbling) */
root.addEventListener('input', (e) => {
  if (e.target.id === 'overlaySearch') store.actions.setQuery(e.target.value);
});

/* keyboard shortcuts */
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    store.actions.openSearch();
  }
  if (e.key === 'Escape' && store.state.search.open) {
    store.actions.closeSearch();
  }
});

/* ---------- 7. Initial render ---------- */
document.addEventListener('DOMContentLoaded', () => {
  render.all();
  icons();
});

/* ---------- 8. Debug hook ---------- */
window.__nursefolio = { store, bus, registry, search, paging, render, valid, rejected };
