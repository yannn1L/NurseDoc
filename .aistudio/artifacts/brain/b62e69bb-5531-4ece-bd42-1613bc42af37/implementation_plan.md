# Refaktorisasi Modular Berkas Dokumen Keperawatan (Subfolder & Format Semantik)

Pemisahan data dokumen klinis dari berkas monolitik/flat menjadi arsitektur subfolder modular terstruktur per kategori (`askep/`, `lp/`, `logbook/`, `sop/`), di mana setiap berkas merepresentasikan satu dokumen klinis mandiri dengan penamaan semantik terstandar dan agregasi berjenjang.

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan konfirmasi pengguna pada tahap klarifikasi:
> - **Struktur Folder**: Setiap kategori memiliki subfolder sendiri (`src/data/documents/{kategori}/`) dengan berkas `index.ts` sebagai aggregator lokal.
> - **Format Penamaan Berkas**: Pola lengkap `[kategori]-[inisial]-[dxMedis]-[dxKep]-[id].ts` untuk keterbacaan klinis maksimal tanpa ambiguitas.
> - **Cakupan Dokumen**: Memigrasikan dokumen eksisting yang sudah ada tanpa membuat template kosong berlebih.
> - **Kompatibilitas Penuh (Backward Compatibility)**: Mempertahankan alias ekspor (`DOCUMENTS`, `lpDocument`, `askepDocument`, `logbookDocument`, `sopDocument`, dll.) sehingga seluruh komponen UI (`Sidebar`, `GlobalSearchModal`, `ExportDocxModal`, `App.tsx`) tetap berfungsi normal tanpa regresi.

---

## 1. Overview & Core Concept

- **Tujuan**: Menghilangkan ketergantungan pada berkas data monolitik, memudahkan pemeliharaan jangka panjang, isolasi perubahan antar dokumen klinis, dan mempermudah kolaborator perawat/pengembang menambahkan kasus asuhan atau SOP baru secara terpisah.
- **Standar Penamaan Klinis**:
  - `askep/askep-tn-s-hipertensi-nyeri-akut-001.ts`
  - `lp/lp-umum-hipertensi-perfusi-perifer-001.ts`
  - `logbook/logbook-tn-s-hipertensi-pemasangan-infus-001.ts`
  - `sop/sop-umum-terapi-cairan-pemasangan-infus-001.ts`

---

## 2. Arsitektur Folder & Alur Data

```
src/data/documents/
├── askep/
│   ├── askep-tn-s-hipertensi-nyeri-akut-001.ts   <-- Dokumen mandiri ASKEP Tn. S
│   └── index.ts                                 <-- Aggregator lokal ASKEP_DOCUMENTS
├── lp/
│   ├── lp-umum-hipertensi-perfusi-perifer-001.ts <-- Dokumen mandiri LP Hipertensi
│   └── index.ts                                 <-- Aggregator lokal LP_DOCUMENTS
├── logbook/
│   ├── logbook-tn-s-hipertensi-pemasangan-infus-001.ts <-- Dokumen mandiri Logbook
│   └── index.ts                                 <-- Aggregator lokal LOGBOOK_DOCUMENTS
├── sop/
│   ├── sop-umum-terapi-cairan-pemasangan-infus-001.ts   <-- Dokumen mandiri SOP Infus
│   └── index.ts                                 <-- Aggregator lokal SOP_DOCUMENTS
├── index.ts                                     <-- Master aggregator & registry DOCUMENTS
└── documents.ts (root)                          <-- Re-export bridge untuk kompatibilitas
```

### Alur Agregasi (Hierarchical Aggregation):
```
[askep-*.ts]   --> [askep/index.ts]   ─┐
[lp-*.ts]      --> [lp/index.ts]      ─┼─> [documents/index.ts] ─> [src/data/documents.ts] ─> [UI Components]
[logbook-*.ts] --> [logbook/index.ts] ─┤
[sop-*.ts]     --> [sop/index.ts]     ─┘
```

---

## 3. Key Product Decisions & Trade-Offs

- **Hierarchical Barrel Export vs. Dynamic Glob Import**:
  - *Keputusan*: Menggunakan aggregator `index.ts` statis di setiap subfolder dan satu master `index.ts`.
  - *Alasan*: Menjamin *type safety* 100% saat kompilasi TypeScript (`tsc --noEmit`), autocompletion instan di IDE, *tree shaking* optimal, dan tidak memerlukan overhead runtime asynchronous.
- **Pembersihan Berkas Lama**:
  - *Keputusan*: Menghapus berkas flat lama (`src/data/documents/lp.ts`, `askep.ts`, `logbook.ts`, `sop.ts`) setelah memindahkan isinya ke dalam subfolder terkait, sehingga struktur direktori bersih dan konsisten.
- **Zero Breaking Changes**:
  - Seluruh identifier ID dokumen (`lp-htn`, `askep-htn`, `logbook-htn`, `sop-infus`) dipertahankan sehingga preferensi aktif di browser, riwayat pencarian, dan tautan internal tidak terputus.

---

## 4. Rencana Langkah Eksekusi

1. **Pembuatan Direktori & Berkas Dokumen Individual**:
   - Buat `src/data/documents/askep/askep-tn-s-hipertensi-nyeri-akut-001.ts`
   - Buat `src/data/documents/lp/lp-umum-hipertensi-perfusi-perifer-001.ts`
   - Buat `src/data/documents/logbook/logbook-tn-s-hipertensi-pemasangan-infus-001.ts`
   - Buat `src/data/documents/sop/sop-umum-terapi-cairan-pemasangan-infus-001.ts`
2. **Pembuatan Aggregator Lokal Tiap Kategori**:
   - `src/data/documents/askep/index.ts`
   - `src/data/documents/lp/index.ts`
   - `src/data/documents/logbook/index.ts`
   - `src/data/documents/sop/index.ts`
3. **Pembaruan Master Aggregator & Bridge**:
   - Perbarui `src/data/documents/index.ts` untuk mengimpor dan menggabungkan seluruh kategori.
   - Pastikan `src/data/documents.ts` tetap mengekspor seluruh entitas dari `documents/index`.
4. **Pembersihan File Flat Usang**:
   - Hapus berkas `src/data/documents/askep.ts`, `src/data/documents/lp.ts`, `src/data/documents/logbook.ts`, dan `src/data/documents/sop.ts`.
5. **Verifikasi Kompilasi & Kualitas Kode**:
   - Jalankan `compile_applet` untuk memastikan bundler Vite sukses.
   - Jalankan `lint_applet` (`tsc --noEmit`) untuk memastikan zero type error.
