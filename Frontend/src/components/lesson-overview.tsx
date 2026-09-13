import Link from "next/link";
import {
  LuBookMarked,
  LuBookOpen,
  LuFlag,
  LuLayers3,
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

export function LessonOverview({ data }: { data: LearningData }) {
  const checkpoint = data.activities.find((activity) => activity.key === "checkpoint");
  return (
    <>
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
                <div>
                  <h3>{activity.title}</h3>
                </div>
              </div>
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
            <p className="dash-kicker checkpoint-navy-kicker">TETAP SEMANGAT</p>
            <h2>Lanjutkan belajar dengan konsisten</h2>
            <p>Pelajari setiap aktivitas chapter sesuai ritmemu sebelum melanjutkan ke materi berikutnya.</p>
          </div>
        </section>
      )}
    </>
  );
}
