/* ============================================================
   RENDER — semua renderer + export (print/pdf/docx)
   EOMR: E (partial) · O (cache) · M (registry) · R (fallback)
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

  /* ============================================================
     SIDEBAR
  ============================================================ */
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
                <div class="mt-1.5 flex flex-wrap items-center gap-1.5">
                  ${doc.ruangan ? `<span class="room-badge"><i data-lucide="door-open" class="w-2.5 h-2.5"></i>${esc(doc.ruangan)}</span>` : ''}
                  <span class="text-[10.5px] text-slate-500 flex items-center gap-1">
                    <i data-lucide="calendar" class="w-3 h-3"></i>${esc(doc.date)}
                  </span>
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

  /* ============================================================
     VIEWER
  ============================================================ */
  viewer() {
    safeRender('viewer', () => {
      const doc = store.selectors.activeDoc();
      if (!doc) { mount('viewer', `<div class="empty-state">Belum ada dokumen dipilih.</div>`); return; }
      const toggle = render._viewToggle();
      const thumbs = store.state.viewMode === 'document' ? render._thumbStrip(doc) : '';
      const body   = store.state.viewMode === 'web' ? render._webView(doc) : render._docView(doc);
      mount('viewer', toggle + thumbs + body);
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

  _thumbStrip(doc) {
    const pages = paging.paginate(doc);
    const thumbs = pages.map((page, idx) => {
      const lines = [];
      for (const item of page.blocks) {
        if (lines.length >= 8) break;
        if (item.kind === 'title') lines.push({ type:'title' });
        else if (item.kind === 'section-header') lines.push({ type:'h' });
        else if (item.kind === 'block') {
          const w = { paragraph:85, subheading:50, list:70, steps:75, table:95, quote:80, callout:90, diagnosa:85, soap:80 }[item.block.type] || 80;
          lines.push({ type:'p', w });
        }
      }
      const mini = lines.map(l => {
        if (l.type === 'title') return `<div class="thumb-title-block"><div class="thumb-title-line"></div><div class="thumb-title-sub"></div></div>`;
        if (l.type === 'h') return `<div class="thumb-mini-h w60"></div>`;
        return `<div class="thumb-mini-line w${l.w}"></div>`;
      }).join('');

      return `
        <button class="thumb" data-page="${idx+1}" data-target="page-${idx+1}">
          <div class="thumb-frame">
            <div class="thumb-mini-h w80"></div>
            ${mini}
          </div>
          <div class="thumb-num">Hal. ${idx+1}</div>
        </button>`;
    }).join('');
    return `<div class="thumb-strip mb-4">${thumbs}</div>`;
  },

  _webView(doc) {
    const t = store.selectors.typeMeta(doc.type);
    const sectionsHtml = doc.sections.map((sec) => `
      <section id="${esc(sec.id)}" class="scroll-mt-24">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center text-[13px] font-bold shadow-md shadow-brand-500/25 shrink-0">${esc(sec.num)}</div>
          <div class="flex-1 min-w-0">
            <h2 class="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">${esc(sec.heading)}</h2>
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
        <div class="px-10 pt-10 pb-8 border-b border-slate-100">
          <div class="flex items-center gap-2 mb-4">
            <span class="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-${t.color}-700 bg-${t.color}-50 border border-${t.color}-100 px-2.5 py-1 rounded-full">
              <i data-lucide="${t.icon}" class="w-3 h-3"></i>${esc(t.label)}
            </span>
            <span class="text-[11px] text-slate-400">· ${esc(t.desc)}</span>
          </div>
          <h1 class="text-[30px] lg:text-[34px] xl:text-[36px] leading-[1.15] font-bold text-slate-900 tracking-tight max-w-3xl">${esc(doc.title)}</h1>
          <p class="text-[14px] text-slate-500 mt-3 max-w-2xl leading-relaxed">${esc(doc.subtitle||'')}</p>

          <div class="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-[12.5px]">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white grid place-items-center text-[11px] font-bold shrink-0">
                  ${doc.author.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </div>
                <div>
                  <div class="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">Disusun oleh</div>
                  <div class="text-slate-800 font-semibold">${esc(doc.author)}</div>
                </div>
              </div>
              ${doc.ruangan ? `
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 grid place-items-center shrink-0">
                  <i data-lucide="door-open" class="w-4 h-4 text-indigo-600"></i>
                </div>
                <div>
                  <div class="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">Ruangan</div>
                  <div class="text-slate-800 font-semibold">${esc(doc.ruangan)}</div>
                </div>
              </div>` : ''}
            </div>
            <div class="space-y-3">
              ${doc.clinicalTeacher ? `
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 grid place-items-center shrink-0">
                  <i data-lucide="graduation-cap" class="w-4 h-4 text-emerald-600"></i>
                </div>
                <div>
                  <div class="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">Clinical Teacher</div>
                  <div class="text-slate-800 font-semibold">${esc(doc.clinicalTeacher)}</div>
                </div>
              </div>` : ''}
              ${doc.clinicalInstructor ? `
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 grid place-items-center shrink-0">
                  <i data-lucide="stethoscope" class="w-4 h-4 text-rose-600"></i>
                </div>
                <div>
                  <div class="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">Clinical Instructor</div>
                  <div class="text-slate-800 font-semibold">${esc(doc.clinicalInstructor)}</div>
                </div>
              </div>` : ''}
            </div>
          </div>

          <div class="mt-6 flex items-center gap-1.5 text-[12px] text-slate-500">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>${esc(doc.date)}
          </div>

          ${(doc.tags||[]).length ? `
          <div class="mt-4 flex flex-wrap gap-1.5">
            ${doc.tags.map(tag=>`<span class="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">#${esc(tag)}</span>`).join('')}
          </div>` : ''}

          ${doc.summary ? `
          <div class="mt-6 p-5 rounded-xl bg-gradient-to-br from-brand-50/60 to-white border border-brand-100">
            <div class="flex items-center gap-2 mb-2">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-brand-600"></i>
              <span class="text-[11px] font-bold uppercase tracking-wider text-brand-700">Ringkasan Otomatis</span>
            </div>
            <p class="text-[13.5px] text-slate-700 leading-relaxed">${esc(doc.summary)}</p>
          </div>` : ''}
        </div>

        <div class="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/40">
          <div class="px-6 py-4 text-center">
            <div class="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">Section</div>
            <div class="text-[18px] font-bold text-slate-900 mt-0.5">${doc.sections.length}</div>
          </div>
          <div class="px-6 py-4 text-center">
            <div class="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">Kata</div>
            <div class="text-[18px] font-bold text-slate-900 mt-0.5">${(doc.stats?.words||0).toLocaleString('id')}</div>
          </div>
          <div class="px-6 py-4 text-center">
            <div class="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">Estimasi Baca</div>
            <div class="text-[18px] font-bold text-slate-900 mt-0.5">${doc.stats?.readTime||'—'}<span class="text-[12px] font-medium text-slate-500"> mnt</span></div>
          </div>
        </div>

        <div class="px-10 py-10 space-y-12 prose-nurse">${sectionsHtml}</div>
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
              ${doc.ruangan ? `<div>Ruangan <b>${esc(doc.ruangan)}</b></div>` : ''}
              ${doc.clinicalTeacher    ? `<div>Clinical Teacher <b>${esc(doc.clinicalTeacher)}</b></div>` : ''}
              ${doc.clinicalInstructor ? `<div>Clinical Instructor <b>${esc(doc.clinicalInstructor)}</b></div>` : ''}
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
        <div class="paper-sheet" id="page-${idx+1}">
          <div class="page-header">
            <span>${esc(t.label)} — NURSEDOC</span>
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
          <nav class="p-2.5 space-y-0.5 max-h-[380px] overflow-y-auto">${links}</nav>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <i data-lucide="info" class="w-4 h-4 text-brand-600"></i>
            <h3 class="text-[13px] font-semibold text-slate-900">Informasi Dokumen</h3>
          </div>
          <div class="p-5 space-y-3.5 text-[12px]">
            <div class="flex justify-between gap-3"><span class="text-slate-500">Jenis</span><span class="font-semibold text-${t.color}-700">${esc(t.label)}</span></div>
            ${doc.ruangan ? `<div class="flex justify-between gap-3"><span class="text-slate-500">Ruangan</span><span class="font-semibold text-slate-800 text-right">${esc(doc.ruangan)}</span></div>` : ''}
            <div class="flex justify-between gap-3"><span class="text-slate-500">Disusun oleh</span><span class="font-semibold text-slate-800 text-right">${esc(doc.author)}</span></div>
            ${doc.clinicalTeacher    ? `<div class="flex justify-between gap-3"><span class="text-slate-500">Clinical Teacher</span><span class="font-semibold text-slate-800 text-right">${esc(doc.clinicalTeacher)}</span></div>` : ''}
            ${doc.clinicalInstructor ? `<div class="flex justify-between gap-3"><span class="text-slate-500">Clinical Instructor</span><span class="font-semibold text-slate-800 text-right">${esc(doc.clinicalInstructor)}</span></div>` : ''}
            <div class="flex justify-between gap-3"><span class="text-slate-500">Tanggal</span><span class="font-semibold text-slate-800">${esc(doc.date)}</span></div>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-3 space-y-1">
          <button class="action-btn primary" data-action="print">
            <i data-lucide="printer" class="w-4 h-4"></i>Cetak Dokumen
          </button>
          <button class="action-btn" data-action="pdf">
            <i data-lucide="file-down" class="w-4 h-4"></i>Unduh PDF
          </button>
          <button class="action-btn" data-action="docx">
            <i data-lucide="file-type-2" class="w-4 h-4"></i>Unduh DOCX
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
        document.querySelector(`.toc-link[href="#${CSS.escape(en.target.id)}"]`)?.classList.add('scrollspy-active');
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
    targets.forEach((t) => t.id && obs.observe(t));
  },

  overlay() {
    safeRender('overlay', () => {
      const s = store.state.search;
      if (!s.open) { mount('overlay', ''); return; }
      const results = s.query ? search.query(s.query) : [];

      const rows = !s.query
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
                    <div class="text-[11px] text-slate-500 mb-0.5">
                      ${esc(t.label)} · ${esc(h.docTitle.slice(0,50))}…${h.ruangan ? ` · ${esc(h.ruangan)}` : ''}
                    </div>
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
              <kbd class="text-[10px] text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div class="search-results">${rows}</div>
          </div>
        </div>`);

      const input = document.getElementById('overlaySearch');
      input?.focus();
      if (s.query) input.setSelectionRange(s.query.length, s.query.length);
      icons();
    });
  },

  /* ============================================================
     EXPORT — PRINT / PDF (popup strategy)
     Popup = dokumen terpisah, tidak ada konflik CSS/lifecycle.
     Fallback ke iframe persistent kalau popup diblokir.
  ============================================================ */
  _buildPrintHtml(doc) {
    const body = render._docView(doc);
    return `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(doc.title)}</title>
<style>${PRINT_CSS}</style>
</head><body>${body}</body></html>`;
  },

  /** Popup window = cara paling stabil lintas-browser (desktop & mobile). */
  _printViaPopup(html) {
    // window.open HARUS dipanggil dari user gesture (click) — jangan async.
    const w = window.open('', '_blank', 'width=1000,height=1300,menubar=no,toolbar=no,location=no,status=no');
    if (!w) return false;

    try {
      w.document.open();
      w.document.write(html);
      w.document.close();
    } catch (e) {
      console.error('[print:popup]', e);
      return false;
    }

    // Tunggu load → render → print
    const triggerPrint = () => {
      // beri waktu font & layout settle
      setTimeout(() => {
        try {
          w.focus();
          w.print();
        } catch (e) {
          console.error('[print:popup:exec]', e);
        }
      }, 350);
    };

    if (w.document.readyState === 'complete') triggerPrint();
    else w.addEventListener('load', triggerPrint, { once: true });

    return true;
  },

  /** Fallback: iframe persistent — JANGAN dihapus otomatis. */
  _printIframe: null,
  _printViaIframe(html) {
    let iframe = render._printIframe;
    if (!iframe || !document.body.contains(iframe)) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('aria-hidden', 'true');
      // JANGAN pakai width:0/height:0 — bikin blank di Chrome Android.
      // Pakai 1px tapi tetap "rendered":
      iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none;';
      document.body.appendChild(iframe);
      render._printIframe = iframe;
    }

    const idoc = iframe.contentDocument || iframe.contentWindow.document;
    idoc.open();
    idoc.write(html);
    idoc.close();

    const triggerPrint = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        } catch (e) {
          console.error('[print:iframe]', e);
          showToast('Cetak gagal dibuka.', 'alert-circle');
        }
      }, 250);
    };

    if (idoc.readyState === 'complete') triggerPrint();
    else iframe.addEventListener('load', triggerPrint, { once: true });
  },

  printCurrent() {
    const doc = store.selectors.activeDoc();
    if (!doc) return;
    const html = render._buildPrintHtml(doc);

    // Popup dulu
    if (render._printViaPopup(html)) return;
    // Fallback
    showToast('Popup diblokir, memakai mode alternatif.', 'info');
    render._printViaIframe(html);
  },

  downloadPdf() {
    const doc = store.selectors.activeDoc();
    if (!doc) return;
    showToast('Pada dialog cetak, pilih "Save as PDF".', 'file-down');

    const html = render._buildPrintHtml(doc);
    if (render._printViaPopup(html)) return;
    showToast('Popup diblokir, memakai mode alternatif.', 'info');
    render._printViaIframe(html);
  },

  async downloadDocx() {
    const doc = store.selectors.activeDoc();
    if (!doc) return;

    if (!window.docx) {
      showToast('Library DOCX belum siap. Refresh halaman.', 'alert-circle');
      return;
    }

    try {
      showToast('Menyusun berkas DOCX…', 'loader');
      const blob = await buildDocxBlob(doc);
      triggerDownload(blob, `${doc.id}.docx`);
      showToast('Berkas DOCX berhasil diunduh.', 'file-type-2');
    } catch (err) {
      console.error('[docx]', err);
      showToast('Gagal membuat DOCX: ' + err.message, 'alert-circle');
    }
  },
};

