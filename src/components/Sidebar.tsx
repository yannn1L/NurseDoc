import React from 'react';
import { DoorOpen, Calendar, Sparkles } from 'lucide-react';
import { DocumentType, NurseDocument } from '../types';
import { TYPE_META } from '../data/types';
import { getColorScheme } from '../constants/theme';
import { getLucideIcon } from './DocIcon';

interface SidebarProps {
  documents: NurseDocument[];
  activeId: string | null;
  currentFilter: string;
  onSelectDoc: (id: string) => void;
  onSetFilter: (filter: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  activeId,
  currentFilter,
  onSelectDoc,
  onSetFilter,
}) => {
  const filteredDocs =
    currentFilter === 'all'
      ? documents
      : documents.filter((d) => d.type === currentFilter);

  return (
    <aside className="col-span-12 lg:col-span-3">
      <div className="sticky-wrap">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Perpustakaan Dokumen</h2>
          <span id="docCount" className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {filteredDocs.length} dokumen
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-1.5" data-region="filters">
          <button
            type="button"
            className={`filter-chip ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => onSetFilter('all')}
          >
            Semua
          </button>
          {(Object.entries(TYPE_META) as [DocumentType, (typeof TYPE_META)[DocumentType]][]).map(
            ([typeKey, meta]) => (
              <button
                key={typeKey}
                type="button"
                className={`filter-chip ${currentFilter === typeKey ? 'active' : ''}`}
                onClick={() => onSetFilter(typeKey)}
              >
                {meta.label}
              </button>
            )
          )}
        </div>

        {/* Document list */}
        <div className="space-y-2" data-region="sidebar">
          {filteredDocs.length === 0 ? (
            <div className="empty-state">Tidak ada dokumen.</div>
          ) : (
            filteredDocs.map((doc) => {
              const meta = TYPE_META[doc.type] || {
                label: '?',
                color: 'slate',
                icon: 'file',
                desc: '',
              };
              const colorClasses = getColorScheme(meta.color);
              const isActive = doc.id === activeId;

              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => onSelectDoc(doc.id)}
                  className={`doc-card ${isActive ? 'active' : ''}`}
                  data-doc={doc.id}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${colorClasses.bg} border ${colorClasses.border} grid place-items-center shrink-0 mt-0.5`}
                    >
                      {getLucideIcon(meta.icon, `w-3.5 h-3.5 ${colorClasses.iconText}`)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`text-[9.5px] font-bold uppercase tracking-wider ${colorClasses.badgeText} ${colorClasses.badgeBg} px-1.5 py-0.5 rounded`}
                      >
                        {meta.label}
                      </span>
                      <div className="text-[12.5px] font-semibold text-slate-800 leading-snug line-clamp-2 mt-1">
                        {doc.title}
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        {doc.ruangan && (
                          <span className="room-badge">
                            <DoorOpen className="w-2.5 h-2.5" />
                            {doc.ruangan}
                          </span>
                        )}
                        <span className="text-[10.5px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {doc.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Quick Tips */}
        <div className="tips-card">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 grid place-items-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-teal-900">Tips Cepat</p>
              <p className="text-[11px] text-teal-800/80 leading-relaxed mt-0.5">
                Gunakan <b>⌘K</b> untuk mencari lintas dokumen, dan <b>📄 Dokumen</b> untuk tampilan layout cetak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
