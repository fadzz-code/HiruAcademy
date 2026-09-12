"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { LuPlus, LuImage, LuVolume2 } from "react-icons/lu";

interface QuestionItem {
  id: string;
  title: string;
  type: string;
  status: string;
  prompt: string;
  professional: string;
  beginner: string;
  options: string[];
  correct: number;
}

const initialQuestions: QuestionItem[] = [
  {
    id: "q1",
    title: "Arti kosakata 毎朝",
    type: "Kosakata",
    status: "Ready",
    prompt: "Pilih arti yang tepat untuk kosakata berikut:",
    professional: "毎朝",
    beginner: "まいあさ",
    options: ["Setiap pagi", "Setiap malam", "Minggu depan", "Kemarin"],
    correct: 0,
  },
  {
    id: "q2",
    title: "Pola kalimat rutinitas",
    type: "Tata Bahasa",
    status: "Ready",
    prompt: "Pilih pola kalimat yang tepat untuk melengkapi kalimat berikut.",
    professional: "毎日、日本語を＿＿。",
    beginner: "まいにち、にほんごを",
    options: ["勉強します", "大きいです", "静かです", "先生です"],
    correct: 0,
  },
  {
    id: "q3",
    title: "Audio aktivitas pagi",
    type: "Audio",
    status: "Draft",
    prompt: "Dengarkan percakapan audio dan pilih aktivitas yang sesuai.",
    professional: "朝の活動",
    beginner: "あさのかつどう",
    options: ["Sarapan pagi", "Pergi ke stasiun", "Membaca buku", "Belajar bahasa Jepang"],
    correct: 1,
  },
  {
    id: "q4",
    title: "Reading pendek",
    type: "Membaca",
    status: "Ready",
    prompt: "Baca teks singkat lalu pilih kesimpulan yang benar.",
    professional: "少しずつ勉強を続けます。",
    beginner: "すこしずつ べんきょうを つづけます",
    options: ["Berhenti belajar", "Melanjutkan belajar", "Mengganti jadwal", "Menunda ujian"],
    correct: 1,
  },
  {
    id: "q5",
    title: "Makna kanji waktu",
    type: "Kanji",
    status: "Draft",
    prompt: "Pilih makna yang sesuai untuk kanji waktu berikut.",
    professional: "時間",
    beginner: "じかん",
    options: ["Waktu", "Tempat", "Orang", "Aktivitas"],
    correct: 0,
  },
];

