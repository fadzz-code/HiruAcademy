"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBookOpen,
  LuCheck,
  LuCircleCheck,
  LuClock,
  LuFileCheck,
  LuHeadphones,
  LuListOrdered,
  LuChartNoAxesCombined,
  LuSpellCheck,
  LuTriangleAlert,
  LuFlag,
  LuGraduationCap,
  LuLightbulb,
  LuLock,
  LuRotateCcw,
  LuSparkles,
} from "react-icons/lu";
import { AssessmentUnavailable } from "@/components/assessment-unavailable";
import { usePublishedAssessments, type PublishedAssessment } from "@/lib/assessment-store";

type View = "list" | "info" | "runner" | "timeout" | "result" | "review" | "review-unavailable" | "locked" | "waiting" | "exhausted";

type TryoutItem = {
  id: string;
  icon: typeof LuGraduationCap;
  title: string;
  status: string;
  description: string;
  meta: string;
  level: string;
  view: View;
  assessment?: PublishedAssessment;
};

type ResultSection = { key: string; label: string; score: number; maxScore: number };
type Recommendation = { title: string; body: string; actions: string[]; href?: string };

function getRecommendation(sections: ResultSection[], membership: string): Recommendation {
  const weakest = sections.reduce((current, section) => section.score / section.maxScore < current.score / current.maxScore ? section : current);
  const query = `?membership=${membership}`;
  const recommendations: Record<string, Recommendation> = {
    "Moji Goi": { title: "Fokus utama: Moji Goi (Kosakata)", body: "Skor Kosakata merupakan yang terendah pada attempt ini. Fokuskan belajar berikutnya pada penguatan kosakata dan evaluasi kembali soal yang belum tepat.", actions: ["Review Kosakata", "Kumpulan Flashcard", "Review jawaban yang salah"], href: `/flashcards${query}` },
    Bunpou: { title: "Fokus utama: Bunpou (Tata Bahasa)", body: "Skor Tata Bahasa merupakan yang terendah pada attempt ini. Ulangi pola kalimat dan latihan terkait sebelum mencoba simulasi berikutnya.", actions: ["Review Modul Tata Bahasa", "Latihan Tata Bahasa", "Review jawaban yang salah"], href: `/learn/n4/chapter-4/grammar${query}` },
    Dokkai: { title: "Fokus utama: Dokkai (Reading)", body: "Skor Reading merupakan yang terendah pada attempt ini. Fokuskan belajar berikutnya pada pemahaman bacaan dan evaluasi kembali soal yang belum tepat.", actions: ["Ulangi materi Reading", "Kerjakan Latihan Reading", "Review jawaban yang salah"], href: `/learn/n4/chapter-4/reading${query}` },
    Choukai: { title: "Fokus utama: Choukai (Listening)", body: "Skor Listening masih lebih rendah dibanding bagian lainnya. Latihan mendengar secara berulang akan membantu meningkatkan pemahaman percakapan.", actions: ["Ulangi materi Audio", "Kerjakan Latihan Listening", "Review soal audio yang salah"], href: `/learn/n4/chapter-4/audio${query}` },
  };
  const allEqual = sections.every((section) => section.score / section.maxScore === sections[0].score / sections[0].maxScore);
  if (allEqual || weakest.score / weakest.maxScore >= 0.9) return { title: "Fokus Selanjutnya: Pertahankan Konsistensi", body: "Performa antar bagian cukup seimbang. Lanjutkan latihan secara konsisten dan review soal yang masih salah.", actions: ["Review jawaban"] };
  return recommendations[weakest.key];
}

