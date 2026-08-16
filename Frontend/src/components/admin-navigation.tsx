"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const items = [
  { label: "Dashboard", href: "/admin", current: "dashboard" },
  { label: "Program", href: "/admin/program", current: "program" },
  { label: "Content Builder", href: "/admin/program/n4/chapters", current: "content" },
  { label: "Placement & Hasil", href: "/admin/placement", current: "placement" },
  { label: "Pengguna & Akses", current: "users" },
  { label: "Transaksi", current: "transaction" },
  { label: "Konten & Komunikasi", current: "communication" },
  { label: "Sensei & Cohort", current: "sensei" },
  { label: "Analitik", current: "analytics" },
  { label: "Pengaturan", current: "settings" },
];

export function AdminNavigation({ current }: { current: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button 
        className="admin-mobile-toggle" 
        type="button" 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
        aria-label="Toggle admin navigation"
      >
        <span aria-hidden="true">≡</span>
      </button>
      
      <aside className={`admin-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <BrandLogo />
          <p>ADMIN CONSOLE</p>
        </div>
        
        <nav aria-label="Navigasi admin">
          {items.map((item) => (
            item.href ? (
              <Link 
                key={item.current}
                href={item.href}
                className={`admin-nav-item ${current === item.current ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                key={item.current}
                className="admin-nav-item disabled"
                aria-disabled="true"
              >
                {item.label}
              </span>
            )
          ))}
        </nav>
        
        <div className="admin-nav-footer">
          <Link href="/" className="admin-nav-item logout">Keluar Admin</Link>
        </div>
      </aside>
      
      {mobileOpen && (
        <button 
          className="admin-mobile-backdrop" 
          type="button" 
          onClick={() => setMobileOpen(false)}
          aria-label="Tutup navigasi admin"
        />
      )}
    </>
  );
}
