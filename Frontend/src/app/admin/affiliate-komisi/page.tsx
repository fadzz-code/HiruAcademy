import { Suspense } from "react";
import { AffiliateOperations } from "@/components/business-operations";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Affiliate &amp; Komisi…</div>}>
      <AffiliateOperations initialTab="Affiliate" />
    </Suspense>
  );
}
