export type SupportingKind =
  | "library"
  | "practice"
  | "progress"
  | "leaderboard"
  | "certificate"
  | "community"
  | "notifications"
  | "profile"
  | "renewal"
  | "createPost"
  | "affiliate";

type Card = {
  icon: string;
  status: string;
  title: string;
  description: string;
  action?: string;
  href?: string;
};

type SupportingData = {
  eyebrow: string;
  title: string;
  description: string;
  locked?: boolean;
  cards: Card[];
  notice?: { title: string; description: string };
};

const card = (
  icon: string,
  status: string,
  title: string,
  description: string,
  action?: string,
  href?: string
): Card => ({ icon, status, title, description, action, href });

export const supportingData: Record<SupportingKind, SupportingData> = {
  library: {
    eyebrow: "PERPUSTAKAAN MATERI",
    title: "Temukan kembali materi dari seluruh journey",
    description: "Akses materi pembelajaran mengikuti level dan paket belajar aktif.",
    locked: true,
    cards: [
      card("book", "Tersimpan", "Tata Bahasa", "Pola Kalimat Sehari-hari. Modul Chapter 4 yang terakhir dibuka.", "Buka", "/learn/n4/chapter-1"),
      card("card", "Tersedia", "Kanji", "Keadaan, Waktu & Aktivitas. Kanji chapter dengan bookmark dan catatan."),
      card("audio", "Terkunci", "Audio", "Simulasi Choukai N4. Akses audio lengkap mengikuti paket belajarmu.", "Lihat Membership", "/renewal"),
    ],
    notice: {
      title: "Pencarian Materi",
      description: "Ubah level, kategori, atau kata kunci untuk menemukan materi yang tersedia.",
    },
  },
  practice: {
    eyebrow: "LATIHAN HARIAN",
    title: "Latihan singkat berdasarkan progresmu",
    description: "Aktivitas harian terpisah dari simulasi Try Out dan dapat diulang sewaktu-waktu.",
    locked: true,
    cards: [
      card("review", "REKOMENDASI", "Flashcard Review", "Ulangi kosakata dan pola dengan tingkat keyakinan.", "Mulai Rekomendasi", "/journey"),
      card("audio", "TERSEDIA", "Audio Drill", "Latihan listening dari Chapter aktif."),
      card("read", "TERSEDIA", "Reading Drill", "Bacaan pendek dengan penjelasan jawaban."),
      card("checkpoint", "TERSEDIA", "Checkpoint Retry", "Ulangi checkpoint sesuai target Chapter."),
    ],
  },
  progress: {
    eyebrow: "PROGRES & ACHIEVEMENT",
    title: "Rayakan progres tanpa kehilangan fokus",
    description: "Progress, streak, mastery, dan pencapaian dihitung dari seluruh aktivitas belajarmu.",
    cards: [
      card("journey", "65%", "Journey N4", "Perjalanan belajar terus bertumbuh."),
      card("kanji", "450", "Kanji dikuasai", "Kanji yang dipelajari dari aktivitas belajar."),
      card("streak", "Terbuka", "Streak 7 Hari", "Belajar konsisten selama tujuh hari berturut-turut."),
      card("tryout", "Belum terbuka", "Try Out Finisher", "Menyelesaikan Try Out pertama."),
      card("cert", "Terkunci", "Certificate Ready", "Memenuhi syarat sertifikat kelulusan."),
    ],
    notice: {
      title: "Achievement & Konsistensi",
      description: "Buka papan peringkat untuk membandingkan konsistensi belajarmu bersama teman sekelas.",
    },
  },
  leaderboard: {
    eyebrow: "LEADERBOARD",
    title: "Bandingkan konsistensi, bukan tekanan",
    description: "Poin, periode, level, rank, dan peringkat diperbarui secara berkala.",
    cards: [1, 2, 3, 4, 5, 6, 7, 8].map((rank) =>
      card(
        rank === 7 ? "Kamu" : `0${rank}`,
        rank === 7 ? "Posisimu saat ini" : "Member community",
        rank === 7 ? "Kamu" : `Member ${rank}`,
        "Poin",
        rank === 7 ? "+ 3" : ""
      )
    ),
  },
  certificate: {
    eyebrow: "CERTIFICATE CENTER",
    title: "Sertifikat digital dari milestone yang tervalidasi",
    description: "Kelulusan, penerbitan, unduh, dan status sertifikat resmi digital HIRU Academy.",
    cards: [],
  },
  community: {
    eyebrow: "FORUM KOMUNITAS",
    title: "Berdiskusi, bertanya, dan berbagi perjalanan belajar",
    description: "Diskusikan tata bahasa, kanji, dan persiapan ujian bersama pembelajar lain.",
    cards: [
      card("qa", "READ ONLY", "Perbedaan penggunaan untuk tempat?", "Pertanyaan grammar untuk memahami konteks aktivitas dan lokasi.", "Baca", "/community/post-1"),
      card("info", "Semua Akses", "Pengingat jadwal dan materi minggu ini", "Info resmi dari HIRU untuk pembelajar."),
      card("tips", "Diskusi Member", "Tips menjaga konsistensi flashcard N4", "Forum diskusi dengan sesama pembelajar."),
    ],
  },
  createPost: {
    eyebrow: "BUAT POSTINGAN",
    title: "Bagikan pertanyaan atau pengalaman belajar",
    description: "Postingan mengikuti panduan komunitas dan tata krama belajar.",
    cards: [],
  },
  notifications: {
    eyebrow: "NOTIFICATION CENTER",
    title: "Informasi penting tanpa mengganggu fokus",
    description: "Notifikasi pengingat belajar, materi baru, dan pengumuman kelas.",
    cards: [
      card("learn", "Belajar", "Materi Chapter 4 tersedia", "Lanjutkan video, modul, dan latihan pada journey aktif.", "Buka Chapter", "/learn/n4/chapter-1"),
      card("zoom", "Kelas", "Pengingat sesi Zoom", "Jadwal dan link sesi tatap muka langsung."),
      card("progress", "Kelas", "Progress chapter diperbarui", "Catatan progres belajarmu telah diperbarui.", "Buka Progress", "/progress"),
      card("streak", "Achievement", "Achievement baru terbuka", "Streak belajar berhasil mencapai milestone baru.", "Lihat Achievement", "/progress"),
      card("cert", "Achievement", "Sertifikat digital tersedia", "Sertifikat dapat dilihat dan diunduh dari Certificate Center."),
    ],
  },
  profile: {
    eyebrow: "AKUN & MEMBERSHIP",
    title: "Profil dan status belajarmu",
    description: "Kelola informasi akun, status belajar, sertifikat, dan preferensi.",
    cards: [
      card("user", "Hilmi", "Level N4", "hilmi.student@example.com"),
      card("member", "Free Member", "STATUS MEMBERSHIP", "Akses aktif dan dapat diperpanjang kapan saja.", "Perpanjang Membership", "/renewal"),
      card("cert", "Terkunci", "Sertifikat", "Sertifikat dapat dibuka setelah menyelesaikan target modul."),
      card("bell", "Tersedia", "Notifikasi", "Atur pengingat belajar dan informasi kelas.", "Buka", "/notifications"),
    ],
  },
  renewal: {
    eyebrow: "MEMBERSHIP RENEWAL",
    title: "Lanjutkan akses tanpa kehilangan progres",
    description: "Pilih paket lanjutan untuk melanjutkan perjalanan belajarmu.",
    cards: [
      card("curr", "Membership Aktif", "Free Member", "Progres belajar tetap tersimpan setelah perpanjangan."),
      card("plan", "Pilih plan lanjutan", "Belajar Mandiri", "Akses modul lengkap, latihan, dan Try Out."),
      card("sensei", "Pilih plan lanjutan", "Belajar dengan Sensei", "Semua fitur mandiri ditambah bimbingan Sensei dan sesi Zoom."),
    ],
  },
  affiliate: {
    eyebrow: "PROGRAM AFILIASI & REFERRAL",
    title: "Ajak teman belajar bersama di HIRU Academy",
    description: "Bagikan kode referralmu, berikan diskon pendaftaran untuk teman, dan dapatkan reward belajar.",
    cards: [],
  },
};
