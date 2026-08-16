import type { Membership } from "@/lib/dashboard-mock";

export type LevelAccess = "owned" | "notPurchased" | "freePreview";
export type CohortState = "active" | "none";
export type LevelProgression = "current" | "available";
export type ChapterState = "completed" | "current" | "available" | "progressionLocked" | "entitlementLocked" | "finalPreview";

export type JourneyLevel = {
  slug: string;
  code: string;
  title: string;
  description: string;
  access: LevelAccess;
  cohort: CohortState;
  progression: LevelProgression;
  statusLabel: string;
  actionLabel: string;
};

export type JourneyChapter = {
  key: string;
  orderLabel: string;
  title: string;
  description: string;
  state: ChapterState;
  statusLabel: string;
  href?: string;
};

const senseiLevels: JourneyLevel[] = [
  { slug: "n5", code: "N5", title: "N5 — Dasar", description: "Dapat dibeli langsung; cohort N4 dan N3 tetap aktif tanpa perubahan.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket N5" },
  { slug: "n4", code: "N4", title: "N4 — Pemula Lanjutan", description: "Journey, kelas Sensei, jadwal, dan replay aktif pada level N4.", access: "owned", cohort: "active", progression: "current", statusLabel: "SEDANG DIPELAJARI", actionLabel: "Lanjutkan N4" },
  { slug: "n3", code: "N3", title: "N3 — Menengah", description: "Level aktif kedua dengan journey dan cohort yang disimpan terpisah.", access: "owned", cohort: "active", progression: "available", statusLabel: "LEVEL & COHORT AKTIF", actionLabel: "Buka Journey N3" },
  { slug: "n2", code: "N2", title: "N2 — Lanjut", description: "Dapat ditambahkan tanpa menyelesaikan N3; jadwal dibuat setelah aktivasi.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket N2" },
  { slug: "n1", code: "N1", title: "N1 — Mahir", description: "Beli independen sesuai target ujian dan ketersediaan cohort.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket N1" },
];

const baseLevels = [
  ["n5", "N5", "JLPT N5"], ["n4", "N4", "JLPT N4"], ["n3", "N3", "JLPT N3"], ["n2", "N2", "JLPT N2"], ["n1", "N1", "JLPT N1"],
] as const;

export function getJourneyLevels(membership: Membership): JourneyLevel[] {
  if (membership === "sensei") return senseiLevels;
  return baseLevels.map(([slug, code, title]) => {
    const free = membership === "free";
    const owned = free || slug === "n4" || slug === "n3";
    return { slug, code, title, description: free ? "Chapter 1 tersedia sebagai akses Free pada level ini." : owned ? "Level dimiliki dan progress disimpan terpisah." : "Level belum aktif pada akunmu.", access: free ? "freePreview" : owned ? "owned" : "notPurchased", cohort: "none", progression: slug === "n4" ? "current" : "available", statusLabel: free ? "CHAPTER 1" : owned ? slug === "n4" ? "SEDANG DIPELAJARI" : "LEVEL DIMILIKI" : "BELUM DIBELI", actionLabel: owned ? "Buka perjalanan" : `Lihat Paket ${code}` };
  });
}

const senseiChapterSeeds = [
  ["chapter-1", "01", "Tata Bahasa Dasar N4", "completed", "Selesai"],
  ["chapter-2", "02", "Transportasi dan Arah", "completed", "Selesai"],
  ["chapter-3", "03", "Aktivitas Harian", "completed", "Selesai"],
  ["chapter-4", "04", "Pola Kalimat & Kehidupan", "current", "Lanjutkan"],
  ["chapter-5", "05", "Kesehatan dan Kondisi", "progressionLocked", "Terkunci"],
] as const;

export function getJourneyChapters(membership: Membership, level: JourneyLevel): JourneyChapter[] {
  if (membership === "sensei") {
    return [
      ...senseiChapterSeeds.map(([key, orderLabel, title, state, statusLabel]) => ({ key, orderLabel, title: level.slug === "n4" ? title : `${level.code} • ${title}`, description: "Video • 2 modul • flashcard • audio • reading • checkpoint", state, statusLabel, href: state === "current" ? `/learn/${level.slug}/chapter-4?membership=sensei` : undefined })),
      { key: "chapter-12", orderLabel: "12", title: "Chapter Terakhir — Penyelesaian Level", description: "Selesaikan seluruh aktivitas untuk membuka Feedback Akhir Level.", state: "finalPreview", statusLabel: "Simulasi Akhir" },
    ];
  }
  return [1, 2, 3, 4].map((number) => {
    const free = membership === "free";
    const state: ChapterState = free ? number === 1 ? "current" : "entitlementLocked" : number < 4 ? "completed" : "current";
    return { key: `chapter-${number}`, orderLabel: String(number).padStart(2, "0"), title: `Chapter ${number}`, description: "Video • modul • flashcard • audio • reading • checkpoint", state, statusLabel: state === "completed" ? "Selesai" : state === "current" ? "Lanjutkan" : "Terkunci", href: state === "current" ? `/learn/${level.slug}/chapter-${number}?membership=${membership}` : undefined };
  });
}

export function findJourneyLevel(membership: Membership, slug: string): JourneyLevel | undefined {
  return getJourneyLevels(membership).find((level) => level.slug === slug);
}

export function canAccessLearning(membership: Membership, levelSlug: string, chapterKey: string): boolean {
  const level = findJourneyLevel(membership, levelSlug);
  if (!level || level.access === "notPurchased") return false;
  return getJourneyChapters(membership, level).some((chapter) => chapter.key === chapterKey && (chapter.state === "completed" || chapter.state === "current" || chapter.state === "available"));
}
