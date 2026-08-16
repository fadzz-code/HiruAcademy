"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { StudentNavigation } from "@/components/student-navigation";
import { parseMembership } from "@/lib/dashboard-mock";

const decks = [
  { chapter: "Chapter 1", title: "Kosakata Chapter 1", description: "Kosakata utama dari chapter gratis yang sudah terbuka.", action: "Mulai" },
  { chapter: "Chapter 1", title: "Huruf Jepang Dasar", description: "Deck penguatan hiragana, katakana, dan pengenalan kanji.", action: "Lanjutkan" },
  { chapter: "Chapter 1", title: "Pola Kalimat Chapter 1", description: "Flashcard grammar ringkas untuk review cepat.", action: "Ulangi" },
  { chapter: "Chapter 2", title: "Kosakata Chapter 2", description: "Kosakata lanjutan untuk chapter berikutnya pada level aktif.", action: "Mulai" },
];

export function FlashcardCollection() {
  const membership = parseMembership(useSearchParams().get("membership") ?? undefined);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua Deck");
  const paid = membership !== "free";
  const query = `?membership=${membership}`;
  const visible = decks.filter((deck) => `${deck.chapter} ${deck.title}`.toLowerCase().includes(search.toLowerCase()) && (filter === "Semua Deck" || filter === "N5" || filter === deck.chapter || filter === "Perlu Diulang" && deck.action === "Ulangi"));
  const plan = membership === "free" ? "FREE • LIMITED" : membership === "lms" ? "BELAJAR MANDIRI" : "SENSEI";
  return <div className="supporting-shell student-shell"><StudentNavigation membership={membership} current="flashcards" /><main className="supporting-main flashcard-collection"><header><div><p className="dash-kicker">KUMPULAN FLASHCARD</p><h1>Hafalkan kosakata tanpa membuka Journey satu per satu</h1><p>{paid ? "Semua deck pada level dan membership aktif dapat dipelajari langsung." : "Deck yang tersedia mengikuti chapter dan membership aktif."} Progress serta jumlah kartu berasal dari backend.</p></div><span>{plan}</span></header><section className="flashcard-metrics">{[["KARTU DIPELAJARI","—","Progress tersimpan"],["PERLU DIULANG","—","Berdasarkan confidence"],["DECK SELESAI","—","Dari backend"],["STREAK FLASHCARD","—","Hari aktif"]].map(([label,value,note]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{note}</span></article>)}</section><label className="flashcard-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari deck, chapter, atau kosakata" /></label><div className="flashcard-filters">{["Semua Deck","N5","Chapter 1","Perlu Diulang"].map((item) => <button className={filter === item ? "active" : ""} type="button" onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><section className="flashcard-decks"><header><div><h2>Deck yang dapat dipelajari</h2><p>{membership === "free" ? "Free Member hanya mendapat deck dari chapter yang sudah terbuka." : membership === "lms" ? "Belajar Mandiri mendapatkan seluruh deck yang termasuk level dan membership aktif." : "Belajar dengan Sensei mendapatkan seluruh deck pada level dan membership aktif."}</p></div><span>{paid ? "FULL ACCESS" : "1 CHAPTER AKTIF"}</span></header><div>{visible.map((deck) => { const locked = !paid && deck.chapter === "Chapter 2"; return <article className={locked ? "locked" : ""} key={deck.title}><small>JLPT N5 • {deck.chapter.toUpperCase()}</small><b>{locked ? "TERKUNCI" : "TERSEDIA"}</b><h2>{deck.title}</h2><p>{locked ? "Deck berikutnya mengikuti akses chapter dan membership." : deck.description}</p><span>{locked ? "Buka chapter atau upgrade untuk mengakses." : "Progress dan confidence diperbarui otomatis."}</span>{locked ? <span className="flashcard-deck-locked">Terkunci</span> : <Link href={`/learn/n4/${membership === "free" ? "chapter-1" : "chapter-4"}/flashcards${query}`}>{deck.action}</Link>}</article>; })}</div></section><aside className="flashcard-access"><div><h2>{membership === "free" ? "Akses Free Member" : membership === "lms" ? "Akses Belajar Mandiri" : "Akses Belajar dengan Sensei"}</h2><p>{membership === "free" ? "Deck chapter berikutnya tetap ditampilkan sebagai locked card. Upgrade membership tidak menghapus progress yang sudah tersimpan." : "Semua deck pada level aktif tersedia. Progress, confidence, dan rekomendasi pengulangan disimpan oleh backend."}</p></div><Link href={membership === "free" ? `/program/n4${query}` : `/progress${query}`}>{membership === "free" ? "Lihat Membership" : "Lihat Progress"}</Link></aside></main></div>;
}
