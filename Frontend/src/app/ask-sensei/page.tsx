import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Tanya Sensei", robots: { index: false, follow: false } };

export default function AskSenseiPage() {
  return <Suspense><StaticStudentRoute kind="ask" /></Suspense>;
}
