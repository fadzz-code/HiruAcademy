"use client";

import { useSyncExternalStore } from "react";
import {
  CURRICULUM_CHANGE_EVENT,
  CURRICULUM_STORAGE_KEY,
  createInitialCurriculumStore,
  readCurriculumStore,
  type Chapter,
  type CurriculumStore,
  type FlashcardDeck,
  type LibraryMaterial,
  type Program,
  type ProgramCode,
  type ReplayRecord,
} from "@/lib/admin-curriculum-store";

export type PublishedCurriculum = {
  programs: Program[];
  chapters: Chapter[];
  flashcardDecks: FlashcardDeck[];
  libraryMaterials: LibraryMaterial[];
  replays: ReplayRecord[];
};

function extractPublished(store: CurriculumStore): PublishedCurriculum {
  return {
    programs: store.programs
      .filter((item) => item.status === "Published")
      .sort((a, b) => a.sortOrder - b.sortOrder),
    chapters: store.chapters
      .filter((item) => item.status === "Published")
      .sort((a, b) => a.order - b.order),
    flashcardDecks: store.flashcardDecks
      .filter((item) => item.status === "Published")
      .sort((a, b) => a.order - b.order),
    libraryMaterials: store.libraryMaterials.filter((item) => item.status === "Published"),
    replays: store.replays.filter((item) => item.status === "Published"),
  };
}

let cachedRaw: string | null | undefined;
let cachedCurriculum: PublishedCurriculum = extractPublished(createInitialCurriculumStore());

export function readPublishedCurriculum(): PublishedCurriculum {
  if (typeof window === "undefined") {
    return extractPublished(createInitialCurriculumStore());
  }
  const raw = localStorage.getItem(CURRICULUM_STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    const store = readCurriculumStore();
    cachedCurriculum = extractPublished(store);
  }
  return cachedCurriculum;
}

export function readPublishedPrograms(): Program[] {
  return readPublishedCurriculum().programs;
}

export function readPublishedChapters(programCode?: ProgramCode): Chapter[] {
  const chapters = readPublishedCurriculum().chapters;
  return programCode ? chapters.filter((item) => item.programCode === programCode) : chapters;
}

export function readPublishedDecks(programCode?: ProgramCode): FlashcardDeck[] {
  const decks = readPublishedCurriculum().flashcardDecks;
  return programCode ? decks.filter((item) => item.programCode === programCode) : decks;
}

export function readPublishedMaterials(programCode?: ProgramCode): LibraryMaterial[] {
  const materials = readPublishedCurriculum().libraryMaterials;
  return programCode ? materials.filter((item) => item.programCode === programCode) : materials;
}

export function readPublishedReplays(programCode?: ProgramCode): ReplayRecord[] {
  const replays = readPublishedCurriculum().replays;
  return programCode
    ? replays.filter((item) => !item.programCode || item.programCode === programCode)
    : replays;
}

function subscribe(onStoreChange: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === CURRICULUM_STORAGE_KEY) {
      cachedRaw = undefined;
      onStoreChange();
    }
  };
  const local = () => {
    cachedRaw = undefined;
    onStoreChange();
  };
  window.addEventListener("storage", storage);
  window.addEventListener(CURRICULUM_CHANGE_EVENT, local);
  return () => {
    window.removeEventListener("storage", storage);
    window.removeEventListener(CURRICULUM_CHANGE_EVENT, local);
  };
}

const defaultCurriculumSnapshot = extractPublished(createInitialCurriculumStore());

export function usePublishedCurriculum() {
  return useSyncExternalStore(subscribe, readPublishedCurriculum, () => defaultCurriculumSnapshot);
}

export function usePublishedPrograms(): Program[] {
  return usePublishedCurriculum().programs;
}
