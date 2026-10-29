import { NurseDocument } from '../types';
import { paging } from './paging';
import { TYPE_META } from '../data/types';
import { escapeHtml, renderDocBlockToHtml } from './docBlockHtml';

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

  /* ---------- COVER ---------- */
  .doc-cover {
    text-align: center;
    padding: 30pt 0 20pt;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 230mm;
    justify-content: space-between;
  }
  .doc-cover-header {
    font-size: 12pt; font-weight: 700; color: #1e293b;
    line-height: 1.6; text-transform: uppercase; letter-spacing: .03em;
  }
  .doc-cover-category {
    font-size: 13pt; font-weight: 700; color: #0d9488;
    letter-spacing: .12em; text-transform: uppercase;
    margin: 24pt 0 10pt;
  }
  .doc-cover-title {
    font-size: 17pt; font-weight: 700; color: #0f172a;
    line-height: 1.4; margin: 8pt 0 30pt; max-width: 140mm;
  }
  .doc-cover-penyusun {
    font-size: 11.5pt; color: #1e293b; line-height: 1.9;
    text-align: left; display: inline-block;
    padding: 10pt 20pt; border: .75pt solid #e2e8f0;
    background: #fafbfc;
  }
  .doc-cover-penyusun-label { text-align: center; margin-bottom: 6pt; font-weight: 700; }
  .doc-cover-penyusun-row { display: flex; gap: 8pt; }
  .doc-cover-penyusun-row .k { min-width: 26mm; color: #64748b; }
  .doc-cover-penyusun-row .v { color: #0f172a; font-weight: 600; }
  .doc-cover-footer {
    font-size: 12pt; font-weight: 700; color: #1e293b;
    line-height: 1.6; text-transform: uppercase; letter-spacing: .03em;
  }

  /* ---------- TITLE ---------- */
  .doc-title { font-size: 17pt; font-weight: 700; text-align: center; color: #0f172a; line-height: 1.25; margin: 0 0 5pt; }
  .doc-subtitle { text-align: center; font-size: 11pt; font-style: italic; color: #64748b; margin: 0 0 4pt; line-height: 1.4; }
  .doc-meta { text-align: center; font-size: 10pt; color: #64748b; margin: 8pt 0 18pt; padding-bottom: 10pt; border-bottom: 1pt solid #e2e8f0; line-height: 1.7; }
  .doc-meta b { color: #1e293b; font-weight: 700; }

  /* ---------- HEADINGS ---------- */
  .doc-h2 { font-size: 13pt; font-weight: 700; color: #0f172a; margin: 14pt 0 8pt; padding-bottom: 3pt; border-bottom: 1.25pt solid #0d9488; display: block; }
  .doc-h2 .num { color: #0d9488; margin-right: 4pt; }
  .doc-h2--bab { text-align: center; font-size: 14pt; letter-spacing: .02em; text-transform: uppercase; border-bottom: 1.25pt solid #0d9488; padding-bottom: 4pt; margin: 20pt 0 12pt; }
  .doc-h3 { font-size: 11.5pt; font-weight: 700; color: #0f172a; margin: 10pt 0 4pt; }
  .doc-section { font-size: 13pt; font-weight: 700; color: #0f172a; margin: 14pt 0 8pt; }
  .doc-section .num { color: #0d9488; }
  .doc-heading { font-size: 11.5pt; font-weight: 700; color: #0f172a; margin: 10pt 0 5pt; }
  .doc-heading .num { color: #475569; margin-right: 2pt; }
  .doc-subsubsection { font-size: 11pt; font-weight: 700; color: #1e293b; margin: 8pt 0 4pt; }
  .doc-subsubsection .num { color: #64748b; margin-right: 2pt; }

  /* ---------- PARAGRAPH / LIST ---------- */
  .doc-p { font-size: 11pt; line-height: 1.7; text-align: justify; text-justify: inter-word; margin: 0 0 8pt; color: #1e293b; }
  .doc-ul, .doc-ol { margin: 4pt 0 8pt 4pt; padding-left: 20pt; font-size: 11pt; line-height: 1.7; color: #1e293b; }
  .doc-ul li { list-style: disc; margin-bottom: 2pt; }
  .doc-ol li { list-style: decimal; margin-bottom: 3pt; padding-left: 3pt; }

  /* ---------- TABLE ---------- */
  .doc-table { width: 100%; border-collapse: collapse; font-size: 10pt; margin: 8pt 0 12pt; page-break-inside: avoid; }
  .doc-table th, .doc-table td { border: .75pt solid #cbd5e1; padding: 5pt 7pt; text-align: left; vertical-align: top; line-height: 1.4; }
  .doc-table th { background: #f1f5f9; font-weight: 700; color: #0f172a; font-size: 9.5pt; }
  .doc-table tr:nth-child(even) td { background: #fafbfc; }
  .doc-table td:first-child { font-weight: 600; color: #0f172a; }

  /* ---------- IDENTITY ---------- */
  .doc-identity { width: 100%; border-collapse: collapse; font-size: 11pt; margin: 6pt 0 12pt; }
  .doc-identity caption { text-align: left; font-weight: 700; font-size: 11pt; color: #0f172a; padding-bottom: 4pt; }
  .doc-identity th, .doc-identity td { padding: 3pt 6pt; vertical-align: top; text-align: left; border: none; }
  .doc-identity th { width: 42mm; color: #475569; font-weight: 500; }
  .doc-identity td { color: #0f172a; font-weight: 600; }

  /* ---------- PATHWAY ---------- */
  .doc-pathway { margin: 10pt 0; padding: 12pt 14pt; border: .75pt solid #e2e8f0; background: #fafbfc; }
  .doc-pathway .pathway-title { text-align: center; font-weight: 700; font-size: 11pt; color: #0f172a; margin-bottom: 8pt; text-transform: uppercase; letter-spacing: .06em; }
  .pathway-steps { display: flex; flex-direction: column; align-items: center; }
  .pathway-step { width: 90%; max-width: 120mm; padding: 6pt 12pt; border: 1pt solid #99f6e4; background: #f0fdfa; color: #134e4a; font-size: 10.5pt; font-weight: 600; text-align: center; }
  .pathway-step.highlight { border-color: #fda4af; background: #fff1f2; color: #881337; }
  .pathway-arrow { color: #94a3b8; font-size: 12pt; line-height: 1; margin: 3pt 0; }

  /* ---------- BIBLIOGRAPHY ---------- */
  .doc-bibliography { margin: 8pt 0; font-size: 11pt; line-height: 1.6; }
  .bib-item { display: flex; gap: 6pt; margin-bottom: 6pt; padding-left: 8mm; text-indent: -8mm; }
  .bib-item .n { color: #475569; flex-shrink: 0; }
  .bib-item .ref { color: #1e293b; text-align: justify; }

  /* ---------- ANALYSIS ---------- */
  .doc-analysis { margin: 8pt 0; border: .75pt solid #e2e8f0; overflow: hidden; page-break-inside: avoid; }
  .doc-analysis .analysis-head { padding: 6pt 10pt; background: #f0fdfa; border-bottom: .75pt solid #e2e8f0; font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #0d9488; }
  .doc-analysis .analysis-item { padding: 8pt 12pt; border-bottom: .5pt solid #f1f5f9; }
  .doc-analysis .analysis-item:last-child { border-bottom: none; }
  .analysis-label { font-size: 10.5pt; font-weight: 700; color: #0f172a; margin-bottom: 3pt; }
  .analysis-content { font-size: 10.5pt; color: #334155; line-height: 1.6; text-align: justify; margin-bottom: 5pt; }
  .analysis-rationale { padding: 5pt 8pt; background: #f0fdfa; border-left: 2pt solid #0d9488; font-size: 10pt; color: #134e4a; font-style: italic; line-height: 1.6; text-align: justify; }
  .analysis-rationale .rsn-label { font-style: normal; font-weight: 700; color: #0d9488; }

  /* ---------- QUOTE / CALLOUT / DIAGNOSA / SOAP ---------- */
  .doc-quote { margin: 10pt 0; padding: 8pt 12pt; border-left: 2.5pt solid #0d9488; background: #f0fdfa; font-style: italic; font-size: 10.5pt; line-height: 1.7; color: #134e4a; }
  .doc-callout { margin: 10pt 0; padding: 8pt 10pt; border: .75pt solid #bae6fd; background: #f0f9ff; font-size: 10.5pt; line-height: 1.6; color: #0c4a6e; }
  .doc-callout.warning { border-color: #fde68a; background: #fffbeb; color: #78350f; }
  .doc-diagnosa { margin: 6pt 0; padding: 8pt 10pt; border: .75pt solid #e2e8f0; border-left: 2.5pt solid #0d9488; background: #fafbfc; page-break-inside: avoid; }
  .doc-diagnosa .label { font-size: 8.5pt; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #0d9488; margin-bottom: 2pt; }
  .doc-diagnosa .title { font-size: 11pt; font-weight: 700; color: #0f172a; margin-bottom: 3pt; }
  .doc-diagnosa .detail { font-size: 10pt; line-height: 1.6; color: #475569; }
  .doc-soap { margin: 8pt 0; page-break-inside: avoid; }
  .soap-item { display: flex; gap: 8pt; padding: 5pt 8pt; background: #f8fafc; border-left: 2.5pt solid #cbd5e1; margin-bottom: 4pt; font-size: 10pt; line-height: 1.6; color: #334155; }
  .soap-item .k { font-weight: 700; color: #0d9488; font-size: 11pt; min-width: 10pt; }
  .soap-item .lbl { font-weight: 700; color: #0f172a; font-size: 9pt; text-transform: uppercase; letter-spacing: .06em; display: block; margin-bottom: 2pt; }
  .doc-steps { margin: 8pt 0 10pt; padding-left: 0; list-style: none; }
  .doc-steps li { display: flex; gap: 8pt; font-size: 10.5pt; line-height: 1.7; margin-bottom: 6pt; color: #1e293b; page-break-inside: avoid; }
  .doc-steps li .n { font-weight: 700; color: #0d9488; min-width: 14pt; }
  .doc-steps li .txt b { color: #0f172a; }
  @page { size: A4; margin: 0; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

function buildPrintHtml(doc: NurseDocument): string {
  const t = TYPE_META[doc.type] || { label: doc.type };
  const pages = paging.paginate(doc);
  const total = pages.length;
  const hasCover = doc.sections.some((s) => s.isCover);

  const sheets = pages
    .map((page, idx) => {
      const content = page.blocks
        .map((item) => {
          if (item.kind === 'title') {
            if (hasCover) return '';
            return `
            <div class="doc-title">${escapeHtml(doc.title)}</div>
            <div class="doc-subtitle">${escapeHtml(doc.subtitle || '')}</div>
            <div class="doc-meta">
              <div>Disusun oleh <b>${escapeHtml(doc.author)}</b></div>
              ${doc.ruangan ? `<div>Ruangan <b>${escapeHtml(doc.ruangan)}</b></div>` : ''}
              ${doc.clinicalTeacher ? `<div>Clinical Teacher <b>${escapeHtml(doc.clinicalTeacher)}</b></div>` : ''}
              ${doc.clinicalInstructor ? `<div>Clinical Instructor <b>${escapeHtml(doc.clinicalInstructor)}</b></div>` : ''}
              <div>${escapeHtml(doc.date)}</div>
            </div>`;
          }
          if (item.kind === 'section-header') {
            if (item.isCover) return '';
            const prefix = item.num ? `${escapeHtml(item.num)}.` : '';
            const isBab = /^BAB\s/i.test(item.heading);
            if (isBab) {
              return `<h2 class="doc-h2 doc-h2--bab" id="${escapeHtml(item.id)}">${prefix} ${escapeHtml(item.heading)}</h2>`;
            }
            return `<h2 class="doc-h2" id="${escapeHtml(item.id)}">${item.num ? `<span class="num">${prefix}</span>` : ''}${escapeHtml(item.heading)}</h2>`;
          }
          if (item.kind === 'block') {
            return renderDocBlockToHtml(item.block);
          }
          return '';
        })
        .join('');

      return `
      <div class="paper-sheet">
        <div class="page-header">
          <span>${escapeHtml(t.label)} — NURSEDOC</span>
          <span>${escapeHtml(doc.title.length > 44 ? doc.title.slice(0, 44) + '…' : doc.title)}</span>
        </div>
        <div class="doc-content">${content}</div>
        <div class="page-footer">
          <span>Dokumen digital · dirender oleh sistem</span>
          <span class="page-num">Hal. ${idx + 1} dari ${total}</span>
        </div>
      </div>`;
    })
    .join('');

  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>${escapeHtml(doc.title)}</title><style>${PRINT_CSS}</style></head><body><div class="paper-wrap">${sheets}</div></body></html>`;
}

let persistentIframe: HTMLIFrameElement | null = null;

export function printDocument(doc: NurseDocument): void {
  const html = buildPrintHtml(doc);

  // Try popup window first
  const w = window.open('', '_blank', 'width=1000,height=1300,menubar=no,toolbar=no,location=no,status=no');
  if (w) {
    try {
      w.document.open();
      w.document.write(html);
      w.document.close();
      const triggerPrint = () => {
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
      return;
    } catch (e) {
      console.warn('[print:popup]', e);
    }
  }

  // Fallback to persistent iframe
  if (!persistentIframe || !document.body.contains(persistentIframe)) {
    persistentIframe = document.createElement('iframe');
    persistentIframe.setAttribute('aria-hidden', 'true');
    persistentIframe.style.cssText =
      'position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none;';
    document.body.appendChild(persistentIframe);
  }

  const idoc = persistentIframe.contentDocument || persistentIframe.contentWindow?.document;
  if (idoc) {
    idoc.open();
    idoc.write(html);
    idoc.close();
    setTimeout(() => {
      try {
        persistentIframe?.contentWindow?.focus();
        persistentIframe?.contentWindow?.print();
      } catch (e) {
        console.error('[print:iframe]', e);
      }
    }, 300);
  }
}
