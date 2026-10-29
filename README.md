# nurseDoc — Portofolio Keperawatan Digital

Portofolio keperawatan digital dan sistem dokumentasi klinis terstandar untuk tenaga perawat Indonesia. Menggunakan standar diagnosis **SDKI** (Standar Diagnosis Keperawatan Indonesia), luaran **SLKI** (Standar Luaran Keperawatan Indonesia), dan intervensi **SIKI** (Standar Intervensi Keperawatan Indonesia) dari PPNI.

Aplikasi dibangun menggunakan **React 19**, **TypeScript**, **Tailwind CSS**, dan **Vite** dengan arsitektur data modular, bersih, dan *type-safe*.

---

## Fitur Utama

- **Perpustakaan Dokumen Multikategori**: Manajemen dokumen klinis mencakup:
  - 📋 **ASKEP**: Asuhan Keperawatan komprehensif rawat inap.
  - 📖 **Lap. Pendahuluan (LP)**: Tinjauan teori penyakit, patofisiologi, KDM, dan pathway.
  - 📝 **Logbook**: Catatan praktik klinik dan analisis tindakan keperawatan berbasis bukti ilmiah.
  - 🛡️ **SOP**: Standar Prosedur Operasional tindakan keperawatan dan aspek legalitas.
  - 📄 **Resume**: Resume kasus keperawatan untuk pasien rawat jalan, pemulihan pasca operasi (PACU / One Day Care), dan perawatan singkat (≤1–2 hari).
- **Dual View Mode**:
  - **Tampilan Web**: Tampilan modern responsif, metrik waktu baca, estimasi kata, dan komponen modular interaktif.
  - **Tampilan Dokumen Cetak (A4)**: Mesin pemenggalan halaman otomatis (*pagination engine*) presisi A4 dengan kop resmi, penomoran halaman, dan panel thumbnail visual.
- **Pencarian Cerdas (⌘K / Ctrl+K)**: Indeks pencarian teks lengkap dengan pembobotan judul dokumen, diagnosa medis, kata kunci, dan bab.
- **Daftar Isi Dinamis (TOC)**: Penanda navigasi cepat dengan pendeteksi posisi scroll otomatis (*scrollspy*).
- **Ekspor Dokumen Fleksibel**:
  - **Cetak / PDF**: Dialog cetak berstandar layout A4 tanpa header browser.
  - **Unduh DOCX**: Pembuatan berkas asli Microsoft Word (`.docx`) langsung di sisi peramban.

---

## Arsitektur Data Dokumen

Seluruh data dokumen diorganisasikan secara terpisah (*decoupled*) di bawah folder `src/data/documents/` agar setiap kasus klinis berdiri sendiri dalam berkas terisolasi tanpa menjadi monolit:

```text
src/data/documents/
├── askep/                                             # Kategori Asuhan Keperawatan
│   ├── askep-tn-s-hipertensi-nyeri-akut-001.ts
│   └── index.ts                                       # Aggregator lokal ASKEP_DOCUMENTS
├── lp/                                                # Kategori Laporan Pendahuluan
│   ├── lp-umum-hipertensi-perfusi-perifer-001.ts
│   └── index.ts                                       # Aggregator lokal LP_DOCUMENTS
├── logbook/                                           # Kategori Logbook Praktik Klinik
│   ├── logbook-tn-s-hipertensi-pemasangan-infus-001.ts
│   └── index.ts                                       # Aggregator lokal LOGBOOK_DOCUMENTS
├── sop/                                               # Kategori Standar Prosedur Operasional
│   ├── sop-umum-terapi-cairan-pemasangan-infus-001.ts
│   └── index.ts                                       # Aggregator lokal SOP_DOCUMENTS
├── resume/                                            # Kategori Resume Kasus (Rawat Jalan / ODC)
│   ├── resume-ny-m-post-op-nyeri-akut-001.ts
│   └── index.ts                                       # Aggregator lokal RESUME_DOCUMENTS
├── index.ts                                           # Master aggregator (DOCUMENTS)
└── ../documents.ts                                    # Re-export bridge untuk kompatibilitas
```

---

## Format Standar Penamaan Berkas

Gunakan format penamaan semantik lengkap berikut untuk setiap berkas dokumen baru:

$$\text{[kategori]-[inisial]-[dxMedis]-[dxKep]-[id].ts}$$

