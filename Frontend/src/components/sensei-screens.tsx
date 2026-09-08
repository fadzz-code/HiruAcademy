"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  LuArrowLeft,
  LuBookOpen,
  LuCircleHelp,
  LuLayers3,
  LuMaximize,
  LuPause,
  LuPlay,
  LuVolume2,
} from "react-icons/lu";
import { replayMarkers, replays, scheduleSessions } from "@/lib/sensei-mock";

type StateAction = { label: string; href?: string; onClick?: () => void };

function SenseiState({ eyebrow, title, status, description, facts, primary, secondary }: { eyebrow: string; title: string; status: string; description: string; facts: string[]; primary: StateAction; secondary: StateAction }) {
  const action = (item: StateAction, primaryAction: boolean) => item.href ? <Link className={`button ${primaryAction ? "button-primary" : "button-secondary"}`} href={item.href}>{item.label}</Link> : <button className={`button ${primaryAction ? "button-primary" : "button-secondary"}`} type="button" onClick={item.onClick}>{item.label}</button>;
  return <section className="sensei-status-panel"><p className="dash-kicker">{eyebrow}</p><h1>{title}</h1><span className="supporting-badge">{status}</span><p>{description}</p><div className="status-topic">{facts.map((fact) => <strong key={fact}>{fact}</strong>)}</div><div className="status-actions">{action(primary, true)}{action(secondary, false)}</div></section>;
}

export function ScheduleScreen() {
  const [view, setView] = useState<"calendar" | "list" | "empty">("calendar");
  const [period, setPeriod] = useState(0);
  if (view === "empty") return <SenseiState eyebrow="ZOOM • EMPTY" title="Belum ada sesi pada periode ini" status="Processing" description="Jadwal akan muncul setelah cohort dan sesi dipublikasikan tim akademik." facts={["Status sistem", "Jadwal resmi", "Verifikasi paket"]} primary={{ label: "Kembali Jadwal", onClick: () => { setPeriod(0); setView("calendar"); } }} secondary={{ label: "Lihat Replay", href: "/replay?membership=sensei" }} />;
  return <><div className="sensei-title-row"><PageHead eyebrow="BELAJAR DENGAN SENSEI • JADWAL KELAS" title="Jadwal cohort dan sesi bersama Sensei" description="Tanggal, jam, durasi, Sensei, cohort, dan link kelas mengikuti konfigurasi jadwal." /><Link href="/replay?membership=sensei">Lihat Replay</Link></div><div className="sensei-controls"><button type="button" aria-label="Periode sebelumnya" onClick={() => { setPeriod(-1); setView("empty"); }}>Sebelumnya</button><span>{period === 0 ? "Periode aktif dari tim akademik" : "Periode tanpa sesi"}</span><button type="button" aria-label="Periode berikutnya" onClick={() => { setPeriod(1); setView("empty"); }}>Berikutnya</button><b>Cohort Aktif</b><button className={view === "calendar" ? "active" : ""} type="button" onClick={() => setView("calendar")}>Kalender</button><button className={view === "list" ? "active" : ""} type="button" onClick={() => setView("list")}>Daftar</button></div>{view === "calendar" ? <section className="schedule-layout"><div className="calendar-card"><div className="calendar-grid schedule-placeholder">{["Sen","Sel","Rab","Kam","Jum","Sab","Min","—","—","Zoom","—","—","Replay","—"].map((day, index) => day === "Zoom" ? <Link className="event" href="/schedule/chapter-4?membership=sensei" key={`${day}-${index}`}>{day}</Link> : <span className={day === "Replay" ? "event" : ""} key={`${day}-${index}`}>{day}</span>)}</div></div><SessionList /></section> : <SessionList />}<section className="sensei-announcement"><strong>Pengumuman</strong><p>Link Zoom aktif sesuai waktu dan jadwal yang ditentukan.</p></section><Link className="sensei-back" href="/dashboard?membership=sensei">Kembali Dashboard</Link></>;
}

function SessionList() {
  return <aside className="upcoming-panel"><p className="dash-kicker">Sesi mendatang</p><small>Data sesi diperbarui secara berkala.</small>{scheduleSessions.map((session) => session.id === "chapter-4" ? <Link className="schedule-session" href="/schedule/chapter-4?membership=sensei" key={session.id}><div><strong>{session.title}</strong><small>{session.meta}</small></div><span>{session.status}</span></Link> : <div className="schedule-session" key={session.id}><div><strong>{session.title}</strong><small>{session.meta}</small></div><span>{session.status}</span></div>)}</aside>;
}

