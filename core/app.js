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

/* 1. Install renderers */
registry.install({ web: webBlocks, doc: docBlocks });

/* 2. Validate */
const valid = [], rejected = [];
for (const doc of DOCUMENTS) {
  const { ok, errors } = schema.validateDocument(doc);
  if (ok) valid.push(doc);
  else { rejected.push({ id: doc?.id, errors }); console.warn('[schema] rejected:', doc?.id, errors); }
}

/* 3. Search index */
search.build(valid);

/* 4. Init store */
store.init({ docs: valid, types: TYPE_META });

/* 5. Bus → render */
bus.on('viewer:refresh',  () => { render.viewer(); icons(); });
bus.on('sidebar:refresh', () => { render.sidebar(); render.docCount(); icons(); });
bus.on('toc:refresh',     () => { render.toc(); icons(); });
bus.on('overlay:refresh', () => { render.overlay(); icons(); });
bus.on('search:query',    () => { render.overlay(); });

/* 6. Delegation */
const root = document.body;

delegate(root, 'click', '.doc-card', (e, el) => store.actions.selectDoc(el.dataset.doc));
delegate(root, 'click', '.filter-chip', (e, el) => store.actions.setFilter(el.dataset.filter));
delegate(root, 'click', '.seg-toggle button', (e, el) => store.actions.setViewMode(el.dataset.mode));

/* TOC */
delegate(root, 'click', '.toc-link', (e, el) => {
  e.preventDefault();
  document.querySelector(el.getAttribute('href'))?.scrollIntoView({ behavior:'smooth', block:'start' });
});

/* Thumbnail: klik → scroll ke halaman */
delegate(root, 'click', '.thumb', (e, el) => {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(el.dataset.target)?.scrollIntoView({ behavior:'smooth', block:'start' });
});

/* Action buttons */
delegate(root, 'click', '[data-action="print"]', () => render.printCurrent());
delegate(root, 'click', '[data-action="pdf"]',   () => render.downloadPdf());
delegate(root, 'click', '[data-action="docx"]',  () => render.downloadDocx());

/* Search overlay */
delegate(root, 'click', '[data-close-search]', () => store.actions.closeSearch());
delegate(root, 'click', '[data-goto]', (e, el) => {
  const [docId, secId] = el.dataset.goto.split('|');
  store.actions.closeSearch();
  if (docId !== store.state.activeId) store.actions.selectDoc(docId);
  setTimeout(() => {
    document.getElementById(secId)?.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 260);
});

document.getElementById('globalSearch')?.addEventListener('focus', (e) => {
  e.target.blur();
  store.actions.openSearch();
});

root.addEventListener('input', (e) => {
  if (e.target.id === 'overlaySearch') store.actions.setQuery(e.target.value);
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    store.actions.openSearch();
  }
  if (e.key === 'Escape' && store.state.search.open) store.actions.closeSearch();
});

/* Print cleanup otomatis */
window.addEventListener('afterprint', () => render._cleanupPrint());

/* Render awal */
document.addEventListener('DOMContentLoaded', () => {
  render.all();
  icons();
});

/* Debug hook */
window.__nurseDoc = { store, bus, registry, search, paging, render, valid, rejected };