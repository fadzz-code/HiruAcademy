"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FlashcardItem } from "@/lib/learning-mock";
import type { Membership } from "@/lib/dashboard-mock";

export function FlashcardSession({ cards, membership, level, chapter }: { cards: FlashcardItem[]; membership: Membership; level: string; chapter: string }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const card = cards[index];

  function toggleCard() {
    if (isAnimating) return;
    setIsAnimating(true);
    surfaceRef.current?.classList.add("is-flipping");
    flipTimer.current = setTimeout(() => setFlipped((current) => !current), 175);
  }

  function move(direction: -1 | 1) {
    setIndex((value) => Math.min(cards.length - 1, Math.max(0, value + direction)));
    setFlipped(false);
    setIsAnimating(false);
    surfaceRef.current?.classList.remove("is-flipping");
  }

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const element = surface;
    function handleAnimationEnd(event: AnimationEvent) {
      if (event.animationName !== "flashcard-flip") return;
      element.classList.remove("is-flipping");
      requestAnimationFrame(() => setIsAnimating(false));
    }
    element.addEventListener("animationend", handleAnimationEnd);
    return () => element.removeEventListener("animationend", handleAnimationEnd);
  }, [index]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setIndex((value) => Math.max(0, value - 1));
        setFlipped(false);
      }
      if (event.key === "ArrowRight") {
        setIndex((value) => Math.min(cards.length - 1, value + 1));
        setFlipped(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cards.length]);

  if (completed) return <div className="flashcard-complete"><header><p className="dash-kicker">FLASHCARD SELESAI</p><h1>Deck Chapter 4 sudah ditinjau</h1><p>Kartu yang sulit dapat diulang sebelum melanjutkan ke Audio Question.</p></header><section className="flashcard-complete-summary"><div><ruby>日本語<rt>にほんご</rt></ruby><span>Klik untuk melihat arti</span></div><div><strong>20 kartu selesai</strong><p>Sebagian besar kartu sudah dipahami. Ulangi kartu yang ditandai Sulit sebelum checkpoint.</p></div></section><section className="flashcard-confidence-summary">{[["13","Mudah"],["5","Sulit"],["2","Ulangi"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section><div className="flashcard-complete-actions"><button type="button" onClick={() => { setRetrying(true); setIndex(0); setFlipped(false); setCompleted(false); }}>Ulangi Kartu Sulit</button><Link href={`/learn/${level}/${chapter}/audio?membership=${membership}`}>Lanjut Audio Question</Link><Link href={`/flashcards?membership=${membership}`}>Kembali ke Kumpulan</Link></div><section className="flashcard-difficult"><h2>Kartu yang perlu diulang</h2><div>{cards.slice(0, 3).map((item) => <article key={item.id}><ruby>{item.term}<rt>{item.reading}</rt></ruby><span>Klik untuk melihat arti</span></article>)}</div></section><aside><strong>✓ Pengumuman</strong><p>Progress deck disimpan. Lanjutkan ke Audio Question atau ulangi kartu sulit.</p></aside></div>;

  return (
    <div className="flashcard-session">
      <header className="flashcard-head"><div><Link href={`/flashcards?membership=${membership}`}>Kembali ke Kumpulan</Link><p className="dash-kicker">{level.toUpperCase()} • CHAPTER {chapter.replace("chapter-", "")} • FLASHCARD</p><h1>Ulangi kosakata dan pola penting</h1><p>Balik kartu, pilih tingkat keyakinan, lalu lanjutkan sampai seluruh deck selesai.</p></div><div className="flash-progress"><span>Deck Chapter 4</span><strong>{index + 1} dari {cards.length} kartu</strong><i><b style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></i></div></header><section className="flashcard-session-context"><div>{[["語","Kosakata","8 kartu"],["文","Pola Kalimat","7 kartu"],["字","Kanji","5 kartu"]].map(([icon,label,count]) => <article key={label}><span>{icon}</span><strong>{label}</strong><small>{count}</small></article>)}</div><aside><strong>Tips mengulang</strong><span>Ucapkan kata sebelum membalik kartu.</span><span>Baca contoh kalimat setelah melihat arti.</span><span>Pilih Ulangi bila belum yakin.</span><b>★ XP Mingguan　— XP</b></aside></section>

      <p className="flash-instruction">Klik kartu untuk melihat arti dan contoh.</p><div ref={surfaceRef} className="flashcard-surface" role="button" tabIndex={0} onClick={toggleCard} onKeyDown={(event) => { if (event.key === "Enter") toggleCard(); if (event.key === " ") { event.preventDefault(); toggleCard(); } }} aria-pressed={flipped}>
        {flipped ? <div className="flash-face flash-back"><span className="back-word"><small>Arti</small><strong>{card.meaning}</strong></span><span className="example-block"><small>Contoh kalimat</small><span className="example-japanese">{card.example.before}<ruby>{card.example.focus}<rt>{card.example.focusReading}</rt></ruby>{card.example.after}</span><em>{card.example.translation}</em></span></div> : <div className="flash-face flash-front"><small>Japanese</small><ruby>{card.term}<rt>{card.reading}</rt></ruby></div>}
      </div>

      <div className="flash-controls"><button type="button" onClick={() => move(-1)} disabled={index === 0}><span aria-hidden="true">←</span> Sebelumnya</button><button className="flip-control" type="button" onClick={toggleCard}>{flipped ? "Lihat Depan" : "Balik Kartu"}</button><button type="button" onClick={() => move(1)} disabled={index === cards.length - 1}>Berikutnya <span aria-hidden="true">→</span></button></div><div className="flashcard-confidence" role="group" aria-label="Tingkat keyakinan">{["Ulangi","Sulit","Mudah"].map((label) => <button type="button" onClick={() => index === cards.length - 1 ? setCompleted(true) : move(1)} key={label}>{label}</button>)}</div><button className="flashcard-finish" type="button" onClick={() => setCompleted(true)}>{retrying ? "Selesaikan Ulang Kartu Sulit" : "Lihat State Selesai"}</button>

    </div>
  );
}
