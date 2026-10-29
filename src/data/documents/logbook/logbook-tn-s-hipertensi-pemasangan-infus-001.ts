import { NurseDocument } from "../../../types";

export const logbookTnSHipertensiPemasanganInfus001: NurseDocument = {
  id: 'logbook-htn',
  type: 'logbook',
  title: 'Logbook Praktik Klinik — Kasus Hipertensi',
  subtitle: 'Program Profesi Ners · Semester Ganjil 2025/2026',
  ruangan: 'Irina C2',
  author: 'Ahmad Fauzi (NIM: 202103045)',
  clinicalTeacher: 'Ns. Rina W., M.Kep',
  clinicalInstructor: 'Ns. Dita P., S.Kep',
  date: '10–12 Oktober 2025',
  tags: ['Logbook', 'Hipertensi', 'Praktik Klinik'],
  stats: { words: 1100, readTime: 7 },
  summary: 'Analisis tindakan keperawatan pada pasien Tn. S dengan hipertensi, mencakup pengkajian, diagnosa, intervensi, implementasi, dan evaluasi berdasarkan SDKI, SLKI, dan SIKI beserta rasional ilmiah.',
  sections: [
    /* ---------- COVER ---------- */
    {
      id: 'cover', heading: '', isCover: true,
      blocks: [{
        type: 'cover',
        header: 'Universitas Indonesia\nProgram Profesi Ners',
        category: 'Logbook Praktik Klinik',
        judul: 'Analisis Tindakan Keperawatan pada Tn. S dengan Hipertensi',
        penyusun: [
          { label: 'Nama',   value: 'Ahmad Fauzi' },
          { label: 'NIM',    value: '202103045' },
          { label: 'Ruang',  value: 'Irina C2' },
        ],
        footer: 'RSUD Dr. Soetomo\n2025',
      }],
    },

    /* ---------- 1. IDENTITAS ---------- */
    {
      id: 'id', num: '1', heading: 'Identitas Pasien',
      keywords: ['identitas'],
      blocks: [
        { type: 'identity',
          title: 'Data Pasien',
          fields: [
            { label: 'Nama',       value: 'Tn. S' },
            { label: 'Umur',       value: '55 tahun' },
            { label: 'Jenis Kelamin', value: 'Laki-laki' },
            { label: 'No. RM',     value: '1120998' },
            { label: 'Diagnosa Medis', value: 'Hipertensi Stage 2' },
            { label: 'Ruang',      value: 'Irina C2' },
            { label: 'Tanggal MRS', value: '10 Oktober 2025' },
            { label: 'Tanggal Kajian', value: '10–12 Oktober 2025' },
          ],
        },
      ],
    },

    /* ---------- 2. DIAGNOSA ---------- */
    {
      id: 'dx', num: '2', heading: 'Diagnosa Keperawatan',
      keywords: ['diagnosa', 'SDKI'],
      blocks: [
        { type: 'table',
          headers: ['No. Dx', 'Diagnosa Keperawatan (SDKI)'],
          rows: [
            ['I', 'Nyeri Akut (D.0077)'],
            ['II', 'Risiko Perfusi Serebral Tidak Efektif (D.0017)'],
            ['III', 'Manajemen Kesehatan Keluarga Tidak Efektif (D.0116)'],
          ],
        },
      ],
    },

    /* ---------- 3. TINDAKAN ---------- */
    {
      id: 'tindakan', num: '3', heading: 'Tindakan Keperawatan',
      keywords: ['tindakan'],
      blocks: [
        { type: 'table',
          headers: ['No. SIKI', 'Tanggal', 'Jam', 'Tindakan', 'Kategori'],
          rows: [
            ['I.08238', '10 Okt 2025', '08.45', 'Kaji nyeri (PQRST)', 'Observasi'],
            ['I.08238', '10 Okt 2025', '08.50', 'Atur posisi semi-Fowler 30°', 'Terapeutik'],
            ['I.08238', '10 Okt 2025', '09.00', 'Ajarkan relaksasi nafas dalam', 'Edukasi'],
            ['I.08238', '10 Okt 2025', '09.15', 'Kolaborasi Ketorolac 30 mg IV', 'Kolaborasi'],
            ['I.03114', '10 Okt 2025', '09.30', 'Monitor TD', 'Observasi'],
            ['I.03114', '10 Okt 2025', '10.00', 'Kolaborasi Amlodipine & Captopril', 'Kolaborasi'],
            ['I.12399', '10 Okt 2025', '14.30', 'Edukasi diet DASH', 'Edukasi'],
            ['I.08238', '11 Okt 2025', '07.30', 'Re-kaji nyeri (4/10)', 'Observasi'],
            ['I.03114', '11 Okt 2025', '08.00', 'Monitor TD (165/95)', 'Observasi'],
            ['I.12399', '11 Okt 2025', '10.00', 'Diskusi menu DASH dengan keluarga', 'Edukasi'],
            ['I.08238', '12 Okt 2025', '07.30', 'Re-kaji nyeri (2/10)', 'Observasi'],
            ['I.03114', '12 Okt 2025', '08.00', 'Monitor TD (140/85)', 'Observasi'],
            ['I.12399', '12 Okt 2025', '10.00', 'Discharge planning bersama pasien', 'Edukasi'],
          ],
        },
      ],
    },

    /* ---------- 4. ANALISA TINDAKAN ---------- */
    {
      id: 'analisa', num: '4', heading: 'Analisa Tindakan Keperawatan',
      keywords: ['analisa', 'rasional'],
      blocks: [
        { type: 'paragraph', text: 'Analisa tindakan keperawatan mencakup rasional ilmiah untuk setiap tahapan proses keperawatan (pengkajian, diagnosa, intervensi, implementasi, evaluasi).' },

        { type: 'analysis',
          title: 'A. Analisa Pengkajian',
          items: [
            {
              label: 'D.s (Data Subjektif)',
              content: 'Pasien mengeluh nyeri kepala berdenyut skala 6/10, pusing saat beraktivitas.',
              rationale: 'Nyeri kepala oksipital adalah manifestasi klasik hipertensi akibat peningkatan tekanan intrakranial dan vasokonstriksi serebral (Brunner & Suddarth, 2020).',
            },
            {
              label: 'D.o (Data Objektif)',
              content: 'TD 180/100 mmHg, nadi 98 x/menit, RR 22 x/menit, pasien tampak meringis.',
              rationale: 'TD ≥140/90 mmHg mengonfirmasi hipertensi stage 2 (PERHI, 2021); takipnea mencerminkan respons kompensasi simpatis terhadap nyeri.',
            },
          ],
        },

        { type: 'analysis',
          title: 'B. Analisa Diagnosa Keperawatan',
          items: [
            {
              label: 'Diagnosa Utama: Nyeri Akut (D.0077)',
              content: 'Berhubungan dengan agen pencedera fisiologis (peningkatan tekanan darah).',
              rationale: 'SDKI menetapkan bahwa nyeri akut dengan durasi <3 bulan dan onset mendadak sesuai kriteria D.0077; etiologi "agen pencedera fisiologis" tepat untuk hipertensi (Tim Pokja SDKI, 2017).',
            },
            {
              label: 'Diagnosa Kedua: Risiko Perfusi Serebral Tidak Efektif (D.0017)',
              content: 'Dibuktikan dengan hipertensi dan hiperkolesterolemia.',
              rationale: 'Hipertensi persisten menyebabkan remodeling vaskular dan penurunan autoregulasi serebral, meningkatkan risiko iskemik (Brunner & Suddarth, 2020).',
            },
          ],
        },

        { type: 'analysis',
          title: 'C. Analisa Intervensi (SLKI)',
          items: [
            {
              label: 'Tingkat Nyeri (L.08066)',
              content: 'Target: skala nyeri menurun dari 6 menjadi ≤3 dalam 3×24 jam.',
              rationale: 'SLKI menetapkan luaran nyeri dengan indikator skala, ekspresi wajah, dan pola tidur; target realistis sesuai respons pasien terhadap analgesik & non-farmakologis.',
            },
            {
              label: 'Perfusi Serebral (L.02014)',
              content: 'Target: TD dalam rentang normal, tidak ada pusing.',
              rationale: 'Normalisasi TD menurunkan risiko iskemik serebral dan mempertahankan autoregulasi aliran darah otak.',
            },
          ],
        },

        { type: 'analysis',
          title: 'D. Analisa Implementasi (SIKI)',
          items: [
            {
              label: 'Manajemen Nyeri (I.08238)',
              content: 'Kaji nyeri (PQRST), atur posisi semi-Fowler, ajarkan relaksasi nafas dalam, kolaborasi analgesik.',
              rationale: 'Posisi semi-Fowler menurunkan tekanan intrakranial; relaksasi nafas dalam merangsang sistem parasimpatis untuk mengurangi persepsi nyeri; Ketorolac menghambat sintesis prostaglandin.',
            },
            {
              label: 'Manajemen Hipertensi (I.03114)',
              content: 'Monitor TD tiap 4 jam, kolaborasi Amlodipine 10 mg & Captopril 25 mg.',
              rationale: 'Amlodipine (CCB) menghambat influx kalsium di otot polos vaskular; Captopril (ACE-I) menghambat konversi angiotensin I → II, menurunkan tahanan perifer.',
            },
            {
              label: 'Edukasi Proses Penyakit (I.12399)',
              content: 'Ajarkan diet DASH, cara minum obat, jadwal kontrol.',
              rationale: 'Pengetahuan pasien & keluarga meningkatkan kepatuhan; diet DASH terbukti menurunkan TD sistolik 5–10 mmHg (Kemenkes RI, 2021).',
            },
          ],
        },

        { type: 'analysis',
          title: 'E. Analisa Evaluasi (SOAP)',
          items: [
            {
              label: 'S — Subjektif',
              content: 'Pasien menyatakan nyeri kepala berkurang (2/10), tidak lagi pusing.',
              rationale: 'Perbaikan subjektif mencerminkan efektivitas manajemen nyeri dan stabilisasi TD.',
            },
            {
              label: 'O — Objektif',
              content: 'TD 140/85 mmHg, pasien tampak rileks.',
              rationale: 'TD turun dari 180/100 → 140/85 menunjukkan respons positif terhadap antihipertensi.',
            },
            {
              label: 'A — Analisis',
              content: 'Masalah nyeri akut teratasi sebagian; risiko perfusi serebral menurun.',
              rationale: 'Kriteria hasil SLKI tercapai sebagian; intervensi dilanjutkan untuk mencapai target penuh.',
            },
            {
              label: 'P — Planning',
              content: 'Lanjutkan monitor TD, edukasi kontrol rutin, discharge planning.',
              rationale: 'Kontinuitas asuhan mencegah readmisi dan komplikasi jangka panjang (Brunner & Suddarth, 2020).',
            },
          ],
        },
      ],
    },
  ],
};

export const LOGBOOK_HTN_DOCUMENT = logbookTnSHipertensiPemasanganInfus001;
export const logbookDocument = logbookTnSHipertensiPemasanganInfus001;
export default logbookTnSHipertensiPemasanganInfus001;
