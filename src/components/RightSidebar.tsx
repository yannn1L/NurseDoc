import React, { useMemo } from 'react';
import { ListTree, Info, Printer, FileDown, FileType2 } from 'lucide-react';
import { NurseDocument } from '../types';
import { TYPE_META } from '../data/types';
import { getColorScheme } from '../constants/theme';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface RightSidebarProps {
  document: NurseDocument;
  onPrint: () => void;
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  document: doc,
  onPrint,
  onDownloadPdf,
  onDownloadDocx,
}) => {
  const meta = TYPE_META[doc.type] || {
    label: 'Dokumen',
    color: 'teal',
    icon: 'file',
    desc: '',
  };

  const tocSections = useMemo(
    () => doc.sections.filter((sec) => !sec.isCover),
    [doc.sections]
  );

  const { activeSectionId, scrollToSection } = useScrollSpy(tocSections);
  const themeColors = getColorScheme(meta.color);

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-1 space-y-4" data-region="toc">
        {/* Table of contents */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTree className="w-4 h-4 text-teal-600" />
              <h3 className="text-[13px] font-bold text-slate-900 tracking-tight">Daftar Isi</h3>
            </div>
            <span className="text-[10.5px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
              {tocSections.length} bagian
            </span>
          </div>
          <nav className="p-2 space-y-0.5 max-h-[320px] overflow-y-auto">
            {tocSections.map((sec, i) => {
              const isActive = activeSectionId === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sec.id);
                  }}
                  className={`toc-link group flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`dot w-2 h-2 rounded-full transition-all shrink-0 ${
                      isActive ? 'bg-teal-600 ring-2 ring-teal-200' : 'bg-slate-300 group-hover:bg-teal-400'
                    }`}
                  ></span>
                  <span className="truncate flex-1">
                    {sec.num ? `${sec.num}. ` : ''}{sec.heading}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Quick Action Buttons */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3 space-y-1.5">
          <button
            type="button"
            className="action-btn primary"
            onClick={onPrint}
            data-action="print"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen</span>
          </button>
          <button
            type="button"
            className="action-btn hover:border-slate-300"
            onClick={onDownloadPdf}
            data-action="pdf"
          >
            <FileDown className="w-4 h-4 text-rose-600" />
            <span>Unduh PDF</span>
          </button>
          <button
            type="button"
            className="action-btn hover:border-slate-300"
            onClick={onDownloadDocx}
            data-action="docx"
          >
            <FileType2 className="w-4 h-4 text-indigo-600" />
            <span>Unduh Word (.docx)</span>
          </button>
        </div>

        {/* Document Info */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <h3 className="text-[13px] font-bold text-slate-900 tracking-tight">Info Dokumen</h3>
          </div>
          <div className="p-4 space-y-2.5 text-[12px]">
            <div className="flex justify-between items-center gap-3">
              <span className="text-slate-500">Kategori</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${themeColors.badgeBg} ${themeColors.badgeText}`}>
                {meta.label}
              </span>
            </div>

            {doc.ruangan && (
              <div className="flex justify-between items-center gap-3">
                <span className="text-slate-500">Ruangan</span>
                <span className="font-semibold text-slate-800 text-right">{doc.ruangan}</span>
              </div>
            )}

            <div className="flex justify-between items-center gap-3">
              <span className="text-slate-500">Penyusun</span>
              <span className="font-semibold text-slate-800 text-right truncate max-w-[150px]">{doc.author}</span>
            </div>

            {doc.clinicalTeacher && (
              <div className="flex justify-between items-center gap-3">
                <span className="text-slate-500">Dosen (CT)</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[150px]">
                  {doc.clinicalTeacher}
                </span>
              </div>
            )}

            {doc.clinicalInstructor && (
              <div className="flex justify-between items-center gap-3">
                <span className="text-slate-500">CI Ruangan</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[150px]">
                  {doc.clinicalInstructor}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center gap-3 pt-1 border-t border-slate-100">
              <span className="text-slate-500">Tanggal</span>
              <span className="font-semibold text-slate-700">{doc.date}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