export function ClassDetailScreen() {
  const [state, setState] = useState<"detail" | "zoom" | "reminder">("detail");
  if (state === "zoom") return <SenseiState eyebrow="ZOOM • LINK UNAVAILABLE" title="Link Zoom belum aktif" status="Unavailable" description="Link sesi bimbingan tatap muka akan aktif menjelang waktu kelas." facts={["Status sistem", "Jadwal resmi", "Verifikasi paket"]} primary={{ label: "Kembali ke Detail", onClick: () => setState("detail") }} secondary={{ label: "Lihat Jadwal", href: "/schedule?membership=sensei" }} />;
  if (state === "reminder") return <SenseiState eyebrow="CLASS • REMINDER" title="Pengingat kelas tersimpan" status="Saved" description="Notifikasi pengingat sesi bimbingan Sensei berhasil diaktifkan." facts={["Status sistem", "Jadwal resmi", "Verifikasi paket"]} primary={{ label: "Kembali ke Kelas", onClick: () => setState("detail") }} secondary={{ label: "Lihat Jadwal", href: "/schedule?membership=sensei" }} />;
  return (
    <>
      <Link className="sensei-back" href="/schedule?membership=sensei">
        <LuArrowLeft aria-hidden="true" /> Kembali Jadwal
      </Link>
      <PageHead eyebrow="DETAIL KELAS • BIMBINGAN SENSEI" title="Chapter 4 — Sesi bersama Sensei" description="Detail lengkap pertemuan, materi modul, dan persiapan kelas bimbingan." />
      <section className="class-session-card">
        <div><span>Cohort Aktif</span><b>Terjadwal</b></div>
        <p className="dash-kicker">Zoom</p>
        <h2>Sensei dan jadwal terstruktur</h2>
        <p>Hari/Tanggal • Jam WIB • Durasi 90 Menit • Link Zoom aktif menjelang sesi.</p>
        <button className="button button-dark" type="button" onClick={() => setState("zoom")}>Link Aktif Saat Sesi</button>
      </section>
      <section className="class-detail-grid">
        <article>
          <h2>Agenda kelas</h2>
          {["Review materi Chapter 4","Latihan pola kalimat","Tanya jawab dan rangkuman kelas","Arahan aktivitas berikutnya"].map((item, index) => (
            <div className="class-agenda" key={item}>
              <strong>{String(index + 1).padStart(2,"0")}</strong>
              <span>{item}</span>
            </div>
          ))}
        </article>
        <article>
          <h2>Materi pendukung</h2>
          {[
            { icon: <LuBookOpen aria-hidden="true" />, title: "Ringkasan grammar", detail: "Dibuka dari modul materi chapter." },
            { icon: <LuLayers3 aria-hidden="true" />, title: "Kanji sesi", detail: "Daftar kanji yang dibahas pada kelas." },
            { icon: <LuCircleHelp aria-hidden="true" />, title: "Pertanyaan cohort", detail: "Topik diskusi yang dikirim sebelum kelas." },
          ].map((item) => (
            <div className="class-material" key={item.title}>
              <span style={{ display: "grid", placeItems: "center", width: "32px", height: "32px", borderRadius: "8px", background: "var(--soft)", color: "var(--orange-dark)" }}>
                {item.icon}
              </span>
              <span>
                <b>{item.title}</b>
                <small>{item.detail}</small>
              </span>
            </div>
          ))}
        </article>
      </section>
      <section className="class-reminders">
        <h2>Pengingat kelas</h2>
        <div>
          <span>Notifikasi aplikasi</span><strong>Aktif</strong>
          <span>Email reminder</span><strong>Mengikuti pengaturan</strong>
          <span>Pengingat waktu</span><strong>30 menit sebelum</strong>
        </div>
        <button className="button button-primary" type="button" onClick={() => setState("reminder")}>Simpan Pengingat</button>
      </section>
      <div className="learning-question-actions">
        <Link className="button button-secondary" href="/replay?membership=sensei">Lihat Replay</Link>
      </div>
      <section className="sensei-announcement">
        <strong>Pengumuman</strong>
        <p>Jadwal dan rekaman replay diperbarui secara berkala setelah sesi selesai.</p>
      </section>
    </>
  );
}

