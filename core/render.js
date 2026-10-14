/* ============================================================
   RENDER — semua renderer untuk region
   EOMR: E (partial render) + M (1 file per concern)
============================================================ */
import { store } from './store.js';
import { bus } from './bus.js';
import { registry } from './registry.js';
import { paging } from './paging.js';
import { search } from './search.js';
import { mount, safeRender, icons, esc } from './dom.js';

export const render = {
  all() {
    render.filters();
    render.sidebar();
    render.viewer();
    render.toc();
    render.overlay();
    render.docCount();
    icons();
  },

  /* ---------- SIDEBAR ---------- */
  filters() {
    safeRender('filters', () => {
      const types = store.state.types;
      const active = store.state.filter;
      const chips = [
        `<button class="filter-chip ${active==='all'?'active':''}" data-filter="all">Semua</button>`,
        ...Object.entries(types).map(([k, t]) =>
          `<button class="filter-chip ${active===k?'active':''}" data-filter="${k}">${esc(t.label)}</button>`),
      ].join('');
      mount('filters', chips);
    });
  },

  sidebar() {
    safeRender('sidebar', () => {
      const list = store.selectors.filteredDocs();
      if (!list.length) { mount('sidebar', `<div class="empty-state">Tidak ada dokumen.</div>`); return; }

      const html = list.map((doc) => {
        const t = store.selectors.typeMeta(doc.type);
        const isActive = doc.id === store.state.activeId;
        return `
          <button class="doc-card ${isActive?'active':''}" data-doc="${esc(doc.id)}">
            <div class="flex items-start gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-${t.color}-50 border border-${t.color}-100 grid place-items-center shrink-0">
                <i data-lucide="${t.icon}" class="w-3.5 h-3.5 text-${t.color}-600"></i>
              </div>
              <div class="min-w-0 flex-1">
                <span class="text-[9.5px] font-bold uppercase tracking-wider text-${t.color}-700 bg-${t.color}-50 px-1.5 py-0.5 rounded">${esc(t.label)}</span>
                <div class="text-[12.5px] font-semibold text-slate-800 leading-snug line-clamp-2 mt-1">${esc(doc.title)}</div>
                <div class="text-[10.5px] text-slate-500 mt-1 flex items-center gap-1.5">
                  <i data-lucide="calendar" class="w-3 h-3"></i><span>${esc(doc.date)}</span>
                </div>
              </div>
            </div>
          </button>`;
      }).join('');
      mount('sidebar', html);
    });
  },

  docCount() {
    const el = document.getElementById('docCount');
    if (el) el.textContent = `${store.selectors.filteredDocs().length} dokumen`;
  },

  /* ---------- VIEWER ---------- */
  viewer() {
    safeRender('viewer', () => {
      const doc = store.selectors.activeDoc();
      if (!doc) { mount('viewer', `<div class="empty-state">Belum ada dokumen dipilih.</div>`); return; }
      const toggle = render._viewToggle();
      const body = store.state.viewMode === 'web' ? render._webView(doc) : render._docView(doc);
      mount('viewer', toggle + body);
    });
  },

  _viewToggle() {
    const m = store.state.viewMode;
    return `
      <div class="bg-white border border-slate-200 rounded-2xl shadow-sm px-5 py-3 mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2 text-[12px] text-slate-500">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i><span>Mode tampilan:</span>
        </div>
        <div class="seg-toggle">
          <button data-mode="web" class="${m==='web'?'active':''}">
            <i data-lucide="layout-dashboard" class="w-3.5 h-3.5"></i>Web View
          </button>
          <button data-mode="document" class="${m==='document'?'active':''}">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i>Dokumen
          </button>
        </div>
      </div>`;
  },

  _webView(doc) {
    const t = store.selectors.typeMeta(doc.type);
    const blocks = doc.sections.map((sec) => `
      <section id="${esc(sec.id)}" class="scroll-mt-24">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center text-[13px] font-bold shadow-md shadow-brand-500/25 shrink-0">${esc(sec.num)}</div>
          <div class="flex-1 min-w-0">
            <h2 class="text-[19px] font-bold text-slate-900 tracking-tight leading-tight">${esc(sec.heading)}</h2>
            <div class="flex flex-wrap gap-1.5 mt-2">
              ${(sec.keywords||[]).map(k=>`<span class="text-[10px] text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full">#${esc(k)}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="space-y-3 pl-13">
          ${sec.blocks.map((b) => registry.renderWeb(b)).join('')}
        </div>
      </section>`).join('');

    return `
      <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden fade-in">
        <div class="px-8 pt-8 pb-6 border-b border-slate-100">
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-${t.color}-700 bg-${t.color}-50 border border-${t.color}-100 px-2.5 py-1 rounded-full">
              <i data-lucide="${t.icon}" class="w-3 h-3"></i>${esc(t.label)}
            </span>
            <span class="text-[11px] text-slate-400">· ${esc(t.desc)}</span>
          </div>
          <h1 class="text-[26px] leading-tight font-bold text-slate-900 tracking-tight">${esc(doc.title)}</h1>
          <p class="text-[13px] text-slate-500 mt-2">${esc(doc.subtitle||'')}</p>

          <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-slate-600">
            <span><b class="text-slate-800 font-semibold">${esc(doc.author)}</b></span>
            <span class="flex items-center gap-1.5"><i data-lucide="user-check" class="w-3.5 h-3.5 text-slate-400"></i>${esc(doc.supervisor||'')}</span>
            <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>${esc(doc.date)}</span>
          </div>

          <div class="mt-4 flex flex-wrap gap-1.5">
            ${(doc.tags||[]).map(tag=>`<span class="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">#${esc(tag)}</span>`).join('')}
          </div>

          ${doc.summary ? `
          <div class="mt-5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center gap-2 mb-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-brand-600"></i>
              <span class="text-[11px] font-bold uppercase tracking-wider text-brand-700">Ringkasan Otomatis</span>
            </div>
            <p class="text-[13px] text-slate-700 leading-relaxed">${esc(doc.summary)}</p>
          </div>` : ''}
        </div>

        <div class="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/40">
          <div class="px-6 py-3.5 text-center">
            <div class="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">Section</div>
            <div class="text-[17px] font-bold text-slate-900 mt-0.5">${doc.sections.length}</div>
          </div>
          <div class="px-6 py-3.5 text-center">
            <div class="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">Kata</div>
            <div class="text-[17px] font-bold text-slate-900 mt-0.5">${(doc.stats?.words||0).toLocaleString('id')}</div>
          </div>
          <div class="px-6 py-3.5 text-center">
            <div class="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">Estimasi Baca</div>
            <div class="text-[17px] font-bold text-slate-900 mt-0.5">${doc.stats?.readTime||'—'}<span class="text-[12px] font-medium text-slate-500"> mnt</span></div>
          </div>
        </div>

        <div class="px-8 py-8 space-y-10 prose-nurse">${blocks}</div>
      </div>`;
  },

  _docView(doc) {
    const t = store.selectors.typeMeta(doc.type);
    const pages = paging.paginate(doc);
    const total = pages.length;

    const sheets = pages.map((page, idx) => {
      const content = page.blocks.map((item) => {
        if (item.kind === 'title') {
          return `
            <div class="doc-title">${esc(doc.title)}</div>
            <div class="doc-subtitle">${esc(doc.subtitle||'')}</div>
            <div class="doc-meta">
              <div>Disusun oleh <b>${esc(doc.author)}</b></div>
              <div>Pembimbing <b>${esc(doc.supervisor||'—')}</b></div>
              <div>${esc(doc.date)}</div>
            </div>`;
        }
        if (item.kind === 'section-header') {
          return `<h2 class="doc-h2" id="${esc(item.id)}"><span class="num">${esc(item.num)}.</span>${esc(item.heading)}</h2>`;
        }
        if (item.kind === 'block') return registry.renderDoc(item.block);
        return '';
      }).join('');

      return `
        <div class="paper-sheet">
          <div class="page-header">
            <span>${esc(t.label)} — NURSEFOLIO</span>
            <span>${esc(doc.title.length > 44 ? doc.title.slice(0,44) + '…' : doc.title)}</span>
          </div>
          <div class="doc-content">${content}</div>
          <div class="page-footer">
            <span>Dokumen digital · dirender oleh sistem</span>
            <span class="page-num">Hal. ${idx+1} dari ${total}</span>
          </div>
        </div>`;
    }).join('');

    return `<div class="paper-wrap fade-in">${sheets}</div>`;
  },

  /* ---------- TOC + META ---------- */
  toc() {
    safeRender('toc', () => {
      const doc = store.selectors.activeDoc();
      if (!doc) { mount('toc', ''); return; }
      const t = store.selectors.typeMeta(doc.type);

      const links = doc.sections.map((sec) => `
        <a href="#${esc(sec.id)}" class="toc-link group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] text-slate-600 hover:bg-slate-50 transition">
          <span class="dot w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-brand-400 transition shrink-0"></span>
          <span class="font-medium truncate">${esc(sec.heading)}</span>
        </a>`).join('');

      mount('toc', `
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <i data-lucide="list-tree" class="w-4 h-4 text-brand-600"></i>
            <h3 class="text-[13px] font-semibold text-slate-900">Daftar Isi</h3>
          </div>
          <nav class="p-2.5 space-y-0.5 max-h-[420px] overflow-y-auto">${links}</nav>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <i data-lucide="info" class="w-4 h-4 text-brand-600"></i>
            <h3 class="text-[13px] font-semibold text-slate-900">Informasi Dokumen</h3>
          </div>
          <div class="p-5 space-y-3.5 text-[12px]">
            <div class="flex justify-between gap-3"><span class="text-slate-500">Jenis</span><span class="font-semibold text-${t.color}-700">${esc(t.label)}</span></div>
            <div class="flex justify-between gap-3"><span class="text-slate-500">Disusun oleh</span><span class="font-semibold text-slate-800 text-right">${esc(doc.author)}</span></div>
            <div class="flex justify-between gap-3"><span class="text-slate-500">Pembimbing</span><span class="font-semibold text-slate-800 text-right">${esc(doc.supervisor||'—')}</span></div>
            <div class="flex justify-between gap-3"><span class="text-slate-500">Tanggal</span><span class="font-semibold text-slate-800">${esc(doc.date)}</span></div>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-3 space-y-1">
          <button class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 transition">
            <i data-lucide="printer" class="w-4 h-4 text-slate-400"></i>Cetak / PDF
          </button>
          <button class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 transition">
            <i data-lucide="share-2" class="w-4 h-4 text-slate-400"></i>Bagikan
          </button>
          <button class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 transition">
            <i data-lucide="bookmark" class="w-4 h-4 text-slate-400"></i>Simpan ke Favorit
          </button>
        </div>`);

      render._scrollSpy();
    });
  },

  _scrollSpy() {
    const links = document.querySelectorAll('.toc-link');
    const targets = document.querySelectorAll('#docViewer section, #docViewer .doc-h2');
    if (!targets.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.remove('scrollspy-active'));
        const a = document.querySelector(`.toc-link[href="#${CSS.escape(en.target.id)}"]`);
        a?.classList.add('scrollspy-active');
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    targets.forEach((t) => t.id && obs.observe(t));
  },

  /* ---------- SEARCH OVERLAY ---------- */
  overlay() {
    safeRender('overlay', () => {
      const s = store.state.search;
      if (!s.open) { mount('overlay', ''); return; }

      const results = s.query ? search.query(s.query) : [];
      const resultRows = !s.query
        ? `<div class="empty-state">Mulai ketik untuk mencari…</div>`
        : results.length === 0
          ? `<div class="empty-state">Tidak ada hasil untuk "<b>${esc(s.query)}</b>"</div>`
          : results.map((h) => {
              const t = store.selectors.typeMeta(h.type);
              return `
                <button class="search-result" data-goto="${esc(h.docId)}|${esc(h.sectionId)}">
                  <div class="w-8 h-8 rounded-lg bg-${t.color}-50 border border-${t.color}-100 grid place-items-center shrink-0">
                    <i data-lucide="${t.icon}" class="w-3.5 h-3.5 text-${t.color}-600"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-[11px] text-slate-500 mb-0.5">${esc(t.label)} · ${esc(h.docTitle.slice(0,50))}…</div>
                    <div class="text-[13px] font-semibold text-slate-900">${esc(h.heading)}</div>
                    <div class="text-[11.5px] text-slate-500 line-clamp-2 mt-0.5">${esc(h.preview)}</div>
                  </div>
                </button>`;
            }).join('');

      mount('overlay', `
        <div class="search-overlay">
          <div class="search-backdrop" data-close-search></div>
          <div class="search-panel">
            <div class="search-input-row">
              <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
              <input id="overlaySearch" value="${esc(s.query)}" placeholder="Ketik untuk mencari di semua dokumen…" autocomplete="off" />
              <kbd class="text-[10px] font-mono text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div class="search-results">${resultRows}</div>
          </div>
        </div>`);

      // fokus + restore query
      const input = document.getElementById('overlaySearch');
      input?.focus();
      if (s.query) input.setSelectionRange(s.query.length, s.query.length);
      icons();
    });
  },
};