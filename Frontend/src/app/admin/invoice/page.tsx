import { Suspense } from "react";
import { InvoiceOperations } from "@/components/business-operations";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Invoice…</div>}>
      <InvoiceOperations />
    </Suspense>
  );
}