const tryouts: TryoutItem[] = [
  { id: "to-n4-1", icon: LuGraduationCap, level: "N4", title: "Try Out N4 — Simulasi 1", status: "TERSEDIA", description: "Simulasi penuh dengan format standar JLPT dan review jawaban lengkap.", meta: "100 soal • 2 attempt", view: "info" },
  { id: "to-n3-1", icon: LuClock, level: "N3", title: "Try Out N3 — Simulasi Nasional", status: "MENUNGGU", description: "Dijadwalkan serentak dan terbuka otomatis sesuai tanggal mulai.", meta: "Mulai 12 Agustus • 1 attempt", view: "waiting" },
  { id: "to-n2-1", icon: LuLock, level: "N2", title: "Try Out N2 — Latihan Resmi", status: "TERKUNCI", description: "Memerlukan level N2 aktif atau paket pembelajaran lanjutan.", meta: "Level tidak aktif • review tersedia", view: "locked" },
  { id: "to-n4-2", icon: LuRotateCcw, level: "N4", title: "Try Out N4 — Simulasi 2025", status: "ATTEMPT HABIS", description: "Seluruh percobaan sudah digunakan. Hasil terakhir tetap tersimpan.", meta: "Skor terakhir 142/180 • 0 attempt", view: "exhausted" },
  { id: "to-n4-3", icon: LuFileCheck, level: "N4", title: "Try Out N4 — Review Tertutup", status: "SELESAI", description: "Hasil tersedia dan nilai kelulusan sudah tercatat resmi.", meta: "Skor 153/180 • review off", view: "review-unavailable" },
];

