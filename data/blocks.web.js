/* ============================================================
   BLOCKS (WEB) — renderer blok untuk Web View
   Format: { validate, weight, render }
============================================================ */
import { esc } from '../core/dom.js';

export const webBlocks = {
    paragraph: {
        validate: (b) => typeof b.text === 'string',
        weight: (b) => Math.max(20, Math.ceil((b.text?.length || 0) / 5)),
        render: (b) => `<p class="text-[14.5px] text-slate-700 leading-relaxed">${esc(b.text)}</p>`,
    },
    
    subheading: {
        validate: (b) => typeof b.text === 'string',
        weight: () => 25,
        render: (b) => `<h4 class="text-[13px] font-semibold text-slate-900 mt-4 mb-1 flex items-center gap-2">
      <span class="w-1 h-3 bg-brand-500 rounded-full"></span>${esc(b.text)}</h4>`,
    },
    
    list: {
        validate: (b) => Array.isArray(b.items),
        weight: (b) => 15 + b.items.length * 22,
        render: (b) => `<ul class="space-y-1.5 mt-1">
      ${b.items.map(t=>`<li class="text-[14px] text-slate-700 flex gap-2.5 leading-relaxed">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0"></span><span>${esc(t)}</span></li>`).join('')}
    </ul>`,
    },
    
    steps: {
        validate: (b) => Array.isArray(b.items),
        weight: (b) => 30 + b.items.length * 55,
        render: (b) => `<ol class="space-y-3 mt-1">
      ${b.items.map((s,i)=>`
        <li class="flex gap-3">
          <div class="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[11px] font-bold grid place-items-center shrink-0 mt-0.5">${i+1}</div>
          <div>
            <div class="text-[13px] font-semibold text-slate-900">${esc(s.step)}</div>
            <div class="text-[13px] text-slate-600 leading-relaxed">${esc(s.text)}</div>
          </div>
        </li>`).join('')}
    </ol>`,
    },
    
    table: {
        validate: (b) => Array.isArray(b.headers) && Array.isArray(b.rows),
        weight: (b) => 40 + b.rows.length * 40,
        render: (b) => `
      <div class="overflow-x-auto rounded-xl border border-slate-200 mt-2">
        <table class="w-full text-[13px]">
          <thead><tr>${b.headers.map(h=>`<th class="text-left font-semibold text-slate-700 px-3.5 py-2.5 border-b border-slate-200 whitespace-nowrap">${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${b.rows.map(r=>`<tr class="hover:bg-slate-50/70 transition">
            ${r.map((c,i)=>`<td class="px-3.5 py-2.5 text-slate-600 align-top ${i===0?'font-medium text-slate-800':''}">${esc(c)}</td>`).join('')}
          </tr>`).join('')}</tbody>
        </table>
      </div>`,
    },
    
    quote: {
        validate: (b) => typeof b.text === 'string',
        weight: () => 60,
        render: (b) => `<blockquote class="mt-3 pl-4 border-l-2 border-brand-400 bg-brand-50/40 py-3 pr-3 rounded-r-lg">
      <p class="text-[13.5px] text-brand-900 italic font-serif leading-relaxed">"${esc(b.text)}"</p>
    </blockquote>`,
    },
    
    callout: {
        validate: (b) => typeof b.text === 'string',
        weight: () => 55,
        render: (b) => {
            const v = b.variant === 'warning' ?
                'bg-amber-50 border-amber-200 text-amber-900' :
                'bg-sky-50 border-sky-200 text-sky-900';
            return `<div class="mt-3 flex gap-3 p-3.5 rounded-xl border ${v}">
        <i data-lucide="${esc(b.icon||'info')}" class="w-4 h-4 shrink-0 mt-0.5"></i>
        <p class="text-[13px] leading-relaxed">${esc(b.text)}</p>
      </div>`;
        },
    },
    
    diagnosa: {
        validate: (b) => typeof b.title === 'string',
        weight: () => 90,
        render: (b) => `<div class="mt-2.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-200 hover:shadow-sm transition">
      <span class="text-[10px] font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 px-2 py-0.5 rounded">${esc(b.priority||'')}</span>
      <div class="text-[14px] font-semibold text-slate-900 mt-1.5">${esc(b.title)}</div>
      <p class="text-[13px] text-slate-600 leading-relaxed mt-1">${esc(b.detail||'')}</p>
    </div>`,
    },
    
    soap: {
        validate: (b) => b.s && b.o && b.a && b.p,
        weight: () => 130,
        render: (b) => `<div class="mt-2 grid grid-cols-2 gap-2.5">
      ${[['S','Data Subjektif',b.s,'sky'],['O','Data Objektif',b.o,'violet'],['A','Analisis',b.a,'amber'],['P','Perencanaan',b.p,'emerald']]
        .map(([k,label,val,c])=>`
        <div class="p-3 rounded-xl bg-${c}-50/60 border border-${c}-100">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-5 h-5 rounded-md bg-${c}-500 text-white text-[10px] font-bold grid place-items-center">${k}</span>
            <span class="text-[11px] font-semibold text-${c}-900 uppercase tracking-wide">${label}</span>
          </div>
          <p class="text-[12.5px] text-slate-700 leading-relaxed">${esc(val)}</p>
        </div>`).join('')}
    </div>`,
    },
};