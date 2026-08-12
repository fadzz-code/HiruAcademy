import type { Membership } from "@/lib/dashboard-mock";

export type LevelState = "completed" | "current" | "available" | "limited" | "locked";
export type ChapterState = "completed" | "current" | "available" | "locked";

export type JourneyLevel = { slug: string; code: string; title: string; description: string; state: LevelState; statusLabel: string; progressLabel: string };
export type JourneyChapter = { key: string; orderLabel: string; title: string; description: string; state: ChapterState; statusLabel: string; progressLabel: string; activities: string[] };

const levels = [
  { slug: "dasar", code: "基", title: "Dasar Bahasa Jepang", description: "Pondasi awal untuk mulai mengenal sistem tulisan dan pola bahasa Jepang." },
  { slug: "n5", code: "N5", title: "JLPT N5", description: "Perjalanan level awal dengan materi dan aktivitas belajar bertahap." },
  { slug: "n4", code: "N4", title: "JLPT N4", description: "Lanjutkan pemahaman bahasa Jepang melalui konteks yang lebih beragam." },
  { slug: "n3", code: "N3", title: "JLPT N3", description: "Preview perjalanan tingkat menengah dalam keluarga level HIRU." },
  { slug: "n2", code: "N2", title: "JLPT N2", description: "Preview perjalanan tingkat lanjut sesuai katalog final yang tersedia nanti." },
  { slug: "n1", code: "N1", title: "JLPT N1", description: "Preview level lanjutan; akses mengikuti entitlement program final." },
];

const stateLabels: Record<LevelState, string> = { completed: "Selesai", current: "Sedang dipelajari", available: "Tersedia", limited: "Akses terbatas", locked: "Terkunci" };

function levelStates(membership: Membership): LevelState[] {
  if (membership === "free") return ["current", "limited", "locked", "locked", "locked", "locked"];
  return ["completed", "current", "available", "locked", "locked", "locked"];
}

export function getJourneyLevels(membership: Membership): JourneyLevel[] {
  return levels.map((level, index) => {
    const state = levelStates(membership)[index] ?? "locked";
    return { ...level, state, statusLabel: stateLabels[state], progressLabel: state === "completed" ? "Aktivitas contoh selesai" : state === "current" ? "Ada aktivitas untuk dilanjutkan" : state === "limited" ? "Materi gratis tersedia" : state === "available" ? "Belum dimulai" : "Butuh akses level" };
  });
}

const chapterSeeds = [
  { key: "chapter-1", orderLabel: "Chapter 01", title: "Pengenalan & Pondasi", description: "Mulai dari konsep dasar dan konteks yang dibutuhkan untuk perjalanan level ini.", activities: ["Video", "Modul", "Flashcard"] },
  { key: "chapter-2", orderLabel: "Chapter 02", title: "Pola Bahasa & Latihan", description: "Hubungkan materi dengan latihan singkat untuk memperkuat pemahaman.", activities: ["Video", "Modul", "Audio", "Checkpoint"] },
  { key: "chapter-3", orderLabel: "Chapter 03", title: "Penerapan Bertahap", description: "Lanjutkan ke aktivitas yang menempatkan materi dalam konteks belajar.", activities: ["Reading", "Flashcard", "Latihan"] },
  { key: "chapter-4", orderLabel: "Chapter 04", title: "Review & Penguatan", description: "Tinjau kembali materi sebelum menuju bagian perjalanan berikutnya.", activities: ["Modul", "Reading", "Checkpoint"] },
];

const chapterLabels: Record<ChapterState, string> = { completed: "Selesai", current: "Sedang berjalan", available: "Belum dimulai", locked: "Terkunci" };

export function getJourneyChapters(membership: Membership, level: JourneyLevel): JourneyChapter[] {
  const states: ChapterState[] = level.state === "completed" ? ["completed", "completed", "completed", "completed"] : level.state === "locked" ? ["locked", "locked", "locked", "locked"] : membership === "free" ? ["current", "locked", "locked", "locked"] : ["completed", "current", "available", "locked"];
  return chapterSeeds.map((chapter, index) => {
    const state = states[index] ?? "locked";
    return { ...chapter, state, statusLabel: chapterLabels[state], progressLabel: state === "completed" ? "Aktivitas selesai" : state === "current" ? "Lanjutkan aktivitas" : state === "available" ? "Siap dimulai" : membership === "free" ? "Upgrade untuk membuka" : "Selesaikan prerequisite" };
  });
}

export function findJourneyLevel(membership: Membership, slug: string): JourneyLevel {
  return getJourneyLevels(membership).find((level) => level.slug === slug) ?? getJourneyLevels(membership)[0];
}
