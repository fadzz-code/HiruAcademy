import { Suspense } from "react";
import { ProgramPricingBuilder } from "@/components/program-pricing-builder";

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-loading">Memuat Program &amp; Harga…</div>}>
      <ProgramPricingBuilder />
    </Suspense>
  );
}
