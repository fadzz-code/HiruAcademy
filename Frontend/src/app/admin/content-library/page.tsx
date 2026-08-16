"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";

type Asset = { id: string; glyph: string; title: string; type: string; level: string; chapter: string; status: string; japanese: string; file: string };

const initialAssets: Asset[] = [
  { id: "video-4", glyph: "映", title: "Video Chapter 4", type: "Video", level: "N4", chapter: "Chapter 4", status: "Published", japanese: "Profesional", file: "video-chapter-4.mp4" },
  { id: "grammar-4", glyph: "文", title: "Modul Tata Bahasa Ch.4", type: "PDF Modules", level: "N4", chapter: "Chapter 4", status: "Published", japanese: "Pemula Ready", file: "modul-tata-bahasa-ch4.pdf" },
  { id: "kanji-4", glyph: "字", title: "Modul Huruf & Kanji Ch.4", type: "PDF Modules", level: "N4", chapter: "Chapter 4", status: "Published", japanese: "Pemula Ready", file: "modul-kanji-ch4.pdf" },
  { id: "deck-4", glyph: "札", title: "Deck Kosakata Chapter 4", type: "Flashcard", level: "N4", chapter: "Chapter 4", status: "Review", japanese: "Pemula Ready", file: "deck-kosakata-ch4.csv" },
  { id: "audio-4", glyph: "聴", title: "Audio Rutinitas Pagi", type: "Audio", level: "N4", chapter: "Chapter 4", status: "Draft", japanese: "Profesional", file: "audio-rutinitas-pagi.mp3" },
  { id: "reading-4", glyph: "読", title: "Reading Aktivitas Harian", type: "Reading", level: "N4", chapter: "Chapter 4", status: "Published", japanese: "Pemula Ready", file: "reading-aktivitas-harian.pdf" },
  { id: "images-n4", glyph: "画", title: "Illustration Set N4", type: "Images", level: "N4", chapter: "Shared Library", status: "Published", japanese: "Profesional", file: "illustration-set-n4.zip" },
];

