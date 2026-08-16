import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Detail Kelas", robots: { index: false, follow: false } };

export default function ClassDetailPage() {
  return <Suspense><StaticStudentRoute kind="class-detail" /></Suspense>;
}
