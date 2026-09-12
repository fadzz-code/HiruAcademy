import Link from "next/link";
import {
  LuArrowRight,
  LuBookMarked,
  LuBookOpen,
  LuFlag,
  LuLayers3,
  LuLock,
  LuPenTool,
  LuPlay,
  LuVolume2,
} from "react-icons/lu";
import type { LearningData } from "@/lib/learning-mock";

function getActivityIcon(key: string) {
  switch (key) {
    case "video":
      return <LuPlay aria-hidden="true" />;
    case "grammar":
      return <LuBookOpen aria-hidden="true" />;
    case "kanji":
      return <LuPenTool aria-hidden="true" />;
    case "flashcards":
      return <LuLayers3 aria-hidden="true" />;
    case "audio":
      return <LuVolume2 aria-hidden="true" />;
    case "reading":
      return <LuBookMarked aria-hidden="true" />;
    default:
      return <LuFlag aria-hidden="true" />;
  }
}

function getStatusClass(statusLabel?: string) {
  if (!statusLabel) return "";
  const lower = statusLabel.toLowerCase();
  if (lower.includes("belum") || lower.includes("terkunci")) return "status-gray";
  if (lower.includes("selesai")) return "status-green";
  if (lower.includes("tersedia") || lower.includes("lanjutkan")) return "status-orange";
  return "";
}

export function LessonOverview({ data }: { data: LearningData }) {
  const query = `?membership=${data.membership}`;
  const checkpoint = data.activities.find((activity) => activity.key === "checkpoint");

  return (
    <>
      <Link className="learning-back-button learning-top-back" href={`/journey/${data.levelSlug}${query}`}>
        ← Kembali ke Journey
      </Link>

      <header className="learning-page-head">
        <p className="dash-kicker">{data.level} • CHAPTER {data.chapterNumber}</p>
        <h1>{data.chapterTitle}</h1>
        <p>{data.overviewDescription}</p>
      </header>

      <section className="learning-progress-card">
        <div>
          <p className="dash-kicker">CHAPTER PROGRESS</p>
          <h2>2 dari 7 aktivitas selesai</h2>
          <p>Lanjutkan video, dua modul, flashcard, audio, reading, lalu checkpoint.</p>
        </div>
        <div className="journey-progress">
          <span>Progress tersimpan</span>
          <div>
            <i />
          </div>
        </div>
      </section>

      <section className="learning-section-head">
        <h2>Aktivitas chapter</h2>
        <span>Lanjutkan</span>
      </section>

      <section className="learning-activity-grid" aria-label="Aktivitas chapter">
        {data.activities
          .filter((activity) => activity.key !== "checkpoint")
          .map((activity) => (
            <article className={`learning-activity-card activity-${activity.state}`} key={activity.key}>
              <div className="learning-activity-top">
                <span className="learning-activity-icon" aria-hidden="true">
                  {getActivityIcon(activity.key)}
                </span>
                {activity.statusLabel && (
                  <span className={`learning-activity-status ${getStatusClass(activity.statusLabel)}`}>
                    {activity.statusLabel}
                  </span>
                )}
              </div>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              {activity.href ? (
                <Link className="activity-action-button" href={activity.href}>
                  {activity.key === "video" ? "Lanjutkan" : "Buka"}
                  <LuArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <span className="learning-activity-unavailable">Belum tersedia</span>
              )}
            </article>
          ))}
      </section>

      {checkpoint?.href ? (
        <section className="learning-checkpoint learning-checkpoint-navy">
          <div>
            <p className="dash-kicker checkpoint-navy-kicker">CHECKPOINT TERSEDIA</p>
            <h2>Uji pemahaman Chapter {data.chapterNumber}</h2>
            <p>Uji pemahaman materi chapter sebelum melanjutkan ke materi berikutnya.</p>
          </div>
          <Link className="button button-primary" href={checkpoint.href}>
            Mulai Checkpoint
          </Link>
        </section>
      ) : (
        <section className="learning-checkpoint learning-checkpoint-navy">
          <div>
            <p className="dash-kicker checkpoint-navy-kicker">CHECKPOINT TERKUNCI</p>
            <h2>Selesaikan seluruh aktivitas sebelum checkpoint</h2>
            <p>Status akan berubah otomatis setelah persyaratan chapter terpenuhi.</p>
          </div>
          <span className="checkpoint-lock-pill">
            <LuLock aria-hidden="true" /> Terkunci
          </span>
        </section>
      )}
    </>
  );
}

