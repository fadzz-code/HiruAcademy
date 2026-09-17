import { Suspense } from "react";
import { AdminSettingsWorkspace } from "@/components/admin-settings-workspace";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Pengaturan &amp; Integrasi…</div>}>
      <AdminSettingsWorkspace />
    </Suspense>
  );
}
