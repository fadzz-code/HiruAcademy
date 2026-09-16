export type MenuItem = { label: string; href: string; group: string };

export const adminMenu: readonly MenuItem[] = [
  { label: "Dashboard", href: "/admin", group: "Ringkasan" },
  { label: "Landing Page", href: "/admin/landing-page", group: "Website" },
  { label: "Program & Harga", href: "/admin/program-harga", group: "Website" },
  { label: "Kurikulum & Materi", href: "/admin/kurikulum-materi", group: "Content Studio" },
  { label: "Bank Soal", href: "/admin/bank-soal", group: "Content Studio" },
  { label: "Testimoni", href: "/admin/testimoni", group: "Content Studio" },
  { label: "Blog & SEO", href: "/admin/blog-seo", group: "Content Studio" },
  { label: "Pengumuman", href: "/admin/pengumuman", group: "Content Studio" },
  { label: "Placement & Hasil", href: "/admin/placement-hasil", group: "Operasional" },
  { label: "Pengguna & Akses", href: "/admin/pengguna-akses", group: "Operasional" },
  { label: "Invoice", href: "/admin/invoice", group: "Transaksi" },
  { label: "Affiliate & Komisi", href: "/admin/affiliate-komisi", group: "Transaksi" },
  { label: "Pencairan Komisi", href: "/admin/pencairan-komisi", group: "Transaksi" },
  { label: "Sensei", href: "/admin/sensei", group: "Kelas" },
  { label: "Kelas & Jadwal", href: "/admin/kelas-jadwal", group: "Kelas" },
  { label: "Analitik", href: "/admin/analitik", group: "Insight" },
  { label: "Pengaturan & Integrasi", href: "/admin/pengaturan-integrasi", group: "Sistem" },
];

export const adminGroups = ["Ringkasan", "Website", "Content Studio", "Operasional", "Transaksi", "Kelas", "Insight", "Sistem"].map((label) => ({ label, items: adminMenu.filter((item) => item.group === label) }));

export type ScreenConfig = {
  title: string;
  description: string;
  tabs: readonly string[];
  createLabel?: string;
  fields?: readonly string[];
  kind?: "invoice" | "payout" | "integration" | "analytics";
};

export const screens: Record<string, ScreenConfig> = {
  "landing-page": { title: "Landing Page", description: "Atur susunan halaman utama, tampilan harga, dan publikasi.", tabs: ["Bagian Halaman", "Tampilan Harga", "Riwayat Versi"], createLabel: "Tambah Bagian", fields: ["Judul bagian", "Isi", "Tombol"] },
  "program-harga": { title: "Program & Harga", description: "Kelola program, level, manfaat, harga tampilan, dan publikasi.", tabs: ["Program", "Level", "Harga", "Manfaat"], createLabel: "Buat Program", fields: ["Nama program", "Deskripsi", "Level"] },
  "kurikulum-materi": { title: "Kurikulum & Materi", description: "Susun chapter, lesson, flashcard, media, dan urutan belajar.", tabs: ["Chapter", "Lesson", "Flashcard", "Perpustakaan Konten"], createLabel: "Buat Materi", fields: ["Judul materi", "Jenis materi", "Level dan chapter"] },
  "bank-soal": { title: "Bank Soal", description: "Susun quiz, checkpoint, try out, dan mini checkpoint.", tabs: ["Quiz", "Checkpoint", "Try Out", "Mini Checkpoint"], createLabel: "Buat Soal", fields: ["Pertanyaan", "Pilihan jawaban", "Pembahasan"] },
  "placement-hasil": { title: "Placement & Hasil", description: "Tinjau placement lead dan hasil evaluasi siswa.", tabs: ["Placement Test", "Lead", "Hasil Evaluasi"], createLabel: "Buat Pertanyaan Placement", fields: ["Pertanyaan", "Pilihan jawaban", "Rekomendasi"] },
  "pengguna-akses": { title: "Pengguna & Akses", description: "Kelola akun, membership, akses belajar, dan sertifikat.", tabs: ["Pengguna", "Akses", "Sertifikat"], createLabel: "Tambah Pengguna", fields: ["Nama", "Email atau WhatsApp", "Membership"] },
  invoice: { title: "Invoice", description: "Tinjau pembayaran dari menunggu sampai selesai atau ditolak.", tabs: ["Semua", "Menunggu", "Diperiksa", "Terverifikasi", "Ditolak"], kind: "invoice" },
  "affiliate-komisi": { title: "Affiliate & Komisi", description: "Kelola kode affiliate, pembelian, dan komisi yang memenuhi ketentuan.", tabs: ["Affiliate", "Kode", "Pembelian", "Komisi"], createLabel: "Tambah Affiliate", fields: ["Nama affiliate", "Kode", "Catatan"] },
  "pencairan-komisi": { title: "Pencairan Komisi", description: "Tinjau permintaan pencairan dan catat hasil pembayaran.", tabs: ["Menunggu", "Diproses", "Dibayar", "Ditolak"], kind: "payout" },
  testimoni: { title: "Testimoni", description: "Tinjau persetujuan, pilihan unggulan, dan publikasi testimoni.", tabs: ["Kandidat", "Disetujui", "Unggulan", "Ditolak"], createLabel: "Tambah Testimoni", fields: ["Nama tampilan", "Kutipan", "Persetujuan"] },
  "blog-seo": { title: "Blog & SEO", description: "Kelola artikel, kategori, pencarian, dan publikasi.", tabs: ["Artikel", "Kategori", "Pencarian", "Jadwal"], createLabel: "Buat Artikel", fields: ["Judul artikel", "Ringkasan", "Kata kunci"] },
  pengumuman: { title: "Pengumuman", description: "Kelola sasaran, prioritas, jadwal, dan publikasi pengumuman.", tabs: ["Terbit", "Terjadwal", "Draf", "Arsip"], createLabel: "Buat Pengumuman", fields: ["Judul", "Isi", "Sasaran"] },
  sensei: { title: "Sensei", description: "Kelola profil, keahlian, ketersediaan, dan penugasan.", tabs: ["Aktif", "Ketersediaan", "Penugasan"], createLabel: "Tambah Sensei", fields: ["Nama Sensei", "Keahlian", "Ketersediaan"] },
  "kelas-jadwal": { title: "Kelas & Jadwal", description: "Kelola cohort, jadwal kelas, sesi, dan replay.", tabs: ["Cohort", "Jadwal", "Sesi", "Replay"], createLabel: "Buat Kelas", fields: ["Nama kelas", "Sensei", "Jadwal"] },
  analitik: { title: "Analitik", description: "Pantau kunjungan, pendaftaran, transaksi, dan aktivitas belajar.", tabs: ["Ringkasan", "Akuisisi", "Pembelajaran", "Transaksi"], kind: "analytics" },
  "pengaturan-integrasi": { title: "Pengaturan & Integrasi", description: "Kelola branding, bahasa, kontak, keamanan, dan status layanan.", tabs: ["Branding", "Bahasa & Standar", "Kontak", "Privasi & Keamanan", "Integrasi", "Profil Admin"], kind: "integration" },
};
