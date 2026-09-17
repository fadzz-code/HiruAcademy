"use client";

import Link from "next/link";
import { useState } from "react";
import type { LearningData } from "@/lib/learning-mock";

export function ChapterCheckpoint({ data }: { data: LearningData }) {
  const [completed, setCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fallbackAnswer, setFallbackAnswer] = useState<string>();

  const basePath = `/learn/${data.levelSlug}/${data.chapterSlug}`;
  const query = `?membership=${data.membership}`;

  const dynamicQuestions = data.checkpointQuestions;
  const hasDynamic = Boolean(dynamicQuestions && dynamicQuestions.length > 0);
  const totalQuestions = hasDynamic && dynamicQuestions ? dynamicQuestions.length : 10;
  const currentQuestion = hasDynamic && dynamicQuestions ? dynamicQuestions[currentIndex] : null;

  let correctCount = 0;
  if (hasDynamic && dynamicQuestions) {
    dynamicQuestions.forEach((q) => {
      const selectedOptId = answers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (correctOpt && selectedOptId === correctOpt.id) {
        correctCount++;
      }
    });
  }
  const calculatedScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const scoreDisplay = hasDynamic ? `${calculatedScore}` : "—";
  const correctDisplay = hasDynamic ? `${correctCount}/${totalQuestions}` : "—";

  if (completed) {
    return (
      <section className="checkpoint-result">
        <p className="dash-kicker">CHECKPOINT • RESULT</p>
        <h1>Checkpoint Chapter {data.chapterNumber} selesai</h1>
        <span className="checkpoint-completed">Completed</span>
        <div className="checkpoint-result-stats">
          <div>
            <span>Skor</span>
            <strong>{scoreDisplay}</strong>
          </div>
          <div>
            <span>Jawaban benar</span>
            <strong>{correctDisplay}</strong>
          </div>
          <div>
            <span>Durasi</span>
            <strong>—</strong>
          </div>
        </div>
        <section>
          <p className="dash-kicker">Pemahaman materi</p>
          <div className="checkpoint-breakdown">
            <div>
              <span>Tata Bahasa</span>
              <strong>Selesai</strong>
            </div>
            <div>
              <span>Huruf &amp; Kanji</span>
              <strong>Selesai</strong>
            </div>
            <div>
              <span>Audio &amp; Reading</span>
              <strong>Selesai</strong>
            </div>
          </div>
        </section>
        <section className="checkpoint-recommendation">
          <p className="dash-kicker">REKOMENDASI</p>
          <p>
            Review area dengan confidence rendah sebelum melanjutkan chapter berikutnya. Hasil evaluasi
            tersimpan di riwayat belajar.
          </p>
        </section>
        <div className="learning-question-actions">
          <Link className="button button-dark" href={`/journey/${data.levelSlug}${query}`}>
            Kembali ke Journey
          </Link>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              setCompleted(false);
              setCurrentIndex(0);
              setAnswers({});
              setFallbackAnswer(undefined);
            }}
          >
            Ulangi Latihan
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="learning-question-page checkpoint-page">
      <header className="learning-question-head">
        <p className="dash-kicker">
          {data.level} • CHAPTER {data.chapterNumber} • CHECKPOINT
        </p>
        <h1>Uji pemahaman sebelum melanjutkan journey</h1>
        <p>Checkpoint menggabungkan materi video, dua modul, flashcard, audio, dan reading.</p>
      </header>
      <div className="learning-question-layout">
        <main>
          <section className="checkpoint-timer">
            <span>Waktu tersisa</span>
            <strong>08:24</strong>
          </section>

          <section className="learning-question-card">
            <p className="dash-kicker">
              SOAL {currentIndex + 1} DARI {totalQuestions}
            </p>
            {hasDynamic && currentQuestion ? (
              <>
                <h2>{currentQuestion.prompt}</h2>
                <fieldset>
                  <legend className="sr-only">Pilihan jawaban</legend>
                  {currentQuestion.options.map((opt, index) => {
                    const isChecked = answers[currentQuestion.id] === opt.id;
                    return (
                      <label className={isChecked ? "selected" : ""} key={opt.id}>
                        <input
                          type="radio"
                          name={`checkpoint-answer-${currentQuestion.id}`}
                          checked={isChecked}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt.id }))
                          }
                        />
                        <span>
                          {String.fromCharCode(65 + index)}. {opt.text}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              </>
            ) : (
              <>
                <h2>Pilih arti yang tepat untuk kata berikut:</h2>
                <p className="checkpoint-word">
                  <ruby>
                    毎朝<rt>まいあさ</rt>
                  </ruby>
                </p>
                <fieldset>
                  <legend className="sr-only">Pilihan jawaban</legend>
                  {["Setiap pagi", "Setiap malam", "Minggu depan", "Kemarin"].map(
                    (answer, index) => (
                      <label className={fallbackAnswer === answer ? "selected" : ""} key={answer}>
                        <input
                          type="radio"
                          name="checkpoint-answer"
                          checked={fallbackAnswer === answer}
                          onChange={() => setFallbackAnswer(answer)}
                        />
                        <span>
                          {String.fromCharCode(65 + index)}. {answer}
                        </span>
                      </label>
                    )
                  )}
                </fieldset>
              </>
            )}
          </section>

          <div className="learning-question-actions">
            {currentIndex > 0 ? (
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              >
                ← Soal Sebelumnya
              </button>
            ) : (
              <Link className="button button-secondary" href={`${basePath}/reading${query}`}>
                ← Kembali Reading
              </Link>
            )}

            {hasDynamic && currentIndex < totalQuestions - 1 ? (
              <button
                className="button button-dark"
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              >
                Soal Berikutnya →
              </button>
            ) : (
              <button
                className="button button-dark"
                type="button"
                onClick={() => setCompleted(true)}
              >
                Selesaikan Checkpoint
              </button>
            )}
          </div>
        </main>

        <aside className="learning-question-sidebar">
          <section>
            <p className="dash-kicker">Checkpoint Progress</p>
            <strong>
              {currentIndex + 1} dari {totalQuestions} soal
            </strong>
          </section>
          <nav aria-label="Navigasi soal">
            <span>Navigasi soal</span>
            <div>
              {Array.from({ length: totalQuestions }, (_, index) => {
                const qId = hasDynamic && dynamicQuestions ? dynamicQuestions[index]?.id : null;
                const isAnswered = qId
                  ? Boolean(answers[qId])
                  : index === 0
                  ? Boolean(fallbackAnswer)
                  : false;
                return (
                  <button
                    type="button"
                    className={index === currentIndex ? "active" : isAnswered ? "answered" : ""}
                    onClick={() => setCurrentIndex(index)}
                    key={index}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </nav>
          <section className="learning-question-info">
            <strong>Informasi</strong>
            <p>Jawaban dapat diubah sebelum assessment diselesaikan.</p>
          </section>
          <section className="learning-question-info">
            <strong>Pengiriman Jawaban</strong>
            <p>Jawaban dikirim setelah checkpoint diselesaikan.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
