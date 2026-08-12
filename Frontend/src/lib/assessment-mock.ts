import type { Membership } from "@/lib/dashboard-mock";

export type AssessmentType = "checkpoint" | "tryout" | "mini-checkpoint";
export type AssessmentOption = { id: string; label: string };
export type AssessmentQuestion = { id: string; section: string; prompt: string; japanese?: { text: string; reading?: string }; options: AssessmentOption[]; correctOptionId: string; explanation: string };
export type AssessmentConfig = { type: AssessmentType; title: string; context: string; timerEnabled: boolean; timerLabel: string; reviewEnabled: boolean; sampleLabel: string; questions: AssessmentQuestion[] };

const questions: AssessmentQuestion[] = [
  { id: "q1", section: "Kosakata", prompt: "Pilih arti yang paling sesuai untuk kosakata berikut.", japanese: { text: "学ぶ", reading: "まなぶ" }, options: [{ id: "a", label: "belajar / mempelajari" }, { id: "b", label: "beristirahat" }, { id: "c", label: "berjalan" }, { id: "d", label: "mengajar" }], correctOptionId: "a", explanation: "学ぶ digunakan untuk menyatakan proses belajar atau mempelajari sesuatu." },
  { id: "q2", section: "Tata Bahasa", prompt: "Pilih bagian yang melengkapi kalimat contoh berikut.", japanese: { text: "毎日、日本語を＿＿。", reading: "まいにち、にほんごを" }, options: [{ id: "a", label: "勉強します" }, { id: "b", label: "大きいです" }, { id: "c", label: "静かです" }, { id: "d", label: "先生です" }], correctOptionId: "a", explanation: "勉強します melengkapi kalimat menjadi ‘Saya belajar bahasa Jepang setiap hari.’" },
  { id: "q3", section: "Membaca", prompt: "Apa gagasan utama dari kalimat berikut?", japanese: { text: "少しずつ勉強を続けます。", reading: "すこしずつ べんきょうを つづけます" }, options: [{ id: "a", label: "Berhenti belajar hari ini" }, { id: "b", label: "Melanjutkan belajar sedikit demi sedikit" }, { id: "c", label: "Belajar hanya saat ujian" }, { id: "d", label: "Mengganti bahan belajar" }], correctOptionId: "b", explanation: "少しずつ berarti sedikit demi sedikit dan 続けます berarti melanjutkan." },
  { id: "q4", section: "Kosakata", prompt: "Pilih makna kosakata yang tepat.", japanese: { text: "復習", reading: "ふくしゅう" }, options: [{ id: "a", label: "persiapan" }, { id: "b", label: "percakapan" }, { id: "c", label: "mengulang pelajaran" }, { id: "d", label: "ujian" }], correctOptionId: "c", explanation: "復習 berarti meninjau atau mengulang kembali materi yang sudah dipelajari." },
];

export function getTryoutConfig(): AssessmentConfig {
  return { type: "tryout", title: "Try Out Preview", context: "Simulasi visual dengan data contoh", timerEnabled: true, timerLabel: "Waktu contoh · bukan timer server", reviewEnabled: true, sampleLabel: "Preview — aturan final belum dikonfigurasi", questions };
}

export function hasTryoutAccess(membership: Membership) {
  return membership === "lms" || membership === "sensei";
}
