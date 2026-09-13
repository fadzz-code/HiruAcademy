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
  const isDuplicateTitle = data.chapterTitle.toUpperCase() === (data.level + " • CHAPTER " + data.chapterNumber).toUpperCase();

  return (
    <>
      <header className="learning-page-head">
        {!isDuplicateTitle && <p className="dash-kicker">{data.level} • CHAPTER {data.chapterNumber}</p>}
        <h1>{data.chapterTitle}</h1>
        <p>{data.overviewDescription}</p>
      </header>

      <section className="learning-progress-card">
        <div>
          <p className="dash-kicker">CHAPTER PROGRESS</p>
          <h2>2 dari {data.activities.length} aktivitas selesai</h2>
        </div>
        <div className="dash-progress-ring" style={{ position: "relative", width: "48px", height: "48px" }}>
          <svg viewBox="0 0 36 36" className="dash-ring-svg">
            <path
              className="dash-ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="dash-ring-fill"
              strokeDasharray="28, 100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="dash-ring-value" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
            <strong>28%</strong>
          </div>
        </div>
      </section>

      <section className="learning-section-head">
        <h2>Aktivitas chapter</h2>
      </section>

      <section className="learning-activity-grid" aria-label="Aktivitas chapter">
        {data.activities
          .filter((activity) => activity.key !== "checkpoint")
          .map((activity) => (
            <article className={"learning-activity-card activity-" + activity.state} key={activity.key}>
              <div className="learning-activity-top">
                <span className="learning-activity-icon" aria-hidden="true">
                  {getActivityIcon(activity.key)}
                </span>
                {activity.statusLabel && (
                  <span className={"learning-activity-status " + getStatusClass(activity.statusLabel)}>
                    {activity.statusLabel}
                  </span>
                )}
              </div>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              {activity.href ? (
                <Link className="activity-action-button" href={activity.href} style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  {activity.key === "video" ? "Lanjutkan" : "Buka"}
                </Link>
              ) : (
                <span className="learning-activity-unavailable" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Belum tersedia</span>
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