| Komponen | Keterangan | Contoh |
| :--- | :--- | :--- |
| **`[kategori]`** | Kategori dokumen (`askep`, `lp`, `logbook`, `sop`, `resume`) | `askep`, `resume` |
| **`[inisial]`** | Inisial nama pasien (gunakan `umum` jika dokumen non-kasus/protokol) | `tn-s`, `ny-m`, `umum` |
| **`[dxMedis]`** | Diagnosa medis utama atau nama prosedur | `hipertensi`, `post-op`, `apendisitis` |
| **`[dxKep]`** | Diagnosa keperawatan utama / tindakan fokus | `nyeri-akut`, `perfusi-perifer`, `pemasangan-infus` |
| **`[id]`** | Nomor urut dokumen 3 digit | `001`, `002` |

---

## Tutorial Lengkap: Cara Menambahkan Dokumen Baru

Setiap kategori dokumen (`askep`, `lp`, `logbook`, `sop`, `resume`) dapat ditambahkan dengan 3 langkah mudah:

### 1. Menambahkan Dokumen ASKEP Baru

1. Buat berkas baru di `src/data/documents/askep/`, misalnya:  
   `src/data/documents/askep/askep-ny-a-diabetes-ketidakstabilan-glukosa-002.ts`
2. Tulis struktur dokumen dengan tipe `NurseDocument`:

```typescript
import { NurseDocument } from "../../../types";

export const askepNyADiabetes002: NurseDocument = {
  id: 'askep-ny-a-dm',
  type: 'askep',
  title: 'Asuhan Keperawatan pada Ny. A dengan Diabetes Melitus Tipe 2',
  subtitle: 'RSUD Dr. Soetomo · Ruang Rawat Inap Penyakit Dalam',
  ruangan: 'Irina A1',
  author: 'Ns. Ahmad Fauzi, S.Kep',
  date: '24 Oktober 2025',
  tags: ['DM Tipe 2', 'Endokrin', 'Rawat Inap'],
  stats: { words: 1800, readTime: 10 },
  summary: 'Asuhan keperawatan pada Ny. A dengan ketidakstabilan kadar glukosa darah dan edukasi manajemen insulin.',
  sections: [
    {
      id: 'cover',
      heading: '',
      isCover: true,
      blocks: [{
        type: 'cover',
        header: 'Universitas Indonesia\nFakultas Ilmu Keperawatan',
        category: 'Asuhan Keperawatan',
        judul: 'Asuhan Keperawatan pada Ny. A dengan Diabetes Melitus Tipe 2',
        penyusun: [{ label: 'Nama', value: 'Ahmad Fauzi' }],
        footer: '2025',
      }],
    },
    {
      id: 'identitas',
      num: '1',
      heading: 'Identitas Pasien',
      blocks: [{
        type: 'identity',
        fields: [
          { label: 'Nama Pasien', value: 'Ny. A' },
          { label: 'Usia', value: '52 tahun' },
          { label: 'Diagnosa Medis', value: 'Diabetes Melitus Tipe 2' },
        ],
      }],
    },
    // Tambahkan BAB Pengkajian, Analisis Data PES, Diagnosa SDKI, SIKI, SOAP
  ],
};

export default askepNyADiabetes002;
```

3. Buka `src/data/documents/askep/index.ts` dan daftarkan berkas baru tersebut:

```typescript
import { NurseDocument } from "../../../types";
import { askepTnSHipertensiNyeriAkut001 } from "./askep-tn-s-hipertensi-nyeri-akut-001";
import { askepNyADiabetes002 } from "./askep-ny-a-diabetes-ketidakstabilan-glukosa-002"; // <-- Tambah impor

export * from "./askep-tn-s-hipertensi-nyeri-akut-001";
export * from "./askep-ny-a-diabetes-ketidakstabilan-glukosa-002"; // <-- Re-export

export const ASKEP_DOCUMENTS: NurseDocument[] = [
  askepTnSHipertensiNyeriAkut001,
  askepNyADiabetes002, // <-- Tambahkan ke array
];

export default ASKEP_DOCUMENTS;
```

---

### 2. Menambahkan Dokumen Laporan Pendahuluan (LP) Baru

1. Buat berkas baru di `src/data/documents/lp/`, misalnya:  
   `src/data/documents/lp/lp-umum-asma-bronkial-bersihan-jalan-napas-002.ts`
