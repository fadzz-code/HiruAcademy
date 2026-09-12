"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import {
  type DashboardCard,
  type DashboardPlan,
  type DashboardPresentation,
  type RouteDestinationKey,
  defaultDashboardPresentations,
  routeDestinations,
} from "@/lib/content-studio";

const destinationKeys = Object.keys(routeDestinations) as RouteDestinationKey[];

const planMeta: Record<DashboardPlan, { label: string; badge: string }> = {
  free: { label: "Free Member", badge: "Akses Terbatas" },
  lms: { label: "Belajar Mandiri", badge: "LMS Mandiri" },
  sensei: { label: "Belajar dengan Sensei", badge: "LMS + Pendampingan" },
};

const initialPlanSeeds: Record<DashboardPlan, DashboardPresentation> = {
  free: {
    plan: "free",
    heading: "Halo, Selamat Datang di HIRU Academy",
    description: "Mulai perjalanan belajar bahasa Jepang dengan kurikulum terarah dan materi pilihan.",
    announcement: "Akses Chapter 1 gratis terbuka untuk level N5 hingga N1.",
    cards: [
      {
        id: "free-1",
        heading: "Perjalanan Belajar",
        description: "Jelajahi roadmap dan level belajar bahasa Jepang.",
        cta: { label: "Buka Journey", destination: "journey" },
      },
      {
        id: "free-2",
        heading: "Latihan Soal",
        description: "Coba latihan soal mandiri untuk menguji pemahaman materi.",
        cta: { label: "Mulai Latihan", destination: "practice" },
      },
      {
        id: "free-3",
        heading: "Flashcards Kosakata",
        description: "Perkaya kosakata bahasa Jepang dengan metode kartu interaktif.",
        cta: { label: "Buka Flashcards", destination: "flashcards" },
      },
    ],
  },
  lms: {
    plan: "lms",
    heading: "Halo, Semangat Belajar Mandiri",
    description: "Lanjutkan materi dan latihan terstruktur sesuai target serta ritme belajarmu.",
    announcement: "Latihan harian dan bank modul siap dipelajari kapan saja.",
    cards: [
      {
        id: "lms-1",
        heading: "Perpustakaan Materi",
        description: "Akses modul, rekaman video, dan ringkasan tata bahasa lengkap.",
        cta: { label: "Buka Perpustakaan", destination: "library" },
      },
      {
        id: "lms-2",
        heading: "Simulasi Try Out",
        description: "Uji kesiapan ujian JLPT dengan bank soal komprehensif.",
        cta: { label: "Mulai Try Out", destination: "tryout" },
      },
      {
        id: "lms-3",
        heading: "Diskusi Komunitas",
        description: "Berinteraksi dan berdiskusi seputar pelajaran dengan sesama pembelajar.",
        cta: { label: "Masuk Komunitas", destination: "community" },
      },
    ],
  },
  sensei: {
    plan: "sensei",
    heading: "Halo, Selamat Belajar bersama Sensei",
    description: "Ikuti kelas interaktif, bimbingan langsung, dan konsultasi materi terpadu.",
    announcement: "Sesi live Zoom berikutnya akan dimulai sesuai jadwal cohort aktif.",
    cards: [
      {
        id: "sensei-1",
        heading: "Jadwal Kelas Live",
        description: "Lihat jadwal sesi live Zoom dan tautan tatap muka cohort.",
        cta: { label: "Lihat Jadwal", destination: "schedule" },
      },
      {
        id: "sensei-2",
        heading: "Rekaman & Replay",
        description: "Tonton ulang rekaman kelas live kapan pun dibutuhkan.",
        cta: { label: "Buka Replay", destination: "replay" },
      },
      {
        id: "sensei-3",
        heading: "Konsultasi Tanya Sensei",
        description: "Ajukan pertanyaan langsung kepada Sensei pendamping cohort.",
        cta: { label: "Tanya Sensei", destination: "askSensei" },
      },
    ],
  },
};

