/* ============================================================
   BLOCKS (DOC) — renderer blok untuk Dokumen View (paper)
============================================================ */
import { esc } from '../core/dom.js';

export const docBlocks = {
    paragraph: {
        render: (b) => `<p class="doc-p">${esc(b.text)}</p>`,
    },
    subheading: {
        render: (b) => `<h3 class="doc-h3">${esc(b.text)}</h3>`,
    },
    list: {
        render: (b) => `<ul class="doc-ul">${b.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`,
    },
    steps: {
        render: (b) => `<ol class="doc-steps">
      ${b.items.map((s,i)=>`<li>
        <span class="n">${i+1}.</span>
        <span class="txt"><b>${esc(s.step)}.</b> ${esc(s.text)}</span>
      </li>`).join('')}
    </ol>`,
    },
    table: {
        render: (b) => `<table class="doc-table">
      <thead><tr>${b.headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>`,
    },
    quote: {
        render: (b) => `<blockquote class="doc-quote">"${esc(b.text)}"</blockquote>`,
    },
    callout: {
        render: (b) => `<div class="doc-callout ${b.variant==='warning'?'warning':''}">
      <span style="font-family:Inter,sans-serif; font-weight:700; font-size:13px; line-height:1.4;">!</span>
      <span>${esc(b.text)}</span>
    </div>`,
    },
    diagnosa: {
        render: (b) => `<div class="doc-diagnosa">
      <div class="label">${esc(b.priority||'')}</div>
      <div class="title">${esc(b.title)}</div>
      <div class="detail">${esc(b.detail||'')}</div>
    </div>`,
    },
    soap: {
        render: (b) => `<div class="doc-soap">
      ${[['S','Subjektif',b.s],['O','Objektif',b.o],['A','Analisis',b.a],['P','Perencanaan',b.p]]
        .map(([k,l,v])=>`<div class="soap-item">
          <span class="k">${k}</span>
          <div><span class="lbl">${l}</span>${esc(v)}</div>
        </div>`).join('')}
    </div>`,
    },
};