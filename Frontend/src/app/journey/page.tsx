import type { Metadata } from "next";
import { JourneyShell } from "@/components/journey-shell";
import { LevelSelection } from "@/components/level-selection";
import { parseMembership } from "@/lib/dashboard-mock";
import { getJourneyLevels } from "@/lib/journey-mock";

export const metadata: Metadata = { title: "Pilih Level", description: "Pilih perjalanan belajar HIRU Academy.", robots: { index: false, follow: false } };

export default async function LevelSelectionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const membership = parseMembership(typeof params.membership === "string" ? params.membership : undefined);
  return <JourneyShell membership={membership} current="levels"><LevelSelection membership={membership} levels={getJourneyLevels(membership)} /></JourneyShell>;
}
