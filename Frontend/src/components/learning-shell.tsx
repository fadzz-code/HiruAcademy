import Link from "next/link";
import type { ReactNode } from "react";
import type { Membership } from "@/lib/dashboard-mock";

export function LearningShell({ membership, level, chapter, current, children }: { membership: Membership; level: string; chapter: string; current: "overview" | "flashcards"; children: ReactNode }) {
  const query = `?membership=${membership}`;
  const journeyHref = `/journey/${level}${query}`;
  return (
    <div className="learning-shell">
      <aside className="learning-sidebar">
        <Link className="dash-brand" href="/"><span aria-hidden="true">日</span><strong>HIRU <b>Academy</b></strong></Link>
        <div className="learning-context"><span>{level.toUpperCase()}</span><strong>Chapter 01</strong><small>Konten pembelajaran</small></div>
        <nav aria-label="Navigasi aktivitas"><Link className={current === "overview" ? "active" : ""} href={`/learn/${level}/${chapter}${query}`}><span aria-hidden="true">本</span>Ringkasan</Link><Link className={current === "flashcards" ? "active" : ""} href={`/learn/${level}/${chapter}/flashcards${query}`}><span aria-hidden="true">札</span>Flashcard</Link><span><i aria-hidden="true">音</i>Audio</span><span><i aria-hidden="true">旗</i>Checkpoint</span></nav>
        <div className="learning-side-bottom"><Link href={journeyHref}>← Kembali ke Journey</Link><span>{membership === "free" ? "Free Member" : membership === "lms" ? "Belajar Mandiri" : "Belajar dengan Sensei"}</span></div>
      </aside>
      <div className="learning-main"><header className="learning-topbar"><Link href={journeyHref}>← Journey</Link><div><span className="learning-mobile-brand">HIRU Academy</span><span className="journey-membership">{membership === "free" ? "Free" : membership === "lms" ? "LMS" : "Sensei"}</span></div></header><main className={current === "flashcards" ? "learning-content flashcard-page" : "learning-content"}>{children}</main></div>
    </div>
  );
}
