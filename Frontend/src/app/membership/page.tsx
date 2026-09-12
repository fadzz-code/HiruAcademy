import { Suspense } from "react";
import { SupportingRoute } from "@/components/supporting-route";

export default function MembershipPage() {
  return (
    <Suspense>
      <SupportingRoute kind="renewal" />
    </Suspense>
  );
}
