export type Membership = "free" | "lms" | "sensei";
export type EntitlementState = "available" | "limited" | "readOnly" | "locked";
export type DashboardIcon = "achievement" | "certificate" | "checkpoint" | "community" | "journey" | "library" | "practice" | "replay" | "sensei" | "tryout";

export type DashboardAction = {
  title: string;
  detail: string;
  icon: DashboardIcon;
  href?: string;
};

export type DashboardEntitlement = {
  title: string;
  status: "AKTIF" | "TERKUNCI" | "TERBATAS" | "READ ONLY" | "CHAPTER 1" | "WA";
  state: EntitlementState;
  description: string;
};

export type DashboardConfig = {
  eyebrow: string;
  heading: string;
  description: string;
  badge: string;
  continue: {
    label: string;
    title: string;
    description: string;
    primary: string;
    primaryHref: string;
    secondary: string;
    secondaryHref: string;
    progress: string;
  };
  quickActions: DashboardAction[];
  entitlements: DashboardEntitlement[];
  progressSummary: { label: string; value: string }[];
  announcement: string;
};

export type DashboardData = {
  membership: Membership;
  membershipLabel: string;
  user: { displayName: string; initials: string };
  config: DashboardConfig;
};

const lmsEntitlements: DashboardEntitlement[] = [
  { title: "Perjalanan Level", status: "AKTIF", state: "available", description: "Kelola N4 dan N3 aktif dalam satu akun." },
  { title: "Chapter & Materi", status: "AKTIF", state: "available", description: "Seluruh Chapter terbuka pada level yang dibeli." },
  { title: "Latihan Harian", status: "AKTIF", state: "available", description: "Latihan harian terbuka pada level aktif." },
  { title: "Try Out & Ulasan", status: "AKTIF", state: "available", description: "Try Out dan ulasan jawaban tersedia." },
  { title: "Community", status: "AKTIF", state: "available", description: "Buat postingan dan balas percakapan." },
  { title: "Sertifikat", status: "AKTIF", state: "available", description: "Sertifikat tersedia setelah syarat terpenuhi." },
  { title: "Jadwal Kelas", status: "TERKUNCI", state: "locked", description: "Buka Jadwal Kelas melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin." },
  { title: "Replay Kelas", status: "TERKUNCI", state: "locked", description: "Buka Replay Kelas melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin." },
  { title: "Tanya Sensei", status: "TERKUNCI", state: "locked", description: "Buka Tanya Sensei melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin." },
  { title: "Achievement", status: "AKTIF", state: "available", description: "Achievement, streak, dan milestone tersedia pada Belajar Mandiri." },
  { title: "Mini Checkpoint Kelas", status: "TERKUNCI", state: "locked", description: "Khusus Belajar dengan Sensei. Buka akses melalui WhatsApp Admin." },
  { title: "Membership & Payment", status: "WA", state: "available", description: "Renewal atau upgrade dilanjutkan melalui WhatsApp Admin." },
];

