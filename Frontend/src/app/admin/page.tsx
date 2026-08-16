import { AdminShell } from "@/components/admin-shell";
import Link from "next/link";

export default function AdminDashboardPage() {
  const kpis = [
    { label: "Total Pengguna", value: "—", meta: "Data real-time dari backend" },
    { label: "Membership Aktif", value: "—", meta: "Berdasarkan entitlement aktif" },
    { label: "Invoice Menunggu", value: "—", meta: "Perlu verifikasi admin" },
    { label: "Insight Bisnis", value: "Live", meta: "Dari transaksi terverifikasi" },
  ];

  const quickActions = [
    { title: "Pengelolaan Program", action: "Kelola Produk", href: "/admin/program" },
    { title: "Builder Konten", action: "Buat Materi" },
    { title: "Invoice Management", action: "Verifikasi" },
  ];

  const queues = [
    { type: "Placement", title: "Placement Lead", meta: "12 antrean", status: "Perlu Review", href: "/admin/placement" },
    { type: "Mini Checkpoint", title: "Sesi N4 Aktif", meta: "5 submit terbaru", status: "Review Sensei", href: "/admin/mini-checkpoint" },
  ];

  const placements = [
    { name: "Dimas", wa: "0812-•••-111", result: "N4", date: "Hari ini", status: "Selesai" },
    { name: "Rina", wa: "0812-•••-222", result: "Pending", date: "Hari ini", status: "Menunggu" },
    { name: "Budi", wa: "0812-•••-333", result: "N5", date: "Kemarin", status: "Selesai" },
  ];

  return (
    <AdminShell current="dashboard">
      <main className="admin-page">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">ADMIN • OPERATIONS OVERVIEW</p>
            <h1>Dashboard Admin</h1>
            <p>Configure, publish, operate, review, dan report dalam satu workspace.</p>
          </div>
          <div className="admin-header-actions">
            <label className="admin-search-box">
              <span aria-hidden="true">⌕</span>
              <input placeholder="Cari user, invoice, atau konten" />
            </label>
            <Link className="button button-primary" href="/admin/program">Buat Program</Link>
          </div>
        </header>

        <section className="admin-kpi-grid">
          {kpis.map((kpi) => (
            <article key={kpi.label} className="admin-kpi-card">
              <h2>{kpi.label}</h2>
              <strong>{kpi.value}</strong>
              <small>{kpi.meta}</small>
            </article>
          ))}
        </section>

        <div className="admin-dashboard-layout">
          <div className="admin-main-col">
            <section className="admin-section">
              <h2>Aksi Cepat</h2>
              <div className="admin-quick-actions">
                {quickActions.map((action) => (
                  <article key={action.title} className="admin-action-card">
                    <h3>{action.title}</h3>
                    {action.href ? (
                      <Link className="button button-dark" href={action.href}>{action.action}</Link>
                    ) : (
                      <span className="button button-secondary disabled" aria-disabled="true">{action.action}</span>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="admin-section">
              <div className="admin-section-link"><h2>REKAP PLACEMENT TERBARU</h2><Link href="/admin/placement">Buka Placement Leads</Link></div>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>WhatsApp</th>
                      <th>Target / Hasil</th>
                      <th>Tanggal Pengerjaan</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placements.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.name}</strong></td>
                        <td>{item.wa}</td>
                        <td>{item.result}</td>
                        <td>{item.date}</td>
                        <td><span className={`admin-status status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="admin-side-col">
            <section className="admin-section">
              <h2>Antrean operasional</h2>
              <div className="admin-queue-list">
                {queues.map((item) => (
                  <article key={item.title} className="admin-queue-card">
                    <small>{item.type}</small>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <span className="admin-status status-pending">{item.status}</span>
                    <Link href={item.href}>Buka Modul</Link>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </AdminShell>
  );
}
