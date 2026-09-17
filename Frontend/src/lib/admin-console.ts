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
