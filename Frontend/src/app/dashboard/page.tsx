import type { Metadata } from "next";
import { StudentDashboard } from "@/components/student-dashboard";
import { getDashboardData, parseMembership } from "@/lib/dashboard-mock";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard belajar HIRU Academy.", robots: { index: false, follow: false } };

export default async function DashboardPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const membership = parseMembership(typeof params.membership === "string" ? params.membership : undefined);
  return <StudentDashboard data={getDashboardData(membership)} previewEnabled={process.env.NODE_ENV !== "production"} />;
}
