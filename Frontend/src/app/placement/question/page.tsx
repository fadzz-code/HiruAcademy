"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuCheck, LuClock, LuVolume2 } from "react-icons/lu";
import { placementQuestions } from "@/lib/public-mock";
import { usePublishedPlacement } from "@/lib/placement-store";

const storageKey = "hiru-placement-answers";

function PlacementQuestionRunner({ totalSeconds }: { totalSeconds: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const target = searchParams.get("target") || "";

  const { config: publishedConfig } = usePublishedPlacement();

  const questions = useMemo(() => {
    if (publishedConfig?.questions && publishedConfig.questions.length > 0) {
      return publishedConfig.questions.map((q) => ({
        number: q.number,
        area: q.area,
        prompt: q.prompt,
        answers: q.options.map((opt) => opt.text),
        correctAnswer: q.options.find((opt) => opt.isCorrect)?.text || "",
      }));
    }
    return placementQuestions;
  }, [publishedConfig]);

  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    if (typeof window === "undefined") return {};
    const saved = sessionStorage.getItem(storageKey);
    if (!saved) return {};
    try {
      const parsed: unknown = JSON.parse(saved);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<number, string>)
        : {};
    } catch {
      sessionStorage.removeItem(storageKey);
      return {};
    }
  });

  const question = questions[index] || questions[0];

  const finishTest = useCallback(() => {
    const qs = searchParams ? searchParams.toString() : "";
    router.push(qs ? `/placement/result?${qs}` : "/placement/result");
  }, [router, searchParams]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      finishTest();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, finishTest]);

  function selectAnswer(answer: string) {
    const next = { ...answers, [question.number]: answer };
    setAnswers(next);
    sessionStorage.setItem(storageKey, JSON.stringify(next));
  }

  function nextQuestion() {
    if (index === questions.length - 1) {
      finishTest();
    } else {
      setIndex(index + 1);
    }
  }

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const isUrgent = secondsLeft < 60;

  return (
    <main className="placement-assessment">
      <header className="assessment-topbar placement-topbar-custom">
        <div className="placement-topbar-left">
          <strong>PLACEMENT TEST</strong>
          {target && <span className="placement-target-badge">Target: {target}</span>}
          {name && <span className="placement-name-badge">{name}</span>}
        </div>

        <div
          className={`placement-timer-widget ${isUrgent ? "urgent" : ""}`}
          role="timer"
          aria-label={`Waktu tersisa: ${timeFormatted}`}
        >
          <LuClock className="timer-icon" aria-hidden="true" />
          <span className="timer-title">Sisa Waktu</span>
          <strong className="timer-clock">{timeFormatted}</strong>
        </div>

        <div className="placement-topbar-right" aria-hidden="true" />
      </header>

      <div className="assessment-layout">
        <section className="question-card placement-card-custom">
          <div className="question-header-row">
            <span className="question-area-badge">{question.area}</span>
            <span className="question-number-pill">Soal {question.number}/{questions.length}</span>
          </div>

          <h1 className="placement-question-prompt">{question.prompt}</h1>

          {question.area === "Choukai" && (
            <div className="placement-audio-hint" role="note">
              <span className="audio-icon" aria-hidden="true"><LuVolume2 /></span>
              <div>
                <strong>Soal Menyimak (Choukai)</strong>
                <small>Dengarkan audio dan baca pertanyaan dengan teliti sebelum memilih jawaban.</small>
              </div>
            </div>
          )}

          <fieldset className="placement-answers-group">
            <legend className="sr-only">Pilih satu jawaban</legend>
            {question.answers.map((answer, i) => {
              const isSelected = answers[question.number] === answer;
              const optionKey = String.fromCharCode(65 + i);
              return (
                <label className={`placement-option ${isSelected ? "selected" : ""}`} key={answer}>
                  <input
                    checked={isSelected}
                    name={`question-${question.number}`}
                    onChange={() => selectAnswer(answer)}
                    type="radio"
                  />
                  <span className="option-badge">{optionKey}</span>
                  <span className="option-text">{answer}</span>
                  {isSelected && <span className="option-selected-check" aria-hidden="true"><LuCheck /></span>}
                </label>
              );
            })}
          </fieldset>

          <div className="runner-actions placement-actions-custom">
            <button
              type="button"
              className="button button-dark runner-prev-btn"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
              hidden={index === 0}
            >
              <LuArrowLeft aria-hidden="true" /> Sebelumnya
            </button>
            <button
              type="button"
              className="button button-primary runner-next-btn"
              disabled={!answers[question.number]}
              onClick={nextQuestion}
            >
              {index === questions.length - 1 ? "Selesaikan Test" : "Lanjut Soal"}{" "}
              <LuArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function PlacementQuestionPage() {
  const { config: publishedConfig } = usePublishedPlacement();
  const totalSeconds = (publishedConfig?.durationMinutes || 5) * 60;

  return (
    <Suspense fallback={<div style={{ padding: "80px", textAlign: "center", color: "var(--muted)" }}>Memuat soal placement...</div>}>
      <PlacementQuestionRunner key={totalSeconds} totalSeconds={totalSeconds} />
    </Suspense>
  );
}
