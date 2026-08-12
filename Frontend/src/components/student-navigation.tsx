"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Membership } from "@/lib/dashboard-mock";

type CurrentArea = "dashboard" | "journey" | "learning";
type NavState = "active" | "available" | "limited" | "locked";
type NavItem = { label: string; glyph: string; href?: string; state: NavState };

function itemsFor(membership: Membership, current: CurrentArea): NavItem[] {
  const free = membership === "free";
  return [
    { label: "Dashboard", glyph: "⌂", href: `/dashboard?membership=${membership}`, state: current === "dashboard" ? "active" : "available" },
    { label: "Journey", glyph: "道", href: `/journey?membership=${membership}`, state: current === "journey" || current === "learning" ? "active" : "available" },
    { label: "Perpustakaan", glyph: "冊", state: free ? "limited" : "available" },
    { label: "Latihan", glyph: "練", state: free ? "limited" : "available" },
    { label: "Try Out", glyph: "試", state: free ? "locked" : "available", href: free ? undefined : `/tryout?membership=${membership}` },
    { label: "Community", glyph: "話", state: free ? "limited" : "available" },
    { label: "Leaderboard", glyph: "↗", state: free ? "locked" : "available" },
    { label: "Achievement", glyph: "✦", state: free ? "locked" : "available" },
    { label: "Jadwal", glyph: "予", state: membership === "sensei" ? "available" : "locked" },
    { label: "Replay", glyph: "▶", state: membership === "sensei" ? "available" : "locked" },
    { label: "Tanya Sensei", glyph: "先", state: membership === "sensei" ? "available" : "locked" },
    { label: "Mini Checkpoint", glyph: "問", state: membership === "sensei" ? "available" : "locked" },
  ];
}

export function StudentNavigation({ membership, current }: { membership: Membership; current: CurrentArea }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lockedFeature, setLockedFeature] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  function openLocked(feature: string, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setFeedback(feature);
    setLockedFeature(feature);
    window.setTimeout(() => setFeedback(null), 280);
  }

  function closeModal() {
    setLockedFeature(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!lockedFeature) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button,[href]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lockedFeature]);

  const items = itemsFor(membership, current);
  const navigation = (
    <>
      <Link className="student-nav-brand" href="/"><span aria-hidden="true">日</span><strong>HIRU <b>Academy</b></strong></Link>
      <nav aria-label="Navigasi siswa">{items.map((item) => item.href ? <Link className={`student-nav-item state-${item.state}`} href={item.href} onClick={() => setMobileOpen(false)} key={item.label}><span aria-hidden="true">{item.glyph}</span>{item.label}{item.state === "limited" && <small>Terbatas</small>}</Link> : <button className={`student-nav-item state-${item.state}${feedback === item.label ? " locked-feedback" : ""}`} type="button" onClick={(event) => openLocked(item.label, event.currentTarget)} key={item.label}><span aria-hidden="true">{item.glyph}</span>{item.label}<i aria-hidden="true">⌑</i></button>)}</nav>
      <div className="student-nav-bottom"><span>{membership === "free" ? "Free Member" : membership === "lms" ? "Belajar Mandiri" : "Belajar dengan Sensei"}</span><Link href="/">Kembali ke beranda</Link></div>
    </>
  );

  return (
    <>
      <aside className="student-nav-desktop">{navigation}</aside>
      <button className="student-mobile-trigger" type="button" onClick={() => setMobileOpen(true)} aria-label="Buka navigasi" aria-expanded={mobileOpen}>☰</button>
      {mobileOpen && <div className="student-mobile-nav"><button className="student-mobile-backdrop" type="button" aria-label="Tutup navigasi" onClick={() => setMobileOpen(false)} /><aside><button className="student-mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi">×</button>{navigation}</aside></div>}
      {lockedFeature && <div className="locked-modal"><button className="locked-modal-backdrop" type="button" aria-label="Tutup" onClick={closeModal} /><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="locked-title"><button ref={closeRef} className="locked-modal-close" type="button" onClick={closeModal} aria-label="Tutup">×</button><span className="locked-modal-icon" aria-hidden="true">⌑</span><p>{lockedFeature}</p><h2 id="locked-title">Akses Terkunci</h2><div className="locked-modal-actions"><button type="button" onClick={closeModal}>Batal</button><Link href="/#program">Upgrade</Link></div></section></div>}
    </>
  );
}
