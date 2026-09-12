"use client";

import { useMemo, useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { LuCheck, LuImage } from "react-icons/lu";

type Article = {
  id: string;
  category: string;
  title: string;
  status: string;
  featured: boolean;
  summary: string;
  slug: string;
  meta: string;
  alt: string;
};
type State = "categories" | "draft" | "validation" | "published" | null;

const initialArticles: Article[] = [
  {
    id: "b1",
    category: "Belajar Efektif",
    title: "Rutinitas belajar N4",
    status: "Published",
    featured: true,
    summary:
      "Strategi membangun rutinitas belajar N4 secara konsisten dengan pembagian waktu yang realistis antara video, modul, dan latihan soal.",
    slug: "rutinitas-belajar-n4",
    meta: "Strategi belajar N4 efektif dan konsisten",
    alt: "Ilustrasi rutinitas belajar N4",
  },
  {
    id: "b2",
    category: "Grammar",
    title: "Memahami pola kalimat bahasa Jepang",
    status: "Published",
    featured: false,
    summary: "Ringkasan pola kalimat dasar hingga menengah untuk mempercepat pemahaman bacaan dan percakapan.",
    slug: "memahami-pola-kalimat",
    meta: "Panduan pola kalimat bahasa Jepang pemula",
    alt: "Ilustrasi buku pola kalimat",
  },
  {
    id: "b3",
    category: "Listening",
    title: "Latihan listening pemula",
    status: "Scheduled",
    featured: false,
    summary: "Tips membiasakan telinga mendengar ujaran bahasa Jepang percakapan sehari-hari.",
    slug: "latihan-listening-pemula",
    meta: "Latihan listening bahasa Jepang efektif",
    alt: "Ilustrasi mendengarkan audio bahasa Jepang",
  },
  {
    id: "b4",
    category: "JLPT",
    title: "Persiapan Try Out pertama",
    status: "Draft",
    featured: false,
    summary: "Hal-hal penting yang harus diperhatikan sebelum memulai sesi simulasi try out JLPT resmi.",
    slug: "persiapan-try-out",
    meta: "Persiapan simulasi try out JLPT Hiru Academy",
    alt: "Ilustrasi lembar ujian",
  },
  {
    id: "b5",
    category: "Karier",
    title: "Persiapan kerja ke Jepang (SSW)",
    status: "Draft",
    featured: false,
    summary: "Langkah awal memahami tes keterampilan khusus dan wawancara kerja di Jepang.",
    slug: "persiapan-kerja-jepang",
    meta: "Panduan kerja ke Jepang jalur SSW",
    alt: "Ilustrasi dunia kerja di Jepang",
  },
];

export default function BlogManagementPage() {
  const [items] = useState(initialArticles);
  const [selectedId, setSelectedId] = useState("b1");
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>(null);
  const [modalPreview, setModalPreview] = useState(false);

  const currentArticle = items.find((item) => item.id === selectedId) || items[0];

  const [title, setTitle] = useState(currentArticle.title);
  const [category, setCategory] = useState(currentArticle.category);
  const [status, setStatus] = useState(currentArticle.status);
  const [summary, setSummary] = useState(currentArticle.summary);
  const [slug, setSlug] = useState(currentArticle.slug);
  const [meta, setMeta] = useState(currentArticle.meta);
  const [alt, setAlt] = useState(currentArticle.alt);
  const [featured, setFeatured] = useState(currentArticle.featured);
  const [thumbnail, setThumbnail] = useState(true);
  const [previewApproved, setPreviewApproved] = useState(false);
  const previewRef = useRef<HTMLElement>(null);

  const visible = useMemo(
    () =>
      items.filter((item) =>
        `${item.title} ${item.category} ${item.status}`.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  const checks = [
    Boolean(title.trim() && summary.trim()),
    Boolean(category),
    Boolean(thumbnail && alt.trim()),
    Boolean(slug.trim() && meta.trim()),
    previewApproved,
  ];

  function select(item: Article) {
    setSelectedId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setStatus(item.status);
    setSummary(item.summary);
    setSlug(item.slug);
    setMeta(item.meta);
    setAlt(item.alt);
    setFeatured(item.featured);
    setThumbnail(true);
    setPreviewApproved(false);
    setState(null);
  }

  function create() {
    setSelectedId("new");
    setTitle("");
    setCategory("");
    setStatus("Draft");
    setSummary("");
    setSlug("");
    setMeta("");
    setAlt("");
    setFeatured(false);
    setThumbnail(false);
    setPreviewApproved(false);
  }

  function publish() {
    setState(checks.every(Boolean) ? "published" : "validation");
  }

  return (
    <AdminShell current="communication">
      <main className="admin-page admin-a7-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • EDITORIAL CONTENT</p>
            <h1>Pengelolaan Blog &amp; Artikel</h1>
            <p>Kelola artikel panduan belajar, tips ujian, gambar mini, SEO, status unggulan, dan jadwal publikasi.</p>
          </div>
          <div className="admin-header-actions">
            <button className="button button-secondary" type="button" onClick={() => setState("categories")}>
              Kelola Kategori
            </button>
            <button className="button button-primary" type="button" onClick={create}>
              Artikel Baru
            </button>
          </div>
        </header>

        <section className="admin-kpi-grid">
          {[
            ["Published", "28 Artikel", "Artikel aktif di blog publik."],
            ["Draft", "6 Artikel", "Dalam proses penulisan."],
            ["Scheduled", "3 Artikel", "Menunggu waktu tayang otomatis."],
            ["Featured", "1 Artikel", "Artikel utama di halaman depan."],
          ].map(([label, value, metaText]) => (
            <article className="admin-kpi-card" key={label}>
              <h2>{label}</h2>
              <strong>{value}</strong>
              <small>{metaText}</small>
            </article>
          ))}
        </section>

        <div className="a7-layout">
          {/* Daftar Artikel */}
          <aside className="a7-list blog-list">
            <header>
              <h2>Daftar artikel</h2>
              <label className="admin-search-box">
                <span aria-hidden="true">⌕</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari artikel, kategori, atau status"
                />
              </label>
            </header>
            {visible.map((item) => (
              <button
                className={selectedId === item.id ? "active" : ""}
                type="button"
                onClick={() => select(item)}
                key={item.id}
              >
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </div>
                <div>
                  {item.featured && <span className="featured-pill">Featured</span>}
                  <b>{item.status}</b>
                  <em>Edit</em>
                </div>
              </button>
            ))}
          </aside>

          {/* Editor Artikel */}
          <section className="a7-editor blog-editor">
            <header>
              <div>
                <p className="admin-kicker">{featured ? "FEATURED • " : ""}{status.toUpperCase()}</p>
                <h2>Editor artikel</h2>
              </div>
              <span className={`admin-status status-${status === "Published" ? "active" : "pending"}`}>{status}</span>
            </header>

            <label className="admin-field">
              <span>Judul Artikel</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>

            <div className="a7-field-grid">
              <label className="admin-field">
                <span>Kategori</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="">Pilih kategori</option>
                  {["Belajar Efektif", "Grammar", "Listening", "JLPT", "Karier"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="admin-field">
                <span>Status</span>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Published">Published</option>
                </select>
              </label>
            </div>

            <label className="admin-field">
              <span>Ringkasan / Konten</span>
              <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={6} />
            </label>

            <label className="a7-featured">
              <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
              <span>Jadikan Artikel Utama (Featured)</span>
            </label>

            {/* Thumbnail Box with Colored Button */}
            <section className="a7-thumbnail" style={{ background: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #dee1ea" }}>
              <div style={{ marginBottom: "14px" }}>
                <p className="admin-kicker">{featured ? "FEATURED THUMBNAIL" : "THUMBNAIL ARTIKEL"}</p>
                <h3 style={{ margin: "4px 0", fontSize: "16px", fontWeight: 800 }}>Thumbnail dan Teks Alternatif (Alt Text)</h3>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)" }}>Pastikan gambar memiliki rasio yang jelas dan deskripsi alt text untuk aksesibilitas.</p>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                <button
                  className="button button-primary"
                  type="button"
                  style={{ background: "var(--orange)", color: "#ffffff", fontWeight: 800 }}
                  onClick={() => setThumbnail((value) => !value)}
                >
                  <LuImage aria-hidden="true" />
                  {thumbnail ? "Ganti Thumbnail" : "Pilih Thumbnail"}
                </button>
                <small style={{ color: "var(--muted)" }}>Format disarankan: WEBP atau PNG (maks 2MB)</small>
              </div>
              <label className="admin-field">
                <span>Alt text (Deskripsi Gambar)</span>
                <input value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Tuliskan deskripsi gambar untuk pembaca" />
              </label>
            </section>

            {/* SEO & Metadata */}
            <section className="a7-seo">
              <h3>SEO &amp; Metadata</h3>
              <label className="admin-field">
                <span>Slug URL</span>
                <input value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="contoh-judul-artikel" />
              </label>
              <label className="admin-field">
                <span>Meta Title</span>
                <input value={meta} onChange={(event) => setMeta(event.target.value)} placeholder="Judul yang tampil pada mesin pencari" />
              </label>
            </section>

            {/* Action buttons (Preview opens full modal) */}
            <div className="a7-actions" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setModalPreview(true)}
              >
                Preview Tampilan
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setState("draft")}
              >
                Simpan Draft
              </button>
              <button className="button button-primary" type="button" onClick={publish}>
                Publish
              </button>
            </div>

            {/* Preview Card (without "Preview publik" text) */}
            <section className="a7-preview-box" ref={previewRef} style={{ background: "#ffffff", border: "1px solid #dee1ea", borderRadius: "18px", padding: "24px", marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "999px", background: "#fff1e6", color: "var(--orange-dark)", fontSize: "11px", fontWeight: 800 }}>
                  {featured ? "FEATURED" : "ARTICLE"}
                </span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px", color: "var(--navy)" }}>
                {title || "Rutinitas belajar N4"}
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 16px" }}>
                {category || "Belajar Efektif"} • 8 menit baca
              </p>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", color: "var(--navy)" }}>
                <input
                  type="checkbox"
                  checked={previewApproved}
                  onChange={(event) => setPreviewApproved(event.target.checked)}
                />
                <span>Preview disetujui</span>
              </label>
            </section>

            {/* Publish checklist */}
            <section className="a7-checklist" style={{ marginTop: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "12px" }}>Publish checklist</h3>
              {["Judul dan isi lengkap", "Kategori dipilih", "Thumbnail + alt text", "SEO metadata valid", "Preview disetujui"].map(
                (label, index) => (
                  <div className={checks[index] ? "complete" : "incomplete"} key={label}>
                    <span aria-hidden="true">{checks[index] ? "✓" : "!"}</span>
                    <strong>{label}</strong>
                  </div>
                )
              )}
            </section>

            {/* Editorial rules */}
            <section className="a7-editorial-rules" style={{ marginTop: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "12px" }}>Editorial rules</h3>
              {[
                ["Source", "Gunakan sumber yang dapat dipertanggungjawabkan."],
                ["Media", "Pastikan hak penggunaan dan alt text."],
                ["Featured", "Hanya satu featured utama per konteks."],
                ["Revision", "Perubahan publish perlu riwayat revisi."],
              ].map(([label, detail]) => (
                <div key={label} style={{ marginBottom: "10px" }}>
                  <strong style={{ color: "var(--navy)" }}>{label}</strong>
                  <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--muted)" }}>{detail}</p>
                </div>
              ))}
            </section>
          </section>
        </div>

        {/* Modal Full Visual Preview */}
        {modalPreview && (
          <div className="admin-dialog-layer">
            <button
              className="admin-dialog-backdrop"
              type="button"
              onClick={() => setModalPreview(false)}
              aria-label="Tutup pratinjau artikel"
            />
            <section
              className="a4-dialog"
              role="dialog"
              aria-modal="true"
              style={{ maxWidth: "720px", width: "100%", padding: "32px", maxHeight: "88vh", overflowY: "auto" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ padding: "4px 12px", borderRadius: "999px", background: "#fff1e6", color: "var(--orange-dark)", fontSize: "11px", fontWeight: 800 }}>
                  {category || "Tips Belajar"} • PRATINJAU TAMPILAN SISWA
                </span>
                <button
                  type="button"
                  className="button-icon"
                  onClick={() => setModalPreview(false)}
                  style={{ border: "none", background: "transparent", fontSize: "20px", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <h1 style={{ fontSize: "28px", fontWeight: 800, color: "var(--navy)", margin: "0 0 10px", lineHeight: 1.25 }}>
                {title || "Judul Artikel Belum Diisi"}
              </h1>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: "0 0 20px" }}>
                Oleh Tim Editorial HIRU Academy • 8 menit baca
              </p>

              <div
                style={{
                  width: "100%",
                  height: "240px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #f0f3ff, #e2e8f8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--navy)",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "24px",
                }}
              >
                {alt ? `[Gambar: ${alt}]` : "[Pratinjau Gambar Banner Artikel]"}
              </div>

              <div style={{ fontSize: "15px", lineHeight: 1.75, color: "#1f2937" }}>
                {summary ? (
                  <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
                ) : (
                  <p style={{ color: "var(--muted)" }}>Konten atau ringkasan artikel belum diisi.</p>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #dee1ea" }}>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setModalPreview(false)}
                >
                  Tutup Pratinjau
                </button>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => {
                    setModalPreview(false);
                    setPreviewApproved(true);
                  }}
                >
                  <LuCheck aria-hidden="true" /> Setujui Pratinjau
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Existing Status Dialogs */}
        {state && (
          <div className="admin-dialog-layer">
            <button
              className="admin-dialog-backdrop"
              type="button"
              onClick={() => setState(null)}
              aria-label="Tutup state blog"
            />
            <section className="a4-dialog" role="dialog" aria-modal="true" aria-labelledby="blog-state-title">
              {state === "categories" && (
                <>
                  <p className="admin-kicker">KATEGORI BLOG</p>
                  <h2 id="blog-state-title">Daftar Kategori Artikel</h2>
                  <p>Kategori yang aktif digunakan untuk mengelompokkan artikel di blog siswa.</p>
                  <div className="a7-category-list" style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
                    {["Belajar Efektif", "Grammar", "Listening", "JLPT", "Karier"].map((item) => (
                      <span key={item} style={{ padding: "6px 14px", background: "#f0f3ff", color: "var(--navy)", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <button className="button button-primary" type="button" onClick={() => setState(null)}>
                    Kembali ke Blog
                  </button>
                </>
              )}
              {state === "draft" && (
                <section className="a4-success">
                  <p className="admin-kicker">ADMIN • SIMPAN DRAFT</p>
                  <h2 id="blog-state-title">Draft artikel berhasil disimpan</h2>
                  <span aria-hidden="true">✓</span>
                  <p>Judul, konten, kategori, dan metadata SEO tersimpan dalam antrean draft.</p>
                  <button className="button button-primary" type="button" onClick={() => setState(null)}>
                    Kembali ke Blog
                  </button>
                </section>
              )}
              {state === "validation" && (
                <>
                  <p className="admin-kicker">ADMIN • VALIDASI ARTIKEL</p>
                  <h2 id="blog-state-title">Artikel belum dapat dipublikasikan</h2>
                  <p>Pastikan judul, konten, kategori, alt text gambar, dan centang &quot;Preview disetujui&quot; sudah lengkap.</p>
                  <button className="button button-primary" type="button" onClick={() => setState(null)}>
                    Lengkapi Data
                  </button>
                </>
              )}
              {state === "published" && (
                <section className="a4-success">
                  <p className="admin-kicker">BLOG • PUBLIKASI</p>
                  <h2 id="blog-state-title">Artikel berhasil dipublikasikan</h2>
                  <span aria-hidden="true">✓</span>
                  <p>Artikel telah aktif dan dapat dibaca oleh pembelajar di halaman blog publik.</p>
                  <button className="button button-primary" type="button" onClick={() => setState(null)}>
                    Kembali
                  </button>
                </section>
              )}
            </section>
          </div>
        )}
      </main>
    </AdminShell>
  );
}
