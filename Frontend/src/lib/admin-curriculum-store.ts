"use client";

import { useCallback, useEffect, useState } from "react";

export const CURRICULUM_STORAGE_KEY = "hiru-admin-curriculum:v1";
export const CURRICULUM_CHANGE_EVENT = "hiru:curriculum-change";

export const programCodes = ["DASAR", "N5", "N4", "N3", "N2", "SSW", "INTERVIEW"] as const;
export type ProgramCode = (typeof programCodes)[number];

export const programStatuses = ["Draft", "Published", "Archived"] as const;
export type ProgramStatus = (typeof programStatuses)[number];

export type Program = {
  id: string;
  code: ProgramCode;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  status: ProgramStatus;
  sortOrder: number;
  selfStudyPrice: number;
  selfStudyAvailable: boolean;
  senseiPrice: number;
  senseiAvailable: boolean;
  accessDurationMonths: number;
};

export const chapterStatuses = ["Draft", "Published"] as const;
export type ChapterStatus = (typeof chapterStatuses)[number];

export type Chapter = {
  id: string;
  programCode: ProgramCode;
  title: string;
  slug: string;
  description: string;
  order: number;
  status: ChapterStatus;
  videoUrl: string;
  videoDuration: number;
  pdfUrl: string;
  pdfTitle: string;
  audioUrl: string;
  audioTitle: string;
  readingTitle: string;
  readingPassage: string;
  checkpointAssessmentId?: string;
  flashcardDeckId?: string;
};

export type FlashcardCard = {
  id: string;
  front: string;
  back: string;
  reading: string;
  meaning: string;
  example: string;
  order: number;
};

export const flashcardDeckStatuses = ["Draft", "Published"] as const;
export type FlashcardDeckStatus = (typeof flashcardDeckStatuses)[number];

export type FlashcardDeck = {
  id: string;
  programCode: ProgramCode;
  chapterId?: string;
  title: string;
  description: string;
  status: FlashcardDeckStatus;
  cards: FlashcardCard[];
  order: number;
};

export const libraryMaterialTypes = [
  "PDF",
  "Video",
  "Audio",
  "Reading",
  "Tata Bahasa",
  "Kanji",
  "Kosakata",
] as const;
export type LibraryMaterialType = (typeof libraryMaterialTypes)[number];

export const libraryMaterialStatuses = ["Draft", "Published"] as const;
export type LibraryMaterialStatus = (typeof libraryMaterialStatuses)[number];

export type LibraryMaterial = {
  id: string;
  programCode: ProgramCode;
  type: LibraryMaterialType;
  title: string;
  description: string;
  url: string;
  status: LibraryMaterialStatus;
};

export const replayStatuses = ["Draft", "Published"] as const;
export type ReplayStatus = (typeof replayStatuses)[number];

export type ReplayRecord = {
  id: string;
  programCode?: ProgramCode;
  title: string;
  senseiName: string;
  date: string;
  description: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  durationMinutes: number;
  status: ReplayStatus;
};

export type CurriculumStore = {
  version: 1;
  programs: Program[];
  chapters: Chapter[];
  flashcardDecks: FlashcardDeck[];
  libraryMaterials: LibraryMaterial[];
  replays: ReplayRecord[];
};

