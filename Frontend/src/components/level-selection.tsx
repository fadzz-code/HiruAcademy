"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { JourneyLevel } from "@/lib/journey-mock";
import type { Membership } from "@/lib/dashboard-mock";

export function LevelSelection({ membership, levels }: { membership: Membership; levels: JourneyLevel[] }) {
  const [selected, setSelected] = useState<JourneyLevel | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeDialog() {
    setSelected(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) { if (event.key === "Escape") closeDialog(); }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  if (membership !== "sensei") return <section className="level-grid" aria-label="Pilihan level">{levels.map((level) => <article className={`level-card level-${level.progression}`} key={level.slug}><div className="level-card-top"><span className="level-code">{level.code}</span><span className="level-status">{level.statusLabel}</span></div><h2>{level.title}</h2><p>{level.description}</p>{level.access === "notPurchased" ? <span className="level-unavailable">{level.actionLabel}</span> : <Link href={`/journey/${level.slug}?membership=${membership}`}>{level.actionLabel}<span aria-hidden="true">→</span></Link>}</article>)}</section>;

  return (
    <>
      <header className="journey-page-head sensei-journey-head"><div><p className="dash-kicker">KURSUS SAYA • LEVEL & COHORT AKTIF</p><h1>Kelola beberapa level aktif bersama Sensei</h1><p>Level N1–N5 dapat dibeli bebas. Jadwal, cohort, dan replay mengikuti level serta program yang aktif pada akun.</p></div></header>
      <section className="active-level-summary"><div><p className="dash-kicker">2 LEVEL AKTIF</p><h2>JLPT N4 dan N3 aktif bersama Sensei</h2><p>Lanjutkan N4 atau buka N3. Progress, jadwal kelas, dan replay disimpan per level serta cohort oleh backend.</p><div><Link className="continue-button" href="/journey/n4?membership=sensei">Lanjutkan N4 <span aria-hidden="true">→</span></Link><Link className="lms-secondary" href="/dashboard?membership=sensei">Kembali Dashboard</Link></div></div><div className="journey-progress"><span>Progress dari backend</span><div><i /></div></div></section>
      <header className="journey-section-head"><h2>Level berdasarkan pembelian</h2><p>Tidak ada prerequisite antarlevel. Status kelas aktif mengikuti entitlement dan cohort.</p></header>
      <section className="level-grid sensei-level-grid" aria-label="Level berdasarkan pembelian">{levels.map((level) => <article className={`level-card level-${level.access} level-${level.progression}`} key={level.slug}><div className="level-card-top"><span className="level-code">{level.code}</span><span className="level-status">{level.access === "notPurchased" && <i aria-hidden="true">⌑</i>}{level.statusLabel}</span></div><h2>{level.title}</h2><p>{level.description}</p>{level.access === "owned" ? <Link href={`/journey/${level.slug}?membership=sensei`}>{level.actionLabel}<span aria-hidden="true">→</span></Link> : <button type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setSelected(level); }}>{level.actionLabel}<span aria-hidden="true">→</span></button>}</article>)}</section>
      <section className="journey-activity"><h2>Aktivitas minggu ini</h2><div>{["★", "♨", "♛"].map((glyph) => <article key={glyph}><span aria-hidden="true">{glyph}</span><div><small>XP Mingguan</small><strong>— XP</strong></div></article>)}</div></section>
      <section className="journey-announcement"><span aria-hidden="true">i</span><div><h2>Pengumuman</h2><p>Satu akun dapat memiliki beberapa level dan cohort aktif. Progress, jadwal, serta replay disimpan per level; pembelian level lain tidak harus berurutan.</p></div></section>
      {selected && <div className="locked-modal"><button className="locked-modal-backdrop" type="button" aria-label="Tutup" onClick={closeDialog} /><section role="dialog" aria-modal="true" aria-labelledby="level-dialog-title"><button ref={closeRef} className="locked-modal-close" type="button" onClick={closeDialog} aria-label="Tutup">×</button><p>LEVEL • BELUM DIBELI</p><h2 id="level-dialog-title">Level ini belum aktif pada akunmu</h2><span className="level-dialog-status">Belum Aktif</span><strong className="level-dialog-key" aria-hidden="true">鍵</strong><p className="locked-modal-message">Level dapat dibeli langsung tanpa menyelesaikan level lain. Cohort, jadwal kelas, replay, dan progress level aktif tetap tersimpan.</p><ul><li>Level independen</li><li>Akses dari backend</li><li>Cohort tetap aman</li></ul><div className="locked-modal-actions"><button type="button" onClick={closeDialog}>Kembali ke Level</button><Link href="/renewal?membership=sensei">Beli Level Ini</Link></div></section></div>}
    </>
  );
}