function resolveInitialPresentations(): Record<DashboardPlan, DashboardPresentation> {
  const result: Record<DashboardPlan, DashboardPresentation> = {
    free: { ...initialPlanSeeds.free },
    lms: { ...initialPlanSeeds.lms },
    sensei: { ...initialPlanSeeds.sensei },
  };
  for (const item of defaultDashboardPresentations) {
    if (item?.plan && result[item.plan]) {
      result[item.plan] = item;
    }
  }
  return result;
}

export default function DashboardsStudioPage() {
  const [presentations, setPresentations] = useState<Record<DashboardPlan, DashboardPresentation>>(
    resolveInitialPresentations
  );
  const [savedSnapshot, setSavedSnapshot] = useState<Record<DashboardPlan, DashboardPresentation>>(
    resolveInitialPresentations
  );
  const [selectedPlan, setSelectedPlan] = useState<DashboardPlan>("free");
  const [dialog, setDialog] = useState<"preview" | "saved" | "published" | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Draft lokal siap disunting");

  const current = presentations[selectedPlan];

  function updateCurrent(patch: Partial<DashboardPresentation>) {
    setPresentations((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        ...patch,
      },
    }));
    setStatusMessage("Perubahan belum disimpan ke draft");
  }

  function updateCard(index: number, patch: Partial<DashboardCard>) {
    const updatedCards = current.cards.map((card, idx) => {
      if (idx !== index) return card;
      return {
        ...card,
        ...patch,
      };
    });
    updateCurrent({ cards: updatedCards });
  }

  function moveCard(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= current.cards.length) return;
    const nextCards = [...current.cards];
    const item = nextCards[index];
    nextCards[index] = nextCards[target];
    nextCards[target] = item;
    updateCurrent({ cards: nextCards });
  }

  function handleSaveDraft() {
    setSavedSnapshot(presentations);
    setStatusMessage("Draft lokal diperbarui");
    setDialog("saved");
  }

  function handlePublish() {
    setSavedSnapshot(presentations);
    setStatusMessage("Status publikasi lokal aktif");
    setDialog("published");
  }

  function handleCancel() {
    setPresentations((prev) => ({
      ...prev,
      [selectedPlan]: { ...savedSnapshot[selectedPlan] },
    }));
    setStatusMessage("Perubahan dibatalkan ke snapshot tersimpan");
  }

  return (
    <AdminShell current="content-studio">
      <main className="admin-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • CONTENT STUDIO</p>
            <h1>Pengelolaan Dasbor Siswa</h1>
            <p>Konfigurasi heading, description, announcement, dan kartu aksi dasbor untuk tiap plan membership.</p>
          </div>
        </header>

        <section className="admin-context-info-card">
          <div className="admin-context-info-badge">Target Tampilan Siswa</div>
          <div className="admin-context-info-content">
            <strong>Halaman yang diubah: /dashboard (Dashboard Utama Siswa)</strong>
            <p>
              Editor ini mengatur konten yang tampil langsung kepada siswa di dasbor utama sesuai paket membership ({planMeta[selectedPlan].label}):
            </p>
            <ul>
              <li><strong>Bagian 1 (Teks Utama):</strong> Teks sapaan pembuka (Heading), kalimat penyemangat, dan pengumuman dasbor atas.</li>
              <li><strong>Bagian 2 (Kartu Aksi):</strong> Tiga kartu pintasan menu cepat yang berada di bawah progres belajar siswa.</li>
            </ul>
          </div>
        </section>

        <section className="admin-local-feedback" role="status">
          Perubahan editor disimpan secara lokal. Klik &quot;Save Draft&quot; untuk menyimpan atau &quot;Publish/Update&quot; untuk menerapkan pembaruan.
        </section>

        <section className="admin-kpi-grid" aria-label="Status konfigurasi">
          <article className="admin-kpi-card">
            <h2>Plan Terpilih</h2>
            <strong>{planMeta[selectedPlan].label}</strong>
            <small>{planMeta[selectedPlan].badge}</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Jumlah Kartu Aksi</h2>
            <strong>{current.cards.length}</strong>
            <small>Kartu terkonfigurasi pada plan aktif</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Status Operasi</h2>
            <strong>{statusMessage}</strong>
            <small>Tersimpan dalam memori sesi browser</small>
          </article>
        </section>

        <section className="admin-section">
          <h2>Pilih Plan Membership</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {(["free", "lms", "sensei"] as const).map((plan) => {
              const active = selectedPlan === plan;
              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`button ${active ? "button-primary" : "button-secondary"}`}
                  aria-pressed={active}
                >
                  {planMeta[plan].label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="admin-section">
          <h2>Teks Utama Dasbor ({planMeta[selectedPlan].label})</h2>
          <div style={{ display: "grid", gap: "16px", maxWidth: "800px" }}>
            <label className="admin-field">
              <span>Heading Dasbor</span>
              <input
                type="text"
                value={current.heading}
                onChange={(e) => updateCurrent({ heading: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Deskripsi / Subheading</span>
              <textarea
                rows={3}
                value={current.description}
                onChange={(e) => updateCurrent({ description: e.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Pengumuman Dasbor (Announcement)</span>
              <textarea
                rows={3}
                value={current.announcement}
                onChange={(e) => updateCurrent({ announcement: e.target.value })}
              />
            </label>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Daftar Kartu Aksi ({current.cards.length})</h2>
            <p style={{ margin: "4px 0 16px", color: "var(--muted)", fontSize: "13px" }}>
              Tiga kartu aksi ini tampil berjajar horizontal pada baris menu cepat Dashboard siswa.
            </p>
          </div>
          <div className="admin-dashboard-cards-grid">
            {current.cards.map((card, index) => (
              <article
                key={card.id}
                className="admin-action-card studio-action-editor-card"
              >
                <div className="studio-action-card-header">
                  <span className="studio-card-number-badge">
                    KARTU {index + 1}
                  </span>
                  <div className="studio-card-move-btns">
                    <button
                      type="button"
                      className="button button-secondary button-xs"
                      disabled={index === 0}
                      onClick={() => moveCard(index, -1)}
                      aria-label={`Pindahkan kartu ${index + 1} ke kiri`}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="button button-secondary button-xs"
                      disabled={index === current.cards.length - 1}
                      onClick={() => moveCard(index, 1)}
                      aria-label={`Pindahkan kartu ${index + 1} ke kanan`}
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="studio-action-card-fields">
                  <label className="admin-field">
                    <span>Judul Kartu</span>
                    <input
                      type="text"
                      value={card.heading}
                      onChange={(e) => updateCard(index, { heading: e.target.value })}
                    />
                  </label>

                  <label className="admin-field">
                    <span>Deskripsi Kartu</span>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => updateCard(index, { description: e.target.value })}
                    />
                  </label>

                  <label className="admin-field">
                    <span>Label CTA</span>
                    <input
                      type="text"
                      value={card.cta.label}
                      onChange={(e) =>
                        updateCard(index, {
                          cta: { ...card.cta, label: e.target.value },
                        })
                      }
                    />
                  </label>

                  <label className="admin-field">
                    <span>Destinasi Rute</span>
                    <select
                      value={card.cta.destination}
                      onChange={(e) =>
                        updateCard(index, {
                          cta: {
                            ...card.cta,
                            destination: e.target.value as RouteDestinationKey,
                          },
                        })
                      }
                    >
                      {destinationKeys.map((key) => (
                        <option key={key} value={key}>
                          {key} ({routeDestinations[key]})
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            ))}
          </div>

          <div className="dashboard-editor-bottom-actions">
            <Link className="button button-secondary" href="/admin/content-studio">
              Kembali
            </Link>
            <button className="button button-secondary" type="button" onClick={handleCancel}>
              Batal
            </button>
            <button className="button button-secondary" type="button" onClick={handleSaveDraft}>
              Save Draft
            </button>
            <button className="button button-dark" type="button" onClick={() => setDialog("preview")}>
              Preview
            </button>
            <button className="button button-primary" type="button" onClick={handlePublish}>
              Publish/Update
            </button>
          </div>
        </section>

        {dialog && (
          <div className="admin-dialog-layer">
            <button
              className="admin-dialog-backdrop"
              type="button"
              onClick={() => setDialog(null)}
              aria-label="Tutup dialog"
            />
            <section
              className="a4-dialog a8-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              style={{ maxWidth: "680px", width: "100%", padding: "24px" }}
            >
              {dialog === "preview" && (
                <div style={{ display: "grid", gap: "16px" }}>
                  <header>
                    <p className="admin-kicker">PRATINJAU DASBOR SISWA</p>
                    <h2 id="dialog-title">Pratinjau: {planMeta[selectedPlan].label}</h2>
                    <p style={{ fontSize: "12px", color: "var(--muted)" }}>
                      Pratinjau tampilan berdasarkan data editor lokal saat ini.
                    </p>
                  </header>

                  <div
                    style={{
                      padding: "16px",
                      border: "1px solid #d9c8bc",
                      borderRadius: "12px",
                      background: "var(--soft)",
                      display: "grid",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>{current.heading}</h3>
                      <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                        {current.description}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "10px 14px",
                        background: "#fff",
                        border: "1px solid #e1d2c7",
                        borderRadius: "8px",
                      }}
                    >
                      <strong style={{ fontSize: "11px", color: "var(--orange-dark)", display: "block" }}>
                        PENGUMUMAN
                      </strong>
                      <span style={{ fontSize: "12px" }}>{current.announcement}</span>
                    </div>

                    <div style={{ display: "grid", gap: "10px", marginTop: "8px" }}>
                      <strong style={{ fontSize: "12px" }}>Kartu Aksi Cepat</strong>
                      {current.cards.map((card) => (
                        <div
                          key={card.id}
                          style={{
                            padding: "12px",
                            background: "#fff",
                            border: "1px solid #e1d2c7",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: "13px", display: "block" }}>{card.heading}</strong>
                            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "var(--muted)" }}>
                              {card.description}
                            </p>
                          </div>
                          <span
                            className="button button-primary"
                            style={{
                              padding: "6px 12px",
                              fontSize: "11px",
                              pointerEvents: "none",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {card.cta.label} → {routeDestinations[card.cta.destination]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="button button-primary" type="button" onClick={() => setDialog(null)}>
                    Tutup Pratinjau
                  </button>
                </div>
              )}

              {dialog === "saved" && (
                <div style={{ display: "grid", gap: "14px" }}>
                  <header>
                    <p className="admin-kicker">DRAFT DIPERBARUI</p>
                    <h2 id="dialog-title">Draft Dasbor Disimpan</h2>
                  </header>
                  <p style={{ fontSize: "13px" }}>
                    Perubahan konfigurasi dasbor untuk plan {planMeta[selectedPlan].label} telah disimpan ke state draft
                    lokal.
                  </p>
                  <p className="admin-local-feedback" role="status">
                    Penyimpanan server belum tersedia. Perubahan pada workspace ini hanya untuk penyiapan integrasi.
                  </p>
                  <button className="button button-primary" type="button" onClick={() => setDialog(null)}>
                    Selesai
                  </button>
                </div>
              )}

              {dialog === "published" && (
                <div style={{ display: "grid", gap: "14px" }}>
                  <header>
                    <p className="admin-kicker">STATUS PUBLIKASI</p>
                    <h2 id="dialog-title">Konfigurasi Dasbor Diperbarui</h2>
                  </header>
                  <p style={{ fontSize: "13px" }}>
                    Konfigurasi untuk {planMeta[selectedPlan].label} disiapkan untuk integrasi publikasi.
                  </p>
                  <p className="admin-local-feedback" role="status">
                    Penyimpanan server belum tersedia. Perubahan pada workspace ini hanya untuk penyiapan integrasi.
                  </p>
                  <button className="button button-primary" type="button" onClick={() => setDialog(null)}>
                    Selesai
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </AdminShell>
  );
}
