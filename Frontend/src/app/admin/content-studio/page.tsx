import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";

const groups = [
  {
    title: "Public Website",
    links: [
      ["Landing Page", "/admin/landing-page"],
      ["Blog", "/admin/blog"],
    ],
  },
  {
    title: "Student Experience",
    links: [
      ["Dashboards", "/admin/content-studio/dashboards"],
      ["Levels", "/admin/content-studio/levels"],
    ],
  },
  {
    title: "Learning Content",
    links: [
      ["Lessons", "/admin/content-studio/lessons"],
      ["Flashcards", "/admin/content-studio/flashcards"],
      ["Chapter Builder", "/admin/program/n4/chapters"],
    ],
  },
  {
    title: "Assessment",
    links: [
      ["Quiz Builder", "/admin/program/n4/chapters/chapter-4/quiz"],
      ["Try Out Builder", "/admin/program/n4/tryout"],
      ["Placement", "/admin/placement"],
      ["Mini Checkpoint", "/admin/mini-checkpoint"],
    ],
  },
  {
    title: "People & Social Proof",
    links: [
      ["Sensei", "/admin/sensei"],
      ["Testimonials", "/admin/testimonials"],
    ],
  },
  {
    title: "Media",
    links: [["Content Library", "/admin/content-library"]],
  },
  {
    title: "Existing Management",
    links: [
      ["Program", "/admin/program"],
      ["Settings", "/admin/settings"],
      ["Announcements", "/admin/announcements"],
      ["Cohorts", "/admin/cohorts"],
    ],
  },
] as const;

export default function ContentStudioPage() {
  return (
    <AdminShell current="content-studio">
      <main className="admin-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • CONTENT STUDIO</p>
            <h1>Content Studio</h1>
            <p>Pilih workspace untuk mengelola pengalaman, materi, media, dan konten HIRU Academy.</p>
          </div>
        </header>

        <section className="admin-kpi-grid" aria-label="Status workspace">
          <article className="admin-kpi-card">
            <h2>Status penyimpanan</h2>
            <strong>Frontend only</strong>
            <small>Perubahan editor frontend belum dipersist ke server.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Workspace</h2>
            <strong>{groups.length}</strong>
            <small>Area pengelolaan konten dan pengalaman.</small>
          </article>
        </section>

        {groups.map((group) => (
          <section className="admin-section" key={group.title}>
            <h2>{group.title}</h2>
            <div className="admin-quick-actions">
              {group.links.map(([label, href]) => (
                <article className="admin-action-card" key={href}>
                  <h3>{label}</h3>
                  <Link className="button button-dark" href={href}>Buka workspace</Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </AdminShell>
  );
}
