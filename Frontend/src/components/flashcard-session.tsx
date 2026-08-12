"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FlashcardItem } from "@/lib/learning-mock";
import type { Membership } from "@/lib/dashboard-mock";

export function FlashcardSession({ cards, membership, level, chapter }: { cards: FlashcardItem[]; membership: Membership; level: string; chapter: string }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];

  function move(direction: -1 | 1) {
    setIndex((value) => Math.min(cards.length - 1, Math.max(0, value + direction)));
    setFlipped(false);
  }

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

      <p className="flash-instruction" id="flip-instruction">Ketuk kartu atau tekan Enter/Spasi untuk melihat jawabannya.</p>
      <button className={`flashcard-canvas${flipped ? " is-flipped" : ""}`} type="button" onClick={() => setFlipped((value) => !value)} aria-pressed={flipped} aria-describedby="flip-instruction">
        <span className="flashcard-inner">
          <span className="flash-face flash-front"><small>Japanese</small><ruby>{card.term}<rt>{card.reading}</rt></ruby><span className="flip-hint">Balik kartu <b aria-hidden="true">↻</b></span></span>
          <span className="flash-face flash-back"><span className="back-word"><ruby>{card.term}<rt>{card.reading}</rt></ruby><strong>{card.meaning}</strong></span><span className="example-block"><small>Contoh kalimat</small><span className="example-japanese">{card.example.before}<ruby>{card.example.focus}<rt>{card.example.focusReading}</rt></ruby>{card.example.after}</span><em>{card.example.translation}</em></span><span className="flip-hint">Kembali ke depan <b aria-hidden="true">↻</b></span></span>
        </span>
      </button>

      <div className="flash-controls"><button type="button" onClick={() => move(-1)} disabled={index === 0}><span aria-hidden="true">←</span> Sebelumnya</button><button className="flip-control" type="button" onClick={() => setFlipped((value) => !value)}><span aria-hidden="true">↻</span>{flipped ? "Lihat depan" : "Balik kartu"}</button><button type="button" onClick={() => move(1)} disabled={index === cards.length - 1}>Berikutnya <span aria-hidden="true">→</span></button></div>
      <p className="flash-keyboard">Keyboard: <kbd>←</kbd> kartu sebelumnya · <kbd>→</kbd> kartu berikutnya · <kbd>Enter</kbd> balik kartu</p>
    </div>
  );
}
