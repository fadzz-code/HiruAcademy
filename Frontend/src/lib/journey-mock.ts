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

export type ProgressComponent = { label: string; weight: number; complete: boolean };

export type JourneyChapter = {
  key: string;
  orderLabel: string;
  title: string;
  description: string;
  state: ChapterState;
  statusLabel: string;
  progress: number;
  components: ProgressComponent[];
  checkpointUnlocked: boolean;
  href?: string;
};

const senseiLevels: JourneyLevel[] = [
  { slug: "dasar", code: "DASAR", title: "Dasar Bahasa Jepang", description: "Hiragana, Katakana, salam, dan pola kalimat dasar untuk pemula.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Beli Level Dasar" },
  { slug: "n5", code: "N5", title: "JLPT N5", description: "Dapat dibeli langsung; cohort N4 dan N3 tetap aktif tanpa perubahan.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket N5" },
  { slug: "n4", code: "N4", title: "JLPT N4", description: "Journey, kelas Sensei, jadwal, dan replay aktif pada level N4.", access: "owned", cohort: "active", progression: "current", statusLabel: "SEDANG DIPELAJARI", actionLabel: "Lanjutkan N4" },
  { slug: "n3", code: "N3", title: "JLPT N3", description: "Level aktif kedua dengan journey dan cohort yang disimpan terpisah.", access: "owned", cohort: "active", progression: "available", statusLabel: "LEVEL & COHORT AKTIF", actionLabel: "Buka Journey N3" },
  { slug: "n2", code: "N2", title: "JLPT N2", description: "Dapat ditambahkan tanpa menyelesaikan N3; jadwal dibuat setelah aktivasi.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket N2" },
  { slug: "ssw-pengolahan-makanan", code: "SSW", title: "SSW Pengolahan Makanan", description: "Kosakata kerja, sanitasi higienis, dan standar keselamatan industri makanan.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket SSW" },
  { slug: "interview", code: "INTERVIEW", title: "Persiapan Interview", description: "Persiapan wawancara kerja, etika profesional, dan simulasi tanya jawab.", access: "notPurchased", cohort: "none", progression: "available", statusLabel: "BELUM DIBELI", actionLabel: "Lihat Paket Interview" },
];

const baseLevels = [
  ["dasar", "DASAR", "Dasar Bahasa Jepang", "Hiragana, Katakana, salam, dan pola dasar pemula."],
  ["n5", "N5", "JLPT N5", "Tata bahasa dasar, kanji pemula, dan percakapan harian."],
  ["n4", "N4", "JLPT N4", "Pola kalimat lanjutan, kanji esensial, dan percakapan kontekstual."],
  ["n3", "N3", "JLPT N3", "Tata bahasa menengah, teks umum, dan kemampuan komunikasi."],
  ["n2", "N2", "JLPT N2", "Tata bahasa kompleks, artikel opini, dan pemahaman profesional."],
  ["ssw-pengolahan-makanan", "SSW", "SSW Pengolahan Makanan", "SOP industri makanan Jepang, higienitas, dan instruksi lapangan."],
  ["interview", "INTERVIEW", "Persiapan Interview", "Etika wawancara kerja, motivasi, dan simulasi profesional."],
] as const;

export function getJourneyLevels(membership: Membership): JourneyLevel[] {
  if (membership === "sensei") return senseiLevels;
  return baseLevels.map(([slug, code, title, desc]) => {
    const free = membership === "free";
    const freeEligible = slug !== "ssw-pengolahan-makanan" && slug !== "interview";
    const lmsOwned = slug === "dasar" || slug === "n5" || slug === "n4";
    const access: LevelAccess = free ? (freeEligible ? "freePreview" : "notPurchased") : lmsOwned ? "owned" : "notPurchased";
    const progression: LevelProgression = slug === "n4" ? "current" : "available";
    const statusLabel = free
      ? freeEligible ? "CHAPTER 1 TERSEDIA" : "TERKUNCI"
      : lmsOwned ? (slug === "n4" ? "SEDANG DIPELAJARI" : "LEVEL DIMILIKI") : "BELUM AKTIF";
    const actionLabel = free
      ? freeEligible ? "Buka Chapter 1" : "Upgrade Membership"
      : lmsOwned ? "Buka perjalanan" : `Lihat Paket ${code}`;
    return {
      slug,
      code,
      title,
      description: free
        ? freeEligible ? "Chapter 1 tersedia sebagai akses Free pada level ini." : "Tingkat lanjutan memerlukan upgrade membership."
        : lmsOwned ? desc : "Level dapat dibeli terpisah atau melalui program lanjutan.",
      access,
      cohort: "none",
      progression,
      statusLabel,
      actionLabel,
    };
  });
}

