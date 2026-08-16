"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FlashcardItem } from "@/lib/learning-mock";
import type { Membership } from "@/lib/dashboard-mock";

export function FlashcardSession({ cards, membership, level, chapter }: { cards: FlashcardItem[]; membership: Membership; level: string; chapter: string }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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

  return (
    <div className="flashcard-session">
      <header className="flashcard-head"><div><Link href={`/learn/${level}/${chapter}?membership=${membership}`}>← Ringkasan Chapter</Link><p className="dash-kicker">Flashcard · data contoh</p><h1>Kosakata pondasi</h1></div><div className="flash-progress"><span>Kartu {index + 1} dari {cards.length}</span><i><b style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></i></div></header>

      <div ref={surfaceRef} className="flashcard-surface" role="button" tabIndex={0} onClick={toggleCard} onKeyDown={(event) => { if (event.key === "Enter") toggleCard(); if (event.key === " ") { event.preventDefault(); toggleCard(); } }} aria-pressed={flipped}>
        {flipped ? <div className="flash-face flash-back"><span className="back-word"><small>Arti</small><strong>{card.meaning}</strong></span><span className="example-block"><small>Contoh kalimat</small><span className="example-japanese">{card.example.before}<ruby>{card.example.focus}<rt>{card.example.focusReading}</rt></ruby>{card.example.after}</span><em>{card.example.translation}</em></span></div> : <div className="flash-face flash-front"><small>Japanese</small><ruby>{card.term}<rt>{card.reading}</rt></ruby></div>}
      </div>

      <div className="flash-controls"><button type="button" onClick={() => move(-1)} disabled={index === 0}><span aria-hidden="true">←</span> Sebelumnya</button><button className="flip-control" type="button" onClick={toggleCard}>{flipped ? "Lihat Depan" : "Balik Kartu"}</button><button type="button" onClick={() => move(1)} disabled={index === cards.length - 1}>Berikutnya <span aria-hidden="true">→</span></button></div>

    </div>
  );
}
