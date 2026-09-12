import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import {
  LuBell,
  LuBookOpen,
  LuCalendar,
  LuCompass,
  LuFileText,
  LuFlag,
  LuFolderTree,
  LuGlobe,
  LuGraduationCap,
  LuCircleHelp,
  LuLayers,
  LuLayoutDashboard,
  LuLibrary,
  LuMessageSquare,
  LuSettings,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";

const groups = [
  {
    title: "Public Website",
    links: [
      { label: "Landing Page", href: "/admin/landing-page", caption: "Kelola headline hero, banner promosi, dan urutan section landing page.", icon: LuGlobe },
      { label: "Blog", href: "/admin/blog", caption: "Tulis dan kelola artikel panduan belajar bahasa Jepang dan tips JLPT.", icon: LuFileText },
    ],
  },
  {
    title: "Student Experience",
    links: [
      { label: "Dashboards", href: "/admin/content-studio/dashboards", caption: "Atur sambutan, pengumuman, dan kartu aksi pada dashboard siswa.", icon: LuLayoutDashboard },
      { label: "Levels", href: "/admin/content-studio/levels", caption: "Kelola level belajar N5–N1, prasyarat, dan status akses materi.", icon: LuLayers },
    ],
  },
  {
    title: "Learning Content",
    links: [
      { label: "Lessons", href: "/admin/content-studio/lessons", caption: "Susun aktivitas video, modul tata bahasa, kanji, dan latihan bab.", icon: LuBookOpen },
      { label: "Flashcards", href: "/admin/content-studio/flashcards", caption: "Kelola deck kartu kosakata, bacaan kanji, dan contoh kalimat.", icon: LuSparkles },
      { label: "Chapter Builder", href: "/admin/program/n4/chapters", caption: "Atur urutan materi dan susunan bab pada learning journey.", icon: LuFolderTree },
    ],
  },
  {
    title: "Assessment",
    links: [
      { label: "Quiz Builder", href: "/admin/program/n4/chapters/chapter-4/quiz", caption: "Susun bank soal latihan dan kuis evaluasi harian.", icon: LuCircleHelp },
      { label: "Try Out Builder", href: "/admin/program/n4/tryout", caption: "Kelola simulasi ujian JLPT lengkap dengan timer dan penilaian.", icon: LuGraduationCap },
      { label: "Placement", href: "/admin/placement", caption: "Konfigurasi placement test gratis dan pantau prospek pendaftar.", icon: LuCompass },
      { label: "Mini Checkpoint", href: "/admin/mini-checkpoint", caption: "Kelola evaluasi berkala per sesi dan part untuk cohort Sensei.", icon: LuFlag },
    ],
  },
  {
    title: "People & Social Proof",
    links: [
      { label: "Sensei", href: "/admin/sensei", caption: "Kelola data pengajar, penugasan cohort, dan ketersediaan bimbingan.", icon: LuUsers },
      { label: "Testimonials", href: "/admin/testimonials", caption: "Moderasi dan seleksi cerita pengalaman nyata dari para siswa.", icon: LuMessageSquare },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Content Library", href: "/admin/content-library", caption: "Pusat arsip media video, PDF modul materi, audio, dan dokumen.", icon: LuLibrary },
    ],
  },
  {
    title: "Existing Management",
    links: [
      { label: "Program", href: "/admin/program", caption: "Atur paket belajar, biaya program, dan matriks hak akses siswa.", icon: LuShieldCheck },
      { label: "Settings", href: "/admin/settings", caption: "Pengaturan umum aplikasi, kontak resmi, dan preferensi sistem.", icon: LuSettings },
      { label: "Announcements", href: "/admin/announcements", caption: "Kirim pesan informasi dan broadcast penting kepada seluruh siswa.", icon: LuBell },
      { label: "Cohorts", href: "/admin/cohorts", caption: "Atur jadwal kelas tatap muka Sensei, kapasitas, dan sesi Zoom.", icon: LuCalendar },
    ],
  },
];

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
            <strong>Siap Disunting</strong>
            <small>Perubahan editor tersimpan lokal sebelum dipublikasikan.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Workspace Aktif</h2>
            <strong>{groups.length} Kategori</strong>
            <small>Area pengelolaan konten dan pengalaman siswa.</small>
          </article>
        </section>

        {groups.map((group) => (
          <section className="admin-section" key={group.title}>
            <h2>{group.title}</h2>
            <div className="admin-quick-actions">
              {group.links.map(({ label, href, caption, icon: Icon }) => (
                <article className="admin-action-card studio-card" key={href}>
                  <div className="studio-card-top">
                    <span className="studio-card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <h3 className="studio-card-title">{label}</h3>
                  </div>
                  <p className="studio-card-caption">{caption}</p>
                  <Link className="button button-dark studio-card-btn" href={href}>
                    Buka workspace
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </AdminShell>
  );
}

