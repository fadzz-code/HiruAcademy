import type { AssessmentConfig } from "@/lib/assessment-mock";
import type { Membership } from "@/lib/dashboard-mock";

export const scheduleSessions = [
  { id: "chapter-4", title: "Chapter 4 • Sesi Live", meta: "Hari/Tanggal • Jam WIB • Sensei dari admin", status: "Terjadwal" },
  { id: "consultation", title: "Konsultasi Cohort", meta: "Jadwal dan topik mengikuti cohort aktif", status: "Terjadwal" },
  { id: "previous", title: "Sesi sebelumnya", meta: "Replay tersedia setelah dipublikasikan", status: "Selesai" },
];

export const replays = [
  { id: "chapter-4", title: "Chapter 4 — Pola Kalimat dan Kehidupan", description: "Replay untuk cohort aktif; tampil setelah sesi dipublikasikan.", category: "Chapter 4", featured: true },
  { id: "grammar", title: "Review Grammar N4", description: "Pembahasan latihan dan contoh kalimat.", category: "Chapter 4" },
  { id: "kanji", title: "Kanji & Reading", description: "Review kanji dan strategi reading.", category: "Tersimpan" },
  { id: "consultation", title: "Konsultasi Cohort", description: "Tanya jawab dan arahan belajar.", category: "Tersimpan" },
];

export const replayMarkers = [["00:00", "Pembukaan"], ["08:20", "Review materi"], ["24:15", "Latihan bersama"], ["46:40", "Tanya jawab"], ["58:10", "Arahan berikutnya"]];

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
