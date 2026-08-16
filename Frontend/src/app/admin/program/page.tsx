"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";

export default function AdminProgramPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Independen");

  const programs = [
    { level: "N5", title: "N5 — Dasar", price: "Harga aktif", status: "Dipublikasikan", meta: "Dari admin" },
    { level: "N4", title: "N4 — Pemula Lanjutan", price: "Harga aktif", status: "Dipublikasikan", meta: "Dari admin" },
    { level: "N3", title: "N3 — Menengah", price: "Harga aktif", status: "Dipublikasikan", meta: "Dari admin" },
    { level: "N2", title: "N2 — Lanjut", price: "Harga aktif", status: "Draft", meta: "Menunggu konfigurasi atau review" },
    { level: "N1", title: "N1 — Mahir", price: "Harga aktif", status: "Draft", meta: "Menunggu konfigurasi atau review" },
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
            <Link className="button button-secondary" href="/admin">Dashboard</Link>
          </div>
        </header>

        <section className="admin-kpi-grid">
          <article className="admin-kpi-card">
            <h2>Program aktif</h2>
            <strong>Dinamis</strong>
            <small>Dihitung dari status publikasi.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Program draft</h2>
            <strong>Dinamis</strong>
            <small>Menunggu konfigurasi atau review.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Harga aktif</h2>
            <strong>Dari admin</strong>
            <small>Tidak memakai harga hardcoded.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Akses level</h2>
            <strong>Independen</strong>
            <small>Bisa membeli level mana pun tanpa prerequisite antarlevel.</small>
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
                <p>Harga dinamis • Backend authority • Publish state • Audit perubahan</p>
              </aside>
            </section>
          </div>

          <aside className="admin-side-col">
            <section className="admin-section admin-entitlement-matrix">
              <h2>Entitlement Matrix</h2>
              <div className="matrix-table">
                <div className="matrix-row matrix-header">
                  <span>Fitur</span>
                  <span>Free Member</span>
                  <span>Belajar Mandiri</span>
                  <span>Belajar dengan Sensei</span>
                </div>
                <div className="matrix-row">
                  <span>Akses Chapter</span>
                  <span data-label="Free Member">Chapter 1</span>
                  <span data-label="Belajar Mandiri">Seluruh Chapter</span>
                  <span data-label="Belajar dengan Sensei">Seluruh Chapter</span>
                </div>
                <div className="matrix-row">
                  <span>Try Out & Ulasan</span>
                  <span data-label="Free Member">Preview</span>
                  <span data-label="Belajar Mandiri">Penuh</span>
                  <span data-label="Belajar dengan Sensei">Penuh</span>
                </div>
                <div className="matrix-row">
                  <span>Community write</span>
                  <span data-label="Free Member">Terkunci</span>
                  <span data-label="Belajar Mandiri">Aktif</span>
                  <span data-label="Belajar dengan Sensei">Aktif</span>
                </div>
                <div className="matrix-row">
                  <span>Jadwal, Kelas & Replay</span>
                  <span data-label="Free Member">Terkunci</span>
                  <span data-label="Belajar Mandiri">Terkunci</span>
                  <span data-label="Belajar dengan Sensei">Aktif</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </AdminShell>
  );
}
