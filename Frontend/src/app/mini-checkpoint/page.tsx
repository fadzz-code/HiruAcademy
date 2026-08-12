import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MiniCheckpointScreen } from "@/components/mini-checkpoint-screen";
import { SenseiShell } from "@/components/sensei-shell";
import { parseMembership } from "@/lib/dashboard-mock";
import { hasSenseiAccess } from "@/lib/sensei-mock";

export const metadata: Metadata = { title: "Mini Checkpoint", robots: { index: false, follow: false } };

export default async function MiniCheckpointPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const membership = parseMembership(typeof query.membership === "string" ? query.membership : undefined);
  if (!hasSenseiAccess(membership)) redirect(`/dashboard?membership=${membership}`);
  return <SenseiShell current="mini-checkpoint"><MiniCheckpointScreen /></SenseiShell>;
}
