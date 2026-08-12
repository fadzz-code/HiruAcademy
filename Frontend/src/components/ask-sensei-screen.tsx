"use client";

import { useState } from "react";

export function AskSenseiScreen() {
  const [tab, setTab] = useState("Tanya Sensei");
  const [status, setStatus] = useState("");
  return <><header className="sensei-page-head"><p className="dash-kicker">TANYA SENSEI</p><h1>Kirim pertanyaan yang terhubung ke materi, Chapter, replay, atau soal.</h1><p>Pertanyaan dikirim ke antrean Sensei dan tim akademik sesuai konteks belajar.</p></header><div className="ask-tabs" role="tablist">{["Tanya Sensei","Riwayat Pertanyaan","Draft"].map((item) => <button role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div>{tab === "Tanya Sensei" ? <section className="ask-layout"><form onSubmit={(event) => { event.preventDefault(); setStatus("Pertanyaan tersimpan pada demo."); }}><h2>Tulis pertanyaan untuk Sensei</h2><label>Konteks<select><option>Chapter 4</option><option>Replay</option><option>Soal</option></select></label><label>Jenis<select><option>Materi</option><option>Assessment</option></select></label><label>Judul Pertanyaan<input required /></label><label>Lampiran gambar opsional<input type="file" accept="image/*" /></label><label>Pertanyaan<textarea required rows={6} /></label><div><button type="button" onClick={() => setStatus("Draft tersimpan pada demo.")}>Simpan Draft</button><button type="submit">Kirim Pertanyaan</button></div>{status && <p role="status">{status}</p>}</form><aside><h2>Sensei / Tim Akademik</h2><div><span>Waktu respons</span><strong>Demo</strong></div><div><span>Riwayat terakhir</span><strong>Belum ada</strong></div></aside></section> : <section className="ask-empty"><h2>{tab}</h2><p>Belum ada data pada versi demo.</p></section>}</>;
}
