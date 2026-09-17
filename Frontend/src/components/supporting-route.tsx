"use client";
import { useSearchParams } from "next/navigation";
import { SupportingScreen } from "@/components/supporting-screen";
import type { SupportingKind } from "@/lib/supporting-mock";
import { getEffectiveMembership } from "@/lib/business-store";

export function SupportingRoute({ kind, breadcrumbCurrent }: { kind: SupportingKind; breadcrumbCurrent?: string }) {
  const rawMembership = useSearchParams().get("membership");
  const membership = getEffectiveMembership(rawMembership ?? undefined);
  return <SupportingScreen kind={kind} membership={membership} breadcrumbCurrent={breadcrumbCurrent} />;
}
