import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  ListTree,
  Share2,
  Search,
  X,
  Printer,
  FileDown,
  FileType2,
  Calendar,
  DoorOpen,
  Check,
} from 'lucide-react';
import { NurseDocument, DocumentType } from '../types';
import { TYPE_META } from '../data/types';
import { getColorScheme } from '../constants/theme';
import { getLucideIcon } from './DocIcon';

import { UserProfile } from '../constants/user';

interface MobileNavProps {
  documents: NurseDocument[];
  activeDoc: NurseDocument;
  filter: string;
  onSelectDoc: (id: string) => void;
  onSetFilter: (filter: string) => void;
  onOpenSearch: () => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
  userProfile?: UserProfile;
  onOpenEditProfile?: () => void;
}

type MobileDrawer = 'none' | 'library' | 'toc' | 'actions';

export const MobileNav: React.FC<MobileNavProps> = ({
  documents,
  activeDoc,
  filter,
  onSelectDoc,
  onSetFilter,
  onOpenSearch,
  onPrint,
  onDownloadPdf,
  onDownloadDocx,
  userProfile,
  onOpenEditProfile,
}) => {
  const [activeDrawer, setActiveDrawer] = useState<MobileDrawer>('none');

  const filteredDocs =
    filter === 'all'
      ? documents
      : documents.filter((d) => d.type === filter);

  const tocSections = activeDoc.sections.filter((sec) => !sec.isCover);
  const activeMeta = TYPE_META[activeDoc.type] || {
    label: 'Dokumen',
    color: 'teal',
    icon: 'file',
    desc: '',
  };
  const activeThemeColors = getColorScheme(activeMeta.color);

  const handleSelectDoc = (id: string) => {
    onSelectDoc(id);
    setActiveDrawer('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToSection = (sectionId: string) => {
    setActiveDrawer('none');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  // Close drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDrawer !== 'none') {
        setActiveDrawer('none');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDrawer]);

  return (
    <>
      {/* ================= FIXED MOBILE BOTTOM NAVIGATION BAR ================= */}
      <nav
        aria-label="Navigasi Bawah Seluler"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-5 items-center max-w-md mx-auto">
          {/* 1. Perpustakaan */}
          <button
            type="button"
            aria-label="Buka Perpustakaan Dokumen"
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'library' ? 'none' : 'library'))
            }
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
              activeDrawer === 'library'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen
              className={`w-5 h-5 transition-transform ${
                activeDrawer === 'library' ? 'scale-110 text-teal-600' : ''
              }`}
            />
            <span className="text-[10px] mt-1 tracking-tight">Dokumen</span>
          </button>

          {/* 2. Daftar Isi (TOC) */}
          <button
            type="button"
            aria-label="Buka Daftar Isi Dokumen"
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'toc' ? 'none' : 'toc'))
            }
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
              activeDrawer === 'toc'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ListTree
              className={`w-5 h-5 transition-transform ${
                activeDrawer === 'toc' ? 'scale-110 text-teal-600' : ''
              }`}
            />
            <span className="text-[10px] mt-1 tracking-tight">Daftar Isi</span>
          </button>

          {/* 3. Tombol Tengah: Cari Cepat */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              aria-label="Pencarian Global"
              onClick={onOpenSearch}
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 active:scale-90 transition-transform"
              title="Cari Dokumen"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* 4. Bacaan (Scroll to top of document) */}
          <button
            type="button"
            aria-label="Fokus ke Bacaan Dokumen"
            onClick={() => {
              setActiveDrawer('none');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="min-h-[48px] flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 active:scale-95 transition-all"
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-tight">Bacaan</span>
          </button>

          {/* 5. Aksi / Ekspor */}
          <button
            type="button"
            aria-label="Buka Menu Ekspor dan Cetak"
            onClick={() =>
              setActiveDrawer((prev) => (prev === 'actions' ? 'none' : 'actions'))
            }
            className={`min-h-[48px] flex flex-col items-center justify-center py-1 transition-all active:scale-95 ${
              activeDrawer === 'actions'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Share2
              className={`w-5 h-5 transition-transform ${
                activeDrawer === 'actions' ? 'scale-110 text-teal-600' : ''
              }`}
            />
            <span className="text-[10px] mt-1 tracking-tight">Ekspor</span>
          </button>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM DRAWERS / SHEETS ================= */}
      {activeDrawer !== 'none' && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveDrawer('none')}
            aria-hidden="true"
          />

          {/* Drawer Content Container */}
          <div className="relative bg-white rounded-t-3xl max-h-[82vh] overflow-hidden flex flex-col shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-250">
            {/* Grab Handle */}
            <div className="pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {activeDrawer === 'library' && 'Pilih Dokumen Klinis'}
                  {activeDrawer === 'toc' && 'Daftar Isi & Navigasi'}
                  {activeDrawer === 'actions' && 'Cetak & Ekspor Dokumen'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {activeDrawer === 'library' && `${filteredDocs.length} dokumen tersedia`}
                  {activeDrawer === 'toc' && activeDoc.title}
                  {activeDrawer === 'actions' && 'Pilih format keluaran dokumen resmi'}
                </p>
              </div>
              <button
                type="button"
                aria-label="Tutup Lembar Tindakan"
                onClick={() => setActiveDrawer('none')}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ================= DRAWER 1: PERPUSTAKAAN DOKUMEN ================= */}
            {activeDrawer === 'library' && (
              <div className="p-4 overflow-y-auto space-y-3.5">
                {/* Profile Card Trigger */}
                {userProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDrawer('none');
                      if (onOpenEditProfile) onOpenEditProfile();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-teal-50 to-slate-50 border border-teal-200/80 text-left active:scale-[0.99] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white grid place-items-center font-bold text-xs shrink-0">
                        {userProfile.avatarText}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {userProfile.name}
                        </div>
                        <div className="text-[10.5px] text-slate-500 truncate">
                          {userProfile.nim ? `NIM: ${userProfile.nim} · ` : ''}{userProfile.institution}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-bold text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded shadow-2xs shrink-0 ml-2">
                      Ubah
                    </span>
                  </button>
                )}

                {/* Horizontal Category Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  <button
                    type="button"
                    onClick={() => onSetFilter('all')}
                    className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      filter === 'all'
                        ? 'bg-teal-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Semua ({documents.length})
                  </button>
                  {(Object.entries(TYPE_META) as [DocumentType, (typeof TYPE_META)[DocumentType]][]).map(
                    ([typeKey, meta]) => (
                      <button
                        key={typeKey}
                        type="button"
                        onClick={() => onSetFilter(typeKey)}
                        className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                          filter === typeKey
                            ? 'bg-teal-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {meta.label}
                      </button>
                    )
                  )}
                </div>

                {/* Document Cards */}
                <div className="space-y-2 pb-6">
                  {filteredDocs.map((doc) => {
                    const isCurrent = doc.id === activeDoc.id;
                    const meta = TYPE_META[doc.type] || {
                      label: 'Dokumen',
                      color: 'teal',
                      icon: 'file',
                      desc: '',
                    };
                    const colorClasses = getColorScheme(meta.color);

                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => handleSelectDoc(doc.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'border-teal-400 bg-teal-50/50 shadow-sm ring-1 ring-teal-300'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl ${colorClasses.bg} border ${colorClasses.border} grid place-items-center shrink-0 mt-0.5`}
                          >
                            {getLucideIcon(meta.icon, `w-4 h-4 ${colorClasses.iconText}`)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[9.5px] font-bold uppercase tracking-wider ${colorClasses.badgeText} ${colorClasses.badgeBg} px-2 py-0.5 rounded`}
                              >
                                {meta.label}
                              </span>
                              {isCurrent && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                                  <Check className="w-3 h-3" />
                                  Aktif
                                </span>
                              )}
                            </div>
                            <div className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-2 mt-1">
                              {doc.title}
                            </div>
                            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500">
                              {doc.ruangan && (
                                <span className="flex items-center gap-1 text-slate-600 font-medium">
                                  <DoorOpen className="w-3 h-3" />
                                  {doc.ruangan}
                                </span>
                              )}
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {doc.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= DRAWER 2: DAFTAR ISI (TOC) ================= */}
            {activeDrawer === 'toc' && (
              <div className="p-4 overflow-y-auto space-y-2 pb-8">
                {tocSections.map((sec, i) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleJumpToSection(sec.id)}
                    className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 transition-all flex items-center gap-3 active:scale-[0.99]"
                  >
                    <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold text-xs grid place-items-center shrink-0">
                      {sec.num || i + 1}
                    </span>
                    <span className="text-[13px] font-semibold text-slate-800 truncate flex-1">
                      {sec.heading}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* ================= DRAWER 3: AKSI & EKSPOR ================= */}
            {activeDrawer === 'actions' && (
              <div className="p-5 space-y-3 pb-8">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDrawer('none');
                    onPrint();
                  }}
                  className="w-full min-h-[50px] flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-600 text-white font-semibold text-[13.5px] shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
                >
                  <Printer className="w-5 h-5" />
                  <div className="text-left flex-1">
                    <div>Cetak Langsung (Print)</div>
                    <div className="text-[11px] text-teal-100 font-normal">
                      Cetak layout dokumen ke printer fisik
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDrawer('none');
                    onDownloadPdf();
                  }}
                  className="w-full min-h-[50px] flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13.5px] active:scale-[0.98] transition-all"
                >
                  <FileDown className="w-5 h-5 text-rose-600" />
                  <div className="text-left flex-1">
                    <div>Unduh PDF</div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      Ekspor dokumen cetak ke format file PDF
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDrawer('none');
                    onDownloadDocx();
                  }}
                  className="w-full min-h-[50px] flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13.5px] active:scale-[0.98] transition-all"
                >
                  <FileType2 className="w-5 h-5 text-indigo-600" />
                  <div className="text-left flex-1">
                    <div>Unduh Microsoft Word (.docx)</div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      Berkas Word asli yang dapat diedit di MS Word
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
