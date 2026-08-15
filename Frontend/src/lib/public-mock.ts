export const plans = [
  { badge: "Coba Gratis", title: "Free Member", description: "Coba satu chapter lengkap sebelum memutuskan upgrade.", points: ["1 chapter lengkap", "Community read-only", "Progress tersimpan"] },
  { badge: "Direkomendasikan", title: "Belajar Mandiri", description: "Akses journey penuh, latihan, Try Out, review, dan sertifikat digital.", points: ["Journey dan latihan penuh", "Try Out + review jawaban", "Community write + certificate"] },
  { badge: "LMS + Zoom", title: "Belajar dengan Sensei", description: "Semua fitur LMS ditambah cohort, sesi Zoom, replay, dan Tanya Sensei.", points: ["Journey dan latihan penuh", "Zoom bersama Sensei", "Replay setelah dipublikasikan"] },
];
export const levelCatalog = [
  ["N5", "JLPT N5", "Dasar Bahasa Jepang", "Bangun fondasi huruf, kosakata, dan pola kalimat dasar secara bertahap."],
  ["N4", "JLPT N4", "Pemula Lanjutan", "Lanjutkan pola kalimat, reading, listening, dan kanji sesuai target N4."],
  ["N3", "JLPT N3", "Tingkat Menengah", "Fokus reading, bunpou, kosakata, dan kanji untuk target ujian N3."],
  ["N2", "JLPT N2", "Tingkat Lanjut", "Perkuat pemahaman kompleks, kecepatan reading, dan listening untuk N2."],
  ["N1", "JLPT N1", "Tingkat Mahir", "Latih akurasi bahasa tingkat tinggi dan strategi ujian JLPT N1."],
].map(([code, name, title, description]) => ({ code, name: `${name} • ${title}`, description }));
export const placementQuestions = Array.from({ length: 20 }, (_, index) => ({ number: index + 1, area: ["Bunpou", "Moji Goi", "Dokkai", "Choukai"][Math.floor(index / 5)], prompt: "Teks pertanyaan", answers: ["A. Pilihan pertama", "B. Pilihan kedua", "C. Pilihan ketiga", "D. Pilihan keempat"] }));
export const placementResult = { level: "N4", areas: [{ name: "Bunpou", score: 78 }, { name: "Moji Goi", score: 72 }, { name: "Dokkai", score: 68 }, { name: "Choukai", score: 64 }] };
