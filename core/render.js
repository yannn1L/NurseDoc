import { store } from './store.js';
import { bus } from './bus.js';
import { registry } from './registry.js';
import { paging } from './paging.js';
import { search } from './search.js';
import { mount, safeRender, icons, esc } from './dom.js';

export const render = {
  all() { render.filters(); render.sidebar(); render.viewer(); render.toc(); render.overlay(); render.docCount(); icons(); },

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

  /* ---------- VIEWER ---------- */
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

  /* ---------- THUMBNAIL STRIP ---------- */
  _thumbStrip(doc) {
    const pages = paging.paginate(doc);
    const thumbs = pages.map((page, idx) => {
      // ringkas isi: tampilkan hingga 3 header/paragraf pertama
      const lines = [];
      let headCount = 0;
      for (const item of page.blocks) {
        if (lines.length >= 8) break;
        if (item.kind === 'title') { lines.push({ type:'title' }); }
        else if (item.kind === 'section-header') { lines.push({ type:'h', w: 60 }); headCount++; }
        else if (item.kind === 'block') {
          const w = { paragraph:85, subheading:50, list:70, steps:75, table:95, quote:80, callout:90, diagnosa:85, soap:80 }[item.block.type] || 80;
          lines.push({ type:'p', w });
        }
      }

      const mini = lines.map(l => {
        if (l.type === 'title')
          return `<div class="thumb-title-block">
            <div class="thumb-title-line"></div>
            <div class="thumb-title-sub"></div>
          </div>`;
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

    return `
      <div class="thumb-strip mb-4">
        ${thumbs}
      </div>`;
  },

  /* ---------- WEB VIEW (header diperbaiki untuk desktop) ---------- */
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
        <!-- HEADER: didesain ulang untuk desktop -->
        <div class="px-10 pt-10 pb-8 border-b border-slate-100">
          <div class="flex items-center gap-2 mb-4">
            <span class="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-${t.color}-700 bg-${t.color}-50 border border-${t.color}-100 px-2.5 py-1 rounded-full">
              <i data-lucide="${t.icon}" class="w-3 h-3"></i>${esc(t.label)}
            </span>
            <span class="text-[11px] text-slate-400">· ${esc(t.desc)}</span>
          </div>

          <h1 class="text-[30px] lg:text-[34px] xl:text-[36px] leading-[1.15] font-bold text-slate-900 tracking-tight max-w-3xl">
            ${esc(doc.title)}
          </h1>
          <p class="text-[14px] text-slate-500 mt-3 max-w-2xl leading-relaxed">${esc(doc.subtitle||'')}</p>

          <!-- Meta info: grid 2 kolom desktop -->
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

        <!-- STATS BAR -->
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

  /* ---------- DOCUMENT VIEW ---------- */
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
                      ${esc(t.label)} · ${esc(h.docTitle.slice(0,50))}…
                      ${h.ruangan ? ` · ${esc(h.ruangan)}` : ''}
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
     EXPORT: PRINT / PDF / DOCX
  ============================================================ */
  _preparePrint() {
    const doc = store.selectors.activeDoc();
    if (!doc) return false;
    const root = document.getElementById('printRoot');
    root.innerHTML = render._docView(doc);
    document.body.classList.add('printing');
    return true;
  },
  _cleanupPrint() {
    document.body.classList.remove('printing');
    document.getElementById('printRoot').innerHTML = '';
  },

  printCurrent() {
    if (!render._preparePrint()) return;
    setTimeout(() => { window.print(); }, 60);
  },

  downloadPdf() {
    if (!render._preparePrint()) return;
    showToast('Dialog cetak akan terbuka. Pilih "Save as PDF" sebagai destinasi.', 'file-down');
    setTimeout(() => { window.print(); }, 60);
  },

  downloadDocx() {
    const doc = store.selectors.activeDoc();
    if (!doc) return;
    const html = buildWordHtml(doc, store.selectors.typeMeta(doc.type));
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    triggerDownload(blob, `${doc.id}.doc`);
    showToast('Berkas DOCX berhasil diunduh.', 'file-type-2');
  },
};

/* ============================================================
   HELPERS EXPORT
============================================================ */
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
}

function showToast(text, icon = 'info') {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4"></i><span>${esc(text)}</span>`;
  document.body.appendChild(el);
  icons();
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, 2600);
  setTimeout(() => el.remove(), 3000);
}

/* ============================================================
   WORD EXPORT — inline CSS, table-friendly, dibuka di MS Word
============================================================ */
function buildWordHtml(doc, t) {
  const FONT = "'Times New Roman', Times, serif";

  const s = (style) => style;

  const sectionHtml = doc.sections.map(sec => `
    <h2 style="${s(`font-family:${FONT};font-size:14pt;font-weight:bold;color:#0f172a;border-bottom:1.5pt solid #0d9488;padding-bottom:4pt;margin:18pt 0 10pt;`)}">
      ${sec.num}. ${esc(sec.heading)}
    </h2>
    ${sec.blocks.map(b => wordBlock(b, FONT)).join('')}
  `).join('');

  return `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <title>${esc(doc.title)}</title>
      <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
      <style>
        @page { size: A4; margin: 2cm 1.8cm; }
        body { font-family: ${FONT}; font-size: 12pt; color: #1e293b; line-height: 1.5; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 0.75pt solid #94a3b8; padding: 4pt 6pt; vertical-align: top; font-size: 10.5pt; }
        th { background: #f1f5f9; font-weight: bold; }
      </style>
    </head>
    <body>
      <div style="text-align:center;margin-bottom:24pt;">
        <div style="font-size:18pt;font-weight:bold;color:#0f172a;">${esc(doc.title)}</div>
        <div style="font-size:11pt;font-style:italic;color:#64748b;margin-top:6pt;">${esc(doc.subtitle||'')}</div>
        <div style="font-size:10pt;color:#475569;margin-top:14pt;line-height:1.7;">
          <div>Disusun oleh <b>${esc(doc.author)}</b></div>
          ${doc.ruangan ? `<div>Ruangan <b>${esc(doc.ruangan)}</b></div>` : ''}
          ${doc.clinicalTeacher ? `<div>Clinical Teacher <b>${esc(doc.clinicalTeacher)}</b></div>` : ''}
          ${doc.clinicalInstructor ? `<div>Clinical Instructor <b>${esc(doc.clinicalInstructor)}</b></div>` : ''}
          <div>${esc(doc.date)}</div>
        </div>
      </div>
      <hr style="border:none;border-top:0.5pt solid #cbd5e1;margin-bottom:20pt;">
      ${sectionHtml}
    </body></html>`;
}

function wordBlock(b, FONT) {
  switch (b.type) {
    case 'paragraph':
      return `<p style="font-family:${FONT};font-size:12pt;line-height:1.6;text-align:justify;margin:6pt 0;">${esc(b.text)}</p>`;
    case 'subheading':
      return `<h3 style="font-family:${FONT};font-size:12pt;font-weight:bold;color:#0f172a;margin:10pt 0 4pt;">${esc(b.text)}</h3>`;
    case 'list':
      return `<ul style="font-family:${FONT};font-size:12pt;margin:4pt 0 10pt 22pt;">${b.items.map(i=>`<li style="margin-bottom:2pt;">${esc(i)}</li>`).join('')}</ul>`;
    case 'steps':
      return `<ol style="font-family:${FONT};font-size:11.5pt;margin:4pt 0 10pt 22pt;">${b.items.map(s=>`<li style="margin-bottom:4pt;"><b>${esc(s.step)}.</b> ${esc(s.text)}</li>`).join('')}</ol>`;
    case 'table':
      return `<table><thead><tr>${b.headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'quote':
      return `<div style="font-family:${FONT};font-size:11.5pt;font-style:italic;border-left:2pt solid #0d9488;background:#f0fdfa;padding:6pt 10pt;margin:8pt 0;color:#134e4a;">"${esc(b.text)}"</div>`;
    case 'callout':
      return `<div style="font-family:${FONT};font-size:11pt;border:0.75pt solid ${b.variant==='warning'?'#fcd34d':'#bae6fd'};background:${b.variant==='warning'?'#fffbeb':'#f0f9ff'};padding:6pt 10pt;margin:8pt 0;color:${b.variant==='warning'?'#78350f':'#0c4a6e'};">${esc(b.text)}</div>`;
    case 'diagnosa':
      return `<div style="font-family:${FONT};border:0.75pt solid #cbd5e1;border-left:3pt solid #0d9488;background:#fafbfc;padding:6pt 10pt;margin:6pt 0;">
        <div style="font-size:8.5pt;font-weight:bold;color:#0d9488;letter-spacing:.05em;text-transform:uppercase;">${esc(b.priority||'')}</div>
        <div style="font-size:11pt;font-weight:bold;color:#0f172a;margin:3pt 0;">${esc(b.title)}</div>
        <div style="font-size:10.5pt;color:#475569;line-height:1.6;">${esc(b.detail||'')}</div>
      </div>`;
    case 'soap':
      return `<div style="font-family:${FONT};margin:8pt 0;">
        ${[['S','Subjektif',b.s],['O','Objektif',b.o],['A','Analisis',b.a],['P','Perencanaan',b.p]]
          .map(([k,l,v])=>`<div style="border-left:2pt solid #cbd5e1;background:#f8fafc;padding:5pt 10pt;margin-bottom:4pt;">
            <b style="color:#0d9488;">${k}</b> — <b>${l}:</b> ${esc(v)}
          </div>`).join('')}
      </div>`;
    default:
      return `<p style="font-family:${FONT};font-style:italic;color:#94a3b8;">[blok: ${esc(b.type)}]</p>`;
  }
}

/* Export helper dipakai app.js */
export { showToast };