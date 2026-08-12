import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AskSenseiScreen } from "@/components/ask-sensei-screen";
import { SenseiShell } from "@/components/sensei-shell";
import { parseMembership } from "@/lib/dashboard-mock";
import { hasSenseiAccess } from "@/lib/sensei-mock";

export const metadata: Metadata = { title: "Tanya Sensei", robots: { index: false, follow: false } };

export default async function AskSenseiPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const membership = parseMembership(typeof query.membership === "string" ? query.membership : undefined);
  if (!hasSenseiAccess(membership)) redirect(`/dashboard?membership=${membership}`);
  return <SenseiShell current="ask-sensei"><AskSenseiScreen /></SenseiShell>;
}
