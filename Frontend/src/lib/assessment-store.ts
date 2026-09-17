"use client";

import { useSyncExternalStore } from "react";
import { ASSESSMENT_CHANGE_EVENT, ASSESSMENT_STORAGE_KEY, getScoringKey, readAssessments, toLearnerAssessment, type Assessment } from "@/lib/admin-assessment-store";

export type PublishedAssessmentOption = { id: string; label: string };
export type PublishedAssessmentQuestion = { id: string; section: string; prompt: string; japanese?: { text: string; reading?: string }; options: PublishedAssessmentOption[]; explanation?: string };
export type PublishedAssessment = { id: string; type: "practice" | "tryout" | "mini-checkpoint" | "checkpoint"; title: string; level: string; category?: string; exercise?: number; session?: number; part?: number; durationMinutes?: number; maxScore?: number; sections?: string[]; questions: PublishedAssessmentQuestion[]; answerKey: Record<string, string> };

let cachedRaw: string | null | undefined;
let cachedRecords: PublishedAssessment[] = [];
const empty: PublishedAssessment[] = [];

function adapt(item: Assessment): PublishedAssessment {
  const learner = toLearnerAssessment(item);
  const sectionNames = Object.fromEntries(item.sections.map((section) => [section.id, section.name]));
  return { id: learner.id, type: learner.type === "mini" ? "mini-checkpoint" : learner.type, title: learner.title, level: learner.level, category: learner.category, exercise: learner.order, session: learner.session, part: learner.part, durationMinutes: learner.durationMinutes, maxScore: learner.sections.reduce((sum, section) => sum + (section.maxScore ?? 0), 0) || undefined, sections: learner.sections.map((section) => section.name), questions: learner.questions.map((question) => ({ id: question.id, section: question.sectionId ? sectionNames[question.sectionId] ?? "" : "", prompt: question.prompt, options: question.options.map((option) => ({ id: option.id, label: option.text })), explanation: question.explanation })), answerKey: getScoringKey(item) };
}

export function readPublishedAssessments(): PublishedAssessment[] {
  if (typeof window === "undefined") return empty;
  const raw = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
  if (raw !== cachedRaw) { cachedRaw = raw; cachedRecords = readAssessments().filter((item) => item.status === "Published").map(adapt); }
  return cachedRecords;
}

function subscribe(onStoreChange: () => void) {
  const storage = (event: StorageEvent) => { if (event.key === ASSESSMENT_STORAGE_KEY) { cachedRaw = undefined; onStoreChange(); } };
  const local = () => { cachedRaw = undefined; onStoreChange(); };
  window.addEventListener("storage", storage);
  window.addEventListener(ASSESSMENT_CHANGE_EVENT, local);
  return () => { window.removeEventListener("storage", storage); window.removeEventListener(ASSESSMENT_CHANGE_EVENT, local); };
}

export function usePublishedAssessments() { return useSyncExternalStore(subscribe, readPublishedAssessments, () => empty); }
