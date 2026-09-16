"use client";

import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { AdminActivityList, AdminBreadcrumb, AdminMetricCard, AdminPageHeader, AdminSection } from "@/components/admin-primitives";
import { useAdminStore } from "@/lib/admin-demo-store";

const quickActions = [
  { label: "Tinjau Invoice", href: "/admin/invoice", detail: "Periksa pembayaran yang menunggu." },
  { label: "Kelola Pengguna", href: "/admin/pengguna-akses", detail: "Buka data pengguna dan akses." },
  { label: "Kelola Materi", href: "/admin/kurikulum-materi", detail: "Buka kurikulum dan materi belajar." },
  { label: "Kelola Artikel", href: "/admin/blog-seo", detail: "Buka artikel dan publikasi." },
  { label: "Tinjau Pencairan", href: "/admin/pencairan-komisi", detail: "Periksa pencairan yang menunggu." },
] as const;

export default function AdminDashboardPage() {
  const { store, ready } = useAdminStore();
  const pendingInvoices = store.invoices.filter((item) => ["Menunggu", "Pending"].includes(item.status)).length;
  const pendingPayouts = store.payouts.filter((item) => ["Menunggu", "Pending", "Diproses"].includes(item.status)).length;
  const draftItems = Object.values(store.items).flat().filter((item) => ["Draf", "Draft"].includes(item.status)).length;
  const activity = [...store.invoices.map((item) => ({ ...item, id: `invoice-${item.id}`, title: `Invoice ${item.id}` })), ...store.payouts.map((item) => ({ ...item, id: `payout-${item.id}`, title: `Pencairan ${item.id}` })), ...Object.entries(store.items).flatMap(([route, items]) => items.map((item) => ({ ...item, id: `${route}-${item.id}` })))].slice(0, 5);
  return <AdminShell current="/admin"><main className="admin-page admin-dashboard"><AdminBreadcrumb items={[{ label: "Admin" }, { label: "Dashboard" }]}/><AdminPageHeader eyebrow="PANEL ADMIN • RINGKASAN" title="Dashboard Admin" description="Kelola kegiatan utama dalam satu ruang kerja."/><div className="admin-dashboard-bento"><AdminSection className="admin-welcome-card" title="Selamat datang" description="Pilih pekerjaan utama atau tinjau antrean dari data demo tersimpan."><div className="admin-quick-actions">{quickActions.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.detail}</span></Link>)}</div></AdminSection><section className="admin-dashboard-metrics" aria-label="Ringkasan operasional" aria-busy={!ready}>{ready ? <><AdminMetricCard label="Invoice menunggu" value={pendingInvoices}/><AdminMetricCard label="Pencairan menunggu" value={pendingPayouts}/><AdminMetricCard label="Item draf" value={draftItems}/></> : <span role="status">Memuat ringkasan…</span>}</section><AdminSection className="admin-dashboard-activity" title="Aktivitas demo" description="Ringkasan terkurasi dari invoice, pencairan, dan item demo; bukan audit log resmi."><AdminActivityList items={activity}/></AdminSection></div></main></AdminShell>;
}
