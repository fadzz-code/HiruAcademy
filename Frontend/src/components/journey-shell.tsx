import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { StudentBreadcrumb, type StudentBreadcrumbItem } from "@/components/student-breadcrumb";
import { StudentNavigation } from "@/components/student-navigation";
import type { Membership } from "@/lib/dashboard-mock";

export function JourneyShell({ membership, breadcrumbs, children }: { membership: Membership; breadcrumbs?: StudentBreadcrumbItem[]; children: ReactNode }) {
  const query = `?membership=${membership}`;
  return (
    <div className="journey-shell student-shell">
      <StudentNavigation membership={membership} />
      <div className="journey-main"><header className="journey-topbar"><Link href={`/dashboard${query}`}>← Dashboard</Link><div><BrandLogo className="journey-mobile-brand" /><span className="journey-membership">{membership === "free" ? "Free" : membership === "lms" ? "LMS" : "Sensei"}</span></div></header><main className="journey-content">{breadcrumbs && <StudentBreadcrumb items={breadcrumbs} />}{children}</main></div>
    </div>
  );
}
