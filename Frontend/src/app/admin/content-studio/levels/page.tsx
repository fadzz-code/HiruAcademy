"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import {
  defaultLevels,
  type LevelContent,
  type PublicationStatus,
} from "@/lib/content-studio";

const seedLevels: readonly LevelContent[] = [
  {
    id: "level-n5",
    level: "N5",
    title: "N5 - Dasar",
    description: "Fondasi tata bahasa, kosakata dasar, dan percakapan harian.",
    tags: ["Dasar", "Hiragana", "Katakana", "JLPT N5"],
    order: 1,
    visible: true,
    status: "published",
  },
  {
    id: "level-n4",
    level: "N4",
    title: "N4 - Pemula Lanjutan",
    description: "Peningkatan pemahaman kalimat majemuk, kanji harian, dan listening.",
    tags: ["Pemula Lanjutan", "Kanji", "JLPT N4"],
    order: 2,
    visible: true,
    status: "published",
  },
  {
    id: "level-n3",
    level: "N3",
    title: "N3 - Menengah",
    description: "Jembatan menuju pemahaman bahasa Jepang natural dan artikel pendek.",
    tags: ["Menengah", "Dokkai", "JLPT N3"],
    order: 3,
    visible: true,
    status: "published",
  },
  {
    id: "level-n2",
    level: "N2",
    title: "N2 - Lanjut",
    description: "Bahasa Jepang level bisnis, berita, dan wacana formal komprehensif.",
    tags: ["Lanjut", "Bisnis", "JLPT N2"],
    order: 4,
    visible: false,
    status: "draft",
  },
  {
    id: "level-n1",
    level: "N1",
    title: "N1 - Mahir",
    description: "Tingkat kemahiran tertinggi setara penutur asli untuk teks abstrak dan teknis.",
    tags: ["Mahir", "Akademik", "JLPT N1"],
    order: 5,
    visible: false,
    status: "draft",
  },
];