export default function MiniCheckpointBuilderPage() {
  const [level, setLevel] = useState("N4");
  const [session, setSession] = useState("2");
  const [part, setPart] = useState("1");
  const [questionsList, setQuestionsList] = useState<QuestionItem[]>(initialQuestions);
  const [selectedId, setSelectedId] = useState("q1");
  const [saved, setSaved] = useState(false);

  // Editable settings (clean 5 settings only, no "Config" / "Dinamis")
  const [randomizeQuestions, setRandomizeQuestions] = useState(true);
  const [randomizeOptions, setRandomizeOptions] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(10);
  const [attemptCount, setAttemptCount] = useState(2);
  const [reviewAvailability, setReviewAvailability] = useState("Tersedia setelah submit");

  const editorRef = useRef<HTMLElement>(null);
  const current = questionsList.find((q) => q.id === selectedId) ?? questionsList[0];

  function selectQuestion(id: string) {
    setSelectedId(id);
    setSaved(false);
  }

  function updateCurrent(patch: Partial<QuestionItem>) {
    setQuestionsList((prev) =>
      prev.map((item) => (item.id === current.id ? { ...item, ...patch } : item))
    );
    setSaved(false);
  }

  function updateOption(optIdx: number, val: string) {
    const nextOpts = [...current.options];
    nextOpts[optIdx] = val;
    updateCurrent({ options: nextOpts });
  }

  function handleAddQuestion() {
    const newId = `q-${Date.now()}`;
    const newQ: QuestionItem = {
      id: newId,
      title: `Soal Baru ${questionsList.length + 1}`,
      type: "Tata Bahasa",
      status: "Draft",
      prompt: "Tuliskan instruksi soal...",
      professional: "問題文",
      beginner: "もんだいぶん",
      options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      correct: 0,
    };
    setQuestionsList((prev) => [...prev, newQ]);
    setSelectedId(newId);
    editorRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AdminShell current="content">
      <main className="admin-page admin-a3-page mini-checkpoint-admin-page">
        <div className="builder-top-nav" style={{ marginBottom: "16px" }}>
          <Link className="button button-secondary" href="/admin/program/n4/chapters">
            ← Kembali ke Chapter Builder
          </Link>
        </div>

        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • MINI CHECKPOINT BUILDER</p>
            <h1>Mini Checkpoint Builder</h1>
            <p>Kelola bank soal, instruksi Jepang, opsi jawaban, dan pengaturan evaluasi per sesi &amp; part.</p>
          </div>
          <div className="admin-header-actions">
            {saved && <span className="save-status saved">Tersimpan</span>}
            <button className="button button-primary" type="button" onClick={() => setSaved(true)}>
              Simpan Mini Checkpoint
            </button>
          </div>
        </header>

        {/* Filter / Context Bar with Visible Border & Shadow Dropdowns */}
        <section className="mini-context-bar admin-shadow-bar">
          <label className="admin-field">
            <span>Level</span>
            <select
              className="admin-shadow-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="N5">Level N5</option>
              <option value="N4">Level N4</option>
              <option value="N3">Level N3</option>
              <option value="N2">Level N2</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Sesi</span>
            <select
              className="admin-shadow-select"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option value="1">Sesi 1</option>
              <option value="2">Sesi 2</option>
              <option value="3">Sesi 3</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Part</span>
            <select
              className="admin-shadow-select"
              value={part}
              onChange={(e) => setPart(e.target.value)}
            >
              <option value="1">Part 1</option>
              <option value="2">Part 2</option>
            </select>
          </label>
          <button
            className="button button-dark"
            type="button"
            style={{ marginTop: "auto" }}
            onClick={handleAddQuestion}
          >
            <LuPlus aria-hidden="true" /> Tambah Pertanyaan
          </button>
        </section>

        {/* Main 2-column Builder: Bank Soal (Left) + Editor (Right) */}
        <div className="mini-builder-layout">
          {/* Left: Bank Pertanyaan */}
          <aside className="mini-question-bank">
            <div className="builder-section-title">
              <h2>Bank Soal ({questionsList.length})</h2>
              <button
                type="button"
                className="button-icon"
                aria-label="Tambah Soal"
                onClick={handleAddQuestion}
              >
                +
              </button>
            </div>
            <nav className="mini-questions-nav">
              {questionsList.map((q, index) => (
                <button
                  className={`mini-q-item-btn ${selectedId === q.id ? "active" : ""}`}
                  type="button"
                  onClick={() => selectQuestion(q.id)}
                  key={q.id}
                >
                  <span className="q-num">{String(index + 1).padStart(2, "0")}</span>
                  <div className="q-info">
                    <strong>{q.title}</strong>
                    <small>{q.type}</small>
                  </div>
                  <b className={`admin-status status-${q.status === "Ready" ? "active" : "pending"}`}>
                    {q.status}
                  </b>
                </button>
              ))}
            </nav>
          </aside>

          {/* Right: Question Editor (like Quiz & Try Out Builder) */}
          <section className="mini-editor" ref={editorRef}>
            <header className="mini-editor-head">
              <div>
                <p className="admin-kicker">
                  SOAL {String(questionsList.findIndex((item) => item.id === current.id) + 1).padStart(2, "0")} • {current.type.toUpperCase()}
                </p>
                <h2>{current.title}</h2>
              </div>
              <span className={`admin-status status-${current.status === "Ready" ? "active" : "pending"}`}>
                {current.status}
              </span>
            </header>

            <div className="a2-field-row" style={{ marginTop: "16px" }}>
              <label className="admin-field">
                <span>Judul Soal</span>
                <input
                  value={current.title}
                  onChange={(e) => updateCurrent({ title: e.target.value })}
                />
              </label>
              <label className="admin-field">
                <span>Tipe Soal</span>
                <select
                  value={current.type}
                  onChange={(e) => updateCurrent({ type: e.target.value })}
                >
                  <option value="Kosakata">Kosakata</option>
                  <option value="Tata Bahasa">Tata Bahasa</option>
                  <option value="Membaca">Membaca</option>
                  <option value="Audio">Audio</option>
                  <option value="Kanji">Kanji</option>
                </select>
              </label>
            </div>

            <label className="admin-field" style={{ marginTop: "14px" }}>
              <span>Instruksi Soal</span>
              <textarea
                rows={2}
                value={current.prompt}
                onChange={(e) => updateCurrent({ prompt: e.target.value })}
              />
            </label>

            {/* Japanese Text Input Modes */}
            <div className="japanese-modes" style={{ marginTop: "16px" }}>
              <div className="jp-mode">
                <h4>Jepang Profesional (Kanji / Kalimat Resmi)</h4>
                <label className="admin-field">
                  <input
                    lang="ja"
                    value={current.professional}
                    onChange={(e) => updateCurrent({ professional: e.target.value })}
                  />
                </label>
              </div>
              <div className="jp-mode">
                <h4>Jepang Pemula (Furigana / Hiragana)</h4>
                <label className="admin-field">
                  <input
                    lang="ja"
                    value={current.beginner}
                    onChange={(e) => updateCurrent({ beginner: e.target.value })}
                  />
                </label>
              </div>
            </div>

            {/* Pilihan Jawaban (A-D) with Correct Answer Radio */}
            <div className="quiz-options-builder" style={{ marginTop: "20px" }}>
              <h4>Pilihan Jawaban (Tandai Kunci Jawaban Benar)</h4>
              <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
                {current.options.map((option, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isCorrect = current.correct === index;
                  return (
                    <div
                      key={index}
                      className={`quiz-option-row ${isCorrect ? "correct" : ""}`}
                      style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          fontWeight: 700,
                          minWidth: "85px",
                        }}
                      >
                        <input
                          type="radio"
                          name={`mini-correct-${current.id}`}
                          checked={isCorrect}
                          onChange={() => updateCurrent({ correct: index })}
                        />
                        <span>Pilihan {letter}</span>
                      </label>
                      <input
                        lang="ja"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        style={{ flex: 1 }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Media Pendukung */}
            <div className="mini-media-row" style={{ marginTop: "20px", display: "flex", gap: "14px" }}>
              <div className="media-placeholder" style={{ flex: 1 }}>
                <LuImage aria-hidden="true" style={{ fontSize: "22px" }} />
                <p>Gambar Soal (Opsional)</p>
                <button type="button" className="button button-secondary button-small">Upload Gambar</button>
              </div>
              <div className="media-placeholder" style={{ flex: 1 }}>
                <LuVolume2 aria-hidden="true" style={{ fontSize: "22px" }} />
                <p>Audio Soal (Opsional)</p>
                <button type="button" className="button button-secondary button-small">Upload Audio</button>
              </div>
            </div>
          </section>
        </div>

        {/* User-Friendly Mini Checkpoint Settings: Exactly 5 Editable Controls */}
        <section className="admin-section mini-settings-section" style={{ marginTop: "32px" }}>
          <h2>Pengaturan Mini Checkpoint ({level} • Sesi {session} • Part {part})</h2>
          <div className="mini-settings-card">
            <div className="mini-settings-grid">
              <label className="admin-field">
                <span>Durasi Pengerjaan (Menit)</span>
                <input
                  type="number"
                  min="5"
                  max="60"
                  className="admin-shadow-input"
                  value={timerMinutes}
                  onChange={(e) => setTimerMinutes(Number(e.target.value) || 10)}
                />
              </label>

              <label className="admin-field">
                <span>Jumlah Percobaan (Attempt)</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="admin-shadow-input"
                  value={attemptCount}
                  onChange={(e) => setAttemptCount(Number(e.target.value) || 2)}
                />
              </label>

              <label className="admin-field">
                <span>Akses Ulasan Jawaban (Review Availability)</span>
                <select
                  className="admin-shadow-select"
                  value={reviewAvailability}
                  onChange={(e) => setReviewAvailability(e.target.value)}
                >
                  <option value="Tersedia setelah submit">Tersedia langsung setelah submit</option>
                  <option value="Hanya tampil skor">Hanya tampilkan skor akhir</option>
                  <option value="Setelah sesi ditutup">Setelah sesi cohort ditutup</option>
                </select>
              </label>
            </div>

            <div className="mini-settings-toggles" style={{ marginTop: "18px", display: "grid", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={randomizeQuestions}
                  onChange={(e) => setRandomizeQuestions(e.target.checked)}
                />
                <span>Randomisasi soal: Acak urutan pertanyaan pada setiap percobaan siswa</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={randomizeOptions}
                  onChange={(e) => setRandomizeOptions(e.target.checked)}
                />
                <span>Acak pilihan jawaban agar urutannya berbeda</span>
              </label>
            </div>
          </div>
        </section>

        {/* Clean Footer Without Cohort & Kelas */}
        <footer
          className="builder-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid #dee1ea",
          }}
        >
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px" }}>
            Soal mini checkpoint dan aturan evaluasi akan langsung aktif pada kelas Sensei setelah disimpan dan dipublikasikan.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setSaved(true)}
            >
              Simpan Draft
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() => setSaved(true)}
            >
              Publikasikan
            </button>
          </div>
        </footer>
      </main>
    </AdminShell>
  );
}