export function SenseiTryoutScreen({ membership = "sensei" }: { membership?: "lms" | "sensei" }) {
  const [view, setView] = useState<View>("list");
  const [answer, setAnswer] = useState("a");
  const [marked, setMarked] = useState(false);
  const [listFilter, setListFilter] = useState("SEMUA LEVEL");
  const [question, setQuestion] = useState(4);
  const [reviewFilter, setReviewFilter] = useState("SEMUA 100");
  const [reviewQuestion, setReviewQuestion] = useState(4);
  const [submitConfirm, setSubmitConfirm] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5922);
  const [questionRange, setQuestionRange] = useState(0);
  const [selectedAssessment, setSelectedAssessment] = useState<PublishedAssessment>();
  const published = usePublishedAssessments();
  const publishedTryouts: TryoutItem[] = published.filter((item) => item.type === "tryout").map((item) => ({ id: item.id, icon: LuGraduationCap, level: item.level, title: item.title, status: "TERSEDIA", description: "Simulasi terbit dari pengaturan admin.", meta: `${item.questions.length} soal`, view: "info", assessment: item }));
  const catalog = [...tryouts.filter((fixture) => !publishedTryouts.some((item) => item.id === fixture.id)), ...publishedTryouts];
  const questions = selectedAssessment?.questions ?? [];
  const activeQuestion = questions[Math.min(question - 1, Math.max(questions.length - 1, 0))];
  useEffect(() => {
    if (view !== "runner" || secondsLeft === 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [view, secondsLeft]);
  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const list = () => setView("list");

  if (view === "locked") {
    return (
      <AssessmentUnavailable
        eyebrow="TRY OUT • AKSES TERKUNCI"
        title="Try Out ini belum tersedia untuk akunmu"
        description="Akses mengikuti paket belajar, level aktif, dan jadwal yang ditentukan tim akademik."
        facts={["Aturan resmi", "Level spesifik", "Progress aman"]}
        primary={{ label: "Lihat Paket Level", href: `/program?membership=${membership}` }}
        secondary={{ label: "Kembali ke Try Out", onClick: list }}
      />
    );
  }

  if (view === "waiting") {
    return (
      <AssessmentUnavailable
        eyebrow="TRY OUT • BELUM DIMULAI"
        title="Jadwal Try Out belum aktif"
        description="Try Out akan terbuka otomatis sesuai tanggal mulai yang telah ditetapkan."
        facts={["Jadwal resmi", "Tidak mengurangi attempt", "Pengingat tersedia"]}
        primary={{ label: "Kembali ke Daftar", onClick: list }}
        secondary={{ label: "Kembali Dashboard", href: `/dashboard?membership=${membership}` }}
      />
    );
  }

  if (view === "exhausted") {
    return (
      <AssessmentUnavailable
        eyebrow="TRY OUT • ATTEMPT HABIS"
        title="Seluruh percobaan sudah digunakan"
        description="Jumlah percobaan telah mencapai batas maksimal. Hasil terakhir tetap tersimpan resmi di akunmu."
        facts={["Attempt tercatat", "Hasil tersimpan", "Sertifikasi aman"]}
        primary={{ label: "Lihat Hasil Terakhir", onClick: () => setView("result") }}
        secondary={{ label: "Kembali ke Daftar", onClick: list }}
      />
    );
  }

  if (view === "timeout") {
    return (
      <AssessmentUnavailable
        eyebrow="TRY OUT • WAKTU HABIS"
        title="Jawaban otomatis dikirim"
        description="Saat durasi sesi berakhir, sistem otomatis mengirimkan jawaban yang telah tersimpan."
        facts={["Autosave aktif", "Auto-submit", "Attempt tercatat"]}
        primary={{ label: "Lihat Hasil", onClick: () => setView("result") }}
        secondary={{ label: "Kembali ke Daftar", onClick: list }}
      />
    );
  }

  if (view === "review-unavailable") {
    return (
      <AssessmentUnavailable
        eyebrow="ULASAN • DINONAKTIFKAN"
        title="Ulasan jawaban belum dibuka"
        description="Ulasan pembahasan dinonaktifkan sementara untuk sesi ini. Skor dan hasil tetap tersimpan."
        facts={["Aturan per Try Out", "Nilai tersimpan", "Otoritas akademik"]}
        primary={{ label: "Kembali ke Hasil", onClick: () => setView("result") }}
        secondary={{ label: "Kembali ke Daftar", onClick: list }}
      />
    );
  }

  if (view === "runner") {
    const totalQuestions = selectedAssessment ? questions.length : 100;
    const rangeStart = questionRange * 25 + 1;
    return (
      <div className="sensei-tryout tryout-runner tryout-clean-focus">
        <header className="tryout-focus-header"><div><h1>Soal {question} dari {totalQuestions}</h1><p>{selectedAssessment?.title ?? "Try Out N4"} • {activeQuestion?.section ?? "Bunpou"} • Attempt 1/2</p></div><div className="tryout-focus-timer"><span>Timer</span><strong>{timerLabel}</strong><small>Sisa waktu sesi</small></div></header>
        <div className="tryout-focus-status"><span><strong>14/100</strong> Dijawab</span><i aria-hidden="true" /> <span><strong>{marked ? "3" : "2"}</strong> Ditandai</span><i aria-hidden="true" /> <span>Auto-save Aktif</span></div>
        <div className="tryout-focus-layout"><main><section className="tryout-focus-question"><p className="dash-kicker">BAGIAN {activeQuestion?.section.toUpperCase() ?? "BUNPOU"} • SOAL {question}</p><h2>{activeQuestion?.prompt ?? "Pilih jawaban yang paling tepat."}</h2><p className="tryout-question-japanese">{activeQuestion?.japanese?.text ?? "日本へ行く前に、パスポートを＿＿＿＿。"}</p><fieldset><legend className="sr-only">Pilih satu jawaban</legend>{(activeQuestion?.options.map((option) => [option.id, option.label]) ?? [["a", "確認しておきます"], ["b", "確認しています"], ["c", "確認したことがあります"], ["d", "確認するでしょう"]]).map(([id, label], index) => <label className={answer === id ? "selected" : ""} key={id}><input type="radio" name="tryout-answer" checked={answer === id} onChange={() => setAnswer(id)} /><span className="tryout-option-letter">{String.fromCharCode(65 + index)}</span><span>{label}</span></label>)}</fieldset></section><div className="tryout-focus-actions"><button type="button" onClick={() => setQuestion((value) => Math.max(1, value - 1))} disabled={question === 1}>Sebelumnya</button><button className={marked ? "marked" : ""} type="button" onClick={() => setMarked((value) => !value)}><LuFlag aria-hidden="true" />{marked ? "Hapus Tanda" : "Tandai Soal"}</button><button type="button" onClick={() => setQuestion((value) => Math.min(totalQuestions, value + 1))} disabled={question === totalQuestions}>Selanjutnya</button></div></main><aside className="tryout-focus-navigator"><p className="dash-kicker">NAVIGATOR SOAL</p><strong>14 dijawab • {marked ? "3" : "2"} ditandai</strong><div className="tryout-number-grid">{Array.from({ length: 25 }, (_, index) => { const number = rangeStart + index; return <button aria-current={number === question ? "step" : undefined} aria-label={`Soal ${number}${number === question ? ", sedang dibuka" : index < 14 ? ", sudah dijawab" : ", belum dijawab"}`} className={`${number === question ? "active" : ""} ${number < 14 ? "answered" : ""}`} onClick={() => setQuestion(number)} type="button" key={number}>{number}</button>; })}</div><div className="tryout-range"><span>Range</span>{["1–25", "26–50", "51–75", "76–100"].map((range, index) => <button className={questionRange === index ? "active" : ""} type="button" onClick={() => setQuestionRange(index)} key={range}>{range}</button>)}</div><button className="tryout-submit" type="button" onClick={() => setSubmitConfirm(true)}>Selesaikan Try Out</button><button type="button" onClick={list}>Keluar Sesi</button></aside></div>{submitConfirm && <div className="tryout-submit-modal"><section role="dialog" aria-modal="true" aria-labelledby="tryout-submit-title"><h2 id="tryout-submit-title">Selesaikan Try Out?</h2><p>14 dari 100 soal belum dijawab.</p><small>Setelah dikirim, jawaban tidak dapat diubah pada attempt ini.</small><div><button type="button" onClick={() => setSubmitConfirm(false)}>Kembali Mengerjakan</button><button type="button" onClick={() => { setSubmitConfirm(false); setView("result"); }}>Kirim</button></div></section></div>}
      </div>
    );
  }

  // Result view matching JLPT Score Layout
  if (view === "result") {
    const correct = answer === "a" ? 1 : 0;
    const answered = answer ? 1 : 0;
    const unanswered = 100 - answered;
    const totalScore = correct * 2;
    const sections: ResultSection[] = [
      { key: "Moji Goi", label: "Moji Goi (Kosakata)", score: correct, maxScore: 25 },
      { key: "Bunpou", label: "Bunpou (Tata Bahasa)", score: 18, maxScore: 25 },
      { key: "Dokkai", label: "Dokkai (Reading)", score: 12, maxScore: 25 },
      { key: "Choukai", label: "Choukai (Listening)", score: 20, maxScore: 25 },
    ];
    const recommendation = getRecommendation(sections, membership);
    return (
      <div className="sensei-tryout tryout-result-report">
        <header className="tryout-result-header"><h1>Hasil Try Out</h1></header>
        <section className="tryout-score-report"><div className="tryout-section-scores"><h2><span>得点区分別得点</span><small>Scores by Scoring Section</small></h2><article><div><strong>言語知識（文字・語彙・文法）・読解</strong><small>Language Knowledge (Vocabulary/Grammar) &amp; Reading</small></div><b>{correct * 2} / 120</b></article><article><div><strong>聴解</strong><small>Listening</small></div><b>0 / 60</b></article></div><div className="tryout-total-score"><span>総合得点</span><small>Total Score</small><strong>{totalScore}</strong><em>/ 180</em></div></section>
        <section className="tryout-lower-grid"><section className="tryout-reference-info"><h2>Reference Information</h2><dl><div><dt>Jawaban Benar</dt><dd>{correct}</dd></div><div><dt>Jawaban Salah</dt><dd>{answered - correct}</dd></div><div><dt>Tidak Dijawab</dt><dd>{unanswered}</dd></div><div><dt>Waktu Pengerjaan</dt><dd>01:32:18</dd></div><div><dt>Attempt</dt><dd>1 / 2</dd></div></dl></section><aside className="tryout-recommendation"><h2>Rekomendasi Belajar</h2><h3>{recommendation.title}</h3><p>{recommendation.body}</p><ul>{recommendation.actions.map((action) => <li key={action}>{action}</li>)}</ul>{recommendation.href ? <Link className="button button-primary" href={recommendation.href}>Buka Materi Terkait <LuArrowRight aria-hidden="true" /></Link> : null}</aside></section>
        <div className="tryout-result-actions"><button type="button" className="button button-secondary" onClick={list}><LuArrowLeft aria-hidden="true" /> Kembali ke Daftar Try Out</button><button type="button" className="button button-primary" onClick={() => setView("review")}>Review Jawaban <LuArrowRight aria-hidden="true" /></button></div>
      </div>
    );
  }

  if (false) {
    return (
      <div className="sensei-tryout tryout-result" style={{ textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div>
            <p className="dash-kicker">TRY OUT N4 • HASIL RESMI</p>
            <h1 style={{ margin: "4px 0 8px", fontSize: "clamp(26px, 4vw, 36px)" }}>Hasil Simulasi JLPT</h1>
            <p style={{ color: "var(--muted)", margin: 0, fontSize: "14px" }}>
              Penilaian terstandarisasi dengan pembagian skor per bagian kemampuan bahasa Jepang.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="button button-secondary"
              onClick={list}
              style={{ minHeight: "44px" }}
            >
              <LuArrowLeft aria-hidden="true" />
              Kembali ke Daftar
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() => setView("review")}
              style={{ minHeight: "44px" }}
            >
              Review Jawaban
              <LuArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Dashboard Grid for Scores */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Hero Score Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "28px",
              border: "1px solid #e1d2c7",
              boxShadow: "0 4px 20px rgba(42, 49, 61, 0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: "18px", color: "var(--ink)", fontWeight: "800" }}>
              Total Skor
            </h3>
            <div style={{ position: "relative", width: "170px", height: "170px", marginBottom: "16px" }}>
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#fff1e6"
                  strokeWidth="3.2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="3.2"
                  strokeDasharray="85, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "40px", fontWeight: "800", color: "var(--orange-dark)", lineHeight: 1 }}>
                  153
                </span>
                <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "700" }}>/ 180</span>
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#eaf3e7",
                color: "#41623a",
                padding: "8px 16px",
                borderRadius: "999px",
                fontWeight: "800",
                fontSize: "13px",
              }}
            >
              <LuSparkles aria-hidden="true" />
              <span>Lulus (Goukaku)</span>
            </div>
          </div>

          {/* Breakdown & Quick Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Quick Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "18px",
                  border: "1px solid #e1d2c7",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#fff1e6",
                    color: "var(--orange-dark)",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "22px",
                  }}
                >
                  <LuClock aria-hidden="true" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)", fontWeight: "700" }}>
                    Waktu Digunakan
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: "800", color: "var(--ink)" }}>
                    78 <span style={{ fontSize: "13px", fontWeight: "500" }}>Menit</span>
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "18px",
                  border: "1px solid #e1d2c7",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#eaf3e7",
                    color: "#41623a",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "22px",
                  }}
                >
                  <LuCircleCheck aria-hidden="true" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)", fontWeight: "700" }}>
                    Total Jawaban Benar
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: "800", color: "var(--ink)" }}>
                    85 <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "500" }}>/ 100</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section Breakdown Card */}
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "24px",
                border: "1px solid #e1d2c7",
                flex: 1,
              }}
            >
              <h3 style={{ margin: "0 0 18px", fontSize: "16px", fontWeight: "800" }}>Detail per Bagian (JLPT Format)</h3>
              <div style={{ display: "grid", gap: "16px" }}>
                {/* Kanji & Kosakata */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                    <span style={{ fontWeight: "700" }}>Kanji &amp; Kosakata (Moji Goi)</span>
                    <strong style={{ color: "var(--orange-dark)" }}>45 / 60 (75%)</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", borderRadius: "999px", background: "var(--soft)" }}>
                    <div style={{ width: "75%", height: "100%", borderRadius: "999px", background: "var(--orange)" }} />
                  </div>
                </div>

                {/* Grammar & Reading */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                    <span style={{ fontWeight: "700" }}>Tata Bahasa &amp; Membaca (Bunpou &amp; Dokkai)</span>
                    <strong style={{ color: "var(--orange-dark)" }}>52 / 60 (86%)</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", borderRadius: "999px", background: "var(--soft)" }}>
                    <div style={{ width: "86%", height: "100%", borderRadius: "999px", background: "var(--orange)" }} />
                  </div>
                </div>

                {/* Listening */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px" }}>
                    <span style={{ fontWeight: "700" }}>Mendengar (Choukai)</span>
                    <strong style={{ color: "var(--orange-dark)" }}>56 / 60 (93%)</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", borderRadius: "999px", background: "var(--soft)" }}>
                    <div style={{ width: "93%", height: "100%", borderRadius: "999px", background: "var(--orange)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Recommendation Card */}
        <section
          style={{
            borderRadius: "20px",
            padding: "24px 28px",
            background: "var(--navy)",
            color: "#fff",
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(244, 130, 32, 0.2)",
              color: "var(--orange)",
              display: "grid",
              placeItems: "center",
              fontSize: "26px",
              flexShrink: 0,
            }}
          >
            <LuLightbulb aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: "18px", color: "#fff" }}>Rekomendasi Belajar</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#dce2f3", lineHeight: 1.6 }}>
              Kerja bagus! Nilai Choukai (Mendengar) kamu sangat baik. Namun, untuk Moji Goi, kamu perlu mengulang materi
              Kanji Chapter 2 dan Latihan Partikel に. Fokus pada area ini untuk simulasi berikutnya.
            </p>
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="button" className="button button-secondary" onClick={list}>
            Kembali ke Daftar
          </button>
          <button type="button" className="button button-primary" onClick={() => setView("review")}>
            Ulasan Jawaban &rarr;
          </button>
        </div>
      </div>
    );
  }

  if (view === "review") {
    return (
      <div className="sensei-tryout tryout-review">
        <header>
          <div>
            <p className="dash-kicker">TRY OUT N4 • ULASAN</p>
            <h1>Tinjau jawaban dan pembahasan</h1>
            <p>Review jawaban aktif dengan penjelasan konsep dan rekomendasi modul.</p>
          </div>
          <span style={{ padding: "8px 12px", borderRadius: "999px", background: "#eaf3e7", color: "#41623a", fontSize: "11px", fontWeight: "800" }}>
            REVIEW AKTIF
          </span>
        </header>

        <div className="tryout-review-filters">
          <span>FILTER JAWABAN</span>
          {["SEMUA 100", "SALAH 18", "BENAR 82", "DITANDAI 3", "BUNPOU"].map((filter) => (
            <button
              className={reviewFilter === filter ? "active" : ""}
              type="button"
              onClick={() => setReviewFilter(filter)}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="tryout-review-layout">
          <aside>
            <h2>DAFTAR SOAL</h2>
            {Array.from({ length: 10 }, (_, index) => (
              <button
                className={reviewQuestion === index + 1 ? "active" : ""}
                type="button"
                onClick={() => setReviewQuestion(index + 1)}
                key={index}
              >
                Soal {index + 1}
              </button>
            ))}
          </aside>
          <main>
            <p className="dash-kicker">SOAL {reviewQuestion} • BUNPOU</p>
            {reviewQuestion === 4 ? (
              <>
                <h2>日本へ行く前に、パスポートを＿＿＿＿。</h2>
                <div style={{ display: "grid", gap: "8px", margin: "16px 0" }}>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "#eaf3e7",
                      color: "#41623a",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: "700",
                    }}
                  >
                    <LuCheck aria-hidden="true" />
                    <span>Jawaban Benar: A. 確認しておきます</span>
                  </div>
                </div>
                <section style={{ padding: "16px", background: "var(--soft)", borderRadius: "12px" }}>
                  <p style={{ margin: "0 0 6px", fontWeight: "800", color: "var(--ink)" }}>Pembahasan:</p>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px", lineHeight: 1.6 }}>
                    Pola ～ておく digunakan untuk menyatakan persiapan yang dilakukan sebelumnya demi tujuan tertentu.
                    Karena konteks kalimat adalah persiapan sebelum berangkat ke Jepang, maka bentuk 『確認しておきます』
                    adalah pilihan yang paling tepat.
                  </p>
                </section>
              </>
            ) : (
              <section className="tryout-review-placeholder">
                <p>Konten ulasan tersedia lengkap untuk soal yang dipilih.</p>
              </section>
            )}
          </main>
        </div>

        <div className="learning-question-actions">
          <button className="button button-secondary" type="button" onClick={() => setView("result")}>
            Kembali ke Hasil
          </button>
          <Link className="button button-dark" href={`/practice?membership=${membership}`}>
            Latihan Rekomendasi
          </Link>
        </div>
      </div>
    );
  }

  if (view === "info") {
    return (
      <div className="sensei-tryout tryout-prestart">
        <button className="sensei-back" type="button" onClick={list}>&larr; Kembali ke Daftar</button>
        <div className="tryout-prestart-layout">
          <main>
            <section className="tryout-prestart-info"><p className="dash-kicker">INFORMASI SIMULASI</p><h1>{selectedAssessment?.title}</h1><p>Try Out ini menggunakan sistem waktu mundur (timer) dan penilaian standar JLPT. Anda dapat meninjau jawaban setelah menyelesaikan seluruh sesi.</p><div className="tryout-info-tiles"><div><LuClock aria-hidden="true" /><strong>{selectedAssessment?.durationMinutes ?? 125} Menit</strong><span>Total Waktu</span></div><div><LuListOrdered aria-hidden="true" /><strong>{selectedAssessment?.sections?.length ?? 4} Sesi</strong><span>Pembagian</span></div><div><LuChartNoAxesCombined aria-hidden="true" /><strong>{selectedAssessment?.maxScore ?? 180} Poin</strong><span>Skor Maksimal</span></div><div><LuFileCheck aria-hidden="true" /><strong>Review Mode</strong><span>Tersedia</span></div></div></section>
            <div className="tryout-prestart-warning"><strong><LuTriangleAlert aria-hidden="true" /> Peringatan</strong><p>Timer akan mulai setelah Anda menekan tombol Mulai Try Out. Pastikan Anda siap sebelum memulai.</p></div>
          </main>
          <aside className="tryout-prestart-sidebar"><section className="tryout-sections"><h2>Materi Sesi</h2>{selectedAssessment?.sections?.map((section) => <div key={section}><LuListOrdered aria-hidden="true" /><strong>{section}</strong><small>{selectedAssessment.questions.filter((question) => question.section === section).length} soal</small></div>) ?? <><div><LuListOrdered aria-hidden="true" /><strong>Kosakata &amp; Kanji</strong><small>25 Menit</small></div><div><LuSpellCheck aria-hidden="true" /><strong>Tata Bahasa</strong><small>30 Menit</small></div><div><LuBookOpen aria-hidden="true" /><strong>Reading (Dokkai)</strong><small>35 Menit</small></div><div><LuHeadphones aria-hidden="true" /><strong>Audio (Choukai)</strong><small>35 Menit</small></div></>}</section><button className="tryout-start-button" type="button" onClick={() => setView("runner")}>Mulai Try Out <LuArrowRight aria-hidden="true" /></button></aside>
        </div>
      </div>
    );
  }

  const visibleTryouts = catalog.filter(
    (item) =>
      listFilter === "SEMUA LEVEL" ||
      (listFilter === "N4" && item.level === "N4") ||
      (listFilter === "N3" && item.level === "N3") ||
      (listFilter === "N2" && item.level === "N2") ||
      (listFilter === "TERSEDIA" && item.status === "TERSEDIA") ||
      (listFilter === "SELESAI" && item.status === "SELESAI") ||
      (listFilter === "REVIEW AKTIF" && item.meta.includes("review"))
  );

  return (
    <div className="sensei-tryout">
       <header className="tryout-page-header">
         <div>
           <p className="dash-kicker">TRY OUT</p>
           <h1>Try Out</h1>
           <p>Simulasikan ujian sebelum ujian sebenarnya.</p>
         </div>
         <label className="tryout-level-select">Pilih Level
           <select aria-label="Pilih Level Try Out" value={listFilter === "N4" || listFilter === "N3" || listFilter === "N2" ? listFilter : "SEMUA LEVEL"} onChange={(event) => setListFilter(event.target.value)}>
             {["SEMUA LEVEL", "N4", "N3", "N2"].map((filter) => <option key={filter}>{filter}</option>)}
           </select>
         </label>
       </header>
       <section className="tryout-catalog">
         <div className="tryout-catalog-toolbar">
           <h2>Simulasi yang tersedia</h2>
         </div>
        <div>
           {visibleTryouts.map((item, index) => (
             <article className="tryout-card" key={item.id}>
               <div className="tryout-card-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="tryout-card-main">
                  <header className="tryout-card-header"><h3>{item.level} | {item.title.replace(`Try Out ${item.level} — `, "").replace(`${item.level} — `, "")}</h3><span className={`tryout-status-badge status-${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span></header>
                 <p>{item.description}</p>
                 <div className="tryout-card-meta"><span>{item.meta}</span></div>
               </div>
               <footer><button type="button" onClick={() => { setSelectedAssessment(item.assessment); setQuestion(item.assessment ? 1 : 4); setAnswer(""); setSecondsLeft((item.assessment?.durationMinutes ?? 98.7) * 60); setView(item.view); }}>{item.view === "info" ? "Mulai Try Out" : item.view === "review-unavailable" ? "Lihat Hasil" : "Lihat Status"}</button></footer>
             </article>
           ))}
        </div>
      </section>
    </div>
  );
}
