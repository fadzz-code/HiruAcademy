"use client";

import Link from "next/link";
import { use, useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";

const sectionFixtures = [
  { id: "language", glyph: "語", name: "Pengetahuan Bahasa", detail: "Kosakata, grammar, kanji.", status: "Ready" },
  { id: "reading", glyph: "読", name: "Reading", detail: "Teks pendek dan panjang.", status: "Ready" },
  { id: "listening", glyph: "聴", name: "Listening", detail: "Audio dan percakapan.", status: "Draft" },
];

const poolFixtures = [
  { glyph: "語", name: "Kosakata N4" },
  { glyph: "文", name: "Grammar Chapter 1–12" },
  { glyph: "字", name: "Kanji N4" },
];

export function ClientTryoutBuilder({ params }: { params: Promise<{ level: string }> }) {
  const { level } = use(params);
  const [sections, setSections] = useState(sectionFixtures);
  const [selected, setSelected] = useState("language");
  const [activePools, setActivePools] = useState([true, true, true]);
  const [saved, setSaved] = useState(false);
  const [accessSaved, setAccessSaved] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const previewRef = useRef<HTMLElement>(null);
  const current = sections.find((section) => section.id === selected) ?? sections[0];
  const quizHref = `/admin/program/${level}/chapters/chapter-4/quiz`;

  return <AdminShell current="content"><main className="admin-page admin-a2-page">
    <header className="admin-header"><div><p className="admin-kicker">ADMIN • KONFIGURASI TRY OUT</p><h1>Penyusun Try Out</h1><p>Atur bagian, bank soal, alokasi, timer, penilaian, kelulusan, percobaan, ulasan, dan status publikasi.</p></div><div className="admin-header-actions"><Link className="button button-secondary" href={quizHref}>Penyusun Quiz</Link><button className="button button-primary" type="button" onClick={() => setSaved(true)}>Simpan Try Out</button></div></header>

    <section className="admin-context-bar"><label><span>Try Out</span><select><option>JLPT {level.toUpperCase()} • Simulasi 1</option></select></label><label><span>Versi</span><select><option>Draft Aktif</option></select></label><button className="button button-secondary" type="button" onClick={() => previewRef.current?.scrollIntoView({ behavior: "smooth" })}>Pratinjau Try Out</button><button className="button button-dark" type="button" onClick={() => setBlocked(true)}>Publikasikan Try Out</button>{saved && <span className="admin-local-feedback" role="status">Konfigurasi tersimpan pada fixture lokal.</span>}</section>

    <section className="admin-kpi-grid">{[["Total soal","Dinamis","Dihitung dari section dan pool."],["Durasi","Dinamis","Timer mengikuti konfigurasi."],["Passing score","Dinamis","Nilai minimum dari admin."],["Aturan Percobaan","Config","Percobaan dan cooldown."]].map(([label,value,meta]) => <article className="admin-kpi-card" key={label}><h2>{label}</h2><strong>{value}</strong><small>{meta}</small></article>)}</section>

    <div className="a2-builder-layout"><aside className="a2-section-nav"><header><h2>Section Try Out</h2><p>Urutan dan alokasi mengikuti konfigurasi.</p></header>{sections.map((section) => <button className={selected === section.id ? "active" : ""} type="button" onClick={() => setSelected(section.id)} key={section.id}><span>{section.glyph}</span><div><strong>{section.name}</strong><small>{section.detail}</small></div><b>{section.status}</b></button>)}<button className="a2-add-row" type="button" onClick={() => setSections((items) => items.some((item) => item.id === "new") ? items : [...items, { id: "new", glyph: "文", name: "Section Baru", detail: "Draft lokal.", status: "Draft" }])}>Tambah Section</button></aside>

      <section className="a2-editor"><header className="a2-editor-head"><div><p className="admin-kicker">SECTION {String(sections.findIndex((item) => item.id === current.id) + 1).padStart(2,"0")} • {current.status.toUpperCase()}</p><h2>{current.name}</h2></div><span className={`admin-status status-${current.status === "Ready" ? "active" : "pending"}`}>{current.status}</span></header><div className="a2-field-row"><label className="admin-field"><span>Nama Section</span><input defaultValue={current.name} key={`${current.id}-name`} /></label><label className="admin-field"><span>Urutan</span><input type="number" defaultValue={sections.findIndex((item) => item.id === current.id) + 1} key={`${current.id}-order`} /></label></div>

        <section className="a2-subsection"><h3>Question pools</h3><div className="a2-pool-list">{poolFixtures.map((pool,index) => <article className={activePools[index] ? "active" : ""} key={pool.name}><span aria-hidden="true">{pool.glyph}</span><div><strong>{pool.name}</strong><small>Pool aktif</small></div><label className="admin-field"><span>Alokasi</span><input value="Dinamis" readOnly /></label><button type="button" onClick={() => setActivePools((values) => values.map((value,poolIndex) => poolIndex === index ? !value : value))}>{activePools[index] ? "Aktif" : "Nonaktif"}</button></article>)}</div></section>

        <section className="a2-subsection"><h3>Aturan section</h3><div className="a2-rule-grid">{[["Randomisasi","Ambil soal dari pool secara acak."],["Timer section","Durasi dapat diatur per section."],["Navigasi","Atur izin kembali ke soal sebelumnya."]].map(([title,detail]) => <label key={title}><div><strong>{title}</strong><small>{detail}</small></div><input type="checkbox" defaultChecked={title !== "Timer section"} /></label>)}</div></section>

        <section className="a2-allocation-preview" ref={previewRef}><h3>Preview alokasi</h3>{["Kosakata","Grammar","Kanji"].map((item) => <div key={item}><span>{item}</span><strong>Dinamis</strong></div>)}</section>
      </section></div>

    <div className="a2-lower-grid"><section className="a2-panel"><h2>Pengaturan Umum</h2>{[["Total timer","Gabungan atau per section.","Dinamis"],["Scoring","Bobot dan konversi nilai.","Config"],["Passing logic","Nilai lulus per assessment.","Dinamis"],["Aturan Percobaan","Percobaan dan cooldown.","Config"],["Ulasan Jawaban","Tampilkan review setelah selesai.","Aktif"],["Autosave","Simpan progres runner.","Aktif"]].map(([title,detail,state]) => <div className="a2-setting-row" key={title}><div><strong>{title}</strong><small>{detail}</small></div><span>{state}</span></div>)}</section>
      <section className="a2-panel publication-panel"><h2>Daftar Periksa Publikasi</h2>{[[true,"Semua section ready"],[true,"Question pool mencukupi"],[false,"Listening media tersedia"],[true,"Scoring tervalidasi"],[true,"Result & review aktif"]].map(([done,label]) => <div className={done ? "complete" : "incomplete"} key={String(label)}><span aria-hidden="true">{done ? "✓" : "!"}</span><strong>{label}</strong></div>)}<aside><strong>Pengumuman</strong><p>Try Out tidak dapat dipublikasikan sampai semua section dan media wajib siap.</p></aside></section>
      <section className="a2-panel"><p className="admin-kicker">MEDIA SOAL</p><h2>Upload gambar per soal (opsional).</h2><p>Gambar tampil di runner Try Out dan review jawaban.</p><button className="button button-secondary" type="button">Upload Gambar</button><small>Fixture lokal; tidak ada file yang diunggah.</small></section></div>

    <section className="a2-access-panel"><header><p className="admin-kicker">ATURAN AKSES TRY OUT</p><h2>Atur siapa yang dapat membuka Try Out, kapan tersedia, prerequisite Chapter, jumlah attempt, dan izin ulasan.</h2></header><div className="a2-access-grid"><fieldset><legend>Plan:</legend>{["Free Member","Belajar Mandiri","Belajar dengan Sensei"].map((plan) => <label key={plan}><input type="checkbox" defaultChecked={plan !== "Free Member"} />{plan}</label>)}</fieldset><label className="admin-field"><span>Level</span><select multiple defaultValue={[level]}>{["n1","n2","n3","n4","n5"].map((item) => <option value={item} key={item}>{item.toUpperCase()}</option>)}</select></label>{[["Jadwal Akses","Tanggal mulai dan berakhir"],["Prerequisite","Chapter tertentu / tanpa syarat"],["Produk","Plan + level yang dipilih"],["Jumlah Attempt","Dinamis dari Admin"],["Cooldown","Jeda antarpercobaan"],["Ulasan Jawaban","Aktif / Nonaktif"],["Status Publikasi","Draft / Terjadwal / Aktif"]].map(([label,value]) => <label className="admin-field" key={label}><span>{label}</span><select><option>{value}</option></select></label>)}</div><p>Backend memeriksa plan, level, tanggal, prerequisite, attempt, dan status review pada setiap akses.</p><button className="button button-primary" type="button" onClick={() => setAccessSaved(true)}>Simpan Aturan Akses</button>{accessSaved && <span className="admin-local-feedback" role="status">Aturan akses diperbarui pada fixture lokal.</span>}</section>

    {blocked && <div className="admin-dialog-layer"><button className="admin-dialog-backdrop" type="button" onClick={() => setBlocked(false)} aria-label="Tutup validasi"/><section role="dialog" aria-modal="true" aria-labelledby="publish-blocked-title"><p className="admin-kicker">ADMIN • VALIDATION</p><h2 id="publish-blocked-title">Konfigurasi belum dapat disimpan</h2><span>Blocked</span><p>Try Out tidak dapat dipublikasikan sampai semua section dan media wajib siap.</p><div><button className="button button-primary" type="button" onClick={() => setBlocked(false)}>Kembali ke Editor</button><button className="button button-secondary" type="button" onClick={() => { setBlocked(false); previewRef.current?.scrollIntoView(); }}>Lihat Error</button></div></section></div>}
  </main></AdminShell>;
}
