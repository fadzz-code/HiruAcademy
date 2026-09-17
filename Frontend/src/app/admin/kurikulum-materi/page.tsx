import { Suspense } from "react";
import { CurriculumBuilder } from "@/components/curriculum-builder";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Kurikulum &amp; Materi…</div>}>
      <CurriculumBuilder />
    </Suspense>
  );
}
