export const plans = [
  { id: "free", badge: "GRATIS", title: "Coba Gratis", description: "Cocok untuk kamu yang ingin mencoba sistem belajar Hiru sebelum berlangganan.", points: ["Akses 1 chapter lengkap setiap level", "Progres belajar tersimpan", "Akses membaca komunitas"], price: "Rp0", period: "" },
  { id: "lms", badge: "BELAJAR FLEKSIBEL", title: "Belajar Mandiri", description: "Cocok untuk kamu yang ingin belajar menyesuaikan waktu dan kecepatan sendiri.", points: ["Alur belajar dan latihan lengkap", "Try Out dan pembahasan jawaban", "Akses komunitas serta sertifikat digital"], price: "Mulai Rp99.000/6 bulan", period: "6 bulan" },
  { id: "sensei", badge: "POPULER", title: "Kelas bersama Sensei", description: "Cocok untuk kamu yang membutuhkan jadwal rutin, bimbingan dan evaluasi langsung.", points: ["Semua fasilitas Belajar Mandiri", "10x live Zoom ・ 90 menit/bulan", "Rekaman kelas dan evaluasi hasil belajar"], price: "Mulai Rp350.000/bulan", period: "Bulanan" },
];
export const levelCatalog = [
  { code: "N5", name: "JLPT N5", title: "Dasar Bahasa Jepang", description: "Cocok untuk pemula yang ingin menguasai huruf Jepang, kosakata, dan pola kalimat dasar.", topics: ["Hiragana & Katakana", "Pola kalimat dasar"] },
  { code: "N4", name: "JLPT N4", title: "Pemula Lanjutan", description: "Cocok untuk kamu yang telah memahami materi N5 dan ingin menguasai pola kalimat, kanji, dokkai dan choukai level N4.", topics: ["Pola kalimat & Kanji", "Dokkai & Choukai"] },
  { code: "N3", name: "JLPT N3", title: "Tingkat Menengah", description: "Cocok untuk kamu yang sudah memiliki dasar N4 dan ingin memahami teks serta percakapan yang lebih kompleks.", topics: ["Dokkai & Pola kalimat", "Goi & Kanji"] },
  { code: "N2", name: "JLPT N2", title: "Tingkat Lanjut", description: "Cocok untuk kamu yang sudah memiliki pondasi N3 dan ingin meningkatkan kecepatan memahami teks, percakapan, dan pola kalimat yang lebih kompleks.", topics: ["Dokkai & Choukai", "Strategi JLPT"] },
  { code: "N1", name: "JLPT N1", title: "Tingkat Mahir", description: "Cocok untuk kamu yang memiliki dasar N2 dan ingin menguasai nuansa bahasa tingkat tinggi serta strategi menghadapi JLPT N1.", topics: ["Bahasa tingkat tinggi", "Strategi JLPT"] },
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
