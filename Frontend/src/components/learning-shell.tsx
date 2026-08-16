import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { StudentNavigation } from "@/components/student-navigation";
import type { Membership } from "@/lib/dashboard-mock";

export function LearningShell({ membership, level, current, children }: { membership: Membership; level: string; chapter: string; current: "overview" | "video" | "flashcards"; children: ReactNode }) {
  const query = `?membership=${membership}`;
  const journeyHref = `/journey/${level}${query}`;
  return (
    <div className="learning-shell student-shell">
      <StudentNavigation membership={membership} current="learning" />
      <div className="learning-main"><header className="learning-topbar"><Link href={journeyHref}>← Journey</Link><div><BrandLogo className="learning-mobile-brand" /><span className="journey-membership">{membership === "free" ? "Free" : membership === "lms" ? "LMS" : "Sensei"}</span></div></header><main className={current === "flashcards" ? "learning-content flashcard-page" : "learning-content"}>{children}</main></div>
    </div>
  );
}
