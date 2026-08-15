"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { placementQuestions } from "@/lib/public-mock";

const storageKey = "hiru-placement-answers";

export default function PlacementQuestionPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    if (typeof window === "undefined") return {};
    const saved = sessionStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  });
  const question = placementQuestions[index];

  function selectAnswer(answer: string) {
    const next = { ...answers, [question.number]: answer };
    setAnswers(next);
    sessionStorage.setItem(storageKey, JSON.stringify(next));
  }

  function nextQuestion() {
    if (index === placementQuestions.length - 1) {
      router.push("/placement/result");
    } else {
      setIndex(index + 1);
    }
  }

  return <main className="placement-assessment"><header className="assessment-topbar"><strong>PLACEMENT TEST</strong><span>Soal {question.number} dari 20</span><b>In Progress</b></header><div className="assessment-layout"><aside className="assessment-progress"><span className="assessment-dots" aria-hidden="true">—</span><h2>Progress tes</h2><strong>{question.number} / 20</strong><i><b style={{ width: `${question.number * 5}%` }} /></i><p>Progress dari backend</p><small>Jenis soal dapat mencakup teks, gambar, audio, atau reading.</small><small>Timer aktif bila dikonfigurasi</small></aside><section className="question-card"><p className="kicker">SOAL {String(question.number).padStart(2, "0")} / 20 • {question.area.toUpperCase()}</p><h1>{question.prompt}</h1><div className="question-media" role="img" aria-label="Ilustrasi contoh media soal"><strong>{question.area === "Moji Goi" ? "文" : question.area === "Choukai" ? "聴" : "問"}</strong><small>Gambar dapat diperbesar • Alt text tersedia</small></div><fieldset><legend className="sr-only">Pilih jawaban</legend>{question.answers.map((answer) => <label className={answers[question.number] === answer ? "selected" : ""} key={answer}><input checked={answers[question.number] === answer} name={`question-${question.number}`} onChange={() => selectAnswer(answer)} type="radio" />{answer}</label>)}</fieldset><div className="runner-actions"><button type="button" className="button button-dark" disabled={index === 0} onClick={() => setIndex(index - 1)}>Sebelumnya</button><button type="button" className="button button-primary" disabled={!answers[question.number]} onClick={nextQuestion}>{index === 19 ? "Lihat Hasil" : "Lanjut"}</button></div></section><aside className="assessment-tips"><h2>Tips menjawab</h2><ul><li>Baca instruksi sebelum memilih jawaban.</li><li>Gunakan audio player sampai selesai bila tersedia.</li><li>Jawaban dapat diubah sebelum lanjut.</li></ul></aside></div></main>;
}