const configs: Record<Membership, DashboardConfig> = {
  free: {
    eyebrow: "FREE MEMBER • CHAPTER 1 PADA N1–N5",
    heading: "Selamat datang, Hilmi",
    description: "Lanjutkan level terakhir atau pilih level lain untuk mencoba Chapter 1.",
    badge: "Free Member",
    continue: { label: "LANJUTKAN BELAJAR", title: "Chapter 1 — JLPT N4", description: "Contoh level terakhir yang dibuka. Chapter 1 pada N1, N2, N3, N4, dan N5 tetap tersedia.", primary: "Buka Chapter 1", primaryHref: "/learn/n4/chapter-1?membership=free", secondary: "Pilih Level", secondaryHref: "/journey?membership=free", progress: "56% selesai" },
    quickActions: [
      { title: "Lanjutkan", detail: "Chapter 1", icon: "journey", href: "/learn/n4/chapter-1?membership=free" },
      { title: "Pilih Level", detail: "N1–N5", icon: "journey", href: "/journey?membership=free" },
      { title: "Flashcard", detail: "Deck gratis", icon: "practice" },
      { title: "Latihan Harian", detail: "Akses terbatas", icon: "practice", href: "/practice?membership=free" },
      { title: "Komunitas", detail: "Baca saja", icon: "community", href: "/community?membership=free" },
      { title: "Bayar via WA", detail: "Buka akses", icon: "achievement", href: "/renewal?membership=free" },
    ],
    entitlements: lmsEntitlements.map((item) => ({ ...item, status: item.title === "Perjalanan Level" ? "AKTIF" : item.title === "Chapter & Materi" ? "CHAPTER 1" : item.title === "Latihan Harian" ? "TERBATAS" : item.title === "Community" ? "READ ONLY" : item.title === "Membership & Payment" ? "WA" : "TERKUNCI", state: item.title === "Perjalanan Level" || item.title === "Membership & Payment" ? "available" : item.title === "Chapter & Materi" || item.title === "Latihan Harian" ? "limited" : item.title === "Community" ? "readOnly" : "locked" })),
    progressSummary: [{ label: "XP Mingguan", value: "— XP" }, { label: "Streak Belajar", value: "— hari" }, { label: "Level Dicoba", value: "— level" }],
    announcement: "Akses Free Member mengikuti Chapter 1 dan status fitur yang tersedia.",
  },
  lms: {
    eyebrow: "BELAJAR MANDIRI • 2 LEVEL AKTIF",
    heading: "Selamat datang, Hilmi",
    description: "Lanjutkan progress terakhir atau pilih level aktif lain.",
    badge: "Belajar Mandiri",
    continue: { label: "LANJUTKAN BELAJAR", title: "Chapter 4 — JLPT N4", description: "Progress terakhir berasal dari backend. N4 dan N3 aktif serta tersimpan terpisah.", primary: "Lanjutkan Belajar", primaryHref: "/learn/n4/chapter-4?membership=lms", secondary: "Pilih Level", secondaryHref: "/journey?membership=lms", progress: "56% selesai" },
    quickActions: [
      { title: "Lanjutkan", detail: "Chapter 4", icon: "journey", href: "/learn/n4/chapter-4?membership=lms" },
      { title: "Pilih Level", detail: "2 level aktif", icon: "journey", href: "/journey?membership=lms" },
      { title: "Flashcard", detail: "Semua deck", icon: "practice", href: "/learn/n4/chapter-4/flashcards?membership=lms" },
      { title: "Latihan Harian", detail: "Aktif", icon: "practice", href: "/practice?membership=lms" },
      { title: "Try Out", detail: "Simulasi JLPT", icon: "tryout", href: "/tryout?membership=lms" },
      { title: "Perpustakaan", detail: "Semua materi", icon: "library", href: "/library?membership=lms" },
    ],
    entitlements: lmsEntitlements,
    progressSummary: [{ label: "XP Mingguan", value: "— XP" }, { label: "Streak Belajar", value: "— hari" }, { label: "Level Aktif", value: "2 level" }],
    announcement: "Journey, latihan, Try Out, community, dan sertifikat aktif sesuai level. Fitur Sensei memerlukan akses Belajar dengan Sensei.",
  },
  sensei: {
    eyebrow: "BELAJAR DENGAN SENSEI • 2 LEVEL & COHORT AKTIF",
    heading: "Selamat datang, Hilmi",
    description: "Lanjutkan belajar, periksa jadwal, atau buka replay kelas.",
    badge: "Belajar dengan Sensei",
    continue: { label: "LANJUTKAN BELAJAR", title: "Chapter 4 — JLPT N4", description: "Progress terakhir, jadwal, dan replay mengikuti level serta cohort aktif.", primary: "Lanjutkan Belajar", primaryHref: "/learn/n4/chapter-4?membership=sensei", secondary: "Lihat Jadwal", secondaryHref: "/schedule?membership=sensei", progress: "56% selesai" },
    quickActions: [
      { title: "Lanjutkan", detail: "Chapter 4", icon: "journey", href: "/learn/n4/chapter-4?membership=sensei" },
      { title: "Jadwal Kelas", detail: "Sesi berikutnya", icon: "journey", href: "/schedule?membership=sensei" },
      { title: "Masuk Kelas", detail: "Detail kelas", icon: "journey", href: "/schedule/chapter-4?membership=sensei" },
      { title: "Replay", detail: "Kelas tersimpan", icon: "replay", href: "/replay?membership=sensei" },
      { title: "Tanya Sensei", detail: "Kirim pertanyaan", icon: "sensei", href: "/ask-sensei?membership=sensei" },
      { title: "Mini Checkpoint", detail: "N4 sesi 2 part 1", icon: "checkpoint", href: "/mini-checkpoint?membership=sensei" },
    ],
    entitlements: [
      { title: "Perjalanan Level", status: "AKTIF", state: "available", description: "Kelola N4 dan N3 beserta cohort aktif." },
      { title: "Chapter & Materi", status: "AKTIF", state: "available", description: "Seluruh Chapter terbuka pada level aktif." },
      { title: "Latihan Harian", status: "AKTIF", state: "available", description: "Latihan harian tersedia pada setiap level aktif." },
      { title: "Try Out & Ulasan", status: "AKTIF", state: "available", description: "Try Out dan ulasan jawaban tersedia." },
      { title: "Community", status: "AKTIF", state: "available", description: "Buat postingan dan diskusi bersama cohort." },
      { title: "Sertifikat", status: "AKTIF", state: "available", description: "Sertifikat tersedia setelah syarat terpenuhi." },
      { title: "Jadwal Kelas", status: "AKTIF", state: "available", description: "Jadwal mengikuti cohort dan konfigurasi Admin." },
      { title: "Replay Kelas", status: "AKTIF", state: "available", description: "Buka kembali sesi yang telah dipublikasikan." },
      { title: "Tanya Sensei", status: "AKTIF", state: "available", description: "Kirim pertanyaan terkait materi kepada Sensei." },
      { title: "Achievement", status: "AKTIF", state: "available", description: "Achievement, streak, dan milestone tersedia sesuai progres belajar." },
      { title: "Mini Checkpoint Kelas", status: "AKTIF", state: "available", description: "Dibuka sesuai level, sesi, dan part. Timer dimulai saat Mini Checkpoint dimulai." },
      { title: "Membership & Payment", status: "WA", state: "available", description: "Renewal atau perubahan akses dilanjutkan melalui WhatsApp Admin." },
    ],
    progressSummary: [{ label: "XP Mingguan", value: "— XP" }, { label: "Streak Belajar", value: "— hari" }, { label: "Sesi Cohort", value: "— sesi" }],
    announcement: "Journey, latihan, Try Out, community, sertifikat, jadwal, replay, dan Tanya Sensei aktif sesuai level serta cohort.",
  },
};

export function getDashboardData(membership: Membership): DashboardData {
  return { membership, membershipLabel: configs[membership].badge, user: { displayName: "Hilmi", initials: "HI" }, config: configs[membership] };
}

export function parseMembership(value?: string): Membership {
  return value === "lms" || value === "sensei" ? value : "free";
}
