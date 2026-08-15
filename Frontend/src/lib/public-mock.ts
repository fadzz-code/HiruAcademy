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
export const programFacilities = [
  { icon: "▶", title: "Video Penjelasan", description: "Penjelasan utama chapter dengan progres belajar yang tercatat." },
  { icon: "本", title: "Modul", description: "Modul Tata Bahasa serta Modul Huruf Jepang & Kanji." },
  { icon: "練", title: "Latihan", description: "Latihan audio, reading, dan penguatan materi harian." },
  { icon: "旗", title: "Checkpoint", description: "Evaluasi pemahaman di akhir chapter sebelum melanjutkan." },
  { icon: "札", title: "Flashcard", description: "Deck kosakata dan pola penting dengan sesi pengulangan." },
  { icon: "試", title: "Try Out JLPT", description: "Simulasi soal JLPT tahun sebelumnya, hasil, dan ulasan jawaban." },
];
export const programComparison = [
  { badge: "Free", title: "Free Member", description: "Chapter 1 gratis pada setiap N1–N5." },
  { badge: "LMS", title: "Belajar Mandiri", description: "Journey penuh, try out, review, dan sertifikat." },
  { badge: "LMS + Zoom", title: "Belajar dengan Sensei", description: "Semua LMS ditambah cohort, kelas langsung, Sensei, dan replay." },
];
export const testimonials = [
  { initials: "RI", quote: "Journey membantu saya tahu apa yang harus dipelajari setelah menyelesaikan satu materi.", name: "Rina", membership: "Free Member → LMS" },
  { initials: "DI", quote: "Checkpoint dan review membuat progres lebih mudah dipantau tanpa merasa terburu-buru.", name: "Dimas", membership: "Belajar Mandiri" },
  { initials: "AY", quote: "Jadwal, replay, dan learning journey terasa menyatu dalam satu alur belajar.", name: "Ayu", membership: "Belajar dengan Sensei" },
];
export const supportingValues = [
  { glyph: "進", title: "Progress terlihat", description: "Pengguna memahami langkah yang sudah dan belum selesai." },
  { glyph: "続", title: "Belajar konsisten", description: "Aktivitas disusun agar mudah diteruskan." },
  { glyph: "選", title: "Akses transparan", description: "Free, LMS, dan LMS + Zoom dibedakan secara jelas." },
];
export const blogDetailSlug = "strategi-rutinitas-belajar-n4";
export const blogFeatured = {
  slug: blogDetailSlug,
  marker: "道",
  label: "FEATURED",
  title: "Strategi membangun rutinitas belajar N4",
  description: "Susun ritme belajar mingguan dengan video, modul, flashcard, latihan, dan checkpoint tanpa kehilangan fokus.",
};
export const blogArticles = [
  { marker: "文", category: "GRAMMAR", title: "Cara memahami pola kalimat tanpa menghafal berlebihan", description: "Gunakan konteks, contoh, dan latihan singkat untuk memperkuat pemahaman." },
  { marker: "聴", category: "LISTENING", title: "Latihan listening yang efektif untuk pemula", description: "Bangun kebiasaan mendengar melalui audio pendek dan pengulangan terarah." },
  { marker: "試", category: "JLPT", title: "Mempersiapkan try out pertama dengan tenang", description: "Kenali struktur soal, manajemen waktu, dan cara membaca hasil evaluasi." },
];
export const blogDetail = {
  slug: blogDetailSlug,
  eyebrow: "BELAJAR EFEKTIF • 8 MENIT BACA",
  title: "Strategi membangun rutinitas belajar N4 yang realistis",
  description: "Rutinitas yang baik bukan tentang belajar selama mungkin, tetapi menjaga urutan aktivitas yang konsisten dan mudah diulang.",
};
export const placementQuestions = Array.from({ length: 20 }, (_, index) => ({ number: index + 1, area: ["Bunpou", "Moji Goi", "Dokkai", "Choukai"][Math.floor(index / 5)], prompt: "Teks pertanyaan", answers: ["A. Pilihan pertama", "B. Pilihan kedua", "C. Pilihan ketiga", "D. Pilihan keempat"] }));
export const placementResult = { level: "N4", areas: [{ name: "Bunpou", score: 78 }, { name: "Moji Goi", score: 72 }, { name: "Dokkai", score: 68 }, { name: "Choukai", score: 64 }] };
export const placementRecommendations = [
  { badge: "★ REKOMENDASI UTAMA", title: "N4 Belajar dengan Sensei", description: "Journey penuh dengan cohort, kelas langsung, Sensei, replay, dan dukungan belajar.", action: "Pilih Belajar dengan Sensei →", href: "/register?placement=N4&plan=sensei" },
  { badge: "ALTERNATIF MANDIRI", title: "N4 Belajar Mandiri", description: "Journey penuh, latihan, try out, dan review mandiri sesuai ritmemu.", action: "Pilih Belajar Mandiri →", href: "/register?placement=N4&plan=lms" },
  { badge: "COBA GRATIS", title: "Mulai dengan Free Member", description: "Coba satu chapter lengkap sebelum menentukan upgrade.", action: "Mulai Free Member →", href: "/register?placement=N4&plan=free" },
];
