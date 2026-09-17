import { Suspense } from "react";
import { PlacementBuilder } from "@/components/placement-builder";

export default function Page() {
  return (
    <Suspense fallback={<span role="status">Memuat placement…</span>}>
      <PlacementBuilder />
    </Suspense>
  );
}
