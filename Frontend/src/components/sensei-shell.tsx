import Link from "next/link";
import type { ReactNode } from "react";
import { StudentNavigation } from "@/components/student-navigation";

export function SenseiShell({ current, children }: { current: "schedule" | "replay" | "ask-sensei" | "mini-checkpoint" | "tryout"; children: ReactNode }) {
  return <div className="sensei-shell student-shell"><StudentNavigation membership="sensei" current={current} /><div className="sensei-main"><header className="sensei-topbar"><Link href="/dashboard?membership=sensei">← Dashboard</Link><span>LMS + Sensei</span></header><main className="sensei-content">{children}</main></div></div>;
}
