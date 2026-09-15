"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LuBookOpen,
  LuChevronDown,
  LuCircleCheck,
  LuFlame,
  LuGraduationCap,
  LuLock,
  LuRotateCcw,
  LuSearch,
  LuSparkles,
} from "react-icons/lu";
import { StudentNavigation } from "@/components/student-navigation";
import { parseMembership } from "@/lib/dashboard-mock";

type DeckItem = {
  level: string;
  chapter: string;
  title: string;
  category: string;
  cardCount: number;
  progress: number;
  glyph: string;
  description: string;
  action: "Mulai" | "Lanjutkan" | "Ulangi" | "Review";
  ctaLabel: string;
};

const decks: DeckItem[] = [
  {
    level: "N5",
    chapter: "Chapter 1",
    title: "Kosakata Chapter 1",
    category: "Bahasa Jepang",
    cardCount: 40,
    progress: 65,
    glyph: "語",
    description: "Kosakata utama dari chapter gratis yang sudah terbuka.",
    action: "Review",
    ctaLabel: "Review Flashcards",
  },
  {
    level: "N5",
    chapter: "Chapter 1",
    title: "Huruf Jepang Dasar",
    category: "Bahasa Jepang",
    cardCount: 80,
    progress: 90,
    glyph: "字",
    description: "Deck penguatan hiragana, katakana, dan pengenalan kanji.",
    action: "Mulai",
    ctaLabel: "Mulai Belajar",
  },
  {
    level: "N5",
    chapter: "Chapter 1",
    title: "Pola Kalimat Chapter 1",
    category: "Bahasa Jepang",
    cardCount: 35,
    progress: 30,
    glyph: "文",
    description: "Flashcard grammar ringkas untuk review cepat.",
    action: "Ulangi",
    ctaLabel: "Review Flashcards",
  },
  {
    level: "N5",
    chapter: "Chapter 2",
    title: "Kosakata Chapter 2",
    category: "Bahasa Jepang",
    cardCount: 45,
    progress: 15,
    glyph: "本",
    description: "Kosakata lanjutan untuk chapter berikutnya pada level aktif.",
    action: "Mulai",
    ctaLabel: "Mulai Belajar",
  },
];

const summaryMetrics = [
  {
    label: "KARTU DIPELAJARI",
    value: "658",
    note: "+15 hari ini",
    icon: LuBookOpen,
  },
  {
    label: "PERLU DIULANG",
    value: "42",
    note: "Perlu segera",
    icon: LuRotateCcw,
  },
  {
    label: "DECK SELESAI",
    value: "12",
    note: "Selesai dipelajari",
    icon: LuCircleCheck,
  },
  {
    label: "KONSISTENSI",
    value: "19 hari",
    note: "Tetap konsisten",
    icon: LuFlame,
  },
];

