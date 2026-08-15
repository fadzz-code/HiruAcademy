import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Replay Kelas", robots: { index: false, follow: false } };

export default function ReplayPage() {
  return <Suspense><StaticStudentRoute kind="replay" /></Suspense>;
}
