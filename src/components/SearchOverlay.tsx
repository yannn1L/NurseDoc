import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { SearchHit } from '../types';
import { TYPE_META } from '../data/types';
import { searchEngine } from '../utils/search';
import { getColorScheme } from '../constants/theme';
import { APP_CONFIG } from '../constants/app';
import { getLucideIcon } from './DocIcon';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (docId: string, sectionId: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hits: SearchHit[] = query ? searchEngine.query(query) : [];

  return (
    <div className="search-overlay" data-region="overlay">
      <div className="search-backdrop" onClick={onClose}></div>
      <div className="search-panel">
        <div className="search-input-row">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            id="overlaySearch"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={APP_CONFIG.searchModalPlaceholder}
            autoComplete="off"
          />
          <kbd
            className="text-[10px] text-slate-400 bg-slate-100 rounded px-1.5 py-0.5 cursor-pointer"
            onClick={onClose}
          >
            ESC
          </kbd>
        </div>

        <div className="search-results">
          {!query ? (
            <div className="empty-state">Mulai ketik untuk mencari…</div>
          ) : hits.length === 0 ? (
            <div className="empty-state">
              Tidak ada hasil untuk "<b>{query}</b>"
            </div>
          ) : (
            hits.map((h) => {
              const meta = TYPE_META[h.type] || {
                label: '?',
                color: 'slate',
                icon: 'file',
                desc: '',
              };
              const colorClasses = getColorScheme(meta.color);

              return (
                <button
                  key={`${h.docId}-${h.sectionId}`}
                  type="button"
                  className="search-result"
                  onClick={() => onSelectResult(h.docId, h.sectionId)}
                  data-goto={`${h.docId}|${h.sectionId}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${colorClasses.bg} border ${colorClasses.border} grid place-items-center shrink-0`}
                  >
                    {getLucideIcon(meta.icon, `w-3.5 h-3.5 ${colorClasses.iconText}`)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-slate-500 mb-0.5">
                      {meta.label} · {h.docTitle.slice(0, 50)}…
                      {h.ruangan ? ` · ${h.ruangan}` : ''}
                    </div>
                    <div className="text-[13px] font-semibold text-slate-900">{h.heading}</div>
                    <div className="text-[11.5px] text-slate-500 line-clamp-2 mt-0.5">
                      {h.preview}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
