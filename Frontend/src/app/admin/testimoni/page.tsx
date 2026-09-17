import { Suspense } from "react";
import { TestimonialStudio } from "@/components/website-content-studio";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat CMS Testimoni…</div>}>
      <TestimonialStudio />
    </Suspense>
  );
}
