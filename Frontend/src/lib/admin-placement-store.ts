"use client";

import { useSyncExternalStore } from "react";
import { placementQuestions } from "@/lib/public-mock";

export const PLACEMENT_STORAGE_KEY = "hiru-admin-placement:v1";
export const PLACEMENT_CHANGE_EVENT = "hiru:placement-change";

export type PlacementOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type PlacementQuestion = {
  id: string;
  number: number;
  area: string;
  prompt: string;
  imageUrl?: string;
  audioUrl?: string;
  options: PlacementOption[];
  explanation?: string;
};

export type RecommendationRule = {
  id: string;
  minScore: number;
  maxScore: number;
  recommendedProgramCode: string;
  resultTitle: string;
  resultDescription: string;
  ctaLabel?: string;
  ctaDestination?: string;
  order: number;
};

export type PlacementConfig = {
  id: string;
  title: string;
  introHeading: string;
  description: string;
  durationMinutes: number;
  status: "Draft" | "Published";
  questions: PlacementQuestion[];
  rules: RecommendationRule[];
  updatedAt: string;
};

export type PlacementLead = {
  id: string;
  date: string;
  name: string;
  whatsapp: string;
  target: string;
  score: number;
  recommendedLevel: string;
  status: "Baru" | "Sudah Dihubungi";
};

export type PlacementStoreData = {
  version: 1;
  config: PlacementConfig;
  publishedConfig?: PlacementConfig;
  leads: PlacementLead[];
};

export const initialPlacementQuestions: PlacementQuestion[] = placementQuestions.map((q) => ({
  id: `pq-${q.number}`,
  number: q.number,
  area: q.area,
  prompt: q.prompt,
  options: q.answers.map((text, idx) => ({
    id: `pq-${q.number}-opt-${idx + 1}`,
    text,
    isCorrect: text === q.correctAnswer,
  })),
}));

export const initialRecommendationRules: RecommendationRule[] = [
  {
    id: "rule-n5",
    minScore: 0,
    maxScore: 39,
    recommendedProgramCode: "N5",
    resultTitle: "Rekomendasi Level N5",
    resultDescription: "Mulai dari dasar huruf, kosakata harian, dan pola kalimat N5.",
    ctaLabel: "Lihat Program N5",
    ctaDestination: "/program",
    order: 1,
  },
  {
    id: "rule-n4",
    minScore: 40,
    maxScore: 59,
    recommendedProgramCode: "N4",
    resultTitle: "Rekomendasi Level N4",
    resultDescription: "Tingkatkan kemampuan ke percakapan praktis dan tata bahasa N4.",
    ctaLabel: "Lihat Program N4",
    ctaDestination: "/program",
    order: 2,
  },
  {
    id: "rule-n3",
    minScore: 60,
    maxScore: 74,
    recommendedProgramCode: "N3",
    resultTitle: "Rekomendasi Level N3",
    resultDescription: "Siap mendalami pemahaman teks dan tata bahasa level menengah N3.",
    ctaLabel: "Lihat Program N3",
    ctaDestination: "/program",
    order: 3,
  },
  {
    id: "rule-n2",
    minScore: 75,
    maxScore: 100,
    recommendedProgramCode: "N2",
    resultTitle: "Rekomendasi Level N2",
    resultDescription: "Persiapan intensif level lanjutan N2 untuk studi atau karir di Jepang.",
    ctaLabel: "Lihat Program N2",
    ctaDestination: "/program",
    order: 4,
  },
];

export const initialPlacementLeads: PlacementLead[] = [
  {
    id: "lead-1",
    date: "2026-08-20",
    name: "Dimas",
    whatsapp: "081234567890",
    target: "N3",
    score: 68,
    recommendedLevel: "N3",
    status: "Baru",
  },
  {
    id: "lead-2",
    date: "2026-08-19",
    name: "Rina",
    whatsapp: "081298765432",
    target: "N4",
    score: 48,
    recommendedLevel: "N4",
    status: "Sudah Dihubungi",
  },
  {
    id: "lead-3",
    date: "2026-08-18",
    name: "Budi",
    whatsapp: "081311223344",
    target: "N5",
    score: 32,
    recommendedLevel: "N5",
    status: "Sudah Dihubungi",
  },
];

