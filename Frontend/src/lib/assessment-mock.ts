import type { Membership } from "@/lib/dashboard-mock";

export type AssessmentType = "checkpoint" | "tryout" | "mini-checkpoint";
export type AssessmentOption = { id: string; label: string };
export type AssessmentQuestion = { id: string; section: string; prompt: string; japanese?: { text: string; reading?: string }; options: AssessmentOption[]; correctOptionId: string; explanation: string };
export type AssessmentConfig = { type: AssessmentType; title: string; context: string; timerEnabled: boolean; timerLabel: string; reviewEnabled: boolean; sampleLabel: string; questions: AssessmentQuestion[]; completionLabel?: string; submitLabel?: string; returnHref?: string; passingScore?: number };

export function hasTryoutAccess(membership: Membership) {
  return membership === "lms" || membership === "sensei";
}
