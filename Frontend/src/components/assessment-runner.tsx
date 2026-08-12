"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AssessmentConfig } from "@/lib/assessment-mock";
import type { Membership } from "@/lib/dashboard-mock";

type View = "runner" | "result" | "review";
type Answers = Record<string, string>;

export function AssessmentRunner({ config, membership }: { config: AssessmentConfig; membership: Membership }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [confirming, setConfirming] = useState(false);
  const [view, setView] = useState<View>("runner");
  const question = config.questions[current];
  const answered = Object.keys(answers).length;
  const correct = useMemo(() => config.questions.filter((item) => answers[item.id] === item.correctOptionId).length, [answers, config.questions]);

  if (view === "result") return <AssessmentResult config={config} answered={answered} correct={correct} onReview={() => setView("review")} membership={membership} />;
  if (view === "review") return <AssessmentReview config={config} answers={answers} onBack={() => setView("result")} />;

  return (
    <div className="assessment-page">
      <header className="assessment-header"><div><Link href={`/dashboard?membership=${membership}`}>← Dashboard</Link><p className="assessment-type">{config.type}</p><h1>{config.title}</h1><span>{config.context}</span></div><div className="assessment-timer" role="timer" aria-label={config.timerLabel}><small>{config.timerLabel}</small><strong>25:00</strong><span>Visual preview</span></div></header>
      <div className="assessment-notice"><span aria-hidden="true">i</span>{config.sampleLabel}. Jawaban tidak disimpan ke server.</div>
      <div className="assessment-layout">
        <main className="question-card"><div className="question-meta"><span>{question.section}</span><b>Pertanyaan {current + 1} dari {config.questions.length}</b></div><div className="question-progress"><i style={{ width: `${((current + 1) / config.questions.length) * 100}%` }} /></div><h2>{question.prompt}</h2>{question.japanese && <div className="question-japanese"><ruby>{question.japanese.text}<rt>{question.japanese.reading}</rt></ruby></div>}<fieldset className="answer-options"><legend>Pilih satu jawaban</legend>{question.options.map((option) => <label className={answers[question.id] === option.id ? "selected" : ""} key={option.id}><input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={() => setAnswers((value) => ({ ...value, [question.id]: option.id }))} /><span className="option-letter">{option.id.toUpperCase()}</span><span>{option.label}</span><i aria-hidden="true">✓</i></label>)}</fieldset><div className="question-actions"><button type="button" onClick={() => setCurrent((value) => Math.max(0, value - 1))} disabled={current === 0}>← Sebelumnya</button>{current < config.questions.length - 1 ? <button className="primary" type="button" onClick={() => setCurrent((value) => Math.min(config.questions.length - 1, value + 1))}>Berikutnya →</button> : <button className="submit" type="button" onClick={() => setConfirming(true)}>Kirim jawaban</button>}</div></main>
        <aside className="question-sidebar"><div className="navigator-head"><div><small>Navigator soal</small><strong>{answered} terjawab</strong></div><span>{config.questions.length - answered} belum</span></div><div className="question-navigator">{config.questions.map((item, index) => <button className={`${index === current ? "current" : ""}${answers[item.id] ? " answered" : ""}`} type="button" onClick={() => setCurrent(index)} aria-label={`Buka pertanyaan ${index + 1}${answers[item.id] ? ", sudah dijawab" : ""}`} aria-current={index === current ? "step" : undefined} key={item.id}>{index + 1}</button>)}</div><div className="navigator-legend"><span><i className="legend-current" />Aktif</span><span><i className="legend-answered" />Terjawab</span><span><i />Belum</span></div><button className="sidebar-submit" type="button" onClick={() => setConfirming(true)}>{config.submitLabel ?? "Selesaikan Try Out"}</button></aside>
      </div>
      {confirming && <div className="assessment-modal" role="presentation"><div className="modal-backdrop" onClick={() => setConfirming(false)} /><section role="dialog" aria-modal="true" aria-labelledby="submit-title"><span className="modal-icon" aria-hidden="true">送</span><h2 id="submit-title">Kirim jawaban sekarang?</h2><p>Preview akan menampilkan hasil dari jawaban yang dipilih. Data tidak dikirim atau disimpan ke server.</p><div className="modal-summary"><span>Terjawab <b>{answered}</b></span><span>Belum dijawab <b>{config.questions.length - answered}</b></span></div><div className="modal-actions"><button type="button" onClick={() => setConfirming(false)}>Periksa kembali</button><button className="primary" type="button" onClick={() => { setConfirming(false); setView("result"); }}>Kirim preview</button></div></section></div>}
    </div>
  );
}

