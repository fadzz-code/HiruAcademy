import { Suspense } from "react";
import { BlogSeoStudio } from "@/components/website-content-studio";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat CMS Blog &amp; SEO…</div>}>
      <BlogSeoStudio />
    </Suspense>
  );
}