const text = (value: unknown) => (typeof value === "string" ? value : "");
const finiteNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;
const id = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export function extractYouTubeVideoId(urlOrId: string): string {
  const trimmed = (urlOrId ?? "").trim();
  if (!trimmed) return "";
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|(?:youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : "";
}

export const parseYouTubeVideoId = extractYouTubeVideoId;

export const defaultPrograms: Program[] = [
  {
    id: "program-dasar",
    code: "DASAR",
    name: "Dasar Bahasa Jepang",
    slug: "dasar",
    shortDescription: "Hiragana, Katakana, salam, dan pola dasar pemula.",
    description:
      "Fondasi menyeluruh aksara Jepang, pelafalan, salam dasar, dan pola kalimat pertama untuk pemula.",
    thumbnail: "/programs/dasar.jpg",
    status: "Published",
    sortOrder: 1,
    selfStudyPrice: 99000,
    selfStudyAvailable: true,
    senseiPrice: 350000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
  {
    id: "program-n5",
    code: "N5",
    name: "JLPT N5",
    slug: "n5",
    shortDescription: "Tata bahasa dasar, kanji pemula, dan percakapan harian.",
    description:
      "Persiapan lengkap ujian JLPT N5 mencakup tata bahasa, kosakata, kanji, serta latihan dokkai dan choukai.",
    thumbnail: "/programs/n5.jpg",
    status: "Published",
    sortOrder: 2,
    selfStudyPrice: 99000,
    selfStudyAvailable: true,
    senseiPrice: 350000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
  {
    id: "program-n4",
    code: "N4",
    name: "JLPT N4",
    slug: "n4",
    shortDescription: "Pola kalimat lanjutan, kanji esensial, dan percakapan kontekstual.",
    description:
      "Pola kalimat lanjutan, 300 kanji esensial, pemahaman teks bacaan dokkai, dan listening choukai tingkat pemula lanjutan.",
    thumbnail: "/programs/n4.jpg",
    status: "Published",
    sortOrder: 3,
    selfStudyPrice: 99000,
    selfStudyAvailable: true,
    senseiPrice: 350000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
  {
    id: "program-n3",
    code: "N3",
    name: "JLPT N3",
    slug: "n3",
    shortDescription: "Tata bahasa menengah, teks umum, dan kemampuan komunikasi.",
    description:
      "Jembatan menuju tingkat mahir: pemahaman teks berita sederhana, nuansa tata bahasa, dan percakapan sehari-hari yang alami.",
    thumbnail: "/programs/n3.jpg",
    status: "Published",
    sortOrder: 4,
    selfStudyPrice: 199000,
    selfStudyAvailable: true,
    senseiPrice: 450000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
  {
    id: "program-n2",
    code: "N2",
    name: "JLPT N2",
    slug: "n2",
    shortDescription: "Tata bahasa kompleks, artikel opini, dan pemahaman profesional.",
    description:
      "Penguasaan bahasa Jepang tingkat bisnis dan profesional, artikel opini, instruksi kerja, dan percakapan cepat.",
    thumbnail: "/programs/n2.jpg",
    status: "Published",
    sortOrder: 5,
    selfStudyPrice: 249000,
    selfStudyAvailable: true,
    senseiPrice: 550000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
  {
    id: "program-ssw",
    code: "SSW",
    name: "SSW Pengolahan Makanan",
    slug: "ssw-pengolahan-makanan",
    shortDescription: "SOP industri makanan Jepang, higienitas, dan instruksi lapangan.",
    description:
      "Kurikulum khusus Tokutei Ginou bidang pengolahan makanan, sanitasi pabrik, kosakata teknis, dan etika kerja industri Jepang.",
    thumbnail: "/programs/ssw.jpg",
    status: "Published",
    sortOrder: 6,
    selfStudyPrice: 299000,
    selfStudyAvailable: true,
    senseiPrice: 650000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
  {
    id: "program-interview",
    code: "INTERVIEW",
    name: "Persiapan Interview",
    slug: "interview",
    shortDescription: "Etika wawancara kerja, motivasi, dan simulasi profesional.",
    description:
      "Strategi lolos wawancara kerja di perusahaan Jepang: cara menyusun jikoshoukai, menjawab pertanyaan menjebak, dan keigo praktis.",
    thumbnail: "/programs/interview.jpg",
    status: "Published",
    sortOrder: 7,
    selfStudyPrice: 199000,
    selfStudyAvailable: true,
    senseiPrice: 450000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  },
];

export const defaultChapters: Chapter[] = [
  {
    id: "chapter-dasar-1",
    programCode: "DASAR",
    title: "Hiragana & Pelafalan Dasar",
    slug: "chapter-1",
    description: "Mengenal bentuk huruf Hiragana, bunyi seion, dakuon, dan kombinasi yoon.",
    order: 1,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: 25,
    pdfUrl: "/materials/dasar-c1-hiragana.pdf",
    pdfTitle: "Modul Hiragana Lengkap",
    audioUrl: "/audio/dasar-c1-seion.mp3",
    audioTitle: "Audio Latihan Pelafalan Huruf",
    readingTitle: "Latihan Membaca Kata Sederhana",
    readingPassage: "あさ、いぬ、ねこ、やま、かわ。ひらがなを ゆっくり よみましょう。",
    checkpointAssessmentId: "checkpoint-dasar-1",
    flashcardDeckId: "deck-dasar-1",
  },
  {
    id: "chapter-dasar-2",
    programCode: "DASAR",
    title: "Katakana & Kata Serapan",
    slug: "chapter-2",
    description:
      "Pengenalan huruf Katakana, aturan bunyi panjang chouon, dan kata serapan asing.",
    order: 2,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: 30,
    pdfUrl: "/materials/dasar-c2-katakana.pdf",
    pdfTitle: "Modul Katakana & Kata Serapan",
    audioUrl: "/audio/dasar-c2-katakana.mp3",
    audioTitle: "Audio Kata Serapan Bahasa Asing",
    readingTitle: "Membaca Menu & Nama Tempat Katakana",
    readingPassage: "コーヒー、パン、レストラン、ホテル。カタカナの ことばを おぼえましょう。",
    checkpointAssessmentId: "checkpoint-dasar-2",
    flashcardDeckId: "deck-dasar-2",
  },
  {
    id: "chapter-n5-1",
    programCode: "N5",
    title: "Perkenalan Diri & Partikel Dasar",
    slug: "chapter-1",
    description: "Pola kalimat 〜は〜です, partikel wa, mo, no, dan salam perkenalan jikoshoukai.",
    order: 1,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: 35,
    pdfUrl: "/materials/n5-c1-tata-bahasa.pdf",
    pdfTitle: "Modul Tata Bahasa N5 Chapter 1",
    audioUrl: "/audio/n5-c1-choukai.mp3",
    audioTitle: "Choukai Perkenalan Diri",
    readingTitle: "Teks Bacaan Jikoshoukai",
    readingPassage:
      "はじめまして。わたしは 田中 です。インドネシアから きました。どうぞ よろしく おねがいします。",
    checkpointAssessmentId: "checkpoint-n5-1",
    flashcardDeckId: "deck-n5-1",
  },
  {
    id: "chapter-n5-2",
    programCode: "N5",
    title: "Menunjukkan Benda & Lokasi",
    slug: "chapter-2",
    description: "Penggunaan ko-so-a-do (kore, sore, are, dore) dan lokasi (koko, soko, asoko).",
    order: 2,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: 28,
    pdfUrl: "/materials/n5-c2-lokasi.pdf",
    pdfTitle: "Modul Ko-So-A-Do & Lokasi",
    audioUrl: "/audio/n5-c2-benda.mp3",
    audioTitle: "Audio Percakapan Belanja di Toko",
    readingTitle: "Membaca Papan Petunjuk & Ruangan",
    readingPassage: "ここは きょうしつ です。あそこは じむしょ です。これは わたしの ほんです。",
    checkpointAssessmentId: "checkpoint-n5-2",
    flashcardDeckId: "deck-n5-2",
  },
  {
    id: "chapter-n4-1",
    programCode: "N4",
    title: "Tata Bahasa Dasar N4",
    slug: "chapter-1",
    description: "Pengantar pola kalimat lanjutan N4, bentuk potensial, dan partikel ga.",
    order: 1,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: 40,
    pdfUrl: "/materials/N4-Chapter-01-Modul-Tata-Bahasa.pdf",
    pdfTitle: "Modul Tata Bahasa N4 Chapter 1",
    audioUrl: "/audio/n4-c1-potensial.mp3",
    audioTitle: "Simulasi Choukai Kemampuan",
    readingTitle: "Membaca Pengalaman Belajar",
    readingPassage: "わたしは 漢字が 少し 読めます。日本語で 手紙を 書くことが できます。",
    checkpointAssessmentId: "checkpoint-n4-1",
    flashcardDeckId: "deck-n4-1",
  },
  {
    id: "chapter-n4-4",
    programCode: "N4",
    title: "Pola Kalimat dan Kehidupan Sehari-hari",
    slug: "chapter-4",
    description:
      "Pola kalimat untuk aktivitas sehari-hari, urutan kegiatan, dan perubahan bentuk kata kerja.",
    order: 4,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: 45,
    pdfUrl: "/materials/N4-Chapter-04-Modul-Tata-Bahasa.pdf",
    pdfTitle: "Modul Tata Bahasa — Pola Kalimat Sehari-hari",
    audioUrl: "/audio/n4-c4-audio.mp3",
    audioTitle: "Audio Question — Aktivitas Pagi Hari",
    readingTitle: "Reading Question — Rutinitas Tanaka",
    readingPassage:
      "毎朝、田中さんは七時に起きます。朝ご飯を食べてから、日本語を三十分勉強します。そのあと、八時に会社へ行きます。",
    checkpointAssessmentId: "checkpoint-n4-4",
    flashcardDeckId: "deck-n4-1",
  },
];

export const defaultFlashcardDecks: FlashcardDeck[] = [
  {
    id: "deck-n4-1",
    programCode: "N4",
    chapterId: "chapter-n4-4",
    title: "Kosakata Rutinitas Harian N4",
    description: "Kumpulan kartu kosakata penting untuk rutinitas dan aktivitas harian N4.",
    status: "Published",
    order: 1,
    cards: [
      {
        id: "card-n4-1",
        front: "学ぶ",
        back: "belajar / mempelajari",
        reading: "まなぶ",
        meaning: "belajar / mempelajari",
        example: "毎日、日本語を学んでいます。",
        order: 1,
      },
      {
        id: "card-n4-2",
        front: "続ける",
        back: "melanjutkan",
        reading: "つづける",
        meaning: "melanjutkan",
        example: "少しずつ勉強を続けます。",
        order: 2,
      },
      {
        id: "card-n4-3",
        front: "分かる",
        back: "mengerti / memahami",
        reading: "わかる",
        meaning: "mengerti / memahami",
        example: "例を見ると、意味が分かります。",
        order: 3,
      },
      {
        id: "card-n4-4",
        front: "復習",
        back: "mengulang pelajaran",
        reading: "ふくしゅう",
        meaning: "mengulang pelajaran",
        example: "学んだ言葉を復習します。",
        order: 4,
      },
      {
        id: "card-n4-5",
        front: "経験",
        back: "pengalaman",
        reading: "けいけん",
        meaning: "pengalaman",
        example: "日本での経験はとても役に立ちます。",
        order: 5,
      },
    ],
  },
  {
    id: "deck-n5-1",
    programCode: "N5",
    chapterId: "chapter-n5-1",
    title: "Kosakata Esensial Pemula N5",
    description: "Kosakata penting perkenalan diri dan kehidupan sekolah N5.",
    status: "Published",
    order: 1,
    cards: [
      {
        id: "card-n5-1",
        front: "毎日",
        back: "setiap hari",
        reading: "まいにち",
        meaning: "setiap hari",
        example: "毎日 日本語を 勉強します。",
        order: 1,
      },
      {
        id: "card-n5-2",
        front: "朝ご飯",
        back: "sarapan",
        reading: "あさごはん",
        meaning: "sarapan",
        example: "七時に 朝ご飯を 食べます。",
        order: 2,
      },
      {
        id: "card-n5-3",
        front: "会社",
        back: "kantor / perusahaan",
        reading: "かいしゃ",
        meaning: "kantor / perusahaan",
        example: "八時に 会社へ 行きます。",
        order: 3,
      },
      {
        id: "card-n5-4",
        front: "友達",
        back: "teman",
        reading: "ともだち",
        meaning: "teman",
        example: "友達と 図書館へ 行きます。",
        order: 4,
      },
    ],
  },
];

export const defaultLibraryMaterials: LibraryMaterial[] = [
  {
    id: "lib-mat-1",
    programCode: "N4",
    type: "Tata Bahasa",
    title: "Modul Pola Kalimat Sehari-hari",
    description: "Pola Kalimat Sehari-hari. Modul Chapter 4 yang terakhir dibuka.",
    url: "/materials/N4-Chapter-04-Modul-Tata-Bahasa.pdf",
    status: "Published",
  },
  {
    id: "lib-mat-2",
    programCode: "N4",
    type: "Kanji",
    title: "Keadaan, Waktu & Aktivitas",
    description: "Kanji chapter dengan bookmark dan catatan pembacaan on-yomi dan kun-yomi.",
    url: "/materials/N4-Chapter-04-Modul-Huruf-Jepang-Kanji.pdf",
    status: "Published",
  },
  {
    id: "lib-mat-3",
    programCode: "N4",
    type: "Audio",
    title: "Simulasi Choukai N4",
    description: "Akses audio latihan mendengarkan lengkap mengikuti paket belajarmu.",
    url: "/audio/n4-choukai-simulasi.mp3",
    status: "Published",
  },
  {
    id: "lib-mat-4",
    programCode: "N5",
    type: "PDF",
    title: "Daftar 100 Kanji Dasar N5",
    description: "Ringkasan 100 kanji pemula lengkap dengan cara baca dan guratan.",
    url: "/materials/n5-kanji-100.pdf",
    status: "Published",
  },
  {
    id: "lib-mat-5",
    programCode: "DASAR",
    type: "Reading",
    title: "Panduan Cepat Hiragana & Katakana",
    description: "Tabel perbandingan huruf kana beserta contoh kata benda umum.",
    url: "/materials/tabel-kana-dasar.pdf",
    status: "Published",
  },
];

export const defaultReplays: ReplayRecord[] = [
  {
    id: "replay-n4-c4",
    programCode: "N4",
    title: "Chapter 4 — Pola Kalimat dan Kehidupan",
    senseiName: "Kenji Tanaka Sensei",
    date: "2026-08-15",
    description:
      "Replay bimbingan langsung materi Chapter 4, bedah pola kalimat, dan tanya jawab interaktif.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    durationMinutes: 90,
    status: "Published",
  },
  {
    id: "replay-n4-grammar",
    programCode: "N4",
    title: "Review Grammar N4 & Latihan Pola Kalimat",
    senseiName: "Aoi Takahashi Sensei",
    date: "2026-08-22",
    description:
      "Pembahasan latihan soal grammar, tips eliminasi opsi jawaban cepat, dan contoh percakapan nyata.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    durationMinutes: 85,
    status: "Published",
  },
];

export function createProgram(code: ProgramCode = "N5"): Program {
  return {
    id: id(),
    code,
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    status: "Draft",
    sortOrder: 1,
    selfStudyPrice: 99000,
    selfStudyAvailable: true,
    senseiPrice: 350000,
    senseiAvailable: true,
    accessDurationMonths: 6,
  };
}

export function createChapter(programCode: ProgramCode = "N5"): Chapter {
  return {
    id: id(),
    programCode,
    title: "",
    slug: "",
    description: "",
    order: 1,
    status: "Draft",
    videoUrl: "",
    videoDuration: 0,
    pdfUrl: "",
    pdfTitle: "",
    audioUrl: "",
    audioTitle: "",
    readingTitle: "",
    readingPassage: "",
  };
}

export function createFlashcardCard(order = 1): FlashcardCard {
  return {
    id: id(),
    front: "",
    back: "",
    reading: "",
    meaning: "",
    example: "",
    order,
  };
}

export function createFlashcardDeck(programCode: ProgramCode = "N5"): FlashcardDeck {
  return {
    id: id(),
    programCode,
    title: "",
    description: "",
    status: "Draft",
    cards: [createFlashcardCard(1)],
    order: 1,
  };
}

export function createLibraryMaterial(programCode: ProgramCode = "N5"): LibraryMaterial {
  return {
    id: id(),
    programCode,
    type: "PDF",
    title: "",
    description: "",
    url: "",
    status: "Draft",
  };
}

export function createReplay(programCode?: ProgramCode): ReplayRecord {
  return {
    id: id(),
    programCode,
    title: "",
    senseiName: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    youtubeUrl: "",
    youtubeVideoId: "",
    durationMinutes: 60,
    status: "Draft",
  };
}

function normalizeProgram(value: unknown): Program | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const code = text(item.code) as ProgramCode;
  if (!programCodes.includes(code)) return null;
  const status = programStatuses.includes(item.status as ProgramStatus)
    ? (item.status as ProgramStatus)
    : "Draft";

  return {
    id: text(item.id) || id(),
    code,
    name: text(item.name),
    slug: text(item.slug) || code.toLowerCase(),
    shortDescription: text(item.shortDescription),
    description: text(item.description),
    thumbnail: text(item.thumbnail),
    status,
    sortOrder: finiteNumber(item.sortOrder) ?? 0,
    selfStudyPrice: finiteNumber(item.selfStudyPrice) ?? 0,
    selfStudyAvailable: item.selfStudyAvailable !== false,
    senseiPrice: finiteNumber(item.senseiPrice) ?? 0,
    senseiAvailable: item.senseiAvailable !== false,
    accessDurationMonths: finiteNumber(item.accessDurationMonths) ?? 6,
  };
}

function normalizeChapter(value: unknown): Chapter | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const programCode = text(item.programCode) as ProgramCode;
  if (!programCodes.includes(programCode)) return null;
  const status = chapterStatuses.includes(item.status as ChapterStatus)
    ? (item.status as ChapterStatus)
    : "Draft";

  return {
    id: text(item.id) || id(),
    programCode,
    title: text(item.title),
    slug: text(item.slug),
    description: text(item.description),
    order: finiteNumber(item.order) ?? 1,
    status,
    videoUrl: text(item.videoUrl),
    videoDuration: finiteNumber(item.videoDuration) ?? 0,
    pdfUrl: text(item.pdfUrl),
    pdfTitle: text(item.pdfTitle),
    audioUrl: text(item.audioUrl),
    audioTitle: text(item.audioTitle),
    readingTitle: text(item.readingTitle),
    readingPassage: text(item.readingPassage),
    checkpointAssessmentId: text(item.checkpointAssessmentId) || undefined,
    flashcardDeckId: text(item.flashcardDeckId) || undefined,
  };
}

function normalizeCard(value: unknown, index: number): FlashcardCard | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  return {
    id: text(item.id) || id(),
    front: text(item.front),
    back: text(item.back),
    reading: text(item.reading),
    meaning: text(item.meaning),
    example: text(item.example),
    order: finiteNumber(item.order) ?? index + 1,
  };
}

function normalizeFlashcardDeck(value: unknown): FlashcardDeck | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const programCode = text(item.programCode) as ProgramCode;
  if (!programCodes.includes(programCode)) return null;
  const status = flashcardDeckStatuses.includes(item.status as FlashcardDeckStatus)
    ? (item.status as FlashcardDeckStatus)
    : "Draft";

  const cards = Array.isArray(item.cards)
    ? item.cards
        .map(normalizeCard)
        .filter((card): card is FlashcardCard => !!card)
    : [];

  return {
    id: text(item.id) || id(),
    programCode,
    chapterId: text(item.chapterId) || undefined,
    title: text(item.title),
    description: text(item.description),
    status,
    cards,
    order: finiteNumber(item.order) ?? 1,
  };
}

function normalizeLibraryMaterial(value: unknown): LibraryMaterial | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const programCode = text(item.programCode) as ProgramCode;
  if (!programCodes.includes(programCode)) return null;
  const type = libraryMaterialTypes.includes(item.type as LibraryMaterialType)
    ? (item.type as LibraryMaterialType)
    : "PDF";
  const status = libraryMaterialStatuses.includes(item.status as LibraryMaterialStatus)
    ? (item.status as LibraryMaterialStatus)
    : "Draft";

  return {
    id: text(item.id) || id(),
    programCode,
    type,
    title: text(item.title),
    description: text(item.description),
    url: text(item.url),
    status,
  };
}

function normalizeReplay(value: unknown): ReplayRecord | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const programCodeRaw = text(item.programCode) as ProgramCode;
  const programCode = programCodes.includes(programCodeRaw) ? programCodeRaw : undefined;
  const status = replayStatuses.includes(item.status as ReplayStatus)
    ? (item.status as ReplayStatus)
    : "Draft";
  const youtubeUrl = text(item.youtubeUrl);
  const rawId = text(item.youtubeVideoId);
  const youtubeVideoId = rawId || extractYouTubeVideoId(youtubeUrl);

  return {
    id: text(item.id) || id(),
    programCode,
    title: text(item.title),
    senseiName: text(item.senseiName),
    date: text(item.date),
    description: text(item.description),
    youtubeUrl,
    youtubeVideoId,
    durationMinutes: finiteNumber(item.durationMinutes) ?? 0,
    status,
  };
}

export function createInitialCurriculumStore(): CurriculumStore {
  return {
    version: 1,
    programs: defaultPrograms,
    chapters: defaultChapters,
    flashcardDecks: defaultFlashcardDecks,
    libraryMaterials: defaultLibraryMaterials,
    replays: defaultReplays,
  };
}

export function normalizeCurriculumStore(value: unknown): CurriculumStore {
  if (!value || typeof value !== "object") return createInitialCurriculumStore();
  const raw = value as Record<string, unknown>;

  return {
    version: 1,
    programs: Array.isArray(raw.programs)
      ? raw.programs.map(normalizeProgram).filter((p): p is Program => !!p)
      : defaultPrograms,
    chapters: Array.isArray(raw.chapters)
      ? raw.chapters.map(normalizeChapter).filter((c): c is Chapter => !!c)
      : defaultChapters,
    flashcardDecks: Array.isArray(raw.flashcardDecks)
      ? raw.flashcardDecks.map(normalizeFlashcardDeck).filter((d): d is FlashcardDeck => !!d)
      : defaultFlashcardDecks,
    libraryMaterials: Array.isArray(raw.libraryMaterials)
      ? raw.libraryMaterials.map(normalizeLibraryMaterial).filter((m): m is LibraryMaterial => !!m)
      : defaultLibraryMaterials,
    replays: Array.isArray(raw.replays)
      ? raw.replays.map(normalizeReplay).filter((r): r is ReplayRecord => !!r)
      : defaultReplays,
  };
}

function announceChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CURRICULUM_CHANGE_EVENT));
}

