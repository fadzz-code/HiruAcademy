"use client";

import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin-shell";

type Result = { id: string; member: string; type: string; title: string; level: string; score: string; status: string; time: string; correct: string };
const fixtures: Result[] = [
  { id: "tryout", member: "Rina Kusuma", type: "Try Out", title: "Try Out N4 • Simulasi 1", level: "N4", score: "153 / 180", status: "Lulus", time: "78:00", correct: "85 / 100" },
  { id: "checkpoint", member: "Budi Santoso", type: "Checkpoint", title: "Checkpoint Chapter 4", level: "N4", score: "8 / 10", status: "Lulus", time: "09:20", correct: "8 / 10" },
  { id: "placement", member: "Ayu Wulandari", type: "Placement", title: "Placement Test", level: "N5", score: "Rekomendasi N4", status: "Selesai", time: "04:48", correct: "16 / 20" },
  { id: "mini", member: "Dimas Pratama", type: "Mini Checkpoint", title: "Mini Checkpoint N4 • Sesi 2 Part 1", level: "N4", score: "82 • LULUS", status: "LULUS", time: "12:34", correct: "8 / 10" },
  { id: "checkpoint-3", member: "Fajar Nugraha", type: "Checkpoint", title: "Checkpoint Chapter 3", level: "N4", score: "9 / 10 • Lulus", status: "Selesai", time: "10:15", correct: "9 / 10" },
];

export default function AssessmentResultsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Semua Assessment");
  const [level, setLevel] = useState("Semua Level");
  const [selectedId, setSelectedId] = useState("mini");
  const [detail, setDetail] = useState<"review" | "attempt" | null>(null);
  const selected = fixtures.find((result) => result.id === selectedId) ?? fixtures[0];
  const visible = useMemo(() => fixtures.filter((result) => (type === "Semua Assessment" || result.type === type) && (level === "Semua Level" || result.level === level) && `${result.member} ${result.title} ${result.type}`.toLowerCase().includes(query.toLowerCase())), [query,type,level]);

  return <AdminShell current="placement"><main className="admin-page admin-a3-page">
    <header className="admin-header"><div><p className="admin-kicker">ADMIN • HASIL EVALUASI</p><h1>Hasil Evaluasi Siswa</h1><p>Tinjau hasil Placement, Checkpoint, Mini Checkpoint, dan Try Out siswa.</p></div></header>
    <section className="admin-kpi-grid">{[["Selesai Dikerjakan","256","Total evaluasi siswa yang telah selesai."],["Lulus Passing Score","218","Memenuhi standar kelulusan minimal 75%."],["Perlu Bimbingan","38","Siswa yang memerlukan sesi penguatan."],["Ulasan Dibuka","194","Siswa yang meninjau pembahasan jawaban."]].map(([label,value,meta]) => <article className="admin-kpi-card" key={label}><h2>{label}</h2><strong>{value}</strong><small>{meta}</small></article>)}</section>
    <section className="a3-filter-bar results-filter"><label className="admin-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama siswa atau assessment" /></label><label className="admin-field"><span>Tipe</span><select value={type} onChange={(event) => setType(event.target.value)}><option>Semua Assessment</option><option>Placement</option><option>Checkpoint</option><option>Mini Checkpoint</option><option>Try Out</option></select></label><label className="admin-field"><span>Level</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option>Semua Level</option><option>N5</option><option>N4</option></select></label><label className="admin-field"><span>Periode</span><select><option>Semua Periode</option><option>Bulan Ini</option><option>Bulan Lalu</option></select></label></section>
    <div className="a3-list-detail results-layout"><section className="a3-list-panel results-list"><header><h2>Hasil Assessment Siswa</h2><p>Rekap nilai dan lembar evaluasi pengerjaan siswa.</p></header>{visible.map((result) => <button className={selected.id === result.id ? "active" : ""} type="button" onClick={() => { setSelectedId(result.id); setDetail(null); }} key={result.id}><div><strong>{result.member}</strong><small>Siswa Terdaftar</small></div><div><strong>{result.title}</strong><small>{result.type} • {result.level}</small></div><span>{result.score}</span><b>{result.status}</b><em>Detail</em></button>)}</section>
      <aside className="a3-detail-panel result-detail-panel"><header><div><p className="admin-kicker">{selected.member.toUpperCase()}</p><h2>{selected.title}</h2></div><span>{selected.status}</span></header><section className="selected-result-metrics"><div><strong>{selected.score}</strong><span>Total Score / Status</span></div><div><strong>{selected.time}</strong><span>Waktu / Timer</span></div><div><strong>{selected.correct}</strong><span>Benar</span></div></section><section className="result-breakdown"><h3>Breakdown per section</h3>{[["Pengetahuan Bahasa","86%"],["Reading","78%"],["Listening","67%"]].map(([section,value]) => <div key={section}><span>{section}</span><i><b style={{ width: value }}/></i><strong>{value}</strong></div>)}</section>
      <section className="review-state">
        <p className="admin-kicker">REVIEW STATE</p>
        <p>Pembahasan dan ulasan lembar jawaban siswa dapat ditinjau langsung oleh admin dan pengajar.</p>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "14px" }}>
          <button className="button button-primary" type="button" onClick={() => setDetail("review")}>Buka Review</button>
          <button className="button button-secondary" type="button" onClick={() => setDetail("attempt")}>Detail Pengerjaan</button>
        </div>
      </section>
      {detail && <section className="result-local-detail"><h3>{detail === "review" ? "Lembar Ulasan Jawaban" : "Detail Sesi Pengerjaan"}</h3><p>{detail === "review" ? "Menampilkan rekap jawaban yang dipilih siswa dan kunci jawaban benar." : "Menampilkan durasi pengerjaan, waktu submit, dan rincian skor per bagian kemampuan."}</p><button className="button button-secondary" type="button" onClick={() => setDetail(null)}>Tutup Detail</button></section>}<aside className="a2-announcement"><strong>KEAMANAN DATA EVALUASI</strong><p>Hasil evaluasi dan lembar ulasan tersimpan aman untuk memantau perkembangan belajar siswa.</p></aside></aside></div>
  </main></AdminShell>;
}
