import { Suspense } from "react";
import { AssessmentTypeSelector } from "@/components/assessment-builder";

export default function Page() {
  return (
    <Suspense fallback={<main className="admin-page"><span role="status">Memuat editor…</span></main>}>
      <AssessmentTypeSelector />
    </Suspense>
  );
}