export function readCurriculumStore(
  storage: Pick<Storage, "getItem"> | null = typeof window === "undefined"
    ? null
    : window.localStorage
): CurriculumStore {
  if (!storage) return createInitialCurriculumStore();
  try {
    const raw = storage.getItem(CURRICULUM_STORAGE_KEY);
    return normalizeCurriculumStore(raw ? JSON.parse(raw) : null);
  } catch {
    return createInitialCurriculumStore();
  }
}

export function saveCurriculumStore(
  store: CurriculumStore,
  storage: Pick<Storage, "setItem"> = window.localStorage
): CurriculumStore {
  storage.setItem(CURRICULUM_STORAGE_KEY, JSON.stringify(store));
  announceChange();
  return store;
}

export function readPrograms(
  storage?: Pick<Storage, "getItem"> | null
): Program[] {
  return readCurriculumStore(storage).programs;
}

export function readProgram(
  idValue: string,
  storage?: Pick<Storage, "getItem"> | null
): Program | undefined {
  return readPrograms(storage).find((p) => p.id === idValue);
}

export function saveProgram(
  item: Program,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): Program {
  const store = readCurriculumStore(storage);
  const exists = store.programs.some((p) => p.id === item.id);
  const nextPrograms = exists
    ? store.programs.map((p) => (p.id === item.id ? item : p))
    : [...store.programs, item];
  saveCurriculumStore({ ...store, programs: nextPrograms }, storage);
  return item;
}