export const initialPlacementConfig: PlacementConfig = {
  id: "placement-default",
  title: "Placement Test HIRU Academy",
  introHeading: "Ketahui Level Bahasa Jepangmu",
  description: "Evaluasi mandiri 20 soal mencakup Bunpou, Moji・Goi, Dokkai, dan Choukai.",
  durationMinutes: 5,
  status: "Published",
  questions: initialPlacementQuestions,
  rules: initialRecommendationRules,
  updatedAt: "2026-08-20T00:00:00.000Z",
};

export const initialPlacementStore: PlacementStoreData = {
  version: 1,
  config: initialPlacementConfig,
  publishedConfig: {
    ...initialPlacementConfig,
    status: "Published",
  },
  leads: initialPlacementLeads,
};

export const initialStore = initialPlacementStore;

function str(val: unknown): string {
  return typeof val === "string" ? val : "";
}

function num(val: unknown, fallback: number): number {
  return typeof val === "number" && Number.isFinite(val) ? val : fallback;
}

function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function normalizePlacementStore(data: unknown): PlacementStoreData {
  if (!data || typeof data !== "object") return initialPlacementStore;
  const raw = data as Record<string, unknown>;

  const questionIds = new Set<string>();
  const optionIds = new Set<string>();
  const ruleIds = new Set<string>();
  const leadIds = new Set<string>();

  const normalizeQuestion = (q: unknown, index: number): PlacementQuestion | null => {
    if (!q || typeof q !== "object") return null;
    const item = q as Record<string, unknown>;
    const rawQId = str(item.id).trim();
    const qId = rawQId && !questionIds.has(rawQId) ? rawQId : genId("pq");
    questionIds.add(qId);

    const rawOptions = Array.isArray(item.options) ? item.options : [];
    const options: PlacementOption[] = rawOptions.flatMap((opt, optIndex) => {
      if (!opt || typeof opt !== "object") return [];
      const o = opt as Record<string, unknown>;
      const rawOId = str(o.id).trim();
      const oId = rawOId && !optionIds.has(rawOId) ? rawOId : `${qId}-opt-${optIndex + 1}`;
      optionIds.add(oId);
      return [{
        id: oId,
        text: str(o.text),
        isCorrect: o.isCorrect === true,
      }];
    });

    return {
      id: qId,
      number: num(item.number, index + 1),
      area: str(item.area) || "Bunpou",
      prompt: str(item.prompt),
      imageUrl: str(item.imageUrl) || undefined,
      audioUrl: str(item.audioUrl) || undefined,
      explanation: str(item.explanation) || undefined,
      options: options.length > 0 ? options : [
        { id: `${qId}-opt-1`, text: "A", isCorrect: true },
        { id: `${qId}-opt-2`, text: "B", isCorrect: false },
      ],
    };
  };

  const normalizeRule = (r: unknown, index: number): RecommendationRule | null => {
    if (!r || typeof r !== "object") return null;
    const item = r as Record<string, unknown>;
    const rawRId = str(item.id).trim();
    const rId = rawRId && !ruleIds.has(rawRId) ? rawRId : genId("rule");
    ruleIds.add(rId);

    return {
      id: rId,
      minScore: Math.max(0, Math.min(100, num(item.minScore, 0))),
      maxScore: Math.max(0, Math.min(100, num(item.maxScore, 100))),
      recommendedProgramCode: str(item.recommendedProgramCode) || "N5",
      resultTitle: str(item.resultTitle) || "Rekomendasi Level",
      resultDescription: str(item.resultDescription),
      ctaLabel: str(item.ctaLabel) || undefined,
      ctaDestination: str(item.ctaDestination) || undefined,
      order: num(item.order, index + 1),
    };
  };

  const normalizeConfig = (c: unknown, fallback: PlacementConfig): PlacementConfig => {
    if (!c || typeof c !== "object") return fallback;
    const item = c as Record<string, unknown>;
    const rawQuestions = Array.isArray(item.questions) ? item.questions : fallback.questions;
    const questions = rawQuestions
      .map(normalizeQuestion)
      .filter((q): q is PlacementQuestion => q !== null);

    const rawRules = Array.isArray(item.rules) ? item.rules : fallback.rules;
    const rules = rawRules
      .map(normalizeRule)
      .filter((r): r is RecommendationRule => r !== null);

    return {
      id: str(item.id) || fallback.id,
      title: str(item.title) || fallback.title,
      introHeading: str(item.introHeading) || fallback.introHeading,
      description: str(item.description) || fallback.description,
      durationMinutes: num(item.durationMinutes, fallback.durationMinutes),
      status: item.status === "Draft" ? "Draft" : "Published",
      questions: questions.length > 0 ? questions : fallback.questions,
      rules: rules.length > 0 ? rules : fallback.rules,
      updatedAt: str(item.updatedAt) || new Date().toISOString(),
    };
  };

  const leads = Array.isArray(raw.leads)
    ? raw.leads.flatMap((lead, idx) => {
        if (!lead || typeof lead !== "object") return [];
        const item = lead as Record<string, unknown>;
        const rawLId = str(item.id).trim();
        const lId = rawLId && !leadIds.has(rawLId) ? rawLId : genId("lead");
        leadIds.add(lId);
        return [{
          id: lId,
          date: str(item.date) || new Date().toISOString().split("T")[0],
          name: str(item.name) || `Lead ${idx + 1}`,
          whatsapp: str(item.whatsapp),
          target: str(item.target) || "N4",
          score: num(item.score, 0),
          recommendedLevel: str(item.recommendedLevel) || "N4",
          status: item.status === "Sudah Dihubungi" ? "Sudah Dihubungi" : "Baru",
        } satisfies PlacementLead];
      })
    : initialPlacementStore.leads;

  const config = normalizeConfig(raw.config, initialPlacementStore.config);
  const publishedConfig = raw.publishedConfig
    ? normalizeConfig(raw.publishedConfig, { ...config, status: "Published" })
    : undefined;

  return {
    version: 1,
    config,
    publishedConfig,
    leads,
  };
}

