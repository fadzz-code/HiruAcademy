"use client";

import { useMemo, useRef, useState } from "react";
import { AdminShell } from "@/components/admin-shell";

type Testimonial = {
  id: string;
  member: string;
  plan: string;
  context: string;
  consent: boolean;
  status: "Pending" | "Approved" | "Rejected";
  featured: boolean;
  content: string;
  source: string;
};
type Dialog = "approve" | "feature" | "blocked" | "reject" | "rejected" | "export" | null;

const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    member: "Rina Kusuma",
    plan: "Belajar Mandiri",
    context: "Level N4",
    consent: true,
    status: "Pending",
    featured: false,
    content: "Learning Journey sangat membantu saya memahami urutan belajar berikutnya tanpa merasa bingung atau kehilangan arah.",
    source: "Feedback Akhir Level N4",
  },
  {
    id: "t2",
    member: "Dimas Pratama",
    plan: "Belajar dengan Sensei",
    context: "Level N3",
    consent: true,
    status: "Approved",
    featured: false,
    content: "Pendampingan Sensei di kelas Zoom mingguan membuat saya tetap konsisten dan cepat paham bagian tata bahasa yang rumit.",
    source: "Kandidat Siswa Terverifikasi",
  },
  {
    id: "t3",
    member: "Budi Santoso",
    plan: "Program SSW",
    context: "Level N4",
    consent: true,
    status: "Approved",
    featured: true,
    content: "Materi SSW sangat relevan dengan kebutuhan kerja di Jepang. Simulasi interviewnya membuat saya jauh lebih percaya diri saat wawancara kerja.",
    source: "Feedback Akhir Level",
  },
  {
    id: "t4",
    member: "Ayu Wulandari",
    plan: "Belajar Mandiri",
    context: "Level N4",
    consent: false,
    status: "Rejected",
    featured: false,
    content: "Latihan harian dan flashcard membantu saya mengulang materi kapan pun saya sempat.",
    source: "Feedback Akhir Level",
  },
  {
    id: "t5",
    member: "Fajar Nugraha",
    plan: "Belajar dengan Sensei",
    context: "Level N2",
    consent: false,
    status: "Pending",
    featured: false,
    content: "Sesi tanya jawab langsung membantu saya mengenali kelemahan dalam menyusun pola kalimat formal.",
    source: "Formulir Siswa",
  },
];