/* ============================================================
   PRINT_CSS — self-contained, identik dengan paper view
============================================================ */
const PRINT_CSS = `
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  html, body {
    margin: 0; padding: 0; background: #fff;
    font-family: "Times New Roman", Times, serif;
    color: #1e293b;
    -webkit-text-size-adjust: 100%;
  }

  .paper-wrap { background: #fff; padding: 0; border-radius: 0; }
  .paper-sheet {
    background: #fff;
    width: 210mm;
    min-height: 297mm;
    padding: 20mm 18mm;
    margin: 0 auto;
    position: relative;
    page-break-after: always;
    break-after: page;
    display: block;
    overflow: visible;
  }
  .paper-sheet:last-child { page-break-after: auto; break-after: auto; }

  .page-header {
    position: absolute; top: 10mm; left: 18mm; right: 18mm;
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 8.5pt; color: #94a3b8; letter-spacing: .12em; text-transform: uppercase;
    padding-bottom: 2.5mm; border-bottom: .5pt solid #e2e8f0;
  }
  .page-footer {
    position: absolute; bottom: 10mm; left: 18mm; right: 18mm;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 8.5pt; color: #94a3b8;
    padding-top: 2.5mm; border-top: .5pt solid #e2e8f0;
  }
  .page-num { font-variant-numeric: tabular-nums; }

  .doc-content { font-family: "Times New Roman", Times, serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }

  .doc-title {
    font-size: 17pt; font-weight: 700; text-align: center; color: #0f172a;
    line-height: 1.25; margin: 0 0 5pt;
  }
  .doc-subtitle {
    text-align: center; font-size: 11pt; font-style: italic;
    color: #64748b; margin: 0 0 4pt; line-height: 1.4;
  }
  .doc-meta {
    text-align: center; font-size: 10pt; color: #64748b;
    margin: 8pt 0 18pt; padding-bottom: 10pt;
    border-bottom: 1pt solid #e2e8f0; line-height: 1.7;
  }
  .doc-meta b { color: #1e293b; font-weight: 700; }

  .doc-h2 {
    font-size: 13pt; font-weight: 700; color: #0f172a;
    margin: 14pt 0 8pt; padding-bottom: 3pt;
    border-bottom: 1.25pt solid #0d9488;
    display: block;
  }
  .doc-h2 .num { color: #0d9488; margin-right: 4pt; }
  .doc-h3 { font-size: 11.5pt; font-weight: 700; color: #0f172a; margin: 10pt 0 4pt; }

  .doc-p {
    font-size: 11pt; line-height: 1.7;
    text-align: justify; text-justify: inter-word;
    margin: 0 0 8pt; color: #1e293b;
  }
  .doc-ul, .doc-ol {
    margin: 4pt 0 8pt 4pt; padding-left: 20pt;
    font-size: 11pt; line-height: 1.7; color: #1e293b;
  }
  .doc-ul li { list-style: disc; margin-bottom: 2pt; }
  .doc-ol li { list-style: decimal; margin-bottom: 3pt; padding-left: 3pt; }

  .doc-table {
    width: 100%; border-collapse: collapse;
    table-layout: auto;
    font-family: "Times New Roman", Times, serif;
    font-size: 10pt; margin: 8pt 0 12pt;
    page-break-inside: avoid;
  }
  .doc-table th, .doc-table td {
    border: .75pt solid #cbd5e1; padding: 5pt 7pt;
    text-align: left; vertical-align: top; line-height: 1.4;
    word-wrap: break-word;
  }
  .doc-table th {
    background: #f1f5f9; font-weight: 700; color: #0f172a; font-size: 9.5pt;
  }
  .doc-table tr:nth-child(even) td { background: #fafbfc; }
  .doc-table td:first-child { font-weight: 600; color: #0f172a; }

  .doc-quote {
    margin: 10pt 0; padding: 8pt 12pt;
    border-left: 2.5pt solid #0d9488; background: #f0fdfa;
    font-style: italic; font-size: 10.5pt; line-height: 1.7;
    color: #134e4a;
  }
  .doc-callout {
    margin: 10pt 0; padding: 8pt 10pt;
    border: .75pt solid #bae6fd; background: #f0f9ff;
    font-size: 10.5pt; line-height: 1.6; color: #0c4a6e;
  }
  .doc-callout.warning { border-color: #fde68a; background: #fffbeb; color: #78350f; }

  .doc-diagnosa {
    margin: 6pt 0; padding: 8pt 10pt;
    border: .75pt solid #e2e8f0;
    border-left: 2.5pt solid #0d9488;
    background: #fafbfc;
    page-break-inside: avoid;
  }
  .doc-diagnosa .label {
    font-size: 8.5pt; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #0d9488; margin-bottom: 2pt;
  }
  .doc-diagnosa .title { font-size: 11pt; font-weight: 700; color: #0f172a; margin-bottom: 3pt; }
  .doc-diagnosa .detail { font-size: 10pt; line-height: 1.6; color: #475569; }

  .doc-soap { margin: 8pt 0; page-break-inside: avoid; }
  .soap-item {
    display: flex; gap: 8pt; padding: 5pt 8pt;
    background: #f8fafc;
    border-left: 2.5pt solid #cbd5e1;
    margin-bottom: 4pt;
    font-size: 10pt; line-height: 1.6; color: #334155;
  }
  .soap-item .k { font-weight: 700; color: #0d9488; font-size: 11pt; min-width: 10pt; }
  .soap-item .lbl {
    font-weight: 700; color: #0f172a; font-size: 9pt;
    text-transform: uppercase; letter-spacing: .06em;
    display: block; margin-bottom: 2pt;
  }

  .doc-steps { margin: 8pt 0 10pt; padding-left: 0; list-style: none; }
  .doc-steps li {
    display: flex; gap: 8pt; font-size: 10.5pt; line-height: 1.7;
    margin-bottom: 6pt; color: #1e293b;
    page-break-inside: avoid;
  }
  .doc-steps li .n { font-weight: 700; color: #0d9488; min-width: 14pt; }
  .doc-steps li .txt b { color: #0f172a; }

  .fade-in { animation: none !important; }

  @page { size: A4; margin: 0; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

/* ============================================================
   HELPERS
============================================================ */
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 200);
}

function showToast(text, icon = 'info') {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4"></i><span>${esc(text)}</span>`;
  document.body.appendChild(el);
  icons();
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, 2600);
  setTimeout(() => el.remove(), 3000);
}

