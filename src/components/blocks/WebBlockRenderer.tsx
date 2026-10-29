import React from 'react';
import { ShieldAlert, AlertCircle, Info } from 'lucide-react';
import {
  ContentBlock,
  CoverBlock,
  SectionBlock,
  HeadingBlock,
  SubheadingBlock,
  SubsubsectionBlock,
  ParagraphBlock,
  ListBlock,
  StepsBlock,
  TableBlock,
  IdentityBlock,
  PathwayBlock,
  BibliographyBlock,
  AnalysisBlock,
  QuoteBlock,
  CalloutBlock,
  DiagnosaBlock,
  SoapBlock,
} from '../../types';

export const WebCoverBlock: React.FC<{ block: CoverBlock }> = ({ block }) => (
  <div className="py-12 text-center border-b border-slate-200 mb-8">
    {block.header && (
      <div className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider leading-relaxed whitespace-pre-line mb-6">
        {block.header}
      </div>
    )}
    {block.category && (
      <div className="inline-block px-4 py-1.5 bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-6">
        {block.category}
      </div>
    )}
    <h1 className="text-[26px] font-bold text-slate-900 leading-tight max-w-2xl mx-auto mb-8">
      {block.judul}
    </h1>
    {block.penyusun && block.penyusun.length > 0 && (
      <div className="inline-block text-left bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 mb-8">
        <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center mb-3">
          Disusun oleh
        </div>
        {block.penyusun.map((p, pi) => (
          <div key={pi} className="flex gap-3 text-[12.5px] mb-1">
            <span className="text-slate-500 w-20 shrink-0">{p.label}</span>
            <span className="text-slate-800 font-semibold">: {p.value}</span>
          </div>
        ))}
      </div>
    )}
    {block.footer && (
      <div className="text-[12px] font-semibold text-slate-700 uppercase tracking-wider leading-relaxed whitespace-pre-line">
        {block.footer}
      </div>
    )}
  </div>
);

export const WebSectionBlock: React.FC<{ block: SectionBlock }> = ({ block }) => (
  <h3 className="text-[16px] font-bold text-slate-900 mt-6 mb-3 flex items-baseline gap-2">
    {block.num && <span className="text-teal-600">{block.num}.</span>}
    {block.heading}
  </h3>
);

export const WebHeadingBlock: React.FC<{ block: HeadingBlock }> = ({ block }) => (
  <h4 className="text-[14px] font-bold text-slate-900 mt-5 mb-2 flex items-baseline gap-2">
    {block.num && <span className="text-slate-500">{block.num}.</span>}
    {block.text}
  </h4>
);

export const WebSubheadingBlock: React.FC<{ block: SubheadingBlock }> = ({ block }) => (
  <h4 className="text-[13px] font-semibold text-slate-900 mt-4 mb-1 flex items-center gap-2">
    <span className="w-1 h-3 bg-teal-500 rounded-full"></span>
    {block.text}
  </h4>
);

export const WebSubsubsectionBlock: React.FC<{ block: SubsubsectionBlock }> = ({ block }) => (
  <h5 className="text-[13px] font-semibold text-slate-800 mt-4 mb-1.5">
    {block.num && <span className="text-slate-500">{block.num}. </span>}
    {block.text}
  </h5>
);

export const WebParagraphBlock: React.FC<{ block: ParagraphBlock }> = ({ block }) => (
  <p className="text-[14.5px] text-slate-700 leading-relaxed">{block.text}</p>
);

