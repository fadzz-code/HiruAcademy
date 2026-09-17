"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { AdminActivityList, AdminBreadcrumb, AdminMetricCard, AdminPageHeader, AdminSection } from "@/components/admin-primitives";
import { readAssessments } from "@/lib/admin-assessment-store";
import { readCurriculumStore } from "@/lib/admin-curriculum-store";
import { readWebsiteStore } from "@/lib/admin-website-store";
import { useBusinessAdminStore, type Invoice, type Payout, type BusinessActivity } from "@/lib/admin-business-store";

const quickActions = [
  { label: "Tinjau Invoice", href: "/admin/invoice", detail: "Periksa pembayaran yang menunggu." },
  { label: "Kelola Pengguna", href: "/admin/pengguna-akses", detail: "Buka data pengguna dan akses." },
  { label: "Kelola Materi", href: "/admin/kurikulum-materi", detail: "Buka kurikulum dan materi belajar." },
  { label: "Kelola Artikel", href: "/admin/blog-seo", detail: "Buka artikel dan publikasi." },
  { label: "Tinjau Pencairan", href: "/admin/pencairan-komisi", detail: "Periksa pencairan yang menunggu." },
] as const;

function useDraftItems(): number {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("hiru:assessments-change", callback);
      window.addEventListener("hiru:curriculum-change", callback);
      window.addEventListener("hiru:website-change", callback);
      window.addEventListener("storage", callback);
      return () => {
        window.removeEventListener("hiru:assessments-change", callback);
        window.removeEventListener("hiru:curriculum-change", callback);
        window.removeEventListener("hiru:website-change", callback);
        window.removeEventListener("storage", callback);
      };
    },
    () => {
      const draftAssessments = readAssessments().filter((a) => a.status === "Draft").length;
      const draftChapters = readCurriculumStore().chapters.filter((c) => c.status === "Draft").length;
      const draftArticles = readWebsiteStore().blogs.filter((b) => b.status === "Draft").length;
      return draftAssessments + draftChapters + draftArticles;
    },
    () => 0
  );
}

export default function AdminDashboardPage() {
  const bizStore = useBusinessAdminStore();
  const pendingInvoices = bizStore.invoices.filter((item: Invoice) => ["Menunggu pembayaran", "Sudah bayar", "Menunggu", "Pending"].includes(item.status)).length;
  const pendingPayouts = bizStore.payouts.filter((item: Payout) => ["Menunggu", "Diproses", "Pending"].includes(item.status)).length;
  const draftItems = useDraftItems();

  const activity = bizStore.activities.slice(0, 5).map((a: BusinessActivity) => ({ id: a.id, title: a.title, detail: a.detail, status: a.status }));
  return <AdminShell current="/admin"><main className="admin-page admin-dashboard"><AdminBreadcrumb items={[{ label: "Admin" }, { label: "Dashboard" }]}/><AdminPageHeader eyebrow="PANEL ADMIN • RINGKASAN" title="Dashboard Admin" description="Kelola kegiatan utama dalam satu ruang kerja."/><div className="admin-dashboard-bento"><AdminSection className="admin-welcome-card" title="Selamat datang" description="Pilih pekerjaan utama atau tinjau antrean dari data demo tersimpan."><div className="admin-quick-actions">{quickActions.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.detail}</span></Link>)}</div></AdminSection><section className="admin-dashboard-metrics" aria-label="Ringkasan operasional"><AdminMetricCard label="Invoice menunggu" value={pendingInvoices}/><AdminMetricCard label="Pencairan menunggu" value={pendingPayouts}/><AdminMetricCard label="Item draf" value={draftItems}/></section><AdminSection className="admin-dashboard-activity" title="Aktivitas demo" description="Ringkasan terkurasi dari invoice, pencairan, dan item demo; bukan audit log resmi."><AdminActivityList items={activity}/></AdminSection></div></main></AdminShell>;
}
