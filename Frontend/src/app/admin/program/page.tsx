"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";

export default function AdminProgramPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Independen");

  const programs = [
    { level: "N5", title: "N5 — Dasar Bahasa Jepang", price: "Mulai Rp 99.000", status: "Dipublikasikan", meta: "30 Bab Lengkap" },
    { level: "N4", title: "N4 — Pemula Lanjutan", price: "Mulai Rp 149.000", status: "Dipublikasikan", meta: "35 Bab Lengkap" },
    { level: "N3", title: "N3 — Menengah", price: "Mulai Rp 199.000", status: "Dipublikasikan", meta: "40 Bab Lengkap" },
    { level: "N2", title: "N2 — Tingkat Lanjut", price: "Mulai Rp 249.000", status: "Draft", meta: "Dalam Peninjauan Materi" },
    { level: "N1", title: "N1 — Mahir", price: "Mulai Rp 299.000", status: "Draft", meta: "Dalam Penyusunan Materi" },
  ];

  const visible = programs.filter(
    (p) => 
      (p.level.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "Independen" || filter === p.status)
  );

  return (
    <AdminShell current="program">
      <main className="admin-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • PRODUK & AKSES</p>
            <h1>Pengelolaan Program & Akses</h1>
            <p>Kelola N1–N5 sebagai produk independen, harga, Chapter gratis, entitlement, dan status publikasi.</p>
          </div>
          <div className="admin-header-actions">
            <button className="button button-primary disabled" aria-disabled="true" type="button">Tambah Program</button>
          </div>
        </header>

        <section className="admin-kpi-grid">
          <article className="admin-kpi-card">
            <h2>Program aktif</h2>
            <strong>3 Program</strong>
            <small>N5, N4, dan N3 siap dipelajari.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Program draft</h2>
            <strong>2 Program</strong>
            <small>N2 dan N1 dalam penyusunan.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Rentang harga</h2>
            <strong>Rp 99rb – 350rb</strong>
            <small>Biaya paket mandiri dan kelas Sensei.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Akses level</h2>
            <strong>Fleksibel</strong>
            <small>Siswa dapat memilih level target secara langsung.</small>
          </article>
        </section>

        <div className="admin-dashboard-layout">
          <div className="admin-main-col">
            <section className="admin-section">
              <div className="admin-filter-bar">
                <label className="admin-search-box">
                  <span aria-hidden="true">⌕</span>
                  <input 
                    placeholder="Cari level atau program" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <div className="admin-filters">
                  {["Independen", "Dipublikasikan", "Draft", "Diarsipkan"].map((f) => (
                    <button 
                      key={f}
                      type="button" 
                      className={filter === f ? "active" : ""}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-program-list">
                {visible.map((prog) => (
                  <article key={prog.level} className={`admin-program-card ${prog.status === "Draft" ? "draft" : ""}`}>
                    <div className="program-card-main">
                      <span className="program-level">{prog.level}</span>
                      <div>
                        <h3>{prog.title}</h3>
                        <p>{prog.price} • {prog.meta}</p>
                      </div>
                    </div>
                    <div className="program-card-status">
                      <span className={`admin-status status-${prog.status === "Dipublikasikan" ? "active" : "pending"}`}>
                        {prog.status}
                      </span>
                      <Link className="button button-secondary" href={`/admin/program/${prog.level.toLowerCase()}/chapters`}>Buka Chapter Builder</Link>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="admin-product-rules">
                <p>Pengaturan Harga • Akses Siswa • Status Publikasi • Riwayat Perubahan</p>
              </aside>
            </section>
          </div>

          <aside className="admin-side-col">
            <section className="admin-section admin-entitlement-matrix">
              <h2>Entitlement Matrix</h2>
              <div className="admin-table-container">
                <table className="matrix-straight-table">
                  <thead>
                    <tr>
                      <th>Fitur</th>
                      <th>Free Member</th>
                      <th>Belajar Mandiri</th>
                      <th>Belajar dengan Sensei</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Akses Chapter</strong></td>
                      <td>Chapter 1</td>
                      <td>Seluruh Chapter</td>
                      <td>Seluruh Chapter</td>
                    </tr>
                    <tr>
                      <td><strong>Try Out &amp; Ulasan</strong></td>
                      <td>Preview Singkat</td>
                      <td>Akses Penuh</td>
                      <td>Akses Penuh</td>
                    </tr>
                    <tr>
                      <td><strong>Forum Komunitas</strong></td>
                      <td>Hanya Baca</td>
                      <td>Tulis &amp; Balas</td>
                      <td>Tulis &amp; Balas</td>
                    </tr>
                    <tr>
                      <td><strong>Jadwal, Kelas &amp; Replay</strong></td>
                      <td>Tidak Tersedia</td>
                      <td>Tidak Tersedia</td>
                      <td>Akses Penuh + Live Zoom</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </AdminShell>
  );
}
