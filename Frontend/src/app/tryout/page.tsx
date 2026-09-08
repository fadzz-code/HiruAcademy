import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Try Out JLPT", description: "Simulasi Try Out resmi HIRU Academy.", robots: { index: false, follow: false } };

export default function TryoutPage() {
  return <Suspense><StaticStudentRoute kind="tryout" /></Suspense>;
}
