import React, { useState, useEffect } from 'react';
import { X, User, School, Hash, Briefcase, GraduationCap, RotateCcw, Check, Sparkles } from 'lucide-react';
import { UserProfile, DEFAULT_USER_PROFILE, generateAvatarInitials } from '../constants/user';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<UserProfile>(currentProfile);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(currentProfile);
    }
  }, [isOpen, currentProfile]);

  // Handle ESC key
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

  const previewInitials = generateAvatarInitials(formData.name || 'ND');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    onReset();
    setFormData(DEFAULT_USER_PROFILE);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-slate-900 leading-tight">
                Pengaturan Profil Klinis
              </h2>
              <p className="text-[11.5px] text-slate-500 mt-0.5">
                Sinkronisasi otomatis ke kop institusi & nama penyusun dokumen
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Live Preview Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-teal-50/70 to-slate-50 border border-teal-100/80">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Pratinjau Sinkronisasi Dokumen
              </span>
              <span className="text-[10px] text-teal-600 font-semibold lowercase">live update</span>
            </div>

            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200/80">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white grid place-items-center font-bold text-sm shadow-sm shrink-0">
                {previewInitials}
              </div>
              <div className="min-w-0 text-left text-xs leading-relaxed">
                <div className="font-bold text-slate-900 truncate">
                  {formData.name || 'Nama Perawat'}
                </div>
                <div className="text-[11px] text-slate-500">
                  NIM: <span className="font-semibold text-slate-700">{formData.nim || '—'}</span>
                </div>
                <div className="text-[11px] text-teal-700 font-medium truncate mt-0.5">
                  {formData.institution || 'Institusi Pendidikan'}
                  {formData.faculty ? ` · ${formData.faculty}` : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label htmlFor="profile-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Nama Lengkap & Gelar
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="profile-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="misal: Ns. Christian Claudio Sumual, S.Kep"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              />
            </div>
            <p className="text-[10.5px] text-slate-400 mt-1">
              Otomatis mengisi kolom "Disusun oleh:" pada seluruh ASKEP, LP, Logbook, dan Resume.
            </p>
          </div>

          {/* NIM */}
          <div>
            <label htmlFor="profile-nim" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Nomor Induk Mahasiswa / NIRM
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="profile-nim"
                name="nim"
                type="text"
                value={formData.nim}
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                placeholder="misal: PO7120121001 atau 202103045"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              />
            </div>
            <p className="text-[10.5px] text-slate-400 mt-1">
              Otomatis tertera pada kotak penyusun sampul dokumen resmi A4 & ekspor Word.
            </p>
          </div>

          {/* Universitas / Institusi */}
          <div>
            <label htmlFor="profile-institution" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Universitas / Politeknik / Institusi
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="profile-institution"
                name="institution"
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="misal: Universitas Airlangga / Universitas Indonesia"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              />
            </div>
            <p className="text-[10.5px] text-slate-400 mt-1">
              Otomatis menjadi baris pertama kop sampul dokumen akademik dan dokumen cetak.
            </p>
          </div>

          {/* Fakultas / Program Studi */}
          <div>
            <label htmlFor="profile-faculty" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Fakultas / Jurusan / Program Studi
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="profile-faculty"
                name="faculty"
                type="text"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                placeholder="misal: Fakultas Keperawatan / Jurusan Keperawatan"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Peran / Status Klinis */}
          <div>
            <label htmlFor="profile-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Peran / Status Klinis
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="profile-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="misal: Mahasiswa Profesi Ners / Perawat Praktik"
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              title="Kembalikan ke profil bawaan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-98 rounded-xl shadow-md shadow-teal-600/20 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