export function loadPlacementStore(
  storage: Pick<Storage, "getItem" | "setItem"> | null = typeof window === "undefined" ? null : window.localStorage
): PlacementStoreData {
  if (!storage) return initialPlacementStore;
  try {
    const raw = storage.getItem(PLACEMENT_STORAGE_KEY);
    if (!raw) {
      storage.setItem(PLACEMENT_STORAGE_KEY, JSON.stringify(initialPlacementStore));
      return initialPlacementStore;
    }
    return normalizePlacementStore(JSON.parse(raw));
  } catch {
    return initialPlacementStore;
  }
}

export function savePlacementStore(
  data: PlacementStoreData,
  storage: Pick<Storage, "setItem"> | null = typeof window === "undefined" ? null : window.localStorage
): PlacementStoreData {
  const normalized = normalizePlacementStore(data);
  if (storage) {
    storage.setItem(PLACEMENT_STORAGE_KEY, JSON.stringify(normalized));
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PLACEMENT_CHANGE_EVENT));
  }
  return normalized;
}

let adminCachedRaw: string | null | undefined;
let adminCachedStore: PlacementStoreData | null = null;

function subscribePlacementAdmin(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === PLACEMENT_STORAGE_KEY) {
      adminCachedRaw = undefined;
      adminCachedStore = null;
      onStoreChange();
    }
  };
  const handleCustom = () => {
    adminCachedRaw = undefined;
    adminCachedStore = null;
    onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(PLACEMENT_CHANGE_EVENT, handleCustom);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(PLACEMENT_CHANGE_EVENT, handleCustom);
  };
}

function getPlacementAdminSnapshot(): PlacementStoreData {
  if (typeof window === "undefined") return initialPlacementStore;
  const raw = window.localStorage.getItem(PLACEMENT_STORAGE_KEY);
  if (raw !== adminCachedRaw || !adminCachedStore) {
    adminCachedRaw = raw;
    adminCachedStore = loadPlacementStore();
  }
  return adminCachedStore;
}

export function usePlacementAdminStore(): PlacementStoreData {
  return useSyncExternalStore(
    subscribePlacementAdmin,
    getPlacementAdminSnapshot,
    () => initialPlacementStore
  );
}
