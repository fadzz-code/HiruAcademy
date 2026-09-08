"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuBell, LuCalendarDays, LuCircleCheck, LuClipboardCheck, LuDumbbell, LuEllipsis, LuFlag, LuHouse, LuLayers3, LuLibrary, LuLockKeyhole, LuMenu, LuMessageCircleQuestion, LuMessagesSquare, LuPlay, LuRoute, LuTrendingUp, LuUser, LuX } from "react-icons/lu";
import type { IconType } from "react-icons";
import { BrandLogo } from "@/components/brand-logo";
import type { Membership } from "@/lib/dashboard-mock";

type CurrentArea = "dashboard" | "journey" | "learning" | "flashcards" | "schedule" | "replay" | "ask-sensei" | "mini-checkpoint" | "tryout" | "library" | "progress" | "leaderboard" | "certificate" | "community" | "supporting" | "notifications" | "profile";
type Entitlement = "available" | "limited" | "readOnly" | "locked";
type Implementation = "implemented" | "notImplemented";
type NavItem = { label: string; icon: IconType; href?: string; entitlement: Entitlement; implementation: Implementation; active?: boolean };
// TEMP FRONTEND MVP: remove notImplemented modal states as real feature routes are added.
type ModalState = { feature: string; variant: "membershipLock" | "notImplemented" };

function itemsFor(membership: Membership, current: CurrentArea): NavItem[] {
  const free = membership === "free";
  const sensei = membership === "sensei";
  const items: NavItem[] = [
    { label: "Dashboard", icon: LuHouse, href: `/dashboard?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "dashboard" },
    { label: "Kelas Saya", icon: LuRoute, href: `/journey?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "journey" || current === "learning" },
    { label: "Kumpulan Flashcard", icon: LuLayers3, href: `/flashcards?membership=${membership}`, entitlement: free ? "limited" : "available", implementation: "implemented", active: current === "flashcards" },
    { label: "Latihan Harian", icon: LuDumbbell, href: `/practice?membership=${membership}`, entitlement: free ? "limited" : "available", implementation: "implemented", active: current === "supporting" },
    { label: "Try Out", icon: LuClipboardCheck, href: `/tryout?membership=${membership}`, entitlement: free ? "locked" : "available", implementation: "implemented", active: current === "tryout" },
    { label: "Perpustakaan", icon: LuLibrary, href: `/library?membership=${membership}`, entitlement: free ? "limited" : "available", implementation: "implemented", active: current === "library" },
    { label: "Jadwal", icon: LuCalendarDays, href: `/schedule?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "schedule" },
    { label: "Replay", icon: LuPlay, href: `/replay?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "replay" },
    { label: "Tanya Sensei", icon: LuMessageCircleQuestion, href: `/ask-sensei?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "ask-sensei" },
    { label: "Mini Checkpoint", icon: LuFlag, href: `/mini-checkpoint?membership=${membership}`, entitlement: sensei ? "available" : "locked", implementation: "implemented", active: current === "mini-checkpoint" },
  ];
  items.push(
    { label: "Komunitas", icon: LuMessagesSquare, href: `/community?membership=${membership}`, entitlement: free ? "readOnly" : "available", implementation: "implemented", active: current === "community" },
    { label: "Progres", icon: LuTrendingUp, href: `/progress?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "progress" || current === "leaderboard" },
  );
  items.push({ label: "Sertifikat", icon: LuCircleCheck, href: `/certificate?membership=${membership}`, entitlement: free ? "locked" : "available", implementation: "implemented", active: current === "certificate" });
  items.push(
    { label: "Notifikasi", icon: LuBell, href: `/notifications?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "notifications" },
    { label: "Profil", icon: LuUser, href: `/profile?membership=${membership}`, entitlement: "available", implementation: "implemented", active: current === "profile" },
  );
  return items;
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
      <Link className="student-nav-brand" href="/" aria-label="HIRU Academy, kembali ke beranda"><BrandLogo /></Link>
      <nav aria-label="Navigasi siswa">{items.map((item) => {
        const stateClass = item.active ? "active" : item.entitlement;
        const Icon = item.icon;
        if (item.entitlement !== "locked" && item.implementation === "implemented" && item.href) return <Link className={`student-nav-item state-${stateClass}`} href={item.href} onClick={() => setMobileOpen(false)} key={item.label}><span aria-hidden="true"><Icon /></span>{item.label}</Link>;
        const variant = item.entitlement === "locked" ? "membershipLock" : "notImplemented";
        return <button className={`student-nav-item state-${stateClass}${feedback === item.label ? " locked-feedback" : ""}`} type="button" onClick={(event) => openModal(item.label, variant, event.currentTarget)} key={item.label}><span aria-hidden="true"><Icon /></span>{item.label}{item.entitlement === "locked" && <i aria-hidden="true"><LuLockKeyhole /></i>}</button>;
      })}</nav>
      <div className="student-nav-bottom">{["Mulai Belajar", "Pengaturan", "Keluar"].map((label) => <button type="button" onClick={(event) => openModal(label, "notImplemented", event.currentTarget)} key={label}>{label}</button>)}</div>
    </>
  );

  return (
    <>
      <aside className="student-nav-desktop">{navigation}</aside>
      <button className="student-mobile-trigger" type="button" onClick={() => setMobileOpen(true)} aria-label="Buka navigasi" aria-expanded={mobileOpen}><LuMenu aria-hidden="true" /></button>
      {mobileOpen && <div className="student-mobile-nav"><button className="student-mobile-backdrop" type="button" aria-label="Tutup navigasi" onClick={() => setMobileOpen(false)} /><aside><button className="student-mobile-close" type="button" onClick={() => setMobileOpen(false)} aria-label="Tutup navigasi"><LuX aria-hidden="true" /></button>{navigation}</aside></div>}
      {modal && <div className="locked-modal"><button className="locked-modal-backdrop" type="button" aria-label="Tutup" onClick={closeModal} /><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="student-modal-title"><button ref={closeRef} className="locked-modal-close" type="button" onClick={closeModal} aria-label="Tutup"><LuX aria-hidden="true" /></button><span className="locked-modal-icon" aria-hidden="true">{modal.variant === "membershipLock" ? <LuLockKeyhole /> : <LuEllipsis />}</span><p>{modal.feature}</p><h2 id="student-modal-title">{modal.variant === "membershipLock" ? "Akses Terkunci" : "Fitur Belum Tersedia"}</h2>{modal.variant === "notImplemented" && <p className="locked-modal-message">Fitur ini belum tersedia di versi demo.</p>}<div className={`locked-modal-actions${modal.variant === "notImplemented" ? " single" : ""}`}><button type="button" onClick={closeModal}>Tutup</button>{modal.variant === "membershipLock" && <Link href="/#program" onClick={closeModal}>Upgrade</Link>}</div></section></div>}
    </>
  );
}
