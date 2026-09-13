"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuBell, LuEllipsis, LuHouse, LuLockKeyhole, LuMenu, LuMessagesSquare, LuRoute, LuTrendingUp, LuUser, LuX } from "react-icons/lu";
import type { IconType } from "react-icons";
import { BrandLogo } from "@/components/brand-logo";
import type { Membership } from "@/lib/dashboard-mock";

type CurrentArea = "dashboard" | "journey" | "learning" | "flashcards" | "schedule" | "replay" | "ask-sensei" | "mini-checkpoint" | "tryout" | "library" | "progress" | "leaderboard" | "certificate" | "community" | "supporting" | "notifications" | "profile" | "affiliate";
type Entitlement = "available" | "limited" | "readOnly" | "locked";
type Implementation = "implemented" | "notImplemented";
type NavChild = { label: string; href: string; entitlement: Entitlement };
type NavItem = { label: string; icon: IconType; href?: string; entitlement: Entitlement; implementation: Implementation; active?: boolean; children?: NavChild[] };
type ModalState = { feature: string; variant: "membershipLock" | "notImplemented" };

function itemsFor(membership: Membership, current: CurrentArea): NavItem[] {
  const free = membership === "free";
  const sensei = membership === "sensei";
  const query = `?membership=${membership}`;
  return [
    { label: "Dashboard", icon: LuHouse, href: `/dashboard${query}`, entitlement: "available", implementation: "implemented", active: current === "dashboard" },
    { label: "Kelas Saya", icon: LuRoute, entitlement: "available", implementation: "implemented", active: ["journey", "learning", "flashcards", "supporting", "tryout", "library", "schedule", "replay", "mini-checkpoint"].includes(current), children: [
      { label: "Perjalanan Level", href: `/journey${query}`, entitlement: "available" },
      { label: "Kumpulan Flashcard", href: `/flashcards${query}`, entitlement: free ? "limited" : "available" },
      { label: "Latihan Harian", href: `/practice${query}`, entitlement: free ? "limited" : "available" },
      { label: "Try Out", href: `/tryout${query}`, entitlement: free ? "locked" : "available" },
      { label: "Perpustakaan", href: `/library${query}`, entitlement: free ? "limited" : "available" },
      { label: "Jadwal", href: `/schedule${query}`, entitlement: sensei ? "available" : "locked" },
      { label: "Replay", href: `/replay${query}`, entitlement: sensei ? "available" : "locked" },
      { label: "Mini Checkpoint", href: `/mini-checkpoint${query}`, entitlement: sensei ? "available" : "locked" },
    ] },
    { label: "Komunitas", icon: LuMessagesSquare, entitlement: free ? "readOnly" : "available", implementation: "implemented", active: current === "community" || current === "ask-sensei", children: [
      { label: "Diskusi Member", href: `/community${query}`, entitlement: free ? "readOnly" : "available" },
      { label: "Tanya Sensei", href: `/ask-sensei${query}`, entitlement: sensei ? "available" : "locked" },
    ] },
    { label: "Progres", icon: LuTrendingUp, entitlement: "available", implementation: "implemented", active: current === "progress" || current === "leaderboard" || current === "certificate", children: [
      { label: "Ringkasan Progres", href: `/progress${query}`, entitlement: "available" },
      { label: "Leaderboard", href: `/leaderboard${query}`, entitlement: "available" },
      { label: "Sertifikat", href: `/certificate${query}`, entitlement: free ? "locked" : "available" },
    ] },
    { label: "Notifikasi", icon: LuBell, href: `/notifications${query}`, entitlement: "available", implementation: "implemented", active: current === "notifications" },
    { label: "Profil", icon: LuUser, entitlement: "available", implementation: "implemented", active: current === "profile" || current === "affiliate", children: [
      { label: "Profil Saya", href: `/profile${query}`, entitlement: "available" },
      { label: "Membership", href: `/renewal${query}`, entitlement: "available" },
      { label: "Affiliate", href: `/affiliate${query}`, entitlement: "available" },
    ] },
  ];
}

