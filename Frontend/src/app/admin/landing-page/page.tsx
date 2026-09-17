import { Suspense } from "react";
import { LandingPageStudio } from "@/components/website-content-studio";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat CMS Landing Page…</div>}>
      <LandingPageStudio />
    </Suspense>
  );
}
