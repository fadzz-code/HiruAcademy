import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Pemutar Replay", robots: { index: false, follow: false } };

export default function ReplayPlayerPage() {
  return <Suspense><StaticStudentRoute kind="replay-player" /></Suspense>;
}
