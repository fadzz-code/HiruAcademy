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

export function getDashboardData(membership: Membership): DashboardData {
  const config = memberships[membership];
  return {
    membership,
    membershipLabel: config.membershipLabel,
    user: config.user,
    journey: config.journey,
    features: Object.values(featureCatalog).map((feature) => {
      const state = config.states[feature.key] ?? "locked";
      return { ...feature, state, label: labels[state] };
    }),
  };
}

export function parseMembership(value?: string): Membership {
  return value === "lms" || value === "sensei" ? value : "free";
}
