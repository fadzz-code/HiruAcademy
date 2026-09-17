"use client";

import { useMemo, useState } from "react";
import {
  activateUserMembershipForInvoice,
  createAffiliate,
  createInvoice,
  createPayout,
  extendUserAccess,
  generateCommissionForInvoice,
  markPayoutPaid,
  toggleAffiliateStatus,
  toggleUserStatus,
  updateBusinessSettings,
  updateInvoiceStatus,
  updateUser,
  useBusinessAdminStore,
  type AffiliateAccount,
  type BusinessSettings,
  type BusinessUser,
  type Commission,
  type CommissionStatus,
  type Invoice,
  type InvoiceStatus,
  type Payout,
  type PayoutStatus,
  type UserMembership,
  type UserStatus,
} from "@/lib/admin-business-store";
import { getInvoiceWhatsAppUrl } from "@/lib/business-store";
import {
  AdminBreadcrumb,
  AdminConfirmDialog,
  AdminDataTable,
  AdminDialog,
  AdminEmptyState,
  AdminFilterToolbar,
  AdminPageHeader,
  AdminShell,
  AdminStatusBadge,
  AdminTabs,
} from "@/components/admin-primitives";

function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateStr?: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const INVOICE_STATUS_STEPS: InvoiceStatus[] = [
  "Draft",
  "Menunggu pembayaran",
  "Sudah bayar",
  "Diverifikasi",
  "Aktif",
];

const PROGRAM_CODES = ["Dasar", "N5", "N4", "N3", "N2", "SSW", "Interview"];

function InvoiceStepper({ status }: { status: InvoiceStatus }) {
  const currentIndex = INVOICE_STATUS_STEPS.indexOf(status);

  return (
    <div className="business-stepper" role="list" aria-label="Progres Invoice">
      {INVOICE_STATUS_STEPS.map((stepName, idx) => {
        const isDone = currentIndex > idx || (idx === 4 && status === "Aktif");
        const isCurrent = currentIndex === idx && status !== "Aktif";
        const stateClass = isDone ? "is-done" : isCurrent ? "is-current" : "is-pending";

        return (
          <div key={stepName} className={`business-step-item ${stateClass}`} role="listitem">
            <div className="business-step-indicator">
              <span className="business-step-circle">
                {isDone ? "✓" : idx + 1}
              </span>
              {idx < INVOICE_STATUS_STEPS.length - 1 && (
                <span className={`business-step-line ${isDone ? "is-done" : ""}`} />
              )}
            </div>
            <span className="business-step-label">{stepName}</span>
          </div>
        );
      })}
    </div>
  );
}

