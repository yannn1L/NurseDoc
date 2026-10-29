import React from 'react';
import { Eye, LayoutDashboard, FileText, ChevronRight } from 'lucide-react';
import { NurseDocument } from '../types';
import { TYPE_META } from '../data/types';
import { getColorScheme } from '../constants/theme';

interface ViewToggleProps {
  viewMode: 'web' | 'document';
  onChangeViewMode: (mode: 'web' | 'document') => void;
  activeDoc?: NurseDocument;
  onOpenMobileLibrary?: () => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onChangeViewMode,
  activeDoc,
  onOpenMobileLibrary,
}) => {
  const meta = activeDoc
    ? TYPE_META[activeDoc.type] || { label: 'Dokumen', color: 'teal' }
    : { label: 'Dokumen', color: 'teal' };
  const themeColors = getColorScheme(meta.color);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm px-4 sm:px-5 py-3 mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Active Document Indicator (Clickable on Mobile to Switch) */}
      {activeDoc && (
        <div className="flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileLibrary}
            className="lg:pointer-events-none flex items-center gap-2 text-left truncate group active:opacity-75 transition-opacity"
          >
            <span
              className={`text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${themeColors.badgeBg} ${themeColors.badgeText} shrink-0`}
            >
              {meta.label}
            </span>
            <span className="text-[13px] font-bold text-slate-800 truncate group-hover:text-teal-700 transition-colors">
              {activeDoc.title}
            </span>
            {onOpenMobileLibrary && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 lg:hidden shrink-0" />
            )}
          </button>
        </div>
      )}

      {/* Segmented Mode Switcher */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        <div className="hidden md:flex items-center gap-1.5 text-[11.5px] text-slate-400">
          <Eye className="w-3.5 h-3.5" />
          <span>Tata Letak:</span>
        </div>
        <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onChangeViewMode('web')}
            className={`flex-1 sm:flex-none min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'web'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard
              className={`w-3.5 h-3.5 ${viewMode === 'web' ? 'text-teal-600' : 'text-slate-400'}`}
            />
            <span>Web View</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('document')}
            className={`flex-1 sm:flex-none min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'document'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText
              className={`w-3.5 h-3.5 ${viewMode === 'document' ? 'text-teal-600' : 'text-slate-400'}`}
            />
            <span>Dokumen (A4)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
