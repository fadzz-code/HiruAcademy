import { Suspense } from "react";
import { SupportingRoute } from "@/components/supporting-route";

export default function RenewalMembershipPage() {
  return (
    <Suspense>
      <SupportingRoute kind="renewal" breadcrumbCurrent="Detail Membership" />
    </Suspense>
  );
}
