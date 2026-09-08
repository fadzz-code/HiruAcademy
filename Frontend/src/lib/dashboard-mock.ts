export type Membership = "free" | "lms" | "sensei";
export type DashboardIcon =
  | "achievement"
  | "certificate"
  | "checkpoint"
  | "community"
  | "journey"
  | "library"
  | "practice"
  | "replay"
  | "sensei"
  | "tryout"
  | "affiliate";

export type DashboardAction = {
  title: string;
  detail: string;
  icon: DashboardIcon;
  href: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  xp: string;
  isCurrentUser?: boolean;
};

export type DashboardConfig = {
  greeting: string;
  subgreeting: string;
  level: string;
  target: string;
  continue: {
    label: string;
    title: string;
    description: string;
    primary: string;
    primaryHref: string;
    timeRemaining: string;
    progress: string;
    progressPercent: number;
    progressLabel: string;
    detail: string;
  };
  quickActions: DashboardAction[];
  leaderboard: LeaderboardEntry[];
  progressSummary: { label: string; value: string }[];
};

export type DashboardData = {
  membership: Membership;
  membershipLabel: string;
  user: {
    displayName: string;
    initials: string;
    level: string;
    target: string;
    joinDate: string;
  };
  config: DashboardConfig;
};

const defaultLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Siti Aisyah", xp: "Konsisten" },
  { rank: 2, name: "Budi Santoso", xp: "Konsisten" },
  { rank: 3, name: "Rina Wati", xp: "Konsisten" },
  { rank: 4, name: "Dian Indra", xp: "Konsisten" },
  { rank: 5, name: "Hilmi (Kamu)", xp: "Level N4", isCurrentUser: true },
];

const quickActionsFor = (membership: Membership): DashboardAction[] => {
  if (membership === "sensei") {
    return [
      { title: "Journey", detail: "Perjalanan Level", icon: "journey", href: `/journey?membership=${membership}` },
      { title: "Jadwal", detail: "Sesi Kelas Zoom", icon: "checkpoint", href: `/schedule?membership=${membership}` },
      { title: "Replay", detail: "Rekaman Kelas", icon: "replay", href: `/replay?membership=${membership}` },
      { title: "Tanya Sensei", detail: "Konsultasi Materi", icon: "sensei", href: `/ask-sensei?membership=${membership}` },
      { title: "Komunitas", detail: "Diskusi Pembelajar", icon: "community", href: `/community?membership=${membership}` },
      { title: "Affiliate", detail: "Ajak Teman & Diskon", icon: "affiliate", href: `/affiliate?membership=${membership}` },
    ];
  }

  return [
    { title: "Journey", detail: "Perjalanan Level", icon: "journey", href: `/journey?membership=${membership}` },
    { title: "Perpustakaan", detail: "Materi & Modul", icon: "library", href: `/library?membership=${membership}` },
    { title: "Latihan", detail: "Latihan Harian", icon: "practice", href: `/practice?membership=${membership}` },
    { title: "Try Out", detail: "Simulasi Ujian", icon: "tryout", href: `/tryout?membership=${membership}` },
    { title: "Komunitas", detail: "Diskusi Pembelajar", icon: "community", href: `/community?membership=${membership}` },
    { title: "Affiliate", detail: "Ajak Teman & Diskon", icon: "affiliate", href: `/affiliate?membership=${membership}` },
  ];
};

const configs: Record<Membership, DashboardConfig> = {
  free: {
    greeting: "Halo, Hilmi",
    subgreeting: "Siap untuk melanjutkan perjalanan bahasa Jepangmu hari ini?",
    level: "Level N4",
    target: "Target JLPT: Des 2026",
    continue: {
      label: "TERAKHIR BELAJAR",
      title: "Chapter 1 — JLPT N4",
      description: "Pelajari tata bahasa dasar dan pola kalimat esensial untuk persiapan JLPT N4.",
      primary: "Lanjutkan Belajar",
      primaryHref: "/learn/n4/chapter-1?membership=free",
      timeRemaining: "Siap dipelajari",
      progress: "56%",
      progressPercent: 56,
      progressLabel: "Progres N4",
      detail: "14 dari 25 modul selesai",
    },
    quickActions: quickActionsFor("free"),
    leaderboard: defaultLeaderboard,
    progressSummary: [
      { label: "Progres Materi", value: "Level N4" },
      { label: "Konsistensi", value: "Aktif" },
      { label: "Modul Selesai", value: "14 modul" },
    ],
  },
  lms: {
    greeting: "Halo, Hilmi",
    subgreeting: "Siap untuk melanjutkan perjalanan bahasa Jepangmu hari ini?",
    level: "Level N4",
    target: "Target JLPT: Des 2026",
    continue: {
      label: "TERAKHIR BELAJAR",
      title: "Bunpou Bab 12: Kata Kerja Te-form",
      description: "Mari selesaikan latihan pola kalimat -te kudasai untuk meminta bantuan dengan sopan.",
      primary: "Lanjutkan Belajar",
      primaryHref: "/learn/n4/chapter-4?membership=lms",
      timeRemaining: "Siap dipelajari",
      progress: "65%",
      progressPercent: 65,
      progressLabel: "Progres N4",
      detail: "26 dari 40 modul selesai",
    },
    quickActions: quickActionsFor("lms"),
    leaderboard: defaultLeaderboard,
    progressSummary: [
      { label: "XP Mingguan", value: "9.120 XP" },
      { label: "Streak Belajar", value: "12 hari" },
      { label: "Modul Selesai", value: "26 modul" },
    ],
  },
  sensei: {
    greeting: "Halo, Hilmi",
    subgreeting: "Siap untuk melanjutkan perjalanan bahasa Jepangmu hari ini?",
    level: "Level N4",
    target: "Target JLPT: Des 2026",
    continue: {
      label: "TERAKHIR BELAJAR",
      title: "Bunpou Bab 12: Kata Kerja Te-form",
      description: "Mari selesaikan latihan pola kalimat -te kudasai untuk meminta bantuan dengan sopan.",
      primary: "Lanjutkan Belajar",
      primaryHref: "/learn/n4/chapter-4?membership=sensei",
      timeRemaining: "Siap dipelajari",
      progress: "65%",
      progressPercent: 65,
      progressLabel: "Progres N4",
      detail: "26 dari 40 modul selesai",
    },
    quickActions: quickActionsFor("sensei"),
    leaderboard: defaultLeaderboard,
    progressSummary: [
      { label: "Progres Materi", value: "Level N4" },
      { label: "Konsistensi", value: "Aktif" },
      { label: "Sesi Cohort", value: "Sesuai Jadwal" },
    ],
  },
};

const membershipLabels: Record<Membership, string> = {
  free: "Free Member",
  lms: "Belajar Mandiri",
  sensei: "Belajar dengan Sensei",
};

export function getDashboardData(membership: Membership): DashboardData {
  return {
    membership,
    membershipLabel: membershipLabels[membership],
    user: {
      displayName: "Hilmi",
      initials: "HI",
      level: "Level N4",
      target: "Des 2026",
      joinDate: "12 Januari 2026",
    },
    config: configs[membership],
  };
}

export function parseMembership(value?: string): Membership {
  return value === "lms" || value === "sensei" ? value : "free";
}
