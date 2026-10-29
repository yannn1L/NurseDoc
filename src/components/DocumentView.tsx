import React from 'react';
import { NurseDocument, PageSheet } from '../types';
import { TYPE_META } from '../data/types';
import { DocBlockRenderer } from './blocks/DocBlockRenderer';

interface DocumentViewProps {
  document: NurseDocument;
  pages: PageSheet[];
}

export const DocumentView: React.FC<DocumentViewProps> = ({ document: doc, pages }) => {
  const meta = TYPE_META[doc.type] || { label: 'DOKUMEN' };
  const total = pages.length;
  const hasCover = doc.sections.some((s) => s.isCover);

  return (
    <div className="paper-wrap fade-in">
      {pages.map((page, idx) => {
        const pageNum = idx + 1;
        return (
          <div key={pageNum} id={`page-${pageNum}`} className="paper-sheet">
            {/* Page Header */}
            <div className="page-header">
              <span>{meta.label} — NURSEDOC</span>
              <span>
                {doc.title.length > 44 ? doc.title.slice(0, 44) + '…' : doc.title}
              </span>
            </div>

            {/* Page Content */}
            <div className="doc-content">
              {page.blocks.map((item, itemIdx) => {
                if (item.kind === 'title') {
                  if (hasCover) return null;
                  return (
                    <React.Fragment key={`title-${itemIdx}`}>
                      <div className="doc-title">{doc.title}</div>
                      {doc.subtitle && <div className="doc-subtitle">{doc.subtitle}</div>}
                      <div className="doc-meta">
                        <div>
                          Disusun oleh <b>{doc.author}</b>
                        </div>
                        {doc.ruangan && (
                          <div>
                            Ruangan <b>{doc.ruangan}</b>
                          </div>
                        )}
                        {doc.clinicalTeacher && (
                          <div>
                            Clinical Teacher <b>{doc.clinicalTeacher}</b>
                          </div>
                        )}
                        {doc.clinicalInstructor && (
                          <div>
                            Clinical Instructor <b>{doc.clinicalInstructor}</b>
                          </div>
                        )}
                        <div>{doc.date}</div>
                      </div>
                    </React.Fragment>
                  );
                }

                if (item.kind === 'section-header') {
                  if (item.isCover) return null;
                  const prefix = item.num ? `${item.num}.` : '';
                  const isBab = /^BAB\s/i.test(item.heading);
                  if (isBab) {
                    return (
                      <h2 key={`sh-${item.id}`} id={item.id} className="doc-h2 doc-h2--bab">
                        {prefix} {item.heading}
                      </h2>
                    );
                  }
                  return (
                    <h2 key={`sh-${item.id}`} id={item.id} className="doc-h2">
                      {item.num ? <span className="num">{prefix} </span> : null}
                      {item.heading}
                    </h2>
                  );
                }

                if (item.kind === 'block') {
                  return (
                    <DocBlockRenderer key={`block-${itemIdx}`} block={item.block} />
                  );
                }

                return null;
              })}
            </div>

            {/* Page Footer */}
            <div className="page-footer">
              <span>Dokumen digital · dirender oleh sistem</span>
              <span className="page-num">
                Hal. {pageNum} dari {total}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
