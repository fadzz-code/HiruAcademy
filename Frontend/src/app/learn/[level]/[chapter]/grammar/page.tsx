import type { Metadata } from "next";
import { Suspense } from "react";
import { StaticStudentRoute } from "@/components/static-student-route";

export const metadata: Metadata = { title: "Modul Tata Bahasa", description: "Modul Tata Bahasa HIRU Academy.", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return ["n5", "n4", "n3", "n2", "n1"].flatMap((level) => ["chapter-1", "chapter-2", "chapter-3", "chapter-4"].map((chapter) => ({ level, chapter })));
}

export default async function GrammarPage({ params }: { params: Promise<{ level: string; chapter: string }> }) {
  const { level, chapter } = await params;
  return <Suspense><StaticStudentRoute kind="grammar" level={level} chapter={chapter} /></Suspense>;
}
