"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Membership } from "@/lib/dashboard-mock";

type CurrentArea = "dashboard" | "journey" | "learning" | "schedule" | "replay" | "ask-sensei" | "mini-checkpoint";
type Entitlement = "available" | "limited" | "readOnly" | "locked";
type Implementation = "implemented" | "notImplemented";
type NavItem = { label: string; glyph: string; href?: string; entitlement: Entitlement; implementation: Implementation; active?: boolean };
// TEMP FRONTEND MVP: remove notImplemented modal states as real feature routes are added.
type ModalState = { feature: string; variant: "membershipLock" | "notImplemented" };

function itemsFor(membership: Membership, current: CurrentArea): NavItem[] {
  const free = membership === "free";
  const sensei = membership === "sensei";
  return [
    { label: "Dashboard", glyph: "⌂", href: `/dashboard?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "dashboard" },
    { label: "Kelas Saya / Journey", glyph: "道", href: `/journey?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "journey" || current === "learning" },
    { label: "Perpustakaan", glyph: "冊", entitlement: free ? "limited" : "available", implementation: "notImplemented" },
    { label: "Latihan Harian", glyph: "練", entitlement: free ? "limited" : "available", implementation: "notImplemented" },
    { label: "Try Out", glyph: "試", href: `/tryout?membership=${membership}`, entitlement: free ? "locked" : "available", implementation: "implemented" },
    { label: "Community", glyph: "話", entitlement: free ? "readOnly" : "available", implementation: "notImplemented" },
    { label: "Progress", glyph: "↗", entitlement: "available", implementation: "notImplemented" },
    { label: "Achievement", glyph: "✦", entitlement: free ? "locked" : "available", implementation: "notImplemented" },
    { label: "Certificate", glyph: "✓", entitlement: free ? "locked" : "available", implementation: "notImplemented" },
    { label: "Jadwal", glyph: "予", href: `/schedule?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "schedule" },
    { label: "Replay", glyph: "▶", href: `/replay?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "replay" },
    { label: "Tanya Sensei", glyph: "先", href: `/ask-sensei?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "ask-sensei" },
    { label: "Mini Checkpoint", glyph: "問", href: `/mini-checkpoint?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "mini-checkpoint" },
    { label: "Notifications", glyph: "♢", entitlement: "available", implementation: "notImplemented" },
    { label: "Profile", glyph: "人", entitlement: "available", implementation: "notImplemented" },
  ];
}

export function StudentNavigation({ membership, current }: { membership: Membership; current: CurrentArea }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  function openModal(feature: string, variant: ModalState["variant"], trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    if (variant === "membershipLock") {
      setFeedback(feature);
      window.setTimeout(() => setFeedback(null), 280);
    }
    setModal({ feature, variant });
  }

  function closeModal() {
    setModal(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!modal) return;
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
  }, [modal]);

  const items = itemsFor(membership, current);
  const navigation = (
    <>
      <Link className="student-nav-brand" href="/"><span aria-hidden="true">日</span><strong>HIRU <b>Academy</b></strong></Link>
      <nav aria-label="Navigasi siswa">{items.map((item) => {
        const stateClass = item.active ? "active" : item.entitlement;
        if (item.entitlement !== "locked" && item.implementation === "implemented" && item.href) return <Link className={`student-nav-item state-${stateClass}`} href={item.href} onClick={() => setMobileOpen(false)} key={item.label}><span aria-hidden="true">{item.glyph}</span>{item.label}{item.entitlement === "limited" && <small>Terbatas</small>}{item.entitlement === "readOnly" && <small>Baca saja</small>}</Link>;
        const variant = item.entitlement === "locked" ? "membershipLock" : "notImplemented";
        return <button className={`student-nav-item state-${stateClass}${feedback === item.label ? " locked-feedback" : ""}`} type="button" onClick={(event) => openModal(item.label, variant, event.currentTarget)} key={item.label}><span aria-hidden="true">{item.glyph}</span>{item.label}{item.entitlement === "locked" ? <i aria-hidden="true">⌑</i> : item.entitlement === "limited" ? <small>Terbatas</small> : item.entitlement === "readOnly" ? <small>Baca saja</small> : null}</button>;
      })}</nav>
      <div className="student-nav-bottom"><span>{membership === "free" ? "Free Member" : membership === "lms" ? "Belajar Mandiri" : "Belajar dengan Sensei"}</span><Link href="/">Kembali ke beranda</Link></div>
    </>
  );

  return (
    <>
      <aside className="student-nav-desktop">{navigation}</aside>
      <button className="student-mobile-trigger" type="button" onClick={() => setMobileOpen(true)} aria-label="Buka navigasi" aria-expanded={mobileOpen}>☰</button>
      {mobileOpen && <div className="student-mobile-nav"><button className="student-mobile-backdrop" type="button" aria-label="Tutup navigasi" onClick={() => setMobileOpen(false)} /><aside><button className="student-mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi">×</button>{navigation}</aside></div>}
      {modal && <div className="locked-modal"><button className="locked-modal-backdrop" type="button" aria-label="Tutup" onClick={closeModal} /><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="student-modal-title"><button ref={closeRef} className="locked-modal-close" type="button" onClick={closeModal} aria-label="Tutup">×</button><span className="locked-modal-icon" aria-hidden="true">{modal.variant === "membershipLock" ? "⌑" : "…"}</span><p>{modal.feature}</p><h2 id="student-modal-title">{modal.variant === "membershipLock" ? "Akses Terkunci" : "Fitur Belum Tersedia"}</h2>{modal.variant === "notImplemented" && <p className="locked-modal-message">Fitur ini belum tersedia di versi demo.</p>}<div className={`locked-modal-actions${modal.variant === "notImplemented" ? " single" : ""}`}><button type="button" onClick={closeModal}>Tutup</button>{modal.variant === "membershipLock" && <Link href="/#program" onClick={closeModal}>Upgrade</Link>}</div></section></div>}
    </>
  );
}
