import { Suspense } from "react";
import { UserMembershipOperations } from "@/components/business-operations";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Pengguna &amp; Akses…</div>}>
      <UserMembershipOperations />
    </Suspense>
  );
}