function AssessmentResult({ config, answered, correct, onReview, membership }: { config: AssessmentConfig; answered: number; correct: number; onReview: () => void; membership: Membership }) {
  const score = Math.round((correct / config.questions.length) * 100);
  const passing = config.passingScore === undefined ? null : score >= config.passingScore;
  return <div className="assessment-result"><header><p className="assessment-type">Hasil preview</p><h1>{config.completionLabel ?? "Try Out selesai"}</h1><p>Ringkasan ini memakai jawaban lokal dan bukan skor produksi.</p></header><section className="result-grid"><article className="score-card"><span className="score-ring"><strong>{score}</strong><small>score contoh</small></span><h2>{passing === null ? "Jawaban sesuai kunci mock" : passing ? "LULUS" : "TIDAK LULUS"}</h2><p>{passing === null ? "Tidak ada status lulus karena passing score belum dikonfigurasi." : `Passing score mock ${config.passingScore}.`}</p></article><article className="result-detail"><div><span>Jawaban terisi</span><strong>{answered} / {config.questions.length}</strong></div><div><span>Jawaban sesuai</span><strong>{correct}</strong></div><div><span>Review</span><strong>{config.reviewEnabled ? "Tersedia" : "Tidak tersedia"}</strong></div><div><span>Timer</span><strong>Visual only</strong></div></article></section><section className="result-note"><span aria-hidden="true">灯</span><div><h2>Gunakan hasil sebagai preview tampilan.</h2><p>Skor, breakdown, rekomendasi, dan aturan hasil final harus berasal dari konfigurasi serta backend.</p></div></section><div className="result-actions"><Link href={config.returnHref ?? `/dashboard?membership=${membership}`}>Kembali</Link>{config.reviewEnabled && <button type="button" onClick={onReview}>Review jawaban →</button>}</div></div>;
}

function AssessmentReview({ config, answers, onBack }: { config: AssessmentConfig; answers: Answers; onBack: () => void }) {
  return <div className="assessment-review"><header><button type="button" onClick={onBack}>← Kembali ke hasil</button><p className="assessment-type">Review jawaban</p><h1>Lihat pembahasan contoh</h1><p>Status benar/salah memakai ikon dan teks, bukan warna saja.</p></header><section>{config.questions.map((question, index) => { const selected = answers[question.id]; const isCorrect = selected === question.correctOptionId; return <article className={isCorrect ? "review-correct" : "review-incorrect"} key={question.id}><div className="review-status"><span aria-hidden="true">{isCorrect ? "✓" : "×"}</span><strong>{isCorrect ? "Jawaban benar" : selected ? "Jawaban belum tepat" : "Tidak dijawab"}</strong><small>Pertanyaan {index + 1}</small></div><h2>{question.prompt}</h2>{question.japanese && <ruby className="review-japanese">{question.japanese.text}<rt>{question.japanese.reading}</rt></ruby>}<div className="review-answer"><span>Jawabanmu</span><b>{question.options.find((item) => item.id === selected)?.label ?? "Tidak ada jawaban"}</b></div><div className="review-answer correct"><span>Jawaban contoh</span><b>{question.options.find((item) => item.id === question.correctOptionId)?.label}</b></div><p>{question.explanation}</p></article>; })}</section></div>;
}
