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
    if (!saved) return {};
    try {
      const parsed: unknown = JSON.parse(saved);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<number, string> : {};
    } catch {
      sessionStorage.removeItem(storageKey);
      return {};
    }
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

  return (
    <main className="placement-assessment">
      <header className="assessment-topbar">
        <strong>PLACEMENT TEST</strong>
        <span>Soal {question.number} dari 20</span>
      </header>
      <div className="assessment-layout">
        <section className="question-card">
          <h1>{question.prompt}</h1>
          <div className="question-media" role="img" aria-label="Media soal">
            <strong>{question.area === "Moji・Goi" ? "文" : question.area === "Choukai" ? "聴" : "問"}</strong>
          </div>
          <fieldset>
            <legend className="sr-only">Pilih jawaban</legend>
            {question.answers.map((answer) => (
              <label className={answers[question.number] === answer ? "selected" : ""} key={answer}>
                <input
                  checked={answers[question.number] === answer}
                  name={`question-${question.number}`}
                  onChange={() => selectAnswer(answer)}
                  type="radio"
                />
                {answer}
              </label>
            ))}
          </fieldset>
          <div className="runner-actions">
            <button
              type="button"
              className="button button-dark"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              Sebelumnya
            </button>
            <button
              type="button"
              className="button button-primary"
              disabled={!answers[question.number]}
              onClick={nextQuestion}
            >
              {index === placementQuestions.length - 1 ? "Lihat Hasil" : "Lanjut"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
