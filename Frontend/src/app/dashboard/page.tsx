import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard belajar HIRU Academy.", robots: { index: false, follow: false } };

export default function DashboardPage() {
  return <Suspense><StaticStudentRoute kind="dashboard" /></Suspense>;
}
