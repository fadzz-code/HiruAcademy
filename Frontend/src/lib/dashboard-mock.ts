export type Membership = "free" | "lms" | "sensei";
export type FeatureState = "active" | "limited" | "readonly" | "locked";

export type DashboardFeature = {
  key: string;
  title: string;
  description: string;
  icon: "achievement" | "certificate" | "community" | "practice" | "replay" | "sensei" | "tryout" | "checkpoint";
  state: FeatureState;
  label: string;
};

export type DashboardData = {
  membership: Membership;
  membershipLabel: string;
  user: { displayName: string; initials: string };
  journey: { levelLabel: string; chapterLabel: string; nextActivity: string; progressLabel: string };
  features: DashboardFeature[];
  lms?: LmsDashboardFixture;
};

export type LmsDashboardFixture = {
  eyebrow: string;
  heading: string;
  description: string;
  continue: { label: string; title: string; description: string; primary: string; secondary: string; href: string };
  quickSection: { eyebrow: string; heading: string; description: string };
  quickActions: { title: string; detail: string; icon: DashboardFeature["icon"] | "journey" | "library"; href?: string }[];
  entitlementSection: { eyebrow: string; heading: string; description: string };
  entitlements: { title: string; status: "AKTIF" | "TERKUNCI" | "WA"; description: string }[];
  progressSection: { eyebrow: string; heading: string; description: string };
};

const featureCatalog = {
  practice: { key: "practice", title: "Latihan Harian", description: "Latihan ringan untuk menguatkan materi yang sedang dipelajari.", icon: "practice" as const },
  tryout: { key: "tryout", title: "Try Out", description: "Simulasi ujian dengan hasil dan ulasan sesuai aturan yang berlaku.", icon: "tryout" as const },
  achievement: { key: "achievement", title: "Achievement", description: "Lihat pencapaian dari perjalanan belajarmu.", icon: "achievement" as const },
  community: { key: "community", title: "Community", description: "Terhubung dengan ruang belajar komunitas HIRU.", icon: "community" as const },
  certificate: { key: "certificate", title: "Sertifikat", description: "Akses sertifikat sesuai kelayakan programmu.", icon: "certificate" as const },
  replay: { key: "replay", title: "Replay Kelas", description: "Buka kembali materi dari kelas yang tersedia.", icon: "replay" as const },
  sensei: { key: "sensei", title: "Tanya Sensei", description: "Kirim pertanyaan dalam konteks kelas belajarmu.", icon: "sensei" as const },
  checkpoint: { key: "checkpoint", title: "Mini Checkpoint", description: "Evaluasi kelas berdasarkan level, sesi, dan part.", icon: "checkpoint" as const },
};

const memberships: Record<Membership, Omit<DashboardData, "membership" | "features"> & { states: Record<string, FeatureState> }> = {
  free: {
    membershipLabel: "Free Member",
    user: { displayName: "Teman HIRU", initials: "TH" },
    journey: { levelLabel: "Akses belajar gratis", chapterLabel: "Chapter pengenalan", nextActivity: "Lanjutkan materi gratis", progressLabel: "Progress demo tersimpan" },
    states: { practice: "limited", tryout: "locked", achievement: "locked", community: "readonly", certificate: "locked", replay: "locked", sensei: "locked", checkpoint: "locked" },
  },
  lms: {
    membershipLabel: "Belajar Mandiri",
    user: { displayName: "Teman HIRU", initials: "TH" },
    journey: { levelLabel: "Level aktif", chapterLabel: "Chapter yang sedang dipelajari", nextActivity: "Lanjutkan aktivitas berikutnya", progressLabel: "Progress mengikuti aktivitas selesai" },
    states: { practice: "active", tryout: "active", achievement: "active", community: "active", certificate: "active", replay: "locked", sensei: "locked", checkpoint: "locked" },
  },
  sensei: {
    membershipLabel: "Belajar dengan Sensei",
    user: { displayName: "Teman HIRU", initials: "TH" },
    journey: { levelLabel: "Level & cohort aktif", chapterLabel: "Chapter yang sedang dipelajari", nextActivity: "Lanjutkan aktivitas berikutnya", progressLabel: "Progress mengikuti aktivitas selesai" },
    states: { practice: "active", tryout: "active", achievement: "active", community: "active", certificate: "active", replay: "active", sensei: "active", checkpoint: "active" },
  },
};

