import type { Metadata } from "next";
import { ChapterJourney } from "@/components/chapter-journey";
import { JourneyShell } from "@/components/journey-shell";
import { parseMembership } from "@/lib/dashboard-mock";
import { findJourneyLevel, getJourneyChapters } from "@/lib/journey-mock";

export const metadata: Metadata = { title: "Learning Journey", description: "Chapter perjalanan belajar HIRU Academy.", robots: { index: false, follow: false } };

export default async function JourneyPage({ params, searchParams }: { params: Promise<{ level: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [route, query] = await Promise.all([params, searchParams]);
  const membership = parseMembership(typeof query.membership === "string" ? query.membership : undefined);
  const level = findJourneyLevel(membership, route.level);
  return <JourneyShell membership={membership} current="journey"><ChapterJourney membership={membership} level={level} chapters={getJourneyChapters(membership, level)} /></JourneyShell>;
}
