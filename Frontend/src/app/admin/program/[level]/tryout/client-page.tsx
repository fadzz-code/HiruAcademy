"use client";

import Link from "next/link";
import { use, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import {
  LuClock,
  LuFileCheck,
  LuBookmark,
} from "react-icons/lu";

export function ClientTryoutBuilder({ params }: { params: Promise<{ level: string }> }) {
  const { level } = use(params);
  const code = level.toUpperCase();

  // Section step: 1 = Catalog /tryout, 2 = Info page, 3 = Running session
  const [activeSection, setActiveSection] = useState<1 | 2 | 3>(1);
  const [savedNotice, setSavedNotice] = useState("");

  // Section 1: Catalog /tryout state
  const [catalogTitle, setCatalogTitle] = useState(`Try Out JLPT ${code}`);
  const [catalogDesc, setCatalogDesc] = useState(
    `Uji kesiapan Anda untuk ujian JLPT ${code} yang sebenarnya. Simulasi ini dirancang semirip mungkin dengan kondisi ujian asli.`
  );
  const [totalMinutes, setTotalMinutes] = useState(125);
  const [maxScore, setMaxScore] = useState(180);

  // Section 2: Info page state
  const [simTitle, setSimTitle] = useState(`SIMULASI JLPT ${code}`);
  const [simKicker, setSimKicker] = useState(`TRY OUT ${code} • SIMULASI 1`);
  const [simRuleHeading, setSimRuleHeading] = useState("Periksa aturan sebelum memulai");
  const [simRuleNote, setSimRuleNote] = useState("Sesi attempt resmi dicatat setelah simulasi dimulai.");
  const [simQuestionsCount, setSimQuestionsCount] = useState(100);
  const [simAttemptsCount, setSimAttemptsCount] = useState(2);
  const [simDescription, setSimDescription] = useState(
    "Jawaban tersimpan otomatis. Sesi mencakup Moji Goi, Bunpou & Dokkai, serta Choukai dengan standar penilaian JLPT."
  );
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [reviewAvailable, setReviewAvailable] = useState(true);

  // Section 3: Running session state
  const [runningQNum, setRunningQNum] = useState(4);
  const [runningSection, setRunningSection] = useState("BAGIAN BUNPOU");
  const [runningPrompt, setRunningPrompt] = useState("Pilih jawaban yang paling tepat.");
  const [runningJpText, setRunningJpText] = useState("日本へ行く前に、パスポートを＿＿＿＿。");
  const [runningOptions, setRunningOptions] = useState([
    "確認しておきます",
    "確認しています",
    "確認したことがあります",
    "確認するでしょう",
  ]);
  const [runningCorrect, setRunningCorrect] = useState(0);
  const [runningMarked, setRunningMarked] = useState(true);

  function handleSave() {
    setSavedNotice("Konfigurasi Try Out berhasil disimpan.");
    setTimeout(() => setSavedNotice(""), 4000);
  }

  return (
    <AdminShell current="content">
      <main className="admin-page builder-page tryout-builder-page">
        <div className="builder-top-nav" style={{ marginBottom: "16px" }}>
          <Link className="button button-secondary" href="/admin/program">
            ← Kembali ke Program
          </Link>
        </div>

        <header className="admin-header">
          <div>
            <p className="admin-kicker">CONTENT BUILDER • {code}</p>
            <h1>Try Out Builder</h1>
            <p>Kelola halaman katalog try out, halaman info aturan simulasi, dan bank soal sesi berjalan.</p>
          </div>
          <div className="admin-header-actions">
            {savedNotice && <span className="save-status saved">{savedNotice}</span>}
            <button className="button button-primary" type="button" onClick={handleSave}>
              Simpan Try Out
            </button>
          </div>
        </header>

        {/* Section Navigation Tabs */}
        <div className="tryout-builder-tabs">
          <button
            type="button"
            className={`tryout-step-tab ${activeSection === 1 ? "active" : ""}`}
            onClick={() => setActiveSection(1)}
          >
            <span className="step-num">1</span>
            <div>
              <strong>Katalog /tryout</strong>
              <small>Halaman daftar paket simulasi</small>
            </div>
          </button>
          <button
            type="button"
            className={`tryout-step-tab ${activeSection === 2 ? "active" : ""}`}
            onClick={() => setActiveSection(2)}
          >
            <span className="step-num">2</span>
            <div>
              <strong>Halaman Info Try Out</strong>
              <small>Aturan &amp; konfirmasi mulai</small>
            </div>
          </button>
          <button
            type="button"
            className={`tryout-step-tab ${activeSection === 3 ? "active" : ""}`}
            onClick={() => setActiveSection(3)}
          >
            <span className="step-num">3</span>
            <div>
              <strong>Sesi Berjalan</strong>
              <small>Soal &amp; navigator pengerjaan</small>
            </div>
          </button>
        </div>

        {/* SECTION 1: BUILDER HALAMAN /tryout */}
        {activeSection === 1 && (
          <div className="tryout-builder-step-content">
            <aside className="admin-context-info-card">
              <div className="admin-context-info-badge">Section 1 Builder</div>
              <div className="admin-context-info-content">
                <strong>Halaman yang diubah: /tryout (Katalog Paket Simulasi)</strong>
                <p>
                  Mengatur judul halaman, deskripsi pengantar, metrik ujian (durasi, jumlah sesi, skor), serta daftar paket try out yang dapat dipilih siswa.
                </p>
              </div>
            </aside>

            <div className="tryout-builder-grid">
              {/* Form Settings */}
              <section className="tryout-editor-panel">
                <h2>Pengaturan Katalog /tryout</h2>
                <div className="admin-form-grid" style={{ marginTop: "16px" }}>
                  <label className="admin-field">
                    <span>Judul Halaman</span>
                    <input
                      value={catalogTitle}
                      onChange={(e) => setCatalogTitle(e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Total Durasi (Menit)</span>
                    <input
                      type="number"
                      value={totalMinutes}
                      onChange={(e) => setTotalMinutes(Number(e.target.value))}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Skor Maksimal</span>
                    <input
                      type="number"
                      value={maxScore}
                      onChange={(e) => setMaxScore(Number(e.target.value))}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Status Mode Review</span>
                    <select defaultValue="Tersedia">
                      <option value="Tersedia">Tersedia setelah selesai</option>
                      <option value="Nonaktif">Dinonaktifkan</option>
                    </select>
                  </label>
                </div>

                <label className="admin-field" style={{ marginTop: "16px" }}>
                  <span>Deskripsi Pengantar</span>
                  <textarea
                    rows={3}
                    value={catalogDesc}
                    onChange={(e) => setCatalogDesc(e.target.value)}
                  />
                </label>
              </section>

              {/* Preview Cards */}
              <section className="tryout-preview-panel">
                <h2>Pratinjau Paket Try Out Siswa</h2>
                <div className="tryout-preview-card-list">
                  {/* Paket 1 */}
                  <article className="tryout-preview-card active-package">
                    <div className="tryout-preview-card-header">
                      <span className="tryout-pkg-badge">Paket A</span>
                      <span className="admin-status status-active">Tersedia</span>
                    </div>
                    <h3>Simulasi Try Out 1</h3>
                    <p>Fokus pada pola kalimat dasar, kosakata, dan pemahaman membaca teks.</p>
                    <div className="tryout-card-metrics">
                      <span><LuClock /> {totalMinutes} Menit</span>
                      <span><LuFileCheck /> 100 Soal</span>
                    </div>
                    <button
                      type="button"
                      className="button button-primary tryout-open-info-btn"
                      onClick={() => setActiveSection(2)}
                    >
                      Buka Info →
                    </button>
                  </article>

                  {/* Paket 2 */}
                  <article className="tryout-preview-card">
                    <div className="tryout-preview-card-header">
                      <span className="tryout-pkg-badge">Paket B</span>
                      <span className="admin-status status-pending">Terkunci</span>
                    </div>
                    <h3>Simulasi Try Out 2</h3>
                    <p>Variasi soal kanji yang lebih kompleks dan listening percakapan sehari-hari.</p>
                    <div className="tryout-card-metrics">
                      <span><LuClock /> {totalMinutes} Menit</span>
                      <span><LuFileCheck /> 100 Soal</span>
                    </div>
                    <button type="button" className="button button-secondary disabled" disabled>
                      Buka Info →
                    </button>
                  </article>
                </div>
              </section>
            </div>

            <div className="builder-bottom-actions" style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #dee1ea" }}>
              <button type="button" className="button button-secondary" onClick={handleSave}>Simpan Perubahan</button>
              <button type="button" className="button button-primary" onClick={() => setActiveSection(2)}>
                Lanjut ke Builder Info Try Out →
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: BUILDER HALAMAN INFO TRY OUT */}
        {activeSection === 2 && (
          <div className="tryout-builder-step-content">
            <aside className="admin-context-info-card">
              <div className="admin-context-info-badge">Section 2 Builder</div>
              <div className="admin-context-info-content">
                <strong>Halaman yang diubah: /tryout/info (Halaman Aturan &amp; Konfirmasi Mulai)</strong>
                <p>
                  Mengatur tampilan instruksi aturan ujian resmi, kuota percobaan (attempt), timer, dan tombol mulai try out berdasarkan referensi standar JLPT.
                </p>
              </div>
            </aside>

            {/* Back to list trigger inside builder */}
            <div style={{ marginBottom: "16px" }}>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setActiveSection(1)}
              >
                ← Kembali ke Daftar
              </button>
            </div>

            <div className="tryout-builder-grid">
              {/* Form Settings Section 2 */}
              <section className="tryout-editor-panel">
                <h2>Pengaturan Halaman Info Simulasi</h2>
                <div className="admin-form-grid" style={{ marginTop: "16px" }}>
                  <label className="admin-field">
                    <span>Label Kicker Atas</span>
                    <input
                      value={simKicker}
                      onChange={(e) => setSimKicker(e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Judul Simulasi Besar</span>
                    <input
                      value={simTitle}
                      onChange={(e) => setSimTitle(e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Jumlah Soal</span>
                    <input
                      type="number"
                      value={simQuestionsCount}
                      onChange={(e) => setSimQuestionsCount(Number(e.target.value))}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Jumlah Percobaan (Attempt)</span>
                    <input
                      type="number"
                      value={simAttemptsCount}
                      onChange={(e) => setSimAttemptsCount(Number(e.target.value))}
                    />
                  </label>
                </div>

                <label className="admin-field" style={{ marginTop: "16px" }}>
                  <span>Subheading Aturan</span>
                  <input
                    value={simRuleHeading}
                    onChange={(e) => setSimRuleHeading(e.target.value)}
                  />
                </label>

                <label className="admin-field" style={{ marginTop: "16px" }}>
                  <span>Catatan Resmi Attempt</span>
                  <input
                    value={simRuleNote}
                    onChange={(e) => setSimRuleNote(e.target.value)}
                  />
                </label>

                <label className="admin-field" style={{ marginTop: "16px" }}>
                  <span>Deskripsi Sesi Ujian</span>
                  <textarea
                    rows={3}
                    value={simDescription}
                    onChange={(e) => setSimDescription(e.target.value)}
                  />
                </label>

                <div className="admin-checkbox-group" style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                    <input
                      type="checkbox"
                      checked={autoSaveEnabled}
                      onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    />
                    <span>Jawaban tersimpan otomatis saat pengerjaan</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                    <input
                      type="checkbox"
                      checked={reviewAvailable}
                      onChange={(e) => setReviewAvailable(e.target.checked)}
                    />
                    <span>Siswa dapat meninjau pembahasan setelah selesai</span>
                  </label>
                </div>
              </section>

              {/* Exact Preview of Info Page (Reference: tryout.html) */}
              <section className="tryout-preview-panel">
                <h2>Pratinjau Halaman Info (Tampilan Siswa)</h2>
                <div className="tryout-info-preview-box">
                  <header className="tryout-info-preview-head">
                    <p className="dash-kicker">{simKicker}</p>
                    <h2>{simRuleHeading}</h2>
                    <small>{simRuleNote}</small>
                  </header>

                  <div className="tryout-info-main-banner">
                    <span className="tryout-status-available">TERSEDIA</span>
                    <h1>{simTitle}</h1>
                    <div className="tryout-info-pills">
                      <span>{simQuestionsCount} soal</span>
                      <span>•</span>
                      <span>3 bagian kemampuan</span>
                      <span>•</span>
                      <span>{simAttemptsCount} attempt tersedia</span>
                    </div>
                    <p className="tryout-info-desc">{simDescription}</p>

                    <div className="tryout-info-actions">
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setActiveSection(3)}
                      >
                        Mulai Try Out
                      </button>
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => setActiveSection(1)}
                      >
                        Kembali ke Daftar
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="builder-bottom-actions" style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #dee1ea" }}>
              <button type="button" className="button button-secondary" onClick={() => setActiveSection(1)}>
                ← Kembali ke Katalog
              </button>
              <button type="button" className="button button-primary" onClick={() => setActiveSection(3)}>
                Lanjut ke Builder Sesi Berjalan (Batch 18) →
              </button>
            </div>
          </div>
        )}

        {/* SECTION 3: BUILDER SESI BERJALAN */}
        {activeSection === 3 && (
          <div className="tryout-builder-step-content">
            <aside className="admin-context-info-card">
              <div className="admin-context-info-badge">Section 3 Builder</div>
              <div className="admin-context-info-content">
                <strong>Halaman yang diubah: TRY OUT {code} • SESI BERJALAN (Running Runner &amp; Navigator)</strong>
                <p>
                  Mengatur tampilan soal berjalan, teks kalimat bahasa Jepang, opsi jawaban A–D, timer sesi, penanda soal, dan nomor navigasi soal 1–25.
                </p>
              </div>
            </aside>

            {/* Back trigger */}
            <div style={{ marginBottom: "16px" }}>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setActiveSection(2)}
              >
                ← Kembali ke Halaman Info
              </button>
            </div>

            {/* Exact Preview of Running Session (Reference: tryout.html) */}
            <section className="tryout-running-preview-container">
              {/* Top Running Header */}
              <div className="tryout-running-header-row">
                <div>
                  <p className="dash-kicker">TRY OUT {code} • SESI BERJALAN</p>
                  <h1>Soal {runningQNum} dari 100</h1>
                  <p>Jawaban tersimpan otomatis sesuai alur pengerjaan sesi terstandarisasi.</p>
                </div>
                <div className="tryout-running-timer-card">
                  <span className="tryout-attempt-badge">ATTEMPT 1/2</span>
                  <div className="tryout-timer-info">
                    <strong>TIMER SESI</strong>
                    <span>Sesuai Jadwal</span>
                  </div>
                  <button type="button" className="button-sim-autosubmit">
                    Klik untuk simulasi auto-submit
                  </button>
                </div>
              </div>

              {/* Running Stats Bar */}
              <div className="tryout-running-stats-strip">
                <div className="tryout-stat-pill">
                  <strong>14 / 100</strong>
                  <span>Soal dijawab</span>
                </div>
                <div className="tryout-stat-pill">
                  <strong>2 soal</strong>
                  <span>Ditandai</span>
                </div>
                <div className="tryout-stat-pill">
                  <strong style={{ color: "#2e6b2c" }}>Aktif</strong>
                  <span>Penyimpanan otomatis</span>
                </div>
              </div>

              {/* Running Layout: Question + Navigator */}
              <div className="tryout-running-body-grid">
                {/* Left: Question Box */}
                <div className="tryout-running-question-box">
                  <p className="dash-kicker">{runningSection} • SOAL {runningQNum}</p>
                  <h2 className="tryout-question-prompt">{runningPrompt}</h2>

                  <div className="tryout-running-japanese-card">
                    {runningJpText}
                  </div>

                  <div className="tryout-running-options-group">
                    <p className="options-header-label">Pilihan jawaban</p>
                    {runningOptions.map((opt, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = runningCorrect === idx;
                      return (
                        <label
                          key={idx}
                          className={`tryout-running-option-row ${isSelected ? "selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name="running-answer"
                            checked={isSelected}
                            onChange={() => setRunningCorrect(idx)}
                          />
                          <span className="option-code-pill">{letter}.</span>
                          <span className="option-content-text">{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="tryout-running-actions-row">
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() => setRunningQNum((v) => Math.max(1, v - 1))}
                    >
                      Sebelumnya
                    </button>
                    <button
                      type="button"
                      className={`button button-secondary ${runningMarked ? "button-marked-active" : ""}`}
                      onClick={() => setRunningMarked(!runningMarked)}
                    >
                      <LuBookmark aria-hidden="true" />
                      {runningMarked ? "Ditandai" : "Tandai Soal"}
                    </button>
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => setRunningQNum((v) => Math.min(100, v + 1))}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>

                {/* Right: Question Navigator 1-25 */}
                <aside className="tryout-running-navigator-box">
                  <div className="navigator-header">
                    <h3>NAVIGATOR SOAL</h3>
                    <p>14 dijawab • 2 ditandai</p>
                  </div>

                  <div className="navigator-grid-25">
                    {Array.from({ length: 25 }, (_, i) => {
                      const num = i + 1;
                      const isActive = num === runningQNum;
                      const isAnswered = num <= 14;
                      const isMarked = num === 2 || num === 7;
                      return (
                        <button
                          key={num}
                          type="button"
                          className={`nav-number-btn ${isActive ? "active" : ""} ${isAnswered ? "answered" : ""} ${isMarked ? "marked" : ""}`}
                          onClick={() => setRunningQNum(num)}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>

                  <div className="navigator-actions">
                    <button type="button" className="button button-primary btn-full-submit">
                      Selesaikan &amp; Kirim
                    </button>
                    <button
                      type="button"
                      className="button button-secondary btn-full-exit"
                      onClick={() => setActiveSection(1)}
                    >
                      Keluar Sesi
                    </button>
                  </div>
                </aside>
              </div>
            </section>

            {/* Running Question Editor Panel */}
            <section className="tryout-editor-panel" style={{ marginTop: "24px" }}>
              <h2>Editor Soal Sesi Berjalan (Soal {runningQNum})</h2>
              <div className="admin-form-grid" style={{ marginTop: "16px" }}>
                <label className="admin-field">
                  <span>Bagian Kemampuan</span>
                  <select
                    value={runningSection}
                    onChange={(e) => setRunningSection(e.target.value)}
                  >
                    <option value="BAGIAN BUNPOU">Tata Bahasa (Bunpou)</option>
                    <option value="BAGIAN MOJI GOI">Huruf &amp; Kosakata (Moji Goi)</option>
                    <option value="BAGIAN DOKKAI">Membaca (Dokkai)</option>
                    <option value="BAGIAN CHOUKAI">Mendengarkan (Choukai)</option>
                  </select>
                </label>
                <label className="admin-field">
                  <span>Nomor Soal (1–100)</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={runningQNum}
                    onChange={(e) => setRunningQNum(Number(e.target.value) || 1)}
                  />
                </label>
              </div>

              <label className="admin-field" style={{ marginTop: "14px" }}>
                <span>Instruksi Soal</span>
                <input
                  value={runningPrompt}
                  onChange={(e) => setRunningPrompt(e.target.value)}
                />
              </label>

              <label className="admin-field" style={{ marginTop: "14px" }}>
                <span>Kalimat Soal Jepang</span>
                <input
                  lang="ja"
                  value={runningJpText}
                  onChange={(e) => setRunningJpText(e.target.value)}
                />
              </label>

              <div style={{ marginTop: "16px" }}>
                <h4 style={{ margin: "0 0 10px", fontSize: "14px", fontWeight: 800 }}>Pilihan Jawaban (A–D)</h4>
                <div style={{ display: "grid", gap: "10px" }}>
                  {runningOptions.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    return (
                      <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, minWidth: "90px" }}>
                          <input
                            type="radio"
                            name="correct-editor-opt"
                            checked={runningCorrect === idx}
                            onChange={() => setRunningCorrect(idx)}
                          />
                          <span>Kunci {letter}</span>
                        </label>
                        <input
                          lang="ja"
                          value={opt}
                          onChange={(e) => {
                            const next = [...runningOptions];
                            next[idx] = e.target.value;
                            setRunningOptions(next);
                          }}
                          style={{ flex: 1 }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className="builder-bottom-actions" style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #dee1ea" }}>
              <button type="button" className="button button-secondary" onClick={() => setActiveSection(2)}>
                ← Kembali ke Section 2 (Info Try Out)
              </button>
              <button type="button" className="button button-primary" onClick={handleSave}>
                Simpan Seluruh Try Out
              </button>
            </div>
          </div>
        )}
      </main>
    </AdminShell>
  );
}