export function ReplayScreen() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [processing, setProcessing] = useState(false);
  const visible = useMemo(() => replays.filter((item) => (filter === "Semua" || item.category === filter) && item.title.toLowerCase().includes(search.toLowerCase())), [filter, search]);
  const featured = replays[0];
  if (processing) return <SenseiState eyebrow="REPLAY • PROCESSING" title="Replay sedang diproses" status="Processing" description="Rekaman, transkrip, dan materi sedang disiapkan sebelum dipublikasikan." facts={["Status sistem", "Jadwal resmi", "Verifikasi paket"]} primary={{ label: "Kembali ke Replay", onClick: () => setProcessing(false) }} secondary={{ label: "Lihat Jadwal", href: "/schedule?membership=sensei" }} />;
  return <><div className="sensei-title-row"><PageHead eyebrow="BELAJAR DENGAN SENSEI • REPLAY KELAS" title="Tonton kembali sesi yang telah dipublikasikan" description="Rekaman video kelas bimbingan Sensei dengan transkrip dan penanda waktu." /><Link href="/schedule?membership=sensei">Lihat Jadwal</Link></div><label className="replay-search">Cari replay, chapter, atau Sensei<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari replay, chapter, atau Sensei" /></label><div className="replay-filters">{["Semua","Chapter 4","Tersimpan"].map((item) => <button type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><section className="replay-featured"><button className="replay-processing-trigger" type="button" onClick={() => setProcessing(true)}><p className="dash-kicker">Replay terbaru</p><span>REPLAY TERBARU • Dipublikasikan • Cohort Aktif</span><h2>{featured.title}</h2><p>{featured.description}</p><small>Sesi bimbingan Sensei • Rekaman video terstandarisasi</small></button><Link href="/replay/chapter-4?membership=sensei">Putar Replay</Link></section><h2 className="replay-section-title">Replay lainnya</h2>{visible.length ? <section className="replay-grid">{visible.filter((item) => !item.featured).map((item) => <article key={item.id}><small>REPLAY • Dipublikasikan • Cohort Aktif</small><h2>{item.title}</h2><p>{item.description}</p><small>Sesi bimbingan Sensei • Rekaman video terstandarisasi</small><Link href="/replay/chapter-4?membership=sensei">Buka Replay</Link></article>)}</section> : <section className="library-empty"><h2>Tidak ada replay ditemukan</h2><p>Ubah pencarian atau filter untuk melihat rekaman lain.</p></section>}<section className="sensei-announcement"><strong>Pengumuman</strong><p>Replay tampil setelah rekaman sesi selesai diverifikasi dan dipublikasikan.</p></section></>;
}

