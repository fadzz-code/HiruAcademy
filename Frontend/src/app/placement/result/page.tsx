"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { PublicPage } from "@/components/public-shell";
import {
  calculatePlacementResult,
  placementResult as defaultResult,
  plans,
} from "@/lib/public-mock";

const tierIcons: Record<string, React.ReactNode> = {
  sensei: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  lms: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
    </svg>
  ),
  free: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
};

function subscribe() {
  return () => undefined;
}

function getPlacementAnswers() {
  return sessionStorage.getItem("hiru-placement-answers") || "";
}

export default function PlacementResultPage() {
  const saved = useSyncExternalStore(subscribe, getPlacementAnswers, () => "");
  const result = useMemo(() => {
    if (!saved) return defaultResult;
    try {
      const parsed = JSON.parse(saved);
      return parsed && Object.keys(parsed).length > 0
        ? calculatePlacementResult(parsed)
        : defaultResult;
    } catch {
      return defaultResult;
    }
  }, [saved]);

  const senseiPlan = plans.find((p) => p.id === "sensei") || plans[2];
  const lmsPlan = plans.find((p) => p.id === "lms") || plans[1];
  const freePlan = plans.find((p) => p.id === "free") || plans[0];

  const programOptions = [
    {
      id: "sensei",
      badge: senseiPlan.badge,
      title: `${result.level} Kelas bersama Sensei`,
      description: senseiPlan.description,
      points: senseiPlan.points,
      price: senseiPlan.price,
      action: "Pilih Kelas bersama Sensei →",
      href: `/register?placement=${result.level}&plan=sensei`,
    },
    {
      id: "lms",
      badge: lmsPlan.badge,
      title: `${result.level} Belajar Mandiri`,
      description: lmsPlan.description,
      points: lmsPlan.points,
      price: lmsPlan.price,
      action: "Pilih Belajar Mandiri →",
      href: `/register?placement=${result.level}&plan=lms`,
    },
    {
      id: "free",
      badge: freePlan.badge,
      title: "Coba Gratis",
      description: freePlan.description,
      points: freePlan.points,
      price: freePlan.price,
      action: "Mulai Coba Gratis →",
      href: `/register?placement=${result.level}&plan=free`,
    },
  ];

  return (
    <PublicPage active="Placement Test">
      <main className="public-main placement-result-page">
        <section className="placement-result-hero">
          <p className="placement-result-kicker">HASIL PLACEMENT TEST</p>
          <h1>Hasil Evaluasi Level {result.level}</h1>
          <p>Berikut evaluasi kemampuan bahasa Jepang dan pilihan program belajar yang sesuai dengan hasil tesmu.</p>
        </section>

        <section className="public-section placement-analysis">
          <div className="public-section-head">
            <h2>Analisis kemampuan</h2>
          </div>
          <div className="placement-score-grid">
            {result.areas.map((area) => (
              <article key={area.name}>
                <span>{area.name}</span>
                <strong>{area.score} / 100</strong>
                <i>
                  <b style={{ width: `${area.score}%` }} />
                </i>
              </article>
            ))}
          </div>
        </section>

        <section className="public-section placement-recommendations">
          <div className="public-section-head">
            <h2>Pilihan Belajar untuk Level {result.level}</h2>
            <p>Pilih cara belajar berdasarkan kebutuhan bimbingan, waktu, dan ritme belajarmu.</p>
          </div>
          <div className="placement-recommendation-grid">
            {programOptions.map((plan) => (
              <article key={plan.id}>
                <div className={`placement-tier-icon offer-icon-${plan.id === "sensei" ? "1" : plan.id === "lms" ? "2" : "3"}`}>
                  {tierIcons[plan.id]}
                </div>
                <span>{plan.badge}</span>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <ul className="offer-points">
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <strong className="program-price">{plan.price}</strong>
                <Link href={plan.href}>{plan.action}</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
