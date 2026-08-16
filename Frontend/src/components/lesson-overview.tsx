import Link from "next/link";
import type { LearningData } from "@/lib/learning-mock";

export function LessonOverview({ data }: { data: LearningData }) {
  const query = `?membership=${data.membership}`;
  return <>
    <header className="learning-page-head"><p className="dash-kicker">{data.level} • CHAPTER {data.chapterNumber}</p><h1>{data.chapterTitle}</h1><p>{data.overviewDescription}</p></header>
    <section className="learning-progress-card"><div><p className="dash-kicker">CHAPTER PROGRESS</p><h2>2 dari 7 aktivitas selesai</h2><p>Lanjutkan video, dua modul, flashcard, audio, reading, lalu checkpoint.</p></div><div className="journey-progress"><span>Progress dari backend</span><div><i /></div></div></section>
    <section className="learning-section-head"><h2>Aktivitas chapter</h2><span>Lanjutkan</span></section>
    <section className="learning-activity-grid" aria-label="Aktivitas chapter">{data.activities.filter((activity) => activity.key !== "checkpoint").map((activity) => <article className={`learning-activity-card activity-${activity.state}`} key={activity.key}><div className="learning-activity-top"><span className="learning-activity-icon" aria-hidden="true">{activity.icon}</span>{activity.statusLabel && <span className="learning-activity-status">{activity.statusLabel}</span>}</div><h3>{activity.title}</h3><p>{activity.description}</p>{activity.href ? <Link href={activity.href}>{activity.key === "video" ? "Lanjutkan" : "Buka"}<span aria-hidden="true">→</span></Link> : <span className="learning-activity-unavailable">Belum tersedia</span>}</article>)}</section>
    <section className="learning-checkpoint"><div><p className="dash-kicker">CHECKPOINT TERKUNCI</p><h2>Selesaikan seluruh aktivitas sebelum checkpoint</h2><p>Status akan berubah otomatis setelah persyaratan chapter terpenuhi.</p></div><span><i aria-hidden="true">⌑</i>Terkunci</span></section>
    <Link className="learning-back-button" href={`/journey/${data.levelSlug}${query}`}>← Kembali ke Journey</Link>
  </>;
}