export function FlashcardCollection() {
  const membership = parseMembership(useSearchParams().get("membership") ?? undefined);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "level" | "chapter" | "review">("all");
  const [selectedLevel, setSelectedLevel] = useState("N5");
  const [selectedChapter, setSelectedChapter] = useState("Chapter 1");
  const [levelOpen, setLevelOpen] = useState(false);
  const [chapterOpen, setChapterOpen] = useState(false);

  const paid = membership !== "free";
  const query = `?membership=${membership}`;

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".fc-dropdown-wrap")) {
        setLevelOpen(false);
        setChapterOpen(false);
      }
    }
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const visible = decks.filter((deck) => {
    const matchesSearch = `${deck.chapter} ${deck.title} ${deck.category}`
      .toLowerCase()
      .includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (filterMode === "all") return true;
    if (filterMode === "review") {
      return deck.action === "Ulangi" || deck.action === "Review" || deck.progress < 50;
    }
    if (filterMode === "level") {
      return deck.level === selectedLevel;
    }
    if (filterMode === "chapter") {
      return deck.chapter === selectedChapter;
    }
    return true;
  });

  return (
    <div className="supporting-shell student-shell">
      <StudentNavigation membership={membership} />
      <main className="supporting-main flashcard-collection">
        {/* 1. Summary Statistics */}
        <section className="fc-summary-grid" aria-label="Ringkasan Flashcard">
          {summaryMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <article className="fc-summary-card" key={item.label}>
                <div className="fc-summary-top">
                  <span className="fc-summary-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="fc-summary-label">{item.label}</span>
                </div>
                <div className="fc-summary-body">
                  <strong className="fc-summary-val">{item.value}</strong>
                  <small className="fc-summary-note">{item.note}</small>
                </div>
              </article>
            );
          })}
        </section>

        {/* 2. Search + Filters */}
        <section className="fc-toolbar" aria-label="Pencarian dan Filter Deck">
          <label className="fc-search-wrap">
            <span className="fc-search-icon" aria-hidden="true">
              <LuSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deck, chapter, kosakata..."
              aria-label="Cari deck, chapter, atau kosakata"
            />
          </label>

          <div className="fc-filter-pills" role="toolbar" aria-label="Filter kategori deck">
            {/* Semua Deck (bukan dropdown) */}
            <button
              className={`fc-filter-pill${filterMode === "all" ? " active" : ""}`}
              type="button"
              onClick={() => {
                setFilterMode("all");
                setLevelOpen(false);
                setChapterOpen(false);
              }}
            >
              Semua Deck
            </button>

            {/* Dropdown N5 (opsi N4, N3, N2, N1) */}
            <div className="fc-dropdown-wrap">
              <button
                className={`fc-filter-pill fc-dropdown-btn${filterMode === "level" ? " active" : ""}`}
                type="button"
                onClick={() => {
                  setLevelOpen(!levelOpen);
                  setChapterOpen(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={levelOpen}
              >
                <span>{selectedLevel}</span>
                <LuChevronDown className={`fc-chevron${levelOpen ? " open" : ""}`} aria-hidden="true" />
              </button>
              {levelOpen && (
                <div className="fc-dropdown-menu" role="listbox">
                  {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      role="option"
                      aria-selected={selectedLevel === lvl && filterMode === "level"}
                      className={`fc-dropdown-item${selectedLevel === lvl && filterMode === "level" ? " is-selected" : ""}`}
                      onClick={() => {
                        setSelectedLevel(lvl);
                        setFilterMode("level");
                        setLevelOpen(false);
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Chapter 1 (opsi Chapter 2, Chapter 3, dst.) */}
            <div className="fc-dropdown-wrap">
              <button
                className={`fc-filter-pill fc-dropdown-btn${filterMode === "chapter" ? " active" : ""}`}
                type="button"
                onClick={() => {
                  setChapterOpen(!chapterOpen);
                  setLevelOpen(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={chapterOpen}
              >
                <span>{selectedChapter}</span>
                <LuChevronDown className={`fc-chevron${chapterOpen ? " open" : ""}`} aria-hidden="true" />
              </button>
              {chapterOpen && (
                <div className="fc-dropdown-menu" role="listbox">
                  {["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"].map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      role="option"
                      aria-selected={selectedChapter === ch && filterMode === "chapter"}
                      className={`fc-dropdown-item${selectedChapter === ch && filterMode === "chapter" ? " is-selected" : ""}`}
                      onClick={() => {
                        setSelectedChapter(ch);
                        setFilterMode("chapter");
                        setChapterOpen(false);
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Perlu Diulang (bukan dropdown) */}
            <button
              className={`fc-filter-pill${filterMode === "review" ? " active" : ""}`}
              type="button"
              onClick={() => {
                setFilterMode("review");
                setLevelOpen(false);
                setChapterOpen(false);
              }}
            >
              Perlu Diulang
            </button>
          </div>
        </section>

        {/* 3. Flashcard Deck Grid */}
        <section className="fc-deck-section" aria-label="Daftar Deck Flashcard">
          <div className="fc-deck-grid">
            {visible.length === 0 ? (
              <div className="fc-empty-state">
                <p>
                  Tidak ada deck yang sesuai dengan filter{" "}
                  <strong>{filterMode === "level" ? selectedLevel : selectedChapter}</strong>.
                </p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    setFilterMode("all");
                    setSearch("");
                  }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              visible.map((deck) => {
                const locked = !paid && deck.chapter === "Chapter 2";
                return (
                  <article className={`fc-deck-card${locked ? " is-locked" : ""}`} key={deck.title}>
                    {/* Decorative Kanji Character */}
                    <span className="fc-deck-glyph" aria-hidden="true">
                      {deck.glyph}
                    </span>

                    {/* Top: Title & Count Badge */}
                    <div className="fc-deck-header">
                      <div className="fc-deck-title-area">
                        <h2 className="fc-deck-title">{deck.title}</h2>
                        <div className="fc-deck-meta">
                          <span className="fc-meta-badge fc-cat-badge">{deck.category}</span>
                        </div>
                      </div>
                      <span className="fc-meta-badge fc-count-badge">{deck.cardCount} Kartu</span>
                    </div>

                    {/* Description */}
                    <p className="fc-deck-desc">{deck.description}</p>

                    {/* Progress Row */}
                    <div className="fc-deck-progress-row">
                      <div
                        className="fc-deck-progress-track"
                        role="progressbar"
                        aria-valuenow={deck.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className="fc-deck-progress-fill" style={{ width: `${deck.progress}%` }} />
                      </div>
                      <span className="fc-deck-progress-pct">{deck.progress}%</span>
                    </div>

                    {/* Action CTA */}
                    <div className="fc-deck-action-row">
                      {locked ? (
                        <span className="fc-deck-btn is-disabled">
                          <LuLock aria-hidden="true" /> Terkunci
                        </span>
                      ) : (
                        <Link
                          className="fc-deck-btn"
                          href={`/learn/n4/${membership === "free" ? "chapter-1" : "chapter-4"}/flashcards${query}`}
                        >
                          {deck.ctaLabel}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* 4. Sensei Access Banner */}
        <aside className="fc-sensei-banner" aria-label="Informasi Akses Member">
          <div className="fc-sensei-banner-content">
            <div className="fc-sensei-banner-icon" aria-hidden="true">
              {membership === "sensei" ? (
                <LuGraduationCap />
              ) : membership === "lms" ? (
                <LuSparkles />
              ) : (
                <LuLock />
              )}
            </div>
            <div className="fc-sensei-banner-text">
              <h3>
                {membership === "free"
                  ? "Akses Free Member"
                  : membership === "lms"
                  ? "Akses Belajar Mandiri"
                  : "Akses Belajar dengan Sensei"}
              </h3>
              <p>
                {membership === "free"
                  ? "Buka akses ke semua deck chapter dan nikmati bimbingan materi intensif."
                  : "Buka akses tak terbatas ke semua deck dan bimbingan langsung bersama Sensei."}
              </p>
            </div>
          </div>
          <Link
            className="fc-sensei-banner-btn"
            href={membership === "free" ? `/program/n4${query}` : `/progress${query}`}
          >
            {membership === "free" ? "Pelajari Lebih Lanjut" : "Lihat Progress"}
          </Link>
        </aside>
      </main>
    </div>
  );
}

