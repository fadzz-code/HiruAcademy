"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { replays, scheduleSessions } from "@/lib/sensei-mock";

export function ScheduleScreen() {
  const [selected, setSelected] = useState(scheduleSessions[0]);
  return <><PageHead eyebrow="BELAJAR DENGAN SENSEI • JADWAL KELAS" title="Jadwal cohort dan sesi bersama Sensei" description="Tanggal, jam, durasi, Sensei, cohort, dan link kelas mengikuti konfigurasi admin." /><div className="sensei-controls"><span>Periode aktif dari admin</span><b>Cohort Aktif</b><button>Kalender</button><button>Daftar</button><Link href="/replay?membership=sensei">Lihat Replay</Link></div><section className="schedule-layout"><div className="calendar-card"><div className="calendar-head"><button aria-label="Bulan sebelumnya">←</button><strong>Desember</strong><button aria-label="Bulan berikutnya">→</button></div><div className="calendar-grid">{["S","S","R","K","J","S","M",...Array.from({ length: 31 }, (_, index) => String(index + 1))].map((day, index) => <span className={day === "18" || day === "21" ? "event" : ""} key={`${day}-${index}`}>{day}</span>)}</div></div><aside className="upcoming-panel"><p className="dash-kicker">Sesi mendatang</p>{scheduleSessions.map((session) => <button className={selected.id === session.id ? "selected" : ""} onClick={() => setSelected(session)} key={session.id}><span>{session.date}<small>{session.month}</small></span><div><strong>{session.title}</strong><small>{session.day} • {session.time}</small></div></button>)}</aside></section><section className="class-detail"><div><p className="dash-kicker">Detail Kelas</p><h2>{selected.title}</h2><p>{selected.sensei} • {selected.cohort}</p></div><dl><div><dt>Waktu</dt><dd>{selected.time}</dd></div><div><dt>Durasi</dt><dd>{selected.duration}</dd></div><div><dt>Status</dt><dd>{selected.status}</dd></div></dl><button type="button">Detail Kelas</button></section></>;
}

export function ReplayScreen() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);
  const visible = useMemo(() => replays.filter((item) => (filter === "Semua" || item.category === filter) && item.title.toLowerCase().includes(search.toLowerCase())), [filter, search]);
  if (playing) { const replay = replays.find((item) => item.id === playing)!; return <><button className="sensei-back" onClick={() => setPlaying(null)}>← Daftar Replay</button><PageHead eyebrow="BELAJAR DENGAN SENSEI • REPLAY KELAS" title={replay.title} description={replay.meta} /><section className="replay-player"><span aria-hidden="true">▶</span><p>Player replay demo</p></section><section className="replay-player-meta"><h2>{replay.title}</h2><p>Sensei, cohort, durasi, dan status replay berasal dari admin.</p></section></>; }
  const featured = replays[0];
  return <><PageHead eyebrow="BELAJAR DENGAN SENSEI • REPLAY KELAS" title="Tonton kembali sesi yang telah dipublikasikan" description="Sensei, cohort, durasi, dan status replay berasal dari admin." /><label className="replay-search">Cari replay, chapter, atau Sensei<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari replay, chapter, atau Sensei" /></label><div className="replay-filters">{["Semua","Chapter 4","Tersimpan"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><section className="replay-featured"><div><p className="dash-kicker">Replay terbaru</p><h2>{featured.title}</h2><p>{featured.meta}</p><button onClick={() => setPlaying(featured.id)}>Putar Replay</button></div><span aria-hidden="true">▶</span></section><section className="replay-grid">{visible.filter((item) => !item.featured).map((item) => <article key={item.id}><span aria-hidden="true">▶</span><h2>{item.title}</h2><p>{item.meta}</p><button onClick={() => setPlaying(item.id)}>Putar Replay</button></article>)}</section></>;
}

function PageHead({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="sensei-page-head"><p className="dash-kicker">{eyebrow}</p><h1>{title}</h1><p>{description}</p></header>;
}
