"use client";

import { use, useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";

export function ClientQuizBuilder({ params }: { params: Promise<{ level: string; chapter: string }> }) {
  const { level, chapter } = use(params);
  const code = level.toUpperCase();
  const [selectedQuestion, setSelectedQuestion] = useState("q1");
  const [isSaved, setIsSaved] = useState(true);

  const questions = [
    { id: "q1", type: "Kosakata", prompt: "Pilih arti yang paling sesuai untuk kosakata berikut.", jpText: "学ぶ", jpReading: "まなぶ", options: ["belajar / mempelajari", "beristirahat", "berjalan", "mengajar"], correct: 0 },
    { id: "q2", type: "Tata Bahasa", prompt: "Pilih bagian yang melengkapi kalimat contoh berikut.", jpText: "毎日、日本語を＿＿。", jpReading: "まいにち、にほんごを", options: ["勉強します", "大きいです", "静かです", "先生です"], correct: 0 },
    { id: "q3", type: "Membaca", prompt: "Apa gagasan utama dari kalimat berikut?", jpText: "少しずつ勉強を続けます。", jpReading: "すこしずつ べんきょうを つづけます", options: ["Berhenti belajar hari ini", "Melanjutkan belajar sedikit demi sedikit", "Belajar hanya saat ujian", "Mengganti bahan belajar"], correct: 1 },
    { id: "q4", type: "Kosakata", prompt: "Pilih makna kosakata yang tepat.", jpText: "復習", jpReading: "ふくしゅう", options: ["persiapan", "percakapan", "mengulang pelajaran", "ujian"], correct: 2 },
  ];

  const current = questions.find(q => q.id === selectedQuestion) || questions[0];

  const handleChange = () => {
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  return (
    <AdminShell current="content">
      <main className="admin-page builder-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">QUIZ BUILDER • {code} • {chapter.toUpperCase()}</p>
            <h1>Chapter Checkpoint</h1>
            <p>Kelola soal, opsi jawaban, dan pengaturan kelulusan assessment.</p>
          </div>
          <div className="admin-header-actions">
            {!isSaved && <span className="save-status unsaved">Unsaved Changes</span>}
            {isSaved && <span className="save-status saved">Saved</span>}
            <button type="button" className={`button ${isSaved ? "button-secondary" : "button-primary"}`} onClick={handleSave}>Simpan Soal</button>
            <Link className="button button-secondary" href={`/admin/program/${level}/chapters`}>← Kembali</Link>
          </div>
        </header>

        <div className="builder-layout">
          <aside className="builder-sidebar">
            <div className="builder-section-title">
              <h2>Bank Soal</h2>
              <button type="button" className="button-icon" aria-label="Tambah Soal">+</button>
            </div>
            
            <nav className="chapter-list">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  className={`chapter-item ${selectedQuestion === q.id ? "active" : ""}`}
                  onClick={() => setSelectedQuestion(q.id)}
                >
                  <span className="chapter-item-number">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="chapter-item-content">
                    <strong>Soal {idx + 1}</strong>
                    <div className="chapter-item-meta">
                      <span>{q.type}</span>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
            
            <div className="quiz-settings">
              <h3>Pengaturan Assessment</h3>
              <label className="admin-field">
                <span>Waktu Pengerjaan (Menit)</span>
                <input type="number" defaultValue={25} onChange={handleChange} />
              </label>
              <label className="admin-field">
                <span>Passing Score (%)</span>
                <input type="number" defaultValue={70} onChange={handleChange} />
              </label>
              <label className="admin-field checkbox">
                <input type="checkbox" defaultChecked onChange={handleChange} />
                <span>Acak urutan soal</span>
              </label>
            </div>
          </aside>

          <section className="builder-main">
            <div className="builder-form-grid">
              <div className="quiz-editor-column">
                <div className="builder-section-title">
                  <h3>Soal {questions.findIndex(q => q.id === current.id) + 1}</h3>
                  <select defaultValue={current.type} onChange={handleChange} className="admin-select">
                    <option value="Kosakata">Kosakata</option>
                    <option value="Tata Bahasa">Tata Bahasa</option>
                    <option value="Membaca">Membaca</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
                
                <label className="admin-field">
                  <span>Instruksi Soal</span>
                  <textarea defaultValue={current.prompt} onChange={handleChange} rows={2}></textarea>
                </label>

                <div className="japanese-modes">
                  <div className="jp-mode">
                    <h4>Jepang Profesional</h4>
                    <label className="admin-field">
                      <span>Teks Kanji / Kana</span>
                      <input defaultValue={current.jpText} onChange={handleChange} />
                    </label>
                  </div>
                  <div className="jp-mode">
                    <h4>Jepang Pemula</h4>
                    <label className="admin-field">
                      <span>Furigana / Romaji (Opsional)</span>
                      <input defaultValue={current.jpReading} onChange={handleChange} />
                    </label>
                  </div>
                </div>

                <div className="quiz-options-builder">
                  <h4>Pilihan Jawaban</h4>
                  {current.options.map((opt, idx) => (
                    <div key={idx} className={`quiz-option-row ${current.correct === idx ? "correct" : ""}`}>
                      <label className="radio-label">
                        <input type="radio" name={`correct-ans-${current.id}`} defaultChecked={current.correct === idx} onChange={handleChange} />
                        <span className="sr-only">Jawaban Benar</span>
                      </label>
                      <input defaultValue={opt} onChange={handleChange} />
                      <button type="button" className="button-icon" aria-label="Hapus Opsi">×</button>
                    </div>
                  ))}
                  <button type="button" className="button button-secondary button-small">+ Tambah Opsi</button>
                </div>

                <label className="admin-field">
                  <span>Penjelasan (Feedback)</span>
                  <textarea defaultValue="Penjelasan fixture deterministik ditampilkan di halaman review." onChange={handleChange} rows={3}></textarea>
                </label>
              </div>

              <div className="quiz-media-column">
                <div className="builder-section-title">
                  <h3>Media Pendukung</h3>
                </div>
                <div className="media-placeholder">
                  <span className="media-icon" aria-hidden="true">画</span>
                  <p>Tidak ada gambar terlampir.</p>
                  <button type="button" className="button button-secondary button-small">Upload Gambar</button>
                  <small>JPG/PNG max 2MB.</small>
                </div>
                <div className="media-placeholder">
                  <span className="media-icon" aria-hidden="true">音</span>
                  <p>Tidak ada audio terlampir.</p>
                  <button type="button" className="button button-secondary button-small">Upload Audio</button>
                  <small>MP3 max 5MB.</small>
                </div>
                <aside className="admin-product-rules">
                  <p>Upload dikendalikan secara lokal melalui frontend fixture. Tidak ada integrasi S3 yang diaktifkan.</p>
                </aside>
              </div>
            </div>
          </section>
        </div>
        <footer className="builder-footer"><Link className="button button-dark" href={`/admin/program/${level}/tryout`}>Penyusun Try Out</Link><p>Perubahan assessment aktif setelah disimpan dan dipublikasikan.</p></footer>
      </main>
    </AdminShell>
  );
}