export default function TestimonialsPage() {
  const [items, setItems] = useState(initialTestimonials);
  const [selectedId, setSelectedId] = useState("t1");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [manual, setManual] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualContent, setManualContent] = useState("");
  const [manualPlan, setManualPlan] = useState("Belajar Mandiri");
  const [featuredIntent, setFeaturedIntent] = useState(false);
  const reviewRef = useRef<HTMLElement>(null);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const visible = useMemo(
    () =>
      items.filter((item) => {
        const matchesQuery =
          `${item.member} ${item.plan} ${item.status} ${item.featured ? "Featured" : ""} ${
            item.consent ? "Izin valid" : "Tanpa izin"
          }`
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter =
          filter === "Semua" ||
          (filter === "Pending" && item.status === "Pending") ||
          (filter === "Approved" && item.status === "Approved") ||
          (filter === "Featured" && item.featured) ||
          (filter === "Izin bermasalah" && !item.consent);
        return matchesQuery && matchesFilter;
      }),
    [items, query, filter]
  );

  function select(id: string) {
    setManual(false);
    setSelectedId(id);
    setDialog(null);
    reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function approval(featured: boolean) {
    if (!selected.consent) {
      setDialog("blocked");
      return;
    }
    setItems((list) =>
      list.map((item) =>
        item.id === selected.id ? { ...item, status: "Approved", featured } : item
      )
    );
    setDialog(featured ? "feature" : "approve");
  }

  function reject() {
    if (!reason.trim()) {
      setError("Alasan penolakan wajib diisi.");
      return;
    }
    setItems((list) =>
      list.map((item) =>
        item.id === selected.id ? { ...item, status: "Rejected", featured: false } : item
      )
    );
    setDialog("rejected");
  }

  function handleSaveManual() {
    if (!manualName.trim() || !manualContent.trim()) {
      setError("Nama siswa dan isi testimoni wajib diisi.");
      return;
    }
    const newTestimonial: Testimonial = {
      id: `t-${Date.now()}`,
      member: manualName.trim(),
      plan: manualPlan,
      context: "Level Aktif",
      consent: true,
      status: "Approved",
      featured: featuredIntent,
      content: manualContent.trim(),
      source: "Input Manual Admin",
    };
    setItems((prev) => [newTestimonial, ...prev]);
    setSelectedId(newTestimonial.id);
    setManual(false);
  }

  function addManual() {
    setManual(true);
    setManualName("");
    setManualContent("");
    setFeaturedIntent(false);
    setError("");
    setDialog(null);
    reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <AdminShell current="communication">
      <main className="admin-page admin-a8-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • SOCIAL PROOF</p>
            <h1>Moderasi Testimoni Siswa</h1>
            <p>Tinjau cerita pengalaman belajar siswa, persetujuan penayangan, dan pemilihan testimoni unggulan.</p>
          </div>
          <div className="admin-header-actions">
            <button className="button button-secondary" type="button" onClick={() => setDialog("export")}>
              Ekspor Data
            </button>
            <button className="button button-primary" type="button" onClick={addManual}>
              Tambah Testimoni
            </button>
          </div>
        </header>

        <section className="admin-kpi-grid">
          {[
            ["Menunggu Review", items.filter((item) => item.status === "Pending").length, "Ulasan baru dari siswa yang perlu ditinjau."],
            ["Disetujui", items.filter((item) => item.status === "Approved").length, "Siap tampil di halaman utama."],
            ["Unggulan (Featured)", items.filter((item) => item.featured).length, "Ditonjolkan di landing page."],
            ["Perlu Konfirmasi", items.filter((item) => !item.consent).length, "Memerlukan izin sebelum tayang."],
          ].map(([label, value, metaText]) => (
            <article className="admin-kpi-card" key={label}>
              <h2>{label}</h2>
              <strong>{value}</strong>
              <small>{metaText}</small>
            </article>
          ))}
        </section>

        <section className="a8-toolbar">
          <label className="admin-search-box">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama siswa, program, atau status"
            />
          </label>
          <div className="admin-filters" aria-label="Filter testimoni">
            {["Semua", "Pending", "Approved", "Featured", "Izin bermasalah"].map((option) => (
              <button
                className={filter === option ? "active" : ""}
                type="button"
                onClick={() => setFilter(option)}
                key={option}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <div className="a8-layout">
          {/* Antrean Testimoni */}
          <section className="a8-queue">
            <header>
              <h2>Daftar testimoni siswa</h2>
              <p>Klik nama siswa untuk membaca isi ulasan lengkap.</p>
            </header>
            {visible.length ? (
              visible.map((item) => (
                <button
                  className={selected.id === item.id && !manual ? "active" : ""}
                  type="button"
                  onClick={() => select(item.id)}
                  key={item.id}
                >
                  <span>
                    <strong>{item.member}</strong>
                    <small>{item.plan} • {item.context}</small>
                  </span>
                  <span>
                    <b>{item.consent ? "Izin Valid" : "Perlu Izin"}</b>
                    <small>{item.featured ? "Approved • Featured" : item.status}</small>
                  </span>
                  <em>Review</em>
                </button>
              ))
            ) : (
              <section className="a8-empty">
                <strong>Belum ada testimoni pada filter ini.</strong>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("Semua");
                  }}
                >
                  Reset Filter
                </button>
              </section>
            )}
          </section>

          {/* Panel Review & Moderasi */}
          <section className="a8-review" ref={reviewRef}>
            {manual ? (
              <>
                <header>
                  <div>
                    <p className="admin-kicker">INPUT TESTIMONI BARU</p>
                    <h2>Tambah ulasan siswa secara manual</h2>
                  </div>
                  <span>Draft Baru</span>
                </header>
                <div className="a8-form-grid">
                  <label className="admin-field">
                    <span>Nama Lengkap Siswa</span>
                    <input
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                    />
                  </label>
                  <label className="admin-field">
                    <span>Program / Paket Belajar</span>
                    <select
                      value={manualPlan}
                      onChange={(event) => setManualPlan(event.target.value)}
                    >
                      <option>Free Member</option>
                      <option>Belajar Mandiri</option>
                      <option>Belajar dengan Sensei</option>
                      <option>Program SSW</option>
                    </select>
                  </label>
                </div>
                <label className="admin-field">
                  <span>Isi Testimoni Siswa</span>
                  <textarea
                    rows={5}
                    value={manualContent}
                    onChange={(event) => setManualContent(event.target.value)}
                    placeholder="Tuliskan cerita pengalaman belajar siswa di sini..."
                  />
                </label>
                <label className="a8-check">
                  <input
                    type="checkbox"
                    checked={featuredIntent}
                    onChange={(event) => setFeaturedIntent(event.target.checked)}
                  />
                  <span>
                    <strong>Tampilkan sebagai testimoni unggulan di halaman depan</strong>
                    <small>Testimoni ini akan langsung diprioritaskan di landing page.</small>
                  </span>
                </label>
                {error && <p className="a4-validation" role="alert">{error}</p>}
                <div className="a8-actions">
                  <button className="button button-primary" type="button" onClick={handleSaveManual}>
                    Simpan Testimoni
                  </button>
                  <button className="button button-secondary" type="button" onClick={() => setManual(false)}>
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <header>
                  <div>
                    <p className="admin-kicker">{selected.member.toUpperCase()}</p>
                    <h2>{selected.plan} • {selected.context}</h2>
                  </div>
                  <span>{selected.featured ? "Approved & Featured" : selected.status === "Pending" ? "Pending Review" : selected.status}</span>
                </header>
                <div className="a8-badges">
                  <b>{selected.consent ? "Izin Penayangan Valid" : "Belum Ada Izin Siswa"}</b>
                  <span>Sumber: {selected.source}</span>
                </div>
                <article className="a8-feedback-text">
                  <strong>KUTIPAN TESTIMONI</strong>
                  <p>&ldquo;{selected.content}&rdquo;</p>
                </article>
                <div className="a8-actions" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => approval(false)}
                  >
                    Setujui Testimoni
                  </button>
                  <button
                    className="button button-dark"
                    type="button"
                    onClick={() => approval(true)}
                  >
                    Setujui &amp; Jadikan Unggulan
                  </button>
                  <button
                    className="button button-secondary danger"
                    type="button"
                    onClick={() => {
                      setReason("");
                      setError("");
                      setDialog("reject");
                    }}
                  >
                    Tolak
                  </button>
                </div>
              </>
            )}
            <aside className="a8-privacy" style={{ marginTop: "24px" }}>
              <strong>KEBIJAKAN PRIVASI TESTIMONI</strong>
              <p>Hanya testimoni yang telah mendapat izin penayangan dari siswa yang akan ditampilkan pada halaman publik.</p>
            </aside>
          </section>
        </div>

        {/* Dialog Actions */}
        {dialog && (
          <div className="admin-dialog-layer">
            <button
              className="admin-dialog-backdrop"
              type="button"
              onClick={() => setDialog(null)}
              aria-label="Tutup dialog moderasi testimoni"
            />
            <section
              className="a4-dialog a8-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="testimonial-dialog-title"
            >
              {dialog === "approve" && (
                <Success
                  kicker="ADMIN • MODERASI TESTIMONI"
                  title="Testimoni berhasil disetujui"
                  text="Testimoni siswa kini siap ditampilkan pada bagian testimoni publik."
                  items={["Persetujuan valid", "Konten disetujui", "Tersimpan di sistem"]}
                  close={() => setDialog(null)}
                />
              )}
              {dialog === "feature" && (
                <Success
                  kicker="ADMIN • TESTIMONI UNGGULAN"
                  title="Testimoni dijadikan unggulan"
                  text="Testimoni telah disetujui dan ditandai untuk tampil di baris terdepan Landing Page."
                  items={["Persetujuan valid", "Status unggulan aktif", "Tersimpan di sistem"]}
                  close={() => setDialog(null)}
                />
              )}
              {dialog === "blocked" && (
                <>
                  <p className="admin-kicker">ADMIN • PERSETUJUAN DIBUTUHKAN</p>
                  <h2 id="testimonial-dialog-title">Konfirmasi izin siswa diperlukan</h2>
                  <p>Testimoni ini belum memiliki izin tertulis dari siswa. Hubungi siswa terlebih dahulu sebelum menyetujui penayangan publik.</p>
                  <button className="button button-primary" type="button" onClick={() => setDialog(null)}>
                    Mengerti
                  </button>
                </>
              )}
              {dialog === "reject" && (
                <>
                  <p className="admin-kicker">ADMIN • MODERASI TESTIMONI</p>
                  <h2 id="testimonial-dialog-title">Tolak testimoni ini?</h2>
                  <p>Testimoni yang ditolak tidak akan ditampilkan pada halaman publik.</p>
                  <label className="admin-field">
                    <span>Alasan Penolakan</span>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Tuliskan alasan penolakan..."
                    />
                  </label>
                  {error && <p className="a4-validation" role="alert">{error}</p>}
                  <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                    <button className="button button-primary" type="button" onClick={reject}>
                      Konfirmasi Tolak
                    </button>
                    <button className="button button-secondary" type="button" onClick={() => setDialog(null)}>
                      Batal
                    </button>
                  </div>
                </>
              )}
              {dialog === "rejected" && (
                <Success
                  kicker="ADMIN • MODERASI TESTIMONI"
                  title="Testimoni berhasil ditolak"
                  text="Status testimoni telah diperbarui dan tidak akan ditampilkan pada halaman publik."
                  items={["Alasan tercatat", "Status diperbarui"]}
                  close={() => setDialog(null)}
                />
              )}
              {dialog === "export" && (
                <>
                  <p className="admin-kicker">ADMIN • EKSPOR DATA</p>
                  <h2 id="testimonial-dialog-title">Ekspor data testimoni siswa</h2>
                  <p>Seluruh riwayat ulasan siswa yang telah disetujui sedang disiapkan untuk diekspor ke format spreadsheet.</p>
                  <button className="button button-primary" type="button" onClick={() => setDialog(null)}>
                    Unduh Data
                  </button>
                </>
              )}
            </section>
          </div>
        )}
      </main>
    </AdminShell>
  );
}

function Success({
  kicker,
  title,
  text,
  items,
  close,
}: {
  kicker: string;
  title: string;
  text: string;
  items: string[];
  close: () => void;
}) {
  return (
    <section className="a4-success">
      <p className="admin-kicker">{kicker}</p>
      <h2 id="testimonial-dialog-title">{title}</h2>
      <span aria-hidden="true">✓</span>
      <p>{text}</p>
      <ul className="a8-steps">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button className="button button-primary" type="button" onClick={close}>
        Kembali ke Testimoni
      </button>
    </section>
  );
}