export default function ContentLibraryPage() {
  const [assets, setAssets] = useState(initialAssets);
  const [selectedId, setSelectedId] = useState("grammar-4");
  const [type, setType] = useState("Semua");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("Semua Level");
  const [status, setStatus] = useState("Semua Status");
  const [editing, setEditing] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const editorRef = useRef<HTMLElement>(null);
  const selected = assets.find((asset) => asset.id === selectedId) ?? assets[0];
  const visible = useMemo(() => assets.filter((asset) => (type === "Semua" || asset.type === type) && (level === "Semua Level" || asset.level === level) && (status === "Semua Status" || asset.status === status) && `${asset.title} ${asset.type} ${asset.level} ${asset.chapter}`.toLowerCase().includes(query.toLowerCase())), [assets, type, level, status, query]);

  function selectAsset(id: string) { setSelectedId(id); setEditing(false); setFeedback(""); }
  function duplicate() { const duplicateAsset = { ...selected, id: `${selected.id}-copy-${assets.length}`, title: `${selected.title} — Copy`, status: "Draft" }; setAssets((items) => [...items, duplicateAsset]); setSelectedId(duplicateAsset.id); setFeedback("Duplikasi tersedia pada fixture lokal."); }
  function archive() { setAssets((items) => items.map((asset) => asset.id === selected.id ? { ...asset, status: "Archived" } : asset)); setArchiveOpen(false); setFeedback("Asset diarsipkan pada fixture lokal; backend dan audit belum terhubung."); }

  return <AdminShell current="content"><main className="admin-page admin-a2-page">
    <header className="admin-header"><div><p className="admin-kicker">ADMIN • CONTENT LIBRARY</p><h1>Content Library Management</h1><p>Kelola reusable video, dua modul PDF, flashcard, audio, reading, image, dan metadata konten.</p></div><div className="admin-header-actions"><button className="button button-secondary" type="button" onClick={() => setFeedback("Bulk Import CSV menunggu integrasi import tervalidasi.")}>Bulk Import CSV</button><button className="button button-primary" type="button" onClick={() => { setEditing(true); editorRef.current?.scrollIntoView({ behavior: "smooth" }); }}>Tambah Konten</button><Link className="button button-dark" href="/admin/program/n4/chapters">Chapter Builder</Link></div></header>

    <section className="admin-kpi-grid">{[["Published assets","Dinamis","Konten aktif dan reusable."],["Draft assets","Dinamis","Menunggu kelengkapan."],["Validation issues","Dinamis","File atau metadata bermasalah."],["Jepang Pemula","Dinamis","Konten dengan state pemula."]].map(([label,value,meta]) => <article className="admin-kpi-card" key={label}><h2>{label}</h2><strong>{value}</strong><small>{meta}</small></article>)}</section>

    <section className="library-filter-panel"><div className="admin-filters">{["Semua","Video","PDF Modules","Flashcard","Audio","Reading","Images"].map((item) => <button className={type === item ? "active" : ""} type="button" onClick={() => setType(item)} key={item}>{item}</button>)}</div><label className="admin-search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul, tipe, level, atau chapter" /></label><label className="admin-field"><span>Level</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option>Semua Level</option><option>N4</option></select></label><label className="admin-field"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Semua Status</option><option>Published</option><option>Draft</option><option>Review</option><option>Archived</option></select></label></section>

    <div className="content-library-layout"><section className="asset-list-panel"><div className="asset-list">{visible.length ? visible.map((asset) => <button className={selected.id === asset.id ? "active" : ""} type="button" onClick={() => selectAsset(asset.id)} key={asset.id}><span aria-hidden="true">{asset.glyph}</span><div><strong>{asset.title}</strong><small>{asset.type} • {asset.level} • {asset.chapter}</small><b>Reusable assignment</b></div><div><em>{asset.status}</em><small>{asset.japanese}</small></div></button>) : <section className="a2-empty"><h2>Belum ada data untuk filter ini</h2><p>Ubah tipe, level, status, atau kata kunci.</p><button className="button button-secondary" type="button" onClick={() => { setType("Semua"); setLevel("Semua Level"); setStatus("Semua Status"); setQuery(""); }}>Reset Filter</button></section>}</div><footer className="asset-pagination"><span>Menampilkan fixture lokal</span><div><button type="button" disabled>‹</button><button className="active" type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">›</button></div></footer></section>

      <aside className="asset-detail-panel" ref={editorRef}><header><span aria-hidden="true">{selected.glyph}</span><div><h2>{selected.title}</h2><p>{selected.type} • {selected.level} • {selected.chapter} • {selected.status}</p></div><b>{selected.status}</b></header><dl><div><dt>File name</dt><dd>{selected.file}</dd></div><div><dt>Version</dt><dd>Dikelola sistem</dd></div><div><dt>Assignments</dt><dd>Chapter dan library</dd></div><div><dt>Jepang Pemula</dt><dd>{selected.japanese === "Pemula Ready" ? "Ready" : "Profesional"}</dd></div><div><dt>Validation</dt><dd>{selected.status === "Draft" ? "Review" : "Passed"}</dd></div></dl><section className="japanese-content-state"><p className="admin-kicker">JEPANG PEMULA</p><p>State konten tersimpan dan dapat diedit; bukan screen terpisah.</p></section>{editing && <div className="asset-local-editor"><label className="admin-field"><span>Judul Konten</span><input defaultValue={selected.title} /></label><label className="admin-field"><span>File name</span><input defaultValue={selected.file} /></label><button className="button button-primary" type="button" onClick={() => { setEditing(false); setFeedback("Perubahan editor disimpan pada fixture lokal."); }}>Simpan Lokal</button></div>}<div className="asset-actions"><button className="button button-primary" type="button" onClick={() => setEditing(true)}>Edit Konten</button><button className="button button-secondary" type="button" onClick={duplicate}>Duplikasi</button><button className="button button-secondary danger" type="button" onClick={() => setArchiveOpen(true)}>Archive</button></div>{feedback && <p className="admin-local-feedback" role="status">{feedback}</p>}<aside className="a2-announcement"><strong>Pengumuman</strong><p>Konten tidak dapat dipublikasikan jika file atau metadata wajib belum valid.</p></aside></aside></div>

    {archiveOpen && <div className="admin-dialog-layer"><button className="admin-dialog-backdrop" type="button" onClick={() => setArchiveOpen(false)} aria-label="Batal archive"/><section role="dialog" aria-modal="true" aria-labelledby="archive-title"><p className="admin-kicker">ADMIN • CONFIRMATION</p><h2 id="archive-title">Archive {selected.title}?</h2><span>Confirm</span><p>Archive memerlukan alasan dan audit trail. Tindakan demo ini hanya mengubah fixture lokal.</p><label className="admin-field"><span>Alasan</span><textarea defaultValue="Konten diganti dengan versi terbaru." rows={3}/></label><div><button className="button button-primary" type="button" onClick={archive}>Konfirmasi Tindakan</button><button className="button button-secondary" type="button" onClick={() => setArchiveOpen(false)}>Batal</button></div></section></div>}
  </main></AdminShell>;
}
