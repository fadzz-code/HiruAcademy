"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

type Child = { label: string; href: string };
type Item = { label: string; href?: string; current: string; children?: Child[] };

const items: Item[] = [
  { label: "Dashboard", href: "/admin", current: "dashboard" },
  { label: "Program", href: "/admin/program", current: "program" },
  { label: "Content Builder", current: "content", children: [
    { label: "Chapter Builder", href: "/admin/program/n4/chapters" },
    { label: "Quiz Builder", href: "/admin/program/n4/chapters/chapter-4/quiz" },
    { label: "Try Out Builder", href: "/admin/program/n4/tryout" },
    { label: "Mini Checkpoint", href: "/admin/mini-checkpoint" },
    { label: "Content Library", href: "/admin/content-library" },
  ] },
  { label: "Placement & Hasil", current: "placement", children: [
    { label: "Placement Test", href: "/admin/placement" },
    { label: "Assessment Results", href: "/admin/assessment-results" },
  ] },
  { label: "Pengguna & Akses", current: "users", children: [
    { label: "User Management", href: "/admin/users" },
    { label: "Access Settings", href: "/admin/access-settings" },
    { label: "Certificate Management", href: "/admin/certificates" },
  ] },
  { label: "Transaksi", current: "transaction", children: [
    { label: "Invoice Management", href: "/admin/invoices" },
    { label: "Referral & Diskon", href: "/admin/referrals" },
  ] },
  { label: "Konten & Komunikasi", current: "communication" },
  { label: "Sensei & Cohort", current: "sensei" },
  { label: "Analitik", current: "analytics" },
  { label: "Pengaturan", current: "settings" },
];

function Chevron({ open }: { open: boolean }) {
  return <svg className={open ? "open" : ""} viewBox="0 0 20 20" aria-hidden="true"><path d="m6 8 4 4 4-4" /></svg>;
}

export function AdminNavigation({ current }: { current: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string,string | undefined>>({});

  function groupOpen(item: Item) {
    const manual = expanded[item.current];
    return manual === undefined ? item.children?.some((child) => child.href === pathname) ?? false : manual === "open";
  }

  return <>
    <button className="admin-mobile-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle admin navigation"><span aria-hidden="true">≡</span></button>
    <aside className={`admin-sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="admin-brand"><BrandLogo /><p>ADMIN CONSOLE</p></div>
      <nav aria-label="Navigasi admin">{items.map((item) => {
        if (item.children) {
          const open = groupOpen(item);
          return <div className="admin-nav-group" key={item.current}><button className={current === item.current ? "admin-nav-parent current" : "admin-nav-parent"} type="button" aria-expanded={open} onClick={() => setExpanded((state) => ({ ...state, [item.current]: open ? "closed" : "open" }))}><span>{item.label}</span><Chevron open={open}/></button>{open && <div className="admin-submenu">{item.children.map((child) => <Link className={pathname === child.href ? "active" : ""} href={child.href} onClick={() => setMobileOpen(false)} key={child.href}>{child.label}</Link>)}</div>}</div>;
        }
        return item.href ? <Link key={item.current} href={item.href} className={`admin-nav-item ${current === item.current ? "active" : ""}`} onClick={() => setMobileOpen(false)}>{item.label}</Link> : <span key={item.current} className="admin-nav-item disabled" aria-disabled="true">{item.label}</span>;
      })}</nav>
      <div className="admin-nav-footer"><Link href="/" className="admin-nav-item logout">Keluar Admin</Link></div>
    </aside>
    {mobileOpen && <button className="admin-mobile-backdrop" type="button" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi admin"/>}
  </>;
}