export function InvoiceOperations() {
  const store = useBusinessAdminStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [programFilter, setProgramFilter] = useState("Semua Program");

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [waConfigOpen, setWaConfigOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [waNumberDraft, setWaNumberDraft] = useState(store.settings.adminWhatsAppNumber);
  const [waTemplateDraft, setWaTemplateDraft] = useState(store.settings.invoiceWhatsAppTemplate);

  const [newInvoice, setNewInvoice] = useState({
    userName: "",
    userEmail: "",
    userWhatsApp: "",
    programCode: "N5",
    plan: "lms" as "lms" | "sensei",
    amount: 349000,
    status: "Menunggu pembayaran" as InvoiceStatus,
    targetJLPT: "N5 Juli 2026",
    referralCode: "",
    paymentNote: "",
  });

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  const filteredInvoices = useMemo(() => {
    return store.invoices.filter((inv) => {
      const matchSearch =
        !search ||
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.userName.toLowerCase().includes(search.toLowerCase()) ||
        inv.userEmail.toLowerCase().includes(search.toLowerCase()) ||
        inv.userWhatsApp.includes(search);

      const matchStatus = statusFilter === "Semua" || inv.status === statusFilter;
      const matchProgram =
        programFilter === "Semua Program" || inv.programCode === programFilter;

      return matchSearch && matchStatus && matchProgram;
    });
  }, [store.invoices, search, statusFilter, programFilter]);

  const selectedInvoice = useMemo(() => {
    if (!selectedInvoiceId) return null;
    return store.invoices.find((inv) => inv.id === selectedInvoiceId) ?? null;
  }, [store.invoices, selectedInvoiceId]);

  function handleCreateSubmit(e: React.FormEvent) {
    e.preventDefault();
    createInvoice({
      userName: newInvoice.userName,
      userEmail: newInvoice.userEmail,
      userWhatsApp: newInvoice.userWhatsApp,
      programCode: newInvoice.programCode,
      plan: newInvoice.plan,
      amount: Number(newInvoice.amount),
      status: newInvoice.status,
      targetJLPT: newInvoice.targetJLPT || undefined,
      referralCode: newInvoice.referralCode || undefined,
      paymentNote: newInvoice.paymentNote || undefined,
    });
    setCreateOpen(false);
    showToast("Invoice baru berhasil dibuat");
  }

  function handleSaveWaSettings(e: React.FormEvent) {
    e.preventDefault();
    updateBusinessSettings({
      adminWhatsAppNumber: waNumberDraft,
      invoiceWhatsAppTemplate: waTemplateDraft,
    });
    setWaConfigOpen(false);
    showToast("Pengaturan WhatsApp berhasil disimpan");
  }

  const liveWaPreview = useMemo(() => {
    const inv = selectedInvoice || store.invoices[0] || {
      id: "INV-PREVIEW",
      userName: "Ahmad Santoso",
      programCode: "N5",
      plan: "lms" as const,
      amount: 349000,
      targetJLPT: "N5 Juli 2026",
    };

    const planLabel =
      inv.plan === "sensei" ? "Belajar dengan Sensei" : "Belajar Mandiri (LMS)";

    return (waTemplateDraft || "")
      .replaceAll("{invoice_id}", inv.id)
      .replaceAll("{name}", inv.userName)
      .replaceAll("{program}", inv.programCode)
      .replaceAll("{plan}", planLabel)
      .replaceAll("{level}", inv.programCode)
      .replaceAll("{amount}", inv.amount.toLocaleString("id-ID"))
      .replaceAll("{target}", inv.targetJLPT || "-");
  }, [waTemplateDraft, selectedInvoice, store.invoices]);

  const columns = [
    {
      key: "id",
      header: "Invoice ID",
      cell: (inv: Invoice) => (
        <strong className="invoice-code-cell">{inv.id}</strong>
      ),
    },
    {
      key: "member",
      header: "Member",
      cell: (inv: Invoice) => (
        <div className="table-member-cell">
          <strong>{inv.userName}</strong>
          <small>{inv.userEmail}</small>
          <small>{inv.userWhatsApp}</small>
        </div>
      ),
    },
    {
      key: "program",
      header: "Program",
      cell: (inv: Invoice) => (
        <span className="business-pill">{inv.programCode}</span>
      ),
    },
    {
      key: "plan",
      header: "Paket",
      cell: (inv: Invoice) => (
        <span>
          {inv.plan === "sensei" ? "Dengan Sensei" : "Belajar Mandiri"}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Nominal",
      cell: (inv: Invoice) => (
        <span className="font-semibold">{formatRupiah(inv.amount)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (inv: Invoice) => <AdminStatusBadge status={inv.status} />,
    },
    {
      key: "date",
      header: "Tanggal",
      cell: (inv: Invoice) => (
        <span className="text-muted">{formatDate(inv.createdAt)}</span>
      ),
    },
    {
      key: "action",
      header: "Aksi",
      cell: (inv: Invoice) => (
        <button
          type="button"
          className="button button-secondary button-sm"
          onClick={() => setSelectedInvoiceId(inv.id)}
        >
          Detail
        </button>
      ),
    },
  ];

  return (
    <AdminShell current="/admin/invoice">
      <main className="admin-page business-operations-page">
        <AdminBreadcrumb
          items={[{ label: "Admin", href: "/admin" }, { label: "Invoice" }]}
        />

        <AdminPageHeader
          eyebrow="PANEL ADMIN • TRANSAKSI"
          title="Invoice Pembayaran"
          description="Kelola pembayaran masuk, verifikasi mutasi bank, dan aktivasi membership otomatis."
          actions={
            <div className="admin-header-button-group">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setWaNumberDraft(store.settings.adminWhatsAppNumber);
                  setWaTemplateDraft(store.settings.invoiceWhatsAppTemplate);
                  setWaConfigOpen(true);
                }}
              >
                Template WhatsApp
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setCreateOpen(true)}
              >
                + Buat Invoice
              </button>
            </div>
          }
        />

        {toastMessage && (
          <div className="business-toast" role="status">
            {toastMessage}
          </div>
        )}

        <AdminFilterToolbar>
          <div className="business-filter-row">
            <div className="admin-search-box">
              <span>🔍</span>
              <input
                type="search"
                placeholder="Cari ID invoice, nama, email, WhatsApp..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Cari invoice"
              />
            </div>

            <div className="business-filter-selects">
              <select
                className="admin-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter status invoice"
              >
                <option value="Semua">Semua Status</option>
                <option value="Draft">Draft</option>
                <option value="Menunggu pembayaran">Menunggu pembayaran</option>
                <option value="Sudah bayar">Sudah bayar</option>
                <option value="Diverifikasi">Diverifikasi</option>
                <option value="Aktif">Aktif</option>
              </select>

              <select
                className="admin-select"
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                aria-label="Filter program invoice"
              >
                <option value="Semua Program">Semua Program</option>
                {PROGRAM_CODES.map((code) => (
                  <option key={code} value={code}>
                    Program {code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AdminFilterToolbar>

        <section className="business-table-section">
          <AdminDataTable
            caption="Daftar Invoice Pembayaran Siswa"
            columns={columns}
            rows={filteredInvoices}
            rowKey={(inv) => inv.id}
            empty={
              <AdminEmptyState
                title="Tidak ada invoice"
                description="Tidak ada invoice yang sesuai dengan kriteria pencarian atau filter."
              />
            }
          />
        </section>

        <AdminDialog
          open={createOpen}
          close={() => setCreateOpen(false)}
          title="Buat Invoice Baru"
        >
          <form onSubmit={handleCreateSubmit} className="business-form">
            <div className="business-form-grid">
              <label className="admin-field">
                <span>Nama Lengkap Siswa *</span>
                <input
                  required
                  value={newInvoice.userName}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, userName: e.target.value })
                  }
                  placeholder="Mis. Ahmad Pratama"
                />
              </label>

              <label className="admin-field">
                <span>Alamat Email Siswa *</span>
                <input
                  required
                  type="email"
                  value={newInvoice.userEmail}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, userEmail: e.target.value })
                  }
                  placeholder="ahmad@example.com"
                />
              </label>

              <label className="admin-field">
                <span>Nomor WhatsApp *</span>
                <input
                  required
                  value={newInvoice.userWhatsApp}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, userWhatsApp: e.target.value })
                  }
                  placeholder="081234567890"
                />
              </label>

              <label className="admin-field">
                <span>Program Belajar</span>
                <select
                  className="admin-select"
                  value={newInvoice.programCode}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, programCode: e.target.value })
                  }
                >
                  {PROGRAM_CODES.map((code) => (
                    <option key={code} value={code}>
                      Level {code}
                    </option>
                  ))}
                </select>
              </label>

              <label className="admin-field">
                <span>Paket Layanan</span>
                <select
                  className="admin-select"
                  value={newInvoice.plan}
                  onChange={(e) => {
                    const plan = e.target.value as "lms" | "sensei";
                    setNewInvoice({
                      ...newInvoice,
                      plan,
                      amount: plan === "sensei" ? 799000 : 349000,
                    });
                  }}
                >
                  <option value="lms">Belajar Mandiri (LMS)</option>
                  <option value="sensei">Belajar dengan Sensei</option>
                </select>
              </label>

              <label className="admin-field">
                <span>Nominal Pembayaran (Rp) *</span>
                <input
                  required
                  type="number"
                  min="0"
                  value={newInvoice.amount}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>Status Awal</span>
                <select
                  className="admin-select"
                  value={newInvoice.status}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      status: e.target.value as InvoiceStatus,
                    })
                  }
                >
                  <option value="Menunggu pembayaran">Menunggu pembayaran</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>

              <label className="admin-field">
                <span>Target JLPT</span>
                <input
                  value={newInvoice.targetJLPT}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, targetJLPT: e.target.value })
                  }
                  placeholder="Mis. N5 Juli 2026"
                />
              </label>

              <label className="admin-field">
                <span>Kode Referral / Affiliate (Opsional)</span>
                <input
                  value={newInvoice.referralCode}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, referralCode: e.target.value })
                  }
                  placeholder="Mis. HIRU-HILMI25"
                />
              </label>

              <label className="admin-field">
                <span>Catatan Pembayaran</span>
                <input
                  value={newInvoice.paymentNote}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, paymentNote: e.target.value })
                  }
                  placeholder="Mis. Transfer via BCA"
                />
              </label>
            </div>

            <div className="admin-dialog-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setCreateOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="button button-primary">
                Simpan &amp; Terbitkan
              </button>
            </div>
          </form>
        </AdminDialog>

        {selectedInvoice && (
          <AdminDialog
            open={Boolean(selectedInvoice)}
            close={() => setSelectedInvoiceId(null)}
            title={`Detail Invoice #${selectedInvoice.id}`}
          >
            <div className="business-detail-container">
              <InvoiceStepper status={selectedInvoice.status} />

              <div className="business-detail-grid">
                <div>
                  <small>Invoice ID</small>
                  <strong>{selectedInvoice.id}</strong>
                </div>
                <div>
                  <small>Tanggal Dibuat</small>
                  <strong>{formatDateTime(selectedInvoice.createdAt)}</strong>
                </div>
                <div>
                  <small>Status Transaksi</small>
                  <div>
                    <AdminStatusBadge status={selectedInvoice.status} />
                  </div>
                </div>
                <div>
                  <small>Total Nominal</small>
                  <strong className="text-orange">
                    {formatRupiah(selectedInvoice.amount)}
                  </strong>
                </div>
                <div>
                  <small>Nama Member</small>
                  <strong>{selectedInvoice.userName}</strong>
                </div>
                <div>
                  <small>Email</small>
                  <span>{selectedInvoice.userEmail}</span>
                </div>
                <div>
                  <small>Nomor WhatsApp</small>
                  <span>{selectedInvoice.userWhatsApp}</span>
                </div>
                <div>
                  <small>Program &amp; Paket</small>
                  <strong>
                    {selectedInvoice.programCode} •{" "}
                    {selectedInvoice.plan === "sensei"
                      ? "Belajar dengan Sensei"
                      : "Belajar Mandiri"}
                  </strong>
                </div>
                <div>
                  <small>Target JLPT</small>
                  <span>{selectedInvoice.targetJLPT || "-"}</span>
                </div>
                <div>
                  <small>Kode Referral</small>
                  <span>{selectedInvoice.referralCode || "-"}</span>
                </div>
                <div>
                  <small>Referensi Transfer</small>
                  <span>{selectedInvoice.transferReference || "-"}</span>
                </div>
                <div>
                  <small>Catatan Pembayaran</small>
                  <span>{selectedInvoice.paymentNote || "-"}</span>
                </div>
              </div>

              <div className="business-timeline-box">
                <h4>Riwayat Progres Invoice</h4>
                <ol className="business-timeline-list">
                  {selectedInvoice.timeline.map((item, idx) => (
                    <li key={idx}>
                      <div className="business-timeline-dot" />
                      <div className="business-timeline-content">
                        <div className="business-timeline-head">
                          <strong>{item.title}</strong>
                          <small>{formatDateTime(item.at)}</small>
                        </div>
                        {item.note && <p>{item.note}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="business-action-row">
                <a
                  className="button button-secondary"
                  href={getInvoiceWhatsAppUrl(
                    selectedInvoice,
                    store.settings
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Buka WhatsApp
                </a>

                {selectedInvoice.status === "Draft" && (
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                      updateInvoiceStatus(
                        selectedInvoice.id,
                        "Menunggu pembayaran",
                        "Invoice diterbitkan oleh admin"
                      );
                      showToast("Invoice berhasil diterbitkan");
                    }}
                  >
                    Terbitkan Invoice
                  </button>
                )}

                {selectedInvoice.status === "Menunggu pembayaran" && (
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                      updateInvoiceStatus(
                        selectedInvoice.id,
                        "Sudah bayar",
                        "Pembayaran ditandai selesai oleh admin"
                      );
                      showToast("Status diubah ke Sudah Bayar");
                    }}
                  >
                    Tandai Sudah Bayar
                  </button>
                )}

                {selectedInvoice.status === "Sudah bayar" && (
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                      updateInvoiceStatus(
                        selectedInvoice.id,
                        "Diverifikasi",
                        "Pembayaran diverifikasi oleh admin"
                      );
                      generateCommissionForInvoice(selectedInvoice.id);
                      showToast(
                        "Pembayaran diverifikasi! Komisi afiliasi tercatat."
                      );
                    }}
                  >
                    Verifikasi Pembayaran
                  </button>
                )}

                {selectedInvoice.status === "Diverifikasi" && (
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                      updateInvoiceStatus(
                        selectedInvoice.id,
                        "Aktif",
                        "Membership diaktifkan oleh admin"
                      );
                      activateUserMembershipForInvoice(selectedInvoice.id);
                      showToast("Membership siswa berhasil diaktifkan!");
                    }}
                  >
                    Aktifkan Membership
                  </button>
                )}

                {selectedInvoice.status === "Aktif" && (
                  <div className="business-active-badge">
                    ✓ Membership Siswa Aktif
                  </div>
                )}
              </div>
            </div>
          </AdminDialog>
        )}

        <AdminDialog
          open={waConfigOpen}
          close={() => setWaConfigOpen(false)}
          title="Pengaturan Notifikasi WhatsApp"
        >
          <form onSubmit={handleSaveWaSettings} className="business-form">
            <label className="admin-field">
              <span>Nomor WhatsApp Admin (Format 62xxx)</span>
              <input
                required
                value={waNumberDraft}
                onChange={(e) => setWaNumberDraft(e.target.value)}
                placeholder="6281234567890"
              />
            </label>

            <label className="admin-field">
              <span>Template Pesan Konfirmasi WhatsApp</span>
              <textarea
                required
                rows={6}
                value={waTemplateDraft}
                onChange={(e) => setWaTemplateDraft(e.target.value)}
              />
              <small className="text-muted">
                Variabel yang tersedia: &#123;invoice_id&#125;, &#123;name&#125;, &#123;program&#125;, &#123;plan&#125;, &#123;level&#125;, &#123;amount&#125;, &#123;target&#125;
              </small>
            </label>

            <div className="whatsapp-preview-section">
              <h5>Pratinjau Pesan WhatsApp</h5>
              <div className="whatsapp-preview-bubble">
                <p>{liveWaPreview}</p>
                <span className="whatsapp-preview-time">09:00</span>
              </div>
            </div>

            <div className="admin-dialog-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setWaConfigOpen(false)}
              >
                Tutup
              </button>
              <button type="submit" className="button button-primary">
                Simpan Pengaturan
              </button>
            </div>
          </form>
        </AdminDialog>
      </main>
    </AdminShell>
  );
}

