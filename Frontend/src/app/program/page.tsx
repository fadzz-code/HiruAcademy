"use client";

import Link from "next/link";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { PublicPage } from "@/components/public-shell";
import { levelCatalog, plans } from "@/lib/public-mock";

export default function ProgramPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[2]);
  const [selectedLevel, setSelectedLevel] = useState(levelCatalog[1]);

  return (
    <PublicPage active="Program">
      <main className="public-main program-page">
        <section className="program-intro-card">
          <div className="program-intro-copy">
            <p className="kicker">PROGRAM &amp; LEVEL</p>
            <h1>Pilih metode belajar yang sesuai untukmu</h1>
            <p>Mulai langsung dari level yang sesuai kemampuanmu, tanpa harus mengambil level sebelumnya. Materi level sebelumnya akan terbuka dan bisa dipelajari kembali.</p>
            <Link className="button button-dark" href="/placement">
              Coba Placement Test <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="program-intro-flow">
            <p className="kicker">ALUR MEMILIH PROGRAM</p>
            <ol>
              <li>
                <strong>01</strong>
                <div>
                  <h2>Pilih metode belajar</h2>
                  <p>Coba Gratis, Belajar Mandiri, atau Kelas bersama Sensei.</p>
                </div>
              </li>
              <li>
                <strong>02</strong>
                <div>
                  <h2>Pilih level yang sesuai</h2>
                  <p>Pilih level berdasarkan kemampuan dan target belajar.</p>
                </div>
              </li>
              <li>
                <strong>03</strong>
                <div>
                  <h2>Konfirmasi program yang dipilih</h2>
                  <p>Cek kembali metode belajar, level yang dipilih, dan biaya sebelum mendaftar.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="public-section">
          <div className="public-section-head program-section-title">
            <span aria-hidden="true">本</span>
            <div>
              <p className="kicker">METODE BELAJAR</p>
              <h2>Pilih metode belajar</h2>
              <p>Sesuaikan dengan waktu dan kebutuhan bimbinganmu.</p>
            </div>
          </div>
          <div className="public-cards">
            {plans.map((plan) => (
              <button
                type="button"
                className={`public-card program-plan-card${selectedPlan.id === plan.id ? " selected" : ""}${plan.id === "sensei" ? " recommended" : ""}`}
                onClick={() => setSelectedPlan(plan)}
                aria-pressed={selectedPlan.id === plan.id}
                key={plan.id}
              >
                <div className="program-card-head">
                  <small>METODE BELAJAR</small>
                  <span className={plan.id === "sensei" ? "popular-badge-pill" : "plan-badge-pill"}>{plan.badge}</span>
                </div>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <strong className="program-price">{plan.price}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="public-section level-section">
          <div className="public-section-head level-section-head">
            <div className="program-section-title">
              <span aria-hidden="true">道</span>
              <div>
                <p className="kicker">PILIH LEVEL</p>
                <h2>Pilih level sesuai kemampuanmu.</h2>
                <p>Tidak harus memulai dari level N5, pilih level berdasarkan kemampuan dan target belajarmu.</p>
                <p className="level-placement-helper">
                  Belum yakin dengan levelmu? <Link href="/placement">Cek level gratis</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="public-levels">
            {levelCatalog.map((level) => (
              <button
                type="button"
                className={`public-level${selectedLevel.code === level.code ? " selected" : ""}`}
                onClick={() => setSelectedLevel(level)}
                aria-pressed={selectedLevel.code === level.code}
                key={level.code}
              >
                <div className="public-level-top">
                  <strong>{level.name}</strong>
                </div>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
                <ul>
                  {level.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <footer>
                  <em>Pilih {level.code}</em>
                  <b aria-hidden="true">→</b>
                </footer>
              </button>
            ))}
          </div>
        </section>

        <aside className="program-summary-card" aria-label="Ringkasan pilihan program dan level">
          <div className="summary-card-inner">
            <div className="summary-header">
              <div className="summary-icon-box" aria-hidden="true">
                <LuSparkles />
              </div>
              <div className="summary-header-copy">
                <div className="summary-tag">RINGKASAN PILIHAN</div>
                <h2>{selectedLevel.name} • {selectedPlan.title}</h2>
                <p>Paket belajar pilihanmu siap didaftarkan.</p>
              </div>
            </div>

            <div className="summary-meta-grid">
              <div className="summary-meta-card price-highlight">
                <span className="meta-label">BIAYA INVESTASI</span>
                <strong className="meta-value">{selectedPlan.price}</strong>
                <small className="meta-note">{selectedPlan.id === "free" ? "Akses Chapter 1 Gratis" : "Investasi pendidikan terarah"}</small>
              </div>
              {selectedPlan.period && (
                <div className="summary-meta-card period-highlight">
                  <span className="meta-label">DURASI &amp; AKSES</span>
                  <strong className="meta-value">{selectedPlan.period}</strong>
                  <small className="meta-note">Masa aktif bimbingan materi</small>
                </div>
              )}
              <div className="summary-meta-card level-highlight">
                <span className="meta-label">LEVEL TERPILIH</span>
                <strong className="meta-value">{selectedLevel.code} — {selectedLevel.title}</strong>
                <small className="meta-note">Kurikulum JLPT terstruktur</small>
              </div>
            </div>

            <div className="summary-action-box">
              <Link className="button button-primary summary-cta" href={`/register?placement=${selectedLevel.code}&plan=${selectedPlan.id}`}>
                Lanjutkan Pendaftaran <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </aside>
      </main>
    </PublicPage>
  );
}
