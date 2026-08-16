import type { Membership } from "@/lib/dashboard-mock";

export type LearningActivityKey = "video" | "grammar" | "kanji" | "flashcards" | "audio" | "reading" | "checkpoint";
export type LearningActivityState = "completed" | "current" | "available" | "lockedByProgress" | "lockedByEntitlement";
export type LessonActivity = { key: LearningActivityKey; order: string; title: string; railTitle: string; description: string; icon: string; state: LearningActivityState; href?: string; statusLabel?: string };
export type FlashcardItem = { id: string; term: string; reading: string; meaning: string; example: { before: string; focus: string; focusReading: string; after: string; translation: string } };

const flashcards: FlashcardItem[] = [
  { id: "learn", term: "学ぶ", reading: "まなぶ", meaning: "belajar / mempelajari", example: { before: "毎日、日本語を", focus: "学", focusReading: "まな", after: "んでいます。", translation: "Saya belajar bahasa Jepang setiap hari." } },
  { id: "continue", term: "続ける", reading: "つづける", meaning: "melanjutkan", example: { before: "少しずつ勉強を", focus: "続", focusReading: "つづ", after: "けます。", translation: "Saya melanjutkan belajar sedikit demi sedikit." } },
  { id: "understand", term: "分かる", reading: "わかる", meaning: "mengerti / memahami", example: { before: "例を見ると、意味が", focus: "分", focusReading: "わ", after: "かります。", translation: "Dengan melihat contoh, saya memahami artinya." } },
  { id: "review", term: "復習", reading: "ふくしゅう", meaning: "mengulang pelajaran", example: { before: "学んだ言葉を", focus: "復習", focusReading: "ふくしゅう", after: "します。", translation: "Saya mengulang kosakata yang sudah dipelajari." } },
];

export function getLearningData(membership: Membership, levelSlug: string, chapterSlug: string) {
  const level = levelSlug.toUpperCase();
  const chapterNumber = chapterSlug.replace("chapter-", "");
  const fixture = levelSlug === "n4" && chapterSlug === "chapter-4";
  const chapterTitle = fixture ? "Pola Kalimat dan Kehidupan Sehari-hari" : `${level} • Chapter ${chapterNumber}`;
  const basePath = `/learn/${levelSlug}/${chapterSlug}`;
  const query = `?membership=${membership}`;
  const activities: LessonActivity[] = [
    { key: "video", order: "01", title: "Video Lesson", railTitle: "Video Lesson", description: "Tonton penjelasan utama chapter.", icon: "▶", state: "current", href: `${basePath}/video${query}`, statusLabel: "Belum Mulai" },
    { key: "grammar", order: "02", title: "Modul Tata Bahasa", railTitle: "Modul Tata Bahasa", description: "Baca dan tandai poin penting.", icon: "本", state: "available", statusLabel: "Belum Mulai" },
    { key: "kanji", order: "03", title: "Modul Huruf Jepang & Kanji", railTitle: "Modul Huruf & Kanji", description: "Pelajari huruf dan kanji terkait.", icon: "文", state: "available", statusLabel: "Belum Mulai" },
    { key: "flashcards", order: "04", title: "Flashcard", railTitle: "Flashcard", description: "Ulangi kosakata dan pola penting.", icon: "札", state: "available", href: `${basePath}/flashcards${query}`, statusLabel: "Belum Mulai" },
    { key: "audio", order: "05", title: "Audio Question", railTitle: "Audio", description: "Latih pemahaman listening.", icon: "音", state: "available", statusLabel: "Belum Mulai" },
    { key: "reading", order: "06", title: "Reading Question", railTitle: "Reading", description: "Baca teks dan jawab pertanyaan.", icon: "読", state: "available" },
    { key: "checkpoint", order: "07", title: "Checkpoint", railTitle: "Checkpoint", description: "Status akan berubah otomatis setelah persyaratan chapter terpenuhi.", icon: "旗", state: "lockedByProgress", statusLabel: "Terkunci" },
  ];
  return {
    membership,
    level,
    levelSlug,
    chapterSlug,
    chapterNumber,
    chapterTitle,
    overviewDescription: fixture ? "Selesaikan setiap modul untuk membuka checkpoint dan melanjutkan journey." : "Selesaikan aktivitas chapter untuk melanjutkan journey.",
    videoTitle: fixture ? "Pola kalimat untuk aktivitas sehari-hari" : `Video ${chapterTitle}`,
    activities,
    cards: flashcards,
  };
}

export type LearningData = ReturnType<typeof getLearningData>;
