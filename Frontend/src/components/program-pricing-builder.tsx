"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import {
  AdminBreadcrumb,
  AdminConfirmDialog,
  AdminDataTable,
  AdminDialog,
  AdminPageHeader,
  AdminStatusBadge,
} from "@/components/admin-primitives";
import {
  createProgram,
  deleteProgram,
  programCodes,
  programStatuses,
  readProgram,
  saveProgram,
  useCurriculumStore,
  type Program,
  type ProgramCode,
  type ProgramStatus,
} from "@/lib/admin-curriculum-store";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProgramPricingBuilder() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const action = searchParams.get("action");
  const isEditing = Boolean(id || action === "new");

  if (isEditing) {
    return <ProgramEditor key={id ?? "new"} id={id} />;
  }

  return <ProgramHub />;
}

function ProgramHub() {
  const router = useRouter();
  const { store, refresh } = useCurriculumStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);

  const programs = store.programs
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter((p) => {
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase());
      const matchStatus = !statusFilter || p.status === statusFilter;
      return matchQuery && matchStatus;
    });

  function handleDelete() {
    if (!deleteTarget) return;
    deleteProgram(deleteTarget.id);
    refresh();
    setDeleteTarget(null);
  }

  return (
    <AdminShell current="/admin/program-harga">
      <main className="admin-page program-pricing-admin">
        <AdminBreadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Program & Harga" },
          ]}
        />
        <AdminPageHeader
          eyebrow="ADMIN • WEBSITE"
          title="Program & Harga"
          description="Kelola paket belajar, struktur harga mandiri dan bimbingan sensei, durasi akses, serta status publikasi."
          actions={
            <Link
              className="button button-primary"
              href="/admin/program-harga?action=new"
            >
              + Tambah Program
            </Link>
          }
        />

        <div className="program-pricing-filters">
          <label>
            <span>Cari program</span>
            <input
              type="search"
              placeholder="Cari nama atau kode..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label>
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              {programStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          {(query || statusFilter) && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setQuery("");
                setStatusFilter("");
              }}
            >
              Reset
            </button>
          )}
        </div>

        <AdminDataTable
          caption="Daftar Program & Harga"
          rows={programs}
          rowKey={(row) => row.id}
          empty="Belum ada program yang terdaftar."
          columns={[
            {
              key: "code",
              header: "Kode",
              cell: (row) => (
                <span className="program-code-badge">{row.code}</span>
              ),
            },
            {
              key: "name",
              header: "Nama Program",
              cell: (row) => (
                <div>
                  <strong>{row.name || "Tanpa Nama"}</strong>
                  <small>{row.shortDescription}</small>
                </div>
              ),
            },
            {
              key: "selfStudyPrice",
              header: "Harga Mandiri",
              cell: (row) => (
                <div>
                  <strong>{formatRupiah(row.selfStudyPrice)}</strong>
                  <small>
                    {row.selfStudyAvailable ? "Tersedia" : "Nonaktif"}
                  </small>
                </div>
              ),
            },
            {
              key: "senseiPrice",
              header: "Harga Sensei",
              cell: (row) => (
                <div>
                  <strong>{formatRupiah(row.senseiPrice)}</strong>
                  <small>{row.senseiAvailable ? "Tersedia" : "Nonaktif"}</small>
                </div>
              ),
            },
            {
              key: "duration",
              header: "Durasi Akses",
              cell: (row) => <span>{row.accessDurationMonths} Bulan</span>,
            },
            {
              key: "status",
              header: "Status",
              cell: (row) => <AdminStatusBadge status={row.status} />,
            },
          ]}
          actions={{
            header: "Aksi",
            cell: (row) => (
              <div className="program-row-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => router.push(`/admin/program-harga?id=${row.id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setDeleteTarget(row)}
                >
                  Hapus
                </button>
              </div>
            ),
          }}
        />

        <AdminConfirmDialog
          open={Boolean(deleteTarget)}
          title="Hapus Program?"
          close={() => setDeleteTarget(null)}
          actions={
            <>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </>
          }
        >
          <p>
            Apakah Anda yakin ingin menghapus program{" "}
            <strong>{deleteTarget?.name}</strong>? Tindakan ini tidak dapat
            dibatalkan.
          </p>
        </AdminConfirmDialog>
      </main>
    </AdminShell>
  );
}

