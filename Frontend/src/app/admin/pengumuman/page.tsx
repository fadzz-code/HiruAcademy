import { Suspense } from "react";
import { AnnouncementStudio } from "@/components/website-content-studio";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat CMS Pengumuman…</div>}>
      <AnnouncementStudio />
    </Suspense>
  );
}