const dasarComponents = [["Video", 25], ["Modul PDF", 25], ["Flashcard", 25], ["Checkpoint", 25]] as const;
const standardComponents = [["Video", 20], ["Modul PDF", 5], ["Flashcard", 20], ["Audio", 20], ["Reading", 20], ["Checkpoint", 15]] as const;

function chapterComponents(levelSlug: string, number: number, state: ChapterState): ProgressComponent[] {
  const seeds = levelSlug === "dasar" || levelSlug === "ssw-pengolahan-makanan" ? dasarComponents : standardComponents;
  return seeds.map(([label, weight]) => ({ label, weight, complete: state === "completed" || (state === "current" && label !== "Checkpoint" && number === 1) }));
}

function chapterProgress(components: ProgressComponent[]) {
  return components.reduce((total, component) => total + (component.complete ? component.weight : 0), 0);
}

const senseiChapterSeeds = [
  ["chapter-1", "01", "Tata Bahasa Dasar N4", "completed", "Selesai"],
  ["chapter-2", "02", "Transportasi dan Arah", "completed", "Selesai"],
  ["chapter-3", "03", "Aktivitas Harian", "completed", "Selesai"],
  ["chapter-4", "04", "Pola Kalimat & Kehidupan", "current", "Lanjutkan"],
  ["chapter-5", "05", "Kesehatan dan Kondisi", "progressionLocked", "Terkunci"],
] as const;

export function getJourneyChapters(membership: Membership, level: JourneyLevel): JourneyChapter[] {
  if (level.access === "notPurchased") {
    return [1, 2, 3, 4, 5].map((number) => ({
      key: `chapter-${number}`,
      orderLabel: String(number).padStart(2, "0"),
      title: `${level.code} • Chapter ${number}`,
      description: "Video | modul | flashcard | audio | reading | checkpoint",
      state: "entitlementLocked" as ChapterState,
      statusLabel: "Terkunci • Upgrade",
      progress: 0,
      components: chapterComponents(level.slug, number, "entitlementLocked"),
      checkpointUnlocked: false,
    }));
  }

  if (membership === "sensei") {
    return [
      ...senseiChapterSeeds.map(([key, orderLabel, title, state, statusLabel]) => ({
        key,
        orderLabel,
        title: level.slug === "n4" ? title : `${level.code} • ${title}`,
        description: "Video | modul | flashcard | audio | reading | checkpoint",
        state,
        statusLabel,
        progress: state === "completed" ? 100 : state === "current" ? 60 : 0,
        components: chapterComponents(level.slug, Number(orderLabel), state),
        checkpointUnlocked: state === "completed" || state === "current",
        href: state === "completed" ? `/learn/${level.slug}/${key}?membership=sensei` : state === "current" ? `/learn/${level.slug}/chapter-4?membership=sensei` : undefined,
      })),
      { key: "chapter-12", orderLabel: "12", title: "Chapter Terakhir — Penyelesaian Level", description: "Selesaikan seluruh aktivitas untuk membuka Feedback Akhir Level.", state: "finalPreview", statusLabel: "Simulasi Akhir", progress: 0, components: [], checkpointUnlocked: false },
    ];
  }

  return [1, 2, 3, 4, 5].map((number) => {
    const free = membership === "free";
    const state: ChapterState = free
      ? number === 1 ? "current" : "entitlementLocked"
      : number < 4 ? "completed" : number === 4 ? "current" : "progressionLocked";
    return {
      key: `chapter-${number}`,
      orderLabel: String(number).padStart(2, "0"),
      title: `${level.code} | Chapter ${number}`,
      description: "Video | modul | flashcard | audio | reading | checkpoint",
      state,
      statusLabel: state === "completed" ? "Selesai" : state === "current" ? "Lanjutkan" : state === "entitlementLocked" ? "Terkunci • Upgrade" : "Terkunci",
      progress: chapterProgress(chapterComponents(level.slug, number, state)),
      components: chapterComponents(level.slug, number, state),
      checkpointUnlocked: state === "completed" || state === "current",
      href: state === "completed" || state === "current" ? `/learn/${level.slug}/chapter-${number}?membership=${membership}` : undefined,
    };
  });
}

export function findJourneyLevel(membership: Membership, slug: string): JourneyLevel | undefined {
  return getJourneyLevels(membership).find((level) => level.slug === slug);
}

export function canAccessLearning(membership: Membership, levelSlug: string, chapterKey: string): boolean {
  const level = findJourneyLevel(membership, levelSlug);
  if (!level) return false;
  if (chapterKey === "chapter-1" && level.access !== "notPurchased") return true;
  if (!level || level.access === "notPurchased") return false;
  if (level.access === "freePreview") return chapterKey === "chapter-1";
  return getJourneyChapters(membership, level).some((chapter) => chapter.key === chapterKey && (chapter.state === "completed" || chapter.state === "current" || chapter.state === "available"));
}