function getUserAccessibleModules(membership: UserMembership, level?: string) {
  if (membership === "free") {
    return [
      { name: "Preview Bab 1 (Semua Level)", status: "unlocked", desc: "Akses bab 1 Dasar s/d N2" },
      { name: "Level Dasar Penuh", status: "locked", desc: "Terkunci" },
      { name: "Level N5", status: "locked", desc: "Terkunci" },
      { name: "Level N4", status: "locked", desc: "Terkunci" },
      { name: "Level N3", status: "locked", desc: "Terkunci" },
      { name: "Level N2", status: "locked", desc: "Terkunci" },
      { name: "Persiapan SSW", status: "locked", desc: "Terkunci" },
      { name: "Interview Kerja", status: "locked", desc: "Terkunci" },
      { name: "Sensei Live Class & Mentoring", status: "locked", desc: "Terkunci" },
    ];
  }

  const clean = (level || "Dasar").toUpperCase().trim();
  const isSensei = membership === "sensei";

  const isDasar = ["DASAR", "N5", "N4", "N3", "N2"].includes(clean);
  const isN5 = ["N5", "N4", "N3", "N2"].includes(clean);
  const isN4 = ["N4", "N3", "N2"].includes(clean);
  const isN3 = ["N3", "N2"].includes(clean);
  const isN2 = ["N2"].includes(clean);
  const isSSW = clean === "SSW";
  const isInterview = clean === "INTERVIEW";

  return [
    {
      name: "Level Dasar (Fondasi)",
      status: isDasar ? "unlocked" : "locked",
      desc: isDasar ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Level N5 (Pemula)",
      status: isN5 ? "unlocked" : "locked",
      desc: isN5 ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Level N4 (Dasar Lanjutan)",
      status: isN4 ? "unlocked" : "locked",
      desc: isN4 ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Level N3 (Menengah)",
      status: isN3 ? "unlocked" : "locked",
      desc: isN3 ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Level N2 (Mahir)",
      status: isN2 ? "unlocked" : "locked",
      desc: isN2 ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Persiapan Kerja SSW",
      status: isSSW ? "unlocked" : "locked",
      desc: isSSW ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Simulasi Interview Kerja",
      status: isInterview ? "unlocked" : "locked",
      desc: isInterview ? "Akses Penuh" : "Terkunci",
    },
    {
      name: "Sensei Live Class & Mentoring",
      status: isSensei ? "unlocked" : "locked",
      desc: isSensei ? "Akses Live & Diskusi" : "Terkunci (Khusus Sensei)",
    },
  ];
}

