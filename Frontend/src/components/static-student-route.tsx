"use client";

import { useSearchParams } from "next/navigation";
import { AskSenseiScreen } from "@/components/ask-sensei-screen";
import { AssessmentRunner } from "@/components/assessment-runner";
import { ChapterJourney } from "@/components/chapter-journey";
import { FlashcardSession } from "@/components/flashcard-session";
import { JourneyShell } from "@/components/journey-shell";
import { LearningShell } from "@/components/learning-shell";
import { LessonOverview } from "@/components/lesson-overview";
import { LevelSelection } from "@/components/level-selection";
import { LockedTryout } from "@/components/locked-tryout";
import { MiniCheckpointScreen } from "@/components/mini-checkpoint-screen";
import { ReplayScreen, ScheduleScreen } from "@/components/sensei-screens";
import { SenseiShell } from "@/components/sensei-shell";
import { StudentDashboard } from "@/components/student-dashboard";
import { getTryoutConfig, hasTryoutAccess } from "@/lib/assessment-mock";
import { getDashboardData, parseMembership } from "@/lib/dashboard-mock";
import { findJourneyLevel, getJourneyChapters, getJourneyLevels, canAccessLearning } from "@/lib/journey-mock";
import { getLearningData } from "@/lib/learning-mock";
import { hasSenseiAccess } from "@/lib/sensei-mock";

type RouteKind = "dashboard" | "levels" | "journey" | "learning" | "flashcards" | "tryout" | "schedule" | "replay" | "ask" | "mini";

export function StaticStudentRoute({ kind, level, chapter }: { kind: RouteKind; level?: string; chapter?: string }) {
  const membership = parseMembership(useSearchParams().get("membership") ?? undefined);
  if (kind === "dashboard") return <StudentDashboard data={getDashboardData(membership)} previewEnabled={process.env.NODE_ENV !== "production"} />;
  if (kind === "levels") return <JourneyShell membership={membership} current="levels"><LevelSelection membership={membership} levels={getJourneyLevels(membership)} /></JourneyShell>;
  if (kind === "tryout") return hasTryoutAccess(membership) ? <AssessmentRunner config={getTryoutConfig()} membership={membership} /> : <LockedTryout />;
  if (kind === "schedule" || kind === "replay" || kind === "ask" || kind === "mini") {
    if (!hasSenseiAccess(membership)) return <StudentDashboard data={getDashboardData(membership)} previewEnabled={false} />;
    if (kind === "schedule") return <SenseiShell current="schedule"><ScheduleScreen /></SenseiShell>;
    if (kind === "replay") return <SenseiShell current="replay"><ReplayScreen /></SenseiShell>;
    if (kind === "ask") return <SenseiShell current="ask-sensei"><AskSenseiScreen /></SenseiShell>;
    return <SenseiShell current="mini-checkpoint"><MiniCheckpointScreen /></SenseiShell>;
  }
  if (!level) return null;
  const selectedLevel = findJourneyLevel(membership, level);
  if (kind === "journey") return selectedLevel ? <JourneyShell membership={membership} current="journey"><ChapterJourney membership={membership} level={selectedLevel} chapters={getJourneyChapters(membership, selectedLevel)} /></JourneyShell> : null;
  if (!chapter || !canAccessLearning(membership, level, chapter)) return <JourneyShell membership={membership} current="levels"><LevelSelection membership={membership} levels={getJourneyLevels(membership)} /></JourneyShell>;
  const data = getLearningData(membership, level, chapter);
  if (kind === "learning") return <LearningShell membership={membership} level={level} chapter={chapter} current="overview"><LessonOverview data={data} /></LearningShell>;
  return <LearningShell membership={membership} level={level} chapter={chapter} current="flashcards"><FlashcardSession cards={data.cards} membership={membership} level={level} chapter={chapter} /></LearningShell>;
}
