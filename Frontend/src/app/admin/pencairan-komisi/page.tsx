import { Suspense } from "react";
import { AffiliateOperations } from "@/components/business-operations";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Pencairan Komisi…</div>}>
      <AffiliateOperations initialTab="Pencairan" />
    </Suspense>
  );
}