export const WebListBlock: React.FC<{ block: ListBlock }> = ({ block }) => (
  <ul className="space-y-1.5 mt-1">
    {block.items.map((item, i) => (
      <li key={i} className="text-[14px] text-slate-700 flex gap-2.5 leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0"></span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const WebStepsBlock: React.FC<{ block: StepsBlock }> = ({ block }) => (
  <ol className="space-y-3 mt-1">
    {block.items.map((s, i) => (
      <li key={i} className="flex gap-3">
        <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold grid place-items-center shrink-0 mt-0.5">
          {i + 1}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-900">{s.step}</div>
          <div className="text-[13px] text-slate-600 leading-relaxed">{s.text}</div>
        </div>
      </li>
    ))}
  </ol>
);

export const WebTableBlock: React.FC<{ block: TableBlock }> = ({ block }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
    <table className="w-full text-[13px]">
      <thead>
        <tr>
          {block.headers.map((h, i) => (
            <th
              key={i}
              className="text-left font-semibold text-slate-700 px-3.5 py-2.5 border-b border-slate-200 whitespace-nowrap bg-slate-50/70"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row, rIdx) => (
          <tr
            key={rIdx}
            className="hover:bg-slate-50/70 transition border-b border-slate-100 last:border-b-0"
          >
            {row.map((cell, cIdx) => (
              <td
                key={cIdx}
                className={`px-3.5 py-2.5 text-slate-600 align-top ${
                  cIdx === 0 ? 'font-medium text-slate-800' : ''
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const WebIdentityBlock: React.FC<{ block: IdentityBlock }> = ({ block }) => (
  <div className="mt-2 bg-slate-50/60 border border-slate-200 rounded-xl p-5">
    {block.title && (
      <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-3">
        {block.title}
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-[13px]">
      {block.fields.map((f, fi) => (
        <div key={fi} className="flex gap-3 border-b border-slate-200/60 pb-1.5">
          <span className="text-slate-500 w-36 shrink-0">{f.label}</span>
          <span className="text-slate-800 font-medium">: {f.value || ' '}</span>
        </div>
      ))}
    </div>
  </div>
);

export const WebPathwayBlock: React.FC<{ block: PathwayBlock }> = ({ block }) => (
  <div className="mt-3 bg-white border border-slate-200 rounded-xl p-6">
    {block.title && (
      <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-4 text-center">
        {block.title}
      </div>
    )}
    <div className="flex flex-col items-center gap-0">
      {block.steps.map((s, si) => (
        <div key={si} className="w-full max-w-md">
          <div
            className={`px-4 py-2.5 rounded-lg border-2 ${
              s.highlight
                ? 'border-rose-300 bg-rose-50 text-rose-900'
                : 'border-teal-200 bg-teal-50/50 text-teal-900'
            } text-[12.5px] font-medium text-center`}
          >
            {s.text}
          </div>
          {si < block.steps.length - 1 && (
            <div className="text-center text-slate-300 my-1">↓</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const WebBibliographyBlock: React.FC<{ block: BibliographyBlock }> = ({ block }) => (
  <div className="mt-2 space-y-3">
    {block.items.map((ref, ri) => (
      <div
        key={ri}
        className="flex gap-3 text-[13px] text-slate-700 leading-relaxed pl-6 -indent-6"
      >
        <span className="font-semibold text-slate-500 shrink-0">{ri + 1}.</span>
        <span>{ref}</span>
      </div>
    ))}
  </div>
);

export const WebAnalysisBlock: React.FC<{ block: AnalysisBlock }> = ({ block }) => (
  <div className="mt-3 border border-slate-200 rounded-xl overflow-hidden">
    <div className="px-4 py-2.5 bg-gradient-to-r from-teal-50 to-white border-b border-slate-200">
      <div className="text-[11px] uppercase tracking-widest text-teal-700 font-bold">
        {block.title || 'Analisa'}
      </div>
    </div>
    <div className="divide-y divide-slate-100">
      {(block.items || []).map((it, ii) => (
        <div key={ii} className="p-4">
          <div className="text-[12.5px] font-bold text-slate-900 mb-1.5">{it.label}</div>
          <div className="text-[13px] text-slate-600 leading-relaxed mb-2">{it.content}</div>
          {it.rationale && (
            <div className="mt-2 pl-3 border-l-2 border-teal-400 bg-teal-50/40 py-2 pr-3 rounded-r">
              <div className="text-[10px] uppercase tracking-widest text-teal-700 font-bold mb-0.5">
                Rasional
              </div>
              <div className="text-[12.5px] text-teal-900 italic leading-relaxed">
                {it.rationale}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const WebQuoteBlock: React.FC<{ block: QuoteBlock }> = ({ block }) => (
  <blockquote className="mt-3 pl-4 border-l-2 border-teal-400 bg-teal-50/40 py-3 pr-3 rounded-r-lg">
    <p className="text-[13.5px] text-teal-900 italic font-serif leading-relaxed">
      "{block.text}"
    </p>
  </blockquote>
);

export const WebCalloutBlock: React.FC<{ block: CalloutBlock }> = ({ block }) => {
  const isWarning = block.variant === 'warning';
  return (
    <div
      className={`mt-3 flex gap-3 p-3.5 rounded-xl border ${
        isWarning
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-sky-50 border-sky-200 text-sky-900'
      }`}
    >
      {isWarning ? (
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
      ) : block.icon === 'alert-circle' ? (
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      ) : (
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
      )}
      <p className="text-[13px] leading-relaxed">{block.text}</p>
    </div>
  );
};

export const WebDiagnosaBlock: React.FC<{ block: DiagnosaBlock }> = ({ block }) => (
  <div className="mt-2.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-teal-200 hover:shadow-sm transition">
    {block.priority && (
      <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
        {block.priority}
      </span>
    )}
    <div className="text-[14px] font-semibold text-slate-900 mt-1.5">{block.title}</div>
    {block.detail && (
      <p className="text-[13px] text-slate-600 leading-relaxed mt-1">{block.detail}</p>
    )}
  </div>
);

export const WebSoapBlock: React.FC<{ block: SoapBlock }> = ({ block }) => (
  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
    <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-md bg-sky-500 text-white text-[10px] font-bold grid place-items-center">
          S
        </span>
        <span className="text-[11px] font-semibold text-sky-900 uppercase tracking-wide">
          Data Subjektif
        </span>
      </div>
      <p className="text-[12.5px] text-slate-700 leading-relaxed">{block.s}</p>
    </div>

    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-md bg-purple-500 text-white text-[10px] font-bold grid place-items-center">
          O
        </span>
        <span className="text-[11px] font-semibold text-purple-900 uppercase tracking-wide">
          Data Objektif
        </span>
      </div>
      <p className="text-[12.5px] text-slate-700 leading-relaxed">{block.o}</p>
    </div>

    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-md bg-amber-500 text-white text-[10px] font-bold grid place-items-center">
          A
        </span>
        <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide">
          Analisis
        </span>
      </div>
      <p className="text-[12.5px] text-slate-700 leading-relaxed">{block.a}</p>
    </div>

    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-md bg-emerald-500 text-white text-[10px] font-bold grid place-items-center">
          P
        </span>
        <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wide">
          Perencanaan
        </span>
      </div>
      <p className="text-[12.5px] text-slate-700 leading-relaxed">{block.p}</p>
    </div>
  </div>
);

export const WebBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'cover':
      return <WebCoverBlock block={block} />;
    case 'section':
      return <WebSectionBlock block={block} />;
    case 'heading':
      return <WebHeadingBlock block={block} />;
    case 'subheading':
      return <WebSubheadingBlock block={block} />;
    case 'subsubsection':
      return <WebSubsubsectionBlock block={block} />;
    case 'paragraph':
      return <WebParagraphBlock block={block} />;
    case 'list':
      return <WebListBlock block={block} />;
    case 'steps':
      return <WebStepsBlock block={block} />;
    case 'table':
      return <WebTableBlock block={block} />;
    case 'identity':
      return <WebIdentityBlock block={block} />;
    case 'pathway':
      return <WebPathwayBlock block={block} />;
    case 'bibliography':
      return <WebBibliographyBlock block={block} />;
    case 'analysis':
      return <WebAnalysisBlock block={block} />;
    case 'quote':
      return <WebQuoteBlock block={block} />;
    case 'callout':
      return <WebCalloutBlock block={block} />;
    case 'diagnosa':
      return <WebDiagnosaBlock block={block} />;
    case 'soap':
      return <WebSoapBlock block={block} />;
    default:
      return null;
  }
};