/* ============================================================
   DOCX BUILDER — native .docx dengan lebar kolom eksplisit
============================================================ */
async function buildDocxBlob(doc) {
  const D = window.docx;
  const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    WidthType, AlignmentType, BorderStyle, Footer, PageNumber,
    TableLayoutType, VerticalAlign,
  } = D;

  const FONT = 'Times New Roman';
  const CONTENT_WIDTH = 9638; // twips — A4 (11906) - 2×1134 margin

  const children = [];

  /* ---------- TITLE ---------- */
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: doc.title, bold: true, size: 32, font: FONT })],
  }));

  if (doc.subtitle) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: doc.subtitle, italics: true, size: 22, font: FONT, color: '64748B' })],
    }));
  }

  /* ---------- META ---------- */
  const metaLines = [
    `Disusun oleh ${doc.author}`,
    doc.ruangan ? `Ruangan: ${doc.ruangan}` : null,
    doc.clinicalTeacher ? `Clinical Teacher: ${doc.clinicalTeacher}` : null,
    doc.clinicalInstructor ? `Clinical Instructor: ${doc.clinicalInstructor}` : null,
    doc.date,
  ].filter(Boolean);

  metaLines.forEach(line => children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: line, size: 20, font: FONT, color: '475569' })],
  })));

  children.push(new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } },
    children: [],
  }));

  /* ---------- SECTIONS ---------- */
  for (const sec of doc.sections) {
    children.push(new Paragraph({
      spacing: { before: 260, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '0D9488' } },
      children: [new TextRun({ text: `${sec.num}. ${sec.heading}`, bold: true, size: 26, font: FONT })],
    }));

    for (const b of sec.blocks) {
      blockToDocxParagraphs(b, D, FONT, CONTENT_WIDTH).forEach(p => children.push(p));
    }
  }

  /* ---------- DOCUMENT ---------- */
  const docFile = new Document({
    creator: 'nurseDoc',
    title: doc.title,
    description: doc.summary || '',
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22 },
          paragraph: { spacing: { line: 360 } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 },
        },
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: 'Hal. ', size: 18, font: FONT, color: '94A3B8' }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, font: FONT, color: '94A3B8' }),
              new TextRun({ text: ' dari ', size: 18, font: FONT, color: '94A3B8' }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: FONT, color: '94A3B8' }),
            ],
          })],
        }),
      },
      children,
    }],
  });

  return await Packer.toBlob(docFile);
}

