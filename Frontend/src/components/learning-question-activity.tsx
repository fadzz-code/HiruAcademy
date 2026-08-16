"use client";

import Link from "next/link";
import { useState } from "react";
import type { LearningData, LearningQuestion } from "@/lib/learning-mock";

export function LearningQuestionActivity({ data, variant }: { data: LearningData; variant: "audio" | "reading" }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [japaneseMode, setJapaneseMode] = useState<"professional" | "beginner">("professional");
  const question: LearningQuestion = variant === "audio" ? data.audioQuestion : data.readingQuestion;
  const basePath = `/learn/${data.levelSlug}/${data.chapterSlug}`;
  const query = `?membership=${data.membership}`;
  const isAudio = variant === "audio";
  return <div className="learning-question-page">
    <header className="learning-question-head"><p className="dash-kicker">{data.level} • CHAPTER {data.chapterNumber} • {isAudio ? "AUDIO QUESTION" : "READING QUESTION"}</p><h1>{isAudio ? "Dengarkan percakapan dan pilih jawaban yang tepat" : "Baca teks pendek lalu jawab pertanyaan"}</h1><p>{isAudio ? "Audio dapat diputar ulang sesuai konfigurasi soal." : "Teks Jepang Profesional dapat memiliki state Jepang Pemula pada implementasi."}</p></header>
    <div className="learning-question-layout"><main>
      {isAudio ? <section className="audio-player" aria-label="Audio fixture"><button type="button" aria-label="Putar audio">❚❚</button><div><strong>Percakapan tentang rutinitas pagi</strong><span>01:12 / 02:14</span></div></section> : <><div className="japanese-mode-control" role="group" aria-label="Mode tampilan Jepang"><button type="button" aria-pressed={japaneseMode === "professional"} onClick={() => setJapaneseMode("professional")}>Jepang Profesional</button><button type="button" aria-pressed={japaneseMode === "beginner"} onClick={() => setJapaneseMode("beginner")}>Jepang Pemula</button></div><section className={`reading-passage mode-${japaneseMode}`}><p className="dash-kicker">TEKS BACAAN</p><p lang="ja">{data.readingPassage}</p>{japaneseMode === "beginner" && <span>Jepang Pemula aktif. Teks asli tetap digunakan karena transformasi konten mengikuti konfigurasi materi.</span>}</section></>}
      <section className="learning-question-card"><p className="dash-kicker">SOAL 1 DARI {question.questionCount}</p><h2>{question.prompt}</h2>{question.instruction && <p>{question.instruction}</p>}<fieldset><legend className="sr-only">Pilihan jawaban</legend>{question.answers.map((answer, index) => <label className={selectedAnswer === answer ? "selected" : ""} key={answer}><input type="radio" name="answer" checked={selectedAnswer === answer} onChange={() => setSelectedAnswer(answer)} /><span>{String.fromCharCode(65 + index)}. {answer}</span></label>)}</fieldset></section>
      <div className="learning-question-actions"><Link className="button button-secondary" href={`${basePath}/${isAudio ? "flashcards" : "audio"}${query}`}>← Kembali {isAudio ? "Flashcard" : "Audio"}</Link>{isAudio ? <Link className="button button-dark" href={`${basePath}/reading${query}`}>Lanjut Reading →</Link> : <Link className="button button-dark" href={`${basePath}/checkpoint${query}`}>Lanjut Checkpoint →</Link>}</div>
    </main><aside className="learning-question-sidebar"><section><p className="dash-kicker">{isAudio ? "Audio" : "Reading"} Progress</p><strong>1 dari {question.questionCount} soal</strong></section><nav aria-label="Navigasi soal"><span>Navigasi soal</span><div>{Array.from({ length: question.questionCount }, (_, index) => <button type="button" className={index === 0 ? "active" : ""} disabled={index !== 0} key={index}>{index + 1}</button>)}</div></nav><section className="learning-question-info"><strong>{isAudio ? "Informasi" : "Pengumuman"}</strong><p>Jawaban dapat diubah sebelum assessment diselesaikan.</p></section></aside></div>
  </div>;
}
