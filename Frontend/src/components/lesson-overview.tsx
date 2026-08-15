"use client";
import Link from "next/link";
import { useState } from "react";
import type { getLearningData } from "@/lib/learning-mock";
type LearningData = ReturnType<typeof getLearningData>;
const stateLabels = { complete: "Selesai", current: "Sedang dibaca", available: "Tersedia", locked: "Terkunci" };
export function LessonOverview({ data }: { data: LearningData }) {
  const [active, setActive] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(data.activities.filter((activity) => activity.state === "complete").map((activity) => activity.key)));
  const query = `?membership=${data.membership}`;
  const checkpointOpen = data.activities.filter((activity) => activity.key !== "checkpoint").every((activity) => completed.has(activity.key));
  function finish() { if (active) setCompleted((current) => new Set(current).add(active)); }
  return <>
    <nav className="learning-breadcrumb" aria-label="Breadcrumb"><Link href={`/journey/${data.level.toLowerCase()}${query}`}>Journey</Link><span>/</span><b>{data.title}</b></nav>
    <header className="lesson-hero"><div><p className="dash-kicker">{data.level} · Chapter 1</p><h1>{data.title}</h1><p>{data.description}</p></div><div className="lesson-japanese"><ruby>一歩<rt>いっぽ</rt></ruby><span>ずつ</span><small>selangkah demi selangkah</small></div></header>
    <section className="japanese-modes"><article><span className="mode-label">Jepang Pemula</span><h2><ruby>日本語<rt>にほんご</rt></ruby>を <ruby>学<rt>まな</rt></ruby>びます。</h2><p>Belajar dengan bantuan furigana untuk mendukung proses membaca.</p></article><article><span className="mode-label professional">Jepang Profesional</span><h2>日本語を学びます。</h2><p>Presentasi tanpa bantuan baca untuk pengalaman yang lebih mandiri.</p></article></section>
    <section className="lesson-section-head"><div><p className="dash-kicker">Aktivitas chapter</p><h2>Lanjutkan</h2></div><span>Progress dari backend</span></section>
    <section className="lesson-activity-grid" aria-label="Aktivitas Chapter">{data.activities.map((activity, index) => { const locked = activity.state === "locked" && !(activity.key === "checkpoint" && checkpointOpen); const interactive = ["audio", "reading", "checkpoint", "grammar", "kanji"].includes(activity.key); const isDone = completed.has(activity.key); return <article className={`lesson-activity activity-${activity.state}`} key={activity.key}><div className="activity-order">0{index + 1}</div><span className="activity-icon" aria-hidden="true">{activity.icon}</span><div><span className="activity-state">{isDone ? "Selesai" : stateLabels[activity.state]}</span><h3>{activity.title}</h3><p>{activity.description}</p></div>{activity.key === "flashcards" ? <Link href={`/learn/${data.level.toLowerCase()}/${data.chapter}/flashcards${query}`}>Mulai Flashcard <span aria-hidden="true">→</span></Link> : locked ? <span className="activity-action">Terkunci</span> : interactive ? <button className="activity-action" type="button" onClick={() => setActive(activity.key)}>{isDone ? "Selesai" : "Mulai"}</button> : <span className="activity-action">{activity.state === "complete" ? "Ulas kembali" : "Lanjutkan"}</span>}</article>; })}</section>
    {active && <section className="lesson-practice" aria-live="polite"><p className="dash-kicker">{active === "audio" ? "Audio Question" : active === "reading" ? "Reading Question" : active === "checkpoint" ? "Chapter Checkpoint" : "Modul"}</p><h2>{active === "checkpoint" ? "Selesaikan seluruh aktivitas sebelum checkpoint" : "Pilih jawaban yang paling tepat"}</h2>{active === "grammar" || active === "kanji" ? <p>Materi tersedia untuk dibaca. Tandai aktivitas setelah memahami contoh utama.</p> : <fieldset><legend>Soal latihan</legend>{["A. Pilihan pertama", "B. Pilihan kedua", "C. Pilihan ketiga", "D. Pilihan keempat"].map((answer) => <label key={answer}><input type="radio" name={active} /> {answer}</label>)}</fieldset>}<button className="button button-primary" type="button" onClick={finish}>Tandai Selesai</button></section>}
  </>;
}
