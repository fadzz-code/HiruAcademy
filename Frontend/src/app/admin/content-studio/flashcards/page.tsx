"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import {
  defaultFlashcards,
  type FlashcardContent,
  type LevelCode,
  type PublicationStatus,
} from "@/lib/content-studio";

const actualLearningSeeds: FlashcardContent[] = [
  {
    id: "learn",
    term: "学ぶ",
    reading: "まなぶ",
    meaning: "belajar / mempelajari",
    example: {
      before: "毎日、日本語を",
      focus: "学",
      focusReading: "まな",
      after: "んでいます。",
      translation: "Saya belajar bahasa Jepang setiap hari.",
    },
    level: "N4",
    chapter: "Chapter 4",
    order: 1,
    status: "published",
  },
  {
    id: "continue",
    term: "続ける",
    reading: "つづける",
    meaning: "melanjutkan",
    example: {
      before: "少しずつ勉強を",
      focus: "続",
      focusReading: "つづ",
      after: "けます。",
      translation: "Saya melanjutkan belajar sedikit demi sedikit.",
    },
    level: "N4",
    chapter: "Chapter 4",
    order: 2,
    status: "published",
  },
  {
    id: "understand",
    term: "分かる",
    reading: "わかる",
    meaning: "mengerti / memahami",
    example: {
      before: "例を見ると、意味が",
      focus: "分",
      focusReading: "わ",
      after: "かります。",
      translation: "Dengan melihat contoh, saya memahami artinya.",
    },
    level: "N4",
    chapter: "Chapter 4",
    order: 3,
    status: "published",
  },
  {
    id: "review",
    term: "復習",
    reading: "ふくしゅう",
    meaning: "mengulang pelajaran",
    example: {
      before: "学んだ言葉を",
      focus: "復習",
      focusReading: "ふくしゅう",
      after: "します。",
      translation: "Saya mengulang kosakata yang sudah dipelajari.",
    },
    level: "N4",
    chapter: "Chapter 4",
    order: 4,
    status: "published",
  },
];

type FlashcardFormState = {
  term: string;
  reading: string;
  meaning: string;
  exampleBefore: string;
  exampleFocus: string;
  exampleFocusReading: string;
  exampleAfter: string;
  exampleTranslation: string;
  level: LevelCode;
  chapter: string;
  order: number;
  status: PublicationStatus;
};

const initialFormData: FlashcardFormState = {
  term: "",
  reading: "",
  meaning: "",
  exampleBefore: "",
  exampleFocus: "",
  exampleFocusReading: "",
  exampleAfter: "",
  exampleTranslation: "",
  level: "N5",
  chapter: "Chapter 1",
  order: 1,
  status: "draft",
};

