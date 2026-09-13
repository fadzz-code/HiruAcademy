import Link from "next/link";
import type { ReactNode } from "react";
import { StudentNavigation } from "@/components/student-navigation";
import type { Membership } from "@/lib/dashboard-mock";

export function SenseiShell({ membership, current, children }: { membership: Membership; current: "schedule" | "replay" | "ask-sensei" | "mini-checkpoint" | "tryout"; children: ReactNode }) {
  return <div className="sensei-shell student-shell"><StudentNavigation membership={membership} current={current} /><div className="sensei-main"><header className="sensei-topbar"><Link href={`/dashboard?membership=${membership}`}>← Dashboard</Link><span>LMS + Sensei</span></header><main className="sensei-content">{children}</main></div></div>;
}