export function StudentNavigation({ membership, current }: { membership: Membership; current: CurrentArea }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<ModalState | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileCloseRef = useRef<HTMLButtonElement | null>(null);
  const mobilePanelRef = useRef<HTMLElement | null>(null);
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
    if (!mobileOpen) return;
    mobileCloseRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        window.setTimeout(() => mobileTriggerRef.current?.focus(), 0);
      }
      if (event.key !== "Tab" || !mobilePanelRef.current) return;
      const focusable = [...mobilePanelRef.current.querySelectorAll<HTMLElement>('button,[href]')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

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
        if (item.children && item.entitlement !== "locked") {
          const open = expanded[item.label] ?? item.active ?? false;
          return <div className="student-nav-group" key={item.label}><button className={`student-nav-item student-nav-parent state-${stateClass}`} type="button" aria-expanded={open} onClick={() => setExpanded((state) => ({ ...state, [item.label]: !open }))}><span aria-hidden="true"><Icon /></span>{item.label}<i className={open ? "open" : ""} aria-hidden="true">⌄</i></button>{open && <div className="student-submenu">{item.children.map((child) => { const active = pathname === child.href.split("?")[0]; return child.entitlement === "locked" ? <button className="locked" type="button" onClick={(event) => openModal(child.label, "membershipLock", event.currentTarget)} key={child.href}><span>{child.label}</span><LuLockKeyhole aria-hidden="true" /></button> : <Link className={active ? "active" : ""} href={child.href} aria-current={active ? "page" : undefined} onClick={() => setMobileOpen(false)} key={child.href}>{child.label}</Link>; })}</div>}</div>;
        }
        if (item.entitlement !== "locked" && item.implementation === "implemented" && item.href) return <Link className={`student-nav-item state-${stateClass}`} href={item.href} aria-current={item.active ? "page" : undefined} onClick={() => setMobileOpen(false)} key={item.label}><span aria-hidden="true"><Icon /></span>{item.label}</Link>;
        const variant = item.entitlement === "locked" ? "membershipLock" : "notImplemented";
        return <button className={`student-nav-item state-${stateClass}${feedback === item.label ? " locked-feedback" : ""}`} type="button" onClick={(event) => openModal(item.label, variant, event.currentTarget)} key={item.label}><span aria-hidden="true"><Icon /></span>{item.label}{item.entitlement === "locked" && <i aria-hidden="true"><LuLockKeyhole /></i>}</button>;
      })}</nav>
      <div className="student-nav-bottom">{["Mulai Belajar", "Pengaturan", "Keluar"].map((label) => <button type="button" onClick={(event) => openModal(label, "notImplemented", event.currentTarget)} key={label}>{label}</button>)}</div>
    </>
  );

  return (
    <>
      <aside className="student-nav-desktop">{navigation}</aside>
      <button ref={mobileTriggerRef} className="student-mobile-trigger" type="button" onClick={() => setMobileOpen(true)} aria-label="Buka navigasi" aria-expanded={mobileOpen} aria-controls="student-mobile-panel"><LuMenu aria-hidden="true" /></button>
      {mobileOpen && <div className="student-mobile-nav"><button className="student-mobile-backdrop" type="button" aria-label="Tutup navigasi" onClick={() => { setMobileOpen(false); window.setTimeout(() => mobileTriggerRef.current?.focus(), 0); }} /><aside ref={mobilePanelRef} id="student-mobile-panel" aria-label="Navigasi siswa seluler"><button ref={mobileCloseRef} className="student-mobile-close" type="button" onClick={() => { setMobileOpen(false); window.setTimeout(() => mobileTriggerRef.current?.focus(), 0); }} aria-label="Tutup navigasi"><LuX aria-hidden="true" /></button>{navigation}</aside></div>}
      {modal && <div className="locked-modal"><button className="locked-modal-backdrop" type="button" aria-label="Tutup" onClick={closeModal} /><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="student-modal-title"><button ref={closeRef} className="locked-modal-close" type="button" onClick={closeModal} aria-label="Tutup"><LuX aria-hidden="true" /></button><span className="locked-modal-icon" aria-hidden="true">{modal.variant === "membershipLock" ? <LuLockKeyhole /> : <LuEllipsis />}</span><p>{modal.feature}</p><h2 id="student-modal-title">{modal.variant === "membershipLock" ? "Akses Terkunci" : "Fitur Belum Tersedia"}</h2>{modal.variant === "notImplemented" && <p className="locked-modal-message">Fitur ini sedang disiapkan dan akan segera hadir.</p>}<div className={`locked-modal-actions${modal.variant === "notImplemented" ? " single" : ""}`}><button type="button" onClick={closeModal}>Tutup</button>{modal.variant === "membershipLock" && <Link href="/#program" onClick={closeModal}>Upgrade</Link>}</div></section></div>}
    </>
  );
}
