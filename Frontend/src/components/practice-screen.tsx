"use client";

import { useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuBookOpen, LuCheck, LuClock, LuFlame, LuLock, LuPlay, LuRotateCcw, LuTarget, LuVolume2 } from "react-icons/lu";
import { StudentNavigation } from "@/components/student-navigation";
import { canAccessPracticeLevel, defaultPracticeLevel, getPracticeQuestions, historyKey, levelHasCategories, practiceCategories, practiceKey, practiceLevels, progressKey, type PracticeCategory, type PracticeDraft, type PracticeHistory, type PracticeLevel } from "@/lib/practice-mock";
import type { Membership } from "@/lib/dashboard-mock";

type Step = "list" | "runner" | "result" | "review";

function readSession<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    sessionStorage.removeItem(key);
    return fallback;
  }
}

export function PracticeScreen({ membership }: { membership: Membership }) {
  const [level, setLevel] = useState<PracticeLevel>(() => defaultPracticeLevel(membership));
  const [category, setCategory] = useState<PracticeCategory>("Kosakata");
  const [exercise, setExercise] = useState(1);
  const [step, setStep] = useState<Step>("list");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [history, setHistory] = useState<PracticeHistory[]>(() => readSession(historyKey(membership), []));
  const [drafts, setDrafts] = useState<Record<string, PracticeDraft>>(() => readSession(progressKey(membership), {}));
  const questions = getPracticeQuestions();
  const activeCategory = levelHasCategories(level) ? category : undefined;
  const key = practiceKey(level, exercise, activeCategory);
  const current = questions[Math.min(questionIndex, Math.max(questions.length - 1, 0))];
  const latest = (item: number) => history.find((entry) => entry.level === level && entry.category === activeCategory && entry.exercise === item);

  const changeLevel = (value: PracticeLevel) => {
    setLevel(value);
    setCategory("Kosakata");
    setStep("list");
  };
  const start = (item: number) => {
    const nextKey = practiceKey(level, item, activeCategory);
    const draft = drafts[nextKey];
    setStep("runner");
    setExercise(item);
    setAnswers(draft?.answers ?? {});
    setQuestionIndex(Math.min(draft?.questionIndex ?? 0, questions.length - 1));
    setResult(null);
    setSecondsLeft(300);
    setStep("runner");
  };
  const saveAnswer = (answer: number) => {
    const nextAnswers = { ...answers, [current.id]: answer };
    const nextDrafts = { ...drafts, [key]: { key, answers: nextAnswers, questionIndex } };
    setAnswers(nextAnswers);
    setDrafts(nextDrafts);
    sessionStorage.setItem(progressKey(membership), JSON.stringify(nextDrafts));
  };
  const move = (nextIndex: number) => {
    const nextDrafts = { ...drafts, [key]: { key, answers, questionIndex: nextIndex } };
    setQuestionIndex(nextIndex);
    setDrafts(nextDrafts);
    sessionStorage.setItem(progressKey(membership), JSON.stringify(nextDrafts));
  };
  const submit = (submittedAt: number) => {
    const correct = questions.filter((question) => answers[question.id] === question.answer).length;
    const next = { score: Math.round(correct / questions.length * 100), correct, total: questions.length };
    const item: PracticeHistory = { id: `${submittedAt}`, level, category: activeCategory, exercise, ...next, at: new Date(submittedAt).toISOString() };
    const nextHistory = [item, ...history];
    const nextDrafts = { ...drafts };
    delete nextDrafts[key];
    setHistory(nextHistory);
    setDrafts(nextDrafts);
    setResult(next);
    sessionStorage.setItem(historyKey(membership), JSON.stringify(nextHistory));
    sessionStorage.setItem(progressKey(membership), JSON.stringify(nextDrafts));
    setStep("result");
  };
  useEffect(() => {
    if (step !== "runner" || secondsLeft === 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [step, secondsLeft]);
  const average = history.length ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length) : 0;
  const time = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return <div className="supporting-shell student-shell"><StudentNavigation membership={membership} /><main className="supporting-main practice-page practice-flow">
    <nav className="practice-breadcrumb" aria-label="Breadcrumb"><button type="button" onClick={() => setStep("list")}>Latihan Harian</button><span aria-hidden="true">›</span><button type="button" onClick={() => setStep("list")}>{level}</button>{activeCategory && <><span aria-hidden="true">›</span>{step === "list" ? <strong aria-current="page">{activeCategory}</strong> : <button type="button" onClick={() => setStep("list")}>{activeCategory}</button>}</>}{!activeCategory && step === "list" && <strong className="sr-only" aria-current="page">{level}</strong>}{step !== "list" && <><span aria-hidden="true">›</span>{step === "runner" ? <strong aria-current="page">Latihan {exercise}</strong> : <button type="button" onClick={() => setStep("runner")}>Latihan {exercise}</button>}</>}{(step === "result" || step === "review") && <><span aria-hidden="true">›</span>{step === "result" ? <strong aria-current="page">Hasil</strong> : <button type="button" onClick={() => setStep("result")}>Hasil</button>}</>}{step === "review" && <><span aria-hidden="true">›</span><strong aria-current="page">Lihat Jawaban</strong></>}</nav>
    <header className="practice-header"><div><h1>Latihan Harian</h1><p>“Tingkatkan kemampuan bahasa Jepang Anda hari ini.”</p></div><label>Pilih Level<select value={level} onChange={(event) => changeLevel(event.target.value as PracticeLevel)}>{practiceLevels.map((item) => <option key={item}>{item}</option>)}</select></label></header>
    {step === "list" && <>
      <section className="practice-summary" aria-label="Ringkasan Latihan"><article><LuBookOpen /><div><span>Total Latihan</span><strong>{history.length}</strong></div></article><article><LuTarget /><div><span>Rata-rata Skor</span><strong>{average}%</strong></div></article><article><LuFlame /><div><span>Streak Hari Ini</span><strong>{history.length ? 1 : 0} hari</strong></div></article></section>
      {levelHasCategories(level) && <nav className="practice-category-tabs" aria-label="Pilih Kategori">{practiceCategories.map((item) => <button type="button" aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</nav>}
      {!canAccessPracticeLevel(membership, level) ? <section className="practice-locked"><LuLock /><h2>Akses latihan terkunci</h2><p>Level ini belum termasuk dalam membership aktif.</p><a href={`/renewal?membership=${membership}`}>Upgrade</a></section> : <section className="practice-journey-list" aria-label="Daftar latihan">{[1, 2, 3, 4, 5].map((item) => { const score = latest(item); const draft = drafts[practiceKey(level, item, activeCategory)]; const status = score ? "Selesai" : draft ? "Dalam Progres" : "Belum Selesai"; return <article className={`practice-journey-card status-${status.toLowerCase().replace(" ", "-")}`} key={item}><div className="practice-journey-number">{String(item).padStart(2, "0")}</div><div className="practice-journey-copy"><div className="practice-journey-title"><h2>{level === "N5" ? "N5" : level} {activeCategory ? `| ${activeCategory} ` : ""}| Latihan {String(item).padStart(2, "0")}</h2><span className={`practice-status status-${status.toLowerCase().replace(" ", "-")}`}>{status}</span></div><p>3 Soal</p><div className="practice-last-score"><span>Skor</span><strong>{score ? `${score.score}%` : item === 1 ? "80%" : "65%"}</strong></div></div><div className="practice-journey-action"><button type="button" onClick={() => start(item)}>{score ? <LuRotateCcw /> : <LuPlay />}{score ? "Ulangi Latihan" : draft ? "Lanjutkan" : "Mulai Latihan"}</button></div></article>; })}</section>}
    </>}
    {step === "runner" && current && (
      <section className="practice-runner placement-assessment">
        <header className="assessment-topbar placement-topbar-custom">
          <div className="placement-topbar-left">
            <strong>LATIHAN HARIAN</strong>
            <span className="placement-target-badge">{level}</span>
            <span className="placement-name-badge">{activeCategory ?? `Latihan ${exercise}`}</span>
          </div>
          <div className="placement-timer-widget" role="timer" aria-label={`Waktu tersisa: ${time}`}>
            <LuClock className="timer-icon" aria-hidden="true" />
            <span className="timer-title">Sisa Waktu</span>
            <strong className="timer-clock">{time}</strong>
          </div>
        </header>
        <div className="assessment-layout">
          <section className="question-card placement-card-custom">
            <div className="question-header-row">
              <span className="question-area-badge">{activeCategory ?? "Latihan Umum"}</span>
              <span className="question-number-pill">Soal {questionIndex + 1}/{questions.length}</span>
            </div>
            <h1 className="placement-question-prompt">{current.prompt}</h1>
            {activeCategory === "Audio" && (
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
              {current.options.map((option, index) => {
                const isSelected = answers[current.id] === index;
                const optionKey = String.fromCharCode(65 + index);
                return (
                  <label className={`placement-option ${isSelected ? "selected" : ""}`} key={option}>
                    <input type="radio" name={current.id} checked={isSelected} onChange={() => saveAnswer(index)} />
                    <span className="option-badge">{optionKey}</span>
                    <span className="option-text">{option}</span>
                    {isSelected && <span className="option-selected-check" aria-hidden="true"><LuCheck /></span>}
                  </label>
                );
              })}
            </fieldset>
            <div className="runner-actions placement-actions-custom">
              {questionIndex > 0 && <button type="button" className="button button-dark runner-prev-btn" onClick={() => move(questionIndex - 1)}>
                <LuArrowLeft aria-hidden="true" /> Sebelumnya
              </button>}
              {questionIndex < questions.length - 1 ? (
                <button type="button" className="button button-primary runner-next-btn" disabled={answers[current.id] === undefined} onClick={() => move(questionIndex + 1)}>
                  Lanjut Soal <LuArrowRight aria-hidden="true" />
                </button>
              ) : (
                <button type="button" className="button button-primary runner-next-btn" disabled={Object.keys(answers).length !== questions.length} onClick={() => submit(Date.now())}>
                  Kumpulkan <LuCheck aria-hidden="true" />
                </button>
              )}
            </div>
          </section>
        </div>
      </section>
    )}
    {step === "result" && result && <section className="practice-result-screen"><p className="dash-kicker">LATIHAN SELESAI</p><h2>Skor</h2><strong>{result.score}%</strong><p>{result.correct} dari {result.total} jawaban benar</p><div><button type="button" onClick={() => setStep("review")}>Lihat Jawaban</button><button type="button" onClick={() => start(exercise)}>Ulangi Latihan</button><button type="button" onClick={() => setStep("list")}>Kembali ke Daftar Latihan</button></div></section>}
    {step === "review" && <section className="practice-review"><button className="practice-back" type="button" onClick={() => setStep("result")}><LuArrowLeft /> Kembali ke Hasil</button><h2>Lihat Jawaban</h2>{questions.map((question, index) => { const userAnswer = answers[question.id]; const correct = userAnswer === question.answer; return <article className={correct ? "correct" : "incorrect"} key={question.id}><span>Soal {index + 1} · {correct ? "Benar" : "Salah"}</span><h3>{question.prompt}</h3><p>Jawaban kamu: {question.options[userAnswer]}</p><strong>Jawaban benar: {question.options[question.answer]}</strong></article>; })}</section>}
  </main></div>;
}