function PreviewCardSurface({ card }: { card: FlashcardContent }) {
  const [flipped, setFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleToggleFlip() {
    if (isAnimating) return;
    setIsAnimating(true);
    surfaceRef.current?.classList.add("is-flipping");
    flipTimerRef.current = setTimeout(() => {
      setFlipped((prev) => !prev);
    }, 300);
  }

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    function handleAnimationEnd(event: AnimationEvent) {
      if (event.animationName !== "flashcard-flip") return;
      surface?.classList.remove("is-flipping");
      requestAnimationFrame(() => setIsAnimating(false));
    }
    surface.addEventListener("animationend", handleAnimationEnd);
    return () => {
      surface.removeEventListener("animationend", handleAnimationEnd);
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <p className="flash-instruction">Klik kartu untuk melihat arti dan contoh.</p>

      <div
        ref={surfaceRef}
        className="flashcard-surface"
        role="button"
        tabIndex={0}
        onClick={handleToggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleToggleFlip();
          if (event.key === " ") {
            event.preventDefault();
            handleToggleFlip();
          }
        }}
        aria-pressed={flipped}
        style={{ height: "360px" }}
      >
        {flipped ? (
          <div className="flash-face flash-back">
            <span className="back-word">
              <small>Arti</small>
              <strong>{card.meaning}</strong>
            </span>
            <span className="example-block">
              <small>Contoh kalimat</small>
              <span className="example-japanese">
                {card.example.before}
                <ruby>
                  {card.example.focus}
                  <rt>{card.example.focusReading}</rt>
                </ruby>
                {card.example.after}
              </span>
              <em>{card.example.translation}</em>
            </span>
          </div>
        ) : (
          <div className="flash-face flash-front">
            <small>Japanese</small>
            <ruby>
              {card.term}
              <rt>{card.reading}</rt>
            </ruby>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="button button-secondary" type="button" onClick={handleToggleFlip}>
          {flipped ? "Lihat Sisi Depan" : "Balik Kartu"}
        </button>
      </div>
    </div>
  );
}

export default function FlashcardsStudioPage() {
  const [cards, setCards] = useState<FlashcardContent[]>(() =>
    defaultFlashcards.length > 0 ? [...defaultFlashcards] : actualLearningSeeds
  );
  const [selectedId, setSelectedId] = useState<string>(() =>
    cards[0] ? cards[0].id : ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [chapterFilter, setChapterFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editorMode, setEditorMode] = useState<"none" | "create" | "edit">("none");
  const [formData, setFormData] = useState<FlashcardFormState>(initialFormData);
  const [archiveTargetId, setArchiveTargetId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const availableChapters = useMemo(() => {
    const set = new Set<string>();
    for (const card of cards) {
      if (card.chapter) set.add(card.chapter);
    }
    return Array.from(set).sort();
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards
      .filter((card) => {
        if (levelFilter !== "all" && card.level !== levelFilter) return false;
        if (chapterFilter !== "all" && card.chapter !== chapterFilter) return false;
        if (statusFilter !== "all" && card.status !== statusFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTerm = card.term.toLowerCase().includes(q);
          const matchReading = card.reading.toLowerCase().includes(q);
          const matchMeaning = card.meaning.toLowerCase().includes(q);
          const matchChapter = card.chapter.toLowerCase().includes(q);
          const matchTranslation = card.example.translation.toLowerCase().includes(q);
          if (!matchTerm && !matchReading && !matchMeaning && !matchChapter && !matchTranslation) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [cards, levelFilter, chapterFilter, statusFilter, searchQuery]);

  const selectedCard = useMemo(() => {
    return cards.find((c) => c.id === selectedId) || filteredCards[0] || cards[0];
  }, [cards, selectedId, filteredCards]);

  function openCreate() {
    setFormData({
      term: "",
      reading: "",
      meaning: "",
      exampleBefore: "",
      exampleFocus: "",
      exampleFocusReading: "",
      exampleAfter: "",
      exampleTranslation: "",
      level: "N5",
      chapter: "Chapter 1",
      order: cards.length + 1,
      status: "draft",
    });
    setEditorMode("create");
    setFeedback("");
  }

  function openEdit(card: FlashcardContent) {
    setSelectedId(card.id);
    setFormData({
      term: card.term,
      reading: card.reading,
      meaning: card.meaning,
      exampleBefore: card.example.before,
      exampleFocus: card.example.focus,
      exampleFocusReading: card.example.focusReading,
      exampleAfter: card.example.after,
      exampleTranslation: card.example.translation,
      level: card.level,
      chapter: card.chapter,
      order: card.order,
      status: card.status,
    });
    setEditorMode("edit");
    setFeedback("");
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!formData.term.trim()) return;

    if (editorMode === "create") {
      const newCard: FlashcardContent = {
        id: `card-${Date.now()}`,
        term: formData.term.trim(),
        reading: formData.reading.trim(),
        meaning: formData.meaning.trim(),
        example: {
          before: formData.exampleBefore,
          focus: formData.exampleFocus,
          focusReading: formData.exampleFocusReading,
          after: formData.exampleAfter,
          translation: formData.exampleTranslation,
        },
        level: formData.level,
        chapter: formData.chapter.trim() || "Chapter 1",
        order: Number(formData.order) || cards.length + 1,
        status: formData.status,
      };
      setCards((prev) => [...prev, newCard]);
      setSelectedId(newCard.id);
      setFeedback("Flashcard baru berhasil ditambahkan.");
    } else if (editorMode === "edit" && selectedCard) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === selectedCard.id
            ? {
                ...c,
                term: formData.term.trim(),
                reading: formData.reading.trim(),
                meaning: formData.meaning.trim(),
                example: {
                  before: formData.exampleBefore,
                  focus: formData.exampleFocus,
                  focusReading: formData.exampleFocusReading,
                  after: formData.exampleAfter,
                  translation: formData.exampleTranslation,
                },
                level: formData.level,
                chapter: formData.chapter.trim() || "Chapter 1",
                order: Number(formData.order) || c.order,
                status: formData.status,
              }
            : c
        )
      );
      setFeedback("Perubahan flashcard berhasil disimpan.");
    }
    setEditorMode("none");
  }

  function handleDuplicate(card: FlashcardContent) {
    const duplicated: FlashcardContent = {
      ...card,
      id: `${card.id}-copy-${Date.now()}`,
      order: cards.length + 1,
      status: "draft",
    };
    setCards((prev) => [...prev, duplicated]);
    setSelectedId(duplicated.id);
    setFeedback("Kartu berhasil diduplikasi ke status draft.");
  }

  function handleTogglePublish(cardId: string) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const nextStatus: PublicationStatus = c.status === "published" ? "draft" : "published";
        return { ...c, status: nextStatus };
      })
    );
    setFeedback("Status publikasi berhasil diperbarui.");
  }

  function handleReorder(cardId: string, direction: -1 | 1) {
    setCards((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((c) => c.id === cardId);
      if (index < 0) return prev;
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;

      const current = sorted[index];
      const target = sorted[targetIndex];
      sorted[index] = target;
      sorted[targetIndex] = current;

      return sorted.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));
    });
    setFeedback("Urutan kartu berhasil diperbarui.");
  }

  function confirmArchive() {
    if (!archiveTargetId) return;
    setCards((prev) =>
      prev.map((c) => (c.id === archiveTargetId ? { ...c, status: "archived" } : c))
    );
    setArchiveTargetId(null);
    setFeedback("Flashcard telah diarsipkan.");
  }

  const publishedCount = cards.filter((c) => c.status === "published").length;
  const draftCount = cards.filter((c) => c.status === "draft").length;
  const archivedCount = cards.filter((c) => c.status === "archived").length;

  return (
    <AdminShell current="content-studio">
      <main className="admin-page admin-a2-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • CONTENT STUDIO • FLASHCARDS</p>
            <h1>Flashcard Studio</h1>
            <p>Kelola deck kartu kosakata, bacaan furigana, dan contoh kalimat pada materi pembelajaran.</p>
          </div>
          <div className="admin-header-actions">
            <Link className="button button-secondary" href="/admin/content-studio">
              Content Studio
            </Link>
            <button className="button button-primary" type="button" onClick={openCreate}>
              Tambah Flashcard
            </button>
          </div>
        </header>

        <section className="admin-kpi-grid" aria-label="Ringkasan flashcards">
          <article className="admin-kpi-card">
            <h2>Total Flashcard</h2>
            <strong>{cards.length}</strong>
            <small>Kartu terdaftar dalam sistem.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Dipublikasikan</h2>
            <strong>{publishedCount}</strong>
            <small>Tersedia untuk sesi belajar.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Draft</h2>
            <strong>{draftCount}</strong>
            <small>Sedang dalam penyusunan.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Diarsipkan</h2>
            <strong>{archivedCount}</strong>
            <small>Disimpan tanpa tampil aktif.</small>
          </article>
        </section>

        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            border: "1px solid #e1d2c7",
            borderRadius: "14px",
            background: "#fff",
          }}
          aria-label="Pemberitahuan server"
        >
          <div>
            <strong style={{ display: "block", fontSize: "13px", color: "var(--ink)" }}>
              Penyimpanan server belum tersedia
            </strong>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              Semua operasi dan manipulasi kartu berjalan pada state lokal frontend.
            </span>
          </div>
          {feedback && <span className="admin-local-feedback">{feedback}</span>}
        </section>

        <section className="library-filter-panel">
          <label className="admin-search-box">
            <span aria-hidden="true">Q</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata, cara baca, arti, atau chapter"
            />
          </label>
          <label className="admin-field">
            <span>Level</span>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
              <option value="all">Semua Level</option>
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N2</option>
              <option value="N1">N1</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Chapter</span>
            <select value={chapterFilter} onChange={(e) => setChapterFilter(e.target.value)}>
              <option value="all">Semua Chapter</option>
              {availableChapters.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </label>
          <label className="admin-field">
            <span>Status</span>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </label>
        </section>

        <div className="content-library-layout">
          <section className="asset-list-panel">
            <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0e9e4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "16px" }}>Daftar Flashcard ({filteredCards.length})</h2>
              {(levelFilter !== "all" || chapterFilter !== "all" || statusFilter !== "all" || searchQuery) && (
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    setLevelFilter("all");
                    setChapterFilter("all");
                    setStatusFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Reset Filter
                </button>
              )}
            </div>

            <div className="asset-list">
              {filteredCards.length > 0 ? (
                filteredCards.map((card, index) => {
                  const isCurrent = selectedCard?.id === card.id;
                  return (
                    <div
                      key={card.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "12px",
                        alignItems: "center",
                        padding: "14px 18px",
                        borderBottom: "1px solid #f0e9e4",
                        background: isCurrent ? "#fffaf5" : "#fff",
                        borderLeft: isCurrent ? "4px solid var(--orange)" : "4px solid transparent",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <button
                          type="button"
                          className="button button-secondary"
                          style={{ minHeight: "26px", padding: "0 8px", fontSize: "10px" }}
                          disabled={index === 0}
                          onClick={() => handleReorder(card.id, -1)}
                          aria-label={`Naikkan urutan ${card.term}`}
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          className="button button-secondary"
                          style={{ minHeight: "26px", padding: "0 8px", fontSize: "10px" }}
                          disabled={index === filteredCards.length - 1}
                          onClick={() => handleReorder(card.id, 1)}
                          aria-label={`Turunkan urutan ${card.term}`}
                        >
                          Down
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(card.id);
                          setEditorMode("none");
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "grid",
                          gap: "4px",
                          padding: 0,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                          <ruby style={{ fontSize: "18px", fontWeight: 800 }}>
                            {card.term}
                            <rt style={{ color: "var(--orange-dark)", fontSize: "10px" }}>{card.reading}</rt>
                          </ruby>
                          <small style={{ color: "#595e70", fontSize: "11px" }}>#{card.order}</small>
                        </div>
                        <strong style={{ fontSize: "13px", color: "var(--ink)" }}>{card.meaning}</strong>
                        <small style={{ color: "var(--muted)", fontSize: "11px" }}>
                          {card.level} • {card.chapter}
                        </small>
                      </button>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "10px",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            background:
                              card.status === "published"
                                ? "#e8f5e9"
                                : card.status === "draft"
                                ? "#fff3e0"
                                : card.status === "scheduled"
                                ? "#e3f2fd"
                                : "#f5f5f5",
                            color:
                              card.status === "published"
                                ? "#2e7d32"
                                : card.status === "draft"
                                ? "#e65100"
                                : card.status === "scheduled"
                                ? "#1565c0"
                                : "#616161",
                          }}
                        >
                          {card.status}
                        </span>

                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            type="button"
                            className="button button-secondary"
                            style={{ minHeight: "28px", padding: "0 8px", fontSize: "11px" }}
                            onClick={() => openEdit(card)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="button button-secondary"
                            style={{ minHeight: "28px", padding: "0 8px", fontSize: "11px" }}
                            onClick={() => handleDuplicate(card)}
                          >
                            Salin
                          </button>
                          <button
                            type="button"
                            className="button button-secondary"
                            style={{ minHeight: "28px", padding: "0 8px", fontSize: "11px" }}
                            onClick={() => handleTogglePublish(card.id)}
                          >
                            {card.status === "published" ? "Draft" : "Publish"}
                          </button>
                          <button
                            type="button"
                            className="button button-secondary danger"
                            style={{ minHeight: "28px", padding: "0 8px", fontSize: "11px" }}
                            onClick={() => setArchiveTargetId(card.id)}
                          >
                            Arsip
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: "40px 20px", textAlign: "center" }}>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px" }}>
                    Tidak ada flashcard yang cocok dengan kriteria pencarian.
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="asset-detail-panel">
            {editorMode !== "none" ? (
              <form onSubmit={handleSave} style={{ display: "grid", gap: "16px" }}>
                <header style={{ paddingBottom: "14px", borderBottom: "1px solid #f0e9e4" }}>
                  <h2 style={{ margin: 0, fontSize: "18px" }}>
                    {editorMode === "create" ? "Tambah Flashcard Baru" : "Edit Flashcard"}
                  </h2>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>
                    Isi field konten kartu dan relasi kurikulum.
                  </p>
                </header>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <label className="admin-field">
                    <span>Istilah (Term)</span>
                    <input
                      required
                      value={formData.term}
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                      placeholder="Contoh: 学ぶ"
                    />
                  </label>
                  <label className="admin-field">
                    <span>Cara Baca (Reading)</span>
                    <input
                      required
                      value={formData.reading}
                      onChange={(e) => setFormData({ ...formData, reading: e.target.value })}
                      placeholder="Contoh: まなぶ"
                    />
                  </label>
                </div>

                <label className="admin-field">
                  <span>Arti (Meaning)</span>
                  <input
                    required
                    value={formData.meaning}
                    onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                    placeholder="Contoh: belajar / mempelajari"
                  />
                </label>

                <div style={{ padding: "14px", border: "1px solid #e1d2c7", borderRadius: "12px", background: "#fcfaf9", display: "grid", gap: "12px" }}>
                  <strong style={{ fontSize: "12px", color: "#595e70" }}>Contoh Kalimat (Example)</strong>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <label className="admin-field">
                      <span>Teks Sebelum Fokus (before)</span>
                      <input
                        value={formData.exampleBefore}
                        onChange={(e) => setFormData({ ...formData, exampleBefore: e.target.value })}
                        placeholder="Contoh: 毎日、日本語を"
                      />
                    </label>
                    <label className="admin-field">
                      <span>Teks Sesudah Fokus (after)</span>
                      <input
                        value={formData.exampleAfter}
                        onChange={(e) => setFormData({ ...formData, exampleAfter: e.target.value })}
                        placeholder="Contoh: んでいます。"
                      />
                    </label>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <label className="admin-field">
                      <span>Fokus Utama (focus)</span>
                      <input
                        value={formData.exampleFocus}
                        onChange={(e) => setFormData({ ...formData, exampleFocus: e.target.value })}
                        placeholder="Contoh: 学"
                      />
                    </label>
                    <label className="admin-field">
                      <span>Bacaan Fokus (focusReading)</span>
                      <input
                        value={formData.exampleFocusReading}
                        onChange={(e) => setFormData({ ...formData, exampleFocusReading: e.target.value })}
                        placeholder="Contoh: まな"
                      />
                    </label>
                  </div>
                  <label className="admin-field">
                    <span>Terjemahan Contoh (translation)</span>
                    <input
                      value={formData.exampleTranslation}
                      onChange={(e) => setFormData({ ...formData, exampleTranslation: e.target.value })}
                      placeholder="Contoh: Saya belajar bahasa Jepang setiap hari."
                    />
                  </label>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                  <label className="admin-field">
                    <span>Level</span>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as LevelCode })}
                    >
                      <option value="N5">N5</option>
                      <option value="N4">N4</option>
                      <option value="N3">N3</option>
                      <option value="N2">N2</option>
                      <option value="N1">N1</option>
                    </select>
                  </label>
                  <label className="admin-field">
                    <span>Chapter</span>
                    <input
                      required
                      value={formData.chapter}
                      onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                      placeholder="Contoh: Chapter 4"
                    />
                  </label>
                  <label className="admin-field">
                    <span>Order</span>
                    <input
                      type="number"
                      required
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    />
                  </label>
                  <label className="admin-field">
                    <span>Status</span>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as PublicationStatus })}
                    >
                      <option value="draft">draft</option>
                      <option value="scheduled">scheduled</option>
                      <option value="published">published</option>
                      <option value="archived">archived</option>
                    </select>
                  </label>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button className="button button-primary" type="submit">
                    Simpan Kartu
                  </button>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => setEditorMode("none")}
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : selectedCard ? (
              <div style={{ display: "grid", gap: "20px" }}>
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--orange-dark)", textTransform: "uppercase" }}>
                      PREVIEW KARTU PEMBELAJARAN
                    </span>
                    <h2 style={{ margin: "4px 0 0", fontSize: "20px" }}>
                      {selectedCard.level} • {selectedCard.chapter}
                    </h2>
                  </div>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => openEdit(selectedCard)}
                  >
                    Edit Konten
                  </button>
                </header>

                <PreviewCardSurface key={selectedCard.id} card={selectedCard} />

                <dl style={{ margin: 0, display: "grid", gap: "8px", fontSize: "12px", borderTop: "1px solid #f0e9e4", paddingTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <dt style={{ color: "var(--muted)" }}>Urutan (Order)</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>#{selectedCard.order}</dd>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <dt style={{ color: "var(--muted)" }}>Status</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{selectedCard.status}</dd>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <dt style={{ color: "var(--muted)" }}>Level &amp; Chapter</dt>
                    <dd style={{ margin: 0, fontWeight: 700 }}>{selectedCard.level} - {selectedCard.chapter}</dd>
                  </div>
                </dl>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => handleDuplicate(selectedCard)}
                  >
                    Duplikasi
                  </button>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => handleTogglePublish(selectedCard.id)}
                  >
                    {selectedCard.status === "published" ? "Set ke Draft" : "Publikasikan"}
                  </button>
                  <button
                    className="button button-secondary danger"
                    type="button"
                    onClick={() => setArchiveTargetId(selectedCard.id)}
                  >
                    Arsipkan
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "13px" }}>
                  Pilih kartu untuk melihat preview dan detail.
                </p>
              </div>
            )}
          </aside>
        </div>

        {archiveTargetId && (
          <div className="admin-dialog-layer">
            <button
              className="admin-dialog-backdrop"
              type="button"
              onClick={() => setArchiveTargetId(null)}
              aria-label="Batal arsipkan"
            />
            <section role="dialog" aria-modal="true" aria-labelledby="archive-dialog-title">
              <p className="admin-kicker">KONFIRMASI ARSIP</p>
              <h2 id="archive-dialog-title">Arsipkan Flashcard?</h2>
              <p style={{ margin: "8px 0 0", color: "var(--muted)", fontSize: "13px" }}>
                Status kartu {cards.find((c) => c.id === archiveTargetId)?.term} akan diubah menjadi Archived.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" }}>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setArchiveTargetId(null)}
                >
                  Batal
                </button>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={confirmArchive}
                >
                  Ya, Arsipkan
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </AdminShell>
  );
}
