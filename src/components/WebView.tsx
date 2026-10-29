import React from 'react';
import {
  Calendar,
  Sparkles,
  DoorOpen,
  GraduationCap,
  Stethoscope,
} from 'lucide-react';
import { NurseDocument } from '../types';
import { TYPE_META } from '../data/types';
import { getColorScheme } from '../constants/theme';
import { getLucideIcon } from './DocIcon';
import { WebBlockRenderer } from './blocks/WebBlockRenderer';

interface WebViewProps {
  document: NurseDocument;
}

export const WebView: React.FC<WebViewProps> = ({ document: doc }) => {
  const meta = TYPE_META[doc.type] || {
    label: 'Dokumen',
    color: 'teal',
    icon: 'file',
    desc: '',
  };

  const themeColors = getColorScheme(meta.color);

  const getAuthorInitials = (name: string) => {
    return name
      .replace(/^Ns\.\s*/i, '')
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Document Header */}
      <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider ${themeColors.badgeText} ${themeColors.badgeBg} border ${themeColors.badgeBorder} px-2.5 py-1 rounded-full`}
          >
            {getLucideIcon(meta.icon, `w-3 h-3 ${themeColors.iconText}`)}
            {meta.label}
          </span>
          <span className="text-[11px] text-slate-400">· {meta.desc}</span>
        </div>

        <h1 className="text-[28px] sm:text-[32px] lg:text-[34px] leading-[1.18] font-bold text-slate-900 tracking-tight max-w-3xl">
          {doc.title}
        </h1>

        {doc.subtitle && (
          <p className="text-[14px] text-slate-500 mt-3 max-w-2xl leading-relaxed">
            {doc.subtitle}
          </p>
        )}

        {/* Metadata info */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-[12.5px]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white grid place-items-center text-[11px] font-bold shrink-0">
                {getAuthorInitials(doc.author)}
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">
                  Disusun oleh
                </div>
                <div className="text-slate-800 font-semibold">{doc.author}</div>
              </div>
            </div>

            {doc.ruangan && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 grid place-items-center shrink-0">
                  <DoorOpen className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">
                    Ruangan
                  </div>
                  <div className="text-slate-800 font-semibold">{doc.ruangan}</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {doc.clinicalTeacher && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 grid place-items-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">
                    Clinical Teacher
                  </div>
                  <div className="text-slate-800 font-semibold">{doc.clinicalTeacher}</div>
                </div>
              </div>
            )}

            {doc.clinicalInstructor && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 grid place-items-center shrink-0">
                  <Stethoscope className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold">
                    Clinical Instructor
                  </div>
                  <div className="text-slate-800 font-semibold">{doc.clinicalInstructor}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-[12px] text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          {doc.date}
        </div>

        {/* Tags */}
        {doc.tags && doc.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {doc.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* AI Summary */}
        {doc.summary && (
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-teal-50/60 to-white border border-teal-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                Ringkasan Otomatis
              </span>
            </div>
            <p className="text-[13.5px] text-slate-700 leading-relaxed">{doc.summary}</p>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/40">
        <div className="px-6 py-4 text-center">
          <div className="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">
            Section
          </div>
          <div className="text-[18px] font-bold text-slate-900 mt-0.5">
            {doc.sections.length}
          </div>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">
            Kata
          </div>
          <div className="text-[18px] font-bold text-slate-900 mt-0.5">
            {(doc.stats?.words || 0).toLocaleString('id-ID')}
          </div>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="text-[10.5px] uppercase tracking-wider text-slate-500 font-semibold">
            Estimasi Baca
          </div>
          <div className="text-[18px] font-bold text-slate-900 mt-0.5">
            {doc.stats?.readTime || '—'}
            <span className="text-[12px] font-medium text-slate-500"> mnt</span>
          </div>
        </div>
      </div>

      {/* Sections & Blocks */}
      <div className="px-6 sm:px-10 py-10 space-y-12">
        {doc.sections.map((sec) => {
          if (sec.isCover) {
            return (
              <section key={sec.id} id={sec.id} className="scroll-mt-24">
                {sec.blocks.map((block, bi) => (
                  <WebBlockRenderer key={`${sec.id}-${bi}`} block={block} />
                ))}
              </section>
            );
          }

          const isWide = sec.num && String(sec.num).length > 3;
          const numBadge = sec.num ? (
            isWide ? (
              <div className="px-3 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white grid place-items-center text-[12px] font-bold shadow-md shadow-teal-500/25 shrink-0 tracking-wide">
                {sec.num}
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white grid place-items-center text-[13px] font-bold shadow-md shadow-teal-500/25 shrink-0">
                {sec.num}
              </div>
            )
          ) : null;

          return (
            <section key={sec.id} id={sec.id} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-4">
                {numBadge}
                <div className="flex-1 min-w-0">
                  <h2 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight">
                    {sec.heading}
                  </h2>
                  {sec.keywords && sec.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {sec.keywords.map((k, ki) => (
                        <span
                          key={ki}
                          className="text-[10px] text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full"
                        >
                          #{k}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 sm:pl-13">
                {sec.blocks.map((block, bi) => (
                  <WebBlockRenderer key={`${sec.id}-${bi}`} block={block} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
