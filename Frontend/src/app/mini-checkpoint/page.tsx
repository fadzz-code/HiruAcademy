import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Mini Checkpoint", robots: { index: false, follow: false } };

export default function MiniCheckpointPage() {
  return <Suspense><StaticStudentRoute kind="mini" /></Suspense>;
}
