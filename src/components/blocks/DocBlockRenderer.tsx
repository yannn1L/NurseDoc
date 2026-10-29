import React from 'react';
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

export const DocCoverBlock: React.FC<{ block: CoverBlock }> = ({ block }) => (
  <div className="doc-cover">
    {block.header && (
      <div className="doc-cover-header">
        {block.header.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    )}
    {block.category && <div className="doc-cover-category">{block.category}</div>}
    <div className="doc-cover-title">{block.judul}</div>
    {block.penyusun && block.penyusun.length > 0 && (
      <div className="doc-cover-penyusun">
        <div className="doc-cover-penyusun-label">Disusun oleh:</div>
        {block.penyusun.map((p, pi) => (
          <div key={pi} className="doc-cover-penyusun-row">
            <span className="k">{p.label}</span>
            <span className="v">: {p.value}</span>
          </div>
        ))}
      </div>
    )}
    {block.footer && (
      <div className="doc-cover-footer">
        {block.footer.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    )}
  </div>
);

export const DocSectionBlock: React.FC<{ block: SectionBlock }> = ({ block }) => (
  <h3 className="doc-section">
    {block.num && <span className="num">{block.num}. </span>}
    {block.heading}
  </h3>
);

export const DocHeadingBlock: React.FC<{ block: HeadingBlock }> = ({ block }) => (
  <h4 className="doc-heading">
    {block.num && <span className="num">{block.num}. </span>}
    {block.text}
  </h4>
);

export const DocSubheadingBlock: React.FC<{ block: SubheadingBlock }> = ({ block }) => (
  <h4 className="doc-heading">{block.text}</h4>
);

export const DocSubsubsectionBlock: React.FC<{ block: SubsubsectionBlock }> = ({ block }) => (
  <h5 className="doc-subsubsection">
    {block.num && <span className="num">{block.num}. </span>}
    {block.text}
  </h5>
);

export const DocParagraphBlock: React.FC<{ block: ParagraphBlock }> = ({ block }) => (
  <p className="doc-p">{block.text}</p>
);

export const DocListBlock: React.FC<{ block: ListBlock }> = ({ block }) => (
  <ul className="doc-ul">
    {block.items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export const DocStepsBlock: React.FC<{ block: StepsBlock }> = ({ block }) => (
  <ol className="doc-steps">
    {block.items.map((s, i) => (
      <li key={i}>
        <span className="n">{i + 1}.</span>
        <span className="txt">
          <b>{s.step}.</b> {s.text}
        </span>
      </li>
    ))}
  </ol>
);

export const DocTableBlock: React.FC<{ block: TableBlock }> = ({ block }) => (
  <table className="doc-table">
    <thead>
      <tr>
        {block.headers.map((h, i) => (
          <th key={i}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {block.rows.map((row, rIdx) => (
        <tr key={rIdx}>
          {row.map((cell, cIdx) => (
            <td key={cIdx}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const DocIdentityBlock: React.FC<{ block: IdentityBlock }> = ({ block }) => (
  <table className="doc-identity">
    {block.title && <caption>{block.title}</caption>}
    <tbody>
      {block.fields.map((f, fi) => (
        <tr key={fi}>
          <th>{f.label}</th>
          <td>: {f.value || ' '}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const DocPathwayBlock: React.FC<{ block: PathwayBlock }> = ({ block }) => (
  <div className="doc-pathway">
    {block.title && <div className="pathway-title">{block.title}</div>}
    <div className="pathway-steps">
      {block.steps.map((s, si) => (
        <React.Fragment key={si}>
          <div className={`pathway-step ${s.highlight ? 'highlight' : ''}`}>{s.text}</div>
          {si < block.steps.length - 1 && <div className="pathway-arrow">↓</div>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const DocBibliographyBlock: React.FC<{ block: BibliographyBlock }> = ({ block }) => (
  <div className="doc-bibliography">
    {block.items.map((ref, ri) => (
      <div key={ri} className="bib-item">
        <span className="n">{ri + 1}.</span>
        <span className="ref">{ref}</span>
      </div>
    ))}
  </div>
);

export const DocAnalysisBlock: React.FC<{ block: AnalysisBlock }> = ({ block }) => (
  <div className="doc-analysis">
    <div className="analysis-head">{block.title || 'Analisa'}</div>
    {(block.items || []).map((it, ii) => (
      <div key={ii} className="analysis-item">
        <div className="analysis-label">{it.label}</div>
        <div className="analysis-content">{it.content}</div>
        {it.rationale && (
          <div className="analysis-rationale">
            <span className="rsn-label">Rasional: </span>
            {it.rationale}
          </div>
        )}
      </div>
    ))}
  </div>
);

export const DocQuoteBlock: React.FC<{ block: QuoteBlock }> = ({ block }) => (
  <blockquote className="doc-quote">"{block.text}"</blockquote>
);

export const DocCalloutBlock: React.FC<{ block: CalloutBlock }> = ({ block }) => (
  <div className={`doc-callout ${block.variant === 'warning' ? 'warning' : ''}`}>
    <span style={{ fontWeight: 700 }}>!</span>
    <span>{block.text}</span>
  </div>
);

export const DocDiagnosaBlock: React.FC<{ block: DiagnosaBlock }> = ({ block }) => (
  <div className="doc-diagnosa">
    {block.priority && <div className="label">{block.priority}</div>}
    <div className="title">{block.title}</div>
    {block.detail && <div className="detail">{block.detail}</div>}
  </div>
);

export const DocSoapBlock: React.FC<{ block: SoapBlock }> = ({ block }) => (
  <div className="doc-soap">
    {[
      ['S', 'Subjektif', block.s],
      ['O', 'Objektif', block.o],
      ['A', 'Analisis', block.a],
      ['P', 'Perencanaan', block.p],
    ].map(([k, l, v]) => (
      <div key={k} className="soap-item">
        <span className="k">{k}</span>
        <div>
          <span className="lbl">{l}</span>
          {v}
        </div>
      </div>
    ))}
  </div>
);

export const DocBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'cover':
      return <DocCoverBlock block={block} />;
    case 'section':
      return <DocSectionBlock block={block} />;
    case 'heading':
      return <DocHeadingBlock block={block} />;
    case 'subheading':
      return <DocSubheadingBlock block={block} />;
    case 'subsubsection':
      return <DocSubsubsectionBlock block={block} />;
    case 'paragraph':
      return <DocParagraphBlock block={block} />;
    case 'list':
      return <DocListBlock block={block} />;
    case 'steps':
      return <DocStepsBlock block={block} />;
    case 'table':
      return <DocTableBlock block={block} />;
    case 'identity':
      return <DocIdentityBlock block={block} />;
    case 'pathway':
      return <DocPathwayBlock block={block} />;
    case 'bibliography':
      return <DocBibliographyBlock block={block} />;
    case 'analysis':
      return <DocAnalysisBlock block={block} />;
    case 'quote':
      return <DocQuoteBlock block={block} />;
    case 'callout':
      return <DocCalloutBlock block={block} />;
    case 'diagnosa':
      return <DocDiagnosaBlock block={block} />;
    case 'soap':
      return <DocSoapBlock block={block} />;
    default:
      return null;
  }
};
