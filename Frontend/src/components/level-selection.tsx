"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuFlame, LuInfo, LuKey, LuLock, LuSparkles, LuStar, LuFlag, LuUsers } from "react-icons/lu";
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

  if (membership === "free" || membership === "lms" || membership === "sensei") {
    return (
      <section className="level-grid" aria-label="Pilihan level">
        {levels.map((level) => {
          const isLocked = level.access === "notPurchased";
          return (
            <article className={`level-card level-${level.progression} ${isLocked ? "is-locked" : ""}`} key={level.slug}>
              {isLocked && (
                <div className="level-card-lock-overlay" aria-hidden="true">
                  <div className="level-card-lock-icon">
                    <LuLock />
                  </div>
                </div>
              )}
              <div className="level-card-top">
                <span className="level-code">
                  {level.slug === "dasar" ? (
                    <LuFlag aria-hidden="true" />
                  ) : level.slug === "interview" ? (
                    <LuUsers aria-hidden="true" />
                  ) : (
                    level.code
                  )}
                </span>
                <span className="level-status">
                  {isLocked && <LuLock aria-hidden="true" style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />}
                  {level.statusLabel}
                </span>
              </div>
              <h2>{level.title}</h2>
              <p>{level.description}</p>
              {level.access === "notPurchased" ? (
                <Link className="level-unavailable" href={`/renewal?membership=${membership}`}>
                  {level.actionLabel}
                  <LuArrowRight aria-hidden="true" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />
                </Link>
              ) : (
                <Link href={`/journey/${level.slug}?membership=${membership}`}>
                  {level.actionLabel}
                  <LuArrowRight aria-hidden="true" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />
                </Link>
              )}
            </article>
          );
        })}
      </section>
    );
  }

  return (
    <>
      <header className="journey-page-head sensei-journey-head">
        <div>
          <p className="dash-kicker">KURSUS SAYA • LEVEL &amp; COHORT AKTIF</p>
          <h1>Kelola beberapa level aktif bersama Sensei</h1>
          <p>Seluruh program dapat dibeli terpisah. Jadwal, cohort, dan replay mengikuti level serta program yang aktif pada akun.</p>
        </div>
      </header>
      <section className="active-level-summary">
        <div>
          <p className="dash-kicker">2 LEVEL AKTIF</p>
          <h2>JLPT N4 dan N3 aktif bersama Sensei</h2>
          <p>Lanjutkan N4 atau buka N3. Progress, jadwal kelas, dan replay disimpan per level serta cohort akun.</p>
          <div>
            <Link className="continue-button" href="/journey/n4?membership=sensei">
              Lanjutkan N4 <LuArrowRight aria-hidden="true" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />
            </Link>
            <Link className="lms-secondary" href="/dashboard?membership=sensei">Kembali Dashboard</Link>
          </div>
        </div>
        <div className="journey-progress">
          <span>Progress tersimpan</span>
          <div><i /></div>
        </div>
      </section>
      <header className="journey-section-head">
        <h2>Level berdasarkan pembelian</h2>
        <p>Tidak ada prerequisite antarlevel. Status kelas aktif mengikuti entitlement dan cohort.</p>
      </header>
      <section className="level-grid sensei-level-grid" aria-label="Level berdasarkan pembelian">
        {levels.map((level) => {
          const isLocked = level.access === "notPurchased";
          return (
            <article className={`level-card level-${level.access} level-${level.progression} ${isLocked ? "is-locked" : ""}`} key={level.slug}>
              {isLocked && (
                <div className="level-card-lock-overlay" aria-hidden="true">
                  <div className="level-card-lock-icon">
                    <LuLock />
                  </div>
                </div>
              )}
              <div className="level-card-top">
                <span className="level-code">
                  {level.slug === "dasar" ? (
                    <LuFlag aria-hidden="true" />
                  ) : level.slug === "interview" ? (
                    <LuUsers aria-hidden="true" />
                  ) : (
                    level.code
                  )}
                </span>
                <span className="level-status">
                  {isLocked && <LuLock aria-hidden="true" style={{ display: "inline-block", marginRight: "4px", verticalAlign: "middle" }} />}
                  {level.statusLabel}
                </span>
              </div>
              <h2>{level.title}</h2>
              <p>{level.description}</p>
              {level.access === "owned" ? (
                <Link href={`/journey/${level.slug}?membership=sensei`}>
                  {level.actionLabel}
                  <LuArrowRight aria-hidden="true" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelected(level);
                  }}
                >
                  {level.actionLabel}
                  <LuArrowRight aria-hidden="true" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />
                </button>
              )}
            </article>
          );
        })}
      </section>
      <section className="journey-activity">
        <h2>Aktivitas minggu ini</h2>
        <div>
          {[
            { id: "star", icon: <LuStar aria-hidden="true" /> },
            { id: "flame", icon: <LuFlame aria-hidden="true" /> },
            { id: "sparkles", icon: <LuSparkles aria-hidden="true" /> },
          ].map((item) => (
            <article key={item.id}>
              <span>{item.icon}</span>
              <div><small>Aktivitas Belajar</small><strong>Aktif</strong></div>
            </article>
          ))}
        </div>
      </section>
      <section className="journey-announcement">
        <span aria-hidden="true"><LuInfo /></span>
        <div>
          <h2>Pengumuman</h2>
          <p>Satu akun dapat memiliki beberapa level dan cohort aktif. Progress, jadwal, serta replay disimpan per level; pembelian level lain tidak harus berurutan.</p>
        </div>
      </section>
      {selected && (
        <div className="locked-modal">
          <button className="locked-modal-backdrop" type="button" aria-label="Tutup" onClick={closeDialog} />
          <section role="dialog" aria-modal="true" aria-labelledby="level-dialog-title">
            <button ref={closeRef} className="locked-modal-close" type="button" onClick={closeDialog} aria-label="Tutup">×</button>
            <p>LEVEL • BELUM DIBELI</p>
            <h2 id="level-dialog-title">Level ini belum aktif pada akunmu</h2>
            <span className="level-dialog-status">Belum Aktif</span>
            <strong className="level-dialog-key" aria-hidden="true"><LuKey /></strong>
            <p className="locked-modal-message">Level dapat dibeli langsung tanpa menyelesaikan level lain. Cohort, jadwal kelas, replay, dan progress level aktif tetap tersimpan.</p>
            <ul>
              <li>Level independen</li>
              <li>Akses akun resmi</li>
              <li>Cohort tetap aman</li>
            </ul>
            <div className="locked-modal-actions">
              <button type="button" onClick={closeDialog}>Kembali ke Level</button>
              <Link href="/renewal?membership=sensei">Beli Level Ini</Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