/* ---------- Hitung lebar kolom proporsional terhadap isi ---------- */
function computeColumnWidths(headers, rows, totalWidth = 9638) {
  const n = headers.length;
  if (!n) return [];

  // Lebar minimum agar tiap kolom muat ≥ ~10 karakter
  const MIN = Math.floor(totalWidth / (n * 2));

  // Cari panjang maksimum tiap kolom
  const maxLens = headers.map((h, i) => {
    let max = String(h ?? '').length;
    (rows || []).forEach(r => {
      const len = String(r[i] ?? '').length;
      if (len > max) max = len;
    });
    return Math.max(max, 8);
  });

  const total = maxLens.reduce((a, b) => a + b, 0);
  const widths = maxLens.map(len => Math.max(MIN, Math.round((len / total) * totalWidth)));

  // Koreksi agar pas
  const sum = widths.reduce((a, b) => a + b, 0);
  if (sum !== totalWidth) widths[widths.length - 1] += totalWidth - sum;

  return widths;
}

function blockToDocxParagraphs(b, D, FONT, CONTENT_WIDTH) {
  const {
    Paragraph, TextRun, Table, TableRow, TableCell,
    WidthType, AlignmentType, BorderStyle, TableLayoutType, VerticalAlign,
  } = D;

  const out = [];
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
  const run = (text, opts = {}) => new TextRun({ text: String(text ?? ''), font: FONT, size: 22, ...opts });
  const cellPara = (text, opts = {}) => new Paragraph({
    spacing: { before: 40, after: 40, line: 300 },
    children: [run(text, { size: 20, ...opts })],
  });

  switch (b.type) {
    case 'paragraph':
      out.push(new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120, line: 360 },
        children: [run(b.text)],
      }));
      break;

    case 'subheading':
      out.push(new Paragraph({
        spacing: { before: 160, after: 60 },
        children: [run(b.text, { bold: true, size: 22 })],
      }));
      break;

    case 'list':
      (b.items || []).forEach(item => out.push(new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 40 },
        children: [run(item)],
      })));
      break;

    case 'steps':
      (b.items || []).forEach((s, i) => out.push(new Paragraph({
        indent: { left: 360, hanging: 240 },
        spacing: { after: 80 },
        children: [
          run(`${i + 1}. `, { bold: true }),
          run(`${s.step}. `, { bold: true }),
          run(s.text),
        ],
      })));
      break;

    case 'table': {
      const headers = b.headers || [];
      const rows = b.rows || [];
      const columnWidths = computeColumnWidths(headers, rows, CONTENT_WIDTH);

      const headerRow = new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          width: { size: columnWidths[i], type: WidthType.DXA },
          shading: { fill: 'F1F5F9' },
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [cellPara(h, { bold: true })],
        })),
      });

      const bodyRows = rows.map(r => new TableRow({
        children: headers.map((_, i) => new TableCell({
          width: { size: columnWidths[i], type: WidthType.DXA },
          verticalAlign: VerticalAlign.TOP,
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [cellPara(r[i] ?? '')],
        })),
      }));

      out.push(new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths,
        layout: TableLayoutType.FIXED,
        borders: {
          top: border, bottom: border, left: border, right: border,
          insideHorizontal: border, insideVertical: border,
        },
        rows: [headerRow, ...bodyRows],
      }));
      out.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      break;
    }

    case 'quote':
      out.push(new Paragraph({
        indent: { left: 360 },
        spacing: { before: 120, after: 120 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: '0D9488' } },
        children: [run(`"${b.text}"`, { italics: true, size: 21, color: '134E4A' })],
      }));
      break;

    case 'callout':
      out.push(new Paragraph({
        indent: { left: 240 },
        spacing: { before: 120, after: 120 },
        shading: {
          type: 'clear',
          fill: b.variant === 'warning' ? 'FFFBEB' : 'F0F9FF',
          color: 'auto',
        },
        children: [run(b.text, { size: 21 })],
      }));
      break;

    case 'diagnosa':
      if (b.priority) out.push(new Paragraph({
        spacing: { before: 120, after: 20 },
        children: [run(b.priority, { bold: true, size: 18, color: '0D9488' })],
      }));
      out.push(new Paragraph({
        spacing: { after: 40 },
        children: [run(b.title, { bold: true, size: 22 })],
      }));
      if (b.detail) out.push(new Paragraph({
        spacing: { after: 120 },
        children: [run(b.detail, { size: 20, color: '475569' })],
      }));
      break;

    case 'soap':
      [['S','Subjektif', b.s],['O','Objektif', b.o],['A','Analisis', b.a],['P','Perencanaan', b.p]]
        .forEach(([k, l, v]) => out.push(new Paragraph({
          indent: { left: 240 },
          spacing: { after: 80 },
          children: [
            run(`${k} — `, { bold: true, color: '0D9488' }),
            run(`${l}: `, { bold: true }),
            run(v),
          ],
        })));
      break;

    default:
      out.push(new Paragraph({
        children: [run(`[blok: ${b.type}]`, { italics: true, color: '94A3B8' })],
      }));
  }

  return out;
}