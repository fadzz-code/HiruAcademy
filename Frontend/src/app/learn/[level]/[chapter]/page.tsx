import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningShell } from "@/components/learning-shell";
import { LessonOverview } from "@/components/lesson-overview";
import { parseMembership } from "@/lib/dashboard-mock";
import { canAccessLearning } from "@/lib/journey-mock";
import { getLearningData } from "@/lib/learning-mock";

export const metadata: Metadata = { title: "Learning Content", description: "Konten belajar HIRU Academy.", robots: { index: false, follow: false } };

export default async function LearningPage({ params, searchParams }: { params: Promise<{ level: string; chapter: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [route, query] = await Promise.all([params, searchParams]);
  const membership = parseMembership(typeof query.membership === "string" ? query.membership : undefined);
  if (!canAccessLearning(membership, route.level, route.chapter)) notFound();
  const data = getLearningData(membership, route.level, route.chapter);
  return <LearningShell membership={membership} level={route.level} chapter={route.chapter} current="overview"><LessonOverview data={data} /></LearningShell>;
}
