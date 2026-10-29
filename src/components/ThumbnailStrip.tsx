import React, { useState } from 'react';
import { PageSheet } from '../types';
import { THUMBNAIL_BLOCK_WIDTHS } from '../constants/weights';

interface ThumbnailStripProps {
  pages: PageSheet[];
}

export const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({ pages }) => {
  const [activePage, setActivePage] = useState<number>(1);

  const handlePageClick = (pageIdx: number) => {
    setActivePage(pageIdx);
    const target = document.getElementById(`page-${pageIdx}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="thumb-strip mb-4">
      {pages.map((page, idx) => {
        const pageNum = idx + 1;
        const lines: { type: 'title' | 'h' | 'p'; w?: number }[] = [];

        for (const item of page.blocks) {
          if (lines.length >= 8) break;
          if (item.kind === 'title') {
            lines.push({ type: 'title' });
          } else if (item.kind === 'section-header') {
            if (item.isCover) lines.push({ type: 'title' });
            else lines.push({ type: 'h' });
          } else if (item.kind === 'block') {
            const w = THUMBNAIL_BLOCK_WIDTHS[item.block.type] || THUMBNAIL_BLOCK_WIDTHS.default;
            lines.push({ type: 'p', w });
          }
        }

        const isActive = activePage === pageNum;

        return (
          <button
            key={pageNum}
            type="button"
            className={`thumb ${isActive ? 'active' : ''}`}
            onClick={() => handlePageClick(pageNum)}
            title={`Halaman ${pageNum}`}
          >
            <div className="thumb-frame">
              <div className="thumb-mini-h w80"></div>
              {lines.map((l, i) => {
                if (l.type === 'title') {
                  return (
                    <div key={i} className="thumb-title-block">
                      <div className="thumb-title-line"></div>
                      <div className="thumb-title-sub"></div>
                    </div>
                  );
                }
                if (l.type === 'h') {
                  return <div key={i} className="thumb-mini-h w60"></div>;
                }
                return <div key={i} className={`thumb-mini-line w${l.w || 80}`}></div>;
              })}
            </div>
            <div className="thumb-num">Hal. {pageNum}</div>
          </button>
        );
      })}
    </div>
  );
};