function ProgramEditor({ id }: { id: string | null }) {
  const router = useRouter();
  const { refresh } = useCurriculumStore();
  const [program, setProgram] = useState<Program>(() => {
    if (id) {
      const existing = readProgram(id);
      if (existing) return existing;
    }
    return createProgram("N5");
  });

  const [activeSection, setActiveSection] = useState<
    "informasi" | "harga" | "status"
  >("informasi");
  const [mobileTab, setMobileTab] = useState<"Outline" | "Editor">("Editor");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  function patch(values: Partial<Program>) {
    setProgram((prev) => ({ ...prev, ...values }));
  }

  function validate() {
    const list: string[] = [];
    if (!program.name.trim()) list.push("Nama program wajib diisi.");
    if (!program.slug.trim()) list.push("Slug program wajib diisi.");
    if (program.selfStudyPrice < 0)
      list.push("Harga belajar mandiri tidak boleh negatif.");
    if (program.senseiPrice < 0)
      list.push("Harga bimbingan sensei tidak boleh negatif.");
    if (program.accessDurationMonths <= 0)
      list.push("Durasi akses minimal 1 bulan.");
    setErrors(list);
    return list.length === 0;
  }

  function handleSave(status: ProgramStatus) {
    if (status === "Published" && !validate()) return;
    const item: Program = { ...program, status };
    saveProgram(item);
    refresh();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
    if (!id) {
      router.replace(`/admin/program-harga?id=${item.id}`);
    }
  }

  return (
    <AdminShell current="/admin/program-harga">
      <main className="admin-page program-editor-page">
        <AdminBreadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Program & Harga", href: "/admin/program-harga" },
            { label: program.name || "Program Baru" },
          ]}
        />

        <AdminPageHeader
          eyebrow="ADMIN • PROGRAM EDITOR"
          title={program.name || "Program Baru"}
          description="Konfigurasi detail informasi program, skema harga, dan status publikasi."
          actions={
            <div className="program-publication-bar">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setPreviewOpen(true)}
              >
                Preview
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => handleSave("Draft")}
              >
                Simpan Draft
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={() => handleSave("Published")}
              >
                Terbitkan
              </button>
            </div>
          }
        />

        {savedNotice && (
          <div className="admin-save-toast" role="status">
            Perubahan program berhasil disimpan.
          </div>
        )}

        {errors.length > 0 && (
          <div className="assessment-validation" role="alert">
            <strong>Program belum dapat diterbitkan:</strong>
            <ul>
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="assessment-mobile-tabs">
          <button
            type="button"
            className={mobileTab === "Outline" ? "active" : ""}
            onClick={() => setMobileTab("Outline")}
          >
            Outline
          </button>
          <button
            type="button"
            className={mobileTab === "Editor" ? "active" : ""}
            onClick={() => setMobileTab("Editor")}
          >
            Editor
          </button>
        </div>

        <div className="program-editor-workspace">
          <aside
            className={`program-editor-outline ${
              mobileTab === "Outline" ? "mobile-active" : ""
            }`}
          >
            <nav aria-label="Outline Program">
              <button
                type="button"
                className={activeSection === "informasi" ? "active" : ""}
                onClick={() => {
                  setActiveSection("informasi");
                  setMobileTab("Editor");
                }}
              >
                <strong>1. Informasi</strong>
                <small>Kode, nama, slug & deskripsi</small>
              </button>
              <button
                type="button"
                className={activeSection === "harga" ? "active" : ""}
                onClick={() => {
                  setActiveSection("harga");
                  setMobileTab("Editor");
                }}
              >
                <strong>2. Harga & Akses</strong>
                <small>Mandiri, Sensei & durasi</small>
              </button>
              <button
                type="button"
                className={activeSection === "status" ? "active" : ""}
                onClick={() => {
                  setActiveSection("status");
                  setMobileTab("Editor");
                }}
              >
                <strong>3. Status & Urutan</strong>
                <small>Publikasi & urutan tampilan</small>
              </button>
            </nav>
          </aside>

          <section
            className={`program-editor-content ${
              mobileTab === "Editor" ? "mobile-active" : ""
            }`}
          >
            {activeSection === "informasi" && (
              <div className="program-form-card">
                <h2>Informasi Program</h2>
                <div className="form-grid">
                  <label>
                    <span>Kode Program</span>
                    <select
                      value={program.code}
                      onChange={(e) =>
                        patch({ code: e.target.value as ProgramCode })
                      }
                    >
                      {programCodes.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Slug URL</span>
                    <input
                      type="text"
                      value={program.slug}
                      onChange={(e) => patch({ slug: e.target.value })}
                      placeholder="contoh: n5-pemula"
                    />
                  </label>
                </div>

                <label>
                  <span>Nama Program</span>
                  <input
                    type="text"
                    value={program.name}
                    onChange={(e) => patch({ name: e.target.value })}
                    placeholder="Nama lengkap program"
                  />
                </label>

                <label>
                  <span>Ringkasan Singkat</span>
                  <input
                    type="text"
                    value={program.shortDescription}
                    onChange={(e) =>
                      patch({ shortDescription: e.target.value })
                    }
                    placeholder="Deskripsi satu kalimat untuk kartu & ringkasan"
                  />
                </label>

                <label>
                  <span>Deskripsi Lengkap</span>
                  <textarea
                    rows={4}
                    value={program.description}
                    onChange={(e) => patch({ description: e.target.value })}
                    placeholder="Penjelasan menyeluruh materi yang dipelajari..."
                  />
                </label>
              </div>
            )}

            {activeSection === "harga" && (
              <div className="program-form-card">
                <h2>Harga & Akses</h2>

                <fieldset className="program-pricing-group">
                  <legend>Paket Belajar Mandiri (LMS)</legend>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={program.selfStudyAvailable}
                      onChange={(e) =>
                        patch({ selfStudyAvailable: e.target.checked })
                      }
                    />
                    <span>Tersedia untuk pendaftaran</span>
                  </label>
                  <label>
                    <span>Harga Belajar Mandiri (Rp)</span>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={program.selfStudyPrice}
                      onChange={(e) =>
                        patch({ selfStudyPrice: Number(e.target.value) || 0 })
                      }
                    />
                  </label>
                </fieldset>

                <fieldset className="program-pricing-group">
                  <legend>Paket Belajar dengan Sensei</legend>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      checked={program.senseiAvailable}
                      onChange={(e) =>
                        patch({ senseiAvailable: e.target.checked })
                      }
                    />
                    <span>Tersedia untuk pendaftaran</span>
                  </label>
                  <label>
                    <span>Harga Belajar dengan Sensei (Rp)</span>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={program.senseiPrice}
                      onChange={(e) =>
                        patch({ senseiPrice: Number(e.target.value) || 0 })
                      }
                    />
                  </label>
                </fieldset>

                <label>
                  <span>Durasi Akses Belajar (Bulan)</span>
                  <input
                    type="number"
                    min={1}
                    max={36}
                    value={program.accessDurationMonths}
                    onChange={(e) =>
                      patch({
                        accessDurationMonths: Number(e.target.value) || 1,
                      })
                    }
                  />
                </label>
              </div>
            )}

            {activeSection === "status" && (
              <div className="program-form-card">
                <h2>Status & Urutan Tampilan</h2>
                <div className="form-grid">
                  <label>
                    <span>Status Publikasi</span>
                    <select
                      value={program.status}
                      onChange={(e) =>
                        patch({ status: e.target.value as ProgramStatus })
                      }
                    >
                      {programStatuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Urutan Tampilan</span>
                    <input
                      type="number"
                      min={1}
                      value={program.sortOrder}
                      onChange={(e) =>
                        patch({ sortOrder: Number(e.target.value) || 1 })
                      }
                    />
                  </label>
                </div>
              </div>
            )}
          </section>
        </div>

        <AdminDialog
          open={previewOpen}
          title="Preview Kartu Program"
          close={() => setPreviewOpen(false)}
          actions={
            <button
              type="button"
              className="button button-primary"
              onClick={() => setPreviewOpen(false)}
            >
              Tutup Preview
            </button>
          }
        >
          <div className="program-preview-card">
            <div className="program-preview-header">
              <span className="program-code-badge">{program.code}</span>
              <AdminStatusBadge status={program.status} />
            </div>
            <h3>{program.name || "Judul Program"}</h3>
            <p className="program-preview-slug">/{program.slug}</p>
            <p className="program-preview-desc">
              {program.shortDescription || program.description || "Deskripsi program..."}
            </p>
            <div className="program-preview-prices">
              <div className="price-item">
                <small>Belajar Mandiri</small>
                <strong>
                  {program.selfStudyAvailable
                    ? formatRupiah(program.selfStudyPrice)
                    : "Tidak Tersedia"}
                </strong>
              </div>
              <div className="price-item">
                <small>Dengan Sensei</small>
                <strong>
                  {program.senseiAvailable
                    ? formatRupiah(program.senseiPrice)
                    : "Tidak Tersedia"}
                </strong>
              </div>
            </div>
            <div className="program-preview-footer">
              <span>Masa Akses: {program.accessDurationMonths} Bulan</span>
            </div>
          </div>
        </AdminDialog>
      </main>
    </AdminShell>
  );
}
