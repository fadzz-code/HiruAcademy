"use client";

import { useSearchParams } from "next/navigation";
import { AskSenseiScreen } from "@/components/ask-sensei-screen";
import { AssessmentUnavailable } from "@/components/assessment-unavailable";
import { ChapterJourney } from "@/components/chapter-journey";
import { ChapterCheckpoint } from "@/components/chapter-checkpoint";
import { DocumentLesson } from "@/components/document-lesson";
import { FlashcardSession } from "@/components/flashcard-session";
import { JourneyShell } from "@/components/journey-shell";
import { LearningShell } from "@/components/learning-shell";
import { LessonOverview } from "@/components/lesson-overview";
import { LevelSelection } from "@/components/level-selection";
import { LearningQuestionActivity } from "@/components/learning-question-activity";
import { LockedTryout } from "@/components/locked-tryout";
import { MiniCheckpointScreen } from "@/components/mini-checkpoint-screen";
import { ClassDetailScreen, ReplayPlayerScreen, ReplayScreen, ScheduleScreen } from "@/components/sensei-screens";
import { SenseiShell } from "@/components/sensei-shell";
import { SenseiTryoutScreen } from "@/components/sensei-tryout-screen";
import { StudentDashboard } from "@/components/student-dashboard";
import { StudentNavigation } from "@/components/student-navigation";
import { VideoLesson } from "@/components/video-lesson";
import { hasTryoutAccess } from "@/lib/assessment-mock";
import { getDashboardData, parseMembership } from "@/lib/dashboard-mock";
import { findJourneyLevel, getJourneyChapters, getJourneyLevels, canAccessLearning } from "@/lib/journey-mock";
import { getLearningData } from "@/lib/learning-mock";
import { hasSenseiAccess } from "@/lib/sensei-mock";

type RouteKind = "dashboard" | "levels" | "journey" | "learning" | "video" | "grammar" | "kanji" | "flashcards" | "audio" | "reading" | "checkpoint" | "tryout" | "schedule" | "class-detail" | "replay" | "replay-player" | "ask" | "mini";

export function StaticStudentRoute({ kind, level, chapter }: { kind: RouteKind; level?: string; chapter?: string }) {
  const membership = parseMembership(useSearchParams().get("membership") ?? undefined);
  if (kind === "dashboard") return <StudentDashboard data={getDashboardData(membership)} previewEnabled={process.env.NODE_ENV !== "production"} />;
  if (kind === "levels") return <JourneyShell membership={membership} current="levels"><LevelSelection membership={membership} levels={getJourneyLevels(membership)} /></JourneyShell>;
  if (kind === "tryout") return membership === "sensei" ? <SenseiShell current="tryout"><SenseiTryoutScreen /></SenseiShell> : hasTryoutAccess(membership) ? <div className="supporting-shell student-shell"><StudentNavigation membership={membership} current="tryout" /><main className="supporting-main"><SenseiTryoutScreen membership={membership} /></main></div> : <LockedTryout />;
  if (kind === "schedule" || kind === "class-detail" || kind === "replay" || kind === "replay-player" || kind === "ask" || kind === "mini") {
    if (!hasSenseiAccess(membership)) return <div className="supporting-shell student-shell"><StudentNavigation membership={membership} current="supporting" /><main className="supporting-main"><AssessmentUnavailable eyebrow="AKSES BELAJAR DENGAN SENSEI" title="Fitur ini belum aktif pada membershipmu" description="Jadwal, replay, Tanya Sensei, dan Mini Checkpoint tersedia pada Belajar dengan Sensei." facts={["Entitlement membership", "Akses Sensei"]} primary={{ label: "Lihat Membership", href: `/renewal?membership=${membership}` }} secondary={{ label: "Kembali Dashboard", href: `/dashboard?membership=${membership}` }} /></main></div>;
    if (kind === "schedule") return <SenseiShell current="schedule"><ScheduleScreen /></SenseiShell>;
    if (kind === "class-detail") return <SenseiShell current="schedule"><ClassDetailScreen /></SenseiShell>;
    if (kind === "replay") return <SenseiShell current="replay"><ReplayScreen /></SenseiShell>;
    if (kind === "replay-player") return <SenseiShell current="replay"><ReplayPlayerScreen /></SenseiShell>;
    if (kind === "ask") return <SenseiShell current="ask-sensei"><AskSenseiScreen /></SenseiShell>;
    return <SenseiShell current="mini-checkpoint"><MiniCheckpointScreen /></SenseiShell>;
  }
  if (!level) return null;
  const selectedLevel = findJourneyLevel(membership, level);
  if (kind === "journey") return selectedLevel ? <JourneyShell membership={membership} current="journey"><ChapterJourney membership={membership} level={selectedLevel} chapters={getJourneyChapters(membership, selectedLevel)} /></JourneyShell> : null;
  if (!chapter || !canAccessLearning(membership, level, chapter)) return <JourneyShell membership={membership} current="levels"><LevelSelection membership={membership} levels={getJourneyLevels(membership)} /></JourneyShell>;
  const data = getLearningData(membership, level, chapter);
  if (kind === "learning") return <LearningShell membership={membership} level={level} chapter={chapter} current="overview"><LessonOverview data={data} /></LearningShell>;
  if (kind === "video") return <LearningShell membership={membership} level={level} chapter={chapter} current="video"><VideoLesson data={data} /></LearningShell>;
  if (kind === "grammar" || kind === "kanji") return <LearningShell membership={membership} level={level} chapter={chapter} current="document"><DocumentLesson data={data} kind={kind} /></LearningShell>;
  if (kind === "audio" || kind === "reading") return <LearningShell membership={membership} level={level} chapter={chapter} current={kind}><LearningQuestionActivity data={data} variant={kind} /></LearningShell>;
  if (kind === "checkpoint") {
    const checkpoint = data.activities.find((activity) => activity.key === "checkpoint");
    return <LearningShell membership={membership} level={level} chapter={chapter} current="reading">{checkpoint?.state === "lockedByProgress" ? <LessonOverview data={data} /> : <ChapterCheckpoint data={data} />}</LearningShell>;
  }
  return <LearningShell membership={membership} level={level} chapter={chapter} current="flashcards"><FlashcardSession cards={data.cards} membership={membership} level={level} chapter={chapter} /></LearningShell>;
}
