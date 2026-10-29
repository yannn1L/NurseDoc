import { NurseDocument } from "../../../types";

export const lpUmumHipertensiPerfusiPerifer001: NurseDocument = {
  id: 'lp-htn',
  type: 'lp',
  title: 'Laporan Pendahuluan: Asuhan Keperawatan pada Pasien Hipertensi',
  subtitle: 'Tinjauan Teori & Konsep Dasar Keperawatan Medikal Bedah',
  ruangan: 'Akademik',
  author: 'Ahmad Fauzi, S.Kep',
  clinicalTeacher: 'Ns. Rina W., M.Kep',
  clinicalInstructor: '—',
  date: '20 September 2025',
  tags: ['Hipertensi', 'Kardiovaskular', 'Tinjauan Teori'],
  stats: { words: 2400, readTime: 15 },
  summary: 'Laporan pendahuluan hipertensi mencakup tinjauan teori penyakit, konsep kebutuhan dasar manusia (mobilisasi & perfusi jaringan), dan konsep asuhan keperawatan berdasarkan SDKI, SLKI, dan SIKI.',
  sections: [
    /* ---------- COVER ---------- */
    {
      id: 'cover', heading: '', isCover: true,
      blocks: [{
        type: 'cover',
        header: 'Universitas Indonesia\nFakultas Ilmu Keperawatan',
        category: 'Laporan Pendahuluan',
        judul: 'Asuhan Keperawatan pada Pasien dengan Hipertensi',
        penyusun: [
          { label: 'Nama',     value: 'Ahmad Fauzi, S.Kep' },
          { label: 'NIM',      value: '202103045' },
          { label: 'Kelompok', value: 'A-2021' },
        ],
        footer: 'Program Studi Ilmu Keperawatan\n2025',
      }],
    },

    /* ---------- BAB I ---------- */
    {
      id: 'bab1', num: 'BAB I', heading: 'TINJAUAN TEORI KASUS',
      keywords: ['teori', 'konsep penyakit', 'pathway'],
      blocks: [
        { type: 'section', num: 'A', heading: 'Konsep Penyakit' },
        { type: 'heading', num: '1', text: 'Pengertian' },
        { type: 'paragraph', text: 'Hipertensi atau tekanan darah tinggi adalah kondisi kronis ketika tekanan darah pada dinding arteri meningkat secara persisten. Menurut PERHI (2021), seseorang didiagnosis hipertensi jika tekanan darah sistolik ≥140 mmHg dan/atau diastolik ≥90 mmHg pada dua kali pengukuran berbeda.' },

        { type: 'heading', num: '2', text: 'Penyebab / Etiologi' },
        { type: 'subsubsection', num: 'a', text: 'Hipertensi Primer (Esensial)' },
        { type: 'list', items: [
          'Faktor genetik / riwayat keluarga',
          'Obesitas dan resistensi insulin',
          'Konsumsi garam berlebih (>6 g/hari)',
          'Stres psikologis kronis',
          'Merokok & konsumsi alkohol',
        ]},
        { type: 'subsubsection', num: 'b', text: 'Hipertensi Sekunder' },
        { type: 'list', items: [
          'Penyakit ginjal (glomerulonefritis, pielonefritis)',
          'Kelainan endokrin (hipertiroidisme, feokromositoma)',
          'Koarktasio aorta',
          'Konsumsi obat-obatan (kortikosteroid, kontrasepsi oral)',
        ]},

        { type: 'heading', num: '3', text: 'Patofisiologi' },
        { type: 'paragraph', text: 'Peningkatan curah jantung dan/atau tahanan perifer menyebabkan peningkatan tekanan arteri. Aktivasi sistem renin-angiotensin-aldosteron (RAAS) memicu retensi natrium dan air, meningkatkan volume intravaskular. Remodeling vaskular berkelanjutan menyebabkan kekakuan dinding arteri dan memperberat hipertensi.' },

        { type: 'heading', num: '4', text: 'Tanda dan Gejala' },
        { type: 'table',
          headers: ['Gejala Umum', 'Gejala Berat (Krisis Hipertensi)'],
          rows: [
            ['Nyeri kepala oksipital', 'Nyeri kepala hebat'],
            ['Pusing & vertigo', 'Penglihatan kabur'],
            ['Epistaksis', 'Sesak napas'],
            ['Mudah lelah', 'Nyeri dada'],
            ['Tinnitus', 'Penurunan kesadaran'],
          ],
        },

        { type: 'heading', num: '5', text: 'Pemeriksaan Penunjang' },
        { type: 'table',
          headers: ['Pemeriksaan', 'Nilai Normal', 'Interpretasi Hipertensi'],
          rows: [
            ['TD (mmHg)', '<120/80', '≥140/90'],
            ['EKG', 'Irama sinus normal', 'LVH, iskemik'],
            ['Ureum/Kreatinin', 'Normal', '↑ jika nefropati'],
            ['Elektrolit', 'Normal', 'Hipokalemia (sekunder)'],
            ['Funduskopi', 'Normal', 'Retinopati grade I–IV'],
            ['Ekokardiografi', 'Normal', 'Penebalan ventrikel kiri'],
          ],
        },

        { type: 'heading', num: '6', text: 'Penatalaksanaan Medis' },
        { type: 'subsubsection', num: 'a', text: 'Farmakologi' },
        { type: 'list', items: [
          'ACE inhibitor (captopril, lisinopril)',
          'ARB (losartan, valsartan)',
          'CCB (amlodipine, nifedipine)',
          'Diuretik (HCT, furosemide)',
          'Beta-blocker (bisoprolol, atenolol)',
        ]},
        { type: 'subsubsection', num: 'b', text: 'Non-Farmakologi' },
        { type: 'list', items: [
          'Diet DASH (rendah garam, tinggi kalium)',
          'Aktivitas fisik 30 menit, 5×/minggu',
          'Berhenti merokok & alkohol',
          'Manajemen stres & tidur cukup',
          'Penurunan BB jika obesitas',
        ]},

        { type: 'section', num: 'B', heading: 'Pathway / Pohon Masalah' },
        { type: 'pathway',
          title: 'Pathway Hipertensi',
          steps: [
            { text: 'Faktor risiko (genetik, gaya hidup, obesitas)' },
            { text: 'Aktivasi RAAS & retensi Na⁺/H₂O' },
            { text: 'Peningkatan volume & tahanan perifer' },
            { text: 'Hipertensi persisten (≥140/90 mmHg)' },
            { text: 'Komplikasi: Nyeri kepala, Perfusi serebral ↓, Risiko cedera', highlight: true },
          ],
        },
      ],
    },

    /* ---------- BAB II ---------- */
    {
      id: 'bab2', num: 'BAB II', heading: 'KONSEP KEBUTUHAN DASAR MANUSIA',
      keywords: ['KDM', 'perfusi', 'mobilisasi'],
      blocks: [
        { type: 'section', num: 'A', heading: 'Pengertian' },
        { type: 'paragraph', text: 'Kebutuhan dasar manusia adalah kebutuhan esensial yang harus dipenuhi untuk mempertahankan homeostasis dan kesejahteraan. Pada pasien hipertensi, kebutuhan yang terganggu utama adalah perfusi jaringan dan rasa nyaman (nyeri).' },

        { type: 'section', num: 'B', heading: 'Tujuan' },
        { type: 'list', items: [
          'Mempertahankan perfusi organ vital dalam batas adekuat.',
          'Mengurangi nyeri dan meningkatkan rasa nyaman.',
          'Mencegah komplikasi kardiovaskular dan serebrovaskular.',
          'Meningkatkan kemandirian pasien dalam manajemen hipertensi.',
        ]},

        { type: 'section', num: 'C', heading: 'Indikasi dan Kontraindikasi' },
        { type: 'table',
          headers: ['Aspek', 'Indikasi', 'Kontraindikasi'],
          rows: [
            ['Manajemen Nyeri', 'Nyeri skala ≥3', 'Nyeri akut abdomen belum terdiagnosis'],
            ['Mobilisasi', 'Hemodinamik stabil', 'TD >180/110 mmHg belum terkontrol'],
            ['Diet DASH', 'Hipertensi primer & sekunder', 'Gagal ginjal berat (batasi K⁺)'],
            ['Latihan Fisik', 'Hipertensi stage 1–2', 'Krisis hipertensi, angina aktif'],
          ],
        },
      ],
    },

    /* ---------- BAB III ---------- */
    {
      id: 'bab3', num: 'BAB III', heading: 'KONSEP ASUHAN KEPERAWATAN',
      keywords: ['askep', 'SDKI', 'SLKI', 'SIKI'],
      blocks: [
        { type: 'heading', num: '1', text: 'Pengkajian [Teori]' },
        { type: 'paragraph', text: 'Pengkajian keperawatan pada pasien hipertensi meliputi riwayat kesehatan (keluhan utama, riwayat penyakit sekarang/dahulu/keluarga), pola fungsi kesehatan Gordon (11 pola), pemeriksaan fisik fokus kardiovaskular, serta pemeriksaan penunjang.' },
        { type: 'table',
          headers: ['Pola Gordon', 'Fokus Kajian pada Hipertensi'],
          rows: [
            ['Persepsi-Kesehatan', 'Pengetahuan tentang hipertensi, kepatuhan obat'],
            ['Nutrisi-Metabolik', 'Pola makan, konsumsi garam, BB/TB'],
            ['Aktivitas-Latihan', 'Toleransi aktivitas, kelelahan, dispnea'],
            ['Tidur-Istirahat', 'Kualitas tidur, insomnia'],
            ['Kognitif-Perseptif', 'Nyeri kepala, pusing, penglihatan'],
            ['Persepsi diri', 'Kecemasan, stres psikologis'],
          ],
        },

        { type: 'heading', num: '2', text: 'Diagnosis Keperawatan [Teori]' },
        { type: 'list', items: [
          'Nyeri Akut (D.0077) — berhubungan dengan agen pencedera fisiologis.',
          'Risiko Perfusi Serebral Tidak Efektif (D.0017) — dibuktikan dengan hipertensi.',
          'Intoleransi Aktivitas (D.0056) — berhubungan dengan kelemahan.',
          'Ansietas (D.0080) — berhubungan dengan krisis situasional.',
        ]},

        { type: 'heading', num: '3', text: 'Intervensi Keperawatan [Teori]' },
        { type: 'table',
          headers: ['SDKI', 'SLKI', 'SIKI'],
          rows: [
            ['Nyeri Akut', 'Tingkat Nyeri (L.08066)', 'Manajemen Nyeri (I.08238)'],
            ['Risiko Perfusi Serebral', 'Perfusi Serebral (L.02014)', 'Manajemen Hipertensi (I.03114)'],
            ['Intoleransi Aktivitas', 'Toleransi Aktivitas (L.05047)', 'Manajemen Energi (I.05178)'],
            ['Ansietas', 'Tingkat Ansietas (L.09093)', 'Reduksi Ansietas (I.09326)'],
          ],
        },

        { type: 'heading', num: '4', text: 'Implementasi Keperawatan [Teori]' },
        { type: 'paragraph', text: 'Implementasi keperawatan dilakukan berdasarkan SIKI, mencakup tindakan observasi (monitoring TD, skala nyeri), terapeutik (manajemen nyeri non-farmakologis), edukasi (diet DASH, kepatuhan obat), dan kolaborasi (pemberian antihipertensi).' },

        { type: 'heading', num: '5', text: 'Evaluasi Keperawatan [Teori]' },
        { type: 'paragraph', text: 'Evaluasi menggunakan format SOAP (Subjektif, Objektif, Analisis, Planning). Kriteria hasil mengacu pada SLKI: skala nyeri menurun, TD dalam rentang normal, pasien mampu mempertahankan aktivitas tanpa kelelahan.' },
      ],
    },

    /* ---------- DAFTAR PUSTAKA ---------- */
    {
      id: 'daftar-pustaka', num: '', heading: 'DAFTAR PUSTAKA',
      keywords: ['referensi', 'APA'],
      blocks: [
        { type: 'bibliography',
          items: [
            'Brunner, L. S., & Suddarth, D. S. (2020). Brunner & Suddarth\'s textbook of medical-surgical nursing (14th ed.). Wolters Kluwer.',
            'Kementerian Kesehatan RI. (2021). Pedoman pengendalian hipertensi. Kemenkes RI.',
            'Perhimpunan Dokter Hipertensi Indonesia. (2021). Konsensus penatalaksanaan hipertensi 2021. PERHI.',
            'Tim Pokja SDKI DPP PPNI. (2017). Standar diagnosis keperawatan Indonesia (Edisi 1). DPP PPNI.',
            'Tim Pokja SLKI DPP PPNI. (2019). Standar luaran keperawatan Indonesia (Edisi 1). DPP PPNI.',
            'Tim Pokja SIKI DPP PPNI. (2018). Standar intervensi keperawatan Indonesia (Edisi 1). DPP PPNI.',
          ],
        },
      ],
    },
  ],
};

export const LP_HTN_DOCUMENT = lpUmumHipertensiPerfusiPerifer001;
export const lpDocument = lpUmumHipertensiPerfusiPerifer001;
export default lpUmumHipertensiPerfusiPerifer001;
