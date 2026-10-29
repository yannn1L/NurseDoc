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
    <aside className="col-span-12 lg:col-span-3">
      <div className="sticky-wrap" data-region="toc">
        {/* Table of contents */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <ListTree className="w-4 h-4 text-teal-600" />
            <h3 className="text-[13px] font-semibold text-slate-900">Daftar Isi</h3>
          </div>
          <nav className="p-2.5 space-y-0.5 max-h-[380px] overflow-y-auto">
            {tocSections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sec.id);
                  }}
                  className={`toc-link group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition ${
                    isActive
                      ? 'bg-teal-50/80 text-teal-800 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`dot w-1.5 h-1.5 rounded-full transition shrink-0 ${
                      isActive ? 'bg-teal-500' : 'bg-slate-300 group-hover:bg-teal-400'
                    }`}
                  ></span>
                  <span className="font-medium truncate">{sec.heading}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Document Info */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-600" />
            <h3 className="text-[13px] font-semibold text-slate-900">Informasi Dokumen</h3>
          </div>
          <div className="p-5 space-y-3.5 text-[12px]">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Jenis</span>
              <span className={`font-semibold ${themeColors.text}`}>{meta.label}</span>
            </div>

            {doc.ruangan && (
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Ruangan</span>
                <span className="font-semibold text-slate-800 text-right">{doc.ruangan}</span>
              </div>
            )}

            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Disusun oleh</span>
              <span className="font-semibold text-slate-800 text-right">{doc.author}</span>
            </div>

            {doc.clinicalTeacher && (
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Clinical Teacher</span>
                <span className="font-semibold text-slate-800 text-right">
                  {doc.clinicalTeacher}
                </span>
              </div>
            )}

            {doc.clinicalInstructor && (
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Clinical Instructor</span>
                <span className="font-semibold text-slate-800 text-right">
                  {doc.clinicalInstructor}
                </span>
              </div>
            )}

            <div className="flex justify-between gap-3">
              <span className="text-slate-500">Tanggal</span>
              <span className="font-semibold text-slate-800">{doc.date}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3 space-y-1">
          <button
            type="button"
            className="action-btn primary"
            onClick={onPrint}
            data-action="print"
          >
            <Printer className="w-4 h-4" />
            Cetak Dokumen
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={onDownloadPdf}
            data-action="pdf"
          >
            <FileDown className="w-4 h-4" />
            Unduh PDF
          </button>
          <button
            type="button"
            className="action-btn"
            onClick={onDownloadDocx}
            data-action="docx"
          >
            <FileType2 className="w-4 h-4" />
            Unduh DOCX
          </button>
        </div>
      </div>
    </aside>
  );
};