2. Struktur LP umumnya memuat:
   - **BAB I**: Tinjauan Teori Kasus (Pengertian, Etiologi, Patofisiologi, Tanda & Gejala, Pemeriksaan Penunjang, Penatalaksanaan, dan Pathway).
   - **BAB II**: Konsep Kebutuhan Dasar Manusia (KDM: Oksigenasi/Cairan/Nutrisi).
   - **BAB III**: Konsep Asuhan Keperawatan Teori (SDKI, SLKI, SIKI, SOAP Teori).
   - **Daftar Pustaka**: Format sitasi referensi ilmiah APA 7th.
3. Daftarkan di `src/data/documents/lp/index.ts` ke dalam array `LP_DOCUMENTS`.

---

### 3. Menambahkan Dokumen Logbook Baru

1. Buat berkas baru di `src/data/documents/logbook/`, misalnya:  
   `src/data/documents/logbook/logbook-tn-b-stroke-iskemik-suction-002.ts`
2. Struktur Logbook berfokus pada:
   - Data fokus pasien & tindakan klinis yang dilakukan perawat.
   - Tabel tindakan serial dengan jam dan peran perawat.
   - **Analisa Tindakan Rasional Ilmiah** (blok `analysis`): menjelaskan *evidence-based nursing* dan rasional fisiologis di balik tindakan yang diambil.
3. Daftarkan di `src/data/documents/logbook/index.ts` ke dalam array `LOGBOOK_DOCUMENTS`.

---

### 4. Menambahkan Dokumen Standar Prosedur Operasional (SOP) Baru

1. Buat berkas baru di `src/data/documents/sop/`, misalnya:  
   `src/data/documents/sop/sop-umum-oksigenasi-kanul-nasal-002.ts`
2. Struktur SOP memuat:
   - Pengertian, Tujuan, Ruang Lingkup & Dasar Hukum Kebijakan (UU Keperawatan No. 38/2014).
   - Daftar Alat & Bahan (tabel steril/non-steril).
   - Fase Prosedur: **Fase Prainteraksi**, **Fase Orientasi**, **Fase Kerja**, dan **Fase Terminasi/Dokumentasi** dengan kolom rasional.
   - Komplikasi dan pencegahannya.
3. Daftarkan di `src/data/documents/sop/index.ts` ke dalam array `SOP_DOCUMENTS`.

---

### 5. Menambahkan Dokumen Resume Kasus Baru

Dokumen **Resume Kasus Keperawatan** digunakan khusus untuk:
- Pasien **Rawat Jalan** (Poliklinik Terpadu).
- Pasien **Pasca Operasi** di Ruang Pemulihan (PACU / Post-Anesthesia Care Unit).
- Pasien **One Day Care (ODC)** / Bedah Sehari.
- Pasien dengan masa perawatan singkat (**≤1–2 hari**).

#### Langkah Pembuatan Dokumen Resume:
1. Buat berkas baru di `src/data/documents/resume/`, misalnya:  
   `src/data/documents/resume/resume-tn-r-kemoterapi-odc-risiko-mual-002.ts`
2. Contoh kode dokumen resume:

```typescript
import { NurseDocument } from "../../../types";

export const resumeTnRKemoterapi002: NurseDocument = {
  id: 'resume-tn-r-kemo-odc',
  type: 'resume', // <-- Tipe 'resume'
  title: 'Resume Keperawatan: Tn. R Siklus Kemoterapi Rawat Singkat (ODC)',
  subtitle: 'Unit One Day Care Onkologi · Masa Rawat 8 Jam',
  ruangan: 'ODC Onkologi',
  author: 'Ahmad Fauzi, S.Kep',
  date: '26 Oktober 2025',
  tags: ['Resume Kasus', 'Onkologi', 'One Day Care', 'Kemoterapi'],
  stats: { words: 1200, readTime: 7 },
  summary: 'Resume pemantauan pemberian kemoterapi siklus 3 pada Tn. R, evaluasi mual muntah akut, dan instruksi perawatan di rumah.',
  sections: [
    {
      id: 'cover',
      heading: '',
      isCover: true,
      blocks: [{
        type: 'cover',
        header: 'RSUD Dr. Soetomo Surabaya\nUnit One Day Care Onkologi',
        category: 'Resume Kasus Keperawatan',
        judul: 'Resume Keperawatan Pelayanan Rawat Singkat Kemoterapi',
        penyusun: [{ label: 'Nama Perawat', value: 'Ahmad Fauzi, S.Kep' }],
        footer: '2025',
      }],
    },
    {
      id: 'identitas',
      num: '1',
      heading: 'Identitas & Rangkuman Kunjungan Singkat',
      blocks: [
        {
          type: 'identity',
          title: 'Data Pasien Rawat Singkat',
          fields: [
            { label: 'Nama Pasien', value: 'Tn. R' },
            { label: 'No. RM', value: '1128901' },
            { label: 'Durasi Layanan', value: '08.00 - 16.00 WIB (8 Jam)' },
            { label: 'Diagnosa Medis', value: 'Adenokarsinoma Kolon Post Reseksi' },
          ],
        },
      ],
    },
    {
      id: 'evaluasi-soap',
      num: '2',
      heading: 'Evaluasi Akhir Kepulangan (SOAP)',
      blocks: [
        {
          type: 'soap',
          s: 'Pasien menyatakan tidak ada mual, nafsu makan baik, badan tidak lemas.',
          o: 'TD 120/80 mmHg, Nadi 80 x/m, tidak ada ekstravasasi pada akses IV, skor kepulangan PADSS 10/10.',
          a: 'Pemberian kemoterapi selesai dengan toleransi baik tanpa efek samping akut.',
          p: 'Lepas venflon IV, berikan obat antiemetik pulang, jadwalkan kontrol siklus berikutnya.',
        },
      ],
    },
    // Lengkapi dengan instruksi Discharge Planning & Obat Pulang
  ],
};

export default resumeTnRKemoterapi002;
```

3. Daftarkan di `src/data/documents/resume/index.ts`:

```typescript
import { NurseDocument } from "../../../types";
import { resumeNyMPostOpNyeriAkut001 } from "./resume-ny-m-post-op-nyeri-akut-001";
import { resumeTnRKemoterapi002 } from "./resume-tn-r-kemoterapi-odc-risiko-mual-002"; // <-- Tambah impor

export * from "./resume-ny-m-post-op-nyeri-akut-001";
export * from "./resume-tn-r-kemoterapi-odc-risiko-mual-002";

export const RESUME_DOCUMENTS: NurseDocument[] = [
  resumeNyMPostOpNyeriAkut001,
  resumeTnRKemoterapi002, // <-- Tambahkan ke koleksi
];

export default RESUME_DOCUMENTS;
```

> **Catatan Otomatisasi**:  
> Karena `src/data/documents/index.ts` mengimpor `RESUME_DOCUMENTS`, dokumen baru Anda **langsung otomatis muncul** di sidebar, filter chip `Resume`, pencarian global `⌘K`, daftar isi TOC, dan jendela ekspor Word/PDF tanpa perlu mengedit komponen UI lain!

---

## Katalog Blok Konten (Block Types)

Anda dapat menyusun konten di dalam array `blocks` pada setiap `section` menggunakan tipe blok berikut:

| Tipe Blok | Properti Utama | Fungsi Klinis |
| :--- | :--- | :--- |
| `cover` | `header`, `category`, `judul`, `penyusun`, `footer` | Halaman sampul akademik & institusional resmi |
| `identity` | `title`, `fields: [{ label, value }]` | Data demografi pasien, no RM, diagnosa, dan dokter |
| `paragraph` | `text` | Paragraf narasi klinis terformat |
| `table` | `headers: string[]`, `rows: string[][]` | Tabel data fokus, obat, lab, tanda vital, atau SIKI |
| `pathway` | `title`, `steps: [{ text, highlight }]` | Diagram alur pohon masalah patofisiologi penyakit |
| `analysis` | `title`, `items: [{ label, content, rationale }]` | Analisa tindakan keperawatan disertai rasional ilmiah |
| `soap` | `s`, `o`, `a`, `p` | Evaluasi perkembangan pasien format SOAP resmi |
| `callout` | `variant: 'info'\|'warning'`, `icon`, `text` | Peringatan klinis, aspek legal, atau *red flags* |
| `list` | `items: string[]` | Daftar butir instruksi atau tanda/gejala |
| `bibliography` | `items: string[]` | Daftar rujukan ilmiah standar APA |

---

## Menjalankan Aplikasi & Pengujian

```bash
# Menjalankan server pengembangan (Port 3000)
npm run dev

# Memeriksa validasi tipe TypeScript
npm run lint

# Kompilasi aplikasi untuk produksi
npm run build
```