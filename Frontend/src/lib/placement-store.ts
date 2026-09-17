"use client";

import { useSyncExternalStore } from "react";
import {
  PLACEMENT_CHANGE_EVENT,
  PLACEMENT_STORAGE_KEY,
  initialPlacementStore,
  loadPlacementStore,
  savePlacementStore,
  type PlacementConfig,
  type PlacementLead,
  type PlacementOption,
  type PlacementQuestion,
  type RecommendationRule,
} from "@/lib/admin-placement-store";

export type PublishedPlacementOption = PlacementOption;

export type PublishedPlacementQuestion = PlacementQuestion;

export type PublishedPlacementConfig = PlacementConfig;

export type PublishedPlacementResultArea = {
  name: string;
  score: number;
  correct: number;
  total: number;
};

export type CustomPlacementResult = {
  correctAnswers: number;
  correctCount: number;
  totalQuestions: number;
  score: number;
  areas: PublishedPlacementResultArea[];
  matchingRule?: RecommendationRule;
  recommendedLevel: string;
};

export type PublishedPlacement = {
  config: PublishedPlacementConfig;
  leads: PlacementLead[];
};

function toPublishedConfig(config: PlacementConfig): PublishedPlacementConfig {
  return config;
}

const initialPublishedSnapshot: PublishedPlacement = {
  config: toPublishedConfig(initialPlacementStore.publishedConfig ?? initialPlacementStore.config),
  leads: initialPlacementStore.leads,
};

let cachedPublishedRaw: string | null | undefined;
let cachedPublishedSnapshot: PublishedPlacement | null = null;

export function readPublishedPlacement(): PublishedPlacement {
  if (typeof window === "undefined") {
    return initialPublishedSnapshot;
  }
  const raw = window.localStorage.getItem(PLACEMENT_STORAGE_KEY);
  if (raw !== cachedPublishedRaw || !cachedPublishedSnapshot) {
    cachedPublishedRaw = raw;
    const store = loadPlacementStore();
    cachedPublishedSnapshot = {
      config: toPublishedConfig(store.publishedConfig ?? store.config),
      leads: store.leads,
    };
  }
  return cachedPublishedSnapshot;
}

function subscribePublishedPlacement(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === PLACEMENT_STORAGE_KEY) {
      cachedPublishedRaw = undefined;
      cachedPublishedSnapshot = null;
      onStoreChange();
    }
  };
  const handleCustom = () => {
    cachedPublishedRaw = undefined;
    cachedPublishedSnapshot = null;
    onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(PLACEMENT_CHANGE_EVENT, handleCustom);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(PLACEMENT_CHANGE_EVENT, handleCustom);
  };
}

export function usePublishedPlacement(): PublishedPlacement {
  return useSyncExternalStore(
    subscribePublishedPlacement,
    readPublishedPlacement,
    () => initialPublishedSnapshot
  );
}

export function recordPlacementAttempt(attempt: {
  name: string;
  whatsapp: string;
  target: string;
  score: number;
  recommendedLevel: string;
}): PlacementLead {
  const store = loadPlacementStore();
  const date = new Date().toISOString().split("T")[0];
  const newLead: PlacementLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date,
    name: attempt.name,
    whatsapp: attempt.whatsapp,
    target: attempt.target,
    score: attempt.score,
    recommendedLevel: attempt.recommendedLevel,
    status: "Baru",
  };
  savePlacementStore({
    ...store,
    leads: [newLead, ...store.leads],
  });
  return newLead;
}

export function calculateCustomPlacementResult(
  answers: Record<number, string>,
  questions: PlacementQuestion[],
  rules: RecommendationRule[]
): CustomPlacementResult {
  const areaOrder: string[] = ["Bunpou", "Moji・Goi", "Dokkai", "Choukai"];
  const areaMap = new Map<string, { total: number; correct: number }>();

  let correctCount = 0;
  const totalQuestions = questions.length;

  for (const q of questions) {
    const area = q.area.trim() || "Umum";
    const existing = areaMap.get(area) ?? { total: 0, correct: 0 };
    existing.total += 1;

    const answer = answers[q.number];
    const correctOpt = q.options.find((opt) => opt.isCorrect);
    const isCorrect = Boolean(
      correctOpt &&
        answer !== undefined &&
        (answer === correctOpt.id || answer.trim() === correctOpt.text.trim())
    );

    if (isCorrect) {
      existing.correct += 1;
      correctCount += 1;
    }

    areaMap.set(area, existing);
  }

  const sortedAreas = Array.from(areaMap.entries()).sort(([a], [b]) => {
    const ai = areaOrder.indexOf(a);
    const bi = areaOrder.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  const areas: PublishedPlacementResultArea[] = sortedAreas.map(([name, stat]) => ({
    name,
    score: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
    correct: stat.correct,
    total: stat.total,
  }));

  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const sortedRules = [...rules].sort((a, b) => a.order - b.order);
  const matchingRule = sortedRules.find((rule) => score >= rule.minScore && score <= rule.maxScore);
  const recommendedLevel = matchingRule?.recommendedProgramCode || "N5";

  return {
    correctAnswers: correctCount,
    correctCount,
    totalQuestions,
    score,
    areas,
    matchingRule,
    recommendedLevel,
  };
}
