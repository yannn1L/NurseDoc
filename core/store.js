/* ============================================================
   STORE — state, actions, selectors
   EOMR: M (single source of truth) + R (semua via actions)
============================================================ */
import { bus } from './bus.js';
import { prefs } from './prefs.js';

const state = {
  docs: [],
  types: {},
  activeId: null,
  filter: 'all',
  viewMode: 'web',
  search: { open:false, query:'', results:[] },
};

export const store = {
  get state() { return state; },

  init({ docs, types }) {
    state.docs = docs;
    state.types = types;
    state.activeId  = prefs.get('activeId',  docs[0]?.id ?? null);
    state.filter    = prefs.get('filter',    'all');
    state.viewMode  = prefs.get('viewMode',  'web');
  },

  actions: {
    selectDoc(id) {
      if (id === state.activeId) return;
      state.activeId = id;
      prefs.set('activeId', id);
      bus.emit('viewer:refresh');
      bus.emit('sidebar:refresh');
      bus.emit('toc:refresh');
    },
    setFilter(type) {
      state.filter = type;
      prefs.set('filter', type);
      bus.emit('sidebar:refresh');
    },
    setViewMode(mode) {
      if (mode === state.viewMode) return;
      state.viewMode = mode;
      prefs.set('viewMode', mode);
      bus.emit('viewer:refresh');
      bus.emit('toc:refresh');
    },
    openSearch() { state.search.open = true; bus.emit('overlay:refresh'); },
    closeSearch() { state.search.open = false; state.search.query = ''; state.search.results = []; bus.emit('overlay:refresh'); },
    setQuery(q) {
      state.search.query = q;
      bus.emit('search:query', q);
    },
  },

  selectors: {
    activeDoc() {
      return state.docs.find((d) => d.id === state.activeId) || state.docs[0] || null;
    },
    filteredDocs() {
      return state.filter === 'all'
        ? state.docs
        : state.docs.filter((d) => d.type === state.filter);
    },
    typeMeta(type) { return state.types[type] || { label:'?', color:'slate', icon:'file', desc:'' }; },
  },
};