export function UserMembershipOperations() {
  const store = useBusinessAdminStore();
  const [search, setSearch] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "Semua">("Semua");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmToggleOpen, setConfirmToggleOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedUser = useMemo(() => {
    if (!selectedUserId) return null;
    return store.users.find((u) => u.id === selectedUserId) ?? null;
  }, [store.users, selectedUserId]);

  const [editForm, setEditForm] = useState<Partial<BusinessUser>>({});

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  const filteredUsers = useMemo(() => {
    return store.users.filter((user) => {
      const matchSearch =
        !search ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.whatsapp.includes(search);

      let matchMembership = true;
      if (membershipFilter === "Free Member") {
        matchMembership = user.membership === "free";
      } else if (membershipFilter === "Belajar Mandiri") {
        matchMembership = user.membership === "lms";
      } else if (membershipFilter === "Belajar dengan Sensei") {
        matchMembership = user.membership === "sensei";
      }

      const matchStatus = statusFilter === "Semua" || user.status === statusFilter;

      return matchSearch && matchMembership && matchStatus;
    });
  }, [store.users, search, membershipFilter, statusFilter]);

  const userInvoices = useMemo(() => {
    if (!selectedUser) return [];
    return store.invoices.filter(
      (inv) =>
        selectedUser.invoiceIds.includes(inv.id) ||
        (inv.userEmail &&
          inv.userEmail.toLowerCase() === selectedUser.email.toLowerCase()) ||
        (inv.userWhatsApp && inv.userWhatsApp === selectedUser.whatsapp)
    );
  }, [selectedUser, store.invoices]);

  const columns = [
    {
      key: "name",
      header: "Nama Siswa",
      cell: (user: BusinessUser) => <strong>{user.name}</strong>,
    },
    {
      key: "email",
      header: "Email",
      cell: (user: BusinessUser) => <span>{user.email}</span>,
    },
    {
      key: "whatsapp",
      header: "WhatsApp",
      cell: (user: BusinessUser) => <span>{user.whatsapp}</span>,
    },
    {
      key: "membership",
      header: "Membership",
      cell: (user: BusinessUser) => {
        const label =
          user.membership === "sensei"
            ? "Belajar dengan Sensei"
            : user.membership === "lms"
            ? "Belajar Mandiri"
            : "Free Member";
        return <span className="business-pill">{label}</span>;
      },
    },
    {
      key: "level",
      header: "Level / Program",
      cell: (user: BusinessUser) => (
        <span>{user.purchasedLevel || "-"}</span>
      ),
    },
    {
      key: "activeUntil",
      header: "Aktif Sampai",
      cell: (user: BusinessUser) => (
        <span>{formatDate(user.activeUntil)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (user: BusinessUser) => <AdminStatusBadge status={user.status} />,
    },
    {
      key: "action",
      header: "Aksi",
      cell: (user: BusinessUser) => (
        <button
          type="button"
          className="button button-secondary button-sm"
          onClick={() => setSelectedUserId(user.id)}
        >
          Detail
        </button>
      ),
    },
  ];

  return (
    <AdminShell current="/admin/pengguna-akses">
      <main className="admin-page business-operations-page">
        <AdminBreadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Pengguna & Akses" },
          ]}
        />

        <AdminPageHeader
          eyebrow="PANEL ADMIN • OPERASIONAL"
          title="Pengguna &amp; Akses Belajar"
          description="Kelola akun siswa, paket membership, perpanjangan akses belajar, dan modul materi."
        />

        {toastMessage && (
          <div className="business-toast" role="status">
            {toastMessage}
          </div>
        )}

        <AdminFilterToolbar>
          <div className="business-filter-row">
            <div className="admin-search-box">
              <span>🔍</span>
              <input
                type="search"
                placeholder="Cari nama, email, nomor WhatsApp..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Cari pengguna"
              />
            </div>

            <div className="business-filter-selects">
              <select
                className="admin-select"
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
                aria-label="Filter membership"
              >
                <option value="Semua">Semua Membership</option>
                <option value="Free Member">Free Member</option>
                <option value="Belajar Mandiri">Belajar Mandiri</option>
                <option value="Belajar dengan Sensei">
                  Belajar dengan Sensei
                </option>
              </select>

              <select
                className="admin-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as UserStatus | "Semua")
                }
                aria-label="Filter status pengguna"
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>
        </AdminFilterToolbar>

        <section className="business-table-section">
          <AdminDataTable
            caption="Daftar Pengguna dan Status Hak Akses"
            columns={columns}
            rows={filteredUsers}
            rowKey={(u) => u.id}
            empty={
              <AdminEmptyState
                title="Pengguna tidak ditemukan"
                description="Tidak ada pengguna yang cocok dengan kriteria pencarian."
              />
            }
          />
        </section>

        {selectedUser && (
          <AdminDialog
            open={Boolean(selectedUser)}
            close={() => setSelectedUserId(null)}
            title={`Profil Pengguna • ${selectedUser.name}`}
          >
            <div className="business-detail-container">
              <div className="business-section-block">
                <h4>Informasi Profil Siswa</h4>
                <div className="business-detail-grid">
                  <div>
                    <small>User ID</small>
                    <strong>{selectedUser.id}</strong>
                  </div>
                  <div>
                    <small>Nama Lengkap</small>
                    <strong>{selectedUser.name}</strong>
                  </div>
                  <div>
                    <small>Email</small>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div>
                    <small>WhatsApp</small>
                    <span>{selectedUser.whatsapp}</span>
                  </div>
                  <div>
                    <small>Target JLPT</small>
                    <span>{selectedUser.targetJLPT || "-"}</span>
                  </div>
                  <div>
                    <small>Negara Domisili</small>
                    <span>{selectedUser.country || "Indonesia"}</span>
                  </div>
                </div>
              </div>

              <div className="business-section-block">
                <h4>Paket &amp; Langganan Membership</h4>
                <div className="business-detail-grid">
                  <div>
                    <small>Jenis Membership</small>
                    <div>
                      <span className="business-pill">
                        {selectedUser.membership === "sensei"
                          ? "Belajar dengan Sensei"
                          : selectedUser.membership === "lms"
                          ? "Belajar Mandiri"
                          : "Free Member"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <small>Program Dibeli</small>
                    <strong>{selectedUser.purchasedLevel || "-"}</strong>
                  </div>
                  <div>
                    <small>Aktif Sejak</small>
                    <span>{formatDate(selectedUser.activeSince)}</span>
                  </div>
                  <div>
                    <small>Aktif Sampai</small>
                    <strong>{formatDate(selectedUser.activeUntil)}</strong>
                  </div>
                  <div>
                    <small>Status Akun</small>
                    <div>
                      <AdminStatusBadge status={selectedUser.status} />
                    </div>
                  </div>
                  <div>
                    <small>Kode Referral Pengundang</small>
                    <span>{selectedUser.referredByCode || "-"}</span>
                  </div>
                </div>
              </div>

              <div className="business-section-block">
                <h4>Hierarki Hak Akses Modul</h4>
                <div className="access-hierarchy-grid">
                  {getUserAccessibleModules(
                    selectedUser.membership,
                    selectedUser.purchasedLevel
                  ).map((mod, idx) => (
                    <div
                      key={idx}
                      className={`access-hierarchy-card ${
                        mod.status === "unlocked" ? "is-unlocked" : "is-locked"
                      }`}
                    >
                      <div className="access-hierarchy-icon">
                        {mod.status === "unlocked" ? "🔓" : "🔒"}
                      </div>
                      <div>
                        <strong>{mod.name}</strong>
                        <small>{mod.desc}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="business-section-block">
                <h4>Riwayat Invoice Siswa</h4>
                {userInvoices.length > 0 ? (
                  <div className="user-invoices-list">
                    {userInvoices.map((inv) => (
                      <div key={inv.id} className="user-invoice-item">
                        <div>
                          <strong>{inv.id}</strong>
                          <small>
                            {formatDate(inv.createdAt)} • Level {inv.programCode}{" "}
                            ({inv.plan})
                          </small>
                        </div>
                        <div className="user-invoice-right">
                          <span>{formatRupiah(inv.amount)}</span>
                          <AdminStatusBadge status={inv.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">
                    Belum ada riwayat transaksi invoice untuk siswa ini.
                  </p>
                )}
              </div>

              <div className="business-action-row">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    setEditForm({
                      name: selectedUser.name,
                      email: selectedUser.email,
                      whatsapp: selectedUser.whatsapp,
                      membership: selectedUser.membership,
                      purchasedLevel: selectedUser.purchasedLevel || "N5",
                      targetJLPT: selectedUser.targetJLPT || "",
                      country: selectedUser.country || "Indonesia",
                    });
                    setEditOpen(true);
                  }}
                >
                  Edit Membership
                </button>

                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    extendUserAccess(selectedUser.id, 6);
                    showToast("Akses berhasil diperpanjang +6 bulan!");
                  }}
                >
                  +6 Bulan
                </button>

                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    extendUserAccess(selectedUser.id, 12);
                    showToast("Akses berhasil diperpanjang +1 tahun!");
                  }}
                >
                  +1 Tahun
                </button>

                <button
                  type="button"
                  className={
                    selectedUser.status === "Aktif"
                      ? "button button-danger"
                      : "button button-primary"
                  }
                  onClick={() => setConfirmToggleOpen(true)}
                >
                  {selectedUser.status === "Aktif"
                    ? "Nonaktifkan Akun"
                    : "Aktifkan Kembali"}
                </button>
              </div>
            </div>
          </AdminDialog>
        )}

        {selectedUser && (
          <AdminDialog
            open={editOpen}
            close={() => setEditOpen(false)}
            title={`Edit Data Pengguna • ${selectedUser.name}`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(selectedUser.id, editForm);
                setEditOpen(false);
                showToast("Data pengguna berhasil diperbarui");
              }}
              className="business-form"
            >
              <div className="business-form-grid">
                <label className="admin-field">
                  <span>Nama Lengkap *</span>
                  <input
                    required
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                </label>

                <label className="admin-field">
                  <span>Alamat Email *</span>
                  <input
                    required
                    type="email"
                    value={editForm.email || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                </label>

                <label className="admin-field">
                  <span>Nomor WhatsApp *</span>
                  <input
                    required
                    value={editForm.whatsapp || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, whatsapp: e.target.value })
                    }
                  />
                </label>

                <label className="admin-field">
                  <span>Paket Membership</span>
                  <select
                    className="admin-select"
                    value={editForm.membership || "free"}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        membership: e.target.value as UserMembership,
                      })
                    }
                  >
                    <option value="free">Free Member</option>
                    <option value="lms">Belajar Mandiri (LMS)</option>
                    <option value="sensei">Belajar dengan Sensei</option>
                  </select>
                </label>

                <label className="admin-field">
                  <span>Level Program Terbuka</span>
                  <select
                    className="admin-select"
                    value={editForm.purchasedLevel || "Dasar"}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        purchasedLevel: e.target.value,
                      })
                    }
                  >
                    {PROGRAM_CODES.map((code) => (
                      <option key={code} value={code}>
                        Level {code}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="admin-field">
                  <span>Target JLPT</span>
                  <input
                    value={editForm.targetJLPT || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, targetJLPT: e.target.value })
                    }
                    placeholder="Mis. N4 Juli 2026"
                  />
                </label>

                <label className="admin-field">
                  <span>Negara Domisili</span>
                  <input
                    value={editForm.country || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, country: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className="admin-dialog-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setEditOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="button button-primary">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </AdminDialog>
        )}

        {selectedUser && (
          <AdminConfirmDialog
            open={confirmToggleOpen}
            close={() => setConfirmToggleOpen(false)}
            title={
              selectedUser.status === "Aktif"
                ? "Konfirmasi Penonaktifan Akun"
                : "Konfirmasi Pengaktifan Akun"
            }
            actions={
              <div className="admin-dialog-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setConfirmToggleOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className={
                    selectedUser.status === "Aktif"
                      ? "button button-danger"
                      : "button button-primary"
                  }
                  onClick={() => {
                    toggleUserStatus(selectedUser.id);
                    setConfirmToggleOpen(false);
                    showToast(
                      `Status akun ${selectedUser.name} berhasil diubah.`
                    );
                  }}
                >
                  Ya, Lanjutkan
                </button>
              </div>
            }
          >
            <p>
              {selectedUser.status === "Aktif"
                ? `Apakah Anda yakin ingin menonaktifkan akun ${selectedUser.name}? Pengguna tidak akan dapat mengakses konten belajar berbayar selama nonaktif.`
                : `Aktifkan kembali akun ${selectedUser.name}? Pengguna akan dapat mengakses kembali hak materi sesuai paketnya.`}
            </p>
          </AdminConfirmDialog>
        )}
      </main>
    </AdminShell>
  );
}

