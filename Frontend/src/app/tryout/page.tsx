import type { Metadata } from "next";
import { AssessmentRunner } from "@/components/assessment-runner";
import { LockedTryout } from "@/components/locked-tryout";
import { getTryoutConfig, hasTryoutAccess } from "@/lib/assessment-mock";
import { parseMembership } from "@/lib/dashboard-mock";

export const metadata: Metadata = { title: "Try Out Preview", description: "Preview Try Out HIRU Academy.", robots: { index: false, follow: false } };

export default async function TryoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const membership = parseMembership(typeof query.membership === "string" ? query.membership : undefined);
  return hasTryoutAccess(membership) ? <AssessmentRunner config={getTryoutConfig()} membership={membership} /> : <LockedTryout />;
}
