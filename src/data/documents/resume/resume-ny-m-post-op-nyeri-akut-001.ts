import { NurseDocument } from "../../../types";

export const resumeNyMPostOpNyeriAkut001: NurseDocument = {
  id: 'resume-ny-m-post-op',
  type: 'resume',
  title: 'Resume Keperawatan: Ny. M Post-Op Laparoskopi Apendektomi',
  subtitle: 'Unit One Day Care (ODC) & Pemulihan Pascabedah · Masa Rawat 1x24 Jam',
  ruangan: 'One Day Care (ODC)',
  author: 'Ahmad Fauzi, S.Kep',
  clinicalTeacher: 'Ns. Rina W., M.Kep',
  clinicalInstructor: 'Ns. Ratna S., S.Kep (CI Bedah)',
  date: '15 Oktober 2025',
  tags: ['Resume Kasus', 'Post-Op', 'ODC / Rawat Singkat', 'Laparoskopi'],
  stats: { words: 1350, readTime: 8 },
  summary: 'Resume keperawatan rawat singkat (ODC) pada Ny. M (28 th) pasca laparoskopi apendektomi hari ke-0. Berfokus pada pemantauan skor pemulihan Aldrete, kontrol nyeri akut pascabedah, mobilisasi dini, toleransi oral, hingga kriteria pemulangan pasien.',
  sections: [
    /* ---------- COVER ---------- */
    {
      id: 'cover', heading: '', isCover: true,
      blocks: [{
        type: 'cover',
        header: 'RSUD Dr. Soetomo Surabaya\nInstalasi Rawat Jalan & One Day Care (ODC)',
        category: 'Resume Kasus Keperawatan',
        judul: 'Resume Keperawatan Pasien Post-Operasi Laparoskopi Apendektomi (One Day Care)',
        penyusun: [
          { label: 'Nama Perawat', value: 'Ahmad Fauzi, S.Kep' },
          { label: 'NIM',          value: '202103045' },
          { label: 'Unit Layanan', value: 'Ruang Pemulihan / ODC Bedah' },
        ],
        footer: 'Program Profesi Ners Keperawatan Medikal Bedah\n2025',
      }],
    },

    /* ---------- 1. IDENTITAS & DATA MASUK ---------- */
    {
      id: 'identitas-resume', num: '1', heading: 'Identitas & Informasi Kedatangan',
      keywords: ['identitas', 'odc', 'rawat jalan'],
      blocks: [
        {
          type: 'identity',
          title: 'Data Pasien & Layanan Singkat',
          fields: [
            { label: 'Nama Pasien',       value: 'Ny. M' },
            { label: 'No. Rekam Medis',   value: '1124501' },
            { label: 'Umur / Gender',     value: '28 tahun / Perempuan' },
            { label: 'Tanggal Pelayanan', value: '15 Oktober 2025' },
            { label: 'Jam Masuk ODC',     value: '07.00 WIB (Persiapan Pre-Op)' },
            { label: 'Jam Pindah PACU',   value: '10.15 WIB (Selesai Operasi)' },
            { label: 'Jam Pemulangan',    value: '17.30 WIB (Discharge Same-Day)' },
            { label: 'Diagnosa Medis',    value: 'Apendisitis Akut Non-Perforasi' },
            { label: 'Tindakan Operasi',  value: 'Laparoscopic Appendectomy (General Anesthesia)' },
            { label: 'Dokter Operator',   value: 'dr. H. Santoso, Sp.B, Subsp.BD' },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          icon: 'file-text',
          text: 'Resume Keperawatan ini digunakan khusus untuk masa perawatan singkat (<24–48 jam), pemulihan pascabedah sehari (One Day Care), atau pelayanan rawat jalan terpadu guna memastikan kontinuitas perawatan mandiri aman di rumah.',
        },
      ],
    },

    /* ---------- 2. PENGKAJIAN FOKUS & SKOR PEMULIHAN ---------- */
    {
      id: 'pengkajian-odc', num: '2', heading: 'Pengkajian Fokus Pemulihan & Tanda Vital',
      keywords: ['tanda vital', 'aldrete', 'pemulihan'],
      blocks: [
        {
          type: 'paragraph',
          text: 'Pengkajian difokuskan pada status kesadaran pasca anestesi umum, kepatenan jalan napas, hemodinamik serial, tingkat nyeri insisi luka operasi port laparoskopi, bising usus, serta verifikasi pemulihan menggunakan Modified Aldrete Score.',
        },
        {
          type: 'table',
          headers: ['Waktu Observasi', 'TD (mmHg)', 'Nadi (x/m)', 'RR (x/m)', 'SpO₂', 'Skala Nyeri', 'Skor Aldrete'],
          rows: [
            ['10.15 (Tiba PACU)', '124/82', '86', '20', '98% (O₂ 3 lpm)', 'Skala 5/10', '8 / 10'],
            ['11.00 (PACU Menit 45)', '120/78', '80', '18', '99% (Room air)', 'Skala 4/10', '9 / 10'],
            ['12.30 (Pindah ODC)', '118/76', '78', '18', '99% (Room air)', 'Skala 3/10', '10 / 10 (Lulus PACU)'],
            ['15.00 (Mobilisasi)', '122/80', '82', '18', '98% (Room air)', 'Skala 2/10', '10 / 10'],
            ['17.00 (Pre-Discharge)', '116/74', '76', '16', '99% (Room air)', 'Skala 1–2/10', 'PADSS: 10 / 10'],
          ],
        },
        {
          type: 'table',
          headers: ['Parameter Fokus', 'Hasil Pemeriksaan Klinis', 'Keterangan'],
          rows: [
            ['Kesadaran', 'Compos mentis, orientasi waktu, tempat, dan orang baik (GCS 15)', 'Pulih penuh dari anestesi'],
            ['Luka Operasi', '3 luka tusuk port laparoskopi tertutup dressing steril film transparan, tidak ada rembesan darah aktif', 'Luka bersih & intak'],
            ['Gastrointestinal', 'Mual (-), muntah (-), bising usus 8x/menit normoaktif, flatus (+)', 'Peristaltik pulih'],
            ['Eliminasi Urine', 'Miksi spontan jernih 300 cc pukul 14.45 WIB tanpa kateter', 'Tidak ada retensi urine'],
            ['Mobilisasi', 'Dapat duduk mandiri dan berjalan perlahan tanpa pusing/ataksia', 'Toleransi gerak baik'],
          ],
        },
      ],
    },

    /* ---------- 3. DIAGNOSA & RENCANA ASUHAN RINGKAS ---------- */
    {
      id: 'diagnosa-resume', num: '3', heading: 'Diagnosa & Intervensi Keperawatan (SDKI & SIKI)',
      keywords: ['diagnosa', 'sdki', 'siki', 'intervensi'],
      blocks: [
        {
          type: 'paragraph',
          text: 'Masalah keperawatan prioritas yang ditegakkan selama periode observasi singkat pasca bedah:',
        },
        {
          type: 'table',
          headers: ['No. Dx (SDKI)', 'Luaran Keperawatan (SLKI)', 'Intervensi Keperawatan (SIKI)', 'Evaluasi Capaian'],
          rows: [
            [
              'Nyeri Akut (D.0077) b.d agen pencedera fisik (insisi bedah)',
              'Tingkat Nyeri (L.08066) menurun: keluhan meringis menurun, skala nyeri ≤2.',
              'Manajemen Nyeri (I.08238): Kaji PQRST, posisikan semi-Fowler 30°, ajarkan teknik napas dalam lambat, kolaborasi Paracetamol infus 1000 mg IV.',
              'Tercapai: Skala nyeri turun dari 5 menjadi 2/10, ekspresi wajah rileks.',
            ],
            [
              'Risiko Perlambatan Pemulihan Pascabedah (D.0142)',
              'Pemulihan Pascabedah (L.14129) membaik: kenyamanan meningkat, mobilitas mandiri.',
              'Perawatan Pascabedah (I.14562): Monitoring tanda vital tiap jam, bertahap uji coba minum air hangat, fasilitasi mobilisasi dini.',
              'Tercapai: Toleransi minum baik tanpa mual, Aldrete score 10, flatus positif.',
            ],
            [
              'Defisit Pengetahuan tentang Perawatan di Rumah (D.0111)',
              'Tingkat Pengetahuan (L.12111) meningkat: keluarga & pasien memahami pantangan dan jadwal kontrol.',
              'Edukasi Perawatan Pascabedah (I.12437): Jelaskan cara menjaga luka tetap kering, konsumsi obat teratur, kenali tanda infeksi (red flags).',
              'Tercapai: Pasien mampu mengulang 4 instruksi kepulangan dengan benar.',
            ],
          ],
        },
      ],
    },

    /* ---------- 4. CATATAN PERKEMBANGAN & EVALUASI AKHIR ---------- */
    {
      id: 'catatan-evaluasi', num: '4', heading: 'Catatan Perkembangan & Evaluasi Terakhir (SOAP)',
      keywords: ['evaluasi', 'soap', 'discharge'],
      blocks: [
        {
          type: 'paragraph',
          text: 'Evaluasi akhir menggunakan format SOAP sesaat sebelum pasien diserahterimakan kepada keluarga untuk rawat jalan:',
        },
        {
          type: 'soap',
          s: 'Pasien menyatakan nyeri di perut terasa sangat ringan (skala 1–2/10), tidak ada rasa mual maupun pusing, tenggorokan tidak sakit, sudah bisa minum air hangat dan makan biskuit tanpa muntah.',
          o: 'Kesadaran compos mentis (GCS 15), TD 116/74 mmHg, Nadi 76 x/menit, RR 16 x/menit, Suhu 36.6 °C, SpO₂ 99% udara bebas. Luka operasi kering tanpa rembesan, bising usus (+) normal. Miksi spontan warna kuning jernih. Skor kriteria pemulangan rawat jalan PADSS (Post Anesthetic Discharge Scoring System) mencapai 10/10.',
          a: 'Pemulihan pascabedah laparoskopi apendektomi berlangsung optimal tanpa komplikasi pasca anestesi; kondisi pasien stabil dan memenuhi syarat pemulangan (Discharge Criteria Met).',
          p: 'Lepas jalur infus IV kateter secara aseptik, serahkan obat pulang dan surat kontrol, berikan edukasi leaflet perawatan luka di rumah, izinkan pulang diantar keluarga.',
        },
      ],
    },

    /* ---------- 5. DISCHARGE PLANNING (INSTRUKSI KEPULANGAN) ---------- */
    {
      id: 'discharge-planning', num: '5', heading: 'Rencana Pemulangan (Discharge Planning) & Aspek Legal',
      keywords: ['discharge planning', 'obat pulang', 'kontrol'],
      blocks: [
        {
          type: 'heading',
          num: 'A',
          text: 'Terapi Obat Pulang (Oral)',
        },
        {
          type: 'table',
          headers: ['Nama Obat', 'Dosis', 'Rute', 'Frekuensi', 'Keterangan'],
          rows: [
            ['Cefixime tablet', '200 mg', 'Oral', '2× sehari (tiap 12 jam)', 'Antibiotik pasca bedah — habiskan selama 5 hari'],
            ['Asam Mefenamat', '500 mg', 'Oral', '3× sehari sesudah makan', 'Analgesik anti-inflamasi — minum jika nyeri'],
            ['Omeprazole kapsul', '20 mg', 'Oral', '1× sehari pagi sebelum makan', 'Protektor mukosa lambung'],
          ],
        },
        {
          type: 'heading',
          num: 'B',
          text: 'Instruksi Khusus Perawatan di Rumah',
        },
        {
          type: 'list',
          items: [
            'Jaga balutan luka operasi port laparoskopi tetap bersih dan kering. Jangan membuka balutan transparan sebelum jadwal kontrol.',
            'Boleh mandi menggunakan waslap tanpa membasahi area perban bedah secara langsung.',
            'Diet gizi seimbang tinggi protein (telur, ikan gabus/ayam) dan serat untuk mempercepat penyembuhan luka dan mencegah konstipasi.',
            'Hindari mengangkat beban berat (>5 kg) dan aktivitas fisik berat selama 1–2 minggu pertama.',
            'Jadwal Kontrol: Hari Senin, 20 Oktober 2025 pukul 09.00 WIB di Poli Bedah Digestive RSUD.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          icon: 'shield-alert',
          text: 'TANDA BAHAYA (Segera Hubungi IGD RSUD jika muncul): Demam tinggi >38.0 °C, luka operasi memerah/bengkak/berbau/keluar nanah, nyeri perut mendadak memberat, atau muntah terus-menerus.',
        },
        {
          type: 'table',
          headers: ['Pihak yang Menyerahkan', 'Pihak yang Menerima', 'Dokter Penanggung Jawab (DPJP)'],
          rows: [
            [
              'Ahmad Fauzi, S.Kep\n(Perawat Primer ODC)',
              'Ny. M & Tn. D\n(Pasien & Suami/Keluarga)',
              'dr. H. Santoso, Sp.B, Subsp.BD\n(Spesialis Bedah)',
            ],
          ],
        },
      ],
    },
  ],
};

export const resumeDocument = resumeNyMPostOpNyeriAkut001;
export const RESUME_DOCUMENT = resumeNyMPostOpNyeriAkut001;
export default resumeNyMPostOpNyeriAkut001;
