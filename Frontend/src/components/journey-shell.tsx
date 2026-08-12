import Link from "next/link";
import type { ReactNode } from "react";
import type { Membership } from "@/lib/dashboard-mock";

export function JourneyShell({ membership, current, children }: { membership: Membership; current: "levels" | "journey"; children: ReactNode }) {
  const query = `?membership=${membership}`;
  return (
    <div className="journey-shell">
      <aside className="journey-sidebar">
        <Link className="dash-brand" href="/"><span aria-hidden="true">日</span><strong>HIRU <b>Academy</b></strong></Link>
        <nav aria-label="Navigasi siswa"><Link href={`/dashboard${query}`}><span aria-hidden="true">⌂</span>Dashboard</Link><Link className="active" href={`/journey${query}`}><span aria-hidden="true">道</span>Journey</Link><span><i aria-hidden="true">冊</i>Perpustakaan</span><span><i aria-hidden="true">↗</i>Progres</span></nav>
        <div className="journey-side-bottom"><span>{membership === "free" ? "Free Member" : membership === "lms" ? "Belajar Mandiri" : "Belajar dengan Sensei"}</span><Link href={`/dashboard${query}`}>Kembali ke Dashboard</Link></div>
      </aside>
      <div className="journey-main"><header className="journey-topbar"><Link href={`/dashboard${query}`}>← Dashboard</Link><div><span className="journey-mobile-brand">HIRU Academy</span><span className="journey-membership">{membership === "free" ? "Free" : membership === "lms" ? "LMS" : "Sensei"}</span></div></header><main className="journey-content"><nav className="journey-breadcrumb" aria-label="Breadcrumb"><Link href={`/dashboard${query}`}>Dashboard</Link><span>/</span><Link href={`/journey${query}`}>Pilih Level</Link>{current === "journey" && <><span>/</span><b>Journey</b></>}</nav>{children}</main></div>
    </div>
  );
}
