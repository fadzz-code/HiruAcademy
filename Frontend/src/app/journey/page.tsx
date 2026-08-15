import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Pilih Level", description: "Pilih perjalanan belajar HIRU Academy.", robots: { index: false, follow: false } };

export default function LevelSelectionPage() {
  return <Suspense><StaticStudentRoute kind="levels" /></Suspense>;
}