export default function LevelsContentStudioPage() {
  const initialRecords = useMemo(
    () => (defaultLevels.length > 0 ? [...defaultLevels] : [...seedLevels]),
    []
  );

  const [levels, setLevels] = useState<LevelContent[]>(initialRecords);
  const [selectedId, setSelectedId] = useState<string>(
    initialRecords[0]?.id || "level-n5"
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const selectedLevel = useMemo(() => {
    return levels.find((item) => item.id === selectedId) || levels[0] || seedLevels[0];
  }, [levels, selectedId]);

  const [title, setTitle] = useState(selectedLevel.title);
  const [description, setDescription] = useState(selectedLevel.description);
  const [tagsInput, setTagsInput] = useState(selectedLevel.tags.join(", "));
  const [order, setOrder] = useState(selectedLevel.order);
  const [visible, setVisible] = useState(selectedLevel.visible);
  const [status, setStatus] = useState<PublicationStatus>(selectedLevel.status);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const filteredLevels = useMemo(() => {
    const query = search.trim().toLowerCase();
    return levels
      .filter((lvl) => {
        const matchesQuery =
          !query ||
          lvl.level.toLowerCase().includes(query) ||
          lvl.title.toLowerCase().includes(query) ||
          lvl.description.toLowerCase().includes(query) ||
          lvl.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesStatus =
          statusFilter === "all" || lvl.status === statusFilter;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => a.order - b.order);
  }, [levels, search, statusFilter]);

  function handleSelect(item: LevelContent) {
    setSelectedId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setTagsInput(item.tags.join(", "));
    setOrder(item.order);
    setVisible(item.visible);
    setStatus(item.status);
    setPreviewOpen(false);
    setFeedback("Level " + item.level + " dipilih.");
  }

  function handleReorder(direction: "up" | "down") {
    const sorted = [...levels].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((item) => item.id === selectedId);
    if (index === -1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;

    const currentItem = sorted[index];
    const targetItem = sorted[targetIndex];

    const currentOrder = currentItem.order;
    const targetOrder = targetItem.order;

    const updatedLevels = sorted.map((item) => {
      if (item.id === currentItem.id) {
        return { ...item, order: targetOrder };
      }
      if (item.id === targetItem.id) {
        return { ...item, order: currentOrder };
      }
      return item;
    });

    setLevels(updatedLevels);
    setOrder(targetOrder);
    setFeedback("Urutan level " + currentItem.level + " diperbarui.");
  }

  function handleSaveDraft() {
    const parsedTags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const updated: LevelContent = {
      id: selectedLevel.id,
      level: selectedLevel.level,
      title,
      description,
      tags: parsedTags,
      order,
      visible,
      status: "draft",
    };

    setLevels((prev) =>
      prev.map((item) => (item.id === selectedLevel.id ? updated : item))
    );
    setStatus("draft");
    setFeedback(
      "Draft level " +
        selectedLevel.level +
        " disimpan secara lokal. Perubahan editor frontend belum dipersist ke server."
    );
  }

  function handlePublish() {
    const parsedTags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const updated: LevelContent = {
      id: selectedLevel.id,
      level: selectedLevel.level,
      title,
      description,
      tags: parsedTags,
      order,
      visible,
      status: "published",
    };

    setLevels((prev) =>
      prev.map((item) => (item.id === selectedLevel.id ? updated : item))
    );
    setStatus("published");
    setFeedback(
      "Level " +
        selectedLevel.level +
        " dipublikasikan secara lokal. Perubahan editor frontend belum dipersist ke server."
    );
  }

  function handleCancel() {
    setTitle(selectedLevel.title);
    setDescription(selectedLevel.description);
    setTagsInput(selectedLevel.tags.join(", "));
    setOrder(selectedLevel.order);
    setVisible(selectedLevel.visible);
    setStatus(selectedLevel.status);
    setPreviewOpen(false);
    setFeedback("Perubahan form dibatalkan.");
  }

  return (
    <AdminShell current="content-studio">
      <main className="admin-page admin-a7-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN - CONTENT STUDIO</p>
            <h1>Level Studio</h1>
            <p>
              Kelola metadata level N5-N1, deskripsi, urutan, visibilitas, dan
              status publikasi.
            </p>
          </div>
          <div className="admin-header-actions">
            <Link
              className="button button-secondary"
              href="/admin/content-studio"
            >
              Kembali ke Content Studio
            </Link>
            <Link
              className="button button-primary"
              href={"/admin/program/" + selectedLevel.level.toLowerCase() + "/chapters"}
            >
              Chapter Builder {selectedLevel.level}
            </Link>
          </div>
        </header>

        <section className="admin-kpi-grid">
          <article className="admin-kpi-card">
            <h2>Status Penyimpanan</h2>
            <strong>Frontend only</strong>
            <small>Perubahan editor frontend belum dipersist ke server.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Total Level</h2>
            <strong>{levels.length}</strong>
            <small>N5 hingga N1 terdaftar.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Level Aktif</h2>
            <strong>
              {levels.filter((item) => item.status === "published").length}
            </strong>
            <small>Status terpublikasi saat ini.</small>
          </article>
          <article className="admin-kpi-card">
            <h2>Level Terpilih</h2>
            <strong>{selectedLevel.level}</strong>
            <small>Urutan ke-{selectedLevel.order}</small>
          </article>
        </section>

        <div className="a7-layout">
          <aside className="a7-list">
            <header>
              <h2>Daftar Level</h2>
              <label className="admin-search-box">
                <span>Cari</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari level, judul, tag"
                />
              </label>
              <div className="admin-field">
                <span>Filter Status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="admin-select"
                >
                  <option value="all">Semua Status</option>
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                  <option value="scheduled">scheduled</option>
                  <option value="archived">archived</option>
                </select>
              </div>
            </header>

            {filteredLevels.map((item) => (
              <button
                key={item.id}
                type="button"
                className={selectedId === item.id ? "active" : ""}
                onClick={() => handleSelect(item)}
              >
                <div>
                  <strong>
                    {item.level} - {item.title}
                  </strong>
                  <small>
                    Urutan {item.order} | {item.visible ? "Katalog" : "Tersembunyi"}
                  </small>
                </div>
                <b>{item.status}</b>
              </button>
            ))}
          </aside>

          <section className="a7-editor">
            <header>
              <div>
                <p className="admin-kicker">LEVEL EDITOR</p>
                <h2>{selectedLevel.level} - {selectedLevel.title}</h2>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => handleReorder("up")}
                >
                  Urutkan Naik
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => handleReorder("down")}
                >
                  Urutkan Turun
                </button>
              </div>
            </header>

            {feedback && (
              <p className="admin-local-feedback" role="status">
                {feedback}
              </p>
            )}

            <label className="admin-field">
              <span>Level (Read-only)</span>
              <input value={selectedLevel.level} readOnly />
            </label>

            <label className="admin-field">
              <span>Judul</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul level"
              />
            </label>

            <label className="admin-field">
              <span>Deskripsi</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Deskripsi materi dan capaian level"
              />
            </label>

            <label className="admin-field">
              <span>Tags (Pisahkan dengan koma)</span>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Dasar, Hiragana, JLPT N5"
              />
            </label>

            <div className="a7-field-grid">
              <label className="admin-field">
                <span>Nomor Urutan</span>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value) || 0)}
                />
              </label>

              <label className="admin-field">
                <span>Status Publikasi</span>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as PublicationStatus)
                  }
                >
                  <option value="draft">draft</option>
                  <option value="scheduled">scheduled</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </label>
            </div>

            <label className="admin-field checkbox">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
              />
              <span>Tampilkan pada katalog publik dan navigasi student</span>
            </label>

            <div className="a7-actions" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleSaveDraft}
              >
                Save Draft
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={handlePublish}
              >
                Publish / Update
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={handleCancel}
              >
                Cancel / Back
              </button>
              <button
                type="button"
                className="button button-dark"
                onClick={() => setPreviewOpen(!previewOpen)}
              >
                {previewOpen ? "Tutup Preview" : "Preview"}
              </button>
              <Link
                className="button button-secondary"
                href={"/admin/program/" + selectedLevel.level.toLowerCase() + "/chapters"}
              >
                Buka Chapter Builder
              </Link>
            </div>

            {previewOpen && (
              <article className="a7-preview">
                <p className="admin-kicker">PREVIEW TAMPILAN SISWA</p>
                <h3>{selectedLevel.level} - {title || "Tanpa Judul"}</h3>
                <p>{description || "Tidak ada deskripsi."}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "12px 0" }}>
                  {tagsInput
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#fff",
                          border: "1px solid #d9c8bc",
                          borderRadius: "6px",
                          padding: "3px 8px",
                          fontSize: "11px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <small>
                  Urutan: {order} | Visibilitas: {visible ? "Tampil" : "Disembunyikan"} | Status: {status}
                </small>
              </article>
            )}

            <aside className="admin-product-rules">
              <p>
                Aturan akses dan entitlement dikontrol penuh oleh sistem backend.
                Pengaturan hak akses sistem tidak diizinkan pada editor konten ini.
              </p>
            </aside>

            <aside className="admin-product-rules">
              <p>
                Status penyimpanan: Frontend only. Perubahan editor frontend belum
                dipersist ke server.
              </p>
            </aside>
          </section>
        </div>
      </main>
    </AdminShell>
  );
}
