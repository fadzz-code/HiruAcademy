"use client";

import Link from "next/link";
import { useState } from "react";
import type { LearningData } from "@/lib/learning-mock";

export function VideoLesson({ data }: { data: LearningData }) {
  const [completed, setCompleted] = useState(false);
  const [tab, setTab] = useState<"summary" | "transcript" | "notes">("summary");
  const query = `?membership=${data.membership}`;
  return <>
    <header className="learning-page-head"><p className="dash-kicker">{data.level} • CHAPTER {data.chapterNumber} • VIDEO</p><h1>{data.videoTitle}</h1><p>Tonton video, tandai selesai, lalu lanjutkan ke modul berikutnya.</p></header>
    <div className="video-learning-layout"><div className="video-learning-main"><section className="video-card"><div className="video-surface"><span aria-hidden="true">▶</span><strong>Mulai video</strong><small>YouTube • lazy-loaded</small></div><p>Durasi dan sumber video mengikuti konfigurasi konten.</p>{completed ? <Link className="button button-primary" href={`/learn/${data.levelSlug}/${data.chapterSlug}/grammar${query}`}>Lanjut Modul Tata Bahasa</Link> : <button type="button" onClick={() => setCompleted(true)}>Tandai Selesai</button>}</section><div className="video-tabs" role="tablist" aria-label="Materi video"><button type="button" role="tab" aria-selected={tab === "summary"} onClick={() => setTab("summary")}>Ringkasan</button><button type="button" role="tab" aria-selected={tab === "transcript"} onClick={() => setTab("transcript")}>Transkrip</button><button type="button" role="tab" aria-selected={tab === "notes"} onClick={() => setTab("notes")}>Catatan</button></div>{tab === "summary" ? <section className="video-summary"><h2>Ringkasan materi</h2><p>Video membahas pola kalimat yang digunakan untuk menjelaskan rutinitas, kebiasaan, dan aktivitas sehari-hari. Gunakan transkrip dan catatan untuk meninjau kembali contoh penting.</p><div>{[["時", "Waktu"], ["習", "Kebiasaan"], ["動", "Aktivitas"]].map(([glyph, label]) => <article key={label}><span aria-hidden="true">{glyph}</span><strong>{label}</strong></article>)}</div></section> : <section className="video-empty-tab"><h2>{tab === "transcript" ? "Transkrip" : "Catatan"}</h2><p>Konten mengikuti konfigurasi materi.</p></section>}</div><aside className="video-chapter-rail"><h2>Isi Chapter {data.chapterNumber}</h2><ol>{data.activities.map((activity) => <li className={activity.key === "video" ? "active" : ""} key={activity.key}><span>{activity.order}</span><strong>{activity.railTitle}</strong></li>)}</ol><div className="journey-progress"><span>Progress dari backend</span><div><i /></div></div><Link href={`/learn/${data.levelSlug}/${data.chapterSlug}${query}`}>Kembali ke Chapter</Link></aside></div>
  </>;
}
