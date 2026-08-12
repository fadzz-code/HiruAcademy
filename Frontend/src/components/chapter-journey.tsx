import Link from "next/link";
import type { JourneyChapter, JourneyLevel } from "@/lib/journey-mock";
import type { Membership } from "@/lib/dashboard-mock";

const activityGlyph: Record<string, string> = { Video: "▶", Modul: "本", Flashcard: "札", Audio: "音", Checkpoint: "旗", Reading: "読", Latihan: "練" };

export function ChapterJourney({ membership, level, chapters }: { membership: Membership; level: JourneyLevel; chapters: JourneyChapter[] }) {
  return (
    <>
      <header className="chapter-hero"><div><span className="chapter-level-code">{level.code}</span><p className="dash-kicker">Journey level</p><h1>{level.title}</h1><p>{level.description}</p></div><div className="chapter-summary"><span>Status perjalanan</span><strong>{level.statusLabel}</strong><small>Progress mock tidak memakai bobot produksi.</small></div></header>
      <div className="chapter-road" aria-hidden="true"><i className="done">✓</i><span /><i className="current">日</i><span /><i>次</i><span /><i>先</i></div>
      <section className="chapter-list" aria-label={`Chapter ${level.title}`}>{chapters.map((chapter) => {
        const locked = chapter.state === "locked";
        return <article className={`chapter-card chapter-${chapter.state}`} key={chapter.key}><div className="chapter-marker"><span>{chapter.state === "completed" ? "✓" : chapter.state === "current" ? "日" : locked ? "⌑" : "○"}</span><i /></div><div className="chapter-copy"><div className="chapter-meta"><span>{chapter.statusLabel}</span><small>{chapter.orderLabel}</small></div><h2>{chapter.title}</h2><p>{chapter.description}</p><ul aria-label="Aktivitas chapter">{chapter.activities.map((activity) => <li key={activity}><span aria-hidden="true">{activityGlyph[activity]}</span>{activity}</li>)}</ul></div><div className="chapter-action"><span>{chapter.progressLabel}</span>{locked ? <Link href={membership === "free" ? "/#program" : `/journey/${level.slug}?membership=${membership}`}>{membership === "free" ? "Lihat akses" : "Belum tersedia"}</Link> : <span className="chapter-action-button">{chapter.state === "completed" ? "Ulas Chapter" : chapter.state === "current" ? "Lanjutkan" : "Mulai"}<b aria-hidden="true">→</b></span>}</div></article>;
      })}</section>
    </>
  );
}
