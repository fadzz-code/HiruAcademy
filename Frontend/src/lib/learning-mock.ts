import type { Membership } from "@/lib/dashboard-mock";

export type LessonActivity = { key: string; title: string; description: string; icon: string; state: "complete" | "current" | "available" | "locked" };
export type FlashcardItem = { id: string; term: string; reading: string; meaning: string; example: { before: string; focus: string; focusReading: string; after: string; translation: string } };

const activities: LessonActivity[] = [
  { key: "video", title: "Video pengantar", description: "Lihat gambaran konsep sebelum masuk ke contoh dan latihan.", icon: "▶", state: "complete" },
  { key: "module", title: "Modul ringkas", description: "Baca struktur utama dan contoh penggunaannya.", icon: "本", state: "current" },
  { key: "flashcards", title: "Flashcard kosakata", description: "Pelajari kosakata contoh melalui kartu depan dan belakang.", icon: "札", state: "available" },
  { key: "reading", title: "Latihan membaca", description: "Temukan kosakata dalam konteks kalimat pendek.", icon: "読", state: "available" },
  { key: "checkpoint", title: "Checkpoint", description: "Evaluasi Chapter mengikuti aturan yang dikonfigurasi nanti.", icon: "旗", state: "locked" },
];

const flashcards: FlashcardItem[] = [
  { id: "learn", term: "学ぶ", reading: "まなぶ", meaning: "belajar / mempelajari", example: { before: "毎日、日本語を", focus: "学", focusReading: "まな", after: "んでいます。", translation: "Saya belajar bahasa Jepang setiap hari." } },
  { id: "continue", term: "続ける", reading: "つづける", meaning: "melanjutkan", example: { before: "少しずつ勉強を", focus: "続", focusReading: "つづ", after: "けます。", translation: "Saya melanjutkan belajar sedikit demi sedikit." } },
  { id: "understand", term: "分かる", reading: "わかる", meaning: "mengerti / memahami", example: { before: "例を見ると、意味が", focus: "分", focusReading: "わ", after: "かります。", translation: "Dengan melihat contoh, saya memahami artinya." } },
  { id: "review", term: "復習", reading: "ふくしゅう", meaning: "mengulang pelajaran", example: { before: "学んだ言葉を", focus: "復習", focusReading: "ふくしゅう", after: "します。", translation: "Saya mengulang kosakata yang sudah dipelajari." } },
];

export function getLearningData(membership: Membership, level: string, chapter: string) {
  const limited = membership === "free";
  return {
    membership,
    level: level.toUpperCase(),
    chapter,
    title: "Pengenalan & Pondasi",
    description: "Konten contoh untuk menunjukkan struktur pengalaman belajar HIRU. Materi final akan mengikuti konfigurasi program.",
    activities: activities.map((activity, index) => limited && index > 2 ? { ...activity, state: "locked" as const } : activity),
    cards: flashcards,
  };
}
