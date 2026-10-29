import { NurseDocument } from "../../../types";

export const sopUmumTerapiCairanPemasanganInfus001: NurseDocument = {
  id: 'sop-infus',
  type: 'sop',
  title: 'SOP Pemasangan Infus (Intravena Kateter)',
  subtitle: 'Standar Prosedur Operasional Keperawatan · Revisi 03',
  ruangan: 'Seluruh Unit',
  author: 'Tim Keperawatan RSUD',
  clinicalTeacher: '—',
  clinicalInstructor: 'Komite Keperawatan',
  date: '1 Agustus 2025',
  tags: ['SOP', 'Prosedur Invasif', 'Aspek Legal'],
  stats: { words: 900, readTime: 6 },
  summary: 'Prosedur standar pemasangan infus untuk mencegah komplikasi vaskular dan infeksi, mencakup persiapan alat, langkah kerja, hingga dokumentasi keperawatan.',
  sections: [
    /* ---------- COVER ---------- */
    {
      id: 'cover', heading: '', isCover: true,
      blocks: [{
        type: 'cover',
        header: 'RSUD Dr. Soetomo\nKomite Keperawatan',
        category: 'Standar Prosedur Operasional',
        judul: 'Pemasangan Infus (Intravena Kateter)',
        penyusun: [
          { label: 'Disusun',   value: 'Tim Keperawatan' },
          { label: 'Revisi',    value: '03' },
          { label: 'Berlaku',   value: '1 Agustus 2025' },
        ],
        footer: 'RSUD Dr. Soetomo\n2025',
      }],
    },

    {
      id: 'pengertian', num: '1', heading: 'Pengertian',
      keywords: ['pengertian'],
      blocks: [
        { type: 'paragraph', text: 'Pemasangan infus adalah tindakan memasukkan kateter intravena ke dalam vena perifer untuk memberikan cairan, obat, atau nutrisi secara langsung ke dalam sirkulasi darah.' },
      ],
    },

    {
      id: 'tujuan', num: '2', heading: 'Tujuan',
      keywords: ['tujuan'],
      blocks: [
        { type: 'list', items: [
          'Mempertahankan keseimbangan cairan dan elektrolit.',
          'Memberikan terapi obat intravena.',
          'Memenuhi kebutuhan nutrisi parenteral.',
          'Memfasilitasi transfusi darah.',
        ]},
      ],
    },

    {
      id: 'ruang-lingkup', num: '3', heading: 'Ruang Lingkup & Kebijakan',
      keywords: ['kebijakan', 'legal'],
      blocks: [
        { type: 'list', items: [
          'Berlaku di seluruh unit rawat inap, IGD, dan kamar operasi.',
          'Dilakukan oleh perawat dengan kompetensi minimal PK II.',
          'Wajib menggunakan prinsip aseptik & hand hygiene 6 langkah WHO.',
        ]},
        { type: 'callout', icon: 'shield-alert', variant: 'warning', text: 'Perawat wajib memahami aspek legal: kesalahan prosedur dapat berimplikasi malpraktik sesuai UU No. 38/2014.' },
      ],
    },

    {
      id: 'alat', num: '4', heading: 'Alat & Bahan',
      keywords: ['alat', 'bahan'],
      blocks: [
        { type: 'table',
          headers: ['No', 'Alat/Bahan', 'Jumlah', 'Keterangan'],
          rows: [
            ['1', 'Set infus (abocath) sesuai ukuran', '1 set', 'No. 20G/22G/24G'],
            ['2', 'Cairan infus sesuai order', '1 botol', 'Cek tanggal & kejernihan'],
            ['3', 'Infus set / tubing', '1 set', '—'],
            ['4', 'Kapas alkohol / alcohol swab', '3 buah', '—'],
            ['5', 'Handscoon steril', '1 pasang', '—'],
            ['6', 'Plester & kasa steril', 'secukupnya', 'Fiksasi'],
            ['7', 'Tourniquet', '1 buah', '—'],
            ['8', 'Label infus & spidol', '1 set', 'Tanggal, jam, inisial'],
          ],
        },
      ],
    },

    {
      id: 'prosedur', num: '5', heading: 'Prosedur Pelaksanaan',
      keywords: ['prosedur', 'langkah kerja'],
      blocks: [
        { type: 'section', num: 'A', heading: 'Persiapan' },
        { type: 'table',
          headers: ['No', 'Langkah', 'Rasional'],
          rows: [
            ['1', 'Verifikasi identitas pasien & order dokter', 'Memenuhi 5 benar & mencegah kesalahan pasien'],
            ['2', 'Cuci tangan 6 langkah', 'Mencegah infeksi nosokomial'],
            ['3', 'Siapkan alat di meja tindakan, cek keutuhan kemasan & kadaluarsa', 'Menjamin sterilitas & keamanan bahan'],
            ['4', 'Jelaskan prosedur & tujuan pada pasien', 'Mendapatkan informed consent & mengurangi ansietas'],
          ],
        },

        { type: 'section', num: 'B', heading: 'Pelaksanaan' },
        { type: 'table',
          headers: ['No', 'Langkah', 'Rasional'],
          rows: [
            ['1', 'Pasang tourniquet 10–15 cm proksimal vena', 'Mengisi vena & memudahkan visualisasi'],
            ['2', 'Pilih vena yang sesuai (elastis, tidak di area sendi)', 'Menghindari kegagalan & nyeri berulang'],
            ['3', 'Lakukan aseptik area tusukan dengan kapas alkohol', 'Desinfeksi kulit menurunkan risiko flebitis'],
            ['4', 'Tusuk abocath 15–30°, perhatikan refluks darah', 'Sudut & refluks mengonfirmasi masuk vena'],
            ['5', 'Masukkan kateter, lepas tourniquet', 'Mencegah perdarahan & hematoma'],
            ['6', 'Fiksasi dengan plester/dressing steril', 'Menjaga posisi & mencegah infeksi'],
            ['7', 'Pasang label (tanggal, jam, inisial)', 'Traceability prosedur'],
            ['8', 'Atur tetesan sesuai order, observasi kelancaran', 'Menjamin terapi sesuai program'],
          ],
        },

        { type: 'section', num: 'C', heading: 'Evaluasi & Dokumentasi' },
        { type: 'table',
          headers: ['No', 'Langkah', 'Rasional'],
          rows: [
            ['1', 'Observasi kelancaran, tanda flebitis/infiltrasi', 'Deteksi dini komplikasi'],
            ['2', 'Edukasi pasien melaporkan nyeri/bengkak', 'Partisipasi pasien dalam monitoring'],
            ['3', 'Rapikan alat & pasien', 'Kenyamanan & keselamatan'],
            ['4', 'Dokumentasi di CPPT', 'Aspek legal & kontinuitas asuhan'],
          ],
        },
      ],
    },

    {
      id: 'komplikasi', num: '6', heading: 'Komplikasi & Hal yang Perlu Diperhatikan',
      keywords: ['komplikasi'],
      blocks: [
        { type: 'table',
          headers: ['Komplikasi', 'Tanda & Gejala', 'Penanganan'],
          rows: [
            ['Flebitis', 'Merah, nyeri, hangat di area tusukan', 'Cabut infus, kompres hangat, kolaborasi antibiotik'],
            ['Hematoma', 'Bengkak, kebiruan di area tusukan', 'Kompres dingin, hentikan perdarahan'],
            ['Infiltrasi', 'Bengkak, pucat, kulit dingin', 'Hentikan infus, angkat, kompres hangat'],
            ['Tromboflebitis', 'Vena keras, kemerahan sepanjang vena', 'Cabut infus, kompres hangat, kolaborasi antikoagulan'],
          ],
        },
        { type: 'quote', text: 'Prinsip utama: bukan sekadar berhasil menusuk vena, tetapi memastikan keamanan & kenyamanan pasien sepanjang terapi.' },
      ],
    },

    {
      id: 'referensi', num: '7', heading: 'Referensi',
      keywords: ['referensi'],
      blocks: [
        { type: 'bibliography',
          items: [
            'Perry, A. G., Potter, P. A., & Ostendorf, W. R. (2020). Clinical nursing skills and techniques (10th ed.). Elsevier.',
            'Tim Pokja SIKI DPP PPNI. (2018). Standar intervensi keperawatan Indonesia (Edisi 1). DPP PPNI.',
            'World Health Organization. (2019). Guidelines on hand hygiene in health care. WHO.',
          ],
        },
      ],
    },
  ],
};

export const SOP_INFUS_DOCUMENT = sopUmumTerapiCairanPemasanganInfus001;
export const sopDocument = sopUmumTerapiCairanPemasanganInfus001;
export default sopUmumTerapiCairanPemasanganInfus001;
