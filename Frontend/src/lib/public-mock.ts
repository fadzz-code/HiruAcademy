export const plans = [
  { badge: "Coba Gratis", title: "Free Member", description: "Coba satu chapter lengkap sebelum memutuskan upgrade.", points: ["1 chapter lengkap", "Community read-only", "Progress tersimpan"] },
  { badge: "Direkomendasikan", title: "Belajar Mandiri", description: "Akses journey penuh, latihan, Try Out, review, dan sertifikat digital.", points: ["Journey dan latihan penuh", "Try Out + review jawaban", "Community write + certificate"] },
  { badge: "LMS + Zoom", title: "Belajar dengan Sensei", description: "Semua fitur LMS ditambah cohort, sesi Zoom, replay, dan Tanya Sensei.", points: ["Journey dan latihan penuh", "Zoom bersama Sensei", "Replay setelah dipublikasikan"] },
];
export const levelCatalog = [
  { code: "N5", name: "JLPT N5", title: "Dasar Bahasa Jepang", description: "Bangun fondasi huruf, kosakata, dan pola kalimat dasar secara bertahap.", topics: ["Hiragana & Katakana", "Fondasi Grammar"] },
  { code: "N4", name: "JLPT N4", title: "Pemula Lanjutan", description: "Lanjutkan pola kalimat, reading, listening, dan kanji sesuai target N4.", topics: ["Journey Aktif", "Contoh Terpilih"] },
  { code: "N3", name: "JLPT N3", title: "Tingkat Menengah", description: "Fokus reading, bunpou, kosakata, dan kanji untuk target ujian N3.", topics: ["Reading & Bunpou", "Kanji & Goi"] },
  { code: "N2", name: "JLPT N2", title: "Tingkat Lanjut", description: "Perkuat pemahaman kompleks, kecepatan reading, dan listening untuk N2.", topics: ["Listening & Dokkai", "Strategi JLPT"] },
  { code: "N1", name: "JLPT N1", title: "Tingkat Mahir", description: "Latih akurasi bahasa tingkat tinggi dan strategi ujian JLPT N1.", topics: ["Reading & Bunpou", "Strategi JLPT"] },
];
export const placementQuestions = Array.from({ length: 20 }, (_, index) => ({ number: index + 1, area: ["Bunpou", "Moji Goi", "Dokkai", "Choukai"][Math.floor(index / 5)], prompt: "Teks pertanyaan", answers: ["A. Pilihan pertama", "B. Pilihan kedua", "C. Pilihan ketiga", "D. Pilihan keempat"] }));
export const placementResult = { level: "N4", areas: [{ name: "Bunpou", score: 78 }, { name: "Moji Goi", score: 72 }, { name: "Dokkai", score: 68 }, { name: "Choukai", score: 64 }] };
