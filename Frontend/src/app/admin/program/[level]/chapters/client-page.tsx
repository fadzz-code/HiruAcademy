"use client";

import { use, useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";

export function ClientChapterBuilder({ params }: { params: Promise<{ level: string }> }) {
  const { level } = use(params);
  const code = level.toUpperCase();
  const [selectedChapter, setSelectedChapter] = useState("chapter-4");

  const chapters = [
    { id: "chapter-1", title: "Chapter 1", desc: "Akses Free Member & Dasar", status: "Dipublikasikan", access: "Free" },
    { id: "chapter-2", title: "Chapter 2", desc: "Transportasi dan Arah", status: "Dipublikasikan", access: "Premium" },
    { id: "chapter-3", title: "Chapter 3", desc: "Aktivitas Harian", status: "Dipublikasikan", access: "Premium" },
    { id: "chapter-4", title: "Chapter 4", desc: "Pola Kalimat & Kehidupan", status: "Draft", access: "Premium" },
    { id: "chapter-5", title: "Chapter 5", desc: "Kesehatan dan Kondisi", status: "Draft", access: "Premium" },
  ];

  const modules = [
    { id: "m1", type: "Video", title: "Pengantar Pola Kalimat", icon: "▶" },
    { id: "m2", type: "Tata Bahasa", title: "Struktur Kalimat Dasar", icon: "文" },
    { id: "m3", type: "Kanji", title: "Kanji Kehidupan Sehari-hari", icon: "字" },
    { id: "m4", type: "Flashcard", title: "Deck Kosakata Chapter 4", icon: "札" },
    { id: "m5", type: "Audio", title: "Latihan Mendengar Percakapan", icon: "音" },
    { id: "m6", type: "Reading", title: "Membaca Teks Kehidupan", icon: "読" },
    { id: "m7", type: "Chapter Checkpoint", title: "Ujian Akhir Chapter", icon: "旗", hasQuiz: true },
  ];

  const current = chapters.find(c => c.id === selectedChapter) || chapters[3];

  return (
    <AdminShell current="program">
      <main className="admin-page builder-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">CONTENT BUILDER • {code}</p>
            <h1>Pengelolaan Chapter</h1>
            <p>Atur struktur chapter, modul pembelajaran, dan prasyarat kelulusan {code}.</p>
          </div>
          <div className="admin-header-actions">
            <Link className="button button-secondary" href="/admin/program">← Kembali ke Program</Link>
          </div>
        </header>

        <div className="builder-layout">
          <aside className="builder-sidebar">
            <div className="builder-section-title">
              <h2>Struktur Chapter</h2>
              <button type="button" className="button-icon" aria-label="Tambah Chapter">+</button>
            </div>
            
            <nav className="chapter-list">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`chapter-item ${selectedChapter === ch.id ? "active" : ""}`}
                  onClick={() => setSelectedChapter(ch.id)}
                >
                  <span className="chapter-item-number">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="chapter-item-content">
                    <strong>{ch.title}</strong>
                    <div className="chapter-item-meta">
                      <span className={`admin-status status-${ch.status === "Dipublikasikan" ? "active" : "pending"}`}>{ch.status}</span>
                      <span className="chapter-access">{ch.access}</span>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
            <div className="admin-product-rules">
              <p>Chapter 1 bersifat Free. Chapter 2+ Premium. Perubahan urutan berdampak pada journey berjalan.</p>
            </div>
          </aside>

          <section className="builder-main">
            <header className="builder-main-head">
              <div>
                <span className={`admin-status status-${current.status === "Dipublikasikan" ? "active" : "pending"}`}>{current.status}</span>
                <span className="chapter-access access-badge">{current.access} Access</span>
              </div>
              <h2>{current.title}</h2>
              <input 
                className="builder-title-input" 
                defaultValue={current.desc} 
                aria-label="Deskripsi Chapter"
              />
              <div className="builder-main-actions">
                <button type="button" className="button button-secondary">Simpan Draft</button>
                <button type="button" className="button button-primary">Publikasikan</button>
              </div>
            </header>

            <div className="builder-section">
              <div className="builder-section-title">
                <h3>Modul Pembelajaran</h3>
                <p>Urutan modul yang akan diselesaikan secara sekuensial.</p>
              </div>

              <div className="module-list">
                {modules.map((mod) => (
                  <article key={mod.id} className="module-item">
                    <div className="module-drag-handle" aria-hidden="true">⋮⋮</div>
                    <span className="module-icon" aria-hidden="true">{mod.icon}</span>
                    <div className="module-content">
                      <small>{mod.type}</small>
                      <strong>{mod.title}</strong>
                    </div>
                    <div className="module-actions">
                      {mod.hasQuiz ? (
                        <Link className="button button-dark" href={`/admin/program/${level}/chapters/${current.id}/quiz`}>Buka Quiz Builder</Link>
                      ) : (
                        <button type="button" className="button button-secondary disabled" aria-disabled="true">Edit Konten</button>
                      )}
                      <button type="button" className="button-icon" aria-label="Hapus Modul">×</button>
                    </div>
                  </article>
                ))}
              </div>
              <button type="button" className="module-add-button">+ Tambah Modul Baru</button>
            </div>
          </section>
        </div>
      </main>
    </AdminShell>
  );
}
