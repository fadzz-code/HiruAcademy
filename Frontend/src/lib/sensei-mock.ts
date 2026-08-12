import type { AssessmentConfig } from "@/lib/assessment-mock";
import type { Membership } from "@/lib/dashboard-mock";

export const scheduleSessions = [
  { id: "chapter-4", date: "18", day: "Rabu", month: "Desember", title: "Chapter 4 • Sesi Live", time: "19.00 WIB", duration: "90 menit", sensei: "Sensei Aiko", cohort: "N4 • Cohort Aktif", status: "Mendatang" },
  { id: "consultation", date: "21", day: "Sabtu", month: "Desember", title: "Konsultasi Cohort", time: "10.00 WIB", duration: "60 menit", sensei: "Tim Akademik", cohort: "N4 • Cohort Aktif", status: "Mendatang" },
  { id: "previous", date: "11", day: "Rabu", month: "Desember", title: "Sesi sebelumnya", time: "19.00 WIB", duration: "90 menit", sensei: "Sensei Aiko", cohort: "N4 • Cohort Aktif", status: "Selesai" },
];

export const replays = [
  { id: "chapter-4", title: "Chapter 4 — Pola Kalimat dan Kehidupan", meta: "Sensei Aiko • 88 menit", category: "Chapter 4", featured: true },
  { id: "grammar", title: "Review Grammar N4", meta: "Sensei Aiko • 54 menit", category: "Chapter 4" },
  { id: "kanji", title: "Kanji & Reading", meta: "Tim Akademik • 61 menit", category: "Tersimpan" },
  { id: "consultation", title: "Konsultasi Cohort", meta: "Tim Akademik • 47 menit", category: "Tersimpan" },
];

export const miniCheckpoints = [
  { id: "n5-s1-p1", level: "N5", session: "Sesi 1", part: "Part 1" },
  { id: "n4-s2-p1", level: "N4", session: "Sesi 2", part: "Part 1" },
  { id: "n3-s1-p2", level: "N3", session: "Sesi 1", part: "Part 2" },
  { id: "n2-s1-p1", level: "N2", session: "Sesi 1", part: "Part 1" },
];

export const miniCheckpointConfig: AssessmentConfig = {
  type: "mini-checkpoint",
  title: "Mini Checkpoint N4 • Sesi 2 • Part 1",
  context: "Assessment kelas dengan data contoh",
  timerEnabled: true,
  timerLabel: "Timer mock • konfigurasi admin",
  reviewEnabled: true,
  sampleLabel: "Mini Checkpoint demo",
  completionLabel: "Mini Checkpoint selesai",
  submitLabel: "Selesaikan Mini Checkpoint",
  returnHref: "/mini-checkpoint?membership=sensei",
  passingScore: 75,
  questions: [
    { id: "m1", section: "N4 • Sesi 2 • Part 1", prompt: "Pilih makna yang sesuai.", japanese: { text: "経験", reading: "けいけん" }, options: [{ id: "a", label: "pengalaman" }, { id: "b", label: "perjalanan" }, { id: "c", label: "pelajaran" }, { id: "d", label: "pertemuan" }], correctOptionId: "a", explanation: "経験 berarti pengalaman." },
    { id: "m2", section: "N4 • Sesi 2 • Part 1", prompt: "Pilih bentuk kalimat yang tepat.", japanese: { text: "日本へ行ったことがあります。", reading: "にほんへ いったことが あります" }, options: [{ id: "a", label: "Belum pernah ke Jepang" }, { id: "b", label: "Pernah pergi ke Jepang" }, { id: "c", label: "Akan pergi ke Jepang" }, { id: "d", label: "Sedang pergi ke Jepang" }], correctOptionId: "b", explanation: "〜たことがあります menyatakan pengalaman yang pernah dilakukan." },
  ],
};

export function hasSenseiAccess(membership: Membership) {
  return membership === "sensei";
}
