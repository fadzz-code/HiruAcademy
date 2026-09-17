"use client";

import Image from "next/image";
import { publicSensei, type PublicSensei } from "@/lib/public-sensei";
import { usePublishedClassOperations } from "@/lib/class-store";

export function SenseiGrid({ limit, reveal = false }: { limit?: number; reveal?: boolean }) {
  const operations = usePublishedClassOperations();
  const profiles = (() => { const seen = new Set<string>(); const merged: PublicSensei[] = []; for (const sensei of [...publicSensei, ...operations.sensei.map((item) => ({ id: item.id, name: item.name, initials: item.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(), avatarSrc: item.photoUrl || undefined, expertise: item.specialization }))]) { const key = sensei.id + sensei.name.toLowerCase(); if (!seen.has(key) && !merged.some((x) => x.name.toLowerCase() === sensei.name.toLowerCase())) { seen.add(key); merged.push(sensei); } } return limit ? merged.slice(0, limit) : merged; })();

  return (
    <div className="sensei-grid">
      {profiles.map((sensei, index) => (
        <article
          className={`sensei-card${reveal ? " reveal-item" : ""}`}
          key={sensei.id}
          style={reveal ? ({ "--reveal-index": index } as React.CSSProperties) : undefined}
        >
          <div className="sensei-avatar" aria-label={`Foto ${sensei.name}`}>
            {sensei.avatarSrc ? (
              <Image
                src={sensei.avatarSrc}
                alt={`Foto profil ${sensei.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="sensei-avatar-img"
              />
            ) : (
              <span>{sensei.initials}</span>
            )}
          </div>
          <div className="sensei-card-body">
            <h3>{sensei.name}</h3>
            <ul aria-label={`Fokus pembelajaran ${sensei.name}`}>
              {sensei.expertise.map((expertise) => (
                <li key={expertise}>{expertise}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
