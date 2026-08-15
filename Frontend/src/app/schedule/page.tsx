import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Jadwal Kelas", robots: { index: false, follow: false } };

export default function SchedulePage() {
  return <Suspense><StaticStudentRoute kind="schedule" /></Suspense>;
}
