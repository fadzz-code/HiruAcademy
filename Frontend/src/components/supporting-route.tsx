"use client";
import { useSearchParams } from "next/navigation";
import { SupportingScreen } from "@/components/supporting-screen";
import type { SupportingKind } from "@/lib/supporting-mock";
export function SupportingRoute({ kind, breadcrumbCurrent }: { kind: SupportingKind; breadcrumbCurrent?: string }) { const membership = useSearchParams().get("membership"); return <SupportingScreen kind={kind} membership={membership === "lms" || membership === "sensei" ? membership : "free"} breadcrumbCurrent={breadcrumbCurrent} />; }
