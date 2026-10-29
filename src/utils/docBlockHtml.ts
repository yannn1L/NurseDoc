import { ContentBlock } from '../types';

export function escapeHtml(str: any): string {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderDocBlockToHtml(b: ContentBlock): string {
  switch (b.type) {
    case 'cover':
      return `
      <div class="doc-cover">
        ${b.header ? `<div class="doc-cover-header">${escapeHtml(b.header).replace(/\n/g, '<br>')}</div>` : ''}
        ${b.category ? `<div class="doc-cover-category">${escapeHtml(b.category)}</div>` : ''}
        <div class="doc-cover-title">${escapeHtml(b.judul)}</div>
        ${
          b.penyusun?.length
            ? `
          <div class="doc-cover-penyusun">
            <div class="doc-cover-penyusun-label">Disusun oleh:</div>
            ${b.penyusun
              .map(
                (p) => `
              <div class="doc-cover-penyusun-row">
                <span class="k">${escapeHtml(p.label)}</span>
                <span class="v">: ${escapeHtml(p.value)}</span>
              </div>`
              )
              .join('')}
          </div>`
            : ''
        }
        ${b.footer ? `<div class="doc-cover-footer">${escapeHtml(b.footer).replace(/\n/g, '<br>')}</div>` : ''}
      </div>`;

    case 'section':
      return `<h3 class="doc-section">${b.num ? `<span class="num">${escapeHtml(b.num)}.</span> ` : ''}${escapeHtml(b.heading)}</h3>`;

    case 'heading':
      return `<h4 class="doc-heading">${b.num ? `<span class="num">${escapeHtml(b.num)}.</span> ` : ''}${escapeHtml(b.text)}</h4>`;

    case 'subheading':
      return `<h4 class="doc-heading">${escapeHtml(b.text)}</h4>`;

    case 'subsubsection':
      return `<h5 class="doc-subsubsection">${b.num ? `<span class="num">${escapeHtml(b.num)}.</span> ` : ''}${escapeHtml(b.text)}</h5>`;

    case 'paragraph':
      return `<p class="doc-p">${escapeHtml(b.text)}</p>`;

    case 'list':
      return `<ul class="doc-ul">${(b.items || []).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`;

    case 'steps':
      return `<ol class="doc-steps">${(b.items || [])
        .map(
          (s, i) =>
            `<li><span class="n">${i + 1}.</span><span class="txt"><b>${escapeHtml(s.step)}.</b> ${escapeHtml(s.text)}</span></li>`
        )
        .join('')}</ol>`;

    case 'table':
      return `<table class="doc-table"><thead><tr>${(b.headers || []).map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${(b.rows || []).map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

    case 'identity':
      return `
      <table class="doc-identity">
        ${b.title ? `<caption>${escapeHtml(b.title)}</caption>` : ''}
        <tbody>
          ${(b.fields || [])
            .map(
              (f) => `
            <tr>
              <th>${escapeHtml(f.label)}</th>
              <td>: ${escapeHtml(f.value || ' ')}</td>
            </tr>`
            )
            .join('')}
        </tbody>
      </table>`;

    case 'pathway':
      return `
      <div class="doc-pathway">
        ${b.title ? `<div class="pathway-title">${escapeHtml(b.title)}</div>` : ''}
        <div class="pathway-steps">
          ${(b.steps || [])
            .map(
              (s, i) => `
            <div class="pathway-step ${s.highlight ? 'highlight' : ''}">${escapeHtml(s.text)}</div>
            ${i < b.steps.length - 1 ? `<div class="pathway-arrow">↓</div>` : ''}
          `
            )
            .join('')}
        </div>
      </div>`;

    case 'bibliography':
      return `
      <div class="doc-bibliography">
        ${(b.items || [])
          .map(
            (ref, i) => `
          <div class="bib-item">
            <span class="n">${i + 1}.</span>
            <span class="ref">${escapeHtml(ref)}</span>
          </div>`
          )
          .join('')}
      </div>`;

    case 'analysis':
      return `
      <div class="doc-analysis">
        <div class="analysis-head">${escapeHtml(b.title || 'Analisa')}</div>
        ${(b.items || [])
          .map(
            (it) => `
          <div class="analysis-item">
            <div class="analysis-label">${escapeHtml(it.label)}</div>
            <div class="analysis-content">${escapeHtml(it.content)}</div>
            ${
              it.rationale
                ? `
              <div class="analysis-rationale">
                <span class="rsn-label">Rasional: </span>${escapeHtml(it.rationale)}
              </div>`
                : ''
            }
          </div>`
          )
          .join('')}
      </div>`;

    case 'quote':
      return `<blockquote class="doc-quote">"${escapeHtml(b.text)}"</blockquote>`;

    case 'callout':
      return `<div class="doc-callout ${b.variant === 'warning' ? 'warning' : ''}"><span style="font-weight:700;">!</span><span>${escapeHtml(b.text)}</span></div>`;

    case 'diagnosa':
      return `<div class="doc-diagnosa"><div class="label">${escapeHtml(b.priority || '')}</div><div class="title">${escapeHtml(b.title)}</div><div class="detail">${escapeHtml(b.detail || '')}</div></div>`;

    case 'soap':
      return `<div class="doc-soap">${[
        ['S', 'Subjektif', b.s],
        ['O', 'Objektif', b.o],
        ['A', 'Analisis', b.a],
        ['P', 'Perencanaan', b.p],
      ]
        .map(
          ([k, l, v]) =>
            `<div class="soap-item"><span class="k">${k}</span><div><span class="lbl">${l}</span>${escapeHtml(v)}</div></div>`
        )
        .join('')}</div>`;

    default:
      return '';
  }
}
