import Link from "next/link";
import type { JourneyChapter, JourneyLevel } from "@/lib/journey-mock";
import type { Membership } from "@/lib/dashboard-mock";

export function ChapterJourney({ membership, level, chapters }: { membership: Membership; level: JourneyLevel; chapters: JourneyChapter[] }) {
  if (membership !== "sensei") return <section className="chapter-list" aria-label={`Chapter ${level.title}`}>{chapters.map((chapter) => <article className={`chapter-card chapter-${chapter.state}`} key={chapter.key}><div className="chapter-marker"><span>{chapter.state === "completed" ? "✓" : chapter.state === "current" ? "日" : "⌑"}</span><i /></div><div className="chapter-copy"><div className="chapter-meta"><span>{chapter.statusLabel}</span><small>{chapter.orderLabel}</small></div><h2>{chapter.title}</h2><p>{chapter.description}</p></div><div className="chapter-action">{chapter.href ? <Link className="chapter-action-button" href={chapter.href}>{chapter.statusLabel}<b aria-hidden="true">→</b></Link> : <span>{chapter.statusLabel}</span>}</div></article>)}</section>;

  return (
    <>
      <header className="chapter-journey-head"><p className="dash-kicker">LEVEL AKTIF TERPILIH • CHAPTER JOURNEY</p><h1>Lanjutkan Chapter pada level dan cohort yang dipilih</h1><p>Nama level, Chapter, jadwal, dan progress dimuat berdasarkan level aktif yang dipilih.</p></header>
      <section className="chapter-progress-card"><div><p className="dash-kicker">PROGRES LEVEL TERPILIH</p><h2>Chapter 4 dari 12</h2><p>Progress, kelas Sensei, dan replay level lain tetap disimpan secara terpisah.</p></div><div className="journey-progress"><span>Progress dari backend</span><div><i /></div></div></section>
      <div className="chapter-journey-layout"><section className="chapter-list sensei-chapter-list" aria-label={`Chapter ${level.title}`}>{chapters.map((chapter) => <article className={`chapter-card chapter-${chapter.state}`} key={chapter.key}><span className="chapter-number">{chapter.orderLabel}</span><div className="chapter-copy"><h2>{chapter.title}</h2><p>{chapter.description}</p></div><div className="chapter-action">{chapter.href ? <Link className="chapter-action-button" href={chapter.href}>{chapter.statusLabel}<b aria-hidden="true">→</b></Link> : <span className={`chapter-status chapter-status-${chapter.state}`}>{chapter.state === "progressionLocked" && <i aria-hidden="true">⌑</i>}{chapter.statusLabel}</span>}</div></article>)}</section><aside className="chapter-milestone"><h2>Milestone berikutnya</h2><p>Selesaikan Chapter 4 untuk membuka materi berikutnya dan menjaga streak.</p><article><span aria-hidden="true">♨</span><div><small>XP Mingguan</small><strong>— XP</strong></div></article><Link href="/journey?membership=sensei">Kembali ke Level</Link></aside></div>
    </>
  );
}