export function ReplayPlayerScreen({ youtubeVideoId }: { youtubeVideoId?: string }) {
  const [tab, setTab] = useState("Ringkasan");
  const [state, setState] = useState<"player" | "error">("player");
  const [marker, setMarker] = useState("00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1x");

  const currentMarkerObj = replayMarkers.find(([time]) => time === marker);
  const markerLabel = currentMarkerObj ? currentMarkerObj[1] : "Pembukaan";

  if (state === "error") {
    return (
      <SenseiState
        eyebrow="REPLAY • ERROR"
        title="Replay belum dapat dimuat"
        status="Error"
        description="Terjadi kendala saat memuat rekaman sesi. Silakan coba kembali."
        facts={["Status sistem", "Jadwal resmi", "Verifikasi paket"]}
        primary={{ label: "Coba Lagi", onClick: () => setState("player") }}
        secondary={{ label: "Kembali ke List", href: "/replay?membership=sensei" }}
      />
    );
  }

  return (
    <>
      <Link className="sensei-back" href="/replay?membership=sensei">
        <LuArrowLeft aria-hidden="true" /> Kembali ke Replay
      </Link>
      <PageHead
        eyebrow="REPLAY • CHAPTER 4 • COHORT AKTIF"
        title="Pola Kalimat dan Kehidupan Sehari-hari"
        description="Rekaman bimbingan Sensei lengkap dengan chapter markers, materi modul, dan ringkasan kelas."
      />

      {/* YouTube-Ready Video Player Structure */}
      <section
        className="replay-player-container"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          background: "var(--navy)",
          color: "#fff",
          marginBottom: "24px",
          border: "1px solid #3d4554",
        }}
      >
        {youtubeVideoId ? (
          <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="YouTube video player"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              minHeight: "340px",
              background: "linear-gradient(135deg, #1f242d 0%, #2a313d 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "24px",
            }}
          >
            {/* Top Bar: Session Info */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(8px)",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                Sesi Live Replay • 58:10
              </span>
              <span style={{ fontSize: "12px", color: "#dce2f3" }}>
                Bagian Aktif: <strong>{markerLabel}</strong> ({marker})
              </span>
            </div>

            {/* Center Play Surface */}
            <div style={{ textAlign: "center", margin: "auto" }}>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Jeda video" : "Mulai video"}
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "var(--orange)",
                  color: "#5a2a00",
                  border: 0,
                  display: "grid",
                  placeItems: "center",
                  fontSize: "26px",
                  cursor: "pointer",
                  margin: "0 auto 12px",
                  boxShadow: "0 8px 24px rgba(244, 130, 32, 0.35)",
                  transition: "transform 0.2s ease",
                }}
              >
                {isPlaying ? <LuPause /> : <LuPlay style={{ marginLeft: "4px" }} />}
              </button>
              <strong style={{ fontSize: "16px", display: "block", color: "#fff" }}>
                {isPlaying ? "Memutar Rekaman..." : "Mulai Putar Replay"}
              </strong>
              <small style={{ color: "#a0a7ba", fontSize: "12px" }}>
                Player siap terhubung ke video pembelajaran YouTube
              </small>
            </div>

            {/* Bottom Controls Bar */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                padding: "10px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* Timeline scrubber bar */}
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: marker === "00:00" ? "5%" : marker === "08:20" ? "20%" : marker === "24:15" ? "45%" : marker === "46:40" ? "80%" : "95%",
                    height: "100%",
                    borderRadius: "999px",
                    background: "var(--orange)",
                  }}
                />
              </div>

              {/* Controls and buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{ border: 0, background: "none", color: "#fff", cursor: "pointer", fontSize: "16px" }}
                  >
                    {isPlaying ? <LuPause /> : <LuPlay />}
                  </button>
                  <span style={{ fontSize: "12px", color: "#dce2f3", fontWeight: "700" }}>
                    {marker} / 58:10
                  </span>
                  <LuVolume2 aria-hidden="true" style={{ fontSize: "16px", color: "#a0a7ba" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "11px", color: "#a0a7ba" }}>Kecepatan:</span>
                  {["1x", "1.25x", "1.5x"].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setPlaybackSpeed(speed)}
                      style={{
                        padding: "2px 6px",
                        borderRadius: "4px",
                        border: 0,
                        background: playbackSpeed === speed ? "var(--orange)" : "rgba(255,255,255,0.1)",
                        color: playbackSpeed === speed ? "#5a2a00" : "#fff",
                        fontSize: "10px",
                        fontWeight: "800",
                        cursor: "pointer",
                      }}
                    >
                      {speed}
                    </button>
                  ))}
                  <button
                    type="button"
                    style={{ border: 0, background: "none", color: "#fff", cursor: "pointer", fontSize: "16px" }}
                    aria-label="Layar penuh"
                  >
                    <LuMaximize />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tabs */}
      <div className="replay-tabs" role="tablist">
        {["Ringkasan", "Transkrip", "Materi", "Catatan"].map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="replay-content" role="tabpanel">
        {tab === "Ringkasan" && (
          <>
            <h2>Ringkasan kelas</h2>
            <p>Replay mencakup review Chapter 4, latihan pola kalimat, diskusi cohort, serta arahan aktivitas berikutnya.</p>
          </>
        )}
        {tab === "Transkrip" && (
          <>
            <p className="dash-kicker">TRANSKRIP SESI</p>
            <p>Transkrip lengkap mengikuti pembahasan kelas Sensei. Gunakan penanda waktu di bawah untuk melompat ke bagian materi tertentu.</p>
          </>
        )}
        {tab === "Materi" && (
          <>
            <h2>Materi terkait</h2>
            <div className="replay-summary">
              <span>Ringkasan Grammar</span>
              <span>Daftar Kanji</span>
              <span>Latihan Sesi</span>
            </div>
          </>
        )}
        {tab === "Catatan" && (
          <p>Catatan dan rangkuman poin penting sesi bimbingan bersama Sensei.</p>
        )}
      </section>

      {/* Chapter Markers */}
      <section className="replay-markers">
        <h2>Chapter markers</h2>
        <p style={{ color: "var(--muted)", fontSize: "12px", margin: "4px 0 16px" }}>
          Klik penanda waktu untuk melompat ke bagian pembahasan:
        </p>
        {replayMarkers.map(([time, label]) => (
          <button
            className={marker === time ? "active" : ""}
            type="button"
            onClick={() => {
              setMarker(time);
              setIsPlaying(true);
            }}
            key={time}
          >
            <strong>{time}</strong>
            <span>{label}</span>
          </button>
        ))}
      </section>

      <section className="sensei-announcement">
        <strong>Status publikasi</strong>
        <p>Replay, transkrip, dan materi bimbingan tersedia lengkap setelah sesi diverifikasi.</p>
      </section>
      <Link className="button button-secondary" href="/schedule/chapter-4?membership=sensei">
        Lihat Detail Pertemuan
      </Link>
    </>
  );
}

function PageHead({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="sensei-page-head">
      <p className="dash-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