export function deleteProgram(
  idValue: string,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): void {
  const store = readCurriculumStore(storage);
  saveCurriculumStore(
    { ...store, programs: store.programs.filter((p) => p.id !== idValue) },
    storage
  );
}

export function readChapters(
  programCode?: ProgramCode,
  storage?: Pick<Storage, "getItem"> | null
): Chapter[] {
  const chapters = readCurriculumStore(storage).chapters;
  return programCode ? chapters.filter((c) => c.programCode === programCode) : chapters;
}

export function readChapter(
  idValue: string,
  storage?: Pick<Storage, "getItem"> | null
): Chapter | undefined {
  return readCurriculumStore(storage).chapters.find((c) => c.id === idValue);
}

export function saveChapter(
  item: Chapter,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): Chapter {
  const store = readCurriculumStore(storage);
  const exists = store.chapters.some((c) => c.id === item.id);
  const nextChapters = exists
    ? store.chapters.map((c) => (c.id === item.id ? item : c))
    : [...store.chapters, item];
  saveCurriculumStore({ ...store, chapters: nextChapters }, storage);
  return item;
}

export function deleteChapter(
  idValue: string,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): void {
  const store = readCurriculumStore(storage);
  saveCurriculumStore(
    { ...store, chapters: store.chapters.filter((c) => c.id !== idValue) },
    storage
  );
}