export function AffiliateOperations({
  initialTab = "Affiliate",
}: {
  initialTab?: string;
}) {
  const store = useBusinessAdminStore();
  const validInitialTab = initialTab === "Pencairan" ? "Pencairan" : "Affiliate";
  const [activeTab, setActiveTab] = useState(validInitialTab);

  const [searchAffiliate, setSearchAffiliate] = useState("");
  const [commissionStatusFilter, setCommissionStatusFilter] = useState<
    CommissionStatus | "Semua"
  >("Semua");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [addAffiliateOpen, setAddAffiliateOpen] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({
    name: "",
    code: "",
    status: "Aktif" as "Aktif" | "Nonaktif",
  });

  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string | null>(
    null
  );

  const [confirmPayoutId, setConfirmPayoutId] = useState<string | null>(null);
  const [newPayoutOpen, setNewPayoutOpen] = useState(false);
  const [payoutDraft, setPayoutDraft] = useState({
    affiliateId: store.affiliates[0]?.id || "",
    amount: 0,
    notes: "",
  });

  const [settingsDraft, setSettingsDraft] = useState<
    Pick<
      BusinessSettings,
      | "affiliateEnabled"
      | "commissionMode"
      | "commissionValue"
      | "validationPeriodDays"
    > | null
  >(null);

  const settingsForm = settingsDraft ?? {
    affiliateEnabled: store.settings.affiliateEnabled,
    commissionMode: store.settings.commissionMode,
    commissionValue: store.settings.commissionValue,
    validationPeriodDays: store.settings.validationPeriodDays,
  };

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  const selectedAffiliate = useMemo(() => {
    if (!selectedAffiliateId) return null;
    return store.affiliates.find((a) => a.id === selectedAffiliateId) ?? null;
  }, [store.affiliates, selectedAffiliateId]);

  const confirmPayout = useMemo(() => {
    if (!confirmPayoutId) return null;
    return store.payouts.find((p) => p.id === confirmPayoutId) ?? null;
  }, [store.payouts, confirmPayoutId]);

  const filteredAffiliates = useMemo(() => {
    return store.affiliates.filter(
      (a) =>
        !searchAffiliate ||
        a.name.toLowerCase().includes(searchAffiliate.toLowerCase()) ||
        a.code.toLowerCase().includes(searchAffiliate.toLowerCase()) ||
        a.id.toLowerCase().includes(searchAffiliate.toLowerCase())
    );
  }, [store.affiliates, searchAffiliate]);

  const filteredCommissions = useMemo(() => {
    return store.commissions.filter((c) => {
      if (commissionStatusFilter === "Semua") return true;
      return c.status === commissionStatusFilter;
    });
  }, [store.commissions, commissionStatusFilter]);

  function handleCopyCode(code: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      showToast(`Kode referral "${code}" disalin ke clipboard`);
    }
  }

  function handleAddAffiliate(e: React.FormEvent) {
    e.preventDefault();
    createAffiliate({
      name: newAffiliate.name,
      code: newAffiliate.code.toUpperCase().trim(),
      status: newAffiliate.status,
    });
    setAddAffiliateOpen(false);
    setNewAffiliate({ name: "", code: "", status: "Aktif" });
    showToast("Mitra afiliasi baru berhasil ditambahkan");
  }

  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    updateBusinessSettings(settingsForm);
    setSettingsDraft(null);
    showToast("Pengaturan program afiliasi berhasil disimpan");
  }

  function handleCreatePayoutSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPayout(
      payoutDraft.affiliateId,
      Number(payoutDraft.amount),
      payoutDraft.notes
    );
    setNewPayoutOpen(false);
    showToast("Pengajuan pencairan berhasil dibuat");
  }

  const affiliateColumns = [
    {
      key: "name",
      header: "Mitra Afiliasi",
      cell: (aff: AffiliateAccount) => (
        <div>
          <strong>{aff.name}</strong>
          <small className="block text-muted">{aff.id}</small>
        </div>
      ),
    },
    {
      key: "code",
      header: "Kode Referral",
      cell: (aff: AffiliateAccount) => (
        <div className="flex items-center gap-2">
          <code className="business-code-tag">{aff.code}</code>
          <button
            type="button"
            className="button-icon-copy"
            title="Salin kode"
            onClick={() => handleCopyCode(aff.code)}
          >
            📋
          </button>
        </div>
      ),
    },
    {
      key: "clicks",
      header: "Klik",
      cell: (aff: AffiliateAccount) => <span>{aff.clicks}</span>,
    },
    {
      key: "registrations",
      header: "Pendaftaran",
      cell: (aff: AffiliateAccount) => <span>{aff.registrations}</span>,
    },
    {
      key: "purchases",
      header: "Pembelian",
      cell: (aff: AffiliateAccount) => (
        <span className="font-semibold">{aff.purchases}</span>
      ),
    },
    {
      key: "totalCommission",
      header: "Total Komisi",
      cell: (aff: AffiliateAccount) => (
        <span>{formatRupiah(aff.totalCommission)}</span>
      ),
    },
    {
      key: "unpaidCommission",
      header: "Belum Dicairkan",
      cell: (aff: AffiliateAccount) => (
        <strong className="text-orange">
          {formatRupiah(aff.unpaidCommission)}
        </strong>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (aff: AffiliateAccount) => <AdminStatusBadge status={aff.status} />,
    },
    {
      key: "actions",
      header: "Aksi",
      cell: (aff: AffiliateAccount) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="button button-secondary button-sm"
            onClick={() => setSelectedAffiliateId(aff.id)}
          >
            Detail
          </button>
          <button
            type="button"
            className="button button-secondary button-sm"
            onClick={() => {
              toggleAffiliateStatus(aff.id);
              showToast(
                `Status ${aff.name} diubah ke ${
                  aff.status === "Aktif" ? "Nonaktif" : "Aktif"
                }`
              );
            }}
          >
            {aff.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
          </button>
        </div>
      ),
    },
  ];

  const commissionColumns = [
    {
      key: "invoiceId",
      header: "Invoice ID",
      cell: (c: Commission) => <strong>{c.invoiceId}</strong>,
    },
    {
      key: "buyer",
      header: "Pembeli",
      cell: (c: Commission) => {
        const inv = store.invoices.find((i) => i.id === c.invoiceId);
        return (
          <div>
            <strong>{inv?.userName || "Pembeli"}</strong>
            <small className="block text-muted">{inv?.userEmail || "-"}</small>
          </div>
        );
      },
    },
    {
      key: "program",
      header: "Program",
      cell: (c: Commission) => {
        const inv = store.invoices.find((i) => i.id === c.invoiceId);
        return <span>{inv?.programCode || "-"}</span>;
      },
    },
    {
      key: "affiliateCode",
      header: "Kode Affiliate",
      cell: (c: Commission) => (
        <code className="business-code-tag">{c.affiliateCode}</code>
      ),
    },
    {
      key: "amount",
      header: "Nominal Komisi",
      cell: (c: Commission) => (
        <strong className="text-orange">{formatRupiah(c.amount)}</strong>
      ),
    },
    {
      key: "status",
      header: "Status Komisi",
      cell: (c: Commission) => <AdminStatusBadge status={c.status} />,
    },
    {
      key: "date",
      header: "Tanggal",
      cell: (c: Commission) => (
        <span className="text-muted">{formatDate(c.createdAt)}</span>
      ),
    },
  ];

  const payoutColumns = [
    {
      key: "id",
      header: "Payout ID",
      cell: (p: Payout) => <strong>{p.id}</strong>,
    },
    {
      key: "affiliate",
      header: "Mitra Afiliasi",
      cell: (p: Payout) => <span>{p.affiliateName}</span>,
    },
    {
      key: "amount",
      header: "Nominal",
      cell: (p: Payout) => (
        <strong className="text-orange">{formatRupiah(p.amount)}</strong>
      ),
    },
    {
      key: "createdAt",
      header: "Tgl Pengajuan",
      cell: (p: Payout) => <span>{formatDate(p.createdAt)}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (p: Payout) => {
        const pStatus: PayoutStatus = p.status;
        return <AdminStatusBadge status={pStatus} />;
      },
    },
    {
      key: "paidAt",
      header: "Tanggal Bayar",
      cell: (p: Payout) => <span>{formatDate(p.paidAt)}</span>,
    },
    {
      key: "actions",
      header: "Aksi",
      cell: (p: Payout) => (
        <div className="flex items-center gap-2">
          {p.status !== "Sudah Dicairkan" ? (
            <button
              type="button"
              className="button button-primary button-sm"
              onClick={() => setConfirmPayoutId(p.id)}
            >
              Tandai Sudah Dicairkan
            </button>
          ) : (
            <span className="text-muted text-sm">✓ Selesai</span>
          )}
        </div>
      ),
    },
  ];

  const currentRoute =
    activeTab === "Pencairan"
      ? "/admin/pencairan-komisi"
      : "/admin/affiliate-komisi";

  return (
    <AdminShell current={currentRoute}>
      <main className="admin-page business-operations-page">
        <AdminBreadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            {
              label:
                activeTab === "Pencairan"
                  ? "Pencairan Komisi"
                  : "Affiliate & Komisi",
            },
          ]}
        />

        <AdminPageHeader
          eyebrow="PANEL ADMIN • TRANSAKSI"
          title={
            activeTab === "Pencairan"
              ? "Pencairan Komisi"
              : "Affiliate & Komisi"
          }
          description="Kelola mitra affiliasi, pencatatan komisi transaksi, pencairan dana, dan ketentuan bonus."
          actions={
            activeTab === "Affiliate" ? (
              <button
                type="button"
                className="button button-primary"
                onClick={() => setAddAffiliateOpen(true)}
              >
                + Tambah Affiliate
              </button>
            ) : activeTab === "Pencairan" ? (
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  const firstEligible = store.affiliates.find(
                    (a) => a.unpaidCommission > 0
                  );
                  setPayoutDraft({
                    affiliateId: firstEligible?.id || store.affiliates[0]?.id || "",
                    amount: firstEligible?.unpaidCommission || 100000,
                    notes: "",
                  });
                  setNewPayoutOpen(true);
                }}
              >
                + Pengajuan Pencairan
              </button>
            ) : undefined
          }
        />

        {toastMessage && (
          <div className="business-toast" role="status">
            {toastMessage}
          </div>
        )}

        <AdminTabs
          tabs={["Affiliate", "Pembelian & Komisi", "Pencairan", "Pengaturan"]}
          active={activeTab}
          onChange={setActiveTab}
          label="Menu Afiliasi"
        >
          {activeTab === "Affiliate" && (
            <section className="business-tab-panel">
              <AdminFilterToolbar>
                <div className="admin-search-box">
                  <span>🔍</span>
                  <input
                    type="search"
                    placeholder="Cari nama mitra atau kode referral..."
                    value={searchAffiliate}
                    onChange={(e) => setSearchAffiliate(e.target.value)}
                    aria-label="Cari affiliate"
                  />
                </div>
              </AdminFilterToolbar>

              <AdminDataTable
                caption="Daftar Mitra Afiliasi Aktif dan Performa"
                columns={affiliateColumns}
                rows={filteredAffiliates}
                rowKey={(a) => a.id}
                empty={
                  <AdminEmptyState
                    title="Belum ada mitra"
                    description="Belum ada data mitra afiliasi yang terdaftar."
                  />
                }
              />
            </section>
          )}

          {activeTab === "Pembelian & Komisi" && (
            <section className="business-tab-panel">
              <AdminFilterToolbar>
                <div className="business-filter-row">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Filter Status:</span>
                    <select
                      className="admin-select"
                      value={commissionStatusFilter}
                      onChange={(e) =>
                        setCommissionStatusFilter(
                          e.target.value as CommissionStatus | "Semua"
                        )
                      }
                      aria-label="Filter status komisi"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Menunggu Validasi">Menunggu Validasi</option>
                      <option value="Tersedia">Tersedia</option>
                      <option value="Sudah Dicairkan">Sudah Dicairkan</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>
              </AdminFilterToolbar>

              <AdminDataTable
                caption="Daftar Komisi dari Pembelian Siswa"
                columns={commissionColumns}
                rows={filteredCommissions}
                rowKey={(c) => c.id}
                empty={
                  <AdminEmptyState
                    title="Belum ada komisi"
                    description="Belum ada data komisi tercatat."
                  />
                }
              />
            </section>
          )}

          {activeTab === "Pencairan" && (
            <section className="business-tab-panel">
              <AdminDataTable
                caption="Daftar Riwayat dan Permohonan Pencairan Dana Komisi"
                columns={payoutColumns}
                rows={store.payouts}
                rowKey={(p) => p.id}
                empty={
                  <AdminEmptyState
                    title="Belum ada pencairan"
                    description="Belum ada data pengajuan pencairan komisi."
                  />
                }
              />
            </section>
          )}

          {activeTab === "Pengaturan" && (
            <section className="business-tab-panel">
              <form onSubmit={handleSaveSettings} className="business-settings-form">
                <div className="business-form-grid">
                  <label className="admin-field checkbox">
                    <input
                      type="checkbox"
                      checked={settingsForm.affiliateEnabled}
                      onChange={(e) =>
                        setSettingsDraft({
                          ...settingsForm,
                          affiliateEnabled: e.target.checked,
                        })
                      }
                    />
                    <span>Aktifkan Sistem Program Afiliasi</span>
                  </label>

                  <label className="admin-field">
                    <span>Skema Perhitungan Komisi</span>
                    <select
                      className="admin-select"
                      value={settingsForm.commissionMode}
                      onChange={(e) =>
                        setSettingsDraft({
                          ...settingsForm,
                          commissionMode: e.target.value as
                            | "Percentage"
                            | "Nominal",
                        })
                      }
                    >
                      <option value="Percentage">Persentase (%)</option>
                      <option value="Nominal">Nominal Tetap (Rp)</option>
                    </select>
                  </label>

                  <label className="admin-field">
                    <span>
                      Nilai Komisi{" "}
                      {settingsForm.commissionMode === "Percentage"
                        ? "(%)"
                        : "(Rp)"}
                    </span>
                    <input
                      required
                      type="number"
                      min="0"
                      value={settingsForm.commissionValue}
                      onChange={(e) =>
                        setSettingsDraft({
                          ...settingsForm,
                          commissionValue: Number(e.target.value),
                        })
                      }
                    />
                  </label>

                  <label className="admin-field">
                    <span>Masa Tunggu Validasi Komisi (Hari)</span>
                    <input
                      required
                      type="number"
                      min="0"
                      value={settingsForm.validationPeriodDays}
                      onChange={(e) =>
                        setSettingsDraft({
                          ...settingsForm,
                          validationPeriodDays: Number(e.target.value),
                        })
                      }
                    />
                    <small className="text-muted">
                      Komisi otomatis berstatus &quot;Tersedia&quot; setelah masa tunggu
                      validasi berakhir sejak tanggal verifikasi pembayaran.
                    </small>
                  </label>
                </div>

                <div className="admin-dialog-actions mt-4">
                  <button type="submit" className="button button-primary">
                    Simpan Pengaturan
                  </button>
                </div>
              </form>
            </section>
          )}
        </AdminTabs>

        <AdminDialog
          open={addAffiliateOpen}
          close={() => setAddAffiliateOpen(false)}
          title="Tambah Mitra Afiliasi Baru"
        >
          <form onSubmit={handleAddAffiliate} className="business-form">
            <div className="business-form-grid">
              <label className="admin-field">
                <span>Nama Mitra Lengkap *</span>
                <input
                  required
                  value={newAffiliate.name}
                  onChange={(e) =>
                    setNewAffiliate({ ...newAffiliate, name: e.target.value })
                  }
                  placeholder="Mis. Bambang Pamungkas"
                />
              </label>

              <label className="admin-field">
                <span>Kode Referral Unik *</span>
                <input
                  required
                  value={newAffiliate.code}
                  onChange={(e) =>
                    setNewAffiliate({ ...newAffiliate, code: e.target.value })
                  }
                  placeholder="Mis. HIRU-BAMBANG"
                />
              </label>

              <label className="admin-field">
                <span>Status Awal</span>
                <select
                  className="admin-select"
                  value={newAffiliate.status}
                  onChange={(e) =>
                    setNewAffiliate({
                      ...newAffiliate,
                      status: e.target.value as "Aktif" | "Nonaktif",
                    })
                  }
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </label>
            </div>

            <div className="admin-dialog-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setAddAffiliateOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="button button-primary">
                Daftarkan Mitra
              </button>
            </div>
          </form>
        </AdminDialog>

        {selectedAffiliate && (
          <AdminDialog
            open={Boolean(selectedAffiliate)}
            close={() => setSelectedAffiliateId(null)}
            title={`Performa Afiliasi • ${selectedAffiliate.name}`}
          >
            <div className="business-detail-container">
              <div className="business-detail-grid">
                <div>
                  <small>ID Mitra</small>
                  <strong>{selectedAffiliate.id}</strong>
                </div>
                <div>
                  <small>Kode Referral</small>
                  <div className="flex items-center gap-2">
                    <code className="business-code-tag">
                      {selectedAffiliate.code}
                    </code>
                    <button
                      type="button"
                      className="button-icon-copy"
                      onClick={() => handleCopyCode(selectedAffiliate.code)}
                    >
                      📋
                    </button>
                  </div>
                </div>
                <div>
                  <small>Status Mitra</small>
                  <div>
                    <AdminStatusBadge status={selectedAffiliate.status} />
                  </div>
                </div>
                <div>
                  <small>Total Klik Tautan</small>
                  <strong>{selectedAffiliate.clicks}</strong>
                </div>
                <div>
                  <small>Total Pendaftaran</small>
                  <strong>{selectedAffiliate.registrations}</strong>
                </div>
                <div>
                  <small>Total Transaksi Pembelian</small>
                  <strong>{selectedAffiliate.purchases}</strong>
                </div>
                <div>
                  <small>Total Akumulasi Komisi</small>
                  <strong>
                    {formatRupiah(selectedAffiliate.totalCommission)}
                  </strong>
                </div>
                <div>
                  <small>Komisi Belum Dicairkan</small>
                  <strong className="text-orange">
                    {formatRupiah(selectedAffiliate.unpaidCommission)}
                  </strong>
                </div>
                <div>
                  <small>Komisi Sudah Dicairkan</small>
                  <strong className="text-green">
                    {formatRupiah(selectedAffiliate.paidCommission)}
                  </strong>
                </div>
              </div>

              <div className="business-section-block mt-4">
                <h4>Riwayat Komisi Mitra Ini</h4>
                {store.commissions.filter(
                  (c) => c.affiliateId === selectedAffiliate.id
                ).length > 0 ? (
                  <div className="user-invoices-list">
                    {store.commissions
                      .filter((c) => c.affiliateId === selectedAffiliate.id)
                      .map((c) => (
                        <div key={c.id} className="user-invoice-item">
                          <div>
                            <strong>{c.id}</strong>
                            <small>
                              {formatDate(c.createdAt)} • Invoice {c.invoiceId}
                            </small>
                          </div>
                          <div className="user-invoice-right">
                            <strong>{formatRupiah(c.amount)}</strong>
                            <AdminStatusBadge status={c.status} />
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted">
                    Belum ada riwayat transaksi komisi dari kode mitra ini.
                  </p>
                )}
              </div>

              <div className="admin-dialog-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setSelectedAffiliateId(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </AdminDialog>
        )}

        <AdminDialog
          open={newPayoutOpen}
          close={() => setNewPayoutOpen(false)}
          title="Buat Pengajuan Pencairan Komisi"
        >
          <form onSubmit={handleCreatePayoutSubmit} className="business-form">
            <div className="business-form-grid">
              <label className="admin-field">
                <span>Pilih Mitra Afiliasi *</span>
                <select
                  className="admin-select"
                  value={payoutDraft.affiliateId}
                  onChange={(e) => {
                    const affId = e.target.value;
                    const aff = store.affiliates.find((a) => a.id === affId);
                    setPayoutDraft({
                      ...payoutDraft,
                      affiliateId: affId,
                      amount: aff?.unpaidCommission || 0,
                    });
                  }}
                >
                  {store.affiliates.map((aff) => (
                    <option key={aff.id} value={aff.id}>
                      {aff.name} ({aff.code}) - Saldo:{" "}
                      {formatRupiah(aff.unpaidCommission)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="admin-field">
                <span>Nominal Pencairan (Rp) *</span>
                <input
                  required
                  type="number"
                  min="10000"
                  value={payoutDraft.amount}
                  onChange={(e) =>
                    setPayoutDraft({
                      ...payoutDraft,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label className="admin-field">
                <span>Catatan / Rekening Tujuan</span>
                <input
                  value={payoutDraft.notes}
                  onChange={(e) =>
                    setPayoutDraft({ ...payoutDraft, notes: e.target.value })
                  }
                  placeholder="Mis. Transfer ke BCA 1234567890 a.n. Mitra"
                />
              </label>
            </div>

            <div className="admin-dialog-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setNewPayoutOpen(false)}
              >
                Batal
              </button>
              <button type="submit" className="button button-primary">
                Simpan Pengajuan
              </button>
            </div>
          </form>
        </AdminDialog>

        {confirmPayout && (
          <AdminConfirmDialog
            open={Boolean(confirmPayout)}
            close={() => setConfirmPayoutId(null)}
            title="Konfirmasi Pencairan Dana Komisi"
            actions={
              <div className="admin-dialog-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setConfirmPayoutId(null)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => {
                    markPayoutPaid(confirmPayout.id);
                    setConfirmPayoutId(null);
                    showToast(
                      `Pencairan ${confirmPayout.id} berhasil ditandai selesai!`
                    );
                  }}
                >
                  Ya, Tandai Sudah Dicairkan
                </button>
              </div>
            }
          >
            <p>
              Konfirmasi bahwa pencairan sebesar{" "}
              <strong>{formatRupiah(confirmPayout.amount)}</strong> untuk mitra{" "}
              <strong>{confirmPayout.affiliateName}</strong> telah berhasil ditransfer.
            </p>
            <p className="text-sm text-muted mt-2">
              Tindakan ini bersifat idempoten: saldo komisi yang belum dicairkan
              akan dikurangi dan status komisi terkait diperbarui menjadi Sudah
              Dicairkan.
            </p>
          </AdminConfirmDialog>
        )}
      </main>
    </AdminShell>
  );
}
