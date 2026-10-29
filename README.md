# nurseDoc — Portofolio Keperawatan Digital

Portofolio keperawatan digital dan dokumentasi klinis untuk tenaga perawat Indonesia. Dibangun dengan React 19, TypeScript, Tailwind CSS, dan Vite.

## Fitur Utama

- **Perpustakaan Dokumen**: Manajemen dokumen klinis mencakup ASKEP (Asuhan Keperawatan), Logbook Praktik Klinik, Laporan Pendahuluan (LP), dan Standar Prosedur Operasional (SOP).
- **Dual View Mode**:
  - **Web View**: Tampilan interaktif responsif dengan ringkasan otomatis, metrik waktu baca, hitungan kata, dan blok render modular (tabel, langkah klinis, SDKI diagnosa, dan format SOAP).
  - **Dokumen (Paper) View**: Tampilan cetak standar A4 dengan mesin pemenggalan halaman otomatis (pagination engine), thumbnail navigasi per halaman, kop halaman, dan penomoran halaman formal.
- **Pencarian Cerdas (⌘K / Ctrl+K)**: Indeks pencarian teks lengkap dengan ranking skor berbasis judul dokumen, nomor ruangan, judul bab, dan isi konten.
- **Daftar Isi Dinamis (TOC)**: Navigasi cepat ke setiap bagian dokumen dilengkapi penanda scroll otomatis (scrollspy).
- **Ekspor Dokumen**:
  - **Cetak Dokumen**: Dialog cetak langsung terisolasi untuk hasil cetak A4 presisi.
  - **Unduh PDF**: Alur cetak ke format PDF.
  - **Unduh DOCX**: Pembuatan dokumen Microsoft Word native `.docx` langsung di browser menggunakan library `docx`.

## Menjalankan Aplikasi

```bash
# Menjalankan server pengembangan
npm run dev

# Kompilasi aplikasi untuk produksi
npm run build
```