export function readFlashcardDecks(
  programCode?: ProgramCode,
  storage?: Pick<Storage, "getItem"> | null
): FlashcardDeck[] {
  const decks = readCurriculumStore(storage).flashcardDecks;
  return programCode ? decks.filter((d) => d.programCode === programCode) : decks;
}

export function readFlashcardDeck(
  idValue: string,
  storage?: Pick<Storage, "getItem"> | null
): FlashcardDeck | undefined {
  return readCurriculumStore(storage).flashcardDecks.find((d) => d.id === idValue);
}

export function saveFlashcardDeck(
  item: FlashcardDeck,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): FlashcardDeck {
  const store = readCurriculumStore(storage);
  const exists = store.flashcardDecks.some((d) => d.id === item.id);
  const nextDecks = exists
    ? store.flashcardDecks.map((d) => (d.id === item.id ? item : d))
    : [...store.flashcardDecks, item];
  saveCurriculumStore({ ...store, flashcardDecks: nextDecks }, storage);
  return item;
}

export function deleteFlashcardDeck(
  idValue: string,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): void {
  const store = readCurriculumStore(storage);
  saveCurriculumStore(
    { ...store, flashcardDecks: store.flashcardDecks.filter((d) => d.id !== idValue) },
    storage
  );
}

export function readLibraryMaterials(
  programCode?: ProgramCode,
  storage?: Pick<Storage, "getItem"> | null
): LibraryMaterial[] {
  const materials = readCurriculumStore(storage).libraryMaterials;
  return programCode ? materials.filter((m) => m.programCode === programCode) : materials;
}

export function readLibraryMaterial(
  idValue: string,
  storage?: Pick<Storage, "getItem"> | null
): LibraryMaterial | undefined {
  return readCurriculumStore(storage).libraryMaterials.find((m) => m.id === idValue);
}

export function saveLibraryMaterial(
  item: LibraryMaterial,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): LibraryMaterial {
  const store = readCurriculumStore(storage);
  const exists = store.libraryMaterials.some((m) => m.id === item.id);
  const nextMaterials = exists
    ? store.libraryMaterials.map((m) => (m.id === item.id ? item : m))
    : [...store.libraryMaterials, item];
  saveCurriculumStore({ ...store, libraryMaterials: nextMaterials }, storage);
  return item;
}

export function deleteLibraryMaterial(
  idValue: string,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): void {
  const store = readCurriculumStore(storage);
  saveCurriculumStore(
    { ...store, libraryMaterials: store.libraryMaterials.filter((m) => m.id !== idValue) },
    storage
  );
}

export function readReplays(
  programCode?: ProgramCode,
  storage?: Pick<Storage, "getItem"> | null
): ReplayRecord[] {
  const replays = readCurriculumStore(storage).replays;
  return programCode
    ? replays.filter((r) => !r.programCode || r.programCode === programCode)
    : replays;
}