const labels: Record<FeatureState, string> = { active: "Aktif", limited: "Terbatas", readonly: "Baca saja", locked: "Terkunci" };

const lmsFixture: LmsDashboardFixture = {
  eyebrow: "BELAJAR MANDIRI • 2 LEVEL AKTIF",
  heading: "Selamat datang, Hilmi",
  description: "Lanjutkan progress terakhir atau pilih level aktif lain.",
  continue: { label: "LANJUTKAN BELAJAR", title: "Chapter 4 — JLPT N4", description: "Progress terakhir berasal dari backend. N4 dan N3 aktif serta tersimpan terpisah.", primary: "Lanjutkan Belajar", secondary: "Pilih Level", href: "/journey/n4?membership=lms" },
  quickSection: { eyebrow: "AKSI CEPAT", heading: "Akses yang paling sering digunakan", description: "Satu pola tindakan yang sama di seluruh jenis akun." },
  quickActions: [
    { title: "Lanjutkan", detail: "Chapter 4", icon: "journey", href: "/journey/n4?membership=lms" },
    { title: "Pilih Level", detail: "2 level aktif", icon: "journey", href: "/journey?membership=lms" },
    { title: "Flashcard", detail: "Semua deck", icon: "practice", href: "/learn/n4/chapter-4/flashcards?membership=lms" },
    { title: "Latihan Harian", detail: "Aktif", icon: "practice" },
    { title: "Try Out", detail: "Simulasi JLPT", icon: "tryout", href: "/tryout?membership=lms" },
    { title: "Perpustakaan", detail: "Semua materi", icon: "library" },
  ],
  entitlementSection: { eyebrow: "STATUS ENTITLEMENT", heading: "Fitur dan hak aksesmu", description: "Semua fitur tetap terlihat; status ditentukan plan, level, dan backend." },
  entitlements: [
    { title: "Perjalanan Level", status: "AKTIF", description: "Kelola N4 dan N3 aktif dalam satu akun." },
    { title: "Chapter & Materi", status: "AKTIF", description: "Seluruh Chapter terbuka pada level yang dibeli." },
    { title: "Latihan Harian", status: "AKTIF", description: "Latihan harian terbuka pada level aktif." },
    { title: "Try Out & Ulasan", status: "AKTIF", description: "Try Out dan ulasan jawaban tersedia." },
    { title: "Community", status: "AKTIF", description: "Buat postingan dan balas percakapan." },
    { title: "Sertifikat", status: "AKTIF", description: "Sertifikat tersedia setelah syarat terpenuhi." },
    { title: "Jadwal Kelas", status: "TERKUNCI", description: "Buka Jadwal Kelas melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin." },
    { title: "Replay Kelas", status: "TERKUNCI", description: "Buka Replay Kelas melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin." },
    { title: "Tanya Sensei", status: "TERKUNCI", description: "Buka Tanya Sensei melalui Belajar dengan Sensei dan pembayaran via WhatsApp Admin." },
    { title: "Achievement", status: "AKTIF", description: "Achievement, streak, dan milestone tersedia pada Belajar Mandiri." },
    { title: "Mini Checkpoint Kelas", status: "TERKUNCI", description: "Khusus Belajar dengan Sensei. Buka akses melalui WhatsApp Admin." },
    { title: "Membership & Payment", status: "WA", description: "Renewal atau upgrade dilanjutkan melalui WhatsApp Admin." },
  ],
  progressSection: { eyebrow: "PROGRES", heading: "Aktivitas dan motivasi", description: "Nilai aktual mengikuti aktivitas yang tersimpan di backend." },
};

export function getDashboardData(membership: Membership): DashboardData {
  const config = memberships[membership];
  return {
    membership,
    membershipLabel: config.membershipLabel,
    user: membership === "lms" ? { displayName: "Hilmi", initials: "HI" } : config.user,
    journey: config.journey,
    lms: membership === "lms" ? lmsFixture : undefined,
    features: Object.values(featureCatalog).map((feature) => {
      const state = config.states[feature.key] ?? "locked";
      return { ...feature, state, label: labels[state] };
    }),
  };
}

export function parseMembership(value?: string): Membership {
  return value === "lms" || value === "sensei" ? value : "free";
}
