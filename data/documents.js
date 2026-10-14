/* ============================================================
   DOCUMENTS — 4 dokumen mock (setara hasil konversi DOCX → JSON)
============================================================ */
export const DOCUMENTS = [
  {
id: 'askep-htn',
  type: 'askep',
  title: 'Asuhan Keperawatan pada Tn. S dengan Hipertensi',
  subtitle: 'RSUD Dr. Soetomo · Periode 10–12 Okt 2025',
  ruangan: 'Irina C2',
  author: 'Ns. Ahmad Fauzi, S.Kep',
  clinicalTeacher: 'Ns. Rina W., M.Kep (Dosen)',
  clinicalInstructor: 'Ns. Dita P., S.Kep (CI Ruang)',
  date: '12 Oktober 2025',
  tags: ['Hipertensi Stage 2', 'Dewasa', 'Rawat Inap'],
  stats: { words: 1240, readTime: 8 },
    summary: 'Asuhan keperawatan komprehensif pada pasien dewasa dengan hipertensi stage 2 disertai nyeri kepala. Fokus intervensi pada manajemen nyeri, kontrol tekanan darah, dan edukasi diet DASH.',
    sections: [
      {
        id: 's1', num: '1', heading: 'Pengkajian Keperawatan',
        keywords: ['pengkajian','anamnesis','vital sign'],
        blocks: [
          { type:'paragraph', text:'Pengkajian dilakukan pada tanggal 10 Oktober 2025 pukul 08.30 WIB melalui metode autoanamnesis dan alloanamnesis (istri pasien). Pasien kooperatif, kesadaran compos mentis, GCS 15.' },
          { type:'subheading', text:'Data Subjektif' },
          { type:'list', items:[
            'Pasien mengeluh nyeri kepala berdenyut sejak 3 hari SMRS, skala nyeri 6/10, terutama di bagian oksipital.',
            'Riwayat hipertensi sejak 5 tahun, tidak rutin minum obat antihipertensi.',
            'Mengeluh pusing saat beraktivitas dan mudah lelah.',
            'Riwayat merokok 10 batang/hari selama 15 tahun.'
          ]},
          { type:'subheading', text:'Data Objektif' },
          { type:'table',
            headers:['Parameter','Hasil','Nilai Normal','Interpretasi'],
            rows:[
              ['Tekanan Darah','180/100 mmHg','<120/80 mmHg','Meningkat ↑'],
              ['Nadi','98 x/menit','60–100 x/menit','Normal'],
              ['RR','22 x/menit','16–20 x/menit','Meningkat ↑'],
              ['Suhu','36.8 °C','36.5–37.5 °C','Normal'],
              ['SpO₂','97%','≥95%','Normal'],
              ['Skala Nyeri','6/10','0/10','Sedang'],
            ]
          },
        ]
      },
      {
        id: 's2', num: '2', heading: 'Diagnosa Keperawatan',
        keywords: ['diagnosa','SDKI','prioritas'],
        blocks: [
          { type:'paragraph', text:'Berdasarkan analisis data, dirumuskan tiga diagnosa keperawatan berdasarkan SDKI dengan prioritas sebagai berikut:' },
          { type:'diagnosa', priority:'Prioritas Utama', title:'Nyeri Akut (D.0077)', detail:'Berhubungan dengan agen pencedera fisiologis (peningkatan tekanan darah), ditandai dengan pasien mengeluh nyeri kepala, skala nyeri 6/10, tampak meringis.' },
          { type:'diagnosa', priority:'Prioritas Kedua', title:'Risiko Perfusi Serebral Tidak Efektif (D.0017)', detail:'Dibuktikan dengan hipertensi (TD 180/100 mmHg) dan keluhan pusing.' },
          { type:'diagnosa', priority:'Prioritas Ketiga', title:'Manajemen Kesehatan Keluarga Tidak Efektif (D.0116)', detail:'Dibuktikan dengan ketidakmampuan keluarga merawat anggota keluarga dengan hipertensi dan tidak rutin kontrol.' },
        ]
      },
      {
        id: 's3', num: '3', heading: 'Intervensi Keperawatan',
        keywords: ['intervensi','SIKI','rencana'],
        blocks: [
          { type:'paragraph', text:'Intervensi disusun berdasarkan SIKI (Standar Intervensi Keperawatan Indonesia) dengan target waktu 3×24 jam.' },
          { type:'table',
            headers:['Dx','Tujuan & Kriteria Hasil','Intervensi (SIKI)'],
            rows:[
              ['I','Nyeri berkurang (skala ≤ 3) dalam 3×24 jam','Manajemen Nyeri (I.08238): kaji nyeri, ajarkan teknik relaksasi, kolaborasi analgesik'],
              ['II','Perfusi serebral adekuat, TD dalam rentang normal','Manajemen Hipertensi: monitor TD tiap 4 jam, atur posisi semi-Fowler, kolaborasi antihipertensi'],
              ['III','Keluarga mampu merawat pasien hipertensi','Edukasi Proses Penyakit: jelaskan diet DASH, aktivitas, kepatuhan minum obat'],
            ]
          },
        ]
      },
      {
        id: 's4', num: '4', heading: 'Implementasi & Evaluasi',
        keywords: ['implementasi','evaluasi','SOAP'],
        blocks: [
          { type:'paragraph', text:'Implementasi dilaksanakan selama 3 hari perawatan dengan evaluasi formatif setiap shift dan evaluasi sumatif di hari ketiga.' },
          { type:'subheading', text:'Evaluasi Sumatif (Hari ke-3)' },
          { type:'soap',
            s:'Pasien menyatakan nyeri kepala sudah berkurang, skala nyeri 2/10. Pasien sudah memahami diet rendah garam.',
            o:'TD 140/85 mmHg, N 84 x/menit, RR 18 x/menit, SpO₂ 98%. Pasien tampak lebih tenang, keluarga aktif bertanya.',
            a:'Masalah nyeri akut teratasi sebagian. Risiko perfusi serebral menurun. Manajemen keluarga meningkat.',
            p:'Lanjutkan monitor TD, edukasi kontrol rutin, rencana pulang (discharge planning).'
          },
        ]
      },
    ]
  },

  {
id: 'logbook-1',
  type: 'logbook',
  title: 'Logbook Praktik Klinik Keperawatan — Minggu 1–4',
  subtitle: 'Program Profesi Ners · Semester Ganjil 2025/2026',
  ruangan: 'Irina C2',
  author: 'Ahmad Fauzi (NIM: 202103045)',
  clinicalTeacher: 'Ns. Rina W., M.Kep',
  clinicalInstructor: 'Ns. Dita P., S.Kep',
  date: '1–28 September 2025',
  tags: ['Praktik Klinik', 'Ruang Mawar', '47 Tindakan'],
  stats: { words: 640, readTime: 5 },
    summary: 'Rekapitulasi kegiatan praktik klinik selama 4 minggu meliputi tindakan keperawatan mandiri, kolaboratif, dan pendidikan kesehatan kepada pasien dan keluarga.',
    sections: [
      {
        id:'lb1', num:'W1', heading:'Minggu 1 — Orientasi & Asuhan Dasar',
        keywords:['orientasi','vital sign','ADL'],
        blocks:[
          { type:'table',
            headers:['Tanggal','Kegiatan','Tindakan','Supervisor'],
            rows:[
              ['1 Sep','Orientasi ruangan & preceptor','Pengenalan alur, alat, dan SOP ruangan','Ns. Rina'],
              ['2 Sep','Asuhan dasar pasien','Observasi TTV 8 pasien, bantu ADL','Ns. Dita'],
              ['4 Sep','Manajemen nyeri','Kompres hangat, relaksasi nafas pada 2 pasien','Ns. Rina'],
              ['6 Sep','Dokumentasi','Pengisian CPPT & lembar observasi','CI Ruangan'],
            ]
          },
        ]
      },
      {
        id:'lb2', num:'W2', heading:'Minggu 2 — Tindakan Kolaboratif',
        keywords:['kolaboratif','infus','injeksi'],
        blocks:[
          { type:'table',
            headers:['Tanggal','Kegiatan','Tindakan','Supervisor'],
            rows:[
              ['8 Sep','Pemasangan infus','IV line pada 3 pasien (didampingi)','Ns. Rina'],
              ['10 Sep','Injeksi IM','Ketorolac IM 2 pasien mandiri','Ns. Dita'],
              ['12 Sep','Perawatan luka','Ganti balutan post-op 4 pasien','Ns. Rina'],
              ['13 Sep','Edukasi','Diet DM pada 3 keluarga pasien','CI Ruangan'],
            ]
          },
        ]
      },
      {
        id:'lb3', num:'W3', heading:'Minggu 3 — Tindakan Mandiri',
        keywords:['mandiri','kepemimpinan','catheter'],
        blocks:[
          { type:'table',
            headers:['Tanggal','Kegiatan','Tindakan','Supervisor'],
            rows:[
              ['15 Sep','Kepemimpinan tim','Operan shift pagi 10 pasien','Ns. Rina'],
              ['17 Sep','Pemasangan kateter','Kateterisasi 2 pasien mandiri','Ns. Rina'],
              ['19 Sep','NGT','Pemasangan NGT 1 pasien mandiri','CI Ruangan'],
              ['20 Sep','Asuhan kompleks','Total care pasien bed rest','Ns. Dita'],
            ]
          },
        ]
      },
      {
        id:'lb4', num:'W4', heading:'Minggu 4 — Asuhan Komprehensif & Refleksi',
        keywords:['komprehensif','refleksi','presentasi'],
        blocks:[
          { type:'list', items:[
            'Menyusun ASKEP lengkap pada Tn. S dengan hipertensi dan dipresentasikan di depan CI.',
            'Melakukan discharge planning kepada 3 pasien dengan DM dan hipertensi.',
            'Refleksi: meningkatkan kemampuan komunikasi terapeutik dan manajemen waktu asuhan.',
            'Total tindakan tercatat: 47 tindakan (32 mandiri, 15 kolaboratif).'
          ]},
          { type:'quote', text:'Praktik klinik mengajarkan bahwa keterampilan teknis hanyalah separuh dari keperawatan — sisanya adalah kehadiran penuh bagi pasien.' },
        ]
      },
    ]
  },

  {
id: 'lp-dm',
  type: 'lp',
  title: 'Laporan Pendahuluan: Asuhan Keperawatan pada Pasien Diabetes Mellitus Tipe 2',
  subtitle: 'Tinjauan Teori & Konsep Dasar Keperawatan Medikal Bedah',
  ruangan: 'Akademik',
  author: 'Ahmad Fauzi, S.Kep',
  clinicalTeacher: 'Ns. Rina W., M.Kep',
  clinicalInstructor: '—',
  date: '20 September 2025',
  tags: ['Diabetes Mellitus Tipe 2', 'Endokrin', 'Konsep Teori'],
  stats: { words: 980, readTime: 7 },
    summary: 'Tinjauan teoritis diabetes mellitus tipe 2 mencakup definisi, etiologi, patofisiologi, manifestasi klinis, pemeriksaan penunjang, dan konsep asuhan keperawatan menurut teori terkini.',
    sections: [
      {
        id:'lp1', num:'I', heading:'Konsep Dasar Penyakit',
        keywords:['definisi','etiologi','klasifikasi'],
        blocks:[
          { type:'paragraph', text:'Diabetes Mellitus (DM) tipe 2 adalah gangguan metabolik kronis yang ditandai dengan hiperglikemia akibat resistensi insulin dan/atau defisiensi insulin relatif. Menurut PERKENI (2021), DM tipe 2 mencakup >90% kasus diabetes di Indonesia.' },
          { type:'subheading', text:'Etiologi' },
          { type:'list', items:[
            'Faktor genetik (riwayat keluarga DM)',
            'Obesitas sentral (IMT > 25 kg/m²)',
            'Pola makan tinggi gula & lemak, rendah serat',
            'Kurang aktivitas fisik',
            'Usia > 45 tahun, hipertensi, dislipidemia',
          ]},
        ]
      },
      {
        id:'lp2', num:'II', heading:'Patofisiologi',
        keywords:['patofisiologi','insulin','hiperglikemia'],
        blocks:[
          { type:'paragraph', text:'Pada DM tipe 2 terjadi resistensi reseptor insulin pada sel target (otot, lemak, hati). Pankreas mengompensasi dengan meningkatkan sekresi insulin (hiperinsulinemia), namun seiring waktu sel β mengalami kelelahan (β-cell exhaustion) sehingga produksi insulin menurun.' },
          { type:'callout', icon:'alert-circle', variant:'info', text:'Akibatnya terjadi hiperglikemia kronis yang memicu glikasi protein, stres oksidatif, dan kerusakan mikrovaskular (retinopati, nefropati, neuropati) serta makrovaskular (stroke, PJK).' },
        ]
      },
      {
        id:'lp3', num:'III', heading:'Manifestasi Klinis & Pemeriksaan',
        keywords:['gejala','pemeriksaan','laboratorium'],
        blocks:[
          { type:'subheading', text:'Trias Klasik' },
          { type:'list', items:['Poliuri (banyak kencing)','Polidipsi (banyak minum)','Polifagi (banyak makan)'] },
          { type:'subheading', text:'Pemeriksaan Penunjang' },
          { type:'table',
            headers:['Pemeriksaan','Nilai Diagnosis','Keterangan'],
            rows:[
              ['GDS','≥ 200 mg/dL','Disertai gejala klasik'],
              ['GDP','≥ 126 mg/dL','Puasa ≥ 8 jam'],
              ['HbA1c','≥ 6.5%','Kontrol 3 bulan terakhir'],
              ['TTGO','≥ 200 mg/dL','2 jam post 75g glukosa'],
            ]
          },
        ]
      },
      {
        id:'lp4', num:'IV', heading:'Konsep Asuhan Keperawatan',
        keywords:['askep','diagnosa teori','intervensi'],
        blocks:[
          { type:'paragraph', text:'Diagnosa keperawatan yang sering muncul pada pasien DM tipe 2 menurut SDKI:' },
          { type:'list', items:[
            'Ketidakstabilan Kadar Glukosa Darah (D.0027)',
            'Risiko Infeksi (D.0142)',
            'Gangguan Integritas Kulit/Jaringan (D.0129)',
            'Ketidakpatuhan (D.0119)',
            'Defisit Pengetahuan (D.0111)',
          ]},
          { type:'quote', text:'Peran perawat bukan sekadar memberikan insulin — tetapi memberdayakan pasien untuk menjadi manajer utama kondisi kronisnya sendiri.' },
        ]
      },
    ]
  },

  {
    id: 'sop-infus',
  type: 'sop',
  title: 'SOP Pemasangan Infus (Intravena Kateter)',
  subtitle: 'Standar Prosedur Operasional Keperawatan · Revisi 03',
  ruangan: 'Seluruh Unit',
  author: 'Tim Keperawatan RSUD',
  clinicalTeacher: '—',
  clinicalInstructor: 'Komite Keperawatan',
  date: '1 Agustus 2025',
  tags: ['Prosedur', 'Invasif', 'Aspek Legal'],
  stats: { words: 720, readTime: 6 },
    summary: 'Prosedur standar pemasangan infus untuk mencegah komplikasi vaskular dan infeksi, mencakup persiapan alat, langkah kerja, hingga dokumentasi keperawatan.',
    sections: [
      {
        id:'sp1', num:'1', heading:'Pengertian & Tujuan',
        keywords:['pengertian','tujuan'],
        blocks:[
          { type:'paragraph', text:'Pemasangan infus adalah tindakan memasukkan kateter intravena ke dalam vena perifer untuk memberikan cairan, obat, atau nutrisi secara langsung ke dalam sirkulasi darah.' },
          { type:'subheading', text:'Tujuan' },
          { type:'list', items:[
            'Mempertahankan keseimbangan cairan & elektrolit',
            'Memberikan terapi obat intravena',
            'Memenuhi kebutuhan nutrisi parenteral',
            'Memfasilitasi transfusi darah',
          ]},
        ]
      },
      {
        id:'sp2', num:'2', heading:'Ruang Lingkup & Kebijakan',
        keywords:['ruang lingkup','kebijakan'],
        blocks:[
          { type:'list', items:[
            'Berlaku di seluruh unit rawat inap, IGD, dan kamar operasi.',
            'Dilakukan oleh perawat dengan kompetensi minimal PK II.',
            'Wajib menggunakan prinsip aseptik & hand hygiene 6 langkah WHO.',
          ]},
          { type:'callout', icon:'shield-alert', variant:'warning', text:'Perawat wajib memahami aspek legal: kesalahan prosedur dapat berimplikasi malpraktik sesuai UU No. 38/2014.' },
        ]
      },
      {
        id:'sp3', num:'3', heading:'Alat & Bahan',
        keywords:['alat','bahan','persiapan'],
        blocks:[
          { type:'table',
            headers:['No','Alat/Bahan','Jumlah','Keterangan'],
            rows:[
              ['1','Set infus (abocath) sesuai ukuran','1 set','No. 20G/22G/24G'],
              ['2','Cairan infus sesuai order','1 botol','Cek tanggal & kejernihan'],
              ['3','Infus set / tubing','1 set',''],
              ['4','Kapas alkohol / alcohol swab','3 buah',''],
              ['5','Handscoon steril','1 pasang',''],
              ['6','Plester & kasa steril','secukupnya','fiksasi'],
              ['7','Tourniquet','1 buah',''],
              ['8','Label infus & spidol','1 set','tanggal, jam, inisial'],
            ]
          },
        ]
      },
      {
        id:'sp4', num:'4', heading:'Langkah Kerja',
        keywords:['prosedur','langkah kerja','tindakan'],
        blocks:[
          { type:'steps', items:[
            { step:'Pre-Interaksi', text:'Cek identitas pasien, baca order dokter, verifikasi 5 benar pemberian obat/cairan.' },
            { step:'Hand Hygiene', text:'Cuci tangan 6 langkah dengan sabun dan air mengalir, keringkan dengan tisu.' },
            { step:'Persiapan Alat', text:'Siapkan alat di meja tindakan, periksa keutuhan kemasan & tanggal kadaluarsa.' },
            { step:'Komunikasi', text:'Jelaskan prosedur, tujuan, dan kemungkinan ketidaknyamanan kepada pasien.' },
            { step:'Pemasangan', text:'Pasang tourniquet 10–15 cm proksimal vena, pilih vena, lakukan aseptik, tusuk abocath 15–30°, masukkan, lepas tourniquet.' },
            { step:'Fiksasi', text:'Fiksasi kateter dengan plester/transparent dressing, pasang label tanggal-jam-inisial.' },
            { step:'Atur Tetesan', text:'Sesuaikan tetesan sesuai order (mis. 20 tetes/menit), observasi kelancaran.' },
            { step:'Post-Interaksi', text:'Rapikan pasien & alat, edukasi pasien untuk melaporkan jika nyeri/bengkak.' },
            { step:'Dokumentasi', text:'Catat di CPPT: waktu, lokasi vena, ukuran abocath, cairan, tetesan, kondisi pasien.' },
          ]},
        ]
      },
      {
        id:'sp5', num:'5', heading:'Dokumentasi & Hal yang Perlu Diperhatikan',
        keywords:['dokumentasi','komplikasi','evaluasi'],
        blocks:[
          { type:'subheading', text:'Komplikasi yang Perlu Diwaspadai' },
          { type:'list', items:[
            'Flebitis (merah, nyeri, hangat di area tusukan)',
            'Hematoma & perdarahan',
            'Infiltrasi cairan ke jaringan',
            'Tromboflebitis',
          ]},
          { type:'quote', text:'Prinsip utama: bukan sekadar berhasil menusuk vena, tetapi memastikan keamanan & kenyamanan pasien sepanjang terapi.' },
        ]
      },
    ]
  },
];