export function readReplay(
  idValue: string,
  storage?: Pick<Storage, "getItem"> | null
): ReplayRecord | undefined {
  return readCurriculumStore(storage).replays.find((r) => r.id === idValue);
}

export function saveReplay(
  item: ReplayRecord,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): ReplayRecord {
  const store = readCurriculumStore(storage);
  const youtubeVideoId = item.youtubeVideoId || extractYouTubeVideoId(item.youtubeUrl);
  const record: ReplayRecord = { ...item, youtubeVideoId };
  const exists = store.replays.some((r) => r.id === record.id);
  const nextReplays = exists
    ? store.replays.map((r) => (r.id === record.id ? record : r))
    : [...store.replays, record];
  saveCurriculumStore({ ...store, replays: nextReplays }, storage);
  return record;
}

export function deleteReplay(
  idValue: string,
  storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage
): void {
  const store = readCurriculumStore(storage);
  saveCurriculumStore(
    { ...store, replays: store.replays.filter((r) => r.id !== idValue) },
    storage
  );
}

export function useCurriculumStore() {
  const [store, setStore] = useState<CurriculumStore>(createInitialCurriculumStore);
  const refresh = useCallback(() => setStore(readCurriculumStore()), []);

  useEffect(() => {
    const timer = setTimeout(refresh, 0);
    const onStorage = (event: StorageEvent) => {
      if (event.key === CURRICULUM_STORAGE_KEY) refresh();
    };

    window.addEventListener(CURRICULUM_CHANGE_EVENT, refresh);
    window.addEventListener("storage", onStorage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(CURRICULUM_CHANGE_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  return { store, refresh };
}
