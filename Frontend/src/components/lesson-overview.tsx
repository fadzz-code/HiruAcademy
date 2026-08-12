import Link from "next/link";
import type { getLearningData } from "@/lib/learning-mock";

type LearningData = ReturnType<typeof getLearningData>;

const stateLabels = { complete: "Selesai", current: "Sedang dibaca", available: "Tersedia", locked: "Terkunci" };

export function LessonOverview({ data }: { data: LearningData }) {
  const query = `?membership=${data.membership}`;
  return (
    <>
      <nav className="learning-breadcrumb" aria-label="Breadcrumb"><Link href={`/journey/${data.level.toLowerCase()}${query}`}>Journey</Link><span>/</span><b>{data.title}</b></nav>
      <header className="lesson-hero"><div><p className="dash-kicker">{data.level} · Chapter contoh</p><h1>{data.title}</h1><p>{data.description}</p></div><div className="lesson-japanese"><ruby>一歩<rt>いっぽ</rt></ruby><span>ずつ</span><small>selangkah demi selangkah</small></div></header>

      <section className="japanese-modes"><article><span className="mode-label">Japanese Pemula</span><h2><ruby>日本語<rt>にほんご</rt></ruby>を <ruby>学<rt>まな</rt></ruby>びます。</h2><p>Belajar dengan bantuan furigana untuk mendukung proses membaca.</p></article><article><span className="mode-label professional">Japanese Profesional</span><h2>日本語を学びます。</h2><p>Presentasi tanpa bantuan baca untuk pengalaman yang lebih mandiri.</p></article></section>

      <section className="lesson-section-head"><div><p className="dash-kicker">Urutan aktivitas</p><h2>Lanjutkan Chapter ini</h2></div><span>Progress contoh, bukan bobot produksi</span></section>
      <section className="lesson-activity-grid" aria-label="Aktivitas Chapter">{data.activities.map((activity, index) => {
        const flashcard = activity.key === "flashcards" && activity.state !== "locked";
        return <article className={`lesson-activity activity-${activity.state}`} key={activity.key}><div className="activity-order">0{index + 1}</div><span className="activity-icon" aria-hidden="true">{activity.icon}</span><div><span className="activity-state">{stateLabels[activity.state]}</span><h3>{activity.title}</h3><p>{activity.description}</p></div>{flashcard ? <Link href={`/learn/${data.level.toLowerCase()}/${data.chapter}/flashcards${query}`}>Mulai Flashcard <span aria-hidden="true">→</span></Link> : <span className="activity-action">{activity.state === "locked" ? "Butuh akses" : activity.state === "complete" ? "Ulas kembali" : activity.state === "current" ? "Lanjutkan" : "Belum dibuka"}</span>}</article>;
      })}</section>
    </>
  );
}
