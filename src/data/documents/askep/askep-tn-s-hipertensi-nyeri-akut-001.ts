import { NurseDocument } from "../../../types";

export const askepTnSHipertensiNyeriAkut001: NurseDocument = {
  id: 'askep-htn',
  type: 'askep',
  title: 'Asuhan Keperawatan pada Tn. S dengan Hipertensi',
  subtitle: 'RSUD Dr. Soetomo · Periode 10–12 Oktober 2025',
  ruangan: 'Irina C2',
  author: 'Ahmad Fauzi, S.Kep',
  clinicalTeacher: 'Ns. Rina W., M.Kep (Dosen)',
  clinicalInstructor: 'Ns. Dita P., S.Kep (CI Ruang)',
  date: '12 Oktober 2025',
  tags: ['Hipertensi Stage 2', 'Dewasa', 'Rawat Inap'],
  stats: { words: 1900, readTime: 12 },
  summary: 'Asuhan keperawatan komprehensif pada Tn. S dengan hipertensi stage 2 disertai nyeri kepala. Fokus intervensi pada manajemen nyeri, stabilisasi TD, dan edukasi diet DASH.',
  sections: [
    /* ---------- COVER ---------- */
    {
      id: 'cover', heading: '', isCover: true,
      blocks: [{
        type: 'cover',
        header: 'Universitas Indonesia\nFakultas Ilmu Keperawatan',
        category: 'Asuhan Keperawatan',
        judul: 'Asuhan Keperawatan pada Tn. S dengan Hipertensi',
        penyusun: [
          { label: 'Nama',   value: 'Ahmad Fauzi, S.Kep' },
          { label: 'NIM',    value: '202103045' },
          { label: 'Ruang',  value: 'Irina C2' },
        ],
        footer: 'Program Profesi Ners\n2025',
      }],
    },

    /* ---------- 1. IDENTITAS ---------- */
    {
      id: 'id-pasien', num: '1', heading: 'Identitas Pasien',
      keywords: ['identitas', 'biodata'],
      blocks: [
        { type: 'identity',
          title: 'Data Pasien',
          fields: [
            { label: 'Nama',              value: 'Tn. S' },
            { label: 'Umur',              value: '55 tahun' },
            { label: 'Jenis Kelamin',     value: 'Laki-laki' },
            { label: 'Status Perkawinan', value: 'Kawin' },
            { label: 'Pekerjaan',         value: 'Wiraswasta' },
            { label: 'Pendidikan',        value: 'SMA' },
            { label: 'Agama',             value: 'Islam' },
            { label: 'Alamat',            value: 'Jl. Kenanga No. 45, Surabaya' },
            { label: 'No. RM',            value: '1120998' },
            { label: 'Tanggal MRS',       value: '10 Oktober 2025' },
            { label: 'Diagnosa Medis',    value: 'Hipertensi Stage 2' },
            { label: 'Ruang/Kelas',       value: 'Irina C2 / Kelas III' },
          ],
        },
      ],
    },

    /* ---------- 2. PENGKAJIAN ---------- */
    {
      id: 'pengkajian', num: '2', heading: 'Pengkajian Keperawatan',
      keywords: ['pengkajian', 'Gordon', 'anamnesis'],
      blocks: [
        { type: 'section', num: 'A', heading: 'Riwayat Kesehatan' },
        { type: 'subsubsection', num: 'a', text: 'Riwayat Kesehatan Sekarang' },
        { type: 'paragraph', text: 'Pasien datang ke IGD RSUD pada 10 Oktober 2025 pukul 08.30 WIB dengan keluhan nyeri kepala berdenyut sejak 3 hari SMRS. Nyeri dirasakan terutama di bagian oksipital, skala 6/10, memberat saat beraktivitas. Pasien juga mengeluh pusing dan mudah lelah.' },
        { type: 'subsubsection', num: 'b', text: 'Riwayat Kesehatan Dahulu' },
        { type: 'paragraph', text: 'Pasien memiliki riwayat hipertensi sejak 5 tahun lalu namun tidak rutin mengonsumsi obat antihipertensi. Tidak ada riwayat DM, jantung, atau stroke.' },
        { type: 'subsubsection', num: 'c', text: 'Riwayat Kesehatan Keluarga' },
        { type: 'paragraph', text: 'Ayah pasien memiliki riwayat hipertensi. Tidak ada riwayat penyakit menular dalam keluarga.' },

        { type: 'section', num: 'B', heading: 'Pola Fungsi Kesehatan Gordon' },
        { type: 'table',
          headers: ['Pola', 'Data Hasil Pengkajian'],
          rows: [
            ['Persepsi Kesehatan', 'Pasien menganggap hipertensi bukan penyakit serius, tidak rutin kontrol.'],
            ['Nutrisi-Metabolik', 'Makan 3×/hari, sering mengonsumsi makanan asin & gorengan. BB 82 kg, TB 168 cm (IMT 29,1 — obesitas).'],
            ['Aktivitas-Latihan', 'Aktivitas ringan, tidak rutin olahraga. Dispnea saat aktivitas berat.'],
            ['Tidur-Istirahat', 'Tidur 6 jam/hari, sering terbangun karena nyeri kepala.'],
            ['Kognitif-Perseptif', 'Nyeri kepala skala 6/10, pusing, penglihatan kabur sesaat.'],
            ['Persepsi Diri', 'Cemas dengan kondisinya, khawatir biaya pengobatan.'],
            ['Peran-Hubungan', 'Suami dari Ny. R, hubungan sosial baik dengan tetangga.'],
            ['Seksualitas-Reproduksi', 'Tidak ada keluhan.'],
            ['Koping-Toleransi Stres', 'Koping adaptif, dukungan keluarga baik.'],
            ['Nilai-Kepercayaan', 'Islam, sholat 5 waktu saat sehat.'],
          ],
        },

        { type: 'section', num: 'C', heading: 'Pengkajian Fisik (Data Fokus)' },
        { type: 'table',
          headers: ['Parameter', 'Hasil', 'Normal', 'Interpretasi'],
          rows: [
            ['Kesadaran', 'Compos mentis, GCS 15', 'GCS 15', 'Normal'],
            ['Tekanan Darah', '180/100 mmHg', '<120/80', '↑ Tinggi'],
            ['Nadi', '98 x/menit', '60–100', 'Normal'],
            ['RR', '22 x/menit', '16–20', '↑ Takipnea'],
            ['Suhu', '36.8 °C', '36.5–37.5', 'Normal'],
            ['SpO₂', '97%', '≥95%', 'Normal'],
            ['Skala Nyeri', '6/10 (oksipital)', '0/10', 'Sedang'],
          ],
        },

        { type: 'section', num: 'D', heading: 'Pemeriksaan Laboratorium' },
        { type: 'table',
          headers: ['Pemeriksaan', 'Hasil', 'Nilai Rujukan', 'Keterangan'],
          rows: [
            ['Hemoglobin', '13.2 g/dL', '13–17', 'Normal'],
            ['Leukosit', '8.500/µL', '4.000–10.000', 'Normal'],
            ['Trombosit', '255.000/µL', '150.000–400.000', 'Normal'],
            ['Ureum', '32 mg/dL', '15–45', 'Normal'],
            ['Kreatinin', '1.1 mg/dL', '0.7–1.3', 'Normal'],
            ['Natrium', '142 mEq/L', '135–145', 'Normal'],
            ['Kalium', '4.2 mEq/L', '3.5–5.0', 'Normal'],
            ['Kolesterol Total', '245 mg/dL', '<200', '↑ Tinggi'],
          ],
        },

        { type: 'section', num: 'E', heading: 'Terapi Obat' },
        { type: 'table',
          headers: ['Nama Obat', 'Dosis', 'Rute', 'Frekuensi', 'Indikasi'],
          rows: [
            ['Amlodipine', '10 mg', 'Oral', '1×/hari (pagi)', 'Antihipertensi (CCB)'],
            ['Captopril', '25 mg', 'Oral', '3×/hari', 'Antihipertensi (ACE-I)'],
            ['Ketorolac', '30 mg', 'IV', '3×/hari', 'Analgesik nyeri kepala'],
            ['Ranitidin', '150 mg', 'Oral', '2×/hari', 'Protektor lambung'],
            ['Simvastatin', '20 mg', 'Oral', '1×/hari (malam)', 'Penurun kolesterol'],
          ],
        },
      ],
    },

    /* ---------- 3. ANALISIS DATA ---------- */
    {
      id: 'analisis', num: '3', heading: 'Analisis Data',
      keywords: ['analisis', 'PES', 'data'],
      blocks: [
        { type: 'paragraph', text: 'Analisis data menggunakan format PES (Problem, Etiologi, Sign/Symptom) berdasarkan data subjektif (D.s) dan data objektif (D.o).' },
        { type: 'table',
          headers: ['No', 'D.s (Data Subjektif)', 'D.o (Data Objektif)', 'Problem', 'Etiologi'],
          rows: [
            ['1', 'Pasien mengeluh nyeri kepala berdenyut, skala 6/10', 'Pasien tampak meringis, TD 180/100 mmHg', 'Nyeri Akut', 'Agen pencedera fisiologis (↑TD)'],
            ['2', 'Pasien mengeluh pusing saat beraktivitas', 'TD 180/100 mmHg, kolesterol 245 mg/dL', 'Risiko Perfusi Serebral Tidak Efektif', 'Hipertensi & hiperkolesterolemia'],
            ['3', 'Keluarga menyatakan tidak tahu cara merawat pasien hipertensi', 'Pasien tidak rutin kontrol, diet tidak terkontrol', 'Manajemen Kesehatan Keluarga Tidak Efektif', 'Kurang pengetahuan & dukungan'],
          ],
        },
      ],
    },

    /* ---------- 4. DIAGNOSA ---------- */
    {
      id: 'diagnosa', num: '4', heading: 'Diagnosa Keperawatan',
      keywords: ['diagnosa', 'SDKI'],
      blocks: [
        { type: 'paragraph', text: 'Diagnosa keperawatan disusun berdasarkan SDKI dengan prioritas berdasarkan tingkat keparahan dan risiko.' },
        { type: 'table',
          headers: ['No. Dx', 'Diagnosa (SDKI)', 'D.s (Data Subjektif)', 'D.o (Data Objektif)', 'Prioritas'],
          rows: [
            ['I', 'Nyeri Akut (D.0077)', 'Nyeri kepala berdenyut skala 6/10', 'Tampak meringis, TD 180/100 mmHg', 'Utama'],
            ['II', 'Risiko Perfusi Serebral Tidak Efektif (D.0017)', 'Pusing saat aktivitas', 'Hipertensi stage 2, kolesterol tinggi', 'Kedua'],
            ['III', 'Manajemen Kesehatan Keluarga Tidak Efektif (D.0116)', 'Keluarga tidak tahu cara merawat', 'Pasien tidak rutin kontrol, diet tidak terkontrol', 'Ketiga'],
          ],
        },
      ],
    },

    /* ---------- 5. INTERVENSI ---------- */
    {
      id: 'intervensi', num: '5', heading: 'Intervensi Keperawatan',
      keywords: ['intervensi', 'SLKI', 'SIKI', 'rasional'],
      blocks: [
        { type: 'paragraph', text: 'Intervensi disusun berdasarkan SLKI (luaran) dan SIKI (intervensi) dengan menyertakan rasional ilmiah.' },
        { type: 'table',
          headers: ['No. Dx', 'SLKI (Luaran)', 'SIKI (Intervensi)', 'Rasional'],
          rows: [
            [
              'I',
              'Tingkat Nyeri (L.08066): skala nyeri menurun (≤3), ekspresi wajah rileks',
              'Manajemen Nyeri (I.08238): kaji nyeri (PQRST), atur posisi semi-Fowler, ajarkan relaksasi nafas dalam, kolaborasi analgesik',
              'Posisi semi-Fowler menurunkan tekanan intrakranial; relaksasi mengurangi ketegangan otot; analgesik memblokir jalur nyeri',
            ],
            [
              'II',
              'Perfusi Serebral (L.02014): TD dalam rentang normal, tidak ada pusing',
              'Manajemen Hipertensi (I.03114): monitor TD tiap 4 jam, kolaborasi antihipertensi (amlodipine, captopril), batasi aktivitas berat',
              'Monitoring mendeteksi perubahan dini; antihipertensi menurunkan afterload; pembatasan aktivitas mencegah lonjakan TD',
            ],
            [
              'III',
              'Manajemen Kesehatan (L.12107): keluarga mampu mengenali tanda bahaya & mendukung diet',
              'Edukasi Proses Penyakit (I.12399): jelaskan diet DASH, ajarkan cara minum obat, jadwalkan kontrol rutin',
              'Pengetahuan keluarga meningkatkan kepatuhan; diet DASH menurunkan TD 5–10 mmHg; kontrol rutin mencegah komplikasi',
            ],
          ],
        },
      ],
    },

    /* ---------- 6. IMPLEMENTASI ---------- */
    {
      id: 'implementasi', num: '6', heading: 'Implementasi Keperawatan',
      keywords: ['implementasi', 'SIKI', 'shift'],
      blocks: [
        { type: 'paragraph', text: 'Implementasi dilaksanakan selama 3 hari (10–12 Oktober 2025) mencakup 3 shift per hari: pagi (07.00–14.00), sore (14.00–21.00), malam (21.00–07.00).' },

        { type: 'subsubsection', num: 'a', text: 'Hari 1 — 10 Oktober 2025' },
        { type: 'table',
          headers: ['No. SIKI', 'Jam', 'Implementasi', 'Kategori'],
          rows: [
            ['I.08238', '08.45', 'Mengkaji nyeri (lokasi, skala, karakteristik)', 'Observasi'],
            ['I.08238', '08.50', 'Mengatur posisi semi-Fowler 30°', 'Terapeutik'],
            ['I.08238', '09.00', 'Mengajarkan teknik relaksasi nafas dalam', 'Edukasi'],
            ['I.08238', '09.15', 'Kolaborasi pemberian Ketorolac 30 mg IV', 'Kolaborasi'],
            ['I.03114', '09.30', 'Monitor TD tiap 4 jam', 'Observasi'],
            ['I.03114', '10.00', 'Kolaborasi pemberian Amlodipine 10 mg & Captopril 25 mg', 'Kolaborasi'],
            ['I.12399', '14.30', 'Edukasi diet DASH — batasi garam ≤5 g/hari', 'Edukasi'],
            ['I.12399', '15.00', 'Mengajarkan cara minum obat yang benar & jadwal kontrol', 'Edukasi'],
          ],
        },

        { type: 'subsubsection', num: 'b', text: 'Hari 2 — 11 Oktober 2025' },
        { type: 'table',
          headers: ['No. SIKI', 'Jam', 'Implementasi', 'Kategori'],
          rows: [
            ['I.08238', '07.30', 'Mengkaji ulang skala nyeri (hasil: 4/10)', 'Observasi'],
            ['I.08238', '07.45', 'Mempertahankan posisi semi-Fowler', 'Terapeutik'],
            ['I.03114', '08.00', 'Monitor TD (hasil: 165/95 mmHg)', 'Observasi'],
            ['I.03114', '08.30', 'Kolaborasi antihipertensi pagi', 'Kolaborasi'],
            ['I.12399', '10.00', 'Mendiskusikan menu DASH dengan keluarga', 'Edukasi'],
            ['I.12399', '15.00', 'Mengajarkan manajemen stres (distraksi, relaksasi)', 'Edukasi'],
          ],
        },

        { type: 'subsubsection', num: 'c', text: 'Hari 3 — 12 Oktober 2025' },
        { type: 'table',
          headers: ['No. SIKI', 'Jam', 'Implementasi', 'Kategori'],
          rows: [
            ['I.08238', '07.30', 'Mengkaji nyeri (hasil: 2/10)', 'Observasi'],
            ['I.03114', '08.00', 'Monitor TD (hasil: 140/85 mmHg)', 'Observasi'],
            ['I.12399', '09.00', 'Evaluasi pemahaman pasien & keluarga tentang diet & obat', 'Edukasi'],
            ['I.12399', '10.00', 'Menyusun discharge planning bersama pasien', 'Edukasi'],
          ],
        },
      ],
    },

    /* ---------- 7. EVALUASI ---------- */
    {
      id: 'evaluasi', num: '7', heading: 'Evaluasi Keperawatan',
      keywords: ['evaluasi', 'SOAP'],
      blocks: [
        { type: 'paragraph', text: 'Evaluasi disusun menggunakan format SOAP (Subjektif, Objektif, Analisis, Planning) per diagnosa keperawatan.' },
        { type: 'table',
          headers: ['No. Dx', 'S (Subjektif)', 'O (Objektif)', 'A (Analisis)', 'P (Planning)'],
          rows: [
            [
              'I',
              'Pasien menyatakan nyeri kepala sudah berkurang, skala nyeri 2/10',
              'Pasien tampak rileks, TD 140/85 mmHg',
              'Masalah nyeri akut teratasi sebagian',
              'Lanjutkan manajemen nyeri non-farmakologis, hentikan analgesik IV, ganti oral bila perlu',
            ],
            [
              'II',
              'Pasien menyatakan tidak lagi pusing',
              'TD 140/85 mmHg, tidak ada tanda ↑ICP',
              'Risiko perfusi serebral menurun',
              'Pertahankan monitor TD, lanjutkan antihipertensi oral',
            ],
            [
              'III',
              'Keluarga menyatakan sudah memahami diet DASH & jadwal kontrol',
              'Keluarga mampu menyebutkan kembali 3 makanan yang harus dihindari',
              'Manajemen kesehatan keluarga meningkat',
              'Lanjutkan edukasi kontrol rutin, berikan leaflet discharge',
            ],
          ],
        },
      ],
    },
  ],
};

export const ASKEP_HTN_DOCUMENT = askepTnSHipertensiNyeriAkut001;
export const askepDocument = askepTnSHipertensiNyeriAkut001;
export default askepTnSHipertensiNyeriAkut